import React, { useEffect, useContext, useState } from "react";
import { MoviesContext } from "./AppContext";
import Movie from "./Movie.jsx";
import MenuButton from "./MenuButton.jsx";
import { ReactComponent as MenuIcon } from "./Assets/MenuIcon.svg";

const Movies = () => {
  const {
    appState,
    setScrollLock,
    genresList,
    moviesData,
    fetchMoviesDataByGenre
  } = useContext(MoviesContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    isMenuOpen ? setScrollLock(true) : setScrollLock(false);
  }, [isMenuOpen, setScrollLock]);

  return (
    <div className="MoviesContent">
      <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div
        className="SideNav"
        style={{
          transform: isMenuOpen ? "translateX(0px)" : "translateX(-200px)"
        }}
      >
        {genresList &&
          genresList.map(genre => {
            return (
              <button
                className="SideNavButton"
                onClick={() => {
                  fetchMoviesDataByGenre(genre.id);
                  setIsMenuOpen(false);
                }}
                key={genre.id}
              >
                {genre.name}
              </button>
            );
          })}
      </div>

      {"results" in moviesData &&
        moviesData.results.map(movie => <Movie key={movie.id} movie={movie} />)}
    </div>
  );
};

export default Movies;
