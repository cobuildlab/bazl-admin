import React from 'react';
import { landingStore, USER_EVENT } from '../landing/landing-store';
import SidebarComponent from '../../components/SidebarComponent';
import { Link } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact';
import { BasicInformation } from './components/BasicInformation';
import { BankInformation } from './components/BankInformation';
import SliderCards from '../../components/SliderCards';

const ProfileView = () => {
  const user = landingStore.getState(USER_EVENT);
  const { bankAccounts } = user;
  return (
    <SidebarComponent>
      <div className="d-flex justify-content-between nav-admin body">
        <div>
          <h2 className="m-0">Profile</h2>
        </div>
        <div>
          <Link to={'/edit-profile'} className="btn btn-circle btn-circle-link">
            Edit Profile
            <MDBIcon icon="upload" className="ml-1" />
          </Link>
        </div>
      </div>
      <MDBContainer>
        <MDBRow>
          <BasicInformation user={user} />
        </MDBRow>
        <MDBRow>
          <MDBCol md="1" />
          <MDBCol md="10">
            <BankInformation
              bankAccounts={bankAccounts}
              flagInformation={false}
            />
          </MDBCol>
          <MDBCol md="1" />
        </MDBRow>

        <MDBRow>
          <MDBCol md="2" />
          <MDBCol md="8">
            <div className="mt-3 mb-5">
              <SliderCards />
            </div>
          </MDBCol>
          <MDBCol md="2" />
        </MDBRow>
      </MDBContainer>
    </SidebarComponent>
  );
};

export default ProfileView;
