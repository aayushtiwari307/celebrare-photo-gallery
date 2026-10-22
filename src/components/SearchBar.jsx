import { memo } from 'react'

// memo() skips re-rendering when props are unchanged. That only helps
// if the onChange prop keeps the same identity, which is why Gallery
// wraps its handler in useCallback.
function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      placeholder="Search by author name"
      aria-label="Search photos by author name"
      className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/20 sm:max-w-md"
    />
  )
}

export default memo(SearchBar)
