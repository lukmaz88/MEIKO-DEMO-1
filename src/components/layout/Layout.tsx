import { useEffect, useState } from 'react';
import { Link, Navigate, NavLink, Outlet, useLocation, useParams } from 'react-router';
import { LangProvider, useHref, useLang, useT } from '../../i18n/LangContext';
import { isLang, twinPath } from '../../i18n/routes';
import { Button, Container, Kanji, Logo } from '../ui';
import { SHOW_APPROVAL_MARKS } from '../../config';

export function usePageTitle(title?: string) {
  const t = useT();
  useEffect(() => {
    document.title = title ? `${title} | ${t.meta.titleSuffix}` : t.meta.siteName;
  }, [title, t]);
}

function LangSwitch() {
  const { pathname, search } = useLocation();
  const lang = useLang();
  return (
    <Link to={twinPath(pathname, search)} className="lang" aria-label="Language">
      <span className={lang === 'pl' ? 'on' : ''}>PL</span>
      <span className={lang === 'en' ? 'on' : ''}>EN</span>
    </Link>
  );
}

function Header() {
  const t = useT();
  const href = useHref();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="hdr">
      <Container className="hdr-in">
        <Link to={href('home')} className="logo" aria-label={t.meta.siteName}>
          <Logo />
        </Link>
        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Main">
          {t.nav.map((n) => (
            <NavLink key={n.key} to={href(n.key)} end={n.key === 'home'} className={({ isActive }) => (isActive ? 'on' : '')}>
              {n.label}
            </NavLink>
          ))}
          <div className="nav-tools">
            <LangSwitch />
            <Button to={href('quote')}>{t.cta.quote}</Button>
          </div>
        </nav>
        <button className={`burger ${open ? 'x' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
          <span /><span />
        </button>
      </Container>
    </header>
  );
}

function Footer() {
  const t = useT();
  const href = useHref();
  return (
    <footer className="ftr">
      <Container>
        <div className="ftr-grid">
          <div className="ftr-brand">
            <Logo />
            <p>{t.footer.address}</p>
            <p className="muted">{t.footer.note}</p>
          </div>
          <div>
            <h4>{t.footer.pagesTitle}</h4>
            <ul>
              {t.nav.map((n) => <li key={n.key}><Link to={href(n.key)}>{n.label}</Link></li>)}
              <li><Link to={href('quality')}>{t.quality.title}</Link></li>
              <li><Link to={href('quote')}>{t.quote.title}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.footer.docsTitle}</h4>
            <ul>{t.footer.docs.map((d) => <li key={d}><a href="#" onClick={(e) => e.preventDefault()}>{d}</a></li>)}</ul>
          </div>
          <div>
            <h4>{t.footer.langTitle}</h4>
            <LangSwitch />
            <Kanji char="絆" className="kanji-ftr" />
          </div>
        </div>
        <div className="ftr-legal">
          <span>© {new Date().getFullYear()} {t.footer.legal}</span>
          {SHOW_APPROVAL_MARKS && <span className="legend"><i className="dot" /> {t.approval.legend}</span>}
        </div>
      </Container>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  const { lang } = useParams();
  if (!isLang(lang)) return <Navigate to="/pl" replace />;
  return (
    <LangProvider lang={lang}>
      <ScrollToTop />
      <Header />
      <main key={useLocation().pathname} className="page-enter">
        <Outlet />
      </main>
      <Footer />
    </LangProvider>
  );
}
