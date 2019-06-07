import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn
} from "mdbreact";
import { Link } from "react-router-dom";
import ImgProduct from '../../../assets/img/ropa-dama.jpg';
import { inventoryStore } from "../inventory-store";

class TableInventory extends React.Component {
  
  render() {
    const inventory = this.props.products;

    const table = inventory.map(product =>{
      
       return (
            <MDBTableBody key = {product.productID}>
              <tr>
                <td>
                  <div
                    className="img-profile-table"
                    style={{ backgroundImage: `url(${product.picture})` }}
                  />
                  <span className="username-table">{product.name}</span>
                </td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.commision}</td>
                <td>{product.additionalFee}</td>
                <td>5</td>
                <td>
               <Link
                 to={`/inventory-details/${product.productID}`}
                 className="btn btn-circle btn-circle-link"
               >
                 Order Details
                  </Link>
                </td>
              </tr>
            </MDBTableBody>
         
    );
       });

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
          {table}
          </MDBTable>
        </MDBCol>
      </MDBRow>);


    

   
  }
}
export default TableInventory;
