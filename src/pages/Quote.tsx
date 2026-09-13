import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { usePageTitle } from '../components/layout/Layout';
import { Button, Container } from '../components/ui';
import { useHref, useT } from '../i18n/LangContext';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE = /^\+?[\d\s()-]{7,}$/;

/** Quote page: editorial copy on the left, one navy card on the right with four fields. */
export function Quote() {
  const t = useT();
  const href = useHref();
  usePageTitle(t.quote.title);
  const f = t.quote.flow;
  const [params] = useSearchParams();
  const pre = params.get('service') ?? '';
  const [service, setService] = useState(f.services.some((s) => s.slug === pre) ? pre : f.services[0].slug);
  const [cargo, setCargo] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [reach, setReach] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const badReach = !EMAIL.test(reach.trim()) && !PHONE.test(reach.trim());

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!cargo.trim() || !reach.trim()) { setErr(t.quote.errors.required); return; }
    if (badReach) { setErr(t.quote.errors.email); return; }
    setErr(null);
    setSent(true);
  };

  return (
    <section>
      <Container>
        <div className="qp">
          <div className="qp-copy">
            <h1>{f.title}</h1>
            <p className="lead">{f.lead}</p>
            <ol className="qp-after">
              {f.after.map((a, i) => <li key={a}><i>{i + 1}</i><em /><span>{a}</span></li>)}
            </ol>
          </div>

          <div className="qcard">
            {sent ? (
              <div className="success" role="status">
                <svg className="check" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" /><path d="M18 33 L28 43 L46 23" /></svg>
                <h2>{t.quote.success.title}</h2>
                <p>{t.quote.success.text}</p>
                <Button to={href('home')} variant="ghost">{t.cta.back}</Button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2>{f.cardTitle}</h2>
                <p>{f.cardLead}</p>

                <div className="row">
                  <span className="lbl" id="svc-label">{f.service}</span>
                  <div className="seg" role="group" aria-labelledby="svc-label">
                    {f.services.map((s) => (
                      <button key={s.slug} type="button" aria-pressed={service === s.slug} onClick={() => setService(s.slug)}>
                        <img src={`/media/icons/${s.icon}.png`} alt="" />{s.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="row">
                  <label htmlFor="cargo">{f.cargo}</label>
                  <input id="cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} placeholder={f.cargoPh} aria-invalid={!!err && !cargo.trim()} />
                </div>

                <div className="row">
                  <span className="lbl">{f.route}</span>
                  <div className="qroute">
                    <div className="pin"><img src="/media/icons/pin.png" alt="" /><small>{f.from}</small><input id="from" aria-label={f.from} value={from} onChange={(e) => setFrom(e.target.value)} placeholder={f.fromPh} /></div>
                    <div className="pin"><img src="/media/icons/pin.png" alt="" /><small>{f.to}</small><input id="to" aria-label={f.to} value={to} onChange={(e) => setTo(e.target.value)} placeholder={f.toPh} /></div>
                  </div>
                </div>

                <div className="row">
                  <label htmlFor="reach">{f.reach}</label>
                  <input id="reach" value={reach} onChange={(e) => setReach(e.target.value)} placeholder={f.reachPh} autoComplete="email" aria-invalid={!!err && (!reach.trim() || badReach)} />
                </div>

                <button type="submit" className="btn btn-primary">{t.quote.submit}</button>
                {err && <p className="qf-err" role="alert">{err}</p>}
                <p className="qnote">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                  {t.quote.reply}
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
