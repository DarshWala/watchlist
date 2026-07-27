import React from "react";

export default function MovieTile(props) {    
  return (
    <div className="tile-div">
        
        <img src={props.image} alt="" />        
        {/* console.log(`move`); */}
        
    </div>
  );
}
