import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Form(props) {
  const classes = useStyles();
  const movies = [
    {
      value: "Movie 1",
      label: "Movie 1",
    },
    {
      value: "Movie 2",
      label: "Movie 2",
    },
    {
      value: "Movie 3",
      label: "Movie 3",
    },
  ];
  const theatres = [
    {
      value: "1",
      label: "Theatre 1",
    },
    {
      value: "2",
      label: "Theatre 2",
    },
    {
      value: "3",
      label: "Theatre 3",
    },
  ];
  const slots = [
    {
      value: "1",
      label: "10AM - 12 PM",
    },
    {
      value: "2",
      label: "2 PM - 4 PM",
    },
    {
      value: "3",
      label: "4 PM - 6 PM",
    },
  ];

  const getHall = (event) => {
    event.preventDefault();
    console.log(props.movie);
    console.log(props.theatre);
    console.log(props.slot);
    Axios.post("http://localhost:3001/gethall", {
      movie: props.movie,
      theatre: props.theatre,
      slot: props.slot,
    }).then((res) => {
      const arr = res.data;
      console.log(arr);
      props.setBookedSeat([]);
      arr.map((item) =>
        props.setBookedSeat((preValue) => {
          return preValue.concat(item.seatNo.split(","));
        })
      );
      props.setAsked(true);
      console.log(props.bookedSeat);
    });
  };
  return (
    <>
      <form className={classes.root} autoComplete="off" onSubmit={getHall}>
        <div className="row">
          <div className="col-xl-4 col-sm-12 col-lg-4 col-md-12 pl-4 pr-4 pt-4 pb-4 text-center">
            <TextField
              id="movieId"
              select
              label="Select"
              value={props.movie}
              onChange={(event) => {
                props.setMovie(event.target.value);
              }}
              helperText="Please Select Your Movie"
              variant="outlined"
              name="movieName"
            >
              {movies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="col-xl-4 col-sm-12 col-lg-4 col-md-12 pl-4 pr-4 pt-4 pb-4 text-center">
            <TextField
              id="theatreId"
              select
              label="Select"
              value={props.theatre}
              onChange={(event) => {
                props.setTheatre(event.target.value);
              }}
              helperText="Please Select Your Theatre"
              variant="outlined"
              name="theatreId"
            >
              {theatres.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="col-xl-4 col-sm-12 col-lg-4 col-md-12 pl-4 pr-4 pt-4 pb-4 text-center">
            <TextField
              id="slotId"
              select
              label="Select"
              value={props.slot}
              onChange={(event) => {
                props.setSlot(event.target.value);
              }}
              helperText="Please Select Your Slot"
              variant="outlined"
              name="slotId"
            >
              {slots.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <div className="col-12 text-center">
          <Button
            type="submit"
            className="col-xl-3 col-sm-12 col-lg-3 col-md-6"
            variant="contained"
            color="primary"
          >
            Show Movie Hall
          </Button>
        </div>
      </form>
    </>
  );
}
