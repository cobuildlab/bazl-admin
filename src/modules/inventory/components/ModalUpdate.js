import React, { Component } from 'react';
import {
  // MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from 'mdbreact';
import PropTypes from 'prop-types';

class ModalUpdate extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  confirmAction = () => {
    const isConfirmed = true;
    this.props.callbackFromParent(isConfirmed);
  };

  render() {
    return (
      <>
        <MDBBtn
          className="btn btn-circle-success mt-4 mb-5"
          onClick={this.toggle}>
          {' '}
          Update{' '}
        </MDBBtn>

        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}> Bazl </MDBModalHeader>{' '}
          <MDBModalBody>¿Are you shure to Update this product? </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              className="btn btn-circle-success mt-4 mb-6"
              onClick={this.confirmAction}>
              {' '}
              Save changes{' '}
            </MDBBtn>
            <MDBBtn
              className="btn btn-circle-danger mt-4 mb-6"
              onClick={this.toggle}>
              {' '}
              Cancel{' '}
            </MDBBtn>
          </MDBModalFooter>{' '}
        </MDBModal>
      </>
    );
  }
}

ModalUpdate.propTypes = {
  callbackFromParent: PropTypes.func.isRequired,
};

export default ModalUpdate;
