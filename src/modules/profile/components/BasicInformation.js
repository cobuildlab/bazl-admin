import React from 'react';
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBInput,
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
      <img alt={'User Profile'} src={ImgDefault} className="img-fluid img-label" />
    );
  }

  return (
    <React.Fragment>
      <MDBCol md="3">
        <label className="Customlabel text-center" htmlFor="upload-photo">
          {imagePreview}
        </label>
        <small className="text-center">JPG or PNG with a maximum of 5mb</small>
      </MDBCol>
      <MDBCol md="7">
        <h5>Name User</h5>
        <MDBInput
          className="mt-0"
          type="text"
          name="name"
          value={name}
          disabled={true}
        />
        <h5>Description</h5>
        <MDBInput
          className="mt-0"
          type="textarea"
          name="description"
          value={description}
          disabled={true}
          rows="5"
        />
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
