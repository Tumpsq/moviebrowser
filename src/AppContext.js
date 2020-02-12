import React, { useEffect, useState } from "react";

export const MoviesContext = React.createContext();

export const MoviesContextProvider = ({ children }) => {
  const apiKey = "af8fb362bff12729caaa23a58ff0e1fc&";

  const [moviesData, setMoviesData] = useState({});
  const [genresList, setGenresList] = useState(null);
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
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=${by}.desc&include_adult=false&include_video=true&page=1"`
    )
      .then(response => response.json())
      .then(data => {
        setMoviesData(data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const fetchMoviesDataByGenre = genreId => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMoviesData(data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const fetchMovieDataByMovieId = id => {
    fetch(
      `http://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`
    )
      .then(response => response.json())
      .then(data => {
        setSelectedMovie(data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    )
      .then(response => response.json())
      .then(data => {
        console.log("Genreslist ", data);
        setGenresList(data.genres);
      })
      .catch(error => {
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
        fetchMoviesDataByGenre,
        fetchMovieDataByMovieId,
        genresList,
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
