// React import
import React, { Component } from "react";

// Material UI imports
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Container,
  Divider,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";

// Axios Import
import axios from "axios";

// React Router Dom
import { Link as RouterLink } from "react-router-dom";

import { Redirect } from "react-router";
import { Delete, Edit, EuroSymbol, ExpandLess, ExpandMore, MoreVert, Phone, Public, Room, Schedule, Star } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import GoogleMapReact from "google-map-react";

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
    borderRadius: 5,
    marginBottom: "1.75rem",
  },
  gridList: {
    height: 450,
    transform: "translateZ(0)",
  },
  titleBar: {
    background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  comentaris: {
    marginBottom: "1.75rem",
  },
  inline: {
    display: "inline",
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  butonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    "& > *": {
      margin: theme.spacing(1),
    },
    "& > *:last-child": {
      marginRight: 0,
    },
  },
});

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Establiment extends Component {
  constructor(props) {
    super(props);
    this.state = { establiment: {}, idEstabliment: null, redirect: null, openHorari: false, notaUsuari: 0, comentari: "", jaTeComentari: false, commentMore: null };
    this.getIdEstabliment = this.getIdEstabliment.bind(this);
    this.handleHorariOpen = this.handleHorariOpen.bind(this);
    this.setNota = this.setNota.bind(this);
    this.enviarComentari = this.enviarComentari.bind(this);
    this.setComentari = this.setComentari.bind(this);
    this.handleCommentMore = this.handleCommentMore.bind(this);
    this.handleCloseCommentMore = this.handleCloseCommentMore.bind(this);
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
          if (this.props.usuari && response.data.dades.comentaris.some((comentari) => comentari.idUsuari === this.props.usuari.idUsuari)) {
            this.setState({
              jaTeComentari: true,
            });
          }
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

  setNota(v, notaUsuari) {
    this.setState({
      notaUsuari,
    });
  }

  setComentari(e) {
    this.setState({
      comentari: e.target.value,
    });
  }

  enviarComentari() {
    const { idEstabliment, comentari, notaUsuari } = this.state;
    var idUsuari = this.props.usuari.idUsuari;
    var valoracio = notaUsuari;
    axios({
      method: "post",
      url: defaultUrl + "comentari/",
      responseType: "json",
      data: { idEstabliment, idUsuari, comentari, valoracio },
    })
      .then((response) => {
        console.log("Resposta Comentari", response);
      })
      .catch((error) => {
        console.error("Error al inserir un comentari: ", error);
      });
  }

  handleCommentMore(e) {
    this.setState({
      commentMore: e.currentTarget,
    });
  }

  handleCloseCommentMore() {
    this.setState({
      commentMore: null,
    });
  }

  render() {
    const { classes, usuari, loggedIn } = this.props;
    const { establiment, redirect, openHorari, notaUsuari, comentari, jaTeComentari, commentMore } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }

    const avatar = usuari.avatar ? (usuari.avatar === "noAvatar.jpg" ? "" : defaultUrl + "/upload/images/avatar/" + usuari.avatar) : "";
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
              <Divider style={{ margin: "1rem 0" }} />
              <div className={classes.chipContainer}>
                {establiment.tipusCuina &&
                  establiment.tipusCuina.map((tipusCuina) => {
                    return <Chip key={tipusCuina} label={tipusCuina} />;
                  })}
              </div>
              <Divider style={{ margin: "1rem 0" }} />
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
                      {establiment.horari &&
                        establiment.horari.map((horari, i) => (
                          <ListItem key={i} button className={classes.nested}>
                            <ListItemText
                              primary={
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                  <Typography variant="body1">{horari.dia}</Typography>
                                  <Typography variant="body2" color="textSecondary">
                                    {horari.obren + "–" + horari.tanquen}
                                  </Typography>
                                </div>
                              }
                            />
                          </ListItem>
                        ))}
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
                  <ListItem button>
                    <ListItemIcon>
                      <EuroSymbol color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={establiment.categoriaPreu} />
                  </ListItem>
                </List>
              </div>
            </CardContent>
          </Card>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className={classes.imgGrid}>
                {establiment.fotos && (
                  <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                    {establiment.fotos.map((foto) => (
                      <GridListTile key={foto.idFoto} cols={foto.nomCategoria === "Foto Destacada" ? 2 : 1} rows={foto.nomCategoria === "Foto Destacada" ? 2 : 1}>
                        <img src={defaultUrl + "/upload/images/establiment/" + foto.nomFoto} alt={foto.nomCategoria} />
                        <GridListTileBar title={foto.nomCategoria} titlePosition="top" actionPosition="left" className={classes.titleBar} />
                      </GridListTile>
                    ))}
                  </GridList>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper style={{ width: "100%", height: 450 }}>
                {establiment.latitud && establiment.longitud && (
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCtFUOmji7O7C8qX12aJv6M6HSns0rUQY8" }}
                    defaultCenter={{
                      lat: parseFloat(establiment.latitud),
                      lng: parseFloat(establiment.longitud),
                    }}
                    defaultZoom={11}
                  >
                    <AnyReactComponent lat={parseFloat(establiment.latitud)} lng={parseFloat(establiment.longitud)} />
                  </GoogleMapReact>
                )}
              </Paper>
            </Grid>
          </Grid>

          <Paper className={classes.comentaris}>
            {loggedIn && !jaTeComentari && (
              <div style={{ padding: "8px 16px 0" }}>
                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 10 }}>
                  {usuari.avatar && <Avatar alt={usuari.nom} src={avatar} />}
                  <TextField label="Comentari" fullWidth multiline size="small" rowsMax={4} value={comentari} onChange={this.setComentari} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft: 44 }}>
                  <div>
                    <Rating name="nota-usuari" value={notaUsuari} precision={0.5} onChange={this.setNota} />
                  </div>
                  <div className={classes.butonContainer}>
                    <Button variant="contained">Cancel·lar</Button>
                    <Button variant="contained" color="primary" onClick={this.enviarComentari}>
                      Enviar
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {establiment.comentaris && establiment.comentaris.length > 0 && (
              <List>
                {establiment.comentaris.map((comentari) => (
                  <div key={comentari.idUsuari}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={comentari.nom} src={comentari.avatar ? (comentari.avatar === "noAvatar.jpg" ? "" : defaultUrl + "/upload/images/avatar/" + comentari.avatar) : ""} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center"}}>
                              <Rating value={parseFloat(comentari.valoracio)} precision={0.5} size="small" readOnly />
                              <Typography variant="body2" color="textSecondary"> - {comentari.data}</Typography>
                            </div>
                            {usuari.idUsuari && comentari.idUsuari === usuari.idUsuari && (
                              <>
                                <IconButton onClick={this.handleCommentMore}>
                                  <MoreVert />
                                </IconButton>
                                <Menu id="simple-menu" anchorEl={commentMore} keepMounted open={Boolean(commentMore)} onClose={this.handleCloseCommentMore}>
                                  <MenuItem key={"editar"} onClick={this.handleCloseCommentMore}>
                                    <ListItemIcon>
                                      <Edit fontSize="small" />
                                    </ListItemIcon>
                                    <Typography variant="inherit">Editar</Typography>
                                  </MenuItem>
                                  <MenuItem key={"eliminar"} onClick={this.handleCloseCommentMore}>
                                    <ListItemIcon>
                                      <Delete fontSize="small" />
                                    </ListItemIcon>
                                    <Typography variant="inherit">Eliminar</Typography>
                                  </MenuItem>
                                </Menu>
                              </>
                            )}
                          </div>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                              {comentari.nom}
                            </Typography>
                            {" — " + comentari.comentari}
                          </>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                ))}
              </List>
            )}
          </Paper>
        </Container>
      </>
    );
  }
}

function getLink(idUsuari) {
  return React.forwardRef((props, ref) => <RouterLink ref={ref} {...props} to={"/perfil/" + idUsuari} />);
}

export default withStyles(styles, { withTheme: true })(Establiment);
