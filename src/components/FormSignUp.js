import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { Icon } from "react-icons-kit";
import { ic_mail_outline } from "react-icons-kit/md/ic_mail_outline";
import { ic_lock_outline } from "react-icons-kit/md/ic_lock_outline";
import { ic_keyboard_arrow_right } from "react-icons-kit/md/ic_keyboard_arrow_right";
import View from 'react-flux-state';
import { landingStore, SIGNUP_EVENT, LOGIN_ERROR_EVENT} from "../modules/landing/landing-store";
import { createUser, pushHome } from '../modules/landing/landing-actions';
import firebase from 'firebase';
import * as R from 'ramda';
import { uiConfig } from '../config/firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { error } from 'pure-logger';
import { toast } from 'react-toastify';

class FormSignUp extends View {
  constructor(props) {
    super(props) 
    this.state = {
        email: '',
        password: ''
    }
    this.onError = error.bind(this);
  }

  componentDidMount() {
    this.subscribe( landingStore, SIGNUP_EVENT, () => {
      pushHome();
    })
    this.subscribe( landingStore, LOGIN_ERROR_EVENT, (err) => {
      toast.error(err.message);
    });

  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState(() => {
      createUser(R.clone(this.state.email, this.state.password));
    })
  }

  onChange = ({ target: { name, value }}) => {
    this.setState({
      [name]: value
    })
  }



  render() {
    const { email, password} = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12" className="p-0">
            <form className="p-3">
              <div className="text-center">
                <StyledFirebaseAuth 
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()} />
                <StyledFirebaseAuth 
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()} />
              </div>
              <MDBRow>
                <MDBCol md="5" xs="5">
                  <hr className="hr-dark" />
                </MDBCol>
                <MDBCol md="2" xs="2" className="text-center">
                  OR
                </MDBCol>
                <MDBCol md="5" xs="5">
                  <hr className="hr-dark" />
                </MDBCol>
              </MDBRow>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <Icon icon={ic_mail_outline} />
                  </span>
                </div>
                <input
                  type="email"
                  name='email'
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
                  name='password'
                  value={password}
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  onChange={this.onChange}
                />
              </div>
              <p className="text-center">
                by signing up, you agree to our terms of services and privacy
                policy.
              </p>
            </form>
            <div className="text-center">
              <MDBBtn 
                type={'submit'} 
                className="btn-auth" 
                onClick={this.onSubmit}>
                Sign Up <Icon size={24} icon={ic_keyboard_arrow_right} />
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default FormSignUp;
