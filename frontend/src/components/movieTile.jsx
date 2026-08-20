import MovieInfoPopover from "./MovieInfoPopover.jsx";
import RatingPopover from "./RatingPopover.jsx";

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
  userRating,
  notes,
  changeFavouriteStatus,
  changeWatchedStatus,
  changeUserRating,
}) {
  return (
    <div className="movie-card-info-anchor">
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
          aria-label={watched ? `Mark ${name} as unwatched` : `Mark ${name} as watched`}
          aria-pressed={!!watched}
          onClick={() => changeWatchedStatus(id)}
        >
          ✓
        </button>

        <div className="movie-card-title-overlay">
          <p>{name}</p>
        </div>
      </article>

      <MovieInfoPopover
        name={name}
        year={year}
        type={type}
        imdbRating={imdbRating}
        plot={plot}
        genres={genres}
      />

      <RatingPopover
        id={id}
        userRating={userRating}
        notes={notes}
        onSave={changeUserRating}
      />
    </div>
  );
}