import React from "react";
import { MDBIcon, MDBContainer } from "mdbreact";
import SidebarComponent from "../../../components/SidebarComponent";

import { Link } from "react-router-dom";
import TableSales from "../../../components/TableSales";

class SalesView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SidebarComponent>
          <div className="d-flex justify-content-between nav-admin body">
            <div>
              <h2 className="m-0">Sales</h2>
            </div>
            <div>
              <Link
                to="/new-product"
                className="btn btn-circle btn-circle-link"
              >
                Upload <MDBIcon icon="upload" className="ml-1" />
              </Link>
            </div>
          </div>
          <MDBContainer fluid className="body">
            <TableSales />
          </MDBContainer>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default SalesView;
