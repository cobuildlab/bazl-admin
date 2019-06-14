import React from 'react';
import {
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from 'mdbreact';
import Logo from '../assets/img/Bazl-logo.png';
import PropTypes from 'prop-types';

const ModalConfirm = (props) => {
  const { onClose, text, onOk, open } = props;
  return (
    <MDBContainer className="p-0">
      <MDBModal isOpen={open} toggle={onClose} size="md">
        <MDBModalBody className="p-0">
          <div className="d-flex justify-content-center p-4">
            <img src={Logo} alt="Bazl" className="img-fluid" />
          </div>
          <h6 className="d-flex justify-content-center p-4">{text}</h6>
          <MDBModalFooter>
            <MDBBtn color="danger" size="sm" onClick={onOk}>
              OK
            </MDBBtn>
            <MDBBtn size="sm" onClick={onClose}>
              CANCEL
            </MDBBtn>
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

export { ModalConfirm };
