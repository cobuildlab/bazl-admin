import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn
} from "mdbreact";
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
                  <MDBBtn color="default" className="btn btn-circle m-0">
                    Order Details
                  </MDBBtn>
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
                  <MDBBtn color="default" className="btn btn-circle m-0">
                    Order Details
                  </MDBBtn>
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
