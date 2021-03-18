import React, { Component } from "react";
import { Button, TextField, Container, Grid, Link, Typography, Avatar, InputAdornment, IconButton } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link as RouterLink, Redirect } from "react-router-dom";
import axios from "axios";
const defaultUrl = process.env["REACT_APP_URL"];

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorTexte: {
    fontSize: 12, 
    display: "flex", 
    alignItems: "center"
  },
  errorIcon: {
    fontSize: 15, 
    marginRight: "0.75rem",
  },

});

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nom: "",
      nomError: false,
      nomErrorMessage: "",
      email: "",
      emailError: false,
      emailErrorMessage: "",
      password: "",
      passwordError: false,
      passwordErrorMessage: "",
      passwordConfirmation: "",
      passwordConfirmationError: false,
      passwordConfirmationErrorMessage: "",
      showPassword: false,
      redirect: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidarEmail = this.handleValidarEmail.bind(this);
    this.handleValidarNom = this.handleValidarNom.bind(this);
    this.handleValidarPassword = this.handleValidarPassword.bind(this);
    this.handleValidarPasswordConfirmation = this.handleValidarPasswordConfirmation.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
  }

  componentDidMount() {
    const { logguedIn } = this.props;
    if (logguedIn) this.setState({ redirect: "/" });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleValidarEmail() {
    const { email } = this.state;
    if (!email) {
      this.setState({ emailError: true, emailErrorMessage: "Introdueix una adreça de correu electrònic." });
      return;
    } else if (email.length < 8 || email.length > 100) {
      this.setState({ emailError: true, emailErrorMessage: "El format del correu electrònic és incorrecte. ( min. 8 caràcters, màx. 100 caràcters )" });
      return;
    } else {
      this.setState({ emailError: false, emailErrorMessage: "" });
    }
  }

  handleValidarNom() {
    const { nom } = this.state;
    if (!nom) {
      this.setState({ nomError: true, nomErrorMessage: "Introdueix un nom." });
      return;
    } else if (nom.length < 1 || nom.length > 50) {
      this.setState({ nomError: true, nomErrorMessage: "El format del nom és incorrecte. ( min. 1 caràcters, màx. 50 caràcters )" });
      return;
    } else {
      this.setState({ nomError: false, nomErrorMessage: "" });
    }
  }

  handleValidarPassword() {
    const { password } = this.state;
    if (!password) {
      this.setState({ passwordError: true, passwordErrorMessage: "Introdueix una contrasenya." });
      return;
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      this.setState({ passwordError: true, passwordErrorMessage: "El format de la contrasenya és incorrecte. (min. 8 caràcters, ha de contenir almenys una lletra majúscula, una lletra minúscula i 1 número. Pot contenir caràcters especials.)" });
      return;
    } else {
      this.setState({ passwordError: false, passwordErrorMessage: "" });
    }
  }

  handleValidarPasswordConfirmation() {
    const { password, passwordConfirmation } = this.state;
    if (!passwordConfirmation) {
      this.setState({ passwordConfirmationError: true, passwordConfirmationErrorMessage: "Introdueix la confirmació." });
      return;
    } else {
      if (passwordConfirmation !== password) {
        this.setState({ passwordConfirmationError: true, passwordConfirmationErrorMessage: "Les contrasenyes no coincideixen." });
        return;
      } else {
        this.setState({ passwordConfirmationError: false, passwordConfirmationErrorMessage: "" });
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, nom, password, passwordConfirmation } = this.state;

    if (!email) {
      this.setState({ emailError: true, emailErrorMessage: "Introdueix una adreça de correu electrònic." });
      return;
    } else if (email.length < 8 || email.length > 100) {
      this.setState({ emailError: true, emailErrorMessage: "El format del correu electrònic és incorrecte. ( min. 8 caràcters, màx. 100 caràcters )" });
      return;
    } else {
      this.setState({ emailError: false, emailErrorMessage: "" });
    }

    if (!nom) {
      this.setState({ nomError: true, nomErrorMessage: "Introdueix un nom." });
      return;
    } else if (nom.length < 1 || nom.length > 50) {
      this.setState({ nomError: true, nomErrorMessage: "El format del nom és incorrecte. ( min. 1 caràcters, màx. 50 caràcters )" });
      return;
    } else {
      this.setState({ nomError: false, nomErrorMessage: "" });
    }

    if (!password) {
      this.setState({ passwordError: true, passwordErrorMessage: "Introdueix una contrasenya." });
      return;
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      this.setState({ passwordError: true, passwordErrorMessage: "El format de la contrasenya és incorrecte. (min. 8 caràcters, ha de contenir almenys una lletra majúscula, una lletra minúscula i 1 número. Pot contenir caràcters especials.)" });
      return;
    } else {
      this.setState({ passwordError: false, passwordErrorMessage: "" });
    }

    if (!passwordConfirmation) {
      this.setState({ passwordConfirmationError: true, passwordConfirmationErrorMessage: "Introdueix la confirmació." });
      return;
    } else {
      if (passwordConfirmation !== password) {
        this.setState({ passwordConfirmationError: true, passwordConfirmationErrorMessage: "Les contrasenyes no coincideixen." });
        return;
      } else {
        this.setState({ passwordConfirmationError: false, passwordConfirmationErrorMessage: "" });
      }
    }

    axios({
      method: "POST",
      url: defaultUrl + "usuari/",
      responseType: "json",
      headers: { "Content-Type": "application/json" },
      data: { nom: nom, email: email, password: password, passwordConfirmation: passwordConfirmation },
    })
      .then((response) => {
        console.log(response);
        if (response.data.correcta) {
          this.props.handleSuccessfulAuth(response.data);
          this.setState({ redirect: "/" });
        } else {
          switch (response.data.missatge) {
            case "BadPasswordConfirmation":
              this.setState({ passwordConfirmationError: true, passwordConfirmationErrorMessage: "Les contrasenyes no coincideixen." });
              break;
            case "EmailDuplicat":
              this.setState({ emailError: true, emailErrorMessage: "Aquest correu electrònic ja està en ús. Prova amb un altre." });
              break;
            case "BadEmailFormat":
              this.setState({ emailError: true, emailErrorMessage: "El format del correu electrònic és incorrecte. ( min. 8 caràcters, màx. 100 caràcters )" });
              break;
            case "NomDuplicat":
              this.setState({ nomError: true, nomErrorMessage: "Aquest nom ja està en ús. Prova amb un altre." });
              break;
            case "BadNomFormat":
              this.setState({ nomError: true, nomErrorMessage: "El format del nom és incorrecte. ( min. 1 caràcters, màx. 50 caràcters )" });
              break;
            case "BadPassword":
              this.setState({ passwordError: true, passwordErrorMessage: "El format de la contrasenya és incorrecte. (min. 8 caràcters, ha de contenir almenys una lletra majúscula, una lletra minúscula i 1 número. Pot contenir caràcters especials.)" });
              break;
            default:
              this.props.handleSnackbar(response.data.missatge, "error");
              break;
          }
        }
      })
      .catch((error) => {
        console.error("Registration Error: ", error);
      });
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;

    const LinkLogin = React.forwardRef((props, ref) => <RouterLink ref={ref} to="/login" {...props} />);

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registra't
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    autoFocus
                    type="email"
                    autoComplete="email"
                    name="email"
                    label="Correu electrònic"
                    value={this.state.email}
                    onChange={this.handleChange}
                    onBlur={this.handleValidarEmail}
                    error={this.state.emailError}
                    helperText={
                      this.state.emailError ? (
                        <Typography component={"span"} className={classes.errorTexte}>
                          <ErrorIcon className={classes.errorIcon} />
                          {this.state.emailErrorMessage}
                        </Typography>
                      ) : (
                        ""
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    name="nom"
                    label="Nom"
                    value={this.state.nom}
                    onChange={this.handleChange}
                    onBlur={this.handleValidarNom}
                    error={this.state.nomError}
                    helperText={
                      this.state.nomError ? (
                        <Typography component={"span"} className={classes.errorTexte}>
                          <ErrorIcon className={classes.errorIcon} />
                          {this.state.nomErrorMessage}
                        </Typography>
                      ) : (
                        ""
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    autoComplete="current-password"
                    type={this.state.showPassword ? "text" : "password"}
                    name="password"
                    label="Contrasenya"
                    onChange={this.handleChange}
                    onBlur={this.handleValidarPassword}
                    value={this.state.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={this.handleClickShowPassword} onMouseDown={this.handleMouseDownPassword}>
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={this.state.passwordError}
                    helperText={
                      this.state.passwordError ? (
                        <Typography component={"span"} className={classes.errorTexte}>
                          <ErrorIcon className={classes.errorIcon} />
                          {this.state.passwordErrorMessage}
                        </Typography>
                      ) : (
                        ""
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type={this.state.showPassword ? "text" : "password"}
                    name="passwordConfirmation"
                    label="Confirmar Contrasenya"
                    onChange={this.handleChange}
                    onBlur={this.handleValidarPasswordConfirmation}
                    value={this.state.passwordConfirmation}
                    error={this.state.passwordConfirmationError}
                    helperText={
                      this.state.passwordConfirmationError ? (
                        <Typography component={"span"} className={classes.errorTexte}>
                          <ErrorIcon className={classes.errorIcon} />
                          {this.state.passwordConfirmationErrorMessage}
                        </Typography>
                      ) : (
                        ""
                      )
                    }
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Registrar-se
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link component={LinkLogin} variant="body2">
                    Ja tens un compte? Inicia sessió
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Register);
