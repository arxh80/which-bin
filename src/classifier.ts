import { AutoProcessor, CLIPVisionModelWithProjection, RawImage, type ProgressInfo } from '@huggingface/transformers'
import { MODEL_ID, rankItems, type ItemEmbedding, type Match } from './model'

export type Classifier = (image: Blob) => Promise<Match[]>

// fp16 matched full precision on our eval set at half the download (23 MB);
// the 8-bit build gave near-random answers.
export async function loadClassifier(onProgress: (p: ProgressInfo) => void): Promise<Classifier> {
  const forced = new URLSearchParams(location.search).get('device')
  const device = forced === 'wasm' || !('gpu' in navigator) ? 'wasm' : 'webgpu'
  const [processor, vision, embeddings] = await Promise.all([
    AutoProcessor.from_pretrained(MODEL_ID),
    CLIPVisionModelWithProjection.from_pretrained(MODEL_ID, { dtype: 'fp16', device, progress_callback: onProgress }).catch(() =>
      // Some browsers expose WebGPU but can't run this model on it.
      CLIPVisionModelWithProjection.from_pretrained(MODEL_ID, { dtype: 'fp16', device: 'wasm', progress_callback: onProgress }),
    ),
    fetch(`${import.meta.env.BASE_URL}item-embeddings.json`).then((r) => r.json() as Promise<{ items: ItemEmbedding[] }>),
  ])
  return async (blob) => {
    const image = await RawImage.fromBlob(blob)
    const { image_embeds } = await vision(await processor(image))
    return rankItems(Array.from(image_embeds.data as Float32Array), embeddings.items)
  }
}
