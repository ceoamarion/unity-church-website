using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Diagnostics;

class Program
{
    static string webRoot;

    static void Main(string[] args)
    {
        Console.Title = "Unity Church — Website Preview Server";
        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine("=================================================");
        Console.WriteLine("        UNITY CHURCH WEBSITE PREVIEW");
        Console.WriteLine("=================================================");
        Console.ResetColor();

        webRoot = AppDomain.CurrentDomain.BaseDirectory;
        if (Directory.Exists(Path.Combine(webRoot, "dist")))
        {
            webRoot = Path.Combine(webRoot, "dist");
        }

        int port = 8080;
        TcpListener server = null;

        while (port <= 8100)
        {
            try
            {
                server = new TcpListener(IPAddress.Loopback, port);
                server.Start();
                break;
            }
            catch
            {
                port++;
            }
        }

        if (server == null)
        {
            Console.WriteLine("Could not start local server on ports 8080-8100.");
            return;
        }

        string url = "http://localhost:" + port + "/";
        Console.WriteLine("\nServer started successfully at: " + url);
        Console.WriteLine("Serving website files from: " + webRoot);
        Console.WriteLine("\nOpening your default web browser...\n");

        Thread listenerThread = new Thread(() =>
        {
            while (true)
            {
                try
                {
                    TcpClient client = server.AcceptTcpClient();
                    ThreadPool.QueueUserWorkItem(state => HandleClient(client));
                }
                catch { break; }
            }
        });
        listenerThread.IsBackground = true;
        listenerThread.Start();

        try
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = url,
                UseShellExecute = true
            });
        }
        catch { }

        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine("-------------------------------------------------");
        Console.WriteLine("Server is running. Close this window to stop.");
        Console.WriteLine("-------------------------------------------------");
        Console.ResetColor();

        // Keep server process running indefinitely until window is closed
        Thread.Sleep(Timeout.Infinite);
    }

    static void HandleClient(TcpClient client)
    {
        using (client)
        using (NetworkStream stream = client.GetStream())
        {
            try
            {
                byte[] buffer = new byte[8192];
                int bytesRead = stream.Read(buffer, 0, buffer.Length);
                if (bytesRead <= 0) return;

                string requestString = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                string[] requestLines = requestString.Split(new[] { "\r\n" }, StringSplitOptions.None);
                if (requestLines.Length == 0) return;

                string[] tokens = requestLines[0].Split(' ');
                if (tokens.Length < 2) return;

                string rawUrl = tokens[1].Split('?')[0].TrimStart('/');
                if (string.IsNullOrEmpty(rawUrl)) rawUrl = "index.html";

                string filePath = Path.Combine(webRoot, rawUrl.Replace('/', Path.DirectorySeparatorChar));
                if (!File.Exists(filePath))
                {
                    filePath = Path.Combine(webRoot, "index.html");
                }

                string rangeHeader = null;
                foreach (string line in requestLines)
                {
                    if (line.StartsWith("Range:", StringComparison.OrdinalIgnoreCase))
                    {
                        rangeHeader = line.Substring(6).Trim();
                        break;
                    }
                }

                FileInfo fi = new FileInfo(filePath);
                long totalLength = fi.Length;
                string mime = GetMimeType(Path.GetExtension(filePath).ToLower());

                if (rangeHeader != null && rangeHeader.StartsWith("bytes="))
                {
                    string[] rangeParts = rangeHeader.Substring(6).Split('-');
                    long start = long.Parse(rangeParts[0]);
                    long end = (rangeParts.Length > 1 && !string.IsNullOrEmpty(rangeParts[1]))
                        ? long.Parse(rangeParts[1])
                        : totalLength - 1;

                    if (end >= totalLength) end = totalLength - 1;
                    long contentLength = end - start + 1;

                    StringBuilder header = new StringBuilder();
                    header.AppendLine("HTTP/1.1 206 Partial Content");
                    header.AppendLine("Content-Type: " + mime);
                    header.AppendLine("Content-Length: " + contentLength);
                    header.AppendLine("Content-Range: bytes " + start + "-" + end + "/" + totalLength);
                    header.AppendLine("Accept-Ranges: bytes");
                    header.AppendLine("Connection: close");
                    header.AppendLine();

                    byte[] headerBytes = Encoding.UTF8.GetBytes(header.ToString());
                    stream.Write(headerBytes, 0, headerBytes.Length);

                    using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read))
                    {
                        fs.Seek(start, SeekOrigin.Begin);
                        byte[] fileBuffer = new byte[64 * 1024];
                        long remaining = contentLength;
                        while (remaining > 0)
                        {
                            int read = fs.Read(fileBuffer, 0, (int)Math.Min(fileBuffer.Length, remaining));
                            if (read == 0) break;
                            stream.Write(fileBuffer, 0, read);
                            remaining -= read;
                        }
                    }
                }
                else
                {
                    StringBuilder header = new StringBuilder();
                    header.AppendLine("HTTP/1.1 200 OK");
                    header.AppendLine("Content-Type: " + mime);
                    header.AppendLine("Content-Length: " + totalLength);
                    header.AppendLine("Accept-Ranges: bytes");
                    header.AppendLine("Connection: close");
                    header.AppendLine();

                    byte[] headerBytes = Encoding.UTF8.GetBytes(header.ToString());
                    stream.Write(headerBytes, 0, headerBytes.Length);

                    using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read))
                    {
                        byte[] fileBuffer = new byte[64 * 1024];
                        int read;
                        while ((read = fs.Read(fileBuffer, 0, fileBuffer.Length)) > 0)
                        {
                            stream.Write(fileBuffer, 0, read);
                        }
                    }
                }
            }
            catch { }
        }
    }

    static string GetMimeType(string extension)
    {
        switch (extension)
        {
            case ".html": return "text/html; charset=utf-8";
            case ".css": return "text/css; charset=utf-8";
            case ".js": return "application/javascript; charset=utf-8";
            case ".json": return "application/json; charset=utf-8";
            case ".svg": return "image/svg+xml";
            case ".png": return "image/png";
            case ".jpg": case ".jpeg": return "image/jpeg";
            case ".webp": return "image/webp";
            case ".mp4": return "video/mp4";
            case ".webm": return "video/webm";
            case ".woff": return "font/woff";
            case ".woff2": return "font/woff2";
            default: return "application/octet-stream";
        }
    }
}
