import { describe, it, expect } from 'vitest';
import { pl } from '../content/pl';
import { en } from '../content/en';
import { PATHS, twinPath, buildPath } from '../i18n/routes';

const keys = (o: unknown, p = ''): string[] =>
  Object.entries(o as Record<string, unknown>).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? keys(v, p + k + '.') : [p + k],
  );

describe('i18n parity', () => {
  it('pl and en have identical key sets', () => expect(keys(pl).sort()).toEqual(keys(en).sort()));

  it('every route has both slugs', () =>
    Object.values(PATHS).forEach((p) => {
      expect(typeof p.pl).toBe('string');
      expect(typeof p.en).toBe('string');
    }));

  it('service and warehouse keys match routes and have equal counts', () => {
    for (const c of [pl, en]) {
      c.services.key.forEach((s) => expect(PATHS[s.key]).toBeDefined());
      c.warehouses.items.forEach((w) => expect(PATHS[w.key]).toBeDefined());
    }
    expect(pl.services.key.length).toBe(en.services.key.length);
    expect(pl.warehouses.items.length).toBe(en.warehouses.items.length);
  });

  it('twinPath keeps the page and query', () => {
    expect(twinPath('/pl/uslugi/spedycja')).toBe('/en/services/freight-forwarding');
    expect(twinPath('/en/warehouses/gliwice-2')).toBe('/pl/magazyny/gliwice-2');
    expect(twinPath('/pl/zapytanie-ofertowe', '?service=spedycja')).toBe('/en/request-a-quotation?service=spedycja');
    expect(twinPath('/pl/nie-ma')).toBe('/en');
    expect(buildPath('pl', 'home')).toBe('/pl');
  });

  it('no banned slogans', () => {
    const s = (JSON.stringify(pl) + JSON.stringify(en)).toLowerCase();
    for (const b of ['najlepsi na rynku', 'zawsze na czas', 'best on the market', 'always on time']) expect(s).not.toContain(b);
  });
});
