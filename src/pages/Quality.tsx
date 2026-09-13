import { useState, type CSSProperties } from 'react';
import { usePageTitle } from '../components/layout/Layout';
import { Certs, QuoteBlock } from '../components/sections';
import { Container, Lightbox, Reveal } from '../components/ui';
import { useT } from '../i18n/LangContext';

const STATS = [
  { value: '2019', key: 'aeo' },
  { value: '2027', key: 'iso' },
  { value: '2', key: 'sites' },
] as const;

export function Quality() {
  const t = useT();
  usePageTitle(t.quality.title);
  const [zoom, setZoom] = useState<number | null>(null);
  const open = zoom === null ? null : t.certs.items[zoom];
  return (
    <>
      {open && <Lightbox src={open.image} alt={open.code} onClose={() => setZoom(null)} />}
      <section className="qhero">
        <img className="qpage-bg" src="/media/quote-bg.jpg" alt="" fetchPriority="high" />
        <div className="qpage-shade" />
        <Container>
          <div className="qhero-grid">
            <div className="qhero-copy enter">
              <h1>{t.quality.title}</h1>
              <p className="lead">{t.quality.lead}</p>
              <dl className="qhero-stats">
                {STATS.map((s) => (
                  <div key={s.key}><dd>{s.value}</dd><dt>{t.quality.stats[s.key]}</dt></div>
                ))}
              </dl>
            </div>
            <div className="docfan" aria-label={t.certs.title}>
              {t.certs.items.map((c, i) => (
                <button key={c.code} type="button" className={`doc doc-${i}`} style={{ '--i': i } as CSSProperties} onClick={() => setZoom(i)} aria-label={`${t.certs.zoom}: ${c.code}`}>
                  <img src={c.image} alt="" />
                  <span className="doc-label">{c.code}</span>
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Certs compact heading={false} />

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
