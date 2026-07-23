import React from "react";

export default function AddMovieForm(props) {

  return (
    <section className="movie-form-sec">
      <h2>Add Movie</h2>
      {/* <br></br> */}
      <form onSubmit={props.formAction}>
        <input type="text" name="movie-query" placeholder="enter movie name "></input>
        <button type="submit">Add</button>
      </form>
    </section>
  );
}
