import React from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBBtn } from "mdbreact";
import View from "react-flux-state";
import Logo from "../../../assets/img/Bazl-logo.png";

class ModalComponentTerms extends View {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal
    };
  }

  render() {
    const { toggleModal } = this.props;
    let { modal } = this.state;
    console.log("Estado de la modal",modal);
    
    return (
      <MDBContainer className="p-0">
        <MDBModal isOpen={modal} toggle={toggleModal} size="lg">
          <MDBModalBody className="p-0">
            <div className="d-flex justify-content-center p-4">
              <img src={Logo} alt="Bazl" className="img-fluid" />              
            </div>
            <h1 className="d-flex justify-content-center p-4">Terms of services and privacy policy</h1>

            <MDBModalFooter >
              <MDBBtn onClick={() => toggleModal()}>Close</MDBBtn>
            </MDBModalFooter>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  };
}

export default ModalComponentTerms;
