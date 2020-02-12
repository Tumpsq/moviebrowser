import React, { useContext, useState } from "react";
import { MoviesContext } from "./AppContext";
import LoadingIndicator from "./LoadingIndicator";

const Movie = ({ movie }) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const MoviePosterUrl = `http://image.tmdb.org/t/p/w300${movie.poster_path}`;

  const { fetchMovieDataByMovieId, setAppState } = useContext(MoviesContext);

  // if (showMovieDetailsPage) {
  //   document.body.style.overflow = "hidden";
  // } else {
  //   document.body.style.overflow = "auto";
  // }

  //   var img = new Image();
  //   img.onload = function() {
  //       // the image is ready
  //       setLoadingImage(false);
  //   };
  //   img.onerror = function() {
  //       // the image has failed
  //       setLoadingImage(false);
  //   };
  //   img.src = bgImageUrl;

  return (
    <div
      className="MovieCard"
      onClick={() => {
        setAppState(2);
        //selectMovieById(movie.id);
        fetchMovieDataByMovieId(movie.id);
      }}
      //onMouseOver={() => setShowMovieDetails(true)}
      //onMouseOut={() => setShowMovieDetails(false)}
    >
      <img
        className="MoviePoster"
        src={MoviePosterUrl}
        onLoad={() => setLoadingImage(false)}
        alt=""
      />
      {loadingImage && <LoadingIndicator />}
      {/* <div
        className={showMovieDetails ? "MovieDetailsShow" : "MovieDetailsHide"}
      ></div> */}
    </div>
  );
};

export default Movie;
