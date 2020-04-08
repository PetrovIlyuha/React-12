import React from "react";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";

function App() {
  const greaterThanMedium = useMediaQuery("(min-width: 600px)");

  return (
    <>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid
        container
        spacing={3}
        style={{ backgroundColor: "#0E2431", color: "#FAF4D0" }}
      >
        <Grid
          style={
            greaterThanMedium
              ? { padding: "90px 0 0 35px" }
              : { padding: "15px 20px 0 20px" }
          }
          item
          xs={12}
          md={7}
          sm={6}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sm={6}
          style={
            greaterThanMedium
              ? {
                  padding: "80px 15px 0 15px",
                  position: "fixed",
                  width: "100%",
                  right: 0,
                  top: 70,
                }
              : {
                  padding: "80px 15px 0 25px",
                  position: "fixed",
                  left: 0,
                  bottom: 0,
                }
          }
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
