import React from 'react';
import {
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from 'mdbreact';
import { Button } from 'reactstrap';
import View from 'react-flux-state';
import Logo from '../../../assets/img/Bazl-logo.png';

class ModalComponentTerms extends View {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      status: !prevState.status,
    }));
  };

  render() {
    let { linkName } = this.props;
    let { status } = this.state;
    return (
      <MDBContainer className="p-0">
        <Button
          color="link"
          className="btnLink"
          onClick={() => this.toggleModal()}>
          {linkName}
        </Button>
        <MDBModal isOpen={status} toggle={this.toggleModal} size="lg">
          <MDBModalBody className="p-0">
            <div className="d-flex justify-content-center p-4">
              <img src={Logo} alt="Bazl" className="img-fluid" />
            </div>
            <h1 className="d-flex justify-content-center p-4">
              Terms of services and privacy policy
            </h1>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp;Cras mattis consectetur purus sit amet
              fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
              quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
              eros. Praesent commodo cursus magna, vel scelerisque nisl
              consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
              faucibus dolor auctor. Aenean lacinia bibendum nulla sed
              consectetur. Praesent commodo cursus magna, vel scelerisque nisl
              consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
              metus auctor fringilla. Cras mattis consectetur purus sit amet
              fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
              quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
              eros. Praesent commodo cursus magna, vel scelerisque nisl
              consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
              faucibus dolor auctor. Aenean lacinia bibendum nulla sed
              consectetur. Praesent commodo cursus magna, vel scelerisque nisl
              consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
              metus auctor fringilla. Cras mattis consectetur purus sit amet
              fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
              quam. Morbi leo risus, porta ac consectetur ac, vestibulum at
              eros.
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp;Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
              laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
              nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec
              ullamcorper nulla non metus auctor fringilla. Cras mattis
              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
              vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
              augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
              bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec
              ullamcorper nulla non metus auctor fringilla. Cras mattis
              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </p>
            <p>
              &nbsp; &nbsp; &nbsp; &nbsp;Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
              laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
              nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec
              ullamcorper nulla non metus auctor fringilla. Cras mattis
              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros. Praesent commodo cursus magna,
              vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
              augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
              bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec
              ullamcorper nulla non metus auctor fringilla.
            </p>
            <MDBModalFooter>
              <MDBBtn onClick={() => this.toggleModal()}>Close</MDBBtn>
            </MDBModalFooter>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ModalComponentTerms;
