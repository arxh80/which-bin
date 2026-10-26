import type { Category } from '../items'

export type BinId = 'green' | 'black' | 'brown' | 'drop-off'

export type Council = {
  id: string
  name: string
  checkedOn: string
  sourceUrl: string
  bins: Record<BinId, { label: string; colour: string; description: string }>
  // Every category must be covered, so a new council file can't silently miss one.
  rules: Record<Category, { bin: BinId; tip: string }>
}
