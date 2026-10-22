import { useEffect, useState } from 'react'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

// Fetches the photo list once on mount.
// Returns { photos, loading, error } so the UI only has to render.
export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Lets us cancel the request if the component unmounts mid-fetch.
    const controller = new AbortController()

    async function loadPhotos() {
      try {
        const res = await fetch(API_URL, { signal: controller.signal })

        // fetch() only rejects on network failure. A 404/500 still
        // "succeeds", so we must check res.ok and throw ourselves.
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`)
        }

        const data = await res.json()
        setPhotos(data)
      } catch (err) {
        // An abort is not a real failure, so don't show it as an error.
        if (err.name === 'AbortError') return
        setError(err.message || 'Something went wrong')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadPhotos()

    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}
