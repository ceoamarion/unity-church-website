import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { getRoute } from '../src/routing.js';
import { IMPACT_PROGRAMS } from '../src/data/impactPrograms.js';

test('legacy routes and section anchors resolve to the correct page', () => {
  for (const hash of ['#/u-impact', '#u-impact', '#/u-impact/']) {
    assert.equal(getRoute({ pathname: '/', hash }), '/u-impact/');
  }
  for (const pathname of ['/u-impact', '/u-impact/']) {
    assert.equal(getRoute({ pathname, hash: '#pillars' }), '/u-impact/');
  }
  assert.equal(getRoute({ pathname: '/', hash: '#visit' }), '/');
  assert.equal(getRoute({ pathname: '/u-impact/', hash: '#/' }), '/');
});

for (const route of ['/', '/u-impact/']) {
  test(`${route} serves full HTML, unique metadata, valid schema, and existing assets`, async () => {
    const html = await readFile(`dist${route}index.html`, 'utf8');
    assert.match(html, /<main>/);
    assert.match(html, /Alcolu/);
    assert.equal((html.match(/<title>/g) || []).length, 1);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.ok(html.includes(`rel="canonical" href="https://uccalcolu.org${route}"`));
    assert.match(html, /name="robots" content="index, follow/);
    assert.match(html, /property="og:image" content="https:\/\/uccalcolu.org\//);
    const schema = JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    const church = schema['@graph'].find(item => Array.isArray(item['@type']) && item['@type'].includes('Church'));
    assert.equal(church.address.streetAddress, '1631 Trinity Church Rd');
    assert.equal(church.address.addressLocality, 'Alcolu');
    for (const [, asset] of html.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g)) {
      await access('dist' + decodeURI(asset));
    }
    const body = html.split('<body')[1];
    if (route === '/') {
      assert.match(body, /Sunday 10:30 AM EST/);
      assert.match(body, /href="\/u-impact\/"/);
    } else {
      for (const program of IMPACT_PROGRAMS.slice(0, 4)) assert.ok(body.includes(program.title));
      assert.match(body, /ages 5–17/);
      assert.match(body, /children up to 2 years old/);
      assert.match(body, /more than 300 families/);
      assert.doesNotMatch(body, /Trades &amp; Workforce Development|Community Food Sanctuary|Dignity Housing|Civic Gathering Halls/);
    }
  });
}

test('crawler files list only canonical, generated public pages', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  const robots = await readFile('dist/robots.txt', 'utf8');
  assert.match(robots, /Sitemap: https:\/\/uccalcolu.org\/sitemap.xml/);
  assert.match(sitemap, /<loc>https:\/\/uccalcolu.org\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/uccalcolu.org\/u-impact\/<\/loc>/);
  assert.doesNotMatch(sitemap, /#|dev/);
});
