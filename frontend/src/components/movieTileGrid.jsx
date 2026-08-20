import React from "react";
import MovieTile from "./movieTile.jsx";

export default function MovieTileGrid(props) {
  // we dont know which list ,
  const MoviesList = props.MoviesList;

  const tiles = MoviesList.map((item) => {
    return (
      <MovieTile
        deleteFromWatchlist={props.deleteFromWatchlist}
        id={item._id}
        key={item._id}
        name={item.name}
        image={item.image}
        year={item.year}
        type={item.type}
        imdbRating={item.imdbRating}
        plot={item.plot}
        genres={item.genres}
        runtime={item.runtime}
        userRating={item.userRating} 
        notes={item.notes}
        favourite={item.favourite}
        watched={item.watched}
        changeWatchedStatus={props.changeWatchedStatus}
        changeFavouriteStatus={props.changeFavouriteStatus}
        changeUserRating={props.changeUserRating}
      />
    );
  });

  return <section className="tile-grid">{tiles}</section>;
}
