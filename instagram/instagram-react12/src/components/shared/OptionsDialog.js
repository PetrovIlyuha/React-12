import React from "react";
import { useOptionsDialogStyles } from "../../styles";
import { Dialog, Zoom, Divider, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { defaultPost } from "../../data";

function OptionsDialog({ onClose }) {
  const classes = useOptionsDialogStyles();

  return (
    <Dialog
      open
      classes={{ scrollPaper: classes.dialogScrollPaper }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      <Button className={classes.redButton}>Unfollow</Button>
      <Divider />
      <Button className={classes.button}>
        <Link to={`/p/${defaultPost.id}`}>Go to Post</Link>
      </Button>
      <Divider />
      <Button className={classes.button}>Share</Button>
      <Divider />
      <Button className={classes.button} onClick={onClose}>
        Cancel
      </Button>
    </Dialog>
  );
}

export default OptionsDialog;
