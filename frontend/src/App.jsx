import React from "react";
import AddMovieForm from "./components/SearchMovieForm";
import MovieTileGrid from "./components/movieTileGrid";
import Toast from "./components/Toast";
import SearchMovieTileGrid from "./components/SearchMovieTileGrid";

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
      (movie) => (movie.imdbId || movie.imdbID) === selectedMovie.imdbID
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

  //!  ---------------------- RETURN --------------------------------------------------------

  return (
    <>
      <h1 className="main-heading">WATCHLIST</h1>
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

      <h2
        style={{
          textAlign: "center",
          fontFamily: "monospace",
          color: "aliceblue",
          fontSize: 35,
        }}
      >
        Current Watchlist
      </h2>

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

      {!loading && !loadingError && movieData.length === 0 && (
        <p className="empty-msg">Your watchlist is ready for its first movie</p>
      )}
      <MovieTileGrid
        deleteFromWatchlist={deletePressed}
        watchlist={movieData}
      />
    </>
  );
}

export default App;
