// Precomputes one text embedding per item so the browser only needs the
// vision half of the model. Run: npm run embed
import { writeFileSync } from 'node:fs'
import { AutoTokenizer, CLIPTextModelWithProjection } from '@huggingface/transformers'
import { items } from '../src/data/items.ts'
import { MODEL_ID } from '../src/model.ts'

const tokenizer = await AutoTokenizer.from_pretrained(MODEL_ID)
const textModel = await CLIPTextModelWithProjection.from_pretrained(MODEL_ID, { dtype: 'fp32' })

const normalise = (v: number[]) => {
  const n = Math.hypot(...v)
  return v.map((x) => x / n)
}

const out = []
for (const item of items) {
  const texts = item.prompts.map((p) => `a photo of ${p}`)
  const inputs = tokenizer(texts, { padding: 'max_length', truncation: true })
  const { text_embeds } = await textModel(inputs)
  const rows: number[][] = text_embeds.tolist()
  const mean = rows.map(normalise).reduce((acc, r) => acc.map((x, i) => x + r[i]))
  out.push({ id: item.id, embedding: normalise(mean).map((x) => Math.round(x * 1e5) / 1e5) })
}

writeFileSync('public/item-embeddings.json', JSON.stringify({ model: MODEL_ID, items: out }))
console.log(`wrote ${out.length} item embeddings (dim ${out[0].embedding.length})`)
