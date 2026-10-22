export const STORAGE_KEY = 'photo-gallery-favourites'

// Action type kept in one place so a typo can't silently break it.
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE'

// State is a plain array of photo ids, e.g. ["10", "237"].
export function favouritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id) // already a favourite -> remove
        : [...state, action.id] // not a favourite -> add
    default:
      return state
  }
}

// Used as the lazy initialiser for useReducer: runs once, on first render.
export function loadFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const parsed = saved ? JSON.parse(saved) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    // Corrupt JSON or storage blocked -> start empty instead of crashing.
    return []
  }
}
