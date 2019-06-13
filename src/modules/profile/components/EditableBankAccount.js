import React, { Component } from 'react';
import * as R from 'ramda';
import { MDBIcon, MDBRow, MDBBtn, MDBInput } from 'mdbreact';
import PropTypes from 'prop-types';

export class EditableBankAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { onDelete, editAccount, i } = this.props;
    const { type, title, number, routingNumber } = this.state;
    let style = {
      position: 'relative',
    };
console.log("i",i);

    return (
      <div>
        <MDBRow className="d-flex justify-content-around align-items-center mb-3">
          <MDBInput
            label="Business Account"
            className="mt-0"
            type="checkbox"
            name="type"
            onChange={this.onChange}
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
          />
          <MDBInput
            label="Account number"
            className="mt-0"
            type="text"
            name="number"
            value={number}
            onChange={this.onChange}
          />
          <MDBInput
            label="Routing number"
            className="mt-0"
            type="text"
            name="routingNumber"
            value={routingNumber}
            onChange={this.onChange}
          />
          <div>
            <MDBBtn
              className="btn-edit"
              onClick={() => editAccount(R.clone(this.state), i)}>
              <MDBIcon icon="pencil-alt" />
            </MDBBtn>
            <MDBBtn className="btn-delete" onClick={onDelete}>
              <MDBIcon icon="times" />
            </MDBBtn>
          </div>
        </MDBRow>
      </div>
    );
  }
}

EditableBankAccount.propTypes = {
  account: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  editAccount: PropTypes.func.isRequired,
};

export default EditableBankAccount;
