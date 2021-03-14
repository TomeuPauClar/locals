import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Raleway", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
    button: {
      textTransform: "none",
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: '#7b1fa2',
    },
    secondary: {
      main: "#ffc400",
    },
  },
});

export default theme;
