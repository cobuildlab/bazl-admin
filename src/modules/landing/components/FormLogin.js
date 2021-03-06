import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { Icon } from 'react-icons-kit';
import { ic_mail_outline } from 'react-icons-kit/md/ic_mail_outline';
import { ic_lock_outline } from 'react-icons-kit/md/ic_lock_outline';
import { ic_keyboard_arrow_right } from 'react-icons-kit/md/ic_keyboard_arrow_right';
import View from 'react-flux-state';
import {
  landingStore,
  LOGIN_EVENT,
  LOGIN_ERROR_EVENT,
  REQUEST_PASSWORD_RESET,
  USER_ERROR_EVENT,
} from '../landing-store';
import { onLogin, requestPasswordReset } from '../landing-actions';
import { error } from 'pure-logger';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

class FormLogin extends View {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      emailError: '',
      forgot: true,
      rememberMe: false,
    };
    this.onError = error.bind(this);
  }

  componentDidMount() {
    this.subscribe(landingStore, LOGIN_EVENT, (user) => {
      toast.info('Welcome: ' + user.name);
      this.props.history.push('/home');
    });
    this.subscribe(landingStore, LOGIN_ERROR_EVENT, (err) => {
      toast.error(err.message);
      this.setState({ loading: false });
    });
    this.subscribe(landingStore, REQUEST_PASSWORD_RESET, () => {
      toast.info('Request for Recover Password Processed');
      this.setState({ loading: false }, () => {
        this.props.history.push('/');
      });
    });
    this.subscribe(landingStore, USER_ERROR_EVENT, (err) => {
      toast.error(err.message);
      this.setState({ loading: false });
    });
  }

  onSubmit = (e) => {
    const { email, password, rememberMe } = this.state;
    e.preventDefault();
    if (!this.state.forgot) {
      this.setState({ loading: true, forgot: true }, () => {
        requestPasswordReset(email);
      });
    } else {
      this.setState({ loading: true }, () => {
        onLogin({ email, password, rememberMe });
      });
    }
  };

  onChange = ({ target: { name, value } }) => {
    if (name === 'rememberMe') {
      this.setState((prevState) => ({
        rememberMe: !prevState.rememberMe,
      }));
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  onFlagForgot = () => {
    this.setState((prevState) => ({
      forgot: !prevState.forgot,
    }));
  };

  onKeyPress = (e) => {
    if (e.which === 13) {
      this.onSubmit(e);
    }
  };

  render() {
    let { email, password, loading, forgot, rememberMe } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12" className="p-0">
            {forgot ? (
              <div>
                <form className="p-3">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <Icon icon={ic_mail_outline} />
                      </span>
                    </div>
                    <input
                      onChange={this.onChange}
                      type="email"
                      name="email"
                      value={email}
                      className="form-control"
                      placeholder="Email"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                    />
                    <div className="invalid-feedback">
                      {this.state.emailError}
                    </div>
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
                      name="password"
                      value={password}
                      className="form-control"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                      onKeyPress={this.onKeyPress}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                    }}>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      value={rememberMe}
                      style={{ marginRight: '5px' }}
                      onChange={this.onChange}
                    />
                    <h6 style={{ margin: '0px' }}>Keep Session Active ?</h6>
                  </div>
                  <div className="text-center">
                    {' '}
                    <p
                      onClick={this.onFlagForgot}
                      className="btnLink btn btn-link">
                      {`Don't remember your password?`}
                    </p>
                  </div>
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
                      Log in
                      <Icon size={24} icon={ic_keyboard_arrow_right} />
                    </MDBBtn>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <form className="p-3">
                  <p className="text-center">
                    {`Enter your email address and we'll send you a Password reset link.`}
                  </p>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <Icon icon={ic_mail_outline} />
                      </span>
                    </div>
                    <input
                      onChange={this.onChange}
                      type="email"
                      name="email"
                      value={email}
                      className="form-control"
                      placeholder="Email"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <p
                    onClick={this.onFlagForgot}
                    className="btnLink btn btn-link">
                    {'Already have an account? Log in.'}
                  </p>
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
                      {'Send Email'}
                      <Icon size={24} icon={ic_keyboard_arrow_right} />
                    </MDBBtn>
                  )}
                </div>
              </div>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default FormLogin;
