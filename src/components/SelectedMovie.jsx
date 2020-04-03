import React, { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../AppContext";
import { ReactComponent as Close } from "../Assets/CloseIcon.svg";
import YouTube from "react-youtube";

const SelectedMovie = () => {
  const { setIsLoading, setAppState, selectedMovie } = useContext(
    MoviesContext
  );
  const [genres, setGenres] = useState([]);
  const [ytPlayer, setYtPlayer] = useState(null);

  useEffect(() => {
    const movieGenres = [];
    if (selectedMovie) {
      for (let i = 0; i < selectedMovie.genres.length; i++) {
        movieGenres.push(selectedMovie.genres[i]);
      }
    }
    setGenres(movieGenres);
  }, [selectedMovie]);

  const opts = {
    width: "100%",
    height: "56.25%",
    playerVars: {
      autoplay: 1
    }
  };

  const onPlayerReady = ytPlayer => {
    ytPlayer.playVideo();
    setYtPlayer(ytPlayer);
  };

  return (
    <div className="SelectedMovie">
      <button
        className="CloseSelectedMovieBtn"
        onClick={() => {
          setAppState(0);
          ytPlayer.pauseVideo();
        }}
      >
        <Close />
      </button>

      <img
        className="SelectedMovieBackdrop"
        src={
          selectedMovie &&
          `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`
        }
        onLoad={() => {
          setIsLoading(false);
        }}
        alt=""
      />
      <div className="SelectedMovieTrailer">
        {selectedMovie &&
          selectedMovie.videos.results[0].site === "YouTube" && (
            <YouTube
              className="ytPlayer"
              videoId={selectedMovie.videos.results[0].key}
              opts={opts}
              onReady={event => onPlayerReady(event.target)}
            />
          )}
        />
      </div>
      <div className="SelectedMovieDetails">
        <div className="SelectedMovieDetailsContent">
          <p className="MovieTitle">{selectedMovie && selectedMovie.title}</p>
          <p className="MovieGenres">- {genres.join(" - ")} -</p>
          <p className="MoviePlotText">
            {selectedMovie && selectedMovie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectedMovie;
