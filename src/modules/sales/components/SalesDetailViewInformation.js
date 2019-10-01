import React, { Component } from 'react';
import moment from 'moment';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { MDBIcon, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdbreact';
import ImgProfile from '../../../assets/img/profile-table.jpg';

class SalesDetailViewInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      index: this.props.index,
      comment: this.props.product.comment,
      pictureTax: this.props.pictureTax,
      idSale: this.props.sale.id,
      idProduct: this.props.product.id,
    };
    this.onImageChange = this.onImageChange.bind(this);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    let { name } = e.target;
    let state = this.state;

    reader.onloadend = () => {
      state[name] = reader.result;
      this.setState({
        state,
        file,
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    let { product, index, pictureTax, comment } = this.state;
    const { commentSales } = this.props;
    let imagePreview = null;
    if (pictureTax) {
      imagePreview = (
        <label
          style={{ cursor: 'pointer' }}
          width="80"
          className="text-center"
          htmlFor="upload-photo">
          <img
            alt={'User Profile'}
            src={pictureTax}
            className="img-fluid"
            style={{ borderRadius: '10px', width: '160px', height: '180px' }}
          />
        </label>
      );
    } else {
      imagePreview = (
        <label className="CustomlabelSales text-center" htmlFor="upload-photo">
          <MDBIcon icon="file-upload" className="mb-4 pbs-4" /> Upload Image
        </label>
      );
    }

    return (
      <MDBRow key={index}>
        <MDBCol md="2">
          <div
            className="img-card"
            style={{ backgroundImage: `url(${product.picture})` }}
          />
        </MDBCol>
        <MDBCol md="6">
          <div className="mb-3">
            <div
              className="img-profile-table"
              style={{ backgroundImage: `url(${ImgProfile})` }}
            />
            <span className="username-table">{product.name}</span>
          </div>
          <div className="d-flex justify-content-start">
            <div>
              <h6>Influencer</h6>
              <h6>Order No</h6>
              <h6>Date</h6>
              <h6>Quantity</h6>
              <h6>Price</h6>
              <h6>Color</h6>
              <h6>Size</h6>
            </div>
            <div>
              <h6>
                <span className="d-inline font-weight-bold ml-4">
                  {product.postCreatorEmail}
                </span>
              </h6>
              <h6>
                <span className="d-inline font-weight-bold ml-4">
                  {product.id}
                </span>
              </h6>
              <h6>
                <span className="d-inline font-weight-bold ml-4">
                  {moment(product.addToShoppingCartDate).format(
                    'MMMM Do YYYY, h:mm:ss a',
                  )}
                </span>
              </h6>
              <h6>
                <span className="d-inline font-weight-bold ml-4">
                  {product.totalQuantity}
                </span>
              </h6>
              <h6>
                <span className="d-inline font-weight-bold ml-4">
                  {product.price}$
                </span>
              </h6>
              <h6>
                <span className="d-inline font-weight-bold ml-4">
                  {product.color}
                </span>
              </h6>
              <h6>
                <span className="d-inline font-weight-bold ml-4">
                  {product.size}
                </span>
              </h6>
            </div>
          </div>
          <small className="text-black-50">Status</small>
          <hr />

          <MDBCol
            md="12"
            style={{ display: 'flex', flexDirection: 'column' }}
            className="text-center">
            {imagePreview}
            <input
              type="file"
              name="pictureTax"
              id="upload-photo"
              onChange={this.onImageChange}
            />
          </MDBCol>

          <MDBInput
            type="textarea"
            label="Comment"
            name="comment"
            rows="1"
            className="mt-2 pt-2"
            onChange={this.onChange}
            value={comment}
          />
          <div className="d-flex justify-content-center mt-4">
            <MDBBtn
              className="btn btn-circle"
              onClick={(e) => commentSales(R.clone(this.state))}>
              Send
            </MDBBtn>
          </div>
        </MDBCol>
        <MDBCol md="2" className="mb-3">
          <h5>Total Sales</h5>
          <h6 className="text-primary">
            <span className="font-weight-bold">
              {product.price * product.totalQuantity}$
            </span>
          </h6>
        </MDBCol>
      </MDBRow>
    );
  }
}

SalesDetailViewInformation.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  pictureTax: PropTypes.string.isRequired,
  sale: PropTypes.object.isRequired,
  commentSales: PropTypes.func.isRequired,
};

export { SalesDetailViewInformation };
