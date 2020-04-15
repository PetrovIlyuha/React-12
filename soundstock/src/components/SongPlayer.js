import React, { useContext, useEffect, useState, useRef } from "react";
import QueuedSongList from "./QueuedSongList";
import ReactPlayer from "react-player";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Slider,
  CardMedia,
  makeStyles,
} from "@material-ui/core";
import { SkipPrevious, PlayArrow, Pause, SkipNext } from "@material-ui/icons";
import { SongContext } from "../App";
import { useQuery } from "@apollo/react-hooks";
import { GET_QUEUED_SONGS } from "../graphql/queries";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    height: "230px",
    marginBottom: 10,
    borderRadius: "10px",
    backgroundColor: "#061114",
    backgroundImage: "linear-gradient(45deg, #000000 0%, #12481d 100%)",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: "0 15px",
    width: "100%",
    alignItems: "center",
  },
  content: {
    flex: "1 0 auto",
    color: "#f1d6ab",
  },
  thumbnail: {
    width: 250,
    objectFit: "cover",
  },
  controls: {
    color: "#f1d6ab",
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  playIcon: {
    color: "#f1d6ab",
    height: 38,
    width: 38,
  },
  time: {
    color: "#f1d6ab",
  },
}));

const SongPlayer = () => {
  const { data } = useQuery(GET_QUEUED_SONGS);
  const { state, dispatch } = useContext(SongContext);

  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSecongs] = useState(0);
  const ReactPlayerRef = useRef();
  const [seeking, setSeeking] = useState(false);
  const [positionInQueue, setPositionInQueue] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const songIndex = data.queue.findIndex(song => song.id === state.song.id);
    setPositionInQueue(songIndex);
  }, [data.queue, state.song.id]);

  useEffect(() => {
    const nextSong = data.queue[positionInQueue + 1];
    if (played >= 0.97 && nextSong) {
      setPlayed(0);
      dispatch({ type: "SET_SONG", payload: { song: nextSong } });
    }
  }, [data.queue, played, dispatch, positionInQueue]);

  const handleTogglePlay = () => {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  };

  const handleProgressChange = (event, newValue) => {
    setPlayed(newValue);
  };

  const handleSeekingMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekingMouseUp = () => {
    setSeeking(false);
    ReactPlayerRef.current.seekTo(played);
  };

  const formatDuration = seconds => {
    return new Date(seconds * 1000).toISOString().substring(11, 19);
  };

  const handlePlayNextSong = () => {
    const nextSong = data.queue[positionInQueue + 1];
    if (nextSong) {
      dispatch({ type: "SET_SONG", payload: { song: nextSong } });
    }
  };

  const handlePlayPrevSong = () => {
    const prevSong = data.queue[positionInQueue - 1];
    if (prevSong) {
      dispatch({ type: "SET_SONG", payload: { song: prevSong } });
    }
  };
  return (
    <>
      <Card variant="outlined" className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h3">
              {state.song.title}
            </Typography>
            <Typography variant="subtitle1" component="p">
              {state.song.artist}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton onClick={handlePlayPrevSong}>
              <SkipPrevious className={classes.playIcon} />
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {state.isPlaying ? (
                <Pause className={classes.playIcon} />
              ) : (
                <PlayArrow className={classes.playIcon} />
              )}
            </IconButton>
            <IconButton onClick={handlePlayNextSong}>
              <SkipNext className={classes.playIcon} />
            </IconButton>
            <Typography
              variant="subtitle1"
              component="p"
              className={classes.time}
            >
              {formatDuration(playedSeconds)}
            </Typography>
          </div>
          <Slider
            onMouseDown={handleSeekingMouseDown}
            onMouseUp={handleSeekingMouseUp}
            onChange={handleProgressChange}
            value={played}
            type="range"
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <ReactPlayer
          ref={ReactPlayerRef}
          onProgress={({ played, playedSeconds }) => {
            if (!seeking) {
              setPlayed(played);
              setPlayedSecongs(playedSeconds);
            }
          }}
          url={state.song.url}
          playing={state.isPlaying}
          hidden
        />
        <CardMedia className={classes.thumbnail} image={state.song.thumbnail} />
      </Card>
      <QueuedSongList queue={data.queue} />
    </>
  );
};

export default SongPlayer;
