import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { usePageTitle } from '../components/layout/Layout';
import { Certs, DeptContacts, NetworkMarquee, ProofStrip } from '../components/sections';
import { Button, Container, ImgReveal, Reveal } from '../components/ui';
import { homeCopy } from '../content/home';
import { useHref, useLang, useT } from '../i18n/LangContext';
import '../styles/home.css';

const services = [
  { key: 'svcForwarding', image: 'still-office.jpg', hash: '' },
  { key: 'svcWarehousing', image: 'still-aisle.jpg', hash: '' },
  { key: 'svcTransport', image: 'still-aerial.jpg', hash: '' },
  { key: 'svcWarehousing', image: 'still-forklift.jpg', hash: '#cross-docking' },
] as const;
const audienceImages = ['still-bigbags.jpg', 'still-aisle.jpg', 'still-forklift.jpg'];

export function Home() {
  usePageTitle();
  const c = homeCopy[useLang()];
  const t = useT();
  const href = useHref();
  const [audience, setAudience] = useState(0);
  const [video, setVideo] = useState(false);
  useEffect(() => {
    const ok = matchMedia('(min-width: 901px)').matches && matchMedia('(prefers-reduced-motion: no-preference)').matches;
    if (ok) setVideo(true);
  }, []);
  const selected = c.audiences[audience];

  return (
    <div className="home-page">
      <section className="home-hero">
        <img className="home-hero-media" src="/media/hero-poster.jpg" alt="" fetchPriority="high" />
        {video && <video className="home-hero-media" src="/media/hero.mp4" muted playsInline loop autoPlay preload="none" poster="/media/hero-poster.jpg" aria-hidden="true" />}
        <div className="home-hero-shade" />
        <Container>
          <div className="home-hero-copy enter">
            <h1>{c.title[0]}<span>{c.title[1]}</span></h1>
            <p>{c.intro}</p>
            <div className="hero-cta">
              <Button to={href('quote')}>{t.cta.quote}</Button>
              <Button href="#uslugi" variant="light">{t.cta.services}</Button>
            </div>
          </div>
        </Container>
      </section>

      <ProofStrip />

      <Reveal as="section" className="home-section">
        <Container>
          <div id="uslugi" style={{ scrollMarginTop: 96 }} />
          <div className="home-section-head"><h2>{c.servicesTitle}</h2><p>{c.servicesLead}</p></div>
          <div className="home-services stagger">
            {c.services.map((service, i) => (
              <Link className="home-service" to={href(services[i].key) + services[i].hash} key={service.title}>
                <ImgReveal src={`/media/${services[i].image}`} className="home-service-photo" />
                <div className="home-service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <span className="home-service-link">{t.cta.details}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="home-customs"><p><strong>{c.customs}</strong> {c.customsText}</p><Link to={href('svcForwarding')}>{c.customsLink}</Link></div>
        </Container>
      </Reveal>

      <Reveal as="section" className="home-industries home-section">
        <Container>
          <div className="home-section-head"><h2>{c.audienceTitle}</h2><p>{c.audienceLead}</p></div>
          <div className="industry-select" role="tablist" aria-label={c.audienceLabel}>
            {c.audiences.map((a, i) => (
              <button key={a.name} role="tab" aria-selected={audience === i} aria-controls="industry-detail" onClick={() => setAudience(i)}>{a.name}</button>
            ))}
          </div>
          <div className="industry-detail" id="industry-detail" role="tabpanel" key={audience}>
            <div className="industry-copy" aria-live="polite">
              <h3>{selected.title}</h3>
              <p>{selected.text}</p>
              <ul>{selected.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <Link to={href('quote')}>{c.solution}</Link>
            </div>
            <img src={`/media/${audienceImages[audience]}`} alt="" loading="lazy" />
          </div>
        </Container>
      </Reveal>

      <NetworkMarquee />

      <Reveal as="section" className="home-section home-warehouses">
        <Container>
          <div className="home-section-head"><h2>{c.warehouseTitle}</h2><p>{c.warehouseLead}</p></div>
          <div className="home-warehouse-grid stagger">
            {t.warehouses.items.map((w, i) => (
              <Link to={href(w.key)} className={`home-warehouse ${i === 2 ? 'planned' : ''}`} key={w.key}>
                <div className="home-warehouse-photo">
                  <ImgReveal src={w.image!} />
                  <span className="warehouse-status">{i === 2 ? c.planned : c.operational}</span>
                  {i === 2 && <small>{c.render}</small>}
                </div>
                <div className="home-warehouse-copy">
                  <h3>{w.name} · {w.city}</h3>
                  <p>{w.address}</p>
                  <div className="warehouse-feature">{c.warehouseTags[i]}</div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Reveal>

      <Reveal as="section" className="home-section home-about">
        <Container>
          <figure>
            <ImgReveal src="/media/team.jpg" alt={c.teamCaption} className="home-about-img parallax" />
            <figcaption><span>{c.teamCaption}</span><span aria-hidden="true" lang="ja">絆</span></figcaption>
          </figure>
          <div className="home-about-copy">
            <h2>{c.whyTitle}</h2>
            <p className="home-about-intro">{c.whyIntro}</p>
            <ul className="stagger">{c.why.map((item) => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ul>
            <Link className="home-text-link" to={href('about')}>{c.aboutLink}</Link>
          </div>
        </Container>
      </Reveal>

      <section className="home-quality"><Container><h2>{c.qualityTitle}</h2></Container><Certs compact /></section>

      <DeptContacts />

      <Reveal as="section" className="home-contact home-section">
        <Container>
          <div className="home-section-head">
            <h2>{c.contactTitle}</h2>
            <div><p>{c.contactLead}</p><div className="hero-cta"><Button to={href('quote')}>{t.cta.quote}</Button><Link to={href('contact')}>{c.contactLink}</Link></div></div>
          </div>
          <ol className="home-steps stagger">{c.steps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        </Container>
      </Reveal>
    </div>
  );
}
