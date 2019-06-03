import React from "react";
import {
  MDBBtn,
  MDBInput,
  MDBRow
} from "mdbreact";
import { BankAccount } from './BankAccount';

class BasicInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      number: '',
      flagInformation: this.props.flagInformation,
      flagAccounts: false
    }
  }

  onChangeBank = ({ target: { name, value } }) => {
    const data = this.state;
    data[name] = value;
    this.setState({ data });
  };

  changeFlag = () => {
    this.setState(prevState => ({
      flagAccounts: !prevState.flagAccounts
    }));
  }

  render() {
    const { bankAccounts, onDelete, newAccount, editAccount } = this.props;
    let { title, number, flagAccounts, flagInformation } = this.state;
    
    return (
      <React.Fragment>
        <div className="mt-3 mb-5">
          <h5>Bank Accounts</h5>
          {bankAccounts.map((account, i) => (
            <BankAccount key={i} account={account} editAccount={editAccount} flagEdit={flagInformation} onDelete={onDelete}></BankAccount>
          ))}
          <div className="d-flex justify-content-center align-items-center">
            <MDBBtn disabled={flagInformation} onClick={() => this.changeFlag()} className="btn btn-circle">Add Accounts</MDBBtn>
          </div>
          {
            flagAccounts ? (
              <div>
                <h5>New Accounts</h5>
                <MDBRow className="d-flex justify-content-around align-items-center mb-3">
                  <MDBInput
                    label="Bank Name"
                    className="mt-0"
                    type="text"
                    name="title"
                    value={title}
                    onChange={this.onChangeBank}
                    disabled={flagInformation}
                  />
                  <MDBInput
                    label="Bank Number"
                    className="mt-0"
                    type="text"
                    name="number"
                    value={number}
                    onChange={this.onChangeBank}
                    disabled={flagInformation}
                  />
                  <MDBBtn onClick={() => { newAccount(this.state);this.changeFlag()}} className="btn btn-circle">Add</MDBBtn>
                </MDBRow>
              </div>

            ) : (
                <div></div>
              )
          }
        </div>
      </React.Fragment>
    );
  }
}

export default BasicInformation;