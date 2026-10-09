import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { getRoute, normalizeLegacyRoute } from './routing.js'

normalizeLegacyRoute();
const route = getRoute(window.location);
const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App initialRoute={route} />
  </StrictMode>
);
if (root.hasChildNodes() && root.dataset.route === route) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
