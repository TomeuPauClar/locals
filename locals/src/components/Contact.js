// React import
import React, { Component } from "react";

// Material UI imports
import { Button, Container, Grid, TextField, Typography, withStyles } from "@material-ui/core";

const styles = (theme) => ({
  container: {
    margin: "1.75rem auto",
    padding: 15,
  },
  containerWidth: {
    width: '100%',
  },
});

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correu:"",
      nom:"",
      missatge:"",
      asumpte:"",
      errorAsumpte:false,
      errorCorreu:false,
      errorNom:false,
      errorMissatge:false
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Contacte - Locals";
    const {usuari}=this.props;
    if(usuari) {
      this.setState({nom:usuari.nom,correu:usuari.email});
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]:event.target.value});
  }

  handleSubmit(event) {
    this.setState({errorNom:false});
    this.setState({errorCorreu:false});
    this.setState({errorMissatge:false});
    event.preventDefault();
    let nom = this.state.nom;
    let missatge = this.state.missatge;
    let asumpte =this.state.asumpte;
    const regex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let correu = this.state.correu;

    if(!nom.length>0) {
      this.setState({errorNom:true});
      return;
    }

    if(!missatge.length>0) {
      this.setState({errorMissatge:true});
      return;
    }

    if(!regex.test(correu)) {
      this.setState({errorCorreu:true});
      return;
    }

    if(!asumpte.length>0) {
      this.setState({errorAsumpte:true});
      return;
    }

    window.open("mailto:alcateams2w@gmail.com?subject="+encodeURIComponent(asumpte)+"&body=De: "+nom+"%0D%0A"+missatge);

  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Container className={classes.container}>
              <Typography variant="h1">Contacte</Typography>
              <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <Grid container className={classes.containerWidth} justify="center" alignItems="center" spacing={2}>
                  <Grid item xs={12}>
                      <TextField error={this.state.errorCorreu} variant="outlined" name="correu" onChange={this.handleChange} fullWidth id="dense" color="secondary" label="Correu electrònic" value={this.state.correu} />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField variant="outlined" error={this.state.errorNom} name="nom" onChange={this.handleChange} fullWidth color="secondary" label="Nom" value={this.state.nom} />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField variant="outlined" error={this.state.errorAsumpte} name="asumpte" onChange={this.handleChange} fullWidth color="secondary" label="Asumpte" value={this.state.asumpte} />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField variant="outlined" name="missatge" error={this.state.errorMissatge} onChange={this.handleChange} fullWidth color="secondary" label="Missatge" multiline value={this.state.missatge} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" >Enviar</Button>
                  </Grid>
                </Grid>
              </form>
          </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Contact);
