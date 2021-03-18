import React, { Component } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Container, Avatar, Grid, Typography, TextField, FormControlLabel, Checkbox, Button, Box, InputAdornment, IconButton, Link } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ErrorIcon from "@material-ui/icons/Error";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";

// Email
import emailjs from 'emailjs-com';

// Cookies functions
const cookies = require("../../cookies");

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
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      emailError: false,
      emailErrorMessage: "",
      password: "",
      passwordError: false,
      passwordErrorMessage: "",
      showPassword: false,
      remember: false,
      redirect: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.enviarCorreuCanviarContrasenya = this.enviarCorreuCanviarContrasenya.bind(this);
  }

  componentDidMount() {
    const { loggedIn } = this.props;
    if (!loggedIn) {
      var username = cookies.getCookie("username");
      if (username) {
        this.setState({
          email: username,
          remember: true,
        });
      }
    } else {
      this.setState({
        redirect: "/",
      });
    }
  }

  handleChange(event) {
    var target = event.target.name;
    var value = event.target.value;
    if (target === "remember") {
      value = event.target.checked;
    }
    this.setState({
      [target]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;

    if (!email) {
      this.setState({ emailError: true, emailErrorMessage: "Introdueix una adreça de correu electrònic o usuari." });
      return;
    } else {
      this.setState({ emailError: false, emailErrorMessage: "" });
    }

    if (!password) {
      this.setState({ passwordError: true, passwordErrorMessage: "Introdueix una contrasenya." });
      return;
    } else {
      this.setState({ passwordError: false, passwordErrorMessage: "" });
    }

    axios({
      method: "post",
      url: defaultUrl + "usuari/login/",
      responseType: "json",
      headers: { "Content-Type": "application/json" },
      data: { nom: email, password: password },
    })
      .then((response) => {
        if (response.data.correcta) {
          this.props.handleSuccessfulAuth(response.data, this.state.remember);
          this.setState({ redirect: "/" });
        } else {
          if (response.data.missatge === "BadPassword") {
            this.setState({ passwordError: true, passwordErrorMessage: "Contrasenya incorrecta." });
          } else {
            this.setState({ emailError: true, emailErrorMessage: response.data.missatge });
          }
        }
      })
      .catch((error) => {
        console.error("Error en el login: " + error);
      });
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  enviarCorreuCanviarContrasenya() {
    const { email } = this.state;
    if (!email) {
      this.setState({ emailError: true, emailErrorMessage: "Introdueix una adreça de correu electrònic o usuari." });
      return;
    } else {
      this.setState({ emailError: false, emailErrorMessage: "" });
    }
    // Aqui envias el correo

    var result= '';
    var characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789./$%&@';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    let envio={
      email:this.state.email,
      password:result
    }

    axios({
      method: "POST",
      url: defaultUrl + "usuari/restablir-contrasenya/",
      data:envio,
      dataType: "json",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    emailjs.send('service_vwcldja', 'template_91jzf7y', envio, 'user_JBFHmg8PRIQKgXdHEOeWS')
      .then((result) => {
          this.setState({redirect:"/"});
      }, (error) => {
          console.log(error.text);
      });
  }

  render() {
    const { classes } = this.props;

    const LinkRegister = React.forwardRef((props, ref) => <RouterLink ref={ref} to="/register" {...props} />);
    const LinkCanviDeContrasenya = React.forwardRef((props, ref) => <RouterLink ref={ref} to="/canvi-contrasenya" {...props} />);

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar sessió
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Correu electrònic o nom"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChange}
                value={this.state.email}
                error={this.state.emailError}
                helperText={
                  this.state.emailError ? (
                    <Typography component={"span"} style={{ fontSize: 12, display: "flex", alignItems: "center" }}>
                      <ErrorIcon style={{ fontSize: 15, marginRight: "0.75rem" }} />
                      {this.state.emailErrorMessage}
                    </Typography>
                  ) : (
                    ""
                  )
                }
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Contrasenya"
                name="password"
                autoComplete="current-password"
                type={this.state.showPassword ? "text" : "password"}
                onChange={this.handleChange}
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
                    <Typography component={"span"} style={{ fontSize: 12, display: "flex", alignItems: "center" }}>
                      <ErrorIcon style={{ fontSize: 15, marginRight: "0.75rem" }} />
                      {this.state.passwordErrorMessage}
                    </Typography>
                  ) : (
                    ""
                  )
                }
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <FormControlLabel control={<Checkbox name="remember" checked={this.state.remember} onChange={this.handleChange} color="primary" />} label="Recorda'm" />
                <Link onClick={this.enviarCorreuCanviarContrasenya} color="primary">
                  Has oblidat la teva contrasenya?
                </Link>
              </div>
              <Box mt={2} mb={2}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <Button component={LinkRegister} color="primary">
                    Crear Compte
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Iniciar sessió
                  </Button>
                </Grid>
              </Box>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Login);
