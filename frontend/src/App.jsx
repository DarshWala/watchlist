import React from "react";
import AddMovieForm from "./components/addMovieForm";
import MovieTileGrid from "./components/movieTileGrid";
import Toast from "./components/Toast";
function App() {
  const [movieData, setMovieData] = React.useState([]);
  const [loading , setLoading] = React.useState(true);
  const [loadingError , setLoadingError] = React.useState(false);

  const [addError , setAddError] = React.useState(false);
  
  // console.log(movieData);

  // let data;

  async function addMovie(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("movie-query");
    console.log(`user searched for ${query}`);

    const queryToSend = { name: query };
    // console.log(queryToSend);

    // console.log(JSON.stringify(queryToSend));

    try {
      const resFromBack = await fetch(`${import.meta.env.VITE_API_URL}/watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryToSend),
      });

      if (!resFromBack.ok) {
        console.log("Network Error");
        setAddError(true)
        setLoading(false)
      } else {
        const data = await resFromBack.json();
        console.log(data);
        setMovieData((prevData) => [...prevData , data]);
        console.log('movie added');
        
        // setLoading(false)
        // console.log(movieData);
      }
    } catch (error) {
      console.log(`Error ${error}`);
      setAddError(true)
    }

    e.target.reset();

    // getting all movies for updating state
  }

  
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

  //! this is for testing if the state updates or not
  // console.log(movieData);

  return (
    <>
      <h1 className="main-heading">WATCHLIST</h1>
      <AddMovieForm formAction={addMovie} />

      {addError && (
        <Toast
          message="Could not add item. Please retry."
          type="error"
          duration={3000}
          onClose={() => setAddError(false)}
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

{!loading && !loadingError && movieData.length===0 && <p className="empty-msg">Your watchlist is ready for its first movie</p>}
<MovieTileGrid deleteFromWatchlist={deletePressed} watchlist = {movieData} />
    </>
  );
}

export default App;
