import React from "react";

export default function MovieTile(props) {
  const {
    id,
    name,
    image,
    year,
    type,
    imdbRating,
    plot,
    genres,
    runtime,
    userRating,
    deleteFromWatchlist,
    addToWatchList,
    watched,
    changeWatchedStatus,
    changeUserRating,
  } = props;
  const [expanded, setExpanded] = React.useState(false);

  return (
    <article className="movie-card">
      <img className="movie-card-poster" src={image} alt={name || "movie poster"} />

      {/* Always-visible watched toggle — top-right corner */}
      {changeWatchedStatus && (
        <button
          className={`watched-corner-btn ${watched ? "is-watched" : ""}`}
          onClick={() => changeWatchedStatus(id)}
          title={watched ? "Mark as Unwatched" : "Mark as Watched"}
        >
          {watched ? "✓ Watched" : "Watch"}
        </button>
      )}

      <div className="movie-card-overlay">

        {deleteFromWatchlist && (
          <button
            onClick={() => deleteFromWatchlist(id)}
            className="delete-btn"
          >
            Remove from Watchlist
          </button>
        )}


        {addToWatchList && (
          <button onClick={() => addToWatchList(id)} className="add-btn">
            Add To Watchlist
          </button>
        )}

        {changeUserRating && (
          <div className="rating-picker">
            <p className="rating-picker-label">YOUR RATING</p>
            <div className="rating-picker-buttons">
              {Array.from({ length: 10 }, (_, index) => {
                const rating = index + 1;

                return (
                  <button
                    className={`rating-pip ${userRating >= rating ? "filled" : ""}`}
                    key={rating}
                    onClick={() => changeUserRating(id, rating)}
                    type="button"
                    aria-label={`Rate ${name} ${rating} out of 10`}
                  >
                    {rating}
                  </button>
                );
              })}
            </div>
            {userRating && (
              <button
                className="clear-rating-btn"
                onClick={() => changeUserRating(id, null)}
                type="button"
              >
                Clear rating
              </button>
            )}
          </div>
        )}

        <button
          className="detail-toggle"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide Details" : "More Details"}
        </button>
        <div className={expanded ? "detail-card expanded" : "detail-card"}>
          <p className="detail-row">
            <strong>Year:</strong> {year}
          </p>
          <p className="detail-row">
            <strong>Type:</strong> {type}
          </p>
          <p className="detail-row">
            <strong>IMDb Rating:</strong> {imdbRating}
          </p>
          <p className="detail-row">
            <strong>Plot:</strong> {plot}
          </p>
          <p className="detail-row">
            <strong>Genres:</strong> {genres}
          </p>
          <p className="detail-row">
            <strong>Runtime:</strong> {runtime}
          </p>
        </div>
      </div>

      <footer className="movie-card-footer">
        <div className="movie-card-summary">
          <span className="movie-imdb-rating">★ {imdbRating || "N/A"}</span>
          <span className="movie-card-separator">·</span>
          <span className="movie-card-title">{name}</span>
          <span className="movie-card-separator">·</span>
          <span>{year}</span>
          <span className="movie-card-separator">·</span>
          <span className="movie-card-type">{type}</span>
        </div>

        {userRating !== null && userRating !== undefined && (
          <p className="movie-user-rating">YOU ◆ {userRating} / 10</p>
        )}
      </footer>
    </article>
  );
}
