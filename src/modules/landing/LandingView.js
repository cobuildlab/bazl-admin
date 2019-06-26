import React from 'react';
import { Link } from 'react-router-dom';
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
                    {/* Lorem <b>ipsum</b> dolor sit amet, consectetur{' '}
                    <b>adipiscing</b> elit */}
                    <b>1.)</b> Upload Inventory
                    <br />
                    <b>2.)</b> Recruit Influencers (We can help with this)
                    <br />
                    <b>3.)</b> Make Sales
                    <br />
                  </h1>
                  <h6 className="mb-4 text-primary">
                    {`At Bazl, Merchants don't pay for ad space. We believe in growth through organic 
                  advertising, therefore, we enable your consumers, supporters, friends, family, etc to make money from 
                  posting a photo of your products. After all, word-of-mouth advertising will always be the most effective.`}
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
          <Link to="/terms-services">Privacy Policy</Link> |{' '}
          <Link to="/terms-services">Terms and Conditions</Link>
        </MDBFooter>
      </div>
    );
  }
}

export default LandingView;
