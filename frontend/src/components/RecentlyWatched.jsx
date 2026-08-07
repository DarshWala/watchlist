import React from "react";

function formatRelative(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

export default function RecentlyWatched({ recentlyWatched, changeWatchedStatus }) {
  if (!recentlyWatched || recentlyWatched.length === 0) return null;

  return (
    <section className="recently-watched-section">
      <div className="watchlist-header">
        <h2 className="watchlist-header-title">RECENTLY WATCHED</h2>
        <hr className="watchlist-header-line" />
        <p className="watchlist-header-count">
          {recentlyWatched.length} {recentlyWatched.length === 1 ? "title" : "titles"}
        </p>
      </div>
      <div className="recently-watched-grid">
        {recentlyWatched.map((movie) => (
          <div key={movie._id} className="rw-card">
            <img src={movie.image} alt={movie.name || "movie poster"} className="rw-poster" />
            <div className="rw-info">
              <p className="rw-title">{movie.name}</p>
              <p className="rw-date">Watched {formatRelative(movie.watchedAt)}</p>
              <button
                className="unwatch-btn"
                onClick={() => changeWatchedStatus(movie._id)}
              >
                Mark as Unwatched
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
