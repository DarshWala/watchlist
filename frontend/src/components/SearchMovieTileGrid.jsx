import React from "react";

export default function SearchMovieTileGrid({ searchRes = [] , addToWatchlist }) {
  return (
    <section className="search-results-section">
      <h2 className="search-results-heading">Search Results</h2>

      <div className="search-results-grid">
        {searchRes.map((movie) => (
          <article className="search-result-card" key={movie.imdbID}>
          <img
            className="search-result-poster"
            src={movie.Poster !== "N/A" ? movie.Poster : "/favicon.svg"}
            alt={`${movie.Title} poster`}
          />
          <div className="search-result-body">
            <h3 className="search-result-title">{movie.Title}</h3>
            <p className="search-result-year">{movie.Year}</p>
            <span className="search-result-type">{movie.Type}</span>
            <button onClick={() => addToWatchlist(movie)} className="search-result-add-btn" type="button">
              Add to Watchlist
            </button>
          </div>
          </article>
        ))}
      </div>
    </section>
  );
}
