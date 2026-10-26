import { useEffect, useMemo, useState } from 'react'
import type { ProgressInfo } from '@huggingface/transformers'
import { items, type Item } from './data/items'
import { leeds } from './data/councils/leeds'
import { CONFIDENT, type Match } from './model'
import { loadClassifier, type Classifier } from './classifier'
import './App.css'

const council = leeds
const itemById = new Map(items.map((i) => [i.id, i]))

function readCount(): number {
  try {
    return Number(localStorage.getItem('sorted-count') ?? 0)
  } catch {
    return 0
  }
}

export default function App() {
  const [classify, setClassify] = useState<Classifier | null>(null)
  const [loadError, setLoadError] = useState('')
  const [progress, setProgress] = useState(0)
  const [photo, setPhoto] = useState<string | null>(null)
  const [thinking, setThinking] = useState(false)
  const [matches, setMatches] = useState<Match[] | null>(null)
  const [chosen, setChosen] = useState<Item | null>(null)
  const [query, setQuery] = useState('')
  const [count, setCount] = useState(readCount)

  useEffect(() => {
    loadClassifier((p: ProgressInfo) => {
      if (p.status === 'progress' && p.file.endsWith('.onnx')) setProgress(Math.round(p.progress))
    })
      .then((fn) => setClassify(() => fn))
      .catch((e: Error) => setLoadError(e.message))
  }, [])

  const choose = (item: Item) => {
    setChosen(item)
    setQuery('')
    const next = count + 1
    setCount(next)
    try {
      localStorage.setItem('sorted-count', String(next))
    } catch {
      // Private mode: the counter just won't persist.
    }
  }

  const onPhoto = async (file: File | undefined) => {
    if (!file || !classify) return
    setPhoto(URL.createObjectURL(file))
    setChosen(null)
    setMatches(null)
    setThinking(true)
    try {
      const ranked = await classify(file)
      setMatches(ranked.slice(0, 3))
      if (ranked[0].probability >= CONFIDENT) choose(itemById.get(ranked[0].id)!)
    } finally {
      setThinking(false)
    }
  }

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? items.filter((i) => i.name.toLowerCase().includes(q) || i.prompts.some((p) => p.includes(q))).slice(0, 6) : []
  }, [query])

  const rule = chosen && council.rules[chosen.category]
  const bin = rule && council.bins[rule.bin]
  const unsure = matches && !chosen

  return (
    <main>
      <header>
        <h1>Which bin?</h1>
        <p className="sub">Snap any rubbish. Get the right bin for {council.name}.</p>
      </header>

      {loadError && <p className="error">Couldn't load the recognition model: {loadError}. You can still search below.</p>}

      <label className={`camera ${classify ? '' : 'disabled'}`}>
        <input type="file" accept="image/*" capture="environment" disabled={!classify} onChange={(e) => onPhoto(e.target.files?.[0])} />
        {classify ? 'Take a photo' : `Loading recognition model${progress ? ` ${progress}%` : '…'}`}
      </label>

      {photo && <img className="photo" src={photo} alt="Your item" />}
      {thinking && <p className="status">Looking…</p>}

      {chosen && rule && bin && (
        <section className="result" style={{ borderColor: bin.colour }}>
          <div className="bin" style={{ background: bin.colour }}>
            <strong>{bin.label}</strong>
            <span>{bin.description}</span>
          </div>
          <p className="item">{chosen.name}</p>
          <p>{rule.tip}</p>
          {matches && matches[0].id === chosen.id && (
            <button className="link" onClick={() => setChosen(null)}>Not a {chosen.name.toLowerCase()}?</button>
          )}
        </section>
      )}

      {unsure && (
        <section className="pick">
          <p>Not sure. Which is it?</p>
          {matches.map((m) => (
            <button key={m.id} onClick={() => choose(itemById.get(m.id)!)}>
              {itemById.get(m.id)!.name} <small>{Math.round(m.probability * 100)}%</small>
            </button>
          ))}
        </section>
      )}

      <section className="search">
        <input type="search" placeholder="Or type it: pizza box, battery…" value={query} onChange={(e) => setQuery(e.target.value)} />
        {searchResults.map((i) => (
          <button key={i.id} onClick={() => choose(i)}>{i.name}</button>
        ))}
      </section>

      <footer>
        <p>{count} item{count === 1 ? '' : 's'} sorted on this phone.</p>
        <p>
          Photos never leave your phone. Rules from <a href={council.sourceUrl}>{council.name} City Council</a>, checked {council.checkedOn}.
        </p>
      </footer>
    </main>
  )
}
