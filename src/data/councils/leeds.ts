import type { Council } from './types'

// Source pages, read 2026-10-26:
// https://www.leeds.gov.uk/bins-and-recycling/your-bins/green-recycling-bin
// https://www.leeds.gov.uk/bins-and-recycling/your-bins/black-bin
// https://www.leeds.gov.uk/bins-and-recycling/your-bins/brown-garden-waste-bin
// https://www.leeds.gov.uk/bins-and-recycling/a-to-z-of-reusing-recycling-and-waste-disposal
// https://www.leeds.gov.uk/bins-and-recycling/medical-waste
// https://news.leeds.gov.uk/news/leeds-city-council-clarifies-position-on-bin-collections-as-new-brown-bin-food-collection-trial-announced
export const leeds: Council = {
  id: 'leeds',
  name: 'Leeds',
  checkedOn: '2026-10-26',
  sourceUrl: 'https://www.leeds.gov.uk/bins-and-recycling/your-bins',
  bins: {
    green: { label: 'Green bin', colour: '#2f9e44', description: 'Recycling' },
    black: { label: 'Black bin', colour: '#343a40', description: 'General waste' },
    brown: { label: 'Brown bin', colour: '#8b5a2b', description: 'Garden waste' },
    'drop-off': { label: 'Take it somewhere', colour: '#e67700', description: 'Not for any household bin' },
  },
  rules: {
    paper: { bin: 'green', tip: 'Clean and dry.' },
    cardboard: { bin: 'green', tip: 'Clean and dry. Flatten boxes so they fit.' },
    'greasy-cardboard': { bin: 'black', tip: 'Grease and food spoil recycling. Tear off any clean parts for the green bin.' },
    carton: { bin: 'green', tip: 'Empty and rinse.' },
    'metal-can': { bin: 'green', tip: 'Empty and rinse.' },
    aerosol: { bin: 'green', tip: 'Make sure it is completely empty.' },
    foil: { bin: 'green', tip: 'Scrape off food first.' },
    'plastic-bottle': { bin: 'green', tip: 'Empty and rinse. Lids can stay on.' },
    'plastic-pot-tub-tray': { bin: 'green', tip: 'Empty and rinse. Black plastic goes in the black bin.' },
    'plastic-film': { bin: 'green', tip: 'Clean and dry. Stretchy and tearable plastic is fine.' },
    'glass-bottle-jar': { bin: 'green', tip: 'Glass bottles and jars go in the green bin in Leeds. Empty and rinse.' },
    'black-plastic': { bin: 'black', tip: 'Sorting machines cannot see black plastic.' },
    polystyrene: { bin: 'black', tip: 'Polystyrene is not recycled at home in Leeds.' },
    'compostable-plastic': { bin: 'black', tip: 'Compostable and biodegradable plastic is not accepted in the green or brown bin.' },
    'foil-lined-plastic': { bin: 'black', tip: 'Foil-lined plastic like crisp packets cannot be recycled at home.' },
    'shredded-paper': { bin: 'black', tip: 'Shredded paper jams recycling machinery.' },
    'drinking-glass-ceramic': { bin: 'black', tip: 'Drinking glasses and crockery melt differently from bottle glass. Wrap anything sharp.' },
    'food-waste': { bin: 'black', tip: 'Leeds has no household food waste collection yet, except a 2026 brown-bin trial in parts of Wetherby and nearby villages.' },
    'garden-waste': { bin: 'brown', tip: 'Loose, no plastic bags. Branches up to 3cm thick.' },
    nappy: { bin: 'black', tip: 'Bag it first.' },
    'pet-waste': { bin: 'black', tip: 'Bag it first. Never in the brown bin.' },
    battery: { bin: 'drop-off', tip: 'Batteries can start bin-lorry fires. Most supermarkets that sell batteries have a collection box.' },
    electrical: { bin: 'drop-off', tip: 'Take to a household waste recycling site, or a shop with an electricals take-back point. Vapes contain lithium batteries.' },
    'light-bulb': { bin: 'drop-off', tip: 'Take to a household waste recycling site.' },
    medication: { bin: 'drop-off', tip: 'Return unused or out-of-date medicine to a pharmacy.' },
    paint: { bin: 'drop-off', tip: 'Take to a household waste recycling site.' },
    textiles: { bin: 'drop-off', tip: 'Donate wearable items to a charity shop, or use a textile bank.' },
    wood: { bin: 'drop-off', tip: 'Take to a household waste recycling site.' },
    'paper-tube-metal-ends': { bin: 'drop-off', tip: 'Card tubes with metal ends (Pringles, gravy granules, hot chocolate) go to the Kirkstall, Wetherby or Yeadon recycling centre.' },
    'coffee-cup': { bin: 'black', tip: 'Paper cups are lined with plastic, so they cannot go with normal card. Leeds city centre has on-the-go coffee cup recycling bins.' },
    'coffee-pod': { bin: 'drop-off', tip: 'Podback containers at the Kirkstall, Wetherby and Yeadon recycling centres take coffee, tea and hot chocolate pods.' },
    oil: { bin: 'drop-off', tip: 'Never pour it down the drain. Take it to the used oil container at a recycling centre.' },
    'gas-bottle': { bin: 'drop-off', tip: 'Not in any bin, and recycling centres do not take them. Return it to the supplier named on it (Calor, BOC, Flogas), who will collect.' },
    sharps: { bin: 'drop-off', tip: 'Use a sharps bin (your doctor can prescribe one). Some GP surgeries take full ones, so check first.' },
    'barbecue-ash': { bin: 'black', tip: 'Wait until the next day so it is completely cold. Soak a disposable barbecue in water and wrap it in foil. Bag coal ash.' },
    'sheet-glass': { bin: 'drop-off', tip: 'Not in the green bin or bottle banks. Take it to the non-recyclable waste container at a recycling centre, or book a bulky waste collection.' },
    'ink-cartridge': { bin: 'drop-off', tip: 'Refill it, or give it to a charity cartridge scheme. Freepost envelopes are often in supermarkets.' },
    'glitter-paper': { bin: 'black', tip: 'Glitter and shiny metallic paper cannot be recycled. Plain wrapping paper and cards can go in the green bin.' },
    books: { bin: 'drop-off', tip: 'Charity shops take books, or use the book bank at a recycling centre.' },
    'scrap-metal': { bin: 'drop-off', tip: 'Donate it if it is still usable. Otherwise use the scrap metal container at a recycling centre.' },
    spectacles: { bin: 'drop-off', tip: 'Many opticians collect old glasses for reuse. Ask your local optician.' },
  },
}
