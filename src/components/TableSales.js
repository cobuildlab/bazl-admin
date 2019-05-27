import React from "react";
import { Link } from "react-router-dom";
import { MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import ImgProfile from "../assets/img/profile-table.jpg";

class TableSales extends React.Component {
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
                    to="/order-detail"
                    className="btn btn-circle btn-circle-link"
                  >
                    Order Details
                  </Link>
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
              </tr>
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
      </MDBRow>
    );
  }
}
export default TableSales;
