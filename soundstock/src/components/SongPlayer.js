import React, { useContext } from "react";
import QueuedSongList from "./QueuedSongList";
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

const useStyles = makeStyles((theme) => ({
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
}));

const SongPlayer = () => {
  const { state, dispatch } = useContext(SongContext);
  const classes = useStyles();

  const handleTogglePlay = () => {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
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
            <IconButton>
              <SkipPrevious className={classes.playIcon} />
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {state.isPlaying ? (
                <Pause className={classes.playIcon} />
              ) : (
                <PlayArrow className={classes.playIcon} />
              )}
            </IconButton>
            <IconButton>
              <SkipNext className={classes.playIcon} />
            </IconButton>
            <Typography
              variant="subtitle1"
              component="p"
              className={classes.playIcon}
            >
              2:43:00
            </Typography>
          </div>
          <Slider type="range" min={0} max={1} step={0.01} />
        </div>
        <CardMedia className={classes.thumbnail} image={state.song.thumbnail} />
      </Card>
      <QueuedSongList />
    </>
  );
};

export default SongPlayer;
