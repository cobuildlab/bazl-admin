import React, { Component } from 'react';
import * as R from 'ramda';
import { MDBIcon, MDBRow, MDBBtn, MDBInput } from 'mdbreact';

export class EditableBankAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i: this.props.i,
      type: this.props.account.type,
      title: this.props.account.title,
      number: this.props.account.number,
      routingNumber: this.props.account.routingNumber,
    };
  }

  onChange = ({ target: { name, value } }) => {
    if (name === 'type') {
      this.setState((prevState) => ({
        type: !prevState.type,
      }));
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  render() {
    const { onDelete, editAccount, flagEdit } = this.props;
    let { type, title, number, routingNumber, i } = this.state;
    let style = {
      position: 'relative',
    };
    console.log(i);
    
    return (
      <div>
        <MDBRow className="d-flex justify-content-around align-items-center mb-3">
          <MDBInput
            label="Business Account"
            className="mt-0"
            type="checkbox"
            name="type"
            onChange={this.onChange}
            disabled={flagEdit}
            style={style}
            checked={type}
          />
          <MDBInput
            label="Holder's name"
            className="mt-0"
            type="text"
            name="title"
            value={title}
            onChange={this.onChange}
            disabled={flagEdit}
          />
          <MDBInput
            label="Account number"
            className="mt-0"
            type="text"
            name="number"
            value={number}
            onChange={this.onChange}
            disabled={flagEdit}
          />
          <MDBInput
            label="Routing number"
            className="mt-0"
            type="text"
            name="routingNumber"
            value={routingNumber}
            onChange={this.onChange}
            disabled={flagEdit}
          />
          <div>
            <MDBBtn
              disabled={flagEdit}
              className="btn-edit"
              onClick={() => editAccount(R.clone(this.state))}>
              <MDBIcon icon="pencil-alt" />
            </MDBBtn>
            <MDBBtn
              disabled={flagEdit}
              className="btn-delete"
              onClick={() => onDelete(i)}>
              <MDBIcon icon="times" />
            </MDBBtn>
          </div>
        </MDBRow>
      </div>
    );
  }
}
export default EditableBankAccount;
