import React from "react";
import {
  Typography,
  Avatar,
  IconButton,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles({
  avatar: {
    width: 50,
    height: 50,
  },
  text: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "60px auto 60px",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10,
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
});

const QueuedSongList = () => {
  const song = {
    title: "Stoned (OTR Remix)",
    artist: "BLONDAGE",
    thumbnail:
      "https://images.genius.com/e0133cf47a74343a8ee8bd4a42e8f29d.1000x1000x1.jpg",
  };
  const greaterThanMedium = useMediaQuery("(min-width: 600px)");
  return (
    greaterThanMedium && (
      <div style={{ margin: "10px 0" }}>
        <Typography style={{ color: "yellow" }} variant="button">
          QUEUE (5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, index) => (
          <QueuedSong key={index} song={song} />
        ))}
      </div>
    )
  );
};

function QueuedSong({ song }) {
  const { thumbnail, artist, title } = song;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Avatar src={thumbnail} alt="song thumbnail" className={classes.avatar} />
      <div className={classes.songInfoContainer}>
        <Typography variant="subtitle2" className={classes.text}>
          {title}
        </Typography>
        <Typography variant="body2" className={classes.text}>
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}

export default QueuedSongList;
