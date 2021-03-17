// React import
import React, { Component } from "react";

// Material UI imports
import { Container, Paper, Typography, withStyles } from "@material-ui/core";

// Axios Import
import axios from "axios";

import { Redirect } from "react-router";
const defaultUrl = process.env["REACT_APP_URL"];

const styles = (theme) => ({
  paper: {
    backgrowndColor: theme.palette.background.paper,
    margin: "1.75rem auto",
    padding: 15,
  },
});

class Establiment extends Component {
  constructor(props) {
    super(props);
    this.state = { establiment: {}, idEstabliment: null, redirect: null };
    this.getIdEstabliment = this.getIdEstabliment.bind(this);
  }

  componentDidMount() {
    this.getIdEstabliment();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getIdEstabliment();
    }
  }

  getIdEstabliment() {
    let idEstabliment = this.props.match.params.id;
    if (idEstabliment) {
      this.setState(
        {
          idEstabliment: idEstabliment,
        },
        this.getEstabliment
      );
    } else {
      this.setState({
        redirect: "/NotFound",
      });
    }
  }

  getEstabliment() {
    axios({
      method: "get",
      url: defaultUrl + "establiment/" + this.state.idEstabliment,
      responseType: "json",
    })
      .then((response) => {
        console.log("Resposta Info Establiment", response);
        if (response.data.correcta) {
          this.setState({
            establiment: response.data.dades,
          });
          document.title = response.data.dades.nom + " - Establiment - Locals";
        } else {
          this.setState({
            redirect: "/NotFound",
          });
        }
      })
      .catch((error) => {
        console.error("Error al obtenir la informacón de l'establiment: ", error);
      });
  }

  render() {
    const { classes } = this.props;
    const { idEstabliment, redirect } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return (
      <>
        <Container>
          <Paper className={classes.paper}>
            <Typography>La id de l'establiment és {idEstabliment}</Typography>
          </Paper>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Establiment);
