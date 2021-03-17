// React import
import React, { Component } from "react";

// Material UI imports
import { Card, CardContent, CardMedia, Collapse, Container, Divider, GridList, GridListTile, GridListTileBar, List, ListItem, ListItemIcon, ListItemText, Typography, withStyles } from "@material-ui/core";

// Axios Import
import axios from "axios";

import { Redirect } from "react-router";
import { ExpandLess, ExpandMore, Phone, Public, Room, Schedule, Star } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
const defaultUrl = process.env["REACT_APP_URL"];

const styles = (theme) => ({
  paper: {
    backgrowndColor: theme.palette.background.paper,
    margin: "1.75rem auto",
    padding: 15,
  },
  card: {
    margin: "1.75rem auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
  },
  star: {
    position: "absolute",
    top: 5,
    left: 5,
  },
  media: {
    height: 500,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  imgGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
    transform: "translateZ(0)",
  },
  titleBar: {
    background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " + "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
});

class Establiment extends Component {
  constructor(props) {
    super(props);
    this.state = { establiment: {}, idEstabliment: null, redirect: null, openHorari: false };
    this.getIdEstabliment = this.getIdEstabliment.bind(this);
    this.handleHorariOpen = this.handleHorariOpen.bind(this);
  }

  handleHorariOpen() {
    this.setState({
      openHorari: !this.state.openHorari,
    });
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
    const { establiment, redirect, openHorari } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }

    let image = establiment.fotos ? defaultUrl + "/upload/images/establiment/" + establiment.fotos[0].nomFoto : defaultUrl + "/upload/images/no-image.png";

    return (
      <>
        <Container>
          <Card key={establiment.idEstabliment} className={classes.card}>
            {establiment.destacat === "1" && <Star className={classes.star} color="primary" fontSize="large" />}
            <CardMedia className={classes.media} image={image} title={"Fotografia Preferida de l'establiment " + establiment.nom} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {establiment.nom}
              </Typography>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Typography variant="body1" color="textSecondary">
                  {establiment.nota}
                </Typography>
                <Rating name="read-only" value={parseFloat(establiment.nota)} precision={0.5} size="small" readOnly />
                <Typography variant="body1" color="textSecondary">
                  {establiment.comentaris && establiment.comentaris.length} ressenyes
                </Typography>
              </div>
              <Typography variant="body1" color="textSecondary" component="p">
                {establiment.descripcio}
              </Typography>
              <Divider />
              <div className={classes.demo}>
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <Room color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={establiment.direccio} />
                  </ListItem>
                  <ListItem button onClick={this.handleHorariOpen}>
                    <ListItemIcon>
                      <Schedule color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Horari" />
                    {openHorari ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={openHorari} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                          <Schedule />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItem>
                    </List>
                  </Collapse>
                  <ListItem button>
                    <ListItemIcon>
                      <Public color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={establiment.web} />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <Phone color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={establiment.telefon} />
                  </ListItem>
                </List>
              </div>
            </CardContent>
          </Card>
          <div className={classes.imgGrid}>
            <GridList cellHeight={200} spacing={1} className={classes.gridList}>
              {establiment.images &&
                establiment.images.map((image) => (
                  <GridListTile key={image.idFoto} cols={image.nomCategoria === "Foto Destacada" ? 2 : 1} rows={image.nomCategoria === "Foto Destacada" ? 2 : 1}>
                    <img src={defaultUrl + "/upload/images/establiment/" + image.nomFoto} alt={image.nomCategoria} />
                    <GridListTileBar title={image.title} titlePosition="top" actionPosition="left" className={classes.titleBar} />
                  </GridListTile>
                ))}
            </GridList>
          </div>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Establiment);
