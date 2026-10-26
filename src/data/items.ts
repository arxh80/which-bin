// Everyday items the classifier can recognise. Each maps to a material
// category; councils decide which bin a category goes in (see councils/).

export type Category =
  | 'paper'
  | 'cardboard'
  | 'greasy-cardboard'
  | 'carton'
  | 'metal-can'
  | 'aerosol'
  | 'foil'
  | 'plastic-bottle'
  | 'plastic-pot-tub-tray'
  | 'plastic-film'
  | 'glass-bottle-jar'
  | 'black-plastic'
  | 'polystyrene'
  | 'compostable-plastic'
  | 'foil-lined-plastic'
  | 'shredded-paper'
  | 'drinking-glass-ceramic'
  | 'food-waste'
  | 'garden-waste'
  | 'nappy'
  | 'pet-waste'
  | 'battery'
  | 'electrical'
  | 'light-bulb'
  | 'medication'
  | 'paint'
  | 'textiles'
  | 'wood'

export type Item = {
  id: string
  name: string
  category: Category
  // Phrases embedded for zero-shot matching; several per item improves recall.
  prompts: string[]
}

export const items: Item[] = [
  { id: 'newspaper', name: 'Newspaper or magazine', category: 'paper', prompts: ['a newspaper', 'a magazine', 'a pile of junk mail leaflets'] },
  { id: 'envelope', name: 'Envelope or letter', category: 'paper', prompts: ['a paper envelope', 'a printed paper letter'] },
  { id: 'cardboard-box', name: 'Cardboard box', category: 'cardboard', prompts: ['a cardboard box', 'a flattened cardboard delivery box', 'a brown corrugated cardboard parcel box'] },
  { id: 'cereal-box', name: 'Cereal box', category: 'cardboard', prompts: ['an empty cereal box', 'a thin card food packaging box'] },
  { id: 'toilet-roll-tube', name: 'Toilet roll tube', category: 'cardboard', prompts: ['an empty toilet roll cardboard tube'] },
  { id: 'egg-box', name: 'Cardboard egg box', category: 'cardboard', prompts: ['a cardboard egg box', 'a pulp egg carton'] },
  { id: 'pizza-box', name: 'Greasy pizza box', category: 'greasy-cardboard', prompts: ['a greasy pizza box', 'an open takeaway pizza box with grease stains'] },
  { id: 'juice-carton', name: 'Drinks carton', category: 'carton', prompts: ['a juice carton', 'a tetra pak milk carton', 'a carton of soup'] },
  { id: 'drink-can', name: 'Drinks can', category: 'metal-can', prompts: ['an aluminium drinks can', 'a soda can', 'a beer can'] },
  { id: 'food-tin', name: 'Food tin', category: 'metal-can', prompts: ['an empty food tin can', 'a tin of beans', 'a pet food tin'] },
  { id: 'aerosol', name: 'Aerosol can', category: 'aerosol', prompts: ['an aerosol spray can', 'a deodorant spray can', 'a can of air freshener'] },
  { id: 'foil-tray', name: 'Foil or foil tray', category: 'foil', prompts: ['aluminium foil', 'a foil takeaway tray', 'a scrunched ball of kitchen foil'] },
  { id: 'water-bottle', name: 'Plastic drinks bottle', category: 'plastic-bottle', prompts: ['a plastic water bottle', 'a plastic fizzy drink bottle'] },
  { id: 'milk-bottle', name: 'Plastic milk bottle', category: 'plastic-bottle', prompts: ['a plastic milk bottle', 'a white plastic milk jug'] },
  { id: 'toiletry-bottle', name: 'Shampoo or detergent bottle', category: 'plastic-bottle', prompts: ['a shampoo bottle', 'a plastic laundry detergent bottle', 'a washing up liquid bottle', 'a plastic cleaning spray bottle'] },
  { id: 'yoghurt-pot', name: 'Yoghurt pot', category: 'plastic-pot-tub-tray', prompts: ['a plastic yoghurt pot', 'an empty yogurt cup'] },
  { id: 'food-tub', name: 'Plastic tub', category: 'plastic-pot-tub-tray', prompts: ['a plastic margarine tub', 'an ice cream tub', 'a plastic takeaway container'] },
  { id: 'clear-tray', name: 'Clear plastic food tray', category: 'plastic-pot-tub-tray', prompts: ['a clear plastic fruit punnet', 'a clear plastic meat tray', 'a plastic sandwich box packaging'] },
  { id: 'carrier-bag', name: 'Carrier bag', category: 'plastic-film', prompts: ['a plastic carrier bag', 'a plastic shopping bag'] },
  { id: 'cling-film', name: 'Cling film or plastic wrap', category: 'plastic-film', prompts: ['cling film', 'plastic wrap from a multipack', 'a plastic bread bag', 'a bag of salad packaging'] },
  { id: 'bubble-wrap', name: 'Bubble wrap', category: 'plastic-film', prompts: ['bubble wrap', 'a sheet of bubble wrap packaging'] },
  { id: 'glass-bottle', name: 'Glass bottle', category: 'glass-bottle-jar', prompts: ['a glass wine bottle', 'a glass beer bottle', 'a glass sauce bottle'] },
  { id: 'glass-jar', name: 'Glass jar', category: 'glass-bottle-jar', prompts: ['a glass jam jar', 'an empty glass jar', 'a glass pasta sauce jar'] },
  { id: 'black-tray', name: 'Black plastic tray', category: 'black-plastic', prompts: ['a black plastic microwave meal tray', 'a black plastic meat tray'] },
  { id: 'polystyrene', name: 'Polystyrene', category: 'polystyrene', prompts: ['white polystyrene packaging', 'a polystyrene takeaway box', 'polystyrene foam blocks'] },
  { id: 'compostable-cup', name: 'Compostable plastic', category: 'compostable-plastic', prompts: ['a compostable plastic cup', 'a biodegradable plastic bag'] },
  { id: 'crisp-packet', name: 'Crisp packet', category: 'foil-lined-plastic', prompts: ['an empty crisp packet', 'a shiny chocolate bar wrapper', 'a foil lined coffee pouch'] },
  { id: 'shredded-paper', name: 'Shredded paper', category: 'shredded-paper', prompts: ['a pile of shredded paper strips'] },
  { id: 'drinking-glass', name: 'Drinking glass or mug', category: 'drinking-glass-ceramic', prompts: ['a broken drinking glass', 'a ceramic mug', 'a broken plate'] },
  { id: 'food-scraps', name: 'Food waste', category: 'food-waste', prompts: ['food scraps', 'vegetable peelings', 'leftover food on a plate', 'a mouldy loaf of bread', 'banana peel'] },
  { id: 'coffee-grounds', name: 'Tea bags or coffee grounds', category: 'food-waste', prompts: ['used tea bags', 'used coffee grounds'] },
  { id: 'garden', name: 'Garden waste', category: 'garden-waste', prompts: ['grass cuttings', 'fallen leaves', 'hedge clippings', 'cut flowers and plants', 'small twigs'] },
  { id: 'nappy', name: 'Nappy', category: 'nappy', prompts: ['a used disposable nappy', 'a baby diaper'] },
  { id: 'cat-litter', name: 'Pet waste or cat litter', category: 'pet-waste', prompts: ['cat litter', 'a dog poo bag'] },
  { id: 'battery', name: 'Batteries', category: 'battery', prompts: ['AA batteries', 'household batteries', 'a button cell battery'] },
  { id: 'vape', name: 'Disposable vape', category: 'electrical', prompts: ['a disposable vape', 'an e-cigarette'] },
  { id: 'small-electrical', name: 'Small electrical item', category: 'electrical', prompts: ['an old mobile phone', 'a phone charger cable', 'a broken kettle', 'a hair dryer', 'computer headphones'] },
  { id: 'light-bulb', name: 'Light bulb', category: 'light-bulb', prompts: ['a light bulb', 'an energy saving light bulb', 'an LED bulb'] },
  { id: 'medicine', name: 'Medicines', category: 'medication', prompts: ['a blister pack of tablets', 'a bottle of medicine', 'boxes of pills'] },
  { id: 'paint-tin', name: 'Paint tin', category: 'paint', prompts: ['a tin of paint', 'a paint can with dried paint'] },
  { id: 'clothes', name: 'Clothes and shoes', category: 'textiles', prompts: ['old clothes', 'a pair of old shoes', 'a folded t-shirt', 'old towels and bedding'] },
  { id: 'wood', name: 'Wood', category: 'wood', prompts: ['a piece of wood', 'broken wooden furniture', 'wooden planks'] },
]
