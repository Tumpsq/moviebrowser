import React, { useEffect, useState } from "react";

export const MoviesContext = React.createContext();

export const MoviesContextProvider = ({ children }) => {
  const [moviesData, setMoviesData] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieDetailsPage, setShowMoviesDetailsPage] = useState(false);

  const fetchMoviesData = url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMoviesData(data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const fetchMovieDataByMovieId = id => {
    fetch(
      `http://api.themoviedb.org/3/movie/${id}?api_key=af8fb362bff12729caaa23a58ff0e1fc&append_to_response=videos`
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
    fetchMoviesData(
      "https://api.themoviedb.org/3/discover/movie?api_key=af8fb362bff12729caaa23a58ff0e1fc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1"
    );
  }, []);

  const selectMovieById = id => {
    const selectedMovieById = moviesData.results.find(movie => movie.id === id);
    setSelectedMovie(selectedMovieById);
  };

  return (
    <MoviesContext.Provider
      value={{
        fetchMovieDataByMovieId,
        moviesData,
        showMovieDetailsPage,
        setShowMoviesDetailsPage,
        selectedMovie,
        selectMovieById
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
