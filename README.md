# Photo Gallery

A React photo gallery that fetches 30 photos from the [Picsum Photos API](https://picsum.photos/), lets you search by author name, and lets you mark favourites that persist across refreshes.

## Tech
React 19, Vite, Tailwind CSS v4. No UI libraries.

## Run locally
```bash
npm install
npm run dev
```
Then open the URL Vite prints (usually http://localhost:5173).

## Structure
- `src/hooks/useFetchPhotos.js` - custom hook returning `{ photos, loading, error }`
- `src/reducers/favouritesReducer.js` - `useReducer` logic and localStorage loader
- `src/components/Gallery.jsx` - uses the hook, reducer, `useMemo` and `useCallback`
- `src/components/SearchBar.jsx`, `PhotoCard.jsx` - presentational components
