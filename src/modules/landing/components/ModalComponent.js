import React from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBModal, MDBModalBody } from "mdbreact";
import { Button } from "reactstrap";
import FormLogin from "./FormLogin";
import View from "react-flux-state";
import Logo from "../../../assets/img/Bazl-logo.png";
import FormSignUp from "./FormSignUp";

class ModalComponent extends View {
  constructor(props) {
    super(props);
    this.state = {
      selectTab: "0",
      status: false
    };
  }

  toggleModal = (option) => {
    console.log("option", option);
    if (option === "Login") { 
      this.setState({ selectTab: "0" });
    } else {
      this.setState({ selectTab: "1" });
    }

    this.setState(prevState => ({
      status: !prevState.status
    }));
  }

  onFlag = (option) => {
    if (option === "Login") { 
      this.setState({ selectTab: "0" });
    } else {
      this.setState({ selectTab: "1" });
    }
  }

  render() {
    let { linkName, history } = this.props;
    let { selectTab, status} = this.state;
    return (
      <MDBContainer className="p-0">
        <Button
          color="link"
          className="btnLink"
          onClick={() => this.toggleModal(linkName)}
        >
          {linkName}
        </Button>
        <MDBModal isOpen={status} toggle={this.toggleModal} size="sm">
          <MDBModalBody className="p-0">
            <div className="d-flex justify-content-center p-4">
              <img src={Logo} alt="Bazl" className="img-fluid" />
            </div>
            {selectTab === '0' ? (
              <div>
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <Link onClick={() => this.onFlag("Login")} className="active nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={() => this.onFlag("SignUp")} className="nav-link">SignUp</Link>
                  </li>
                </ul>
                <FormLogin history={history} />
              </div>
            ) : (
                <div>
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <Link onClick={() => this.onFlag("Login")} className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link onClick={() => this.onFlag("SignUp")} className="active nav-link">SignUp</Link>
                    </li>
                  </ul>
                  <FormSignUp history={history} />
                </div>
              )}
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  };
}


// ModalComponent.propTypes = {
//   linkName: PropTypes.string.isRequired,
//   history: PropTypes.string
// };

export default ModalComponent;
