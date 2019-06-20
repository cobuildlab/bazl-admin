import React from 'react';
import View from 'react-flux-state';
import * as R from 'ramda';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBMask,
  MDBView,
  MDBAnimation,
  MDBFooter,
} from 'mdbreact';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { Icon } from 'react-icons-kit';
import { ic_lock_outline } from 'react-icons-kit/md/ic_lock_outline';
import { ic_keyboard_arrow_right } from 'react-icons-kit/md/ic_keyboard_arrow_right';
import bgLanding from '../../../assets/img/background.png';
import Logo from '../../../assets/img/Bazl-logo.png';
import PhoneApp from '../../../assets/img/phoneApp.png';
import { UserModel } from '../landing-models';
import { confimrNewPassword, getUrlParam } from '../landing-actions';

class ChangePasswordView extends View {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userModel: R.clone(UserModel),
      firstInput: '',
      secondInput: '',
      email: '',
      code: getUrlParam(this.props.location.search, 'oobCode'),
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { firstInput, secondInput, code, email } = this.state;

    if (firstInput !== secondInput) {
      return toast.error('Passwords do not match');
    } else if (firstInput.length < 6) {
      return toast.error('the password must contain at least 6 characters');
    } else {
      let newPassword = firstInput;
      confimrNewPassword(code, newPassword, email);
      this.setState({ loading: true });
      toast.success('You have set your password succesfully');
      return this.props.history.push('/');
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { loading, firstInput, secondInput, email } = this.state;
    return (
      <div
        style={{
          background: `url(${bgLanding})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: '100vh',
        }}>
        <MDBView style={{ alignItems: 'center' }} src={bgLanding}>
          <MDBMask className="d-flex justify-content-start align-items-center">
            <MDBContainer>
              <MDBRow>
                <MDBCol md="2"></MDBCol>
                <MDBCol md="4" className="mb-4">
                  <MDBAnimation type="fadeInLeft">
                    <div className="d-flex justify-content-center p-4">
                      <img src={Logo} alt="Bazl" className="img-fluid" />
                    </div>
                    <form className="p-3">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <Icon icon={ic_lock_outline} />
                          </span>
                        </div>
                        <input
                          onChange={this.onChange}
                          type="email"
                          name="email"
                          value={email}
                          className="form-control"
                          placeholder="Email"
                          aria-label="Password"
                          aria-describedby="basic-addon1"
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <Icon icon={ic_lock_outline} />
                          </span>
                        </div>
                        <input
                          onChange={this.onChange}
                          type="password"
                          name="firstInput"
                          value={firstInput}
                          className="form-control"
                          placeholder="New Password"
                          aria-label="Password"
                          aria-describedby="basic-addon1"
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <Icon icon={ic_lock_outline} />
                          </span>
                        </div>
                        <input
                          onChange={this.onChange}
                          type="password"
                          name="secondInput"
                          value={secondInput}
                          className="form-control"
                          placeholder="New Password"
                          aria-label="Password"
                          aria-describedby="basic-addon1"
                          required
                          disabled={loading}
                        />
                      </div>
                      <br></br>
                    </form>
                    <div className="text-center">
                      {loading ? (
                        <ClipLoader
                          sizeUnit={'px'}
                          size={120}
                          color={'#44c1f6'}
                          loading={true}
                        />
                      ) : (
                        <MDBBtn
                          type={'submit'}
                          className="btn-auth"
                          onClick={this.onSubmit}>
                          Send
                          <Icon size={24} icon={ic_keyboard_arrow_right} />
                        </MDBBtn>
                      )}
                    </div>
                  </MDBAnimation>
                </MDBCol>
                <MDBCol md="4">
                  <MDBAnimation type="fadeInRight">
                    <img
                      src={PhoneApp}
                      alt="phone"
                      className="img-fluid"
                      width="250"
                    />
                  </MDBAnimation>
                </MDBCol>
                <MDBCol md="2"></MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
        <MDBFooter
          style={{ position: 'fixed', width: '100%', padding: '10px' }}
          color="primary-plantilla"
          className="footer-copyright text-center">
          Copyright: &copy; Blaz {new Date().getFullYear()} |{' '}
          <a href="#">Privacy Policy</a> | <a href="#">Terms and Conditions</a>
        </MDBFooter>
      </div>
    );
  }
}

export default ChangePasswordView;
