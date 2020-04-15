import React, { useState, useContext, useEffect } from "react";
import {
  CircularProgress,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { PlayArrow, Save, Pause } from "@material-ui/icons";
import { GET_SONGS } from "../graphql/subscriptions";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import { SongContext } from "../App";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "20px",
    backgroundColor: "#394359",
    color: "#FAF4D0",
  },
  songInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
  songInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  thumbnail: {
    objectFit: "cover",
    width: 160,
    height: 140,
  },
}));

const SongList = () => {
  const { data, loading, error } = useSubscription(GET_SONGS);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) return <div>Error fetching songs...</div>;

  return (
    <div>
      {data && data.Songs.map(song => <Song key={song.id} song={song} />)}
    </div>
  );
};

function Song({ song }) {
  const { id } = song;
  const { title, artist, thumbnail } = song;
  const { state, dispatch } = useContext(SongContext);
  const [currentSongPlaying, setCurrentSongPlaying] = useState(false);
  const classes = useStyles();

  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: data => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });

  useEffect(() => {
    const isSongPlaying = id === state.song.id && state.isPlaying;
    setCurrentSongPlaying(isSongPlaying);
  }, [id, state.song.id, state.isPlaying]);

  const handleTogglePlay = () => {
    dispatch({ type: "SET_SONG", payload: { song } });
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  };

  const handleAddOrRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } },
    });
  };
  return (
    <Card className={classes.container}>
      <div className={classes.songInfoContainer}>
        <CardMedia image={thumbnail} className={classes.thumbnail} />
        <div className={classes.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="textSecondary"
              style={{ color: "#46AFB9" }}
            >
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={handleTogglePlay} size="small" color="primary">
              {currentSongPlaying ? (
                <Pause style={{ color: "yellow" }} />
              ) : (
                <PlayArrow style={{ color: "yellow" }} />
              )}
            </IconButton>
            <IconButton
              onClick={handleAddOrRemoveFromQueue}
              size="small"
              color="secondary"
            >
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}
export default SongList;
