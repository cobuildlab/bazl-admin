import React from 'react';
import View from 'react-flux-state';
import moment from 'moment';
import PropTypes from 'prop-types';
import { MDBIcon, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdbreact';
import { fetchImgUserProduct } from '../sales-action';
import { salesStore, IMG_EVENT } from '../sales-store';

class SalesDetailViewInformation extends View {
  constructor(props) {
    super(props);
    this.state = {
      imgUserProduct: '',
    };
  }

  componentDidMount() {
    this.subscribe(salesStore, IMG_EVENT, (imgUserProduct) => {
      this.setState({
        imgUserProduct,
      });
    });
    fetchImgUserProduct(this.props.product.user);
  }

  render() {
    const { imgUserProduct } = this.state;
    const { commentSales, onChange, onImageChange } = this.props;
    let { product, index } = this.props;

    const id = 'upload-photo' + index;
    let imagePreview = null;

    if (product.pictureTax) {
      imagePreview = (
        <label
          style={{ cursor: 'pointer' }}
          width="80"
          className="text-center"
          htmlFor={id}>
          <img
            alt={'User Profile'}
            src={product.pictureTax}
            className="img-fluid"
            style={{ borderRadius: '10px', width: '160px', height: '180px' }}
          />
        </label>
      );
    } else {
      imagePreview = (
        <label className="CustomlabelSales text-center" htmlFor={id}>
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
              style={{ backgroundImage: `url(${imgUserProduct})` }}
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
                  {product.amount}
                </span>
              </h6>
              <h6>
                <span className="d-inline font-weight-bold ml-4">
                  {product.price}$
                </span>
              </h6>
              <h6>
                <span className="d-inline font-weight-bold">
                  <div
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 100,
                      backgroundColor: product.color,
                      marginLeft: 20,
                    }}></div>
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
              id={id}
              accept="image/*"
              style={{ opacity: '0', position: 'absolute', zIndex: '-1' }}
              onChange={(e) => onImageChange(index, e)}
            />
          </MDBCol>
          <MDBInput
            type="textarea"
            label="Comment"
            name="comment"
            rows="1"
            className="mt-2 pt-2"
            onChange={(e) => onChange(index, e)}
            value={product.comment}
          />
          <div className="d-flex justify-content-center mt-4">
            <MDBBtn
              className="btn btn-circle"
              onClick={(e) => commentSales(index)}>
              Send
            </MDBBtn>
          </div>
        </MDBCol>
        <MDBCol md="2" className="mb-3">
          <h5>Total Sales</h5>
          <h6 className="text-primary">
            <span className="font-weight-bold">
              {product.price * product.amount}$
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
  commentSales: PropTypes.func.isRequired,
};

export { SalesDetailViewInformation };
