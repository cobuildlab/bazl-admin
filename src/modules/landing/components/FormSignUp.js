import React from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { Icon } from 'react-icons-kit';
import { ic_mail_outline } from 'react-icons-kit/md/ic_mail_outline';
import { ic_lock_outline } from 'react-icons-kit/md/ic_lock_outline';
import { ic_keyboard_arrow_right } from 'react-icons-kit/md/ic_keyboard_arrow_right';
import View from 'react-flux-state';
import {
  landingStore,
  SIGNUP_EVENT,
  LOGIN_ERROR_EVENT,
  USER_ERROR_EVENT,
} from '../landing-store';
import { onSignup } from '../landing-actions';
import { error } from 'pure-logger';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
// import ModalTerms from './ModalTerms';

class FormSignUp extends View {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      checkTerms: false,
      loading: false,
    };
    this.onError = error.bind(this);
  }

  componentDidMount() {
    this.subscribe(landingStore, SIGNUP_EVENT, (user) => {
      toast.info('Welcome: ' + user.email);
      this.props.history.push('/home');
    });
    this.subscribe(landingStore, LOGIN_ERROR_EVENT, (err) => {
      toast.error(err.message);
      this.setState({ loading: false });
    });
    this.subscribe(landingStore, USER_ERROR_EVENT, (err) => {
      toast.error(err.message);
    });
  }

  onSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    this.setState({ loading: true }, () => {
      onSignup({ email, password });
    });
  };

  onChange = ({ target: { name, value } }) => {
    if (name === 'checkTerms') {
      this.setState((prevState) => ({
        checkTerms: !prevState.checkTerms,
      }));
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  render() {
    const { email, password, loading, checkTerms } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12" className="p-0">
            <form className="p-3">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <Icon icon={ic_mail_outline} />
                  </span>
                </div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  onChange={this.onChange}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <Icon icon={ic_lock_outline} />
                  </span>
                </div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  onChange={this.onChange}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <MDBInput
                  type="checkbox"
                  name="checkTerms"
                  value={checkTerms}
                  style={{
                    width: '25px',
                    height: '25px',
                    position: 'relative',
                    marginRight: '20px',
                  }}
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  onChange={this.onChange}
                />
                <h6>You agree to our terms of services and privacy policy.</h6>
              </div>
              {/* <ModalTerms linkName="by signing up, you agree to our terms of services and privacy policy." /> */}
              <div className="container p-0 text-center">
                <Link to="/terms-services" className="btnLink btn btn-link">
                  Terms of Services
                </Link>
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
                  disabled={!checkTerms}
                  onClick={this.onSubmit}>
                  Sign Up
                  <Icon size={24} icon={ic_keyboard_arrow_right} />
                </MDBBtn>
              )}
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default FormSignUp;
