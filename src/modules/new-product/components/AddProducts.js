import React from 'react';
import PropTypes from 'prop-types';
import {
  MDBBtn,
  MDBInput,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBContainer,
} from 'mdbreact';
import { Products } from './Products';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variant: {
        size: '',
        color: '',
        quantity: '',
      },
      showNewProductForm: false,
    };
  }

  onChangeProduct = (e) => {
    const variant = this.state.variant;
    variant[e.target.name] = e.target.value;
    this.setState({
      variant: variant,
    });
  };

  changeFlag = () => {
    this.setState((prevState) => ({
      showNewProductForm: !prevState.showNewProductForm,
    }));
  };
  onClick = () => {
    this.props.onNewProduct(this.state.variant);
    this.changeFlag();
  };

  render() {
    const { products, onDeleteProduct } = this.props;
    let { showNewProductForm } = this.state;
    return (
      <React.Fragment>
        {products.length !== 0 ? (
          <div>
            {this.props.products.map((product, index) => (
              <Products
                key={index}
                index={index}
                product={product}
                onDeleteProduct={() => onDeleteProduct(index)}
              />
            ))}
          </div>
        ) : (
          <MDBContainer className="body" fluid>
            <h6 className="text-black-50 text-center">
              Add size, color and quantity per product
            </h6>
          </MDBContainer>
        )}

        <div className="d-flex justify-content-center align-items-center">
          <MDBBtn onClick={() => this.changeFlag()} className="btn btn-circle">
            Add Product
          </MDBBtn>
        </div>
        {showNewProductForm ? (
          <div>
            <h5>New Product</h5>
            <MDBCard style={{ marginBottom: '20px' }}>
              <MDBCardBody style={{ paddingBottom: '0px', paddingTop: '0px' }}>
                <MDBRow className="d-flex justify-content-around align-items-center text-center">
                  <MDBCol md="3">
                    <MDBInput
                      label="Size"
                      className="mt-0"
                      type="text"
                      name="size"
                      onChange={this.onChangeProduct}
                    />
                  </MDBCol>
                  <MDBCol md="3">
                    <MDBInput
                      label="Color"
                      className="mt-0"
                      type="text"
                      name="color"
                      onChange={this.onChangeProduct}
                    />
                  </MDBCol>
                  <MDBCol md="3">
                    <MDBInput
                      label="Quantity"
                      className="mt-0"
                      type="number"
                      name="quantity"
                      onChange={this.onChangeProduct}
                    />
                  </MDBCol>
                  <MDBCol md="1">
                    <MDBBtn className="btn-add" onClick={this.onClick}>
                      <MDBIcon icon="plus" />
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </div>
        ) : (
          <div></div>
        )}
      </React.Fragment>
    );
  }
}

AddProduct.propTypes = {
  products: PropTypes.array.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  onNewProduct: PropTypes.func.isRequired,
};

export { AddProduct };
