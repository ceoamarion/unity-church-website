export function getRoute({ pathname = '/', hash = '' } = {}) {
  if (hash === '#/dev/construction-preview') return hash;
  if (['#/u-impact', '#u-impact', '#/u-impact/'].includes(hash)) return '/u-impact/';
  if (hash === '#/') return '/';
  return pathname.replace(/\/$/, '') === '/u-impact' ? '/u-impact/' : '/';
}

// Keep shared links from the original hash router working at the canonical URL.
export function normalizeLegacyRoute() {
  const { pathname, hash, search } = window.location;
  if (['#/u-impact', '#u-impact', '#/u-impact/', '#/'].includes(hash)) {
    window.history.replaceState(null, '', getRoute({ pathname, hash }) + search);
  }
}
