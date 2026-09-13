import { usePageTitle } from '../components/layout/Layout';
import { Container, PageHero, Reveal } from '../components/ui';
import { useT } from '../i18n/LangContext';

export function About() {
  const t = useT();
  usePageTitle(t.nav[1].label);
  const a = t.about;
  return (
    <>
      <PageHero title={a.title} lead={a.lead} image="/media/still-flags.jpg" />
      <Reveal as="section" className="section">
        <Container>
          <div className="two">
            <div>
              <h2 style={{ marginBottom: 20 }}>{a.group.title}</h2>
              <p className="lead">{a.group.text}</p>
              <dl className="gfacts">
                {a.group.facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
              </dl>
            </div>
            <img src="/media/map-europe.jpg" alt="" loading="lazy" style={{ borderRadius: 6, width: '100%' }} />
          </div>
        </Container>
      </Reveal>
      <Reveal as="section" className="section">
        <Container>
          <div className="sec-head"><h2>{a.timelineTitle}</h2></div>
          <div className="tl">
            {a.timeline.map((e) => <div key={e.era}><span className="era">{e.era}</span><h3>{e.title}</h3><p>{e.text}</p></div>)}
          </div>
        </Container>
      </Reveal>
      <Reveal as="section" className="section">
        <Container>
          <div className="sec-head"><h2>{a.valuesTitle}</h2><p className="lead">{a.valuesLead}</p></div>
          <div className="vals">
            {a.values.map((v) => (
              <div key={v.romaji} className="val-card">
                <span className="kanji" lang="ja">{v.kanji}</span>
                <span className="romaji">{v.romaji}</span>
                <p>{v.meaning}</p>
              </div>
            ))}
          </div>
        </Container>
      </Reveal>
      <Reveal as="section" className="section">
        <Container>
          <div className="sec-head"><h2>{a.network.title}</h2><p className="lead">{a.network.lead}</p></div>
          <div className="net">
            {a.network.regions.map((r) => <div key={r.name}><h3>{r.name}</h3><p>{r.cities}</p></div>)}
          </div>
        </Container>
      </Reveal>
    </>
  );
}
