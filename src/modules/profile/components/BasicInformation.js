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
      <label width="80" className="text-center" htmlFor="upload-photo">
        <img alt={'User Profile'} src={picture} className="img-fluid" />
      </label>
    );
  } else {
    imagePreview = (
      <label
        width="80"
        className="CustomlabelProfile text-center"
        htmlFor="upload-photo">
        <img
          alt={'User Profile'}
          src={ImgDefault}
          className="img-fluid img-label"
        />
      </label>
    );
  }

  return (
    <React.Fragment>
      <MDBCol md="3">{imagePreview}</MDBCol>
      <MDBCol md="7">
        <h3 className="font-weight-bold text-black-50">{name}</h3>
        <small className="text-primary">@User</small>
        <div className="mt-5">
          <h5 className="font-weight-bold text-black-50">Description</h5>
          <small>{description}</small>
        </div>
        <br></br>
      </MDBCol>
      <MDBCol md="2">
        <MDBCard style={{ marginBottom: '30px' }}>
          <MDBCardBody>
            <MDBCardText className="text-center">Total Sales</MDBCardText>
            <MDBCardTitle className="text-center">$0</MDBCardTitle>
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
