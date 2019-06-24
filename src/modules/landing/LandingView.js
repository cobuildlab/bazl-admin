import React from 'react';
import {
  MDBContainer,
  MDBView,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBFooter,
} from 'mdbreact';
import bgLanding from '../../assets/img/background.png';
import Logo from '../../assets/img/Bazl-logo.png';
import PhoneApp from '../../assets/img/phoneApp.png';
import ModalComponent from './components/ModalComponent';

class LandingView extends React.Component {
  render() {
    return (
      <div>
        <div className="d-flex justify-content-between navbar-landing">
          <div>
            <img
              src={Logo}
              alt="Bazl"
              className="img-fluid img-logo"
              width="95"
            />
          </div>
          <div className="d-flex">
            <span>
              <ModalComponent linkName="Login" history={this.props.history} />
            </span>

            <span>
              <ModalComponent linkName="Sign Up" history={this.props.history} />
            </span>
          </div>
        </div>
        <MDBView src={bgLanding}>
          <MDBMask className="d-flex justify-content-center">
            <MDBContainer className="">
              <MDBRow className="view-content-landing">
                <div className="text-center text-md-left col-md-8">
                  <h1 className="text-primary landing-letters">
                    Lorem <b>ipsum</b> dolor sit amet, consectetur{' '}
                    <b>adipiscing</b> elit
                  </h1>
                  <h6 className="mb-4 text-primary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </h6>
                </div>
                <MDBCol md="4" xl="4" className="d-flex align-items-center">
                  <img
                    src={PhoneApp}
                    alt=""
                    className="img-fluid m-auto"
                    width="50%"
                  />
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
        <MDBFooter
          style={{ position: 'absolute', width: '100%', padding: '10px' }}
          color="primary-plantilla"
          className="footer-copyright text-center">
          Copyright: &copy; Bazl {new Date().getFullYear()} |{' '}
          <a href="/privacy">Privacy Policy</a> |{' '}
          <a href="/terms">Terms and Conditions</a>
        </MDBFooter>
      </div>
    );
  }
}

export default LandingView;
