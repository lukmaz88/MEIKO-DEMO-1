import { usePageTitle } from '../components/layout/Layout';
import { Audiences, Certs, DeptContacts, Hero, QuoteBlock, ServiceGrid, WarehouseTiles, WhyMeiko } from '../components/sections';

export function Home() {
  usePageTitle();
  return (
    <>
      <Hero />
      <ServiceGrid />
      <Audiences />
      <WhyMeiko />
      <WarehouseTiles />
      <Certs />
      <DeptContacts />
      <QuoteBlock />
    </>
  );
}
