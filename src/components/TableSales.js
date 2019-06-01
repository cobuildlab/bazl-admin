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
      sales : {},
      key: ''

    };
    this.changeStatus = this.changeStatus.bind(this);
  }

  changeStatus(){
   
  }

   componentDidMount(){
 this.subscribe(salesStore, SALE_EVENT, (sale) => {

      const keys = sale.id;
      const sales = sale;
      this.setState({
        sales : sales,
        key : keys
      });
      
       
     });
      fetchSales();
 }

  render() {
   
     let statBtn;
     if (this.state.sales.status) {
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
                  <td>{this.state.sales.price}</td>
                  <td></td>
                  <td>{this.state.sales.nOrder}</td>
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
