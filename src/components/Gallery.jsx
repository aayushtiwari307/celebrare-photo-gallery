import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import {
  favouritesReducer,
  loadFavourites,
  STORAGE_KEY,
  TOGGLE_FAVOURITE,
} from '../reducers/favouritesReducer'
import SearchBar from './SearchBar'
import PhotoCard from './PhotoCard'

export default function Gallery() {
  // Data comes from the custom hook; Gallery never calls fetch itself.
  const { photos, loading, error } = useFetchPhotos()

  // Favourites: useReducer, seeded from localStorage on first render.
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    loadFavourites
  )

  // Save to localStorage every time favourites change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
    } catch {
      // Storage full or blocked: the app still works, just without saving.
    }
  }, [favourites])

  // The search text is plain UI state, so useState is fine for it.
  const [query, setQuery] = useState('')

  // useCallback: keeps the same function identity between renders, so the
  // memo-wrapped SearchBar is not re-rendered when only other state changes
  // (for example, toggling a favourite).
  const handleSearchChange = useCallback((e) => {
    setQuery(e.target.value)
  }, [])

  // useMemo: only re-runs the filter when photos or query change, not on
  // every render (for example, when a favourite is toggled).
  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return photos
    return photos.filter((photo) => photo.author.toLowerCase().includes(term))
  }, [photos, query])

  const handleToggle = (id) => dispatch({ type: TOGGLE_FAVOURITE, id })

  let content
  if (loading) {
    content = (
      <div
        className="flex justify-center py-24"
        role="status"
        aria-label="Loading photos"
      >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-300 border-t-stone-900" />
      </div>
    )
  } else if (error) {
    content = (
      <p
        role="alert"
        className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800"
      >
        Could not load photos: {error}. Check your connection and refresh the
        page.
      </p>
    )
  } else if (filteredPhotos.length === 0) {
    content = (
      <p className="py-16 text-center text-stone-500">
        {query.trim()
          ? `No photos by an author matching \u201c${query.trim()}\u201d.`
          : 'No photos to show.'}
      </p>
    )
  } else {
    content = (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isFavourite={favourites.includes(photo.id)}
            onToggle={handleToggle}
          />
        ))}
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          Photo Gallery
        </h1>
        <SearchBar value={query} onChange={handleSearchChange} />
      </header>
      {content}
    </main>
  )
}
