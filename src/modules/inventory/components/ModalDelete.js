import React, { Component } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBRow,
  MDBCol,
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
               
        <MDBModal centered size="sm" className="modal-notify modal-danger" isOpen = {
          this.state.modal
        }
        toggle = {
          this.toggle
        } >
          <MDBModalBody>
            ¿Are you shure to delete this product? </MDBModalBody> 
          <MDBRow>
            <MDBCol>
              < MDBBtn className = "btn btn-circle-success mt-4 mb-6" onClick = {this.confirmAction}
              > Delete </MDBBtn> 
              < MDBBtn className = "btn btn-circle-danger mt-4 mb-6"
                onClick = {
                  this.toggle
                } > Cancel </MDBBtn> 
            </MDBCol>
          </MDBRow> </MDBModal></>
       );
     }
}

export default ModalDelete;