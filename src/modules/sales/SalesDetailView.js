import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  MDBIcon,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from 'mdbreact';
import View from 'react-flux-state';
import SidebarComponent from '../../components/SidebarComponent';
// import ImgCardDama from '../../assets/img/ropa-dama.jpg';
import ImgProfile from '../../assets/img/profile-table.jpg';
import {
  salesStore,
  DETAIL_EVENT,
  STAT_EVENT,
  UPLOAD_EVENT,
} from './sales-store';
import { detailFetch, changeStatus, detailUpload } from './sales-action';
import { landingStore, USER_EVENT } from '../landing/landing-store';
import { Loader } from '../../components/Loader';

class SalesDetailView extends View {
  constructor(props) {
    super(props);
    this.state = {
      sale: {},
      key: '',
      picture: '',
      shippedStatus: '2',
      user: landingStore.getState(USER_EVENT),
    };
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    this.subscribe(salesStore, DETAIL_EVENT, (sale) => {
      const detailSale = sale;
      const key = sale.id;
      this.setState({
        sale: detailSale,
        key: key,
      });
    });
    this.subscribe(salesStore, STAT_EVENT, (sale) => {
      const detailSale = sale;
      const key = sale.id;
      this.setState({
        sale: detailSale,
        key: key,
      });
    });
    this.subscribe(salesStore, UPLOAD_EVENT, (upload) => {
      const url = upload;
      this.setState({
        picture: url,
      });
    });
    detailFetch(this.props.match.params.id);
  }

  closeSale(e) {
    let value = e.target.value;
    changeStatus(this.props.match.params.id, value);
  }

  handleUpload = (e) => {
    detailUpload(e);
  };

  onSend = (e) => {
    console.log('send', e.target.value);
    console.log('send', e.target);
  };

  render() {
    let { sale } = this.state;
    let statBtn;
    if (sale.status && sale.shippedStatus === '1') {
      statBtn = (
        <MDBBtn
          className="btn btn-circle-success"
          value={sale.shippedStatus}
          onClick={(e) => this.closeSale(e)}>
          Active Sale
        </MDBBtn>
      );
    } else if (sale.status && sale.shippedStatus === '2') {
      statBtn = (
        <MDBBtn
          className="btn btn-circle-success"
          onClick={(e) => this.closeSale(e)}>
          Shipped Sale
        </MDBBtn>
      );
    } else {
      statBtn = (
        <MDBBtn
          className="btn btn-circle-danger"
          onClick={() => this.closeSale()}
          disabled>
          Closed Sale
        </MDBBtn>
      );
    }
    let uploadFile = (
      <div>
        <input
          type="file"
          name="photo"
          id="upload-photo"
          style={{ opacity: 0 }}
          onChange={this.handleUpload}
        />
      </div>
    );
    return (
      <React.Fragment>
        <SidebarComponent>
          <div className="d-flex justify-content-between nav-admin body">
            <div>
              <h2 className="m-0">Order Detail</h2>
            </div>
            <div>
              <Link
                to="/new-product"
                className="btn btn-circle btn-circle-link">
                Upload <MDBIcon icon="upload" className="ml-1" />
              </Link>
            </div>
          </div>

          <MDBContainer className="body">
            <div className="d-flex justify-content-end mb-4">{statBtn}</div>
            {sale.products ? (
              <div>
                {sale.products.map((product, index) => (
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
                      <label
                        className="CustomlabelSales text-center"
                        htmlFor="upload-photo">
                        <MDBIcon icon="file-upload" className="mb-4 pbs-4" />{' '}
                        Upload Image
                      </label>
                      {uploadFile}
                      <img
                        width="100%"
                        src={sale.picture}
                        className="mt-2 pt-2"
                        alt=""
                      />
                      {/* {sale.picture ? (
                          <p className="text-center">
                            <a
                              href={sale.picture}
                              rel="noopener noreferrer"
                              target="_blank">
                              Download
                        </a>
                          </p>
                        ) : (
                            ''
                          )} */}

                      <MDBInput
                        type="textarea"
                        label="Comment"
                        name="coment"
                        rows="1"
                        className="mt-2 pt-2"
                      />
                      <div className="d-flex justify-content-center mt-4">
                        <MDBBtn
                          className="btn btn-circle"
                          onClick={(e) => this.onSend(e)}>
                          Send
                        </MDBBtn>
                      </div>
                    </MDBCol>
                    <MDBCol md="2" className="mb-3">
                      <h5>Total Sales</h5>
                      <h6 className="text-primary">
                        <span className="font-weight-bold">80</span> Sales
                      </h6>
                    </MDBCol>
                  </MDBRow>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <Loader />
              </div>
            )}
          </MDBContainer>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default SalesDetailView;
