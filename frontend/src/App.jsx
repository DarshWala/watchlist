import React from "react";
import AddMovieForm from "./components/addMovieForm";

function App() {


  return (
    <>
      <h1 className="main-heading">WATCHLIST</h1>
      <AddMovieForm formAction={addMovie} />
    </>
  );
}

export default App;
