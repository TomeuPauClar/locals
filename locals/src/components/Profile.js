import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Avatar, Typography, Grid, IconButton, Chip, Backdrop, Button, Fade, InputAdornment, Modal, TextField, CardActionArea, Badge } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import { AddAPhoto, Visibility, VisibilityOff } from "@material-ui/icons";

// Axios Import
import axios from "axios";
import { CalendarToday } from "@material-ui/icons";
import { Redirect } from "react-router";

const defaultUrl = process.env["REACT_APP_URL"];

const styles = (theme) => ({
  root: {
    maxWidth: "60%",
    margin: " 1.75rem auto",
  },
  largeBanner: {
    height: 240,
    backgroundColor: "#fcfcfc",
  },
  largeAvatar: {
    position: "absolute",
    top: 240,
    width: theme.spacing(18),
    height: theme.spacing(18),
    border: "10px solid",
    borderColor: theme.palette.background.paper,
    backgroundColor: "#fff",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    position: "relative",
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    borderRadius: 4,
  },
  smallAvatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    backgroundColor: "#fff",
  },
  cardActionAvatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    marginLeft: 10,
    borderRadius: "50%",
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  inputError: {
    fontSize: 12,
    display: "flex",
    alignItems: "center",
  },
  errorIcon: {
    fontSize: 15,
    marginRight: "0.75rem",
  },
  box: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    marginTop: "1.75rem",
    borderRadius: 4,
  },
  backgroundTitle: {
    backgroundColor: theme.palette.primary.main,
    color: "#000",
    borderRadius: "4px 4px 0 0",
    width: "100%",
    padding: 5,
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      openModal: false,
      nom: "",
      nomError: false,
      nomErrorMessage: "",
      password: "",
      passwordError: false,
      passwordErrorMessage: "",
      showPassword: false,
      redirect: null,
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleValidarNom = this.handleValidarNom.bind(this);
    this.handleValidarPassword = this.handleValidarPassword.bind(this);
  }

  componentDidMount() {
    this.start();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.start();
    }
  }

  start() {
    document.title = "Perfil - Locals";
    if (parseInt(this.props.match.params.id)) {
      this.chargeProfleInfo();
    } else {
      this.setState({
        redirect: "/NotFound",
      });
    }
  }

  handleOpenModal = () => {
    this.setState({
      openModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      openModal: false,
    });
  };

  chargeProfleInfo() {
    axios({
      method: "get",
      url: defaultUrl + "usuari/" + this.props.match.params.id,
      responseType: "json",
    })
      .then((response) => {
        console.log("Resposta Info Usuari", response);
        if (response.data.correcta) {
          this.setState({
            user: response.data.dades,
            nom: response.data.dades.nom,
          });
          document.title = response.data.dades.nom + " - Perfil - Locals";
        } else {
          this.setState({
            redirect: "/NotFound",
          });
        }
      })
      .catch((error) => {
        console.error("Error al obtener la informacón del perfil: ", error);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  handleAvatarChange(event) {
    console.log("a")
    this.setState({
      avatar: event.target.files[0],
    });
  }

  handleValidarNom() {
    const { nom } = this.state;
    if (!nom) {
      this.setState({ nomError: true, nomErrorMessage: "Introduce un nombre de usuario." });
      return;
    } else if (nom.length < 1 || nom.length > 50) {
      this.setState({ nomError: true, nomErrorMessage: "El formato del nombre de usuario és incorrecto. ( min. 1 caracteres, max. 50 caracteres )" });
      return;
    } else {
      this.setState({ nomError: false, nomErrorMessage: "" });
    }
  }

  handleValidarPassword() {
    const { password } = this.state;
    if (!password) {
      this.setState({ passwordError: true, passwordErrorMessage: "Introduce una contraseña." });
      return;
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      this.setState({ passwordError: true, passwordErrorMessage: "El formato de la contraseña és incorrecto. (min. 8 caracteres, debe contener al menos una letra mayúscula, una letra minúscula y 1 número. Puede contener caracteres especiales.)" });
      return;
    } else {
      this.setState({ passwordError: false, passwordErrorMessage: "" });
    }
  }

  updateUser() {
    const { user, nom, password, avatar } = this.state;
    var id = user.idUsuari;

    if (!nom) {
      this.setState({ nomError: true, nomErrorMessage: "Introduce un nombre de usuario." });
      return;
    } else if (nom.length < 1 || nom.length > 50) {
      this.setState({ nomError: true, nomErrorMessage: "El formato del nombre de usuario és incorrecto. ( min. 1 caracteres, max. 50 caracteres )" });
      return;
    } else {
      this.setState({ nomError: false, nomErrorMessage: "" });
    }

    if (!password) {
      this.setState({ passwordError: true, passwordErrorMessage: "Introduce una contraseña." });
      return;
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      this.setState({ passwordError: true, passwordErrorMessage: "El formato de la contraseña és incorrecto. (min. 8 caracteres, debe contener al menos una letra mayúscula, una letra minúscula y 1 número. Puede contener caracteres especiales.)" });
      return;
    } else {
      this.setState({ passwordError: false, passwordErrorMessage: "" });
    }

    var formdata = new FormData();
    formdata.append("nom", nom);
    formdata.append("password", password);
    formdata.append("avatar", avatar);

    var url = defaultUrl + "usuari/update/" + id;
    var dades = new XMLHttpRequest();
    dades.onreadystatechange = () => {
      if (dades.readyState === 4 && dades.status === 200) {
        let resposta = JSON.parse(dades.responseText);
        console.log("Resposta d'editar usuari: ", resposta);
        if (resposta.correcta) {
          this.chargeProfleInfo();
          this.handleCloseModal();
        } else {
          switch (resposta.missatge) {
            case "NomDuplicat":
              this.setState({ nomError: true, nomErrorMessage: "Ese nombre de usuario ya está en uso. Prueba con otro." });
              break;
            case "BadNomFormat":
              this.setState({ nomError: true, nomErrorMessage: "El formato del nombre de usuario és incorrecto. ( min. 1 caracteres, max. 50 caracteres )" });
              break;
            case "BadPassword":
              this.setState({ passwordError: true, passwordErrorMessage: "El formato de la contraseña és incorrecto. (min. 8 caracteres, debe contener al menos una letra mayúscula, una letra minúscula y 1 número. Puede contener caracteres especiales.)" });
              break;
            default:
              this.props.handleSnackbar(resposta.missatge, "error");
              break;
          }
        }
      }
    };
    dades.open("POST", url, true);
    dades.send(formdata);
  }

  render() {
    const { classes } = this.props;
    const { redirect, openModal, user, nom, nomError, nomErrorMessage, showPassword, password, passwordError, passwordErrorMessage } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    const avatar = user.avatar ? (user.avatar === "noAvatar.jpg" ? "" : defaultUrl + "/upload/images/avatar/" + user.avatar) : "";
    const newAvatar = this.state.avatar ? window.URL.createObjectURL(this.state.avatar) : avatar;
    const joined = user.createdAt ? user.createdAt.split(" ")[0] : "";

    return (
      <div className={classes.root}>
        {/* Modal */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={this.handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <div className={classes.paperModal}>
              {/* Modal Header */}

              <Grid container direction="row" justify="space-between" alignItems="center">
                <IconButton aria-label="Close" onClick={this.handleCloseModal}>
                  <CloseIcon />
                </IconButton>
                <h2>Editar perfil</h2>
                <Button variant="contained" color="primary" onClick={this.updateUser}>
                  Guardar
                </Button>
              </Grid>

              {/* End Modal Header */}

              <div className={classes.avatarContainer}>
                <CardActionArea component="label" className={classes.cardActionAvatar}>
                  <Badge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={<AddAPhoto color="primary" />}
                  >
                    <Avatar alt={user.nom} src={newAvatar} className={classes.smallAvatar} />
                  </Badge>
                  <input type="file" accept="image/x-png,image/gif,image/jpeg" name="avatar" onChange={this.handleAvatarChange} hidden />
                </CardActionArea>
              </div>
              <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    name="nom"
                    label="Nom"
                    value={nom}
                    onChange={this.handleChange}
                    onBlur={this.handleValidarNom}
                    error={nomError}
                    helperText={
                      nomError ? (
                        <Typography component={"span"} className={classes.inputError}>
                          <ErrorIcon className={classes.errorIcon} />
                          {nomErrorMessage}
                        </Typography>
                      ) : (
                        ""
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    label="Contraseña"
                    onChange={this.handleChange}
                    onBlur={this.handleValidarPassword}
                    value={password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={this.handleClickShowPassword} onMouseDown={this.handleMouseDownPassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={passwordError}
                    helperText={
                      passwordError ? (
                        <Typography component={"span"} style={{ fontSize: 12, display: "flex", alignItems: "center" }}>
                          <ErrorIcon style={{ fontSize: 15, marginRight: "0.75rem" }} />
                          {passwordErrorMessage}
                        </Typography>
                      ) : (
                        ""
                      )
                    }
                  />
                </Grid>
              </Grid>
            </div>
          </Fade>
        </Modal>

        {/* End Modal */}

        <Card>
          <div className={classes.largeBanner}></div>
          <CardContent>
            <Avatar alt={user.nom} src={avatar} className={classes.largeAvatar} />
            <Grid container direction="row" justify="flex-end" alignItems="center">
              {user.token === this.props.usuari.token ? (
                <IconButton aria-label="User settings" onClick={this.handleOpenModal}>
                  <SettingsIcon fontSize="default" />
                </IconButton>
              ) : (
                <IconButton disabled aria-label="Add friend">
                  <PersonAddIcon fontSize="default" />
                </IconButton>
              )}
            </Grid>
            <Typography gutterBottom variant="h5" component="h2">
              {user.nom}
            </Typography>
            <Chip icon={<CalendarToday fontSize="small" />} label={joined} className={classes.chip} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Profile);
