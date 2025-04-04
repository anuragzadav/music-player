import React from "react";
import { Dropdown } from "react-bootstrap";
import "./SongList.scss";

const SongList = ({ songs, handlePlaySong, toggleFavourite, favourites }) => {
  return (
    <div className="song-list">
      {songs.map((song, index) => (
        <div
          key={song.id}
          className="song-item"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <img
            src={song.thumbnail}
            alt={song.title}
            className="song-thumbnail"
          />
          <div className="song-info">
            <h5 onClick={() => handlePlaySong(song)}>{song.title}</h5>
            <p>{song.artistName}</p>
          </div>
          <span>{song.duration}</span>
        </div>
      ))}
    </div>
  );
};

export default SongList;
