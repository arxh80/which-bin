# Which bin?

Snap a photo of any piece of rubbish and get the right bin for your council, starting with Leeds. The image model runs on your phone, so photos never leave it.

Built for Arbiter Hacks V1, Theme Track: Rethinking Waste.

## The waste problem

Putting the wrong thing in the recycling bin (contamination) can get a whole load rejected and sent to landfill or incineration. Rules differ between councils and change over time: Leeds started taking glass in the green bin in August 2024, but still doesn't take black plastic, crisp packets, shredded paper or compostable plastic. People guess, and guesses contaminate.

**How we'd measure it working:** the share of scanned items that end up in the right bin. We measure this offline on a labelled photo set (below). In real use it would be measured against council contamination audits for streets where the app is promoted.

## How it works

1. **Recognise:** [MobileCLIP-S0](https://huggingface.co/Xenova/mobileclip_s0) runs in the browser through [transformers.js](https://github.com/huggingface/transformers.js), on WebGPU where available and WebAssembly otherwise. It turns the photo into an embedding.
2. **Match:** the embedding is compared with precomputed text embeddings for 42 everyday items, several phrasings each (`scripts/embed-items.ts`). Only the vision half of the model ships to the phone (23 MB, fp16).
3. **Decide:** each item has a material category, and a council rules file maps categories to bins with a preparation tip ([`src/data/councils/leeds.ts`](src/data/councils/leeds.ts), sourced from leeds.gov.uk and dated).
4. **Ask when unsure:** below 50% confidence the app shows its top 3 guesses to tap, plus text search.

Adding a council means adding one rules file. TypeScript refuses to build if any category is missing.

## Accuracy

`npm run eval -- <folder>` scores labelled photos laid out as `<folder>/<item-id>/<photo>`.

| Set | Photos | Item top-1 | Item top-3 | Right bin |
| --- | --- | --- | --- | --- |
| Wikimedia Commons smoke set (10 items) | 12 | 91.7% | 100% | 91.7% |

The 8-bit model build scored near-random on the same photos, so the app uses fp16, which matched full precision.

## Run it

```bash
npm install
npm run dev        # local app
npm test           # rules and ranking tests
npm run embed      # regenerate item embeddings after editing src/data/items.ts
npm run eval -- eval/photos
```

Deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`.

## What's next

- More councils, starting with neighbouring West Yorkshire councils.
- A larger photo set from real kitchens, and per-item accuracy published in the app.
- An anonymous, opt-in count of scans by bin, to show councils where confusion happens.
