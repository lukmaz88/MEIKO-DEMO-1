import { usePageTitle } from '../components/layout/Layout';
import { QuoteBlock, ServiceCards } from '../components/sections';
import { Container, PageHero, Reveal } from '../components/ui';
import { useT } from '../i18n/LangContext';

export function Services() {
  const t = useT();
  usePageTitle(t.nav[0].label);
  return (
    <>
      <PageHero title={t.services.title} lead={t.services.lead} />
      <Reveal as="section" className="home-section"><Container><ServiceCards /></Container></Reveal>
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
