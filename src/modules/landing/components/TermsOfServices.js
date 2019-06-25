import React from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBView, MDBAnimation, MDBFooter } from 'mdbreact';
import bgLanding from '../../../assets/img/background.png';
import Logo from '../../../assets/img/Bazl-logo.png';
import { PrivacyPolicy } from '../../../components/TermsComponent';

const TermsOfServices = () => {
  return (
    <div
      style={{
        background: `url(${bgLanding})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
      }}>
      <MDBView style={{ alignItems: 'center' }} src={bgLanding}>
        <MDBContainer>
          <MDBAnimation type="fadeIn">
            <div className="d-flex justify-content-center p-4">
              <img src={Logo} alt="Bazl" className="img-fluid" />
            </div>
            <b>
              <PrivacyPolicy />
            </b>
            <div className="container p-0 text-center">
              <Link to="/" className="btnLink btn btn-link">
                Home
              </Link>
            </div>
          </MDBAnimation>
        </MDBContainer>
      </MDBView>
      <MDBFooter
        style={{ position: 'fixed', width: '100%', padding: '10px' }}
        color="primary-plantilla"
        className="footer-copyright text-center">
        Copyright: &copy; Bazl {new Date().getFullYear()} |{' '}
        <Link to="/terms-services">Privacy Policy</Link> |{' '}
        <Link to="/terms-services">Terms and Conditions</Link>
      </MDBFooter>
    </div>
  );
};

export { TermsOfServices };
