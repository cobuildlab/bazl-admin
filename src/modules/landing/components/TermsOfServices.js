import React from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBView, MDBAnimation, MDBFooter } from 'mdbreact';
import bgLanding from '../../../assets/img/background.png';
import Logo from '../../../assets/img/Bazl-logo.png';

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
            <h1 className="d-flex justify-content-center p-4">
              Terms of services and privacy policy
            </h1>
            <b>
              <p>
                &nbsp; &nbsp; &nbsp; &nbsp;Cras mattis consectetur purus sit
                amet fermentum. Cras justo odio, dapibus ac facilisis in,
                egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros. Praesent commodo cursus magna, vel
                scelerisque nisl consectetur et. Vivamus sagittis lacus vel
                augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
                bibendum nulla sed consectetur. Praesent commodo cursus magna,
                vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                ullamcorper nulla non metus auctor fringilla. Cras mattis
                consectetur purus sit amet fermentum. Cras justo odio, dapibus
                ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean
                lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
                consectetur purus sit amet fermentum. Cras justo odio, dapibus
                ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
              </p>
              <p>
                &nbsp; &nbsp; &nbsp; &nbsp;Praesent commodo cursus magna, vel
                scelerisque nisl consectetur et. Vivamus sagittis lacus vel
                augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
                bibendum nulla sed consectetur. Praesent commodo cursus magna,
                vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                ullamcorper nulla non metus auctor fringilla. Cras mattis
                consectetur purus sit amet fermentum. Cras justo odio, dapibus
                ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean
                lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
                consectetur purus sit amet fermentum. Cras justo odio, dapibus
                ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
              </p>
              <p>
                &nbsp; &nbsp; &nbsp; &nbsp;Praesent commodo cursus magna, vel
                scelerisque nisl consectetur et. Vivamus sagittis lacus vel
                augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
                bibendum nulla sed consectetur. Praesent commodo cursus magna,
                vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                ullamcorper nulla non metus auctor fringilla. Cras mattis
                consectetur purus sit amet fermentum. Cras justo odio, dapibus
                ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean
                lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla.
              </p>
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
        <a href="#">Privacy Policy</a> | <a href="#">Terms and Conditions</a>
      </MDBFooter>
    </div>
  );
};

export { TermsOfServices };
