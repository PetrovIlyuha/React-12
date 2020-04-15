import React from "react";
import Logo from "../Logo";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar
      style={{
        backgroundColor: "#00DBDE",
        backgroundImage: "linear-gradient(90deg, #303242 0%, #004A2F 100%)",
      }}
      position="fixed"
    >
      <Toolbar>
        <Logo width="60px" />
        <Typography variant="h6" component="h1" className={classes.title}>
          SoundStock
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
