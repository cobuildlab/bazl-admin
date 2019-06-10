import React from 'react';
import { BankAccount } from './BankAccount';

class BankInformation extends React.Component {
  render() {
    const { bankAccounts } = this.props;
    return (
      <React.Fragment>
        <div className="mt-3 mb-5">
          <h5>Bank Accounts</h5>
          {bankAccounts.map((account, i) => (
            <BankAccount key={i} account={account} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export { BankInformation };
