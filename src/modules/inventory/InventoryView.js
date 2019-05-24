import React from "react";
import { MDBContainer, MDBBtn, MDBIcon } from "mdbreact";
import SidebarComponent from "../../components/SidebarComponent";
import TableInventory from "./components/TableInventory";

class InventoryView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SidebarComponent>
          <div className="d-flex justify-content-between nav-admin body">
            <div className="form-group form-group-search">
              <input
                type="text"
                placeholder="Search"
                className="form-control form-control-search"
                id="formGroupExampleInput"
              />
            </div>

            <div>
              <MDBBtn to="/new-product" className="btn btn-circle">
                Search <MDBIcon icon="search" className="ml-1" />
              </MDBBtn>
            </div>
          </div>
          <MDBContainer className="body" fluid>
            <TableInventory />
          </MDBContainer>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default InventoryView;
