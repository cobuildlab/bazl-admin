import React from "react";
import { MDBContainer, MDBModal, MDBModalBody } from "mdbreact";
import PropTypes from "prop-types";

import Logo from "../assets/img/Bazl-logo.png";

const ModalComponentRecovery = ({ onClick, displayStatus }) => {
  return (
    <MDBContainer className="p-0">
      <p onClick={onClick} className="text-center">
        Don't remember your password?
      </p>
      <MDBModal isOpen={displayStatus} toggle={onClick} size="sm">
        <MDBModalBody className="p-0">
          <div className="d-flex justify-content-center p-4">
            <img src={Logo} alt="Bazl" className="img-fluid" />
          </div>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

ModalComponentRecovery.propTypes = {
  linkName: PropTypes.string.isRequired
};

export default ModalComponentRecovery;
