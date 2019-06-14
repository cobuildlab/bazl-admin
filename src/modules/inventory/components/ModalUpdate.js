import React, { Component } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBRow,
  MDBCol,
} from 'mdbreact';

class ModalUpdate extends Component {
    state = {
      modal: false,
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
        

              < MDBBtn className = "btn btn-circle-success mt-4 mb-5"
                onClick = {
                  this.toggle
                } > Update </MDBBtn> 
              
        <MDBModal centered size="sm" isOpen = {
          this.state.modal
        }
        toggle = {
          this.toggle
        } >
          <MDBModalBody>
            ¿Are you shure to update this product? </MDBModalBody> 
          <MDBRow>
            <MDBCol>
              < MDBBtn className = "btn btn-circle-success mt-4 mb-6" onClick = {this.confirmAction}
              > Update </MDBBtn> 
              < MDBBtn className = "btn btn-circle-danger mt-4 mb-6"
                onClick = {
                  this.toggle
                } > Cancel </MDBBtn> 
            </MDBCol>
          </MDBRow> </MDBModal></>
      );
    }
}

export default ModalUpdate;