export const MODEL_ID = 'Xenova/mobileclip_s0'

// CLIP-style models compare unit vectors with a learned temperature; 100 is
// the standard logit scale, so softmax over scores gives usable confidences.
const LOGIT_SCALE = 100

export type ItemEmbedding = { id: string; embedding: number[] }
export type Match = { id: string; probability: number }

export function rankItems(image: number[], items: ItemEmbedding[]): Match[] {
  const norm = Math.hypot(...image)
  const logits = items.map((it) => LOGIT_SCALE * it.embedding.reduce((s, x, i) => s + x * image[i], 0) / norm)
  const max = Math.max(...logits)
  const exps = logits.map((l) => Math.exp(l - max))
  const total = exps.reduce((a, b) => a + b, 0)
  return items
    .map((it, i) => ({ id: it.id, probability: exps[i] / total }))
    .sort((a, b) => b.probability - a.probability)
}

// Below this the app asks the user to pick from the top guesses instead of answering.
export const CONFIDENT = 0.5
