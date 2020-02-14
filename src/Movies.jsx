import React, { useEffect, useContext, useState } from "react";
import { MoviesContext } from "./AppContext";
import Movie from "./Movie.jsx";
import MenuButton from "./MenuButton.jsx";

const Movies = () => {
  const {
    appState,
    setScrollLock,
    selectedSortingMethod,
    setSelectedSortingMethod,
    genresList,
    moviesData,
    fetchMoviesDataBy,
    fetchMoviesDataByGenre
  } = useContext(MoviesContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    isMenuOpen ? setScrollLock(true) : setScrollLock(false);
  }, [isMenuOpen, setScrollLock]);

  return (
    <div>
      <div className="SortingTitle">
        <p>{selectedSortingMethod}</p>
      </div>
      <div className="MoviesContent">
        <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div
          className="SideNav"
          style={{
            transform: isMenuOpen ? "translateX(0px)" : "translateX(-200px)"
          }}
        >
          <button
            className="SideNavButton"
            onClick={() => {
              fetchMoviesDataBy("popularity");
              setSelectedSortingMethod("popularity");
              setIsMenuOpen(false);
              window.scrollTo(0, 0);
            }}
            key={0}
          >
            POPULARITY
          </button>
          {genresList &&
            genresList.map(genre => {
              return (
                <button
                  className="SideNavButton"
                  onClick={() => {
                    fetchMoviesDataByGenre(genre.id);
                    const selectedSortingMethodName = genresList.find(
                      object => object.id === genre.id
                    );
                    setSelectedSortingMethod(
                      selectedSortingMethodName.name.toUpperCase()
                    );
                    setIsMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                  key={genre.id}
                >
                  {genre.name.toUpperCase()}
                </button>
              );
            })}
        </div>

        {"results" in moviesData &&
          moviesData.results.map(movie => (
            <Movie key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Movies;
