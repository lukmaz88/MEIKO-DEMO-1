import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useHref, useT } from '../i18n/LangContext';
import { facts } from '../data/facts';
import type { Faq as FaqT, Param } from '../content/types';
import { Approved, Button, Container, CountUp, ImgReveal, Kanji, Marquee, Placeholder, Reveal, Stat } from './ui';

/* ---------------- Hero ---------------- */
export function Hero() {
  const t = useT();
  const href = useHref();
  const [video, setVideo] = useState(false);
  useEffect(() => {
    const ok = matchMedia('(min-width: 768px)').matches && matchMedia('(prefers-reduced-motion: no-preference)').matches;
    if (ok) setVideo(true);
  }, []);
  return (
    <section className="hero">
      <img className="hero-media" src="/media/hero-poster.jpg" alt="" fetchPriority="high" />
      {video && <video className="hero-media" src="/media/hero.mp4" muted playsInline loop autoPlay preload="none" poster="/media/hero-poster.jpg" />}
      <div className="hero-shade" />
      <Container>
        <div className="hero-copy enter">
          <h1>{t.hero.h1}</h1>
          <p>{t.hero.sub}</p>
          <div className="hero-cta">
            <Button to={href('quote')}>{t.cta.quote}</Button>
            <Button to={href('services')} variant="light">{t.cta.services}</Button>
          </div>
        </div>
      </Container>
      <ProofStrip />
    </section>
  );
}

export function ProofStrip() {
  const t = useT();
  return (
    <div className="proof">
      <Container>
        <div className="proof-grid">
          {t.proof.map((p) => <Stat key={p.factKey} label={p.label} factKey={p.factKey} />)}
        </div>
      </Container>
    </div>
  );
}

/* ---------------- Services bento ---------------- */
const ICON: Record<string, string> = { svcForwarding: 'globe', svcWarehousing: 'warehouse', svcTransport: 'truck', 'svcWarehousing#cross-docking': 'crossdock' };

export function ServiceGrid({ compact = false }: { compact?: boolean }) {
  const t = useT();
  const href = useHref();
  return (
    <Reveal as="section" className="section">
      <Container>
        {!compact && (
          <div className="sec-head">
            <h2>{t.services.title}</h2>
            <p className="lead">{t.services.lead}</p>
          </div>
        )}
        <div className="svc-grid stagger">
          {t.services.homeTiles.map((s, i) => {
            const svc = t.services.key.find((k) => k.key === s.key)!;
            const to = href(s.key) + (s.hash ?? '');
            const icon = ICON[s.key + (s.hash ?? '')];
            return (
              <Link key={s.name} to={to} className="card">
                {i === 0 && <ImgReveal src={svc.image} className="svc-img" />}
                <div className={i === 0 ? 'card-body' : undefined} style={i === 0 ? undefined : { display: 'contents' }}>
                  <span className="svc-icon" aria-hidden="true"><img src={`/media/icons/${icon}.png`} alt="" width={28} height={28} /></span>
                  <h3>{s.name}</h3>
                  <p>{s.short}</p>
                  <span className="more">{t.cta.more}</span>
                </div>
              </Link>
            );
          })}
        </div>
        {!compact && (
          <div className="svc-foot">
            <Button to={href('services')} variant="ghost">{t.cta.allServices}</Button>
          </div>
        )}
      </Container>
    </Reveal>
  );
}

/* ---------------- Audiences ---------------- */
export function Audiences() {
  const t = useT();
  return (
    <Reveal as="section" className="section">
      <Container>
        <div className="sec-head">
          <h2>{t.audiences.title}</h2>
          <p className="lead">{t.audiences.lead}</p>
        </div>
        <div className="aud stagger">
          {t.audiences.items.map((a) => (
            <div key={a.title}>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </Reveal>
  );
}

/* ---------------- Why Meiko ---------------- */
export function WhyMeiko() {
  const t = useT();
  return (
    <Reveal as="section" className="section">
      <Container>
        <div className="why">
          <ImgReveal src="/media/team.jpg" className="why-img parallax" />
          <div className="why-copy">
            <span className="kanji-bg" aria-hidden="true">{t.why.kanji}</span>
            <h2>{t.why.title}</h2>
            <ul className="why-list">
              {t.why.items.map((w) => (
                <li key={w.trait}><h3>{w.trait}</h3><p>{w.fact}</p></li>
              ))}
            </ul>
            <div className="kanji-sub"><Kanji char={t.why.kanji} /> {t.why.kanjiMeaning}</div>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}

/* ---------------- Group locations marquee ---------------- */
export function NetworkMarquee() {
  const t = useT();
  const items = t.about.network.regions.flatMap((r) => r.cities.split(',').map((c) => c.trim()));
  return (
    <Reveal as="section" className="section marquee-sec">
      <Marquee items={items} />
    </Reveal>
  );
}

/* ---------------- Warehouses ---------------- */
export function WarehouseTiles() {
  const t = useT();
  const href = useHref();
  return (
    <Reveal as="section" className="section">
      <Container>
        <div className="sec-head">
          <h2>{t.warehouses.title}</h2>
          <p className="lead">{t.warehouses.lead}</p>
        </div>
        <div className="wh-grid stagger">
          {t.warehouses.items.map((w) => (
            <Link key={w.key} to={href(w.key)} className="wh-tile">
              {w.image ? <img src={w.image} alt="" loading="lazy" /> : <Placeholder label={t.warehouses.renderPlaceholder} />}
              <div className="shade" />
              {w.badge && <span className="badge">{w.badge}</span>}
              <div className="cap">
                <div><h3>{w.name}</h3><span className="city">{w.city}</span></div>
                <div className="val"><Approved fact={facts[w.params[0].factKey]} /><small>{w.params[0].label}</small></div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Reveal>
  );
}

/* ---------------- Certs ---------------- */
export function Certs({ compact = false }: { compact?: boolean }) {
  const t = useT();
  const href = useHref();
  return (
    <Reveal as="section" className="section">
      <Container>
        {!compact && (
          <div className="sec-head">
            <h2>{t.certs.title}</h2>
            <p className="lead">{t.certs.lead}</p>
          </div>
        )}
        <div className="certs stagger">
          {t.certs.items.map((c, i) => (
            <Link key={c.code} to={href('quality')} className="cert">
              {i === 0 ? <img src="/media/iso-9001.jpg" alt="" loading="lazy" /> : <span className="cert-mark" aria-hidden="true">AEO</span>}
              <div>
                <div className="code">{c.code}</div>
                <div className="name">{c.name}</div>
                <p>{c.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Reveal>
  );
}

/* ---------------- Departments ---------------- */
export function DeptContacts({ only, heading = true }: { only?: string[]; heading?: boolean }) {
  const t = useT();
  const items = only ? t.depts.items.filter((d) => only.includes(d.name)) : t.depts.items;
  return (
    <Reveal as="section" className="section">
      <Container>
        {heading && (
          <div className="sec-head">
            <h2>{t.depts.title}</h2>
            <p className="lead">{t.depts.lead}</p>
          </div>
        )}
        <div className="depts stagger">
          {items.map((d) => (
            <div key={d.name}>
              <h3>{d.name}</h3>
              <a href={`tel:${d.phone.replace(/\s/g, '')}`}>{d.phone}</a>
              <a href={`mailto:${d.email}`}>{d.email}</a>
            </div>
          ))}
        </div>
      </Container>
    </Reveal>
  );
}

/* ---------------- Quote band ---------------- */
export function QuoteBlock({ service }: { service?: string }) {
  const t = useT();
  const href = useHref();
  return (
    <section className="band">
      <Container>
        <div>
          <h2>{t.quoteBand.title}</h2>
          <p>{t.quoteBand.lead}</p>
        </div>
        <div className="cta">
          <Button to={href('quote', service ? `?service=${service}` : '')} variant="light">{t.cta.quote}</Button>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Params & FAQ ---------------- */
export function ParamTable({ rows }: { rows: Param[] }) {
  return (
    <dl className={`params ${rows.length === 3 ? 'p3' : ''}`}>
      {rows.map((r) => (
        <div key={r.label}><dt>{r.label}</dt><dd><CountUp fact={facts[r.factKey]} /></dd></div>
      ))}
    </dl>
  );
}

export function Faq({ items }: { items: FaqT[] }) {
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={f.q} open={i === 0}>
          <summary><h2>{f.q}</h2></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
