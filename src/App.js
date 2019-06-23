import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingView from './modules/landing/LandingView';
import HomeView from './modules/home/HomeView';
import { TermsView } from './modules/terms/TermsView';
import { PrivacyView } from './modules/privacy/PrivacyView';
import ProfileView from './modules/profile/ProfileView';
import SalesView from './modules/sales/SalesView';
import NotificationsView from './modules/notifications/NotificationsView';
import InventoryView from './modules/inventory/InventoryView';
import InventoryDetailView from './modules/inventory/InventoryDetailView';
import { ToastContainer } from 'react-toastify';
import NewProductView from './modules/new-product/NewProductView';
import SalesDetailView from './modules/sales/SalesDetailView';
import Session from './components/Session';
import EditProfileView from './modules/profile/EditProfileView';
import { ChangePasswordView } from './modules/landing/components/ChangePasswordView';
import { TermsOfServices } from './modules/landing/components/TermsOfServices';

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
          <Route path="/change-password" component={ChangePasswordView} />
          <Route path="/terms-services" component={TermsOfServices} />
          {/*Sidebar*/}
          <Session>
            <Route path={'/home'} component={HomeView} />
            <Route path={'/terms-and-conditions'} component={TermsView} />
            <Route path={'/privacy-policy'} component={PrivacyView} />
            <Route path={'/profile'} component={ProfileView} />
            <Route path={'/edit-profile'} component={EditProfileView} />
            <Route exact path={'/sales'} component={SalesView} />
            <Route path={'/notifications'} component={NotificationsView} />
            <Route path={'/inventory'} component={InventoryView} />
            {/*home, profile, sales*/}
            <Route path={'/new-product'} component={NewProductView} />
            {/* sales */}
            <Route path={'/order-details/:id'} component={SalesDetailView} />
            <Route
              path={'/inventory-details/:id'}
              component={InventoryDetailView}
            />
          </Session>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
