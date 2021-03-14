// React import
import React, { Component } from "react";

// Material UI imports
import { Container, Paper, Typography, withStyles } from "@material-ui/core";

const styles = (theme) => ({
  paper: {
    backgrowndColor: theme.palette.background.paper,
    margin: "1.75rem auto",
    padding: 15,
  },
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = "Registre - Locals";
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Container className={classes.pepe}>
          <Paper className={classes.paper}>
            <Typography variant="h1">Register</Typography>
          </Paper>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Register);
