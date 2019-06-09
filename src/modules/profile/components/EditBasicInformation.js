import React from 'react';
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBBtn,
  MDBInput,
} from 'mdbreact';
import ImgDefault from '../../../assets/img/img-default.png';

class EditBasicInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      description: this.props.description,
      picture: this.props.picture,
      flagInformation: this.props.flagInformation,
    };
    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    let { name } = e.target;
    let user = this.state;

    reader.onloadend = () => {
      user[name] = reader.result;
      this.setState({
        user,
        file,
      });
    };
    reader.readAsDataURL(file);
  }

  onChange = ({ target: { name, value } }) => {
    const data = this.state;
    data[name] = value;
    this.setState({ data });
  };

  render() {
    const { onCancel, onSave } = this.props;
    let { name, description, picture, flagInformation } = this.state;
    let imagePreview = null;

    if (picture) {
      imagePreview = (
        <img alt={'User Profile'} src={picture} className="img-fluid" />
      );
    } else {
      imagePreview = (
        <img
          alt={'User Profile'}
          src={ImgDefault}
          className="img-fluid img-label"
        />
      );
    }

    return (
      <React.Fragment>
        <MDBCol md="3">
          <label className="Customlabel text-center" htmlFor="upload-photo">
            {imagePreview}
          </label>
          <input
            disabled={flagInformation}
            type="file"
            name="picture"
            id="upload-photo"
            onChange={this.onImageChange}
          />

          <small className="text-center">
            JPG or PNG with a maximum of 5mb
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
            disabled={flagInformation}
          />
          <h5>Description</h5>
          <MDBInput
            className="mt-0"
            type="textarea"
            name="description"
            value={description}
            onChange={this.onChange}
            disabled={flagInformation}
            rows="5"
          />
          <MDBCol className="text-center">
            <MDBBtn
              disabled={flagInformation}
              onClick={() => onSave(this.state)}
              color="success"
              className="btn btn-circle mt-4 mb-5">
              Save
            </MDBBtn>
            <MDBBtn
              disabled={flagInformation}
              onClick={onCancel}
              color="danger"
              className="btn btn-circle mt-4 mb-5">
              Cancel
            </MDBBtn>
          </MDBCol>
        </MDBCol>
        <MDBCol md="2">
          <MDBCard>
            <MDBCardBody>
              <MDBCardText className="text-center">Total Sales</MDBCardText>
              <MDBCardTitle className="text-center">$1000</MDBCardTitle>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </React.Fragment>
    );
  }
}

export { EditBasicInformation };
