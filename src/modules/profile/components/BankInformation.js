import React from 'react';
import PropTypes from 'prop-types';
import { MDBTable, MDBTableHead } from 'mdbreact';
import { BankAccount } from './BankAccount';

class BankInformation extends React.Component {
  render() {
    const { bankAccounts } = this.props;
    return (
      <React.Fragment>
        <div className="mt-3 mb-5">
          <h5>Bank Accounts</h5>
          <MDBTable bordered>
            <MDBTableHead>
              <tr>
                <th>{'Class'}</th>
                <th>{'Holder\'s name'}</th>
                <th>{'Account number'}</th>
                <th>{'Routing number'}</th>
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
