import { usePageTitle } from '../components/layout/Layout';
import { DeptContacts } from '../components/sections';
import { Button, Container, PageHero, Placeholder, Reveal } from '../components/ui';
import { useHref, useT } from '../i18n/LangContext';

export function Contact() {
  const t = useT();
  const href = useHref();
  usePageTitle(t.contact.title);
  return (
    <>
      <PageHero title={t.contact.title} lead={t.contact.lead} image="/media/still-office.jpg" />
      <DeptContacts />
      <Reveal as="section" className="section">
        <Container>
          <div className="sec-head"><h2>{t.contact.locationsTitle}</h2></div>
          <div className="locs">
            {t.contact.locations.map((l) => (
              <div key={l.name} className="card">
                <Placeholder label={t.warehouses.mapPlaceholder} className="map" />
                <h3>{l.name}</h3>
                <p>{l.address}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48 }}><Button to={href('quote')}>{t.cta.quote}</Button></div>
        </Container>
      </Reveal>
    </>
  );
}
