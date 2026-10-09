# unity-church-website

React/Vite website for Unity Christian Church in Alcolu, South Carolina.

## Development and publishing

- `npm ci` installs the locked dependencies.
- `npm run dev` starts local development.
- `npm run build` builds the browser bundle and pre-renders `/` and `/u-impact/` into static HTML for GitHub Pages.
- `npm test` validates routing, generated metadata, structured data, content, and asset paths after a build.
- `npm run preview` serves the production output locally.

Pushing to `main` runs `.github/workflows/deploy.yml` and deploys `dist` to https://uccalcolu.org.

## Search configuration

`src/seo.js` defines canonical URLs, titles, descriptions, social previews, and Church/WebSite/WebPage structured data. `scripts/prerender.mjs` renders the actual React pages and generates the sitemap. Old `/#/u-impact` links are normalized to `/u-impact/`; section anchors still work on each page.

Program content lives in `src/data/impactPrograms.js`; update it to keep cards, event descriptions, and structured data consistent. Event dates remain separately maintained in `UpcomingSection.jsx`; undated programs are not represented as scheduled events in structured data.

After deployment, the site owner can submit `https://uccalcolu.org/sitemap.xml` in Google Search Console and request indexing for both public URLs. Keep the church's Google Business Profile name, address, website, and service information accurate. Search engines control indexing and rankings; metadata does not guarantee a particular position.

