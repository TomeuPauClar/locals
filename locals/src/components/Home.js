// React import
import React, { Component } from "react";

// Material UI imports
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";

//Animated slider components
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import { Rating } from "@material-ui/lab";

//Axios
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

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
  inline: {
    display: "inline",
  },
  link: {
    color: "#fafaff",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  margen: {
    margin: "1.75rem 0",
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
      ultComment: [],
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
    //Descarrega els ultims 5 commentaris
    axios
      .get(defaultUrl + "comentari/conjunt/")
      .then((resposta) => {
        this.setState({ ultComment: resposta.data.dades, cargado: true });
      })
      .catch((error) => {
        this.setState({ error, cargado: true });
      });
  }

  link(id, ruta) {
    return React.forwardRef((props, ref) => (
      <RouterLink ref={ref} to={"/"+ruta+"/" + id} {...props} />
    ));
  }

  render() {
    const { classes } = this.props;

    const { array_estab } = this.state;

    const ultCommentari = this.state.ultComment;

    return (
      <>
        <Slider autoplay={5000}>
          {array_estab.map((item, index) => (
            <div
              key={index}
              style={{
                background: `url(${defaultUrl}upload/images/establiment/${item.foto}) no-repeat center center`,
              }}
              className={classes.center}
            >
              <Paper className={classes.paper2}>
                <div className="center">
                  <h1>{item.nom}</h1>
                  <p>Telèfon: {item.telefon}</p>
                  <Rating
                    name="half-rating"
                    value={parseFloat(item.nota)}
                    precision={0.5}
                    size="medium"
                    readOnly
                  />
                  <br />
                  <Button
                    color="secondary"
                    component={this.link(item.idEstabliment,"establiment")}
                  >
                    Visitans
                  </Button>
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
              <Typography variant="h5">
                Som una empresa que promociona establiments, oferint al client
                la oportunitat de valorar i compartir les seves experiencies
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    component="div"
                  >
                    <span className={classes.span}>
                      {this.state.info_general.usuaris}
                    </span>
                    usuaris
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography component="div" color="textSecondary" gutterBottom>
                    <span className={classes.span}>
                      {this.state.info_general.establiments}
                    </span>
                    establiments
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography component="div" color="textSecondary" gutterBottom>
                    <span className={classes.span}>
                      {this.state.info_general.comentaris}
                    </span>
                    comentaris
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Paper className={classes.margen}>
            {ultCommentari.map((item, index) => (
              <List key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={item.nom}
                      src={defaultUrl + "upload/images/avatar/" + item.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Rating
                          value={parseFloat(item.valoracio)}
                          precision={0.5}
                          size="small"
                          readOnly
                        />
                        <Typography variant="body2">{item.data}</Typography>
                      </span>
                    }
                    secondary={
                      <span>
                        {"De: "}
                        <Typography
                          component={this.link(item.idUsuari,"perfil")}
                          variant="body2"
                          className={classes.inline+" "+classes.link}
                          color="textPrimary"
                        >
                          {item.nomUsuari}
                        </Typography>
                        {" a: "}
                        <Typography
                          component={this.link(item.idEstabliment,"establiment")}
                          variant="body2"
                          className={classes.inline+" "+classes.link}
                          color="textPrimary"
                        >
                          {item.nomEstabliment}
                        </Typography>
                        {" — " + item.comentari}
                      </span>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            ))}
          </Paper>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Home);
