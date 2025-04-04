import React, { useEffect, useRef, useState } from "react";
import { Container, Button } from "react-bootstrap";
import ColorThief from "colorthief";
import { FaVolumeUp, FaEllipsisH } from "react-icons/fa";
import "./Player.scss";

const Player = ({
  currentSong,
  audioRef,
  currentTime,
  isPlaying,
  setIsPlaying,
  songs,
  songIndex,
  playPreviousSong,
  playNextSong,
  toggleFavourite,
  favourites,
}) => {
  const [progress, setProgress] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const progressRef = useRef(null);
  const imgRef = useRef(null);

  const applyBackgroundGradient = (img) => {
    try {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);
      const darkenedColor = [
        Math.round(color[0] * 0.6),
        Math.round(color[1] * 0.6),
        Math.round(color[2] * 0.6),
      ];
      const gradient = `linear-gradient(135deg, rgba(${darkenedColor[0]}, ${darkenedColor[1]}, ${darkenedColor[2]}, 0.8), rgba(${darkenedColor[0]}, ${darkenedColor[1]}, ${darkenedColor[2]}, 0.3))`;
      document.body.style.background = gradient;
    } catch (error) {
      console.error("Color extraction failed:", error);
      document.body.style.background =
        "linear-gradient(135deg, #1a1a1a, #3b1e4a)";
    }
  };

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.musicUrl;
      audioRef.current.currentTime = currentTime;
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log("Play error:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    } else {
      document.body.style.background =
        "linear-gradient(135deg, #1a1a1a, #3b1e4a)";
    }
  }, [currentSong, audioRef, currentTime, isPlaying, setIsPlaying]);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current && currentSong) {
        const progressPercent =
          (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0;
        setProgress(progressPercent);
      }
    };

    audioRef.current.addEventListener("timeupdate", updateProgress);
    return () =>
      audioRef.current.removeEventListener("timeupdate", updateProgress);
  }, [audioRef, currentSong]);

  const togglePlayPause = () => {
    if (currentSong) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((error) => {
          console.log("Play error:", error);
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current && currentSong) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  const handleToggleFavourite = () => {
    if (currentSong) {
      toggleFavourite(currentSong);
      setShowDropdown(false); // Close dropdown after action
    }
  };

  const isFavourite =
    currentSong && favourites.some((fav) => fav.id === currentSong.id);

  return (
    <Container fluid className="player-container" style={{ height: "100vh" }}>
      {currentSong ? (
        <div className="player-content">
          <div className="song-info-container">
            <div className="song-info">
              <h4>{currentSong.title}</h4>
              <p>{currentSong.artistName}</p>
            </div>
          </div>
          <div className="thumbnail-container">
            <img
              ref={imgRef}
              src={currentSong.thumbnail}
              alt={currentSong.title}
              className="album-art"
              onLoad={() => applyBackgroundGradient(imgRef.current)}
              onError={() => {
                console.error("Image failed to load:", currentSong.thumbnail);
                document.body.style.background =
                  "linear-gradient(135deg, #1a1a1a, #3b1e4a)";
              }}
              crossOrigin="Anonymous"
            />
          </div>
          <div className="controls-container">
            <div
              className="progress-bar"
              onClick={handleProgressClick}
              ref={progressRef}
            >
              <div className="progress" style={{ width: `${progress}%` }} />
            </div>
            <div className="controls">
              <div className="icon-button-container">
                <button
                  className="icon-button left-icon"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <FaEllipsisH />
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <button onClick={handleToggleFavourite}>
                      {isFavourite
                        ? "Remove from Favourites"
                        : "Add to Favourites"}
                    </button>
                  </div>
                )}
              </div>
              <div className="main-controls">
                <Button className="control-button" onClick={playPreviousSong}>
                  ⏮
                </Button>
                <Button className="play-pause-button" onClick={togglePlayPause}>
                  {isPlaying ? "⏸" : "▶"}
                </Button>
                <Button className="control-button" onClick={playNextSong}>
                  ⏭
                </Button>
              </div>
              <button className="icon-button right-icon">
                <FaVolumeUp />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No song playing</p>
      )}
    </Container>
  );
};

export default Player;
