export type Lang = 'pl' | 'en';
export const LANGS: Lang[] = ['pl', 'en'];

export type RouteKey =
  | 'home' | 'services' | 'svcForwarding' | 'svcTransport' | 'svcWarehousing'
  | 'whGliwice1' | 'whGliwice2' | 'whDabrowa'
  | 'about' | 'quality' | 'contact' | 'quote';

export const PATHS: Record<RouteKey, { pl: string; en: string }> = {
  home: { pl: '', en: '' },
  services: { pl: 'uslugi', en: 'services' },
  svcForwarding: { pl: 'uslugi/spedycja', en: 'services/freight-forwarding' },
  svcTransport: { pl: 'uslugi/transport', en: 'services/transport' },
  svcWarehousing: { pl: 'uslugi/magazynowanie', en: 'services/warehousing' },
  whGliwice1: { pl: 'magazyny/gliwice-1', en: 'warehouses/gliwice-1' },
  whGliwice2: { pl: 'magazyny/gliwice-2', en: 'warehouses/gliwice-2' },
  whDabrowa: { pl: 'magazyny/dabrowa-gornicza', en: 'warehouses/dabrowa-gornicza' },
  about: { pl: 'o-firmie', en: 'about' },
  quality: { pl: 'jakosc-i-certyfikaty', en: 'quality-and-certifications' },
  contact: { pl: 'kontakt', en: 'contact' },
  quote: { pl: 'zapytanie-ofertowe', en: 'request-a-quotation' },
};

export const isLang = (s: string | undefined): s is Lang => s === 'pl' || s === 'en';

export const buildPath = (lang: Lang, key: RouteKey, search = '') =>
  `/${lang}${PATHS[key][lang] ? '/' + PATHS[key][lang] : ''}${search}`;

export const keyFromPath = (lang: Lang, rest: string): RouteKey | null => {
  const clean = rest.replace(/^\/|\/$/g, '');
  return (Object.keys(PATHS) as RouteKey[]).find((k) => PATHS[k][lang] === clean) ?? null;
};

/** Same page in the other language. Unknown pages fall back to that language's home. */
export const twinPath = (pathname: string, search = ''): string => {
  const [, lang, ...rest] = pathname.split('/');
  const l: Lang = isLang(lang) ? lang : 'pl';
  const other: Lang = l === 'pl' ? 'en' : 'pl';
  const k = keyFromPath(l, rest.join('/'));
  return buildPath(other, k ?? 'home', k ? search : '');
};
