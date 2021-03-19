// React import
import React, { Component } from "react";

// Material UI imports
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { BottomNavigation, BottomNavigationAction, Button, Container, IconButton, withStyles } from "@material-ui/core";

// Axios Import
import axios from "axios";

// React Router Dom
//import { Link as RouterLink } from "react-router-dom";
import { Redirect } from "react-router";
import { Add, Delete, Edit, TableChart } from "@material-ui/icons";
import ModalGestio from "./ModalGestio";

// React Router Dom
import { Link as RouterLink } from "react-router-dom";

const defaultUrl = process.env["REACT_APP_URL"];

const styles = (theme) => ({
  dataGrid: { height: 670, width: "100%", margin: "1.75rem 0" },
});

class Gestio extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null, taula: [], columnes: [], dadesCarregades: false, openModal: false, funcio: null, campsEditats: {}, navegacio: 0, taules: [] };
    this.createColumns = this.createColumns.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.CustomToolbar = this.CustomToolbar.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.canviaNavegacio = this.canviaNavegacio.bind(this);
    this.getTaules = this.getTaules.bind(this);
  }

  componentDidMount() {
    this.start();
    this.getTaules();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.taula !== prevProps.match.params.taula) {
      this.start();
      this.getTaules();
    }
  }

  start() {
    const taula = this.props.match.params.taula;
    const { loggedIn, usuari } = this.props;
    document.title = "Gestió - Locals";
    if (loggedIn && usuari && usuari.isAdmin !== "0") {
      if (taula) {
        axios({
          method: "get",
          url: defaultUrl + taula + "/",
          responseType: "json",
        })
          .then((response) => {
            // console.log("Resposta gestió taula", response);
            if (response.data.correcta) {
              this.setState(
                {
                  taula: response.data.dades,
                  dadesCarregades: true,
                },
                this.createColumns
              );
              document.title = taula + " - Gestió - Locals";
            } else {
              this.setState({
                redirect: "/NotFound",
                dadesCarregades: true,
              });
            }
          })
          .catch((error) => {
            console.error("Error al obtenir la informacón de la taula: " + taula, error);
          });
      } else {
        this.setState({
          redirect: "/NotFound",
        });
      }
    } else {
      this.setState({
        redirect: "/",
      });
    }
  }

  getTaules() {
    axios({
      method: "get",
      url: defaultUrl + "taules/",
      responseType: "json",
    })
      .then((response) => {
        this.setState({
          taules: response.data,
        });
      })
      .catch((error) => {
        console.error("Error al obtenir les taules: ", error);
      });
  }

  CustomToolbar() {
    const onClickInserta = () => {
      this.setState(
        {
          funcio: this.handleInsert,
        },
        this.handleOpenModal
      );
    };

    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 5 }}>
        <GridToolbar />
        <Button size="small" color="primary" variant="text" startIcon={<Add />} onClick={onClickInserta}>
          Inserta
        </Button>
      </div>
    );
  }

  createColumns() {
    const { taula } = this.state;
    var columnes = [];
    var keys = Object.keys(taula[0]);
    for (const columna of keys) {
      if (columna === "id") {
        columnes.push({ field: columna, headerName: camelToWord(columna), hide: true });
      } else {
        columnes.push({ field: columna, headerName: camelToWord(columna), flex: 1 });
      }
    }
    columnes.push({
      field: "",
      flex: 1,
      headerName: "Accións",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClickEdita = () => {
          const api = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== "__check__" && !!c);
          const thisRow = {};

          fields.forEach((f) => {
            thisRow[f] = params.getValue(f);
          });

          this.setState(
            {
              funcio: this.handleUpdate,
              campsEditats: thisRow,
            },
            this.handleOpenModal
          );
        };
        const onClickDelete = () => {
          this.handleDelete(params.getValue("id"));
        };

        return (
          <>
            <IconButton color="primary" onClick={onClickEdita}>
              <Edit />
            </IconButton>
            <IconButton color="primary" onClick={onClickDelete}>
              <Delete />
            </IconButton>
          </>
        );
      },
    });
    this.setState({
      columnes,
    });
  }

  onChange(e) {
    this.setState({
      campsEditats: { ...this.state.campsEditats, [e.target.name]: e.target.value },
    });
  }

  handleUpdate() {
    const taula = this.props.match.params.taula;
    const { campsEditats } = this.state;
    var id = campsEditats.id;
    delete campsEditats.id;
    axios({
      method: "PUT",
      url: defaultUrl + taula + "/" + id,
      responseType: "json",
      headers: { "Content-Type": "application/json" },
      data: campsEditats,
    })
      .then((response) => {
        // console.log("Resposta update taula " + taula + ": ", response);
        if (response.data.correcta) {
          this.handleCloseModal();
          this.start();
        }
      })
      .catch((error) => {
        console.error("Error al updatear a la taula " + taula + ": ", error);
      });
  }

  handleInsert() {
    const taula = this.props.match.params.taula;
    const { campsEditats } = this.state;
    axios({
      method: "POST",
      url: defaultUrl + taula + "/",
      responseType: "json",
      headers: { "Content-Type": "application/json" },
      data: campsEditats,
    })
      .then((response) => {
        // console.log("Resposta insert taula " + taula + ": ", response);
        if (response.data.correcta) {
          this.handleCloseModal();
          this.start();
        }
      })
      .catch((error) => {
        console.error("Error al insertar a la taula " + taula + ": ", error);
      });
  }

  handleDelete(id) {
    const taula = this.props.match.params.taula;
    axios({
      method: "DELETE",
      url: defaultUrl + taula + "/" + id,
      responseType: "json",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // console.log("Resposta delete taula " + taula + ": ", response);
        if (response.data.correcta) {
          this.handleCloseModal();
          this.start();
        }
      })
      .catch((error) => {
        console.error("Error al deletear a la taula " + taula + ": ", error);
      });
  }

  handleOpenModal() {
    this.setState({
      openModal: true,
    });
  }

  handleCloseModal() {
    this.setState({
      openModal: false,
    });
  }

  canviaNavegacio(e, value) {
    this.setState({
      navegacio: value,
    });
  }

  render() {
    const { classes, match } = this.props;
    const { redirect, taula, dadesCarregades, columnes, openModal, funcio, campsEditats, navegacio, taules } = this.state;
    if (redirect) return <Redirect to={redirect} />;

    return (
      <>
        <Container>
          {dadesCarregades && <ModalGestio open={openModal} handleClose={this.handleCloseModal} taula={match.params.taula} funcio={funcio} onChange={this.onChange} campsEditats={campsEditats} />}
          <div className={classes.dataGrid}>
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  rows={taula}
                  columns={columnes}
                  pageSize={10}
                  rowsPerPageOptions={[5, 10, 25, 50, 100, 250]}
                  loading={!dadesCarregades}
                  components={{
                    Toolbar: this.CustomToolbar,
                  }}
                />
              </div>
            </div>
          </div>
          <BottomNavigation value={navegacio} onChange={this.canviaNavegacio} showLabels>
            {taules && taules.map((taula) => <BottomNavigationAction component={getLink(taula)} label={camelToWord(taula)} icon={<TableChart />} />)}
          </BottomNavigation>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Gestio);

function camelToWord(camel) {
  let result = camel.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function getLink(v) {
  return React.forwardRef((props, ref) => <RouterLink ref={ref} {...props} to={"/gestio/" + v} />);
}
