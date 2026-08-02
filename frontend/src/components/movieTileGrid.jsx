import React from "react";
import MovieTile from './movieTile.jsx'

export default function MovieTileGrid(props){

    const watchlist = props.watchlist
    

    const tiles = watchlist.map((item) => {
        return <MovieTile deleteFromWatchlist={props.deleteFromWatchlist} id={item._id} key={item._id} name={item.name} image={item.image} year={item.year} type={item.type} imdbRating={item.imdbRating} plot={item.plot} genres={item.genres} runtime={item.runtime} />
        
    })

    return(
        <section className="tile-grid">
            {tiles}
        </section>
    )
}