import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { usePageTitle } from '../components/layout/Layout';
import { Button, Container, PageHero } from '../components/ui';
import { useHref, useT } from '../i18n/LangContext';

type FieldKey = 'contact' | 'email' | 'service' | 'company' | 'phone' | 'cargo';
const ORDER: FieldKey[] = ['contact', 'email', 'company', 'phone', 'service', 'cargo'];
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function Quote() {
  const t = useT();
  const href = useHref();
  usePageTitle(t.quote.title);
  const [params] = useSearchParams();
  const pre = params.get('service') ?? '';
  const options = [
    ...t.services.key.map((s) => ({ v: s.slug, l: s.name })),
    ...t.services.secondRow.map((s) => ({ v: s.name, l: s.name })),
  ];
  const [values, setValues] = useState<Record<FieldKey, string>>({
    contact: '', email: '', company: '', phone: '', cargo: '',
    service: options.some((o) => o.v === pre) ? pre : '',
  });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (k: FieldKey) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Partial<Record<FieldKey, string>> = {};
    for (const k of ORDER) if (!values[k].trim()) errs[k] = t.quote.errors.required;
    if (values.email && !EMAIL.test(values.email)) errs.email = t.quote.errors.email;
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <>
        <PageHero title={t.quote.title} lead={t.quote.lead} />
        <section className="section">
          <Container>
            <div className="success" role="status">
              <h2>{t.quote.success.title}</h2>
              <p>{t.quote.success.text}</p>
              <Button to={href('home')} variant="ghost">{t.cta.back}</Button>
            </div>
          </Container>
        </section>
      </>
    );
  }

  const field = (k: FieldKey, type = 'text', full = false) => (
    <div className={`field ${full ? 'full' : ''}`}>
      <label htmlFor={k}>{t.quote.fields[k]}</label>
      {k === 'service' ? (
        <select id={k} value={values.service} onChange={set('service')} aria-invalid={!!errors.service} aria-describedby={errors.service ? `${k}-err` : undefined}>
          <option value="">{t.quote.servicePlaceholder}</option>
          {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
      ) : (
        <input id={k} type={type} value={values[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} autoComplete={k === 'email' ? 'email' : k === 'phone' ? 'tel' : k === 'company' ? 'organization' : k === 'contact' ? 'name' : 'off'} />
      )}
      {errors[k] && <p className="err" id={`${k}-err`} role="alert">{errors[k]}</p>}
    </div>
  );

  return (
    <>
      <PageHero title={t.quote.title} lead={t.quote.lead} />
      <section className="section">
        <Container>
          <form className="form" onSubmit={submit} noValidate>
            {field('contact')}
            {field('email', 'email')}
            {field('company')}
            {field('phone', 'tel')}
            {field('service')}
            {field('cargo')}
            <div className="form-foot">
              <button type="submit" className="btn btn-primary">{t.quote.submit}</button>
              <span className="muted">{t.quote.reply}</span>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
}
