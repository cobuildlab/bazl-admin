import React, { Component } from 'react';
import {
  MDBIcon,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from 'mdbreact';
import PropTypes from 'prop-types';

class Products extends Component {
  render() {
    const { onDeleteProduct } = this.props;
    const { size, color, quantity } = this.props.product;
    return (
      <MDBCard className="accountCard" style={{ marginBottom: '20px' }}>
        <MDBCardBody style={{ paddingBottom: '0px', paddingTop: '5px' }}>
          <MDBRow className="d-flex justify-content-around align-items-center text-center">
            <MDBCol md="3" className="product">
              <MDBInput
                disabled
                label="Size"
                className="mt-0"
                type="text"
                name="size"
                value={size}
              />
            </MDBCol>
            <MDBCol md="3" className="product">
              <MDBInput
                disabled
                label="color"
                className="mt-0"
                type="text"
                name="color"
                value={color}
              />
            </MDBCol>
            <MDBCol md="3" className="product">
              <MDBInput
                disabled
                label="quantity"
                className="mt-0"
                type="text"
                name="quantity"
                value={quantity}
              />
            </MDBCol>
            <MDBCol md="1" style={{ paddingTop: '5px' }}>
              <MDBBtn className="btn-delete" onClick={onDeleteProduct}>
                <MDBIcon icon="times" />
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

Products.propTypes = {
  product: PropTypes.object.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
};

export { Products };
