import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { MoviesContext } from "./AppContext";

import MovieSearch from "./MovieSearch";
import Movies from "./Movies";
import SelectedMovie from "./SelectedMovie";

function App() {
  const { appState, setScrollLock } = useContext(MoviesContext);

  useEffect(() => {
    appState !== 0 ? setScrollLock(true) : setScrollLock(false);
  }, [appState, setScrollLock]);

  return (
    <div className="App">
      <Movies />
      {appState === 2 && <SelectedMovie />}
    </div>
  );
}

export default App;
