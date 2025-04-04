import React from "react";
import { Nav } from "react-bootstrap";
import "./Sidebar.scss";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <div className="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
          width="50"
          height="50"
          fill="white"
        >
          <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm107 365c-4 6-11 9-18 5-50-30-112-37-187-21-8 2-15-3-17-11-2-8 3-15 11-17 81-17 150-9 206 24 7 4 10 12 6 20zm26-57c-5 8-16 10-24 5-57-35-144-45-212-25-9 3-19-3-22-12s3-19 12-22c77-23 172-12 237 29 8 5 10 15 5 24zm9-60c-72-43-191-47-261-27-11 3-22-4-25-15-3-11 4-22 15-25 80-23 210-18 291 32 10 6 13 19 7 29-6 10-19 13-29 6z" />
        </svg>
        <strong className="logo-text">Spotify</strong>
      </div>
      <Nav className="flex-column">
        <Nav.Link
          active={activeTab === "for-you"}
          onClick={() => setActiveTab("for-you")}
        >
          For You
        </Nav.Link>
        <Nav.Link
          active={activeTab === "top-tracks"}
          onClick={() => setActiveTab("top-tracks")}
        >
          Top Tracks
        </Nav.Link>
        <Nav.Link
          active={activeTab === "favourites"}
          onClick={() => setActiveTab("favourites")}
        >
          Favourites
        </Nav.Link>
        <Nav.Link
          active={activeTab === "recently-played"}
          onClick={() => setActiveTab("recently-played")}
        >
          Recently Played
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
