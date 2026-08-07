import React from "react";

export default function SearchMovieForm({ formAction, isSearching }) {

  return (
    <section className="movie-form-sec">
      <span className="section-label">SEARCH & ADD</span>
      <form onSubmit={formAction}>
        <input
          type="text"
          name="movie-query"
          placeholder="Movie or series title..."
          disabled={isSearching}
        />
        <button type="submit" disabled={isSearching}>
          {isSearching ? (
            <>
              SEARCHING <span className="button-loader" aria-hidden="true" />
            </>
          ) : (
            "SEARCH"
          )}
        </button>
      </form>
    </section>
  );
}
