// import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import { Container } from "@material-ui/core";
import Control from "./control";
import { useState, useRef } from "react";
import { formatTime } from "../format";

let count = 0;
function ReactVideo() {
    // props:any
    // console.log(props,".................")
  const videoPlayerRef = useRef(null);
  const controlRef = useRef(null);
  const [videotimeline, setVideoTimeline] = useState(0);
  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    buffer: true,
  });

  //Destructuring the properties from the videoState
  const { playing, muted, volume, playbackRate, played, seeking, buffer } =
    videoState;

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current?.getCurrentTime()
    : "00:00";
  const duration = videoPlayerRef.current
    ? videoPlayerRef.current?.getDuration()
    : "00:00";

  const formatCurrentTime = formatTime(currentTime);
  const formatDuration = formatTime(duration);

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const rewindHandler = () => {
    //Rewinds the video player reducing 5
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
  };

  const handleFastFoward = () => {
    //FastFowards the video player by adding 10
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
  };

  //console.log("========", (controlRef.current.style.visibility = "false"));
  const progressHandler = (state:any) => {
    if (count > 3) {
      console.log("close");
      controlRef.current.style.visibility = "hidden"; // toggling player control container
    } else if (controlRef.current.style.visibility === "visible") {
      count += 1;
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (e:any, value:any) => {
    console.log(formatDuration,"formatDuration")
    console.log(value, 'valueeeeeee,"==============')
    // setVideoState({ ...videoState, played: parseFloat(value / 100) });
    // videoPlayerRef.current.seekTo(parseFloat(value / 100));
    console.log((value * 5.39) / 100);
    const time = ((value * 5.39) / 100);
    setVideoTimeline(time)
    setVideoState({ ...videoState, seeking: false });
    // videoPlayerRef.current.seekTo(value / 100);
    videoPlayerRef?.current?.seekTo(time);
    console.log(videoPlayerRef.current,"---------")
    
  };

  const seekValue = (value:any) => {
    console.log(value);
    const parts = value.split(':');
    const minutes = parseInt(parts[0], 10) || 0;
    const seconds = parseInt(parts[1], 10) || 0;
    const totalSeconds = minutes * 60 + seconds;
    videoPlayerRef.current.seekTo(totalSeconds, 'seconds');
  }

  const seekMouseUpHandler = (e, value) => {
    console.log(value);

    setVideoState({ ...videoState, seeking: false });
    videoPlayerRef.current.seekTo(value / 100);
  };

  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
    });
  };

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    });
  };

  const muteHandler = () => {
    //Mutes the video player
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  const onSeekMouseDownHandler = (e) => {
    setVideoState({ ...videoState, seeking: true });
  };

  const mouseMoveHandler = () => {
    controlRef.current.style.visibility = "visible";
    count = 0;
  };

  const bufferStartHandler = () => {
    console.log("Bufering.......");
    setVideoState({ ...videoState, buffer: true });
  };

  const bufferEndHandler = () => {
    console.log("buffering stoped ,,,,,,play");
    setVideoState({ ...videoState, buffer: false });
  };

  return (
    <div>
      <div className="video_container">
        {/* <div>
          <h2>React player</h2>
        </div> */}
        <Container >
          <div className="player__wrapper" onMouseMove={mouseMoveHandler}>
            <ReactPlayer
              ref={videoPlayerRef}
              className="player"
              url={props.url}
              width="100%"
              height="100%"
              playing={playing}
              volume={volume}
              muted={muted}
              onProgress={progressHandler}
              onBuffer={bufferStartHandler}
              onBufferEnd={bufferEndHandler}
            />

            {buffer && <p>Loading</p>}

            <Control
              controlRef={controlRef}
              onPlayPause={playPauseHandler}
              playing={playing}
              onRewind={rewindHandler}
              onForward={handleFastFoward}
              played={played}
              onSeek={seekHandler}
              onSeekMouseUp={seekMouseUpHandler}
              volume={volume}
              onVolumeChangeHandler={volumeChangeHandler}
              onVolumeSeekUp={volumeSeekUpHandler}
              mute={muted}
              onMute={muteHandler}
              playRate={playbackRate}
              duration={formatDuration}
              currentTime={formatCurrentTime}
              onMouseSeekDown={onSeekMouseDownHandler}
            />
          </div>
        </Container>
      </div>
      {/* <button onClick={() => seekValue('02:22')}>timeline-'02:22'</button> */}
    </div>
  );
}

export default ReactVideo;
