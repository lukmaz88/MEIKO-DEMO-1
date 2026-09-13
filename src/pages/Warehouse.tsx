import { usePageTitle } from '../components/layout/Layout';
import { DeptContacts, ParamTable, QuoteBlock } from '../components/sections';
import { Container, ImgReveal, PageHero, Placeholder, Reveal } from '../components/ui';
import type { WarehouseContent } from '../content/types';
import { useLang, useT } from '../i18n/LangContext';

export function Warehouse({ k }: { k: WarehouseContent['key'] }) {
  const t = useT();
  const lang = useLang();
  const w = t.warehouses.items.find((x) => x.key === k)!;
  const whSlug = t.services.key.find((s) => s.key === 'svcWarehousing')!.slug;
  usePageTitle(`${w.name} · ${w.city}`);
  const deptNames = lang === 'pl' ? ['Magazyn', 'Biuro'] : ['Warehouse', 'Office'];
  return (
    <>
      <PageHero title={`${w.name} · ${w.city}`} lead={w.lead} image={w.image} badge={w.badge} eyebrow={w.address} />
      <section className="section">
        <Container>
          <ParamTable rows={w.params} />
          <div className="two">
            <div>
              <ul className="feat">{w.features.map((f) => <li key={f}>{f}</li>)}</ul>
              {w.badge && <p className="lead" style={{ marginTop: 32 }}>{t.warehouses.launchNote}</p>}
            </div>
            <div>
              <p style={{ marginBottom: 16 }}>{w.address}</p>
              <Placeholder label={t.warehouses.mapPlaceholder} className="map" />
            </div>
          </div>
        </Container>
      </section>
      {k !== 'whDabrowa' ? (
        <Reveal as="section" className="section">
          <Container>
            <div className="gal stagger">
              <ImgReveal src="/media/still-aisle.jpg" />
              <ImgReveal src="/media/still-forklift.jpg" />
              <ImgReveal src="/media/still-bigbags.jpg" />
            </div>
          </Container>
        </Reveal>
      ) : (
        <Reveal as="section" className="section">
          <Container><ImgReveal src="/media/wh3-render.jpg" className="wide" /></Container>
        </Reveal>
      )}
      <DeptContacts only={deptNames} />
      <QuoteBlock service={whSlug} />
    </>
  );
}
