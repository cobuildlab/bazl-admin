import React from 'react';
import { BankAccount } from './BankAccount';
import { MDBContainer, MDBTable, MDBTableHead } from 'mdbreact';
import PropTypes from 'prop-types';

class BankInformation extends React.Component {
  render() {
    const { bankAccounts } = this.props;
    return (
      <React.Fragment>
        <h5 className="font-weight-bold text-black-50">Bank Accounts</h5>
        {bankAccounts.length !== 0 ? (
          <MDBTable hover responsive borderless>
            {/* <MDBTable bordered hover responsive> */}
            <MDBTableHead color={'primary-plantilla'} textWhite>
              {/* <tr>
                <th>Class</th>
                <th>{encodeURIComponent(`Holders's`)} name</th>
                <th>Account number</th>
                <th>Routing number</th>
              </tr> */}
            </MDBTableHead>
            {bankAccounts.map((account, i) => (
              <BankAccount key={i} account={account} />
            ))}
          </MDBTable>
        ) : (
          <MDBContainer className="body" fluid>
            <h6 className="text-black-50 text-center">
              There Are No Bank Accounts Yet
            </h6>
          </MDBContainer>
        )}
      </React.Fragment>
    );
  }
}

BankInformation.propTypes = {
  bankAccounts: PropTypes.array.isRequired,
};

export { BankInformation };
