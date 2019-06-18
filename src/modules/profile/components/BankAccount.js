import React, { Component } from 'react';
import { MDBTableBody } from 'mdbreact';
import PropTypes from 'prop-types';

class BankAccount extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.account };
  }

  render() {
    let { type, title, number, routingNumber } = this.state;
    return (
      <MDBTableBody>
        <tr>
          <td>{type === true ? 'Business' : 'Personal'}</td>
          <td>{title}</td>
          <td>{number}</td>
          <td>{routingNumber}</td>
        </tr>
      </MDBTableBody>
    );
  }
}

BankAccount.propTypes = {
  account: PropTypes.object.isRequired,
};

export { BankAccount };
