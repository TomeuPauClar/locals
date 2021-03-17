import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Noto Sans JP", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
    button: {
      textTransform: "none",
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: '#ab47bc',
    },
    secondary: {
      main: "#ffc400",
    },
  },
});

export default theme;
