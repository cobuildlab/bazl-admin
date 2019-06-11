import React from 'react';
import { MDBBtn, MDBInput, MDBRow } from 'mdbreact';

const BankInformationForm = () => {
  return (
    <div>
      <h5>New Account</h5>
      <MDBRow className="d-flex justify-content-around align-items-center mb-3">
        <MDBInput
          label="Business Account"
          className="mt-0"
          type="checkbox"
          name="type"
          onChange={this.onChangeBank}
        />
        <MDBInput
          label="Holder's name"
          className="mt-0"
          type="text"
          name="title"
        />
        <MDBInput
          label="Account number"
          className="mt-0"
          type="text"
          name="number"
        />
        <MDBInput
          label="Routing number"
          className="mt-0"
          type="text"
          name="routingNumber"
        />
        <MDBBtn onClick={() => {}} className="btn btn-circle">
          Add
        </MDBBtn>
      </MDBRow>
    </div>
  );
};

export { BankInformationForm };
