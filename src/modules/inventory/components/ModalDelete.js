import React, { Component } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from 'mdbreact';

class ModalDelete extends Component {
    state = {
      modal: false,
      action: this.props.action,
    }

    toggle = () => {
      this.setState({
        modal: !this.state.modal,
      });
    }

     confirmAction = () =>{
      
      const isConfirmed = true;
      this.props.callbackFromParent(isConfirmed);
    }

    render() {
      return ( 
      
      <>
                < MDBBtn className = "btn btn-circle-danger mt-4 mb-5"
                    onClick = {
                        this.toggle
                    } > Delete </MDBBtn> 
               
        <MDBModal isOpen = {
          this.state.modal
        }
        toggle = {
          this.toggle
        } >
          <MDBModalHeader toggle = {
            this.toggle
          }> Bazl </MDBModalHeader> <MDBModalBody>
            ¿Are you shure to delete this product? </MDBModalBody> 
          <MDBModalFooter >
            < MDBBtn className = "btn btn-circle-success mt-4 mb-6" onClick = {this.confirmAction}
             > Delete </MDBBtn> 
            < MDBBtn className = "btn btn-circle-danger mt-4 mb-6"
            onClick = {
                this.toggle
            } > Cancel </MDBBtn> 
          </MDBModalFooter> </MDBModal></>
      );
    }
}

export default ModalDelete;