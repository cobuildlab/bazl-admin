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
const BasicInformation = ({ user, data }) => {
  let { name, description, picture } = user;
  let imagePreview = null;
  if (picture) {
    imagePreview = (
      <label width="80" className="text-center" htmlFor="upload-photo">
        <img
          alt={'User Profile'}
          src={picture}
          className="img-fluid"
          style={{ borderRadius: '10px', width: '160px', height: '180px' }}
        />
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
          style={{ borderRadius: '10px', width: '160px', height: '180px' }}
        />
      </label>
    );
  }

  return (
    <React.Fragment>
      <MDBCol md="3" style={{ display: 'flex', justifyContent: 'center' }}>
        {imagePreview}
      </MDBCol>
      <MDBCol md="5">
        <h3 className="font-weight-bold text-black-50">{name}</h3>
        <small className="text-primary">@User</small>
        <div className="mt-5">
          <h5 className="font-weight-bold text-black-50">Description</h5>
          <small>{description}</small>
        </div>
        <br></br>
      </MDBCol>
      <MDBCol md="2">
        <br></br>
        <MDBCard style={{ marginBottom: '30px' }}>
          <MDBCardBody>
            <MDBCardText className="text-center">Total Sales</MDBCardText>
            <MDBCardTitle className="text-center">
              ${data.totalSales}
            </MDBCardTitle>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md="2"></MDBCol>
    </React.Fragment>
  );
};

BasicInformation.propTypes = {
  user: PropTypes.object.isRequired,
};

export { BasicInformation };
