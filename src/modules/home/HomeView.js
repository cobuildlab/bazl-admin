import React from "react";
import SidebarComponent from "../../components/SidebarComponent";
import { MDBIcon, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import SliderCards from "../../components/SliderCards";
import TableSales from "../../components/TableSales";

import { Link } from "react-router-dom";

class HomeView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SidebarComponent>
          <div className="d-flex justify-content-between nav-admin body">
            <div>
              <h2 className="m-0">Home</h2>
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
          <MDBContainer className="body" fluid>
            <MDBRow>
              <MDBCol>
                <h4 className="font-weight-bold text-black-50">Total Tags</h4>
                <h6 className="text-primary font-weight-bold">
                  30
                  <small className="font-weight-normal"> Tag</small>
                </h6>
              </MDBCol>
              <MDBCol>
                <h4 className="font-weight-bold text-black-50">
                  Total Impressions
                </h4>
                <h6 className="text-primary font-weight-bold">
                  30 <small>Impressions</small>
                </h6>
              </MDBCol>
              <MDBCol>
                <h4 className="font-weight-bold text-black-50">Total Sales</h4>
                <h6 className="text-primary font-weight-bold">
                  80 <small>Sales</small>
                </h6>
              </MDBCol>
              <MDBCol>
                <h4 className="font-weight-bold text-black-50">
                  Total Products
                </h4>
                <h6 className="text-primary font-weight-bold">
                  30 <small>View</small>
                </h6>
              </MDBCol>
            </MDBRow>
            <SliderCards />
            <MDBCol md="12" className="p-0">
              <h6 className="mt-5 mb-3">Recent Sales</h6>
            </MDBCol>
            <TableSales />
          </MDBContainer>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default HomeView;