import React from "react";
import "./App.css";
import { MoviesContextProvider } from "./AppContext";

import MovieSearch from "./MovieSearch";
import Movies from "./Movies";
import SelectedMovie from "./SelectedMovie";

function App() {
  return (
    <MoviesContextProvider>
      <div className="App">
        {/* <MovieSearch /> */}
        <Movies />
        <SelectedMovie />
      </div>
    </MoviesContextProvider>
  );
}

export default App;
