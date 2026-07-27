import React from "react";

export default function MovieTile(props) {    
  return (
    <div className="tile-div">
        <img src={props.image} alt={props.name || "movie poster"} />
        <div className="tile-overlay">
          <p className="tile-title">{props.name}</p>
          <button className="delete-btn">Delete from Watchlist</button>
        </div>
    </div>
  );
}
