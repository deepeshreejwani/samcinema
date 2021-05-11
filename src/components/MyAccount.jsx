import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
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
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function MyAccount(props) {
  const classes = useStyles();
  const history = useHistory();
  const [myBookings, setMyBookings] = useState([]);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      history.push("/signin");
    }
    const userId = loggedInUser === null ? "" : JSON.parse(loggedInUser).userId;
    Axios.post("http://localhost:3001/mybookings", { userId: userId }).then(
      (res) => {
        setMyBookings(res.data);
      }
    );
  }, []);
  async function cancelTicket(userId, movie, theatre, slot) {
    Axios.post("http://localhost:3001/cancelbooking", {
      userId: userId,
      movie: movie,
      theatre: theatre,
      slot: slot,
    }).then((res) => {
      window.location.reload();
    });
  }
  const logout = () => {
    localStorage.clear();
    history.push("/signin");
  };
  return (
    <React.Fragment>
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
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              My Bookings
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Book More And Get Various CashBacks
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {myBookings.map((ticket, index) => (
              <Grid item key={ticket.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {ticket.moviename}
                    </Typography>
                    <Typography>
                      Theatre No :{" " + ticket.theatreId}
                    </Typography>
                    <Typography>
                      Slot No :
                      {ticket.slotId === 1
                        ? " 10 AM - 12 PM"
                        : ticket.slotId === 2
                        ? " 2 PM - 4 PM"
                        : " 4 PM - 6 PM"}
                    </Typography>
                    <Typography>Seat No :{" " + ticket.seatNo}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() =>
                        cancelTicket(
                          ticket.userId,
                          ticket.moviename,
                          ticket.theatreId,
                          ticket.slotId
                        )
                      }
                    >
                      Cancel
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
