import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingView from "./modules/landing/LandingView";
import HomeView from "./modules/admin/Home/homeView";
import ProfileView from "./modules/admin/Profile/ProfileView";
import SalesView from "./modules/admin/Sales/SalesView";
import NotificationsView from "./modules/admin/Notifications/NotificationsView";
import InventoryView from "./modules/admin/Inventory/InventoryView";
import { ToastContainer } from "react-toastify";
import NewProductView from "./modules/admin/NewProduct/NewProductView";
import SalesDetailView from "./modules/admin/Sales/SalesDetailView";

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
          <Route path={'/order-details'} component={SalesDetailView} />



        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
