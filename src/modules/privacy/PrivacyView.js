import React from 'react';
import { MDBIcon, MDBContainer, MDBAnimation } from 'mdbreact';
import SidebarComponent from '../../components/SidebarComponent';
import { Link } from 'react-router-dom';
// import TableSales from './TableSalesView';

class TermsView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SidebarComponent>
          <div className="d-flex justify-content-between nav-admin body">
            <div>
              <h2 className="m-0">Privacy Policy</h2>
            </div>
            <div>
              <Link
                to="/privacy-policy"
                className="btn btn-circle btn-circle-link">
                Upload <MDBIcon icon="upload" className="ml-1" />
              </Link>
            </div>
          </div>
          <MDBAnimation type="fadeIn">
            <MDBContainer fluid className="body">
              {/* <TableSales /> */}
            </MDBContainer>
          </MDBAnimation>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default TermsView;
