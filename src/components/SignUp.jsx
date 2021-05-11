import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const history = useHistory();
  const register = (event) => {
    event.preventDefault();
    setSubmit(true);
    Axios.post("http://localhost:3001/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        if (res.data.status === 200) {
          history.push("/");
        } else if (res.data.status === 202) {
          history.push("/signin");
        } else {
          history.push("/error");
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/error");
      });
  };
  const classes = useStyles();
  const [firstName, setRegFirstName] = useState("");
  const [lastName, setRegLastName] = useState("");
  const [email, setRegEmail] = useState("");
  const [password, setRegPassword] = useState("");
  const [isSubmit, setSubmit] = useState(false);
  const updateForm = (event) => {
    let name = event.target.name;
    if (name === "firstName") setRegFirstName(event.target.value);
    if (name === "lastName") setRegLastName(event.target.value);
    if (name === "email") setRegEmail(event.target.value);
    if (name === "password") setRegPassword(event.target.value);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={register}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={updateForm}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                placeholder="Enter Your First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={updateForm}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                placeholder="Enter Your Last Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={updateForm}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                placeholder="Enter Your Email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={updateForm}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                placeholder="Enter Your Password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
