import { usePageTitle } from '../components/layout/Layout';
import { Certs, QuoteBlock } from '../components/sections';
import { Container, PageHero, Reveal } from '../components/ui';
import { useT } from '../i18n/LangContext';

export function Quality() {
  const t = useT();
  usePageTitle(t.quality.title);
  return (
    <>
      <PageHero title={t.quality.title} lead={t.quality.lead} />
      <Certs compact />
      <Reveal as="section" className="section">
        <Container>
          <div className="sec-head"><h2>{t.quality.outcomesTitle}</h2></div>
          <div className="outs stagger">
            {t.quality.outcomes.map((o) => <div key={o.title}><h3>{o.title}</h3><p>{o.text}</p></div>)}
          </div>
        </Container>
      </Reveal>
      <QuoteBlock />
    </>
  );
}
