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

export default theme;
