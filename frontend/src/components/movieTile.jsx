import React from "react";

export default function MovieTile(props) {
  const _id = props.id;

  return (
    <div className="tile-div">
      <img src={props.image} alt={props.name || "movie poster"} />
      <div className="tile-overlay">
        <p className="tile-title">{props.name}</p>
        <button onClick={() => props.deleteFromWatchlist(_id)} className="delete-btn">
          Remove from Watchlist
        </button>
      </div>
    </div>
  );
}
