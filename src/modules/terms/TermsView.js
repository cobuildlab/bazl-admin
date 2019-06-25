import React from 'react';
import { MDBContainer, MDBAnimation } from 'mdbreact';
import Logo from '../../assets/img/Bazl-logo.png';
import SidebarComponent from '../../components/SidebarComponent';
import { TermsConditions } from '../../components/TermsComponent';

class TermsView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SidebarComponent>
          <MDBAnimation type="fadeIn">
            <MDBContainer fluid className="body">
              <div className="d-flex justify-content-center p-4">
                <img src={Logo} alt="Bazl" className="img-fluid" />
              </div>
              <TermsConditions />
            </MDBContainer>
          </MDBAnimation>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export { TermsView };
