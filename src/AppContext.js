import React, { useEffect, useState } from "react";

export const MoviesContext = React.createContext();

export const MoviesContextProvider = ({ children }) => {
  const apiKey = "af8fb362bff12729caaa23a58ff0e1fc&";
  const [isLoading, setIsLoading] = useState(false);
  const [moviesData, setMoviesData] = useState({});
  const [genresList, setGenresList] = useState(null);
  const [selectedSortingMethod, setSelectedSortingMethod] = useState(
    "POPULARITY"
  );
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieDetailsPage, setShowMovieDetailsPage] = useState(null);
  const [appState, setAppState] = useState(0);
  // const [appEvent, setAppEvent] = useState([]);

  const setScrollLock = state => {
    state === true
      ? document.body.classList.add("LockScrolling")
      : document.body.classList.remove("LockScrolling");
  };

  const fetchMoviesDataBy = by => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=${by}.desc&include_adult=false&include_video=true&page=1"`
    )
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        setMoviesData(data);
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error:", error);
      });
  };

  const fetchMoviesDataByGenre = genreId => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
    )
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        setMoviesData(data);
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error:", error);
      });
  };

  const fetchMovieDataByMovieId = id => {
    setIsLoading(true);
    fetch(
      `http://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`
    )
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        setSelectedMovie(data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    setIsLoading(false);
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    )
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        setGenresList(data.genres);
      })
      .catch(error => {
        setIsLoading(false);
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fetchMoviesDataBy("popularity");
    // fetchMoviesData(
    //   "https://api.themoviedb.org/3/discover/movie?api_key=af8fb362bff12729caaa23a58ff0e1fc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1"
    // );
  }, []);

  const selectMovieById = id => {
    const selectedMovieById = moviesData.results.find(movie => movie.id === id);
    setSelectedMovie(selectedMovieById);
  };

  return (
    <MoviesContext.Provider
      value={{
        isLoading,
        setIsLoading,
        fetchMoviesDataBy,
        fetchMoviesDataByGenre,
        fetchMovieDataByMovieId,
        genresList,
        selectedSortingMethod,
        setSelectedSortingMethod,
        moviesData,
        setScrollLock,
        showMovieDetailsPage,
        setShowMovieDetailsPage,
        appState,
        setAppState,
        selectedMovie,
        selectMovieById
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
