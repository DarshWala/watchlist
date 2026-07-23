import React from "react";
import AddMovieForm from "./components/addMovieForm";

function App() {
  const [movieData, setMovieData] = React.useState([]);
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
      const resFromBack = await fetch("http://localhost:8000/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryToSend),
      });

      if (!resFromBack.ok) {
        console.log("Network Error");
      } else {
        const data = await resFromBack.json();
        console.log(data);

        setMovieData(prevData => [ data , ...prevData ]);
        // console.log(movieData);
        
      }
    } catch (error) {
      console.log(`Error ${error}`);
    }

    // getting all movies for updating state
    
    
  } 

  React.useEffect(() => {
    console.log(`state updated ${movieData}`);
  }, [movieData]);

  return (
    <>
      <h1 className="main-heading">WATCHLIST</h1>
      <AddMovieForm formAction={addMovie} />
    </>
  );
}

export default App;
