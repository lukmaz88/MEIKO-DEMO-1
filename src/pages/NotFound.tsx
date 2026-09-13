import { usePageTitle } from '../components/layout/Layout';
import { Button, Container } from '../components/ui';
import { useHref, useT } from '../i18n/LangContext';

export function NotFound() {
  const t = useT();
  const href = useHref();
  usePageTitle('404');
  return (
    <section className="nf">
      <Container>
        <h1>{t.notFound.title}</h1>
        <p>{t.notFound.text}</p>
        <Button to={href('home')}>{t.cta.back}</Button>
      </Container>
    </section>
  );
}
