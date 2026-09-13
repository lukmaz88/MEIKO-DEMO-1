import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { usePageTitle } from '../components/layout/Layout';
import { Certs, DeptContacts, NetworkMarquee, ProofStrip, ServiceCards } from '../components/sections';
import { Button, Container, ImgReveal, Reveal } from '../components/ui';
import { homeCopy } from '../content/home';
import { useHref, useLang, useT } from '../i18n/LangContext';
import '../styles/home.css';

const audienceImages = ['gen-manufacturing.jpg', 'gen-retail.jpg', 'gen-operators.jpg'];
const ROTATE_MS = 7000;
/** Split a line into word spans with a staggered delay index. */
const words = (line: string, offset: number) =>
  line.split(' ').map((w, i) => <span className="w" style={{ '--i': offset + i } as React.CSSProperties} key={w + i}>{w} </span>);

export function Home() {
  usePageTitle();
  const c = homeCopy[useLang()];
  const t = useT();
  const href = useHref();
  const [audience, setAudienceRaw] = useState(0);
  const [auto, setAuto] = useState(true);
  const setAudience = (i: number) => { setAuto(false); setAudienceRaw(i); };
  // tabs rotate on their own until the visitor picks one (storytelling: show all three profiles)
  useEffect(() => {
    if (!auto || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setAudienceRaw((a) => (a + 1) % 3), ROTATE_MS);
    return () => clearInterval(id);
  }, [auto]);
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
            <h1>{words(c.title[0], 0)}<span>{words(c.title[1], c.title[0].split(' ').length)}</span></h1>
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
          <ServiceCards />
        </Container>
      </Reveal>

      <Reveal as="section" className="home-industries home-section">
        <svg className="route" viewBox="0 0 1600 600" preserveAspectRatio="none" aria-hidden="true">
          <path className="route-path" d="M-20 470 C 200 420, 320 300, 520 330 S 860 480, 1060 300 S 1380 120, 1640 180" />
          <g className="route-nodes">
            <circle cx="520" cy="330" r="4" /><circle cx="1060" cy="300" r="4" /><circle cx="1380" cy="150" r="4" />
          </g>
          <circle className="route-dot" r="6">
            <animateMotion dur="16s" repeatCount="indefinite" path="M-20 470 C 200 420, 320 300, 520 330 S 860 480, 1060 300 S 1380 120, 1640 180" />
          </circle>
        </svg>
        <Container>
          <div className="home-section-head"><h2>{c.audienceTitle}</h2><p>{c.audienceLead}</p></div>
          <div className={`industry-select ${auto ? 'auto' : ''}`} role="tablist" aria-label={c.audienceLabel} style={{ '--rotate': `${ROTATE_MS}ms` } as React.CSSProperties}>
            {c.audiences.map((a, i) => (
              <button key={a.name + audience} role="tab" aria-selected={audience === i} aria-controls="industry-detail" onClick={() => setAudience(i)}>{a.name}<i className="tab-progress" /></button>
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
                </div>
                <div className="home-warehouse-copy">
                  <h3>{w.name} · {w.city}</h3>
                  <p>{w.address}</p>
                  <div className="warehouse-feature">{c.warehouseTags[i]}</div>
                  {i === 2 && <p className="muted">{c.planned} · {c.render}</p>}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Reveal>

      <section className="strip" aria-hidden="true">
        <div className="strip-track">
          {['still-aisle', 'still-forklift', 'still-bigbags', 'gen-manufacturing', 'still-wall-logo', 'gen-transport', 'still-flags', 'wh3-render'].map((n) => (
            <img key={n} src={`/media/${n}.jpg`} alt="" loading="lazy" />
          ))}
        </div>
      </section>

      <Reveal as="section" className="home-section home-about">
        <Container>
          <figure>
            <ImgReveal src="/media/team.jpg" className="home-about-img parallax" />
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
