import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { Icon } from "react-icons-kit";
import { ic_mail_outline } from "react-icons-kit/md/ic_mail_outline";
import { ic_lock_outline } from "react-icons-kit/md/ic_lock_outline";
import { ic_keyboard_arrow_right } from "react-icons-kit/md/ic_keyboard_arrow_right";
import View from "react-flux-state";
import { landingStore, LOGIN_EVENT, LOGIN_ERROR_EVENT, REQUEST_PASSWORD_RESET, USER_ERROR_EVENT } from "../landing-store";
import { onLogin, requestPasswordReset } from "../landing-actions";
import { error } from "pure-logger";
import { toast } from "react-toastify";
import { ClipLoader } from 'react-spinners';


class FormLogin extends View {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      forgot: true,
      emailError : ""
    };
    this.onError = error.bind(this);

  }

  componentDidMount() {
    this.subscribe(landingStore, LOGIN_EVENT, () => {
      this.props.history.push('/home')
    });
    this.subscribe(landingStore, LOGIN_ERROR_EVENT, err => {
      toast.error(err.message);
    });
    this.subscribe(landingStore, REQUEST_PASSWORD_RESET, () => {
      this.props.history.push('/');
      toast.success("Email sended");
    })
    this.subscribe(landingStore, USER_ERROR_EVENT, (e) => {
      toast.error(e.message);
    })
  }

  onSubmit = e => {
    const { email, password } = this.state;
    e.preventDefault();
    if (!this.state.forgot) {
      requestPasswordReset(email);
      this.setState({
        forgot : true
      })

    } else {
      // this.setState({ loading: true }, () => {
      //   onLogin({ email, password });
      // });
      onLogin({ email, password });
    }
    console.log(email);
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    
    })
  };

  onFlagForgot = () => {
    this.setState(prevState => ({
      forgot: !prevState.forgot
    }));
  }
  validateEmail = () => {
const {email} = this.state;
this.setState({
  emailError:
    (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,4})+$/).test(email) ? '' : "Error, Must be a valid E-mail"
})
  }

  render() {

    let { email, password, loading, forgot } = this.state;
    console.log("Form Login en uso")
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
                      className={`form-control ${this.state.emailError ? 'is-invalid' : ''}`}
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    onBlur={this.validateEmail}
                    
                  />
                  <div className='invalid-feedback'>{this.state.emailError}</div>
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
                    />
                </div>
                <p onClick={this.onFlagForgot} className="btnLink btn btn-link">Don't remember your password?</p>
              </form>
              <div className="text-center">
                {loading ? (
                  <ClipLoader
                  sizeUnit={'px'}
                  size={120}
                  color={'#44c1f6'}
                    loading={true} />
                    ) : (
                      <MDBBtn type={"submit"} className="btn-auth" onClick={this.onSubmit}>Log in<Icon size={24} icon={ic_keyboard_arrow_right} /></MDBBtn>
                      )}
              </div>
                      </div>
            ) : (
              <div>

                <form className="p-3">
                  <p className="text-center">
                    Enter your email address and we'll send you a Password reset link.
                   </p>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <Icon icon={ic_mail_outline} />
                      </span>
                    </div>
                      <input
                        onChange={this.onChange}
                        value={email}
                        type="email"
                        name="email"
                        className={`form-control ${this.state.emailError ? 'is-invalid' : ''}`}
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        onBlur={this.validateEmail}

                      />
                      <div className='invalid-feedback'>{this.state.emailError}</div>
                  </div>
        
                  <p onClick={this.onFlagForgot} className="btnLink btn btn-link">Already have an account? Log in.</p>
                  <MDBBtn type={"submit"} className="btn-auth" onClick={this.onSubmit}>Send Email<Icon size={24} icon={ic_keyboard_arrow_right} /></MDBBtn>
                </form>
                  </div>
                  )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default FormLogin;
