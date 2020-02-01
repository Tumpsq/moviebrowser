import React, { useContext } from "react";
import { MoviesContext } from "./AppContext";
import Movie from "./Movie.jsx";

const Movies = () => {
  const { moviesData } = useContext(MoviesContext);
  return (
    <div className="Movies">
      {"results" in moviesData &&
        moviesData.results.map(movie => <Movie key={movie.id} movie={movie} />)}
    </div>
  );
};

export default Movies;
