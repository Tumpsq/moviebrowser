import React, { useContext, useEffect, useState } from "react";
import { MoviesContext } from "./AppContext";
import { ReactComponent as Close } from "./Assets/CloseIcon.svg";
//import { ReactComponent as Back } from "./Assets/BackIcon.svg";
import Movie from "./Movie";
//import YoutubePlayer from "./YoutubePlayer";
import YouTube from "react-youtube";

const SelectedMovie = () => {
  const {
    isLoading,
    setIsLoading,
    appState,
    setAppState,
    selectedMovie
  } = useContext(MoviesContext);
  const [genres, setGenres] = useState([]);
  const [ytPlayer, setYtPlayer] = useState(null);

  useEffect(() => {
    const movieGenres = [];
    selectedMovie &&
      selectedMovie.genres.map(element => {
        movieGenres.push(element.name);
      });
    setGenres(movieGenres);
  }, [selectedMovie]);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
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
          `http://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`
        }
        onLoad={() => {
          setIsLoading(false);
        }}
        alt=""
      />
      <div className="SelectedMovieTrailer">
        {/* <iframe
          title="trailer"
          className="player"
          id="ytplayer"
          type="text/html"
          width="100%"
          height="100%"
          //src="https://www.youtube.com/embed/YqNYrYUiMfg?autoplay=1&controls=0"
          src={
            selectedMovie &&
            selectedMovie.videos.results[0].site === "YouTube" &&
            `https://www.youtube.com/embed/${selectedMovie.videos.results[0].key}?autoplay=1&controls=1`
          }
          frameBorder="0"
          allowFullScreen
          allow="autoplay"
        /> */}
        {selectedMovie &&
          selectedMovie.videos.results[0].site === "YouTube" && (
            <YouTube
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
