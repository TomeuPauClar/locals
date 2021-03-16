// React import
import React, { Component } from "react";

// Material UI imports
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";

//Animated slider components
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import { Rating } from "@material-ui/lab";

const styles = (theme) => ({
  root: {
    width: "15%",
    float: "left",
    margin: "5%",
    textAlign: "center",
    fontSize: "1.2rem",
  },
  paper: {
    backgrowndColor: theme.palette.background.paper,
    margin: "1.75rem auto",
    padding: 15,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper2: {
    backgrowndColor: theme.palette.background.light,
    padding: 15,
  },
  info: {
    padding: "5px",
  },
  span: {
    color: "#C00",
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = "Locals";
  }

  render() {
    const { classes } = this.props;

    let obj1 = {
      title: "test",
      description: "descriptionasdasdasdasdasdasd",
      button: "Visitanos",
      image:
        "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2018/08/fondos-pantalla-full-hd-animales_4.jpg",
      rating: 3,
    };

    let obj2 = {
      title: "test2",
      description: "description2asdasdasdasdasdasdasd",
      button: "Visitanos",
      image: "https://wallpaperaccess.com/full/2040740.jpg",
      rating: 2.5,
    };
    let obj3 = {
      title: "test3",
      description: "description3asdasdasdasdasdasdasd",
      button: "Visitanos",
      image:
        "https://i.pinimg.com/originals/fe/38/d0/fe38d0f79e781b796583438021f8e346.jpg",
      rating: 4.5,
    };

    let content = [obj1, obj2, obj3];
    return (
      <>
        <Slider autoplay={2000}>
          {content.map((item, index) => (
            <div
              key={index}
              style={{
                background: `url('${item.image}') no-repeat center center`,
              }}
              className={classes.center}
            >
              <Paper className={classes.paper2}>
                <div className="center">
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <Rating
                    name="half-rating"
                    defaultValue={item.rating}
                    precision={0.5}
                    size="medium"
                    readOnly
                  />
                  <br />
                  <Button color="secondary">{item.button}</Button>
                </div>
              </Paper>
            </div>
          ))}
        </Slider>
        <Container>
          <Typography variant="h1">Quí som?</Typography>
          <div className={classes.info}>
            <Divider width="70%" />
            <Typography variant="h5">
              Som una empresa que promociona establiments, oferint al client la
              oportunitat de valorar i compartir les seves experiencies
            </Typography>
          </div>

          <div>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <span className={classes.span}>5</span> usuarios
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  <span className={classes.span}>300</span> establimentos
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  <span className={classes.span}>3000</span> comentarios
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Container>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Home);
