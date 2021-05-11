import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./index.css";

const Hall = (props) => {
  const [seats, setSeat] = useState(0);
  const cols = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const rows = ["A", "B", "C", "D", "E", "F"];
  const [isSubmit, setSubmit] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    bookedSeats: seats,
    bookedSeatNos: [],
  });
  const updateSeat = (event) => {
    const value = event.target.id;
    if (event.target.checked) {
      setSeat(seats + 1);
      setBookingInfo((preValue) => {
        return {
          bookedSeats: seats,
          bookedSeatNos: [...preValue.bookedSeatNos, value],
        };
      });
    } else {
      setSeat(seats - 1);
      setBookingInfo((preValue) => {
        return {
          bookedSeats: seats,
          bookedSeatNos: preValue.bookedSeatNos.filter((id) => {
            return id !== value;
          }),
        };
      });
    }
    console.log(bookingInfo);
  };
  const Book = () => {
    setSubmit(true);
    Axios.post("http://localhost:3001/dobookings", {
      userId: props.userId,
      movie: props.movie,
      theatre: props.theatre,
      slot: props.slot,
      seatNo: bookingInfo.bookedSeatNos.join(),
    }).then((res) => {});
  };
  return (
    <>
      <Container
        style={!props.isAsked ? { display: "none" } : { display: "block" }}
      >
        <Grid>
          <div className="plane">
            <div className="cockpit">
              <h1>Select Your Favourites Seats</h1>
              <h3>Screen This Side</h3>
            </div>
            <div className="exit exit--front fuselage"></div>
            <ol className="cabin fuselage">
              {cols.map((value) => (
                <li className={"row row--" + value}>
                  <ol className="seats" type={value}>
                    {rows.map((row) => (
                      <li className="seat">
                        <input
                          type="checkbox"
                          id={value + row}
                          onChange={updateSeat}
                          disabled={props.bookedSeat.some((ele) => {
                            return ele === value + row;
                          })}
                        />
                        <label for={value + row}>{value + row}</label>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </div>
        </Grid>
        <Grid>
          <Button
            href="/myaccount"
            color="primary"
            variant="contained"
            disabled={isSubmit}
            onClick={Book}
          >
            Book {seats} {seats <= 1 ? "Seat" : "Seats"}
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default Hall;
