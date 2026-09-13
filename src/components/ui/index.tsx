import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { SHOW_APPROVAL_MARKS } from '../../config';
import { facts, type Fact, type FactKey } from '../../data/facts';
import { useT } from '../../i18n/LangContext';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>;
}

/** Adds .in once the element enters the viewport (15%). Motivation: sequence sections as the reader scrolls. */
export function Reveal({ children, className = '', as: Tag = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'section' | 'li' | 'article' }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }),
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Tag ref={ref as any} className={`reveal ${className}`}>{children}</Tag>;
}

export function Approved({ fact }: { fact: Fact }) {
  const t = useT();
  return (
    <span className="approved">
      {fact.value}
      {!fact.approved && SHOW_APPROVAL_MARKS && <i className="dot" title={t.approval.tooltip} aria-label={t.approval.tooltip} role="img" />}
    </span>
  );
}

export function Button({ to, href, variant = 'primary', children, className = '' }: { to?: string; href?: string; variant?: 'primary' | 'ghost' | 'light'; children: ReactNode; className?: string }) {
  const cls = `btn btn-${variant} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return <a href={href} className={cls}>{children}</a>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function Stat({ label, factKey }: { label: string; factKey: FactKey }) {
  return (
    <div className="stat">
      <div className="stat-value"><CountUp fact={facts[factKey]} /></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/** Counts the leading number of a fact up from 0 once it scrolls into view. Non-numeric values render as-is. */
export function CountUp({ fact }: { fact: Fact }) {
  const t = useT();
  const ref = useRef<HTMLSpanElement>(null);
  const m = /^(\d[\d\s]*?)(\s*\D.*)?$/.exec(fact.value);
  const parsed = m ? parseInt(m[1].replace(/\s/g, ''), 10) : NaN;
  const isYear = /^\d{4}$/.test(fact.value.trim()) && parsed >= 1900 && parsed <= 2100;
  const target = isYear ? NaN : parsed;
  const [n, setN] = useState(Number.isNaN(target) ? -1 : 0);
  useEffect(() => {
    if (Number.isNaN(target) || !ref.current) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(target); return; }
    const el = ref.current;
    let raf = 0;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        setN(Math.round(target * e));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target]);
  const fmt = (v: number) => v.toLocaleString('pl-PL').replace(/,/g, ' ').replace(/\u00a0/g, ' ');
  const text = Number.isNaN(target) ? fact.value : `${fmt(n)}${m![2] ?? ''}`;
  return (
    <span className="approved" ref={ref}>
      {text}
      {!fact.approved && SHOW_APPROVAL_MARKS && <i className="dot" title={t.approval.tooltip} aria-label={t.approval.tooltip} role="img" />}
    </span>
  );
}

/** Image with curtain reveal: image settles from scale 1.12 while an ink panel wipes away. Driven by the parent .reveal.in. */
export function ImgReveal({ src, className = '', alt = '', loading = 'lazy' }: { src: string; className?: string; alt?: string; loading?: 'lazy' | 'eager' }) {
  return (
    <span className={`imgr ${className}`}>
      <img src={src} alt={alt} loading={loading} />
    </span>
  );
}

/** Single horizontal marquee. One per page. */
export function Marquee({ items }: { items: string[] }) {
  const row = items.map((x, i) => <span key={i}>{x}</span>);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{row}{row}</div>
    </div>
  );
}

export function Kanji({ char, className = '' }: { char: string; className?: string }) {
  return <span className={`kanji ${className}`} aria-hidden="true">{char}</span>;
}

/** Page opener for subpages: title + lead, optional full-bleed image. */
export function PageHero({ title, lead, image, badge }: { title: string; lead: string; image?: string; badge?: string }) {
  if (image) {
    return (
      <section className="phero phero-img">
        <img src={image} alt="" fetchPriority="high" />
        <div className="hero-shade" />
        <Container>
          <div className="phero-copy">
            <h1>{title}{badge && <span className="badge">{badge}</span>}</h1>
            <p className="lead">{lead}</p>
          </div>
        </Container>
      </section>
    );
  }
  return (
    <section className="phero">
      <Container>
        <h1>{title}{badge && <span className="badge">{badge}</span>}</h1>
        <p className="lead">{lead}</p>
      </Container>
    </section>
  );
}

export function Placeholder({ label, className = '' }: { label: string; className?: string }) {
  return <div className={`ph ${className}`}><span>{label}</span></div>;
}

export function Logo({ light = false }: { light?: boolean }) {
  return <img className="brand" src={light ? '/media/logo-light.png' : '/media/logo.png'} alt="Meiko Trans Polska" width={2047} height={339} />;
}
