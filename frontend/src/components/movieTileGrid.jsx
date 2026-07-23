import React from "react";
import MovieTile from './movieTile.jsx'

export default function MovieTileGrid(props){

    const watchlist = props.watchlist
    console.log('watchlist from movietilegrid');
    

    const tiles = watchlist.map((item) => {
        return < MovieTile image = {item.image} />
        // console.log('mapping over movie tiles' , item);
        
    })

    return(
        <section className="tile-grid">
            {tiles}
        </section>
    )
}