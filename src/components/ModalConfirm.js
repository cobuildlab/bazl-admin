import React from 'react';
import {
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from 'mdbreact';
import Logo from '../assets/img/Bazl-logo.png';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ModalConfirm = (props) => {
  const { onClose, text, onOk, open } = props;
  return (
    <MDBContainer className="p-0">
      <MDBModal isOpen={open} size="lg">
        <MDBModalBody className="p-0">
          <div className="d-flex justify-content-center p-4">
            <img src={Logo} alt="Bazl" className="img-fluid" />
          </div>
          <h1 className="d-flex justify-content-center p-4">{text}</h1>
          <MDBModalFooter>
            <Button
              active={false}
              className="link-logout text-left"
              onClick={onOk}>
              OK
            </Button>
            <MDBBtn onClick={onClose}>Close</MDBBtn>
          </MDBModalFooter>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

ModalConfirm.propTypes = {
  text: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default ModalConfirm;
