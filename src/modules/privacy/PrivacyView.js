import React from 'react';
import { MDBContainer, MDBAnimation } from 'mdbreact';
import Logo from '../../assets/img/Bazl-logo.png';
import SidebarComponent from '../../components/SidebarComponent';
import { PrivacyPolicy } from '../../components/TermsComponent';

class PrivacyView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SidebarComponent>
          <MDBAnimation type="fadeIn">
            <MDBContainer fluid className="body">
              <div className="d-flex justify-content-center p-4">
                <img src={Logo} alt="Bazl" className="img-fluid" />
              </div>
              <PrivacyPolicy />
            </MDBContainer>
          </MDBAnimation>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export { PrivacyView };
