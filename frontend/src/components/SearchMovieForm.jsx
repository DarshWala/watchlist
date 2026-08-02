import React from "react";

export default function SearchMovieForm({ formAction, isSearching }) {

  return (
    <section className="movie-form-sec">
      <h2>Search</h2>
      {/* <br></br> */}
      <form onSubmit={formAction}>
        <input
          type="text"
          name="movie-query"
          placeholder="enter movie name"
          disabled={isSearching}
        />
        <button type="submit" disabled={isSearching}>
          {isSearching ? (
            <>
              Searching <span className="button-loader" aria-hidden="true" />
            </>
          ) : (
            "Search"
          )}
        </button>
      </form>
    </section>
  );
}
