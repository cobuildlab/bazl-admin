import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//auth
import LandingView from "./modules/landing/Landing";
import HomeScreen from "./modules/admin/Home/home";
import ProfileScreen from "./modules/admin/Profile/Profile";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingView} />{" "}
          <Route exact path="/home" component={HomeScreen} />{" "}
          <Route exact path="/profile" component={ProfileScreen} />{" "}
        </Switch>{" "}
      </BrowserRouter>
    );
  }
}
