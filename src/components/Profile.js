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
  MDBBtn,
  MDBInput
} from "mdbreact";
import SidebarComponent from "./SidebarComponent";
import SliderCards from "./SliderCards";
import ImgDefault from '../assets/img/img-default.png';
import { BankAccount } from './BankAccount';

class Profile extends React.Component {
  render() {
    const { onClickEdit, onCancel, onSave } = this.props;
    let { name, description, bankAccounts, picture } = this.props.user;
    let imagePreview = null;

    if (picture) {
      imagePreview = (<img alt={'User Profile'} src={picture} className="img-fluid img-label" />);
    } else {
      imagePreview = (<img alt={'User Profile'} src={ImgDefault} className="img-fluid img-label" />);
    }

    return (
      <SidebarComponent>
        <div className="d-flex justify-content-between nav-admin body">
          <div>
            <h2 className="m-0">Profile</h2>
          </div>
          <div>
            <Link
              onClick={onClickEdit}
              className="btn btn-circle btn-circle-link"
            >
              Edit Profile<MDBIcon icon="upload" className="ml-1" />
            </Link>
          </div>
        </div>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="3">
              <label className="Customlabel text-center" for="upload-photo">
                {imagePreview}
              </label>
              <small className="text-center">
                JPG or PNG format with a maximum of 5mb
              </small>
            </MDBCol>
            <MDBCol md="7">
              <h5>Name User</h5>
              <MDBInput
                className="mt-0"
                type="text"
                name="name"
                value={name}
                onChange={this.onChange}
                disabled
              />
              <h5>Description</h5>
              <MDBInput
                className="mt-0"
                type="textarea"
                name="description"
                value={description}
                onChange={this.onChange}
                rows="5"
                disabled
              />
              <MDBCol className="text-center">
                <MDBBtn disabled onClick={() => onSave(this.state.user)} color="success" className="btn btn-circle mt-4 mb-5">
                  Save
                    </MDBBtn>
                <MDBBtn disabled onClick={onCancel} color="danger" className="btn btn-circle mt-4 mb-5">
                  Cancel
                    </MDBBtn>
              </MDBCol>

            </MDBCol>
            <MDBCol md="2">
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

          <MDBRow>
            <MDBCol md="2"></MDBCol>
            <MDBCol md="8">
              <div className="mt-3 mb-5">
                <h5>Bank Accounts</h5>
                {bankAccounts.map((account, i) => (
                  <BankAccount key={i} account={account} onEdit={this.onEdit} onDelete={this.onDelete} editAccount={false}></BankAccount>
                ))}
                <div className="d-flex justify-content-center align-items-center">
                  <MDBBtn disabled onClick={() => this.changeFlag()} className="btn btn-circle">Add Accounts</MDBBtn>
                </div>
              </div>
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