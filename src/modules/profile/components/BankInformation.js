import React from 'react';
import { BankAccount } from './BankAccount';
import {
  // MDBRow, MDBInput, MDBTableBody, MDBCol,
  MDBContainer,
  MDBTable,
  MDBTableHead,
} from 'mdbreact';
import PropTypes from 'prop-types';

class BankInformation extends React.Component {
  render() {
    const { bankAccounts } = this.props;
    return (
      <React.Fragment>
        <h5 className="font-weight-bold text-black-50">Bank Accounts</h5>
        {bankAccounts.length !== 0 ? (
          <MDBTable hover responsive>
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
            <h4 className="text-black-50">There Are No Bank Accounts Yet</h4>
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
