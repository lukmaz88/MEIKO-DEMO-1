import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { usePageTitle } from '../components/layout/Layout';
import { Button, Container, PageHero } from '../components/ui';
import { useHref, useT } from '../i18n/LangContext';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE = /^\+?[\d\s()-]{7,}$/;

/** Three short steps instead of a six-field form: pick a service, finish one sentence, say how to reach you. */
export function Quote() {
  const t = useT();
  const href = useHref();
  usePageTitle(t.quote.title);
  const f = t.quote.flow;
  const [params] = useSearchParams();
  const pre = params.get('service') ?? '';
  const [service, setService] = useState(f.services.some((s) => s.slug === pre) ? pre : '');
  const [step, setStep] = useState(service ? 1 : 0);
  const [cargo, setCargo] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [who, setWho] = useState('');
  const [reach, setReach] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const svc = f.services.find((s) => s.slug === service);

  const pick = (slug: string) => {
    setService(slug);
    setErr(null);
    setTimeout(() => setStep(1), 220);
  };
  const next = () => {
    if (!cargo.trim()) { setErr(t.quote.errors.required); return; }
    setErr(null);
    setStep(2);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!who.trim() || !reach.trim()) { setErr(t.quote.errors.required); return; }
    if (!EMAIL.test(reach.trim()) && !PHONE.test(reach.trim())) { setErr(t.quote.errors.email); return; }
    setErr(null);
    setSent(true);
  };

  if (sent) {
    return (
      <>
        <PageHero title={t.quote.title} lead={t.quote.lead} />
        <section className="section">
          <Container>
            <div className="success" role="status">
              <svg className="check" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" /><path d="M18 33 L28 43 L46 23" /></svg>
              <h2>{t.quote.success.title}</h2>
              <p>{t.quote.success.text}</p>
              <Button to={href('home')} variant="ghost">{t.cta.back}</Button>
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero title={t.quote.title} lead={t.quote.lead} />
      <section className="section">
        <Container>
          <div className="qf">
            <ol className="qf-steps" aria-label={t.quote.title}>
              {f.steps.map((s, i) => (
                <li key={s} className={i === step ? 'on' : i < step ? 'done' : ''} aria-current={i === step ? 'step' : undefined}><span>0{i + 1}</span>{s}</li>
              ))}
            </ol>

            {step === 0 && (
              <div className="qf-pane" key="s0">
                <h2>{f.steps[0]}</h2>
                <div className="qf-tiles" role="group">
                  {f.services.map((s) => (
                    <button key={s.slug} type="button" className="qf-tile" aria-pressed={service === s.slug} onClick={() => pick(s.slug)}>
                      <img src={`/media/icons/${s.icon}.png`} alt="" />
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="qf-pane" key="s1">
                <h2>{f.steps[1]}</h2>
                <p className="qf-sentence">
                  {f.sentence.before} <b>{svc?.verb}</b>{' '}
                  <input id="cargo" aria-label={f.sentence.cargo} placeholder={f.sentence.cargoPh} value={cargo} onChange={(e) => setCargo(e.target.value)} aria-invalid={!!err && !cargo.trim()} autoFocus />
                  <br />
                  <span className="opt">{f.sentence.from}</span>{' '}
                  <input id="from" aria-label={f.sentence.from} placeholder={f.sentence.fromPh} value={from} onChange={(e) => setFrom(e.target.value)} />
                  {' '}<span className="opt">{f.sentence.to}</span>{' '}
                  <input id="to" aria-label={f.sentence.to} placeholder={f.sentence.toPh} value={to} onChange={(e) => setTo(e.target.value)} />.
                </p>
                {err && <p className="qf-err" role="alert">{err}</p>}
                <div className="qf-nav">
                  <button type="button" className="btn btn-primary" onClick={next}>{f.next}</button>
                  <button type="button" className="btn btn-ghost" onClick={() => { setErr(null); setStep(0); }}>{f.back}</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form className="qf-pane" key="s2" onSubmit={submit} noValidate>
                <h2>{f.steps[2]}</h2>
                <div className="qf-summary">
                  {svc && <img src={`/media/icons/${svc.icon}.png`} alt="" />}
                  <b>{svc?.name}</b>
                  <span>{cargo}</span>
                  {(from || to) && <span>{from && `${f.sentence.from} ${from}`} {to && `${f.sentence.to} ${to}`}</span>}
                </div>
                <div className="qf-who">
                  <div className="field">
                    <label htmlFor="who">{f.who}</label>
                    <input id="who" value={who} onChange={(e) => setWho(e.target.value)} placeholder={f.whoPh} autoComplete="name" aria-invalid={!!err && !who.trim()} autoFocus />
                  </div>
                  <div className="field">
                    <label htmlFor="reach">{f.reach}</label>
                    <input id="reach" value={reach} onChange={(e) => setReach(e.target.value)} placeholder={f.reachPh} autoComplete="email" aria-invalid={!!err && (!reach.trim() || (!EMAIL.test(reach.trim()) && !PHONE.test(reach.trim())))} />
                  </div>
                </div>
                {err && <p className="qf-err" role="alert">{err}</p>}
                <div className="qf-nav">
                  <button type="submit" className="btn btn-primary">{t.quote.submit}</button>
                  <button type="button" className="btn btn-ghost" onClick={() => { setErr(null); setStep(1); }}>{f.back}</button>
                  <span className="muted">{t.quote.reply}</span>
                </div>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
