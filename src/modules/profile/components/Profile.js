import React from "react";
import { Link } from "react-router-dom";
import {
  MDBIcon,
  MDBContainer,
  MDBCol,
  MDBRow,
} from "mdbreact";
import SidebarComponent from "../../../components/SidebarComponent";
import BasicInformation from './BasicInformation';
import BankInformation from './BankInformation';
import SliderCards from "../../../components/SliderCards";

class Profile extends React.Component {
  render() {
    const { flagEdit } = this.props;
    let { name, description, picture, bankAccounts } = this.props.user;

    return (
      <SidebarComponent>
        <div className="d-flex justify-content-between nav-admin body">
          <div>
            <h2 className="m-0">Profile</h2>
          </div>
          <div>
            <Link
              onClick={flagEdit}
              className="btn btn-circle btn-circle-link"
            >
              Edit Profile<MDBIcon icon="upload" className="ml-1" />
            </Link>
          </div>
        </div>
        <MDBContainer>
          <MDBRow>
            <BasicInformation name={name} description={description} picture={picture} flagInformation={true}/>
          </MDBRow>

          <MDBRow>
            <MDBCol md="2"></MDBCol>
            <MDBCol md="8">
              <BankInformation bankAccounts={bankAccounts} flagInformation={true}/>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md="2"></MDBCol>
            <MDBCol md="8" >
              <div className="mt-3 mb-5">
                <SliderCards />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>
        </MDBContainer>
      </SidebarComponent>
    );
  }
}

export default Profile;