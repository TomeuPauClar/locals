import { Route, BrowserRouter as Router, Redirect, Switch } from "react-router-dom";

// Imports dels components
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Establiments from "./components/Establiments";
import Establiment from "./components/Establiment";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Contact from "./components/Contact";

// React import
import React, { Component } from "react";

// Material UI imports
import { withStyles } from "@material-ui/core";
import ScrollToTop from "./ScrollToTop";

// Axios Import
import axios from "axios";
import Profile from "./components/Profile";

// Cookies functions
const cookies = require("./cookies");

// Env vars
const defaultUrl = process.env["REACT_APP_URL"];

const styles = (theme) => ({
  wrapper: {
    minHeight: "100%",
    position: "relative",
  },
  content: {
    paddingBottom: "64px",
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, usuari: {}, dadesCarregades: false, snackbarStatus: false, snackbarMessage: "", snackbarSeverity: "info" };

    this.handleSnackbar = this.handleSnackbar.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    var token = cookies.getCookie("token");
    if (token) {
      axios({
        method: "get",
        url: defaultUrl + "usuari/validar/" + token,
        responseType: "json",
      })
        .then((response) => {
          // console.log("Check Login Status Response: ", response);
          if (response.data.correcta) {
            this.setState({
              loggedIn: true,
              usuari: response.data.dades,
              dadesCarregades: true,
            });
          } else {
            this.setState({
              loggedIn: false,
              usuari: {},
              dadesCarregades: true,
            });
          }
        })
        .catch((error) => {
          console.error("Checking Login Status Error: ", error);
        });
    } else {
      this.setState({
        loggedIn: false,
        usuari: {},
        dadesCarregades: true,
      });
    }
  }

  handleSuccessfulAuth(data, remember) {
    cookies.deleteAllCookies();
    cookies.setCookie("token", data.dades.token, 7, null, "/");
    if (remember) {
      cookies.setCookie("nom", data.dades.nom, 7, null, "/");
    } else {
      cookies.deleteCookie("nom");
    }
    this.checkLoginStatus();
  }

  handleLogout() {
    cookies.deleteCookie("token");
    this.checkLoginStatus();
  }

  handleSnackbar(message, severity) {
    this.setState({ snackbarStatus: true, snackbarMessage: message, snackbarSeverity: severity });
  }

  handleSnackbarClose(e, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarStatus: false });
  }

  render() {
    const { usuari, loggedIn, dadesCarregades } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Router>
          <ScrollToTop />
          <Header loggedIn={loggedIn} usuari={usuari} handleLogout={this.handleLogout} />
          <div className={classes.content}>
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} />} />
              <Route exact path="/establiments" render={(props) => <Establiments {...props} />} />
              <Route exact path="/login" render={(props) => <Login {...props} loggedIn={loggedIn} handleSuccessfulAuth={this.handleSuccessfulAuth} handleSnackbar={this.handleSnackbar} />} />
              <Route exact path="/register" render={(props) => <Register {...props} loggedIn={loggedIn} handleSuccessfulAuth={this.handleSuccessfulAuth} handleSnackbar={this.handleSnackbar} />} />
              <Route exact path="/contacte" render={(props) => <Contact {...props} />} />
              {dadesCarregades && <Route exact path="/establiment/:id" render={(props) => <Establiment {...props} loggedIn={loggedIn} usuari={usuari} />} />}
              {dadesCarregades && <Route exact path="/perfil/:id" render={(props) => <Profile {...props} loggedIn={loggedIn} usuari={usuari} handleSnackbar={this.handleSnackbar} />} />}
              <Route exact path="/home">
                <Redirect to="/" />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
          <Footer className={classes.footer} />
        </Router>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
