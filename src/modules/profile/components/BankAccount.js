import React, { Component } from 'react';
import {
  //MDBRow, MDBInput, MDBTableHead ,
  MDBTableBody,
} from 'mdbreact';
import PropTypes from 'prop-types';

class BankAccount extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.account };
  }

  render() {
    let { type, title, number, routingNumber } = this.state;
    // const flagEdit = true;
    return (
      // <MDBRow className="d-flex justify-content-around align-items-center mb-3">
      //   <MDBInput
      //     label="Business Account"
      //     className="mt-0"
      //     type="checkbox"
      //     name="type"
      //     disabled={flagEdit}
      //     style={style}
      //     checked={type}
      //   />
      //   <MDBInput
      //     label="Holder's name"
      //     className="mt-0"
      //     type="text"
      //     name="title"
      //     value={title}
      //     disabled={flagEdit}
      //   />
      //   <MDBInput
      //     label="Account number"
      //     className="mt-0"
      //     type="text"
      //     name="number"
      //     value={number}
      //     disabled={flagEdit}
      //   />
      //   <MDBInput
      //     label="Routing number"
      //     className="mt-0"
      //     type="text"
      //     name="routingNumber"
      //     value={routingNumber}
      //     onChange={this.onChange}
      //     disabled={flagEdit}
      //   />
      // </MDBRow>
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
