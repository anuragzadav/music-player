import React from "react";
import SongList from "./SongList";
import "./RecentlyPlayed.scss";

const RecentlyPlayed = ({
  recentlyPlayed,
  handlePlaySong,
  toggleFavourite,
  favourites,
}) => {
  return (
    <div className="recently-played">
      <h3>Recently Played</h3>
      {recentlyPlayed.length > 0 ? (
        <SongList
          songs={recentlyPlayed}
          handlePlaySong={handlePlaySong}
          toggleFavourite={toggleFavourite}
          favourites={favourites}
        />
      ) : (
        <p>No recently played songs</p>
      )}
    </div>
  );
};

export default RecentlyPlayed;
