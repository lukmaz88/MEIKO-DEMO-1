import { useState, type FormEvent } from 'react';
import { Button } from './ui';
import { useHref, useT } from '../i18n/LangContext';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE = /^\+?[\d\s()-]{7,}$/;

/** The one quote form of the site: three fields. Used on the quote page and at the bottom of service/warehouse pages. */
export function QuoteCard({ initialService }: { initialService?: string }) {
  const t = useT();
  const href = useHref();
  const f = t.quote.flow;
  const svc = f.services.find((s) => s.slug === initialService);
  const [who, setWho] = useState('');
  const [reach, setReach] = useState('');
  const [desc, setDesc] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const badReach = !EMAIL.test(reach.trim()) && !PHONE.test(reach.trim());

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!who.trim() || !reach.trim() || !desc.trim()) { setErr(t.quote.errors.required); return; }
    if (badReach) { setErr(t.quote.errors.email); return; }
    setErr(null);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="qcard">
        <div className="success" role="status">
          <svg className="check" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" /><path d="M18 33 L28 43 L46 23" /></svg>
          <h2>{t.quote.success.title}</h2>
          <p>{t.quote.success.text}</p>
          <Button to={href('home')} variant="ghost">{t.cta.back}</Button>
        </div>
      </div>
    );
  }

  return (
    <form className="qcard" onSubmit={submit} noValidate>
      <h2>{f.cardTitle}</h2>
      <p>{svc ? `${f.service}: ${svc.name}. ` : ''}{f.cardLead}</p>

      <div className="row">
        <label htmlFor="who">{f.who}</label>
        <input id="who" value={who} onChange={(e) => setWho(e.target.value)} placeholder={f.whoPh} autoComplete="name" aria-invalid={!!err && !who.trim()} />
      </div>

      <div className="row">
        <label htmlFor="reach">{f.reach}</label>
        <input id="reach" value={reach} onChange={(e) => setReach(e.target.value)} placeholder={f.reachPh} autoComplete="email" aria-invalid={!!err && (!reach.trim() || badReach)} />
      </div>

      <div className="row">
        <label htmlFor="desc">{f.desc}</label>
        <textarea id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={f.descPh} aria-invalid={!!err && !desc.trim()} />
      </div>

      <button type="submit" className="btn btn-primary">{t.quote.submit}</button>
      {err && <p className="qf-err" role="alert">{err}</p>}
    </form>
  );
}
