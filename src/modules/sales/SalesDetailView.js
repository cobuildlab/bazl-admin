import React from 'react';
import View from 'react-flux-state';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';
import SidebarComponent from '../../components/SidebarComponent';
import {
  salesStore,
  DETAIL_EVENT,
  STAT_EVENT,
  UPLOAD_EVENT,
  COMMENT_EVENT,
  COMMENT_ERROR,
} from './sales-store';
import {
  detailFetch,
  changeStatus,
  detailUpload,
  updateCommentAction,
} from './sales-action';
import { landingStore, USER_EVENT } from '../landing/landing-store';
import { Loader } from '../../components/Loader';
import { SalesDetailViewInformation } from './components/SalesDetailViewInformation';

class SalesDetailView extends View {
  constructor(props) {
    super(props);
    this.state = {
      sale: {},
      key: '',
      picture: '',
      shippedStatus: '2',
      user: landingStore.getState(USER_EVENT),
      loading: true,
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
    this.subscribe(salesStore, COMMENT_EVENT, (sale) => {
      toast.success('Comment Sent Successful');
    });
    this.subscribe(salesStore, COMMENT_ERROR, (e) => {
      toast.error('Comment Sent Failed');
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

  commentSales = (comment, index) => {
    this.setState({ loading: true }, () => {
      updateCommentAction({ ...comment }, index);
    });
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
                  <SalesDetailViewInformation
                    key={index}
                    product={product}
                    index={index}
                    sale={sale}
                    commentSales={this.commentSales}
                  />
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
