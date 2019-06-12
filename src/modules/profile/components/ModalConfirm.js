import React from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalFooter } from 'mdbreact';
import PropTypes from 'prop-types';

import Logo from '../../../assets/img/Bazl-logo.png';

/**
 * @param {{ children: React.ReactChildren, innerText: string, isOpen: boolean, onToggle: () => void  }} Props
 */

const ModalConfirm = ({ children, innerText, isOpen, onToggle }) => (
  <MDBContainer>
    <MDBModal isOpen={isOpen} toggle={onToggle && onToggle} size="md">
      <MDBModalBody className="p-0">
        <div className="d-flex justify-content-center p-4">
          <img src={Logo} alt="logo" className="img-fluid" />
        </div>
        <h6 className="d-flex justify-content-center p-4">{innerText}</h6>
      </MDBModalBody>
      <MDBModalFooter>{children}</MDBModalFooter>
    </MDBModal>
  </MDBContainer>
);

ModalConfirm.propTypse = {
  children: PropTypes.any,
  innerText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func,
};

export default React.memo(ModalConfirm);
