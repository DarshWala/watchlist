export default function MovieTile({
  id,
  image,
  name,
  favourite,
  changeFavouriteStatus,
  changeWatchedStatus,
}) {
  return (
    <article className="movie-card">
      <img className="movie-card-poster" src={image} alt={name || "movie poster"} />
      <button
        className="movie-card-heart"
        type="button"
        aria-label={favourite ? `Remove ${name} from favourites` : `Add ${name} to favourites`}
        aria-pressed={favourite}
        onClick={() => changeFavouriteStatus(id)}
      >
        {favourite ? "♥" : "♡"}
      </button>
      <button
        className="movie-card-tick"
        type="button"
        aria-label={`Mark ${name} as watched`}
        onClick={() => changeWatchedStatus(id)}
      >
        ✓
      </button>
      <div className="movie-card-title-overlay">
        <p>{name}</p>
        <button
          className="movie-card-info"
          type="button"
          aria-label={`View details for ${name}`}
        >
          i
        </button>
      </div>
    </article>
  );
}
