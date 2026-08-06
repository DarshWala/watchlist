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
    deleteFromWatchlist,
    addToWatchList,
    watched,
    changeWatchedStatus,
  } = props;
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="movie-card tile-div">
      <img src={image} alt={name || "movie poster"} />
      <div className="tile-overlay">
        <p className="tile-title">{name}</p>

        {deleteFromWatchlist && (
          <button
            onClick={() => deleteFromWatchlist(id)}
            className="delete-btn"
          >
            Remove from Watchlist
          </button>
        )}

      {/* watched status changer */}
        <button onClick={ () => changeWatchedStatus(id) }> {watched ? `mark as unwatched` : `mark as watched`} </button>

        {addToWatchList && (
          <button onClick={() => addToWatchList(id)} className="add-btn">
            Add To Watchlist
          </button>
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
    </div>
  );
}
