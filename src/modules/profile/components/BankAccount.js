import React, { Component } from "react";
import * as R from 'ramda';
import {
  MDBIcon,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdbreact";

export class BankAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Id: this.props.account.Id,
      title: this.props.account.title,
      number: this.props.account.number,
    }
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    let { account, onDelete, onEdit, editAccount } = this.props;
    let { title, number } = this.state;
    console.log("account desde el BankAccount", account);
    return (
      <div >
        {
          editAccount ? (
            <MDBRow className="d-flex justify-content-around align-items-center mb-3">
              <MDBInput
                label="Bank Name"
                className="mt-0"
                type="text"
                name="title"
                value={title}
                onChange={this.onChange}
              />
              <MDBInput
                label="Bank Number"
                className="mt-0"
                type="text"
                name="number"
                value={number}
                onChange={this.onChange}
              />
              <div>                
                <MDBBtn className="btn-edit" onClick={() => onEdit(R.clone(this.state))} >
                  <MDBIcon icon="pencil-alt" />
                </MDBBtn>
                <MDBBtn className="btn-delete" onClick={() => onDelete(account)} >
                  <MDBIcon icon="times" />
                </MDBBtn>
              </div>
            </MDBRow>
          ) : (
              <MDBRow className="d-flex justify-content-around align-items-center mb-3">
                <MDBInput
                  label="Bank Name"
                  className="mt-0"
                  type="text"
                  name="title"
                  value={title}
                  disabled
                />
                <MDBInput
                  label="Bank Number"
                  className="mt-0"
                  type="text"
                  name="number"
                  value={number}
                  disabled
                />
                <div>
                  <MDBBtn className="btn-edit"  disabled>
                    <MDBIcon icon="pencil-alt" />
                  </MDBBtn>
                  <MDBBtn className="btn-delete" disabled >
                    <MDBIcon icon="times" />
                  </MDBBtn>
                </div>
              </MDBRow>
            )
        }
      </div>
    );
  }
}
export default BankAccount;