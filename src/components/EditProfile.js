import React from "react";
import { Link } from "react-router-dom";
import {
  MDBIcon,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBBtn,
  MDBInput
} from "mdbreact";
import SidebarComponent from "./SidebarComponent";
import SliderCards from "./SliderCards";
import ImgDefault from '../assets/img/img-default.png';
import { BankAccount } from './BankAccount';

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      file: '',
      flagAccounts: true,
      title: '',
      number: ''
    }
    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    let { name } = e.target;
    let user = this.state.user;

    reader.onloadend = () => {
      user[name] = reader.result;
      this.setState({
        user,
        file
      });
    }
    reader.readAsDataURL(file)
  }

  onChange = ({ target: { name, value } }) => {
    const data = this.state.user;
    data[name] = value;
    this.setState({ data });
  };

  onChangeBank = ({ target: { name, value } }) => {
    const data = this.state;
    data[name] = value;
    this.setState({ data });
  };

  onDelete = (bankAccount) => {
    let { bankAccounts } = this.state.user;
    let i = bankAccounts.indexOf(bankAccount);

    if (i !== -1) {
      let data = this.state.user;
      data[bankAccounts] = bankAccounts.splice(i, 1);
      this.setState({ data });
    }
  }

  onEdit = (bank) => {
    let { bankAccounts } = this.state.user;

    bankAccounts.map = (bankAccount, i) => {
      if (bank.Id === bankAccount.Id) {
        bankAccounts[i] = bank;
      }
    };
    this.setState({});
  }

  changeFlag = () => {
    this.setState(prevState => ({
      flagAccounts: !prevState.flagAccounts
    }));
  }

  newAccount = () => {
    let { title, number } = this.state
    let newAccount = {
      'title': title,
      'number': number
    }
    let data = this.state.user.bankAccounts;
    this.setState({
      data: data.push(newAccount),
      title: '',
      number: ''
    });
    this.changeFlag();
  }

  render() {
    const { onCancel, onSave } = this.props;
    let { name, description, bankAccounts, picture } = this.state.user;
    let imagePreview = null;
    let { title, number } = '';

    if (picture) {
      imagePreview = (<img alt={'User Profile'} src={picture} className="img-fluid img-label" />);
    } else {
      imagePreview = (<img alt={'User Profile'} src={ImgDefault} className="img-fluid img-label" />);
    }

    return (
      <SidebarComponent>
        <div className="d-flex justify-content-between nav-admin body">
          <div>
            <h2 className="m-0">Edit Profile</h2>
          </div>
          <div>
            <Link
              onClick={onCancel}
              className="btn btn-circle btn-circle-link"
            >
              Profile<MDBIcon icon="upload" className="ml-1" />
            </Link>
          </div>
        </div>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="3">
              <label className="Customlabel text-center" for="upload-photo">
                {imagePreview}
              </label>
              <input type="file" name='picture' id="upload-photo" onChange={this.onImageChange} />

              <small className="text-center">
                JPG or PNG format with a maximum of 5mb
              </small>
            </MDBCol>
            <MDBCol md="7">
              <h5>Name User</h5>
              <MDBInput
                className="mt-0"
                type="text"
                name="name"
                value={name}
                onChange={this.onChange}
              />
              <h5>Description</h5>
              <MDBInput
                className="mt-0"
                type="textarea"
                name="description"
                value={description}
                onChange={this.onChange}
                rows="5" />
              <MDBCol className="text-center">
                <MDBBtn onClick={() => onSave(this.state.user)} color="success" className="btn btn-circle mt-4 mb-5">
                  Save
                    </MDBBtn>
                <MDBBtn onClick={onCancel} color="danger" className="btn btn-circle mt-4 mb-5">
                  Cancel
                    </MDBBtn>
              </MDBCol>

            </MDBCol>
            <MDBCol md="2">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardText className="text-center">
                    Total Sales
                  </MDBCardText>
                  <MDBCardTitle className="text-center">
                    $1000
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md="2"></MDBCol>
            <MDBCol md="8">
              <div className="mt-3 mb-5">
                <h5>Bank Accounts</h5>
                {bankAccounts.map((account, i) => (
                  <BankAccount key={i} account={account} onEdit={this.onEdit} onDelete={this.onDelete} editAccount={true}></BankAccount>
                ))}
                <div className="d-flex justify-content-center align-items-center">
                  <MDBBtn onClick={() => this.changeFlag()} className="btn btn-circle">Add Accounts</MDBBtn>
                </div>
                {
                  !this.state.flagAccounts ? (
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
                        />
                        <MDBInput
                          label="Bank Number"
                          className="mt-0"
                          type="text"
                          name="number"
                          value={number}
                          onChange={this.onChangeBank}
                        />
                        <MDBBtn onClick={() => this.newAccount()} className="btn btn-circle">Add</MDBBtn>
                      </MDBRow>
                    </div>

                  ) : (
                      <div></div>
                    )
                }
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md="2"></MDBCol>
            <MDBCol md="8" >
              <div className="mt-3 mb-5">
                <SliderCards />
              </div>
            </MDBCol>
            <MDBCol md="2"></MDBCol>
          </MDBRow>

        </MDBContainer>
      </SidebarComponent>
    );
  }
}

export default EditProfile;
