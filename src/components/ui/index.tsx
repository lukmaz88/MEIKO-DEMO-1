import { useEffect, useRef, type ReactNode } from 'react';
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
      <div className="stat-value"><Approved fact={facts[factKey]} /></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export function Kanji({ char, className = '' }: { char: string; className?: string }) {
  return <span className={`kanji ${className}`} aria-hidden="true">{char}</span>;
}

/** Page opener for subpages: title + lead, optional full-bleed image. */
export function PageHero({ title, lead, image, badge, eyebrow }: { title: string; lead: string; image?: string; badge?: string; eyebrow?: string }) {
  if (image) {
    return (
      <section className="phero phero-img">
        <img src={image} alt="" fetchPriority="high" />
        <div className="hero-shade" />
        <Container>
          <div className="phero-copy">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
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
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
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
