import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button, SvgIcon } from "@material-ui/core";
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
  display: {
    display: "flex",
    alignItems: "flex-end",
  },
  svg1: {
    fill: "#2d5016",
    stroke: "#000000",
    strokeWidth: 10,
    strokeLinecap: "butt",
    strokeLinejoin: "miter",
    strokeMiterlimit: 4,
    strokeDasharray: "none",
    strokeOpacity: 1,
  },
  svg2: {
    fill: "#447821",
    stroke: "#000000",
    strokeWidth: 10,
    strokeLinecap: "butt",
    strokeLinejoin: "miter",
    strokeMiterlimit: 4,
    strokeDasharray: "none",
    strokeOpacity: 1,
  },
  alca: {
    color: "#447821",
    fontWeight: 900,
  },
}));

export default function Footer() {
  const classes = useStyles();
  const LinkContacte = React.forwardRef((props, ref) => <RouterLink ref={ref} {...props} to="/contacte" />);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={`${classes.flex} ${classes.display}`}>
            <Typography variant="body2">
              <span className={classes.alca}>Alca</span>TEAM
            </Typography>
            <SvgIcon>
              <svg viewBox="0 0 512 512" height="24" width="24">
                <path d="m 322.41973,41.913233 c 20.74182,-9.634544 42.02259,-17.959913 67.13354,-16.981606 15.01998,24.884143 17.46619,46.168501 21.24537,67.834479 l -70.2352,57.713204 z" className={classes.svg1} />
                <path d="M 356.22382,235.51894 331.35904,130.63285 c 28.38775,-16.37464 54.92438,-33.930052 95.09868,-42.78638 15.47286,43.29623 14.48393,85.89607 20.94922,128.81124 z" className={classes.svg2} />
                <path d="M 227.93564,160.19983 330.16627,125.64379 C 329.01703,92.924435 329.85172,61.14651 316.07029,22.433004 271.10851,32.28686 235.46595,55.710622 195.60348,72.989665 Z" className={classes.svg2} />
                <path d="m 405.46734,235.63504 48.98373,-83.31721 c 8.68736,48.75465 17.27585,97.53603 -2.75579,154.05865 l -38.07411,14.45376 z" className={classes.svg2} />
                <path d="M 210.46788,114.23101 255.23234,28.579019 C 209.23405,47.072574 163.26549,65.664044 125.89905,112.5942 l 7.91573,39.9029 z" className={classes.svg2} />
                <path d="m 264.21553,122.21887 c 25.73439,-19.5936 55.71954,-25.64628 86.99581,-27.58616 14.56892,31.48706 24.75734,61.98581 23.71385,89.95041 l -95.58021,39.08264 z" className={classes.svg2} />
                <path d="m 311.58113,337.34727 104.47764,-24.37821 c 2.79377,-39.57109 -4.72742,-87.5126 -27.3946,-129.78247 -34.47139,4.47481 -65.14021,11.55287 -83.88585,26.79359 z" className={classes.svg1} />
                <path d="M 159.32619,249.86878 133.81478,152.4971 c 32.11425,-23.3462 73.18623,-45.42094 121.09107,-48.63877 14.47764,31.56144 24.72899,61.28327 21.72867,85.23687 z" className={classes.svg1} />
                <path d="m 323.1999,329.99351 c 48.28565,-5.53723 99.11137,-24.49115 149.13138,-39.1892 -40.136,89.34909 -124.45288,217.72867 -232.60162,98.1908" className={classes.svg2} />
                <path d="M 168.79699,247.1881 C 147.89706,203.36602 137.04103,150.27963 122.999,100.13194 68.422475,181.49016 4.1340835,320.95278 162.96098,349.14969" className={classes.svg1} />
                <path d="m 105.27991,443.46823 c 19.02206,26.74172 46.395,39.83632 79.5557,43.47252 l 54.89405,-97.94564 -82.13287,-43.79717 z" className={classes.svg2} />
                <path
                  d="m 148.68421,304.73882 c -0.38861,-27.35912 4.70231,-42.85227 21.83963,-61.77761 29.93885,-32.80421 75.85848,-51.65796 128.33949,-56.95966 15.38292,45.75423 35.40106,91.28927 24.15846,138.30253 -5.3177,24.59227 -20.9488,44.20258 -41.95142,55.53673 C 219.162,407.06274 152.05787,363.7683 148.68421,304.73882 Z"
                  className={classes.svg1}
                />
              </svg>
            </SvgIcon>
          </div>
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
