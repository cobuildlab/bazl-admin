import React from 'react';
import { Link } from 'react-router-dom';
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
import ImgCardDama from '../../assets/img/ropa-dama.jpg';
import ImgProfile from '../../assets/img/profile-table.jpg';
import {
  salesStore,
  DETAIL_EVENT,
  STAT_EVENT,
  UPLOAD_EVENT,
} from './sales-store';
import { detailFetch, changeStatus, detailUpload } from './sales-action';

class SalesDetailView extends View {
  constructor(props) {
    super(props);
    this.state = {
      sale: [],
      key: '',
      picture: '',
      shippedStatus: '2',
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
    detailFetch(this.props.match.params.id);

    this.subscribe(salesStore, UPLOAD_EVENT, (upload) => {
      const url = upload;
      this.setState({
        picture: url,
      });
    });
  }

  closeSale(e) {
    let value = e.target.value;
    changeStatus(this.props.match.params.id, value);
  }
  handleUpload = (e) => {
    detailUpload(e);
  };

  render() {
    let statBtn;
    if (this.state.sale.status && this.state.sale.shippedStatus === '1') {
      statBtn = (
        <MDBBtn
          className="btn btn-circle-success"
          value={this.state.shippedStatus}
          onClick={(e) => this.closeSale(e)}>
          Active Sale
        </MDBBtn>
      );
    } else if (this.state.sale.status && this.state.shippedStatus === '2') {
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
            <MDBRow>
              <MDBCol md="2">
                <div
                  className="img-card"
                  style={{ backgroundImage: `url(${ImgCardDama})` }}
                />
              </MDBCol>
              <MDBCol md="6">
                <div className="mb-3">
                  <div
                    className="img-profile-table"
                    style={{ backgroundImage: `url(${ImgProfile})` }}
                  />
                  <span className="username-table">Grant Marshall</span>
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
                        {this.state.sale.buyerID}
                      </span>
                    </h6>
                    <h6>
                      <span className="d-inline font-weight-bold ml-4">
                        {this.state.sale.nOrder}
                      </span>
                    </h6>
                    <h6>
                      <span className="d-inline font-weight-bold ml-4">
                        20/05/2019
                      </span>
                    </h6>
                    <h6>
                      <span className="d-inline font-weight-bold ml-4">30</span>
                    </h6>
                    <h6>
                      <span className="d-inline font-weight-bold ml-4">
                        {this.state.sale.price}
                      </span>
                    </h6>
                    <h6>
                      <span className="d-inline font-weight-bold ml-4">
                        {this.state.sale.color}
                      </span>
                    </h6>
                    <h6>
                      <span className="d-inline font-weight-bold ml-4">
                        {this.state.sale.size}
                      </span>
                    </h6>
                  </div>
                </div>
                <small className="text-black-50">Status</small>
                <hr />
                <label
                  className="CustomlabelSales text-center"
                  htmlFor="upload-photo">
                  <MDBIcon icon="file-upload" className="mb-4 pbs-4" /> Upload
                  Image
                </label>
                {uploadFile}
                <img
                  width="100%"
                  src={this.state.picture}
                  className="mt-2 pt-2"
                  alt=""
                />
                {this.state.picture ? (
                  <p className="text-center">
                    <a
                      href={this.state.picture}
                      rel="noopener noreferrer"
                      target="_blank">
                      Download
                    </a>
                  </p>
                ) : (
                  ''
                )}

                <MDBInput
                  type="textarea"
                  label="Comment"
                  rows="2"
                  className="mt-2 pt-2"
                />
                <div className="d-flex justify-content-center mt-4">
                  <MDBBtn className="btn btn-circle">Send</MDBBtn>
                </div>
              </MDBCol>
              <MDBCol md="2" className="mb-3">
                <h5>Total Sales</h5>
                <h6 className="text-primary">
                  <span className="font-weight-bold">80</span> Sales
                </h6>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default SalesDetailView;
