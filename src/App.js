import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingView from "./modules/landing/LandingView";
import HomeView from "./modules/home/HomeView";
import ProfileView from "./modules/profile/ProfileView";
import SalesView from "./modules/sales/SalesView";
import NotificationsView from "./modules/notifications/NotificationsView";
import InventoryView from "./modules/inventory/InventoryView";
import { ToastContainer } from "react-toastify";
import NewProductView from "./modules/new-product/NewProductView";
import SalesDetailView from "./modules/sales/SalesDetailView";

/**
 * @typedef {[ component: any, pathname: string ]} publicRoutes
 * Defines all public routes
 */


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path={'/'} component={LandingView} />
          {/*Sidebar*/}
          <Route path={'/home'} component={HomeView} />
          <Route path={'/profile'} component={ProfileView} />
          <Route exact path={'/sales'} component={SalesView}/>
          <Route path={'/notifications'} component={NotificationsView} />
          <Route path={'/inventory'} component={InventoryView} />
          {/*home, profile, sales*/}
          <Route path={'/new-product'} component={NewProductView} />
          {/* sales */}
          <Route path={'/order-details/:id'} component={SalesDetailView} />



        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
