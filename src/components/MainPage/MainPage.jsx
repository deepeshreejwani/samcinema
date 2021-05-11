import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
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
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: "Movie 1",
    price: "50",
    description: ["9.5 IMDb", "Actor Name", "Actress Name", "Director Name"],
    buttonText: "Book Your Tickets",
    buttonVariant: "contained",
  },
  {
    title: "Movie 2",
    price: "100",
    description: ["9.0 IMDb", "Actor Name", "Actress Name", "Director Name"],
    buttonText: "Book Your Tickets",
    buttonVariant: "contained",
  },
  {
    title: "Movie 3",
    price: "150",
    description: ["8.5 IMDb", "Actor Name", "Actress Name", "Director Name"],
    buttonText: "Book Your Tickets",
    buttonVariant: "contained",
  },
];

export default function MainPage() {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      console.log(JSON.parse(loggedInUser));
      history.push("/signin");
    }
  }, []);
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
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Available Movies In Your City
        </Typography>
        <Typography
          variant="h5"
          lg={12}
          xl={12}
          sm={12}
          xs={12}
          align="center"
          color="textSecondary"
          component="p"
        >
          Book A Ticket And Win a Lucky Jackpot!!!
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={12} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      &#8377;{tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /person
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    color="primary"
                    href="/seat"
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
