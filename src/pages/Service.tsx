import { usePageTitle } from '../components/layout/Layout';
import { Certs, Faq, ParamTable, QuoteBlock } from '../components/sections';
import { Container, PageHero, Reveal } from '../components/ui';
import type { ServiceContent } from '../content/types';
import { useT } from '../i18n/LangContext';

export function Service({ k }: { k: ServiceContent['key'] }) {
  const t = useT();
  const s = t.services.key.find((x) => x.key === k)!;
  usePageTitle(s.name);
  return (
    <>
      <PageHero title={s.name} lead={s.lead} image={s.image} />
      <section className="section">
        <Container>
          <ParamTable rows={s.params} />
          <div className="benefits">
            {s.benefits.map((b) => <div key={b.title} className="card"><h3>{b.title}</h3><p>{b.text}</p></div>)}
          </div>
        </Container>
      </section>
      {k === 'svcWarehousing' && (
        <Reveal as="section" className="section" >
          <Container>
            <div id="cross-docking" className="two" style={{ scrollMarginTop: 96 }}>
              <h2>{t.services.crossDocking.title}</h2>
              <p className="lead">{t.services.crossDocking.text}</p>
            </div>
          </Container>
        </Reveal>
      )}
      <Certs compact />
      <Reveal as="section" className="section">
        <Container><Faq items={s.faq} /></Container>
      </Reveal>
      <QuoteBlock service={s.slug} />
    </>
  );
}
