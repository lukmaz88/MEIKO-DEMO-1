import type { FactKey } from '../data/facts';
import type { RouteKey } from '../i18n/routes';

export type Faq = { q: string; a: string };
export type Param = { label: string; factKey: FactKey };

export type ServiceContent = {
  key: 'svcForwarding' | 'svcTransport' | 'svcWarehousing';
  slug: string;
  name: string;
  short: string;
  lead: string;
  image: string;
  params: Param[];
  benefits: { title: string; text: string }[];
  faq: Faq[];
};

export type WarehouseContent = {
  key: 'whGliwice1' | 'whGliwice2' | 'whDabrowa';
  name: string;
  city: string;
  address: string;
  lead: string;
  badge?: string;
  image?: string;
  params: Param[];
  features: string[];
};

export type Content = {
  meta: { siteName: string; titleSuffix: string; description: string };
  nav: { label: string; key: RouteKey }[];
  cta: { quote: string; services: string; more: string; allServices: string; back: string; details: string };
  hero: { eyebrow: string; h1: string; sub: string };
  proof: { label: string; factKey: FactKey }[];
  services: {
    title: string; lead: string;
    key: ServiceContent[];
    homeTiles: { name: string; short: string; key: 'svcForwarding' | 'svcTransport' | 'svcWarehousing'; hash?: string }[];
    secondRowTitle: string;
    secondRow: { name: string; text: string }[];
    crossDocking: { title: string; text: string };
  };
  audiences: { title: string; lead: string; items: { title: string; text: string }[] };
  why: { title: string; kanji: string; kanjiMeaning: string; items: { trait: string; fact: string }[] };
  warehouses: { title: string; lead: string; renderPlaceholder: string; mapPlaceholder: string; launchNote: string; featuresTitle: string; distancesTitle: string; distances: { place: string; km: string }[]; items: WarehouseContent[] };
  certs: { title: string; lead: string; zoom: string; items: { code: string; name: string; text: string }[] };
  depts: { title: string; lead: string; items: { name: string; phone: string; email: string }[] };
  quoteBand: { title: string; lead: string };
  quote: {
    title: string; lead: string; reply: string;
    fields: { contact: string; email: string; service: string; company: string; phone: string; cargo: string };
    servicePlaceholder: string;
    submit: string;
    success: { title: string; text: string };
    errors: { required: string; email: string };
    flow: {
      title: string; lead: string; after: [string, string, string];
      cardTitle: string; cardLead: string;
      service: string; services: { slug: string; name: string; icon: string }[];
      who: string; whoPh: string;
      reach: string; reachPh: string;
      desc: string; descPh: string;
    };
  };
  about: {
    title: string; lead: string;
    group: { title: string; text: string; facts: { label: string; value: string }[] };
    timelineTitle: string;
    timeline: { era: string; title: string; text: string }[];
    valuesTitle: string; valuesLead: string;
    values: { kanji: string; romaji: string; meaning: string }[];
    network: { title: string; lead: string; regions: { name: string; cities: string }[] };
  };
  quality: { title: string; lead: string; outcomesTitle: string; outcomes: { title: string; text: string }[] };
  contact: { title: string; lead: string; locationsTitle: string; locations: { name: string; address: string }[] };
  footer: { legal: string; docs: string[]; pagesTitle: string; docsTitle: string; langTitle: string; note: string; address: string };
  faqTitle: string;
  approval: { tooltip: string; legend: string };
  notFound: { title: string; text: string };
};
