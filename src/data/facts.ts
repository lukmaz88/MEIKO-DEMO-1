/** Language-neutral figures. `approved:false` = sample value, rendered with an approval marker until the board confirms it. */
export type Fact = { value: string; approved: boolean };

export const facts = {
  since: { value: '1949', approved: true },
  inPolandSince: { value: '2005', approved: true },
  certs: { value: 'ISO 9001 · AEO', approved: true },
  team: { value: '120+', approved: false },
  sqm: { value: '45 000 m²', approved: false },
  pallets: { value: '61 000', approved: false },
  docks: { value: '39', approved: false },

  wh1Sqm: { value: '14 000 m²', approved: false },
  wh1Pallets: { value: '18 000', approved: false },
  wh1Docks: { value: '12', approved: false },
  wh2Sqm: { value: '12 000 m²', approved: false },
  wh2Pallets: { value: '15 000', approved: false },
  wh2Docks: { value: '10', approved: false },
  wh3Sqm: { value: '19 000 m²', approved: true },
  wh3Pallets: { value: '28 000', approved: true },
  wh3Docks: { value: '17', approved: true },
  wh3Start: { value: '06.2027', approved: true },

  carrierPartners: { value: '80+', approved: false },
  countries: { value: '30+', approved: false },
  customsPerMonth: { value: '1 500+', approved: false },
  replyTime: { value: '1', approved: true },
} satisfies Record<string, Fact>;

export type FactKey = keyof typeof facts;
