import React from "react";

export default function AddMovieForm(props) {

  return (
    <section className="movie-form-sec">
      <h2>Search</h2>
      {/* <br></br> */}
      <form onSubmit={props.formAction}>
        <input type="text" name="movie-query" placeholder="enter movie name "></input>
        <button type="submit">Search</button>
      </form>
    </section>
  );
}
