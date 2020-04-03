import React, { useContext, useState } from "react";
import { MoviesContext } from "../AppContext";
import LoadingIndicator from "../components/LoadingIndicator";

const Movie = ({ movie }) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const MoviePosterUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

  const { fetchMovieDataByMovieId, setAppState } = useContext(MoviesContext);

  return (
    <div
      className="MovieCard"
      onClick={() => {
        setAppState(2);
        fetchMovieDataByMovieId(movie.id);
      }}
    >
      <img
        className="MoviePoster"
        src={MoviePosterUrl}
        onLoad={() => setLoadingImage(false)}
        alt=""
      />
      {loadingImage && <LoadingIndicator />}
    </div>
  );
};

export default Movie;
