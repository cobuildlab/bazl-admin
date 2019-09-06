import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBRow, MDBCol } from 'mdbreact';

class ModalComponent extends Component {
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
    let disabled;
    if (this.props.allValid === false) {
      disabled = true;
    } else {
      disabled = false;
    }
    return (
      <>
        <MDBBtn
          disabled={disabled}
          className="btn btn-circle mt-4 mb-5"
          onClick={this.toggle}>
          {' '}
          Publish{' '}
        </MDBBtn>

        <MDBModal
          size="sm"
          centered
          className="modal-notify"
          isOpen={this.state.modal}
          toggle={this.toggle}>
          <MDBModalBody>
            ¿Are you shure to publish this new product?{' '}
            {/* <h6><strong>Extra commission and additional fee shouldn’t be required</strong></h6> */}
          </MDBModalBody>
          <MDBRow>
            <MDBCol>
              <MDBBtn
                className="btn btn-circle-success mt-4 mb-6"
                onClick={this.confirmAction}>
                {' '}
                Publish{' '}
              </MDBBtn>
              <MDBBtn
                className="btn btn-circle-danger mt-4 mb-6"
                onClick={this.toggle}>
                {' '}
                Cancel{' '}
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBModal>
      </>
    );
  }
}

export default ModalComponent;
