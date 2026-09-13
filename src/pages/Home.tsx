import { usePageTitle } from '../components/layout/Layout';
import { Audiences, Certs, DeptContacts, Hero, NetworkMarquee, QuoteBlock, ServiceGrid, WarehouseTiles, WhyMeiko } from '../components/sections';

export function Home() {
  usePageTitle();
  return (
    <>
      <Hero />
      <ServiceGrid />
      <Audiences />
      <WhyMeiko />
      <NetworkMarquee />
      <WarehouseTiles />
      <Certs />
      <DeptContacts />
      <QuoteBlock />
    </>
  );
}
