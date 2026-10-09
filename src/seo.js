import { IMPACT_PROGRAMS } from './data/impactPrograms.js';

export const SITE_URL = 'https://uccalcolu.org';
export const PUBLIC_ROUTES = ['/', '/u-impact/'];

export function getSeo(route = '/') {
  const impact = route === '/u-impact/';
  const url = SITE_URL + (impact ? '/u-impact/' : '/');
  const title = impact
    ? 'Unity Impact | Free Summer Camp & Community Programs in Alcolu, SC'
    : 'Unity Christian Church in Alcolu, SC | Worship & Community';
  const description = impact
    ? 'Discover Unity Youth Camp for ages 5–17, a free community baby shower, Unity R US Christmas Store, and A Night of Unity Gala in Alcolu, SC.'
    : 'Find your church community at Unity Christian Church in Alcolu, SC. Join Sunday worship at 10:30 AM, Bible study, prayer, and outreach for local families.';
  const image = SITE_URL + '/images/unity-church-exterior.png';
  const church = {
    '@type': ['Church', 'Organization'], '@id': SITE_URL + '/#church',
    name: 'Unity Christian Church', url: SITE_URL + '/',
    description: 'A church in Alcolu, South Carolina, serving the community through worship, prayer, biblical teaching, and outreach.',
    image, logo: SITE_URL + '/images/unity-christian-church-logo.png',
    address: {
      '@type': 'PostalAddress', streetAddress: '1631 Trinity Church Rd',
      addressLocality: 'Alcolu', addressRegion: 'SC', postalCode: '29001', addressCountry: 'US',
    },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=1631+Trinity+Church+Rd,+Alcolu,+SC+29001',
  };
  const graph = [church, {
    '@type': 'WebSite', '@id': SITE_URL + '/#website',
    url: SITE_URL + '/', name: 'Unity Christian Church', alternateName: 'Unity Christian Church Alcolu',
    publisher: { '@id': church['@id'] }, inLanguage: 'en-US',
  }, {
    '@type': 'WebPage', '@id': url + '#webpage', url, name: title, description,
    isPartOf: { '@id': SITE_URL + '/#website' }, about: { '@id': church['@id'] }, inLanguage: 'en-US',
  }];
  if (impact) {
    graph.push({
      '@type': 'ItemList', name: 'Unity Impact Community Programs',
      itemListElement: IMPACT_PROGRAMS.map((program, index) => ({
        '@type': 'ListItem', position: index + 1,
        item: { '@type': 'Thing', name: program.title, description: program.desc },
      })),
    }, {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Unity Christian Church', item: SITE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: 'Unity Impact', item: url },
      ],
    });
  }
  return { title, description, url, image, robots: route.startsWith('#/dev/') ? 'noindex, nofollow' : 'index, follow, max-image-preview:large', structuredData: { '@context': 'https://schema.org', '@graph': graph } };
}

const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export function renderSeoHead(route) {
  const seo = getSeo(route);
  return `<title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="robots" content="${seo.robots}" />
    <link rel="canonical" href="${seo.url}" />
    <meta property="og:site_name" content="Unity Christian Church" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${seo.url}" />
    <meta property="og:image" content="${seo.image}" />
    <meta property="og:image:alt" content="Unity Christian Church in Alcolu, South Carolina" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${seo.image}" />
    <meta name="twitter:image:alt" content="Unity Christian Church in Alcolu, South Carolina" />
    <script id="structured-data" type="application/ld+json">${JSON.stringify(seo.structuredData).replaceAll('<', '\\u003c')}</script>`;
}

export function updateSeo(route) {
  const seo = getSeo(route);
  document.title = seo.title;
  const values = {
    'meta[name="description"]': seo.description,
    'meta[name="robots"]': seo.robots,
    'meta[property="og:title"]': seo.title,
    'meta[property="og:description"]': seo.description,
    'meta[property="og:url"]': seo.url,
    'meta[name="twitter:title"]': seo.title,
    'meta[name="twitter:description"]': seo.description,
  };
  Object.entries(values).forEach(([selector, content]) => document.querySelector(selector)?.setAttribute('content', content));
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', seo.url);
  const structuredData = document.getElementById('structured-data');
  if (structuredData) structuredData.textContent = JSON.stringify(seo.structuredData);
}
