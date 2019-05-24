import React from "react";
import { Link } from "react-router-dom";
import {
  MDBIcon,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBBtn
} from "mdbreact";
import SidebarComponent from "../../../components/SidebarComponent";

import ImgDefault from "../../../assets/img/img-default.png";
import SliderCards from "../../../components/SliderCards";

class ProfileView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SidebarComponent>
          <div className="d-flex justify-content-between nav-admin body">
            <div>
              <h2 className="m-0">Profile</h2>
            </div>
            <div>
              <Link
                to="/new-product"
                className="btn btn-circle btn-circle-link"
              >
                Upload <MDBIcon icon="upload" className="ml-1" />
              </Link>
            </div>
          </div>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="3">
                <label className="Customlabel text-center" htmlFor="upload-photo">
                  <img
                    src={ImgDefault}
                    alt="default"
                    className="img-fluid img-label"
                    width="80"
                  />
                </label>
                <input type="file" name="photo" id="upload-photo" />
                <small className="text-center">
                  JPG or PNG format with a maximum of 5mb
                </small>
              </MDBCol>
              <MDBCol md="9">
                <MDBRow>
                  <MDBCol md="9">
                    <h2 className="text-black-50 mb-0">Name Merchants</h2>
                    <small className="text-primary">@User</small>
                    <div className="mt-5">
                      <h5>Description</h5>
                      <small>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </small>
                    </div>
                    <div className="mt-4">
                      <h5>Bank Accounts</h5>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>0000 visa ********0000</div>
                        <div>
                          <MDBBtn className="btn-edit">
                            <MDBIcon icon="pencil-alt" />
                          </MDBBtn>
                          <MDBBtn className="btn-delete">
                            <MDBIcon icon="times" />
                          </MDBBtn>
                        </div>
                      </div>

                      <div className="d-flex justify-content-end align-items-center">
                        <MDBBtn className="btn btn-circle">Add Accounts</MDBBtn>
                      </div>
                    </div>
                    <div className="mt-3 mb-5">
                      <SliderCards />
                    </div>
                  </MDBCol>
                  <MDBCol md="3">
                    <MDBCard>
                      <MDBCardBody>
                        <MDBCardText className="text-center">
                          Total Sales
                        </MDBCardText>
                        <MDBCardTitle className="text-center">
                          $1000
                        </MDBCardTitle>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default ProfileView;
