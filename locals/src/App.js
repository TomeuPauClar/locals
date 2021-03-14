import { Route, BrowserRouter as Router, Redirect, Switch } from "react-router-dom";

// Imports dels components
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Establiments from "./components/Establiments";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Contact from "./components/Contact";

// React import
import React, { Component } from "react";

// Material UI imports
import { withStyles } from "@material-ui/core";
import ScrollToTop from "./ScrollToTop";

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
    this.state = { loggedIn: false };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Router>
          <ScrollToTop />
          <Header />
          <div className={classes.content}>
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} />} />
              <Route exact path="/establiments" render={(props) => <Establiments {...props} />} />
              <Route exact path="/login" render={(props) => <Login {...props} />} />
              <Route exact path="/register" render={(props) => <Register {...props} />} />
              <Route exact path="/contacte" render={(props) => <Contact {...props} />} />
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
