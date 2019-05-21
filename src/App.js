import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingView from "./modules/landing/Landing";
import HomeScreen from "./modules/admin/Home/home";
import ProfileScreen from "./modules/admin/Profile/Profile";
import SalesScreen from "./modules/admin/Sales/Sales";
import NotificationsScreen from "./modules/admin/Notifications/Notifications";
import InventoryScreen from "./modules/admin/Inventory/Inventory";
import { ToastContainer } from "react-toastify";
import NewProductScreen from "./modules/admin/NewProduct/NewProduct";
import SalesDetailScreen from "./modules/admin/Sales/SalesDetail";

/**
 * @typedef {[ component: any, pathname: string ]} publicRoutes
 * Defines all public routes
 */

const publicRoutes = [
  { pathname: "/", component: LandingView },
  { pathname: "/home", component: HomeScreen },
  { pathname: "/profile", component: ProfileScreen },
  { pathname: "/sales", component: SalesScreen },
  { pathname: "/notifications", component: NotificationsScreen },
  { pathname: "/inventory", component: InventoryScreen },
  { pathname: "/new-product", component: NewProductScreen },
  { pathname: "/order-detail", component: SalesDetailScreen }
];

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
          {publicRoutes.map((route, index) => (
            <Route
              exact
              path={route.pathname}
              component={route.component}
              key={index}
            />
          ))}
          ;
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
