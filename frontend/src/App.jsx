import React from "react";
import AddMovieForm from "./components/addMovieForm";
import MovieTileGrid from "./components/movieTileGrid";
function App() {
  const [movieData, setMovieData] = React.useState([]);
  const [loading , setLoading] = React.useState(true);
  const [error , setError] = React.useState(false);
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
        setError(true)
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
    }

    // getting all movies for updating state
  }

  React.useEffect(() => {
    async function fetchWatchlist() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/watchlist`);
      if (res.ok) {
        const data = await res.json();
        // console.log(data);
        setMovieData(data);
        setLoading(false)
      }
      else{
        setError(true)
        setLoading(false)
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

      {loading && <p style={{textAlign : 'center' , fontSize : '2rem'}}>Loading...</p>}
      {error && <p style={{textAlign : 'center' , fontSize : '1.5rem', color: 'red'}}>Failed to load watchlist.</p>}
      <MovieTileGrid watchlist = {movieData} />
    </>
  );
}

export default App;
