import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { MoviesContext } from "./AppContext";

import MovieSearch from "./MovieSearch";
import Movies from "./Movies";
import SelectedMovie from "./SelectedMovie";

function App() {
  const { isLoading, appState, setScrollLock } = useContext(MoviesContext);

  useEffect(() => {
    appState !== 0 ? setScrollLock(true) : setScrollLock(false);
  }, [appState, setScrollLock]);

  return (
    <div className="App">
      <Movies />
      <div
        className="SelectedMovieContent"
        style={
          appState === 2 && isLoading === false
            ? { opacity: "1", transform: "translateX(0%)" }
            : { opacity: "0", transform: "translateX(100%)" }
        }
      >
        <SelectedMovie />
      </div>
    </div>
  );
}

export default App;
