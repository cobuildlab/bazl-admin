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
      user: landingStore.getState(USER_EVENT),
      loading: true,
    };
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    this.subscribe(salesStore, DETAIL_EVENT, (sale) => {
      const detailSale = sale;
      this.setState({
        sale: detailSale,
        loading: false,
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
      this.props.history.push('/sales');
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

  commentSales = (index) => {
    const { sale } = this.state;
    this.setState({ loading: true }, () => {
      updateCommentAction(sale, index);
    });
  };

  onChange = (index, e) => {
    let { sale } = this.state;
    sale.products[index].comment = e.target.value;
    this.setState({
      sale,
    });
  };

  onImageChange = (index, e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    let state = this.state;

    let kiloByte = parseInt(file.size / 1024);
    if (kiloByte > 2048) {
      toast.error('Image too Large');
      return false;
    }

    reader.onloadend = () => {
      state.sale.products[index].pictureTax = reader.result;
      state.sale.products[index].image = file;
      this.setState({
        state,
      });
    };
    reader.readAsDataURL(file);
  };

  render() {
    let { sale, loading } = this.state;
    let statBtn;

    if (sale.orderStatus === 'open' || sale.orderStatus === 'Open') {
      statBtn = (
        <MDBBtn
          className="btn btn-circle-success"
          value={sale.shippedStatus}
          onClick={(e) => this.closeSale(e)}
          disabled>
          Open Sale
        </MDBBtn>
      );
    } else if (sale.orderStatus === 'shipped') {
      statBtn = (
        <MDBBtn
          className="btn btn-circle-success"
          onClick={(e) => this.closeSale(e)}
          disabled>
          Shipeed Sale
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
            {!loading ? (
              <>
                {sale.products ? (
                  <div>
                    {sale.products.map((product, index) => (
                      <SalesDetailViewInformation
                        key={index}
                        product={product}
                        index={index}
                        commentSales={this.commentSales}
                        onChange={this.onChange}
                        onImageChange={this.onImageChange}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center">
                    <Loader />
                  </div>
                )}
              </>
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
