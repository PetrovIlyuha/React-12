import React from "react";
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
import { PlayArrow, Save } from "@material-ui/icons";

const SongList = () => {
  let loading = false;

  const song = {
    title: "Stoned (OTR Remix)",
    artist: "BLONDAGE",
    thumbnail:
      "https://images.genius.com/e0133cf47a74343a8ee8bd4a42e8f29d.1000x1000x1.jpg",
  };

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
  return (
    <div>
      {Array.from({ length: 10 }, () => song).map((song, index) => (
        <Song key={index} song={song} />
      ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
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

function Song({ song }) {
  const { title, artist, thumbnail } = song;
  const classes = useStyles();
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
            <IconButton size="small" color="primary">
              <PlayArrow style={{ color: "yellow" }} />
            </IconButton>
            <IconButton size="small" color="secondary">
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}
export default SongList;
