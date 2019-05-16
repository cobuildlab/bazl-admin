import React from "react";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody } from "mdbreact";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import TabComponent from "./TabComponent";
import FormLogin from "./FormLogin";

import Logo from "../assets/img/Bazl-logo.png";
import FormSignUp from "./FormSignUp";

const ModalComponent = ({ linkName }) => {
  const [selectTab, setSelectTab] = React.useState("0");
  const [status, setStatus] = React.useState(false);

  function toggleModal(option) {
    setStatus(prevState => !prevState);
    setSelectTab(option === "Login" ? "0" : "1");
  }

  return (
    <MDBContainer className="p-0">
      <Button
        color="link"
        className="btnLink"
        onClick={() => toggleModal(linkName)}
      >
        {linkName}
      </Button>
      <MDBModal isOpen={status} toggle={toggleModal} size="sm">
        <MDBModalBody className="p-0">
          <div className="d-flex justify-content-center p-4">
            <img src={Logo} alt="Bazl" className="img-fluid" />
          </div>
          <TabComponent
            defaultTab={selectTab}
            tabs={[
              { tabName: "Login", JSX: <FormLogin /> },
              { tabName: "Sign Up", JSX: <FormSignUp /> }
            ]}
          />
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

ModalComponent.propTypes = {
  linkName: PropTypes.string.isRequired
};

export default ModalComponent;
