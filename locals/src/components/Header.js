// React import
import React, { Component } from "react";

// Material UI imports
import { Avatar, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Button } from "@material-ui/core";
import { Home, RestaurantMenu, TableChart } from "@material-ui/icons";

// React Router Dom
import { Link as RouterLink } from "react-router-dom";

const defaultUrl = process.env["REACT_APP_URL"];

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleMenu(event) {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null,
    });
  }

  render() {
    const { classes, loggedIn, usuari } = this.props;
    const { anchorEl } = this.state;

    const LinkGestio = React.forwardRef((props, ref) => <RouterLink ref={ref} {...props} to={"/gestio/categoria-foto"} />);
    const LinkHome = React.forwardRef((props, ref) => <RouterLink ref={ref} {...props} to="/" />);
    const LinkEstabliments = React.forwardRef((props, ref) => <RouterLink ref={ref} {...props} to="/establiments" />);
    const LinkLogin = React.forwardRef((props, ref) => <RouterLink ref={ref} {...props} to="/login" />);
    const LinkRegister = React.forwardRef((props, ref) => <RouterLink ref={ref} {...props} to="/register" />);
    const LinkPerfil = React.forwardRef((props, ref) => <RouterLink ref={ref} {...props} to={"/perfil/" + usuari.idUsuari} />);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Locals
            </Typography>
            <div className={classes.flex}>
              <Button variant="text" startIcon={<Home />} component={LinkHome}>
                Home
              </Button>
              <Button variant="text" startIcon={<RestaurantMenu />} component={LinkEstabliments}>
                Establiments
              </Button>
              {loggedIn && usuari && usuari.isAdmin !== "0" && (
                <Button variant="text" startIcon={<TableChart />} component={LinkGestio}>
                  Gestió
                </Button>
              )}
            </div>
            {loggedIn ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography>{usuari.nom}</Typography>
                <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={this.handleMenu} color="inherit">
                  <Avatar alt={usuari.nom} src={usuari.avatar ? (usuari.avatar === "noAvatar.jpg" ? "" : defaultUrl + "/upload/images/avatar/" + usuari.avatar) : ""} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose} component={LinkPerfil}>
                    Perfil
                  </MenuItem>
                  <MenuItem onClick={this.props.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button variant="text" component={LinkLogin}>
                  Incia sessió
                </Button>
                <Button variant="contained" color="secondary" component={LinkRegister}>
                  Registrar-se
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);
