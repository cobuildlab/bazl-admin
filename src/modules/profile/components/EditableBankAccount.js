import React, { Component } from 'react';
import * as R from 'ramda';
import {
  MDBIcon,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from 'mdbreact';
import PropTypes from 'prop-types';

class EditableBankAccount extends Component {
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
    const { onDelete, editAccount, index } = this.props;
    const { type, title, number, routingNumber } = this.state;
    return (
      <MDBCard className="accountCard" style={{ marginBottom: '20px' }}>
        <MDBCardBody style={{ paddingBottom: '0px', paddingTop: '0px' }}>
          <MDBRow className="d-flex justify-content-around align-items-center text-center">
            <MDBCol md="2" style={{ paddingLeft: '0px' }}>
              {/* <MDBInput
                label="Business Account"
                className="mt-0 text-center"
                type="checkbox"
                name="type"
                onChange={this.onChange}
                style={{ position: 'relative', marginLeft: '0px' }}
                checked={type}
              /> */}
              <input
                type="checkbox"
                name="type"
                checked={type}
                onChange={this.onChange}
              />
              <h6 style={{ margin: '0px' }}>Business Account</h6>
            </MDBCol>
            <MDBCol md="3" className="banco">
              <MDBInput
                label="Holder's name"
                className="mt-0"
                type="text"
                name="title"
                value={title}
                onChange={this.onChange}
              />
            </MDBCol>
            <MDBCol md="3" className="banco">
              <MDBInput
                label="Account number"
                className="mt-0"
                type="text"
                name="number"
                value={number}
                onChange={this.onChange}
              />
            </MDBCol>
            <MDBCol md="3" className="banco">
              <MDBInput
                label="Routing number"
                className="mt-0"
                type="text"
                name="routingNumber"
                value={routingNumber}
                onChange={this.onChange}
              />
            </MDBCol>
            <MDBCol md="1" style={{ padding: '0px' }}>
              <MDBBtn
                className="btn-edit"
                style={{ marginBottom: '0px' }}
                onClick={() => editAccount(R.clone(this.state), index)}>
                <MDBIcon icon="pencil-alt" />
              </MDBBtn>
              <MDBBtn className="btn-delete" onClick={onDelete}>
                <MDBIcon icon="times" />
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

EditableBankAccount.propTypes = {
  account: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  editAccount: PropTypes.func.isRequired,
};

export { EditableBankAccount };
