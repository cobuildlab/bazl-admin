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
      type: false,
      title: '',
      number: '',
      routingNumber: '',
      flagInformation: this.props.flagInformation,
      flagAccounts: false
    }
  }

  onChangeBank = ({ target: { name, value } }) => {
    if (name === 'type') {
      this.setState(prevState => ({
        type: !prevState.type
      }))
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  changeFlag = () => {
    this.setState(prevState => ({
      flagAccounts: !prevState.flagAccounts,
      type: false,
      title: '',
      number: '',
      routingNumber: '',
    }));
  }

  render() {
    const { bankAccounts, onDelete, newAccount, editAccount } = this.props;
    let { type, title, number, routingNumber, flagAccounts, flagInformation } = this.state;
    let style = {
      position: 'relative'
    }
    let arrayVacio = false;
    console.log("bankAccounts",bankAccounts);
    console.log("bankAccounts tamaño",bankAccounts.length);
    if (bankAccounts.length > 0) {
      console.log("bankAccounts tamaño",bankAccounts.length);
      arrayVacio = true
    }
    
    return (
      <React.Fragment>
        <div className="mt-3 mb-5">
          <h5>Bank Accounts</h5>
          {
            arrayVacio ? (
              bankAccounts.map((account, i) => (
                <BankAccount key={i} account={account} editAccount={editAccount} flagEdit={flagInformation} onDelete={onDelete}></BankAccount>
              ))
            ) : 
            <div></div>           
          }
          <div className="d-flex justify-content-center align-items-center">
            <MDBBtn disabled={flagInformation} onClick={() => this.changeFlag()} className="btn btn-circle">Add Accounts</MDBBtn>
          </div>
          {
            flagAccounts ? (
              <div>
                <h5>New Accounts</h5>
                <MDBRow className="d-flex justify-content-around align-items-center mb-3" >
                  <MDBInput
                    label="Business Account"
                    className="mt-0"
                    type="checkbox"
                    name="type"
                    onChange={this.onChangeBank}
                    disabled={flagInformation}
                    style={style}
                    checked={type}
                  />
                  <MDBInput
                    label="Holder's name"
                    className="mt-0"
                    type="text"
                    name="title"
                    value={title}
                    onChange={this.onChangeBank}
                    disabled={flagInformation}
                  />
                  <MDBInput
                    label="Account number"
                    className="mt-0"
                    type="text"
                    name="number"
                    value={number}
                    onChange={this.onChangeBank}
                    disabled={flagInformation}
                  />
                  <MDBInput
                    label="Routing number"
                    className="mt-0"
                    type="text"
                    name="routingNumber"
                    value={routingNumber}
                    onChange={this.onChangeBank}
                    disabled={flagInformation}
                  />
                  <MDBBtn onClick={() => { newAccount(this.state); this.changeFlag() }} className="btn btn-circle">Add</MDBBtn>
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