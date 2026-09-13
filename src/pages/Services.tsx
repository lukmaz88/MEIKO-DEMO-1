import { usePageTitle } from '../components/layout/Layout';
import { QuoteBlock, ServiceGrid } from '../components/sections';
import { Container, PageHero, Reveal } from '../components/ui';
import { useT } from '../i18n/LangContext';

export function Services() {
  const t = useT();
  usePageTitle(t.nav[0].label);
  return (
    <>
      <PageHero title={t.services.title} lead={t.services.lead} />
      <ServiceGrid compact />
      <Reveal as="section" className="section">
        <Container>
          <div className="sec-head"><h2>{t.services.secondRowTitle}</h2></div>
          <div className="two stagger">
            {t.services.secondRow.map((s) => (
              <div key={s.name} className="card"><h3>{s.name}</h3><p>{s.text}</p></div>
            ))}
          </div>
        </Container>
      </Reveal>
      <QuoteBlock />
    </>
  );
}
