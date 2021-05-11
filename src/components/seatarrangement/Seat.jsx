import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Form from "./Form";
import Hall from "./Hall";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  container: {
    display: "none",
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const Seat = () => {
  const classes = useStyles();
  const [bookedSeat, setBookedSeat] = useState([]);
  const [isAsked, setAsked] = useState(false);
  const [movie, setMovie] = useState("Movie 1");
  const [theatre, setTheatre] = useState("1");
  const [slot, setSlot] = useState("1");
  const history = useHistory();
  let USER_ID = "";
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      history.push("/signin");
    } else {
      USER_ID = JSON.parse(loggedInUser).userId;
    }
  }, []);
  const logout = () => {
    localStorage.clear();
    history.push("/signin");
  };
  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            href="/"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Sam Cinema
          </Typography>
          <Button
            href="/"
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            Home
          </Button>
          <Button
            href="/myaccount"
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            My Bookings
          </Button>
          <Button
            color="primary"
            variant="outlined"
            className={classes.link}
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container className="ml-5 mt-5">
        <Grid className="row">
          <Form
            bookedSeat={bookedSeat}
            setBookedSeat={setBookedSeat}
            setAsked={setAsked}
            movie={movie}
            setMovie={setMovie}
            theatre={theatre}
            setTheatre={setTheatre}
            slot={slot}
            setSlot={setSlot}
          />
        </Grid>
      </Container>
      <Hall
        bookedSeat={bookedSeat}
        isAsked={isAsked}
        movie={movie}
        setMovie={setMovie}
        theatre={theatre}
        setTheatre={setTheatre}
        slot={slot}
        setSlot={setSlot}
        userId={USER_ID}
      />
    </>
  );
};
export default Seat;
