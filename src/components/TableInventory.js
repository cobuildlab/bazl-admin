import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn
} from "mdbreact";
import ImgProduct from "../assets/img/ropa-dama.jpg";

class TableInventory extends React.Component {
  render() {
    return (
      <MDBRow>
        <MDBCol md="12" className="p-0">
          <MDBTable borderless responsive>
            <MDBTableHead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Comissions</th>
                <th>Additional Fee</th>
                <th># of posts</th>
                <th> </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>
                  <div
                    className="img-profile-table"
                    style={{ backgroundImage: `url(${ImgProduct})` }}
                  />
                  <span className="username-table">@username</span>
                </td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
                <td>15</td>
                <td>$30</td>
                <td>3%</td>
                <td>1%</td>
                <td>5</td>
                <td>
                  <MDBBtn color="default" className="btn btn-circle m-0">
                    Details
                  </MDBBtn>
                </td>
              </tr>
              <tr>
                <td>
                  <div
                    className="img-profile-table"
                    style={{ backgroundImage: `url(${ImgProduct})` }}
                  />
                  <span className="username-table">@username</span>
                </td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
                <td>15</td>
                <td>$30</td>
                <td>3%</td>
                <td>1%</td>
                <td>5</td>
                <td>
                  <MDBBtn color="default" className="btn btn-circle m-0">
                    Details
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
export default TableInventory;
