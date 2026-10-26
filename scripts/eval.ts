// Scores the classifier on labelled photos: eval/<set>/<item-id>/<photo>.
// Run: npm run eval -- eval/photos
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { AutoProcessor, CLIPVisionModelWithProjection, RawImage } from '@huggingface/transformers'
import { items } from '../src/data/items.ts'
import { leeds } from '../src/data/councils/leeds.ts'
import { MODEL_ID, rankItems, CONFIDENT, type ItemEmbedding } from '../src/model.ts'

const root = process.argv[2] ?? 'eval/photos'
const embeddings: ItemEmbedding[] = JSON.parse(readFileSync('public/item-embeddings.json', 'utf8')).items
const processor = await AutoProcessor.from_pretrained(MODEL_ID)
const vision = await CLIPVisionModelWithProjection.from_pretrained(MODEL_ID, { dtype: (process.env.DTYPE ?? 'fp16') as 'fp16' })
const categoryOf = new Map(items.map((i) => [i.id, i.category]))
const binOf = (id: string) => leeds.rules[categoryOf.get(id)!].bin

let total = 0, top1 = 0, top3 = 0, bin = 0, confident = 0, confidentRight = 0
for (const label of readdirSync(root)) {
  if (!categoryOf.has(label)) { console.warn(`skipping unknown item folder: ${label}`); continue }
  for (const file of readdirSync(path.join(root, label))) {
    const image = await RawImage.read(path.join(root, label, file))
    const { image_embeds } = await vision(await processor(image))
    const ranked = rankItems(Array.from(image_embeds.data as Float32Array), embeddings)
    total++
    if (ranked[0].id === label) top1++
    if (ranked.slice(0, 3).some((m) => m.id === label)) top3++
    if (binOf(ranked[0].id) === binOf(label)) bin++
    if (ranked[0].probability >= CONFIDENT) { confident++; if (ranked[0].id === label) confidentRight++ }
    if (ranked[0].id !== label) console.log(`miss ${label}/${file}: guessed ${ranked[0].id} (${(ranked[0].probability * 100).toFixed(0)}%)`)
  }
}

const pct = (n: number, d: number) => (d ? `${((100 * n) / d).toFixed(1)}%` : 'n/a')
console.log(`\n${total} photos`)
console.log(`item top-1 ${pct(top1, total)} | item top-3 ${pct(top3, total)} | right bin ${pct(bin, total)}`)
console.log(`answered without asking ${pct(confident, total)} | accuracy when it answered ${pct(confidentRight, confident)}`)
