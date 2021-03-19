// React import
import React, { Component } from "react";

// Material UI imports
import { Container, Grid, Paper, Typography, withStyles } from "@material-ui/core";

import Logo from "../alcateam.svg";
const styles = (theme) => ({
  paper: {
    backgrowndColor: theme.palette.background.paper,
    margin: "1.75rem auto",
    padding: 15,
  },
  img: {
    width: "15vw",
  },
});

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = "Not Found - Locals";
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Container>
          <Paper className={classes.paper}>
            <Grid container spacing={2} direction="column" justify="center" alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h1">
                  <span>404</span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <img className={classes.img} src={Logo} alt="Recurs no trobat" />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h3">Not Found</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">Alguna cosa no està bé, puc notar-ho</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NotFound);
