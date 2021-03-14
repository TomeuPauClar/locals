import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { ContactMail } from "@material-ui/icons";

// React Router Dom
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: 0,
    height: "64px",
    width: "100%",
  },
  flex: {
    flexGrow: 1,
  },
}));

export default function Footer() {
  const classes = useStyles();
  const LinkContacte = React.forwardRef((props, ref) => <RouterLink ref={ref} {...props} to="/contacte" />);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.flex}></div>
          <Typography variant="body2" className={classes.flex}>
            ©2021 Locals
          </Typography>
          <Button variant="text" startIcon={<ContactMail />} component={LinkContacte}>
            Contacte
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
