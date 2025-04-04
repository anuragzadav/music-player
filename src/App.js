import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import SongList from "./components/SongList";
import Player from "./components/Player";
import SearchBar from "./components/SearchBar";
import Favourites from "./components/Favourites";
import RecentlyPlayed from "./components/RecentlyPlayed";
import songsData from "./data/songs.json";
import "./App.scss";

function App() {
  const [songs, setSongs] = useState(songsData);
  const [currentSong, setCurrentSong] = useState(() => {
    const savedSong = localStorage.getItem("currentSong");
    return savedSong ? JSON.parse(savedSong) : null;
  });
  const [currentTime, setCurrentTime] = useState(() => {
    const savedTime = localStorage.getItem("currentTime");
    return savedTime ? parseFloat(savedTime) : 0;
  });
  const [isPlaying, setIsPlaying] = useState(() => {
    const savedIsPlaying = localStorage.getItem("isPlaying");
    return savedIsPlaying ? JSON.parse(savedIsPlaying) : false;
  });
  const [songIndex, setSongIndex] = useState(() => {
    const savedSong = localStorage.getItem("currentSong");
    return savedSong
      ? songs.findIndex((s) => s.id === JSON.parse(savedSong).id)
      : 0;
  });
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );
  const [recentlyPlayed, setRecentlyPlayed] = useState(
    JSON.parse(sessionStorage.getItem("recentlyPlayed")) || []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("for-you");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (currentSong) {
      localStorage.setItem("currentSong", JSON.stringify(currentSong));
      localStorage.setItem("isPlaying", JSON.stringify(isPlaying));
    } else {
      localStorage.removeItem("currentSong");
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (currentSong) {
      localStorage.setItem("currentTime", currentTime);
    }
  }, [currentTime, currentSong]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current && currentSong) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    return () =>
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
  }, [audioRef, currentSong]);

  const handlePlaySong = (song) => {
    const index = songs.findIndex((s) => s.id === song.id);
    setSongIndex(index);
    setCurrentSong(song);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const playPreviousSong = () => {
    const newIndex = songIndex > 0 ? songIndex - 1 : songs.length - 1;
    setSongIndex(newIndex);
    setCurrentSong(songs[newIndex]);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const playNextSong = () => {
    const newIndex = songIndex < songs.length - 1 ? songIndex + 1 : 0;
    setSongIndex(newIndex);
    setCurrentSong(songs[newIndex]);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const toggleFavourite = (song) => {
    const updatedFavourites = favourites.some((fav) => fav.id === song.id)
      ? favourites.filter((fav) => fav.id !== song.id)
      : [...favourites, song];
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="app-container">
      <Row>
        <Col md={1.5} className="sidebar-col">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </Col>
        <Col md={3.5} className="main-content">
          <Button
            className="menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </Button>
          <SearchBar setSearchTerm={setSearchTerm} />
          <div className={`song-list-container ${isMenuOpen ? "active" : ""}`}>
            {activeTab === "for-you" && (
              <SongList songs={filteredSongs} handlePlaySong={handlePlaySong} />
            )}
            {activeTab === "favourites" && (
              <Favourites
                favourites={favourites}
                handlePlaySong={handlePlaySong}
                toggleFavourite={toggleFavourite}
              />
            )}
            {activeTab === "recently-played" && (
              <RecentlyPlayed
                recentlyPlayed={recentlyPlayed}
                handlePlaySong={handlePlaySong}
                toggleFavourite={toggleFavourite}
                favourites={favourites}
              />
            )}
            {activeTab === "top-tracks" && (
              <SongList songs={filteredSongs} handlePlaySong={handlePlaySong} />
            )}
          </div>
        </Col>
        <Col
          md={6}
          className="player-col"
          style={{ height: "100vh", padding: 0 }}
        >
          <Player
            currentSong={currentSong}
            audioRef={audioRef}
            currentTime={currentTime}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            songs={songs}
            songIndex={songIndex}
            playPreviousSong={playPreviousSong}
            playNextSong={playNextSong}
            toggleFavourite={toggleFavourite}
            favourites={favourites}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
