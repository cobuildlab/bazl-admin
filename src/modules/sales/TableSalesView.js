import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
} from 'mdbreact';
import ImgProfile from '../../assets/img/profile-table.jpg';
import { fetchSales } from './sales-action';
import { salesStore, SALE_EVENT } from './sales-store';
import View from 'react-flux-state';
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

      this.setState({
        sales: sales,
      });
    });
    fetchSales();
  }

  salesList() {
    const list = this.state.sales;
    let statBtn;

    return list.map((sale) => {
      if (sale.status && sale.shippedStatus === '1') {
        statBtn = (
          <MDBBtn className="btn btn-circle-success" disabled>
            Active Sale
          </MDBBtn>
        );
      } else if (sale.status && sale.shippedStatus === '2') {
        statBtn = (
          <MDBBtn className="btn btn-circle-success" disabled>
            Shipped Sale
          </MDBBtn>
        );
      } else {
        statBtn = (
          <MDBBtn className="btn btn-circle-danger" disabled>
            Closed Sale
          </MDBBtn>
        );
      }
      return (
        <MDBTableBody key={sale.saleID}>
          <tr>
            <td>
              <div
                className="img-profile-table"
                style={{ backgroundImage: `url(${ImgProfile})` }}
              />
              <span className="username-table">{sale.buyerID}</span>
            </td>
            <td>{sale.price}</td>
            <td></td>
            <td>{sale.nOrder}</td>
            <td>
              <Link
                to={`/order-details/${sale.saleID}`}
                className="btn btn-circle btn-circle-link">
                Order Details
              </Link>
            </td>
            <td>{statBtn}</td>
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
                <th> </th>
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
