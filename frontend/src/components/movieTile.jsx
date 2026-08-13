import MovieInfoPopover from "./MovieInfoPopover.jsx";

export default function MovieTile({
  id,
  image,
  name,
  year,
  type,
  imdbRating,
  plot,
  genres,
  favourite,
  watched,
  changeFavouriteStatus,
  changeWatchedStatus,
}) {
  return (
    /*
     * .movie-card-info-anchor wraps the <article> so the popover can be
     * positioned absolutely relative to this wrapper — not relative to
     * .movie-card, which has overflow:hidden and would clip the popover.
     */
    <div className="movie-card-info-anchor">
      <article className="movie-card">
        <img className="movie-card-poster" src={image} alt={name || "movie poster"} />

        {/* ── Heart / favourite ── */}
        <button
          className="movie-card-heart"
          type="button"
          aria-label={favourite ? `Remove ${name} from favourites` : `Add ${name} to favourites`}
          aria-pressed={favourite}
          onClick={() => changeFavouriteStatus(id)}
        >
          {favourite ? "♥" : "♡"}
        </button>

        {/* ── Watched tick ── */}
        <button
          className="movie-card-tick"
          type="button"
          aria-label={watched ? `Mark ${name} as unwatched` : `Mark ${name} as watched`}
          aria-pressed={!!watched}
          onClick={() => changeWatchedStatus(id)}
        >
          ✓
        </button>

        {/* ── Title + info button row ── */}
        <div className="movie-card-title-overlay">
          <p>{name}</p>
        </div>
      </article>

      {/* Popover lives OUTSIDE .movie-card so overflow:hidden doesn't clip it */}
      <MovieInfoPopover
        name={name}
        year={year}
        type={type}
        imdbRating={imdbRating}
        plot={plot}
        genres={genres}
      />
    </div>
  );
}
