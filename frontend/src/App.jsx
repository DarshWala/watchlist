import React from "react";
import AddMovieForm from "./components/SearchMovieForm";
import MovieTileGrid from "./components/movieTileGrid";
import Toast from "./components/Toast";
import SearchMovieTileGrid from "./components/SearchMovieTileGrid";
import RecentlyWatched from "./components/RecentlyWatched";

function App() {
  const [movieData, setMovieData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingError, setLoadingError] = React.useState(false);

  const [addError, setAddError] = React.useState(false);
  const [alreadyInWatchlist, setAlreadyInWatchlist] = React.useState(false);

  const [searchError, setSearchError] = React.useState(false);
  const [showSearchRes, setShowSearchRes] = React.useState(false);
  const [searchRes, setSearchRes] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);

  async function deletePressed(_id) {
    const elementIdToDelete = { id: _id };

    try {
      const resForDelete = await fetch(
        `${import.meta.env.VITE_API_URL}/watchlist`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(elementIdToDelete),
        },
      );

      if (resForDelete.ok) {
        setMovieData((prev) => prev.filter((movie) => movie._id !== _id));
        console.log(`movie with id ${_id} successfully deleted`);
      } else {
        console.log("Failed to delete movie");
      }
    } catch (error) {
      console.log(`error ${error}`);
    }
  }

  React.useEffect(() => {
    async function fetchWatchlist() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/watchlist`);
        if (res.ok) {
          const data = await res.json();
          // console.log(data);
          setMovieData(data);
        } else {
          setLoadingError(true);
        }
      } catch (error) {
        console.log(`Error ${error}`);
        setLoadingError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchWatchlist();
  }, []);

  //! Display Search Results where the user can choose
  async function searchMovie(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("movie-query");

    setIsSearching(true);
    try {
      const firstSixRes = await fetch(
        `${import.meta.env.VITE_API_URL}/watchlist/search?name=${encodeURIComponent(query)}`,
      );

      const firstSixResData = await firstSixRes.json();

      if (!firstSixRes.ok) {
        setSearchError(true);
        setShowSearchRes(false);
        return;
      }

      setSearchRes(firstSixResData);
      setShowSearchRes(true);
    } catch (error) {
      console.error("Movie search error:", error.message);
      setSearchError(true);
      setShowSearchRes(false);
    } finally {
      setIsSearching(false);
    }
  }

  async function addToWatchlist(selectedMovie) {
    const isAlreadyInWatchlist = movieData.some(
      (movie) => (movie.imdbId || movie.imdbID) === selectedMovie.imdbID,
    );

    if (isAlreadyInWatchlist) {
      setAlreadyInWatchlist(true);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/watchlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imdbId: selectedMovie.imdbID,
          }),
        },
      );

      const savedMovie = await response.json();

      if (response.status === 409) {
        setAlreadyInWatchlist(true);
        return;
      }

      if (!response.ok) {
        setAddError(true);
        throw new Error(savedMovie.message || "Could not add movie");
      }

      setMovieData((currentMovies) => [...currentMovies, savedMovie]);
      setShowSearchRes(false);
      setSearchRes([]);
    } catch (error) {
      console.error("Add movie error:", error.message);
    }
  }

  async function changeWatchedStatus(id) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/watchlist/${id}/watched`,
        { method: "PATCH" },
      );

      if (!res.ok) {
        console.error("Failed to toggle watched status");
        return;
      }

      const updatedMovie = await res.json();

      // update just that one movie in state
      setMovieData((prev) =>
        prev.map((movie) => (movie._id === id ? updatedMovie : movie)),
      );
    } catch (error) {
      console.error("changeWatchedStatus error:", error.message);
    }
  }

  //! Derived — no extra state needed, recomputes whenever movieData changes
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentlyWatched = movieData
    .filter(
      (m) => m.watched && m.watchedAt && new Date(m.watchedAt) >= thirtyDaysAgo,
    )
    .sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt));

  const eleInTheWatchlist = movieData.length - recentlyWatched.length;

  //!  ---------------------- RETURN --------------------------------------------------------

  return (
    <>
      <header className="app-header">
        <h1 className="main-heading">WATCHLIST</h1>
        <p className="tagline">YOUR PERSONAL CINEMA QUEUE</p>
      </header>
      <AddMovieForm formAction={searchMovie} isSearching={isSearching} />

      {searchError && (
        <Toast
          message="Error Searching for the item. Please Refine your search"
          type="error"
          duration={3000}
          onClose={() => setSearchError(false)}
        />
      )}
      {showSearchRes && (
        <SearchMovieTileGrid
          searchRes={searchRes}
          addToWatchlist={addToWatchlist}
        />
      )}

      {addError && (
        <Toast
          message="Could not add item. Please retry."
          type="error"
          duration={3000}
          onClose={() => setAddError(false)}
        />
      )}

      {alreadyInWatchlist && (
        <Toast
          message="Movie already in watchlist"
          type="info"
          duration={3000}
          onClose={() => setAlreadyInWatchlist(false)}
        />
      )}

      <div className="watchlist-header">
        <h2 className="watchlist-header-title">CURRENT WATCHLIST</h2>
        <hr className="watchlist-header-line" />
        <p className="watchlist-header-count">
          {eleInTheWatchlist} {eleInTheWatchlist === 1 ? "title" : "titles"}
        </p>
      </div>

      {loading && <p className="loading-msg">Loading...</p>}
      {/* General error when fetching watchlist */}
      {loadingError && (
        <Toast
          message="Failed to load watchlist. Please try again."
          type="error"
          duration={3000}
          onClose={() => setLoadingError(false)}
        />
      )}

      {((!loading && !loadingError && movieData.length === 0 ) || eleInTheWatchlist === 0 ) && (
        <div className="empty-msg-container">
          <svg
            className="empty-state-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19.82 2H4.18C2.97 2 2 2.97 2 4.18v15.64C2 21.03 2.97 22 4.18 22h15.64c1.21 0 2.18-.97 2.18-2.18V4.18C22 2.97 21.03 2 19.82 2Z"></path>
            <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"></path>
          </svg>
          <p className="empty-msg">
            Your queue is empty. Search to add titles.
          </p>
        </div>
      )}
      <MovieTileGrid
        deleteFromWatchlist={deletePressed}
        changeWatchedStatus={changeWatchedStatus}
        MoviesList={movieData.filter((m) => !m.watched)}
      />

      <RecentlyWatched
        recentlyWatched={recentlyWatched}
        changeWatchedStatus={changeWatchedStatus}
      />
    </>
  );
}

export default App;
