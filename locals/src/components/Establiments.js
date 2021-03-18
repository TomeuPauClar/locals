// React import
import React, { Component } from "react";

// Material UI imports
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Grid, IconButton, InputAdornment, Menu, MenuItem, Paper, TextField, Typography, withStyles } from "@material-ui/core";
import { ArrowDropDown, Book, Phone, Search, SortByAlpha, Star } from "@material-ui/icons";

import axios from "axios";
import { Pagination, Rating } from "@material-ui/lab";

// React Router Dom
import { Link as RouterLink } from "react-router-dom";

const defaultUrl = process.env["REACT_APP_URL"];

const styles = (theme) => ({
  padding: {
    padding: 20,
  },
  title: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  card: {
    maxWidth: 345,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
  },
  star: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  media: {
    height: 200,
  },
  contenidorEstabliments: {
    gap: 15,
  },
});

class Establiments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      establiments: [],
      establimentsFiltrats: [],
      establimentsMostrats: [],
      searchValue: "",
      nota: [1, 10],
      orderAnchorEl: null,
      pagina: 1,
      numPagines: 0,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleOrderMenuOpen = this.handleOrderMenuOpen.bind(this);
    this.handleOrderClose = this.handleOrderClose.bind(this);
    this.ordre = this.ordre.bind(this);
    this.senseOrdenar = this.senseOrdenar.bind(this);
    this.ordenarPerNota = this.ordenarPerNota.bind(this);
    this.ordenarPerNom = this.ordenarPerNom.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    document.title = "Establiments - Locals";
    this.getEstabliments();
  }

  getEstabliments() {
    axios({
      method: "GET",
      url: defaultUrl + "establiment/filtrar/",
      responseType: "json",
    })
      .then((response) => {
        console.log("Resposta al obtenir establiments: ", response);
        var numPagines = Math.ceil(response.data.dades.length / 6) < 2 ? null : Math.ceil(response.data.dades.length / 6);
        this.setState(
          {
            establiments: response.data.dades,
            numPagines,
          },
          this.filtrar
        );
      })
      .catch((error) => {
        console.error("Error al obtenir els establiments: ", error);
      });
  }

  handlePageChange(e, pagina) {
    this.setState(
      {
        pagina,
      },
      this.canviarPagina
    );
  }

  canviarPagina() {
    const { establimentsFiltrats, pagina } = this.state;
    let numPagina = pagina === 1 ? 0 : pagina * 6;
    var llistaPaginada = establimentsFiltrats.slice(numPagina, numPagina + 6);
    var numPagines = Math.ceil(establimentsFiltrats.length / 6) < 2 ? null : Math.ceil(establimentsFiltrats.length / 6);
    this.setState({
      establimentsMostrats: llistaPaginada,
      numPagines,
    });
  }

  handleSearch(e) {
    var searchValue = e.target.value;
    this.setState(
      {
        searchValue: searchValue,
      },
      this.filtrar
    );
  }

  senseOrdenar() {
    var llistaOrdenada = this.state.establimentsFiltrats;
    llistaOrdenada.sort((x, y) => {
      return x.idEstabliment - y.idEstabliment;
    });
    this.setState(
      {
        establimentsFiltrats: llistaOrdenada,
      },
      this.canviarPagina
    );
    this.handleOrderClose();
  }

  ordenarPerNom() {
    var llistaOrdenada = this.state.establimentsFiltrats;
    llistaOrdenada.sort((x, y) => {
      if (x.nom > y.nom) {
        return 1;
      }
      if (x.nom < y.nom) {
        return -1;
      }
      return 0;
    });
    this.setState(
      {
        establimentsFiltrats: llistaOrdenada,
      },
      this.canviarPagina
    );
    this.handleOrderClose();
  }

  ordenarPerNota() {
    var llistaOrdenada = this.state.establimentsFiltrats;
    llistaOrdenada.sort((x, y) => {
      return x.nota - y.nota;
    });
    this.setState(
      {
        establimentsFiltrats: llistaOrdenada,
      },
      this.canviarPagina
    );
    this.handleOrderClose();
  }

  ordre() {
    var llistaOrdenada = this.state.establimentsFiltrats;
    llistaOrdenada.reverse();
    this.setState(
      {
        establimentsFiltrats: llistaOrdenada,
      },
      this.canviarPagina
    );
  }

  handleOrderMenuOpen(event) {
    this.setState({
      orderAnchorEl: event.currentTarget,
    });
  }

  handleOrderClose() {
    this.setState({
      orderAnchorEl: null,
    });
  }

  filtrar() {
    const { searchValue, establiments } = this.state;
    console.log("Filtrar", searchValue);
    var establimentsFiltrats = [];
    establimentsFiltrats = establiments.filter((e) => elNomCoincideix(e));

    function elNomCoincideix(establiment) {
      var valorACercar = searchValue.toLowerCase();
      valorACercar = valorACercar.trim();
      var nomEstabliment = establiment.nom.toLowerCase();
      nomEstabliment = nomEstabliment.trim();
      return nomEstabliment.indexOf(valorACercar) > -1;
    }
    this.setState(
      {
        establimentsFiltrats: establimentsFiltrats,
        pagina: 1,
      },
      this.canviarPagina
    );
  }

  render() {
    const { classes } = this.props;
    const { searchValue, orderAnchorEl, establimentsMostrats, pagina, numPagines } = this.state;

    return (
      <Box m={4}>
        <div className={classes.title}>
          <Book fontSize="large" />
          <Typography variant="h4">Establiments</Typography>
        </div>
        <Grid container direction="row" justify="space-between" alignItems="flex-end" style={{ paddingBottom: 15 }}>
          <div>
            <Button variant="contained" color="primary" aria-controls="order-menu" aria-haspopup="true" onClick={this.handleOrderMenuOpen} size="large" endIcon={<ArrowDropDown />}>
              Ordenar per
            </Button>
            <Menu
              id="order-menu"
              anchorEl={orderAnchorEl}
              keepMounted
              open={Boolean(orderAnchorEl)}
              onClose={this.handleOrderClose}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={this.senseOrdenar}>Sense ordenar</MenuItem>
              <MenuItem onClick={this.ordenarPerNom}>Nom</MenuItem>
              <MenuItem onClick={this.ordenarPerNota}>Nota</MenuItem>
            </Menu>
            <IconButton color="primary" onClick={this.ordre}>
              <SortByAlpha />
            </IconButton>
          </div>
          <TextField
            variant="filled"
            style={{ width: 600 }}
            placeholder="Cercar Establiment"
            type="search"
            value={searchValue}
            onChange={this.handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="large" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid container direction="row" spacing={2}>
          <Grid item md={3} style={{ width: "100%" }}>
            <Paper style={{ padding: 10 }}>
              <Typography variant="h5">Filtres</Typography>
              {/* <Autocomplete
                multiple
                style={{ paddingTop: 15 }}
                fullWidth
                options={estados}
                disableCloseOnSelect
                getOptionLabel={(estado) => estado}
                renderOption={(estado, { selected }) => (
                  <>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                    {estado}
                  </>
                )}
                renderInput={(params) => <TextField {...params} variant="outlined" label="Estado" />}
                onChange={(event, value) => this.handleEstado(event, value)}
              /> */}
              {/* <Typography id="nota-slider" gutterBottom style={{ paddingTop: 15 }}>
                Nota ({nota[0] + "-" + nota[1]})
              </Typography> */}
              {/* <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Slider value={nota} min={1} max={10} onChange={this.handleNota} valueLabelDisplay="auto" aria-labelledby="nota-slider" style={{ width: "90%" }} />
              </div> */}
            </Paper>
          </Grid>
          <Grid item md={9}>
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" className={classes.contenidorEstabliments}>
              {establimentsMostrats.map((establiment) => {
                let image = establiment.foto ? defaultUrl + "/upload/images/establiment/" + establiment.foto : defaultUrl + "/upload/images/no-image.png";
                return (
                  <Card key={establiment.idEstabliment} className={classes.card}>
                    {establiment.destacat === "1" && <Star className={classes.star} color="primary" />}
                    <CardActionArea component={getLink(establiment.idEstabliment)}>
                      <CardMedia className={classes.media} image={image} title={"Fotografia Preferida de l'establiment " + establiment.nom} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {establiment.nom}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {establiment.descripcio}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions style={{ display: "felx", alignItems: "center", justifyContent: "space-between" }}>
                      <Chip icon={<Phone />} label={establiment.telefon} />
                      <Rating value={parseFloat(establiment.nota)} precision={0.5} size="small" readOnly />
                    </CardActions>
                  </Card>
                );
              })}
            </Box>
            <Typography>Page: {pagina}</Typography>
            {numPagines && <Pagination count={numPagines} page={pagina} onChange={this.handlePageChange} />}
          </Grid>
        </Grid>
      </Box>
    );
  }
}

function getLink(idEstabliment) {
  return React.forwardRef((props, ref) => <RouterLink ref={ref} {...props} to={"/establiment/" + idEstabliment} />);
}

export default withStyles(styles, { withTheme: true })(Establiments);
