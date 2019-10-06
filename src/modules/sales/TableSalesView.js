import React from 'react';
import View from 'react-flux-state';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
// import ImgProfile from '../../assets/img/profile-table.jpg';
import { fetchSales, fetchSalesImg } from './sales-action';
import { salesStore, SALE_EVENT, IMG_EVENT_SALE } from './sales-store';

class TableSales extends View {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
    };
  }

  componentDidMount() {
    this.subscribe(salesStore, SALE_EVENT, (sale) => {
      const sales = sale;
      fetchSalesImg(sales);
      this.setState({
        sales,
      });
    });
    this.subscribe(salesStore, IMG_EVENT_SALE, (sale) => {
      const sales = sale;
      this.setState({
        sales,
      });
    });
    fetchSales();
  }

  salesList() {
    const list = this.state.sales;
    let statBtn;
    return list.map((sale) => {
      let status = '';
      if (sale.orderStatus === 'open' || sale.orderStatus === 'Open') {
        status = 'Open';
      } else if (sale.orderStatus === 'shipped') {
        status = 'Shipped';
      } else {
        status = 'Close';
      }

      return (
        <MDBTableBody key={sale.id}>
          <tr>
            <td>
              <div
                className="img-profile-table"
                style={{ backgroundImage: `url(${sale.buyerImg})` }}
                // style={{ backgroundImage: `url(${ImgProfile})` }}
              />
              {/* <span className="username-table">{sale.controlNumber}</span> */}
            </td>
            <td>${sale.orderTotalAmount}</td>
            <td>{moment(sale.orderDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td>{sale.orderControlNumber}</td>
            <td>{status}</td>
            <td>
              <Link
                to={`/order-details/${sale.id}`}
                className="btn btn-circle btn-circle-link">
                Order Details
              </Link>
              {statBtn}
            </td>
          </tr>
        </MDBTableBody>
      );
    });
  }

  render() {
    return (
      <MDBRow>
        <MDBCol md="12" className="p-0">
          <MDBTable borderless responsive>
            <MDBTableHead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Date</th>
                <th>Order No</th>
                <th>Estatus</th>
                <th></th>
              </tr>
            </MDBTableHead>
            {this.salesList()}
          </MDBTable>
        </MDBCol>
      </MDBRow>
    );
  }
}
export default TableSales;
