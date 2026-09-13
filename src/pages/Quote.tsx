import { useSearchParams } from 'react-router';
import { usePageTitle } from '../components/layout/Layout';
import { QuoteCard } from '../components/QuoteCard';
import { Container } from '../components/ui';
import { useT } from '../i18n/LangContext';

/** Quote page: full-bleed night motorway backdrop, editorial copy left, the quote card right. */
export function Quote() {
  const t = useT();
  usePageTitle(t.quote.title);
  const f = t.quote.flow;
  const [params] = useSearchParams();
  const pre = params.get('service') ?? undefined;

  return (
    <section className="qpage">
      <img className="qpage-bg" src="/media/quote-bg.jpg" alt="" fetchPriority="high" />
      <div className="qpage-shade" />
      <Container>
        <div className="qp">
          <div className="qp-copy">
            <h1>{f.title}</h1>
            <p className="lead">{f.lead}</p>
            <ol className="qp-after">
              {f.after.map((a, i) => <li key={a}><i>{i + 1}</i><em /><span>{a}</span></li>)}
            </ol>
          </div>
          <QuoteCard initialService={pre} />
        </div>
      </Container>
    </section>
  );
}
