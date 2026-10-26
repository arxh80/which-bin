import { describe, expect, it } from 'vitest'
import { items } from './data/items'
import { leeds } from './data/councils/leeds'
import { rankItems } from './model'
import embeddings from '../public/item-embeddings.json'

const binFor = (id: string) => leeds.rules[items.find((i) => i.id === id)!.category].bin

describe('Leeds rules', () => {
  it('matches the council green-bin page for items people get wrong', () => {
    expect(binFor('glass-jar')).toBe('green')
    expect(binFor('black-tray')).toBe('black')
    expect(binFor('crisp-packet')).toBe('black')
    expect(binFor('compostable-cup')).toBe('black')
    expect(binFor('shredded-paper')).toBe('black')
    expect(binFor('carrier-bag')).toBe('green')
  })

  it('matches the council A to Z for items people get wrong', () => {
    expect(binFor('toothpaste-tube')).toBe('green')
    expect(binFor('coffee-cup')).toBe('black')
    expect(binFor('glitter-wrap')).toBe('black')
    expect(binFor('pyrex')).toBe('black')
    expect(binFor('pringles-tube')).toBe('drop-off')
  })

  it('keeps hazards out of every wheelie bin', () => {
    for (const id of ['battery', 'vape', 'light-bulb', 'medicine', 'paint-tin', 'gas-bottle', 'sharps', 'oil']) expect(binFor(id)).toBe('drop-off')
  })
})

describe('item embeddings', () => {
  it('has exactly one embedding per item, in sync with items.ts', () => {
    expect(embeddings.items.map((e) => e.id).sort()).toEqual(items.map((i) => i.id).sort())
  })
})

describe('rankItems', () => {
  const unit = (i: number) => Array.from({ length: 4 }, (_, j) => (j === i ? 1 : 0))
  const table = [0, 1, 2].map((i) => ({ id: `item${i}`, embedding: unit(i) }))

  it('ranks the closest item first with probabilities summing to 1', () => {
    const ranked = rankItems([0.1, 0.9, 0.2, 0], table)
    expect(ranked[0].id).toBe('item1')
    expect(ranked.reduce((s, m) => s + m.probability, 0)).toBeCloseTo(1)
  })

  it('ignores the image vector length', () => {
    expect(rankItems([0, 5, 0, 0], table)[0].probability).toBeCloseTo(rankItems([0, 1, 0, 0], table)[0].probability)
  })
})
