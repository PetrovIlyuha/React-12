import React from "react";
import { useExploreSuggestionsStyles } from "../../styles";
import { Hidden, Typography } from "@material-ui/core";
import FollowSuggestions from "../shared/FollowSuggestions";

function ExploreSuggestions() {
  const classes = useExploreSuggestionsStyles();

  return (
    <Hidden xsDown>
      <div className={classes.container}>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          component="h2"
          className={classes.typography}
        >
          Discover People
        </Typography>
        <FollowSuggestions hideHeader />
      </div>
    </Hidden>
  );
}

export default ExploreSuggestions;
