import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//auth
import LandingView from "./modules/landing/Landing";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingView} />{" "}
        </Switch>{" "}
      </BrowserRouter>
    );
  }
}
