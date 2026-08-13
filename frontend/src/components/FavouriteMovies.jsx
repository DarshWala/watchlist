export default function FavouriteMovies({ favouriteMovies, changeFavouriteStatus }) {
  if (favouriteMovies.length === 0) {
    return null;
  }

  return (
    <section className="favourite-movies-section">
      <div className="watchlist-header">
        <h2 className="watchlist-header-title">FAVOURITE MOVIES</h2>
        <hr className="watchlist-header-line" />
        <p className="watchlist-header-count">
          {favouriteMovies.length}{" "}
          {favouriteMovies.length === 1 ? "title" : "titles"}
        </p>
      </div>

      <div className="favourite-movies-grid">
        {favouriteMovies.map((movie) => (
          <article className="favourite-movie-card" key={movie._id}>
            <img
              className="favourite-movie-poster"
              src={movie.image}
              alt={movie.name || "movie poster"}
            />
            <div className="favourite-movie-info">
              <p className="favourite-movie-title">{movie.name}</p>
              <button
                className="unwatch-btn"
                onClick={() => changeFavouriteStatus(movie._id)}
                type="button"
              >
                Remove from Favourites
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
