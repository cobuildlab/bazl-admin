import React from 'react';
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  // MDBInput,
} from 'mdbreact';
import PropTypes from 'prop-types';
import ImgDefault from '../../../assets/img/img-default.png';

/**
 * Component to Show the Profile
 * @param user
 * @returns {*}
 * @constructor
 */
const BasicInformation = ({ user }) => {
  let { name, description, picture } = user;
  let imagePreview = null;

  if (picture) {
    imagePreview = (
      <img alt={'User Profile'} src={picture} className="img-fluid" />
    );
  } else {
    imagePreview = (
      <img
        alt={'User Profile'}
        src={ImgDefault}
        className="img-fluid img-label"
      />
    );
  }

  return (
    <React.Fragment>
      <MDBCol md="3">
        <label
          className="CustomlabelProfile text-center"
          htmlFor="upload-photo">
          {imagePreview}
        </label>
      </MDBCol>
      <MDBCol md="7">
        <h4
          style={{ margin: '0px' }}
          className="font-weight-bold text-black-50">
          {name}
        </h4>
        <small className="text-primary">@User</small>
        <div className="mt-5">
          <h5>Description</h5>
          <small>{description}</small>
        </div>
        <br></br>
      </MDBCol>
      <MDBCol md="2">
        <MDBCard>
          <MDBCardBody>
            <MDBCardText className="text-center">Total Sales</MDBCardText>
            <MDBCardTitle className="text-center">$1000</MDBCardTitle>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </React.Fragment>
  );
};

BasicInformation.propTypes = {
  user: PropTypes.object.isRequired,
};

export { BasicInformation };
