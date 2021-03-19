// React import
import React, { Component } from "react";

// Material UI imports
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, withStyles } from "@material-ui/core";
import { Save } from "@material-ui/icons";

// Axios Import
import axios from "axios";

const defaultUrl = process.env["REACT_APP_URL"];

const styles = (theme) => ({
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
});

class ModalGestio extends Component {
  constructor(props) {
    super(props);
    this.state = { camps: [] };
    this.getCampsEditables = this.getCampsEditables.bind(this);
  }

  componentDidMount() {
    const { taula } = this.props;
    // console.log("Taula:", taula);
    if (taula) {
      this.getCampsEditables();
    }
  }

  componentDidUpdate(prevProps) {
    const { taula } = this.props;
    if (taula !== prevProps.taula) {
      if (taula) {
        this.getCampsEditables();
      }
    }
  }

  getCampsEditables() {
    const { taula } = this.props;
    axios({
      method: "get",
      url: defaultUrl + taula + "/camps-editables/",
      responseType: "json",
    })
      .then((response) => {
        // console.log("Resposta camps editables", response);
        if (response.data.correcta) {
          this.setState({
            camps: response.data.dades,
          });
        }
      })
      .catch((error) => {
        console.error("Error al obtenir els camps editables de la taula: " + taula, error);
      });
  }

  render() {
    const { open, handleClose, funcio, onChange, campsEditats } = this.props;
    const { camps } = this.state;
    return (
      <>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edita</DialogTitle>
          <DialogContent>
            <DialogContentText component="div">
              <Grid container spacing={2}>
                {camps &&
                  camps.map((input) => (
                    <Grid item xs={12} key={input}>
                      <TextField variant="outlined" fullWidth label={input} name={input} onChange={onChange} value={campsEditats[input] && campsEditats[input]} />
                    </Grid>
                  ))}
              </Grid>
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="secondary">
                Cancel·la
              </Button>
              <Button onClick={typeof funcio === "function" && funcio} variant="contained" color="primary" startIcon={<Save />}>
                Guarda
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ModalGestio);
