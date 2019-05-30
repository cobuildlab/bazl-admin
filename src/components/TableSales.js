import React from "react";
import { Link } from "react-router-dom";
import { MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";
import ImgProfile from "../assets/img/profile-table.jpg";
import {fetchSales} from '../modules/sales/sales-action';
class TableSales extends React.Component {
  constructor(props){
    super(props);
    this.state={
      influencer: '',
      nOrder: '',
      date: '',
      quantity: 0,
      price: '',
      color: '',
      size: '',
      status: false,
      picture: null,
      productID: '',
      buyerID: ''
    };
  }

  // componentDidMount(){
  //   const {
  //     influencer,
  //     nOrder,
  //     date,
  //     quantity,
  //     price,
  //     color,
  //     size,
  //     status,
  //     picture,
  //     productID,
  //     buyerID
  //   } = this.state;
  //   this.setState(() =>{
  //     fetchSales();
  //   })
  // }

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
            <MDBTableBody>
              <tr>
                <td>
                  <div
                    className="img-profile-table"
                    style={{ backgroundImage: `url(${ImgProfile})` }}
                  />
                  <span className="username-table">@username</span>
                </td>
                <td>$100</td>
                <td>16/05/2019</td>
                <td>09876543212</td>
                <td>
                  <Link
                    to="/order-details"
                    className="btn btn-circle btn-circle-link"
                  >
                    Order Details
                  </Link>
                </td>
                <td>
                  <MDBBtn className="btn btn-circle-danger">Closed Sale</MDBBtn>
                </td>
              </tr>
              <tr>
                <td>
                  <div
                    className="img-profile-table"
                    style={{ backgroundImage: `url(${ImgProfile})` }}
                  />
                  <span className="username-table">@username</span>
                </td>
                <td>$100</td>
                <td>16/05/2019</td>
                <td>09876543212</td>
                <td>
                  <Link
                    to="/order-detail"
                    className="btn btn-circle btn-circle-link"
                  >
                    Order Details
                  </Link>
                </td>
                <td> <MDBBtn className="btn btn-circle-danger">Closed Sale</MDBBtn></td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
      </MDBRow>
    );
  }
}
export default TableSales;
