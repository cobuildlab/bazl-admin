import React from 'react';
import { BankAccount } from './BankAccount';
import {
  // MDBRow, MDBInput, MDBTableBody
  MDBTable,
  MDBTableHead,
} from 'mdbreact';
import PropTypes from 'prop-types';

class BankInformation extends React.Component {
  render() {
    const { bankAccounts } = this.props;
    return (
      <React.Fragment>
        <div className="mt-3 mb-5">
          <h5>Bank Accounts</h5>
          <MDBTable bordered hover responsive>
            <MDBTableHead color={'primary-plantilla'} textWhite>
              <tr>
                <th>Class</th>
                <th>{encodeURIComponent(`Holders's`)} name</th>
                <th>Account number</th>
                <th>Routing number</th>
              </tr>
            </MDBTableHead>
            {bankAccounts.map((account, i) => (
              <BankAccount key={i} account={account} />
            ))}
          </MDBTable>
        </div>
      </React.Fragment>
    );
  }
}

BankInformation.propTypes = {
  bankAccounts: PropTypes.array.isRequired,
};

export { BankInformation };
