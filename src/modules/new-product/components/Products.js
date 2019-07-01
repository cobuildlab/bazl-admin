import React, { Component } from 'react';
// import * as R from 'ramda';
import {
  MDBIcon,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from 'mdbreact';
// import PropTypes from 'prop-types';

class Products extends Component {
  onChange = ({ target: { name, value } }) => {
    if (name === 'type') {
      this.setState((prevState) => ({
        type: !prevState.type,
      }));
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  render() {
    return (
      <MDBCard className="accountCard" style={{ marginBottom: '20px' }}>
        <MDBCardBody style={{ paddingBottom: '0px', paddingTop: '0px' }}>
          <MDBRow className="d-flex justify-content-around align-items-center text-center">
            <MDBCol md="3" className="product">
              <MDBInput
                label="Size"
                className="mt-0"
                type="text"
                name="title"
                onChange={this.onChange}
              />
            </MDBCol>
            <MDBCol md="3" className="product">
              <MDBInput
                label="Color"
                className="mt-0"
                type="text"
                name="number"
                onChange={this.onChange}
              />
            </MDBCol>
            <MDBCol md="3" className="product">
              <MDBInput
                type="number"
                name="quantity"
                min="1"
                max="1000"
                onChange={this.onChange}
              />
            </MDBCol>
            <MDBCol md="1" style={{ padding: '0px' }}>
              <MDBBtn className="btn-edit" style={{ marginBottom: '0px' }}>
                <MDBIcon icon="pencil-alt" />
              </MDBBtn>
              <MDBBtn className="btn-delete">
                <MDBIcon icon="times" />
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export { Products };
