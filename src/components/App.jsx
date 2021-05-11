import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import MainPage from "./MainPage/MainPage";
import Error from "./error/Error";
import Seat from "./seatarrangement/Seat";
import MyAccount from "./MyAccount";
const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/seat" component={Seat} />
        <Route exact path="/myaccount" component={MyAccount} />
        <Route component={Error} />
      </Switch>
    </>
  );
};

export default App;