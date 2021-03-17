// React import
import React, { Component } from "react";

// Material UI imports
import { Button, Card, CardContent, Container, Divider, Grid, Paper, Typography, withStyles } from "@material-ui/core";

//Animated slider components
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import { Rating } from "@material-ui/lab";

//Axios
import axios from "axios";

// Env vars
const defaultUrl = process.env["REACT_APP_URL"];

const styles = (theme) => ({
  root: {
    textAlign: "center",
    fontSize: "70%",
  },
  paper: {
    backgrowndColor: theme.palette.background.paper,
    margin: "1.75rem auto",
    padding: 15,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper2: {
    backgrowndColor: theme.palette.background.light,
    padding: 15,
  },
  info: {
    padding: "5px",
  },
  span: {
    color: "#ff9980",
    margin: 8,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_users: 0,
      locals: 0,
      commentaries: 0,
      array_estab: [],
      info_general: [],
      error: false,
      cargado: false,
    };
  }

  componentDidMount() {
    document.title = "Locals";
    //Descarrega slider
    axios
      .get(defaultUrl + "establiment/slider/")
      .then((resposta) => {
        this.setState({ array_estab: resposta.data.dades, cargado: true });
      })
      .catch((error) => {
        this.setState({ error, cargado: true });
      });
    //Descarrega info general
    axios
      .get(defaultUrl + "establiment/info-general/")
      .then((resposta) => {
        this.setState({ info_general: resposta.data.dades, cargado: true });
      })
      .catch((error) => {
        this.setState({ error, cargado: true });
      });
  }

  render() {
    const { classes } = this.props;

    const { array_estab } = this.state;
    return (
      <>
        <Slider autoplay={5000}>
          {array_estab.map((item, index) => (
            <div
              key={index}
              style={{
                background: `url(${defaultUrl}/upload/images/establiment/${item.foto}) no-repeat center center`,
              }}
              className={classes.center}
            >
              <Paper className={classes.paper2}>
                <div className="center">
                  <h1>{item.nom}</h1>
                  <p>Telèfon: {item.telefon}</p>
                  <Rating name="half-rating" value={parseFloat(item.nota)} precision={0.5} size="medium" readOnly />
                  <br />
                  <Button color="secondary">Visita</Button>
                </div>
              </Paper>
            </div>
          ))}
        </Slider>

        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h2">Quí som?</Typography>
            </Grid>
            <Divider width="70%" />
            <Grid item xs={12}>
              <Typography variant="h5">Som una empresa que promociona establiments, oferint al client la oportunitat de valorar i compartir les seves experiencies</Typography>
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <span className={classes.span}>{this.state.info_general.usuaris}</span>
                    usuarios
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    <span className={classes.span}>{this.state.info_general.establiments}</span>
                    establiments
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    <span className={classes.span}>{this.state.info_general.comentaris}</span>
                    comentaris
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Home);
