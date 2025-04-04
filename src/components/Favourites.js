import React from "react";
import SongList from "./SongList";
import "./Favourites.scss";

const Favourites = ({ favourites, handlePlaySong, toggleFavourite }) => {
  return (
    <div className="favourites">
      <h3>Favourites</h3>
      {favourites.length > 0 ? (
        <SongList
          songs={favourites}
          handlePlaySong={handlePlaySong}
          toggleFavourite={toggleFavourite}
          favourites={favourites}
        />
      ) : (
        <p>No favourites yet</p>
      )}
    </div>
  );
};

export default Favourites;
