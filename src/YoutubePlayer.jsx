import React, { useContext } from "react";
import { MoviesContext } from "./AppContext";
import YouTube from "react-youtube";

class YoutubePlayer extends React.Component {
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.playVideo();

    // if (this.appState === 2) {
    //   event.target.playVideo();
    // } else if (this.appState === 0) {
    //   event.target.pauseVideo();
    // }

    console.log(event.target);
  }

  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    const { videoId, appState } = this.props;

    return <YouTube videoId={videoId} opts={opts} onReady={this._onReady} />;
  }
}

export default YoutubePlayer;
