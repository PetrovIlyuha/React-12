import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
  pallete: {
    type: "dark",
    primary: indigo,
    secondary: grey,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
