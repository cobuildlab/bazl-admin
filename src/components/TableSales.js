import React from "react";
import { Link } from "react-router-dom";
import { MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdbreact";
import ImgProfile from "../assets/img/profile-table.jpg";
import {fetchSales} from '../modules/sales/sales-action';
import {salesStore, SALE_EVENT} from '../modules/sales/sales-store';
import View from 'react-flux-state';
class TableSales extends View {
  constructor(props){
    super(props);
    this.state={
      sales : [],
      status: true

    };
    this.changeStatus = this.changeStatus.bind(this);
  }

  changeStatus(){
    this.setState((prevState) => {
      return {status : !prevState.status}
    })
    console.log(this.state.status);
  }

   componentDidMount() {
     fetchSales();
 this.subscribe(salesStore, SALE_EVENT, (sale) => {

      const sales = sale;
      this.setState(this.state.sales = sales);
      console.log(this.state.sales.status);
       
     });
 }

  render() {
    let statBtn;
    if (this.state.status) {
      statBtn = <MDBBtn className="btn btn-circle" onClick={() => this.changeStatus()}>Active Sale</MDBBtn>
    } else {
      statBtn = <MDBBtn className="btn btn-circle-danger" onClick={() => this.changeStatus()} disabled>Closed Sale</MDBBtn>
    };
  
    
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
                  <span className="username-table">{this.state.sales.buyerID}</span>
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
                  {statBtn}
                  {/* <MDBBtn className="btn btn-circle-danger" onClick={()=>this.changeStatus()}>Closed Sale</MDBBtn> */}
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
