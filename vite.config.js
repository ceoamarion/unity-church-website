import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { renderSeoHead } from './src/seo.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'page-seo',
    transformIndexHtml(html) {
      return html.replace(/<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/, `<!-- SEO_START -->${renderSeoHead('/')}<!-- SEO_END -->`);
    },
  }],
  ssr: { noExternal: ['gsap'] },
})
