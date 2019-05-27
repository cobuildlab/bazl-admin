import React from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBContainer,
  MDBView,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBAnimation
} from "mdbreact";
import bgLanding from "../../assets/img/background.png";
import Logo from "../../assets/img/Bazl-logo.png";
import Phone from "../../assets/img/phone.png";
import ModalComponent from "../../components/ModalComponent";

class LandingView extends React.Component {
  state = {
    collapsed: false
  };

  handleTogglerClick = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <div
        style={{
          background: `url(${bgLanding})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh"
        }}
      >
        <MDBNavbar
          className="z-depth-0"
          color="primary-color"
          dark
          expand="md"
          fixed="top"
          transparent
        >
          <MDBContainer>
            <MDBNavbarBrand>
              <img src={Logo} alt="Bazl" className="img-fluid" width="70" />
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.handleTogglerClick} />
            <MDBCollapse isOpen={this.state.collapsed} navbar>
              <MDBNavbarNav right>
                <MDBNavItem active>
                  <ModalComponent linkName="Login" />
                </MDBNavItem>
                <MDBNavItem>
                  <ModalComponent linkName="Sign Up" />
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        <MDBView src={bgLanding}>
          <MDBMask className="d-flex justify-content-start align-items-center">
            <MDBContainer>
              <MDBRow>
                <MDBCol md="8" className="mb-4">
                  <MDBAnimation type="fadeInLeft">
                    <h1 className="h1-reponsive mb-4 pt-md-5 pt-5 text-primary ">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </h1>
                    <h6 className="mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.
                    </h6>
                  </MDBAnimation>
                </MDBCol>
                <MDBCol md="4">
                  <MDBAnimation type="fadeInRight">
                    <img
                      src={Phone}
                      alt="phone"
                      className="img-fluid"
                      width="50%"
                    />
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    );
  }
}

export default LandingView;
