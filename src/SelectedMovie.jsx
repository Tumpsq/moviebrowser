import React, { useContext, useEffect, useState } from "react";
import { MoviesContext } from "./AppContext";
import { ReactComponent as Close } from "./Assets/CloseIcon.svg";
import { ReactComponent as Back } from "./Assets/BackIcon.svg";
import Movie from "./Movie";

const SelectedMovie = () => {
  const {
    showMovieDetailsPage,
    setShowMoviesDetailsPage,
    selectedMovie
  } = useContext(MoviesContext);

  console.log(selectedMovie);

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const movieGenres = [];
    selectedMovie &&
      selectedMovie.genres.map(element => {
        movieGenres.push(element.name);
      });
    setGenres(movieGenres);
  }, [selectedMovie]);

  return (
    <div
      className={
        showMovieDetailsPage ? "SelectedMovieShow" : "SelectedMovieHide"
      }
    >
      <img
        className="SelectedMovieBackdrop"
        src={
          selectedMovie &&
          `http://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`
        }
        //onLoad={() => setLoadingImage(false)}
        alt=""
      />
      <div className="MovieDetails">
        <div className="BackroundGradient" />
        <div className="MovieDetailsContent">
          <p className="MovieTitle">{selectedMovie && selectedMovie.title}</p>
          <p className="MovieGenres">- {genres.join(" - ")} -</p>;
          <p className="MoviePlotText">
            {selectedMovie && selectedMovie.overview}
          </p>
        </div>
      </div>
      <button
        className="CloseSelectedMovieBtn"
        onClick={() => setShowMoviesDetailsPage(false)}
      >
        <Close />
      </button>
    </div>
  );
};

export default SelectedMovie;
