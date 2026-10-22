function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

export default function PhotoCard({ photo, isFavourite, onToggle }) {
  // The API's download_url is a full-size original. Request a small
  // version instead so the grid loads fast.
  const src = `https://picsum.photos/id/${photo.id}/600/450`

  return (
    <article className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <img
        src={src}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="aspect-[4/3] w-full bg-stone-200 object-cover"
      />
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="truncate text-sm font-medium text-stone-800">
          {photo.author}
        </p>
        <button
          type="button"
          onClick={() => onToggle(photo.id)}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite
              ? `Remove ${photo.author}'s photo from favourites`
              : `Add ${photo.author}'s photo to favourites`
          }
          className={`rounded-full p-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
            isFavourite
              ? 'text-rose-600'
              : 'text-stone-400 hover:text-rose-500'
          }`}
        >
          <HeartIcon filled={isFavourite} />
        </button>
      </div>
    </article>
  )
}
