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
import PropTypes from 'prop-types';

class EditBasicInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      description: this.props.description,
      picture: this.props.picture,
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
    let { name, description, picture } = this.state;
    let imagePreview = null;
    let cursor = {
      cursor: 'pointer',
    };
    if (picture) {
      imagePreview = (
        <label
          style={cursor}
          width="80"
          className="text-center"
          htmlFor="upload-photo">
          <img alt={'User Profile'} src={picture} className="img-fluid" />
        </label>
      );
    } else {
      imagePreview = (
        <label
          style={cursor}
          width="80"
          className="CustomlabelProfile text-center"
          htmlFor="upload-photo">
          <img
            alt={'User Profile'}
            src={ImgDefault}
            className="img-fluid img-label"
          />
        </label>
      );
    }

    return (
      <React.Fragment>
        <MDBCol className="text-center" md="3">
          {imagePreview}
          <input
            type="file"
            name="picture"
            id="upload-photo"
            onChange={this.onImageChange}
          />
          <small>JPG or PNG with a maximum of 5mb</small>
        </MDBCol>
        <MDBCol md="7">
          <h5>Name User</h5>
          <MDBInput
            className="mb-0"
            type="text"
            name="name"
            value={name}
            onChange={this.onChange}
          />
          <h5>Description</h5>
          <MDBInput
            className="mb-0"
            type="textarea"
            name="description"
            value={description}
            onChange={this.onChange}
            rows="3"
          />
          <MDBCol style={{ height: '75px' }} className="text-center">
            <MDBBtn
              onClick={() => onSave(this.state)}
              color="success"
              className="btn btn-circle mt-4 mb-5">
              Save
            </MDBBtn>
            <MDBBtn
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
              <MDBCardTitle className="text-center">$0</MDBCardTitle>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </React.Fragment>
    );
  }
}

EditBasicInformation.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export { EditBasicInformation };
