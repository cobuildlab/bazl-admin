import React from 'react';
import View from 'react-flux-state';
import * as R from 'ramda';
import { landingStore, USER_EVENT } from '../landing/landing-store';
import SidebarComponent from '../../components/SidebarComponent';
import { Loader } from '../../components/Loader';
import { Link } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBIcon, MDBRow, MDBAnimation } from 'mdbreact';
import { BasicInformation } from './components/BasicInformation';
import { BankInformation } from './components/BankInformation';
import SliderCardsMap from '../../components/SliderCardsMap';
import { userModel } from './Profile-models';
import { inventoryStore, INVENTORY_EVENT } from '../inventory/inventory-store';
import { fetchUserProducts } from '../inventory/inventory-actions';

class ProfileView extends View {
  constructor(props) {
    super(props);
    const user = landingStore.getState(USER_EVENT);
    this.state = {
      user: { ...R.clone(userModel), ...user },
      inventory: [],
      loadingInventory: true,
      data: {
        totalSales: '0',
      },
    };
  }
  componentDidMount() {
    this.subscribe(inventoryStore, INVENTORY_EVENT, (data) => {
      let { inventory } = this.state;
      inventory = R.clone(data);
      this.setState({
        inventory,
        loadingInventory: false,
      });
    });
    fetchUserProducts();
  }
  render() {
    const { inventory, user, loadingInventory, data } = this.state;
    const { bankAccounts } = this.state.user;
    return (
      <SidebarComponent>
        <div className="d-flex justify-content-between nav-admin body">
          <div>
            <h2 className="m-0">Profile</h2>
          </div>
          <div>
            <Link
              to={'/edit-profile'}
              className="btn btn-circle btn-circle-link">
              Edit Profile
              <MDBIcon icon="upload" className="ml-1" />
            </Link>
          </div>
        </div>
        <MDBAnimation type="fadeIn">
          <MDBContainer>
            <MDBRow>
              <BasicInformation user={user} data={data} />
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol md="3" />
              <MDBCol md="9">
                <BankInformation
                  bankAccounts={bankAccounts}
                  flagInformation={false}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="3" />
              <MDBCol md="9">
                <h5 className="font-weight-bold text-black-50">
                  Recently Publications
                </h5>
                {loadingInventory ? (
                  <div className="text-center">
                    <Loader />
                  </div>
                ) : (
                  <SliderCardsMap inventory={inventory} />
                )}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBAnimation>
      </SidebarComponent>
    );
  }
}
export default ProfileView;
