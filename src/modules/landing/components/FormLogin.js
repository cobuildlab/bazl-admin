import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { Icon } from "react-icons-kit";
import { ic_mail_outline } from "react-icons-kit/md/ic_mail_outline";
import { ic_lock_outline } from "react-icons-kit/md/ic_lock_outline";
import { ic_keyboard_arrow_right } from "react-icons-kit/md/ic_keyboard_arrow_right";
import View from "react-flux-state";
import { landingStore, LOGIN_EVENT, LOGIN_ERROR_EVENT } from "../landing-store";
import { onLogin } from "../landing-actions";
import { error } from "pure-logger";
import { toast } from "react-toastify";

class FormLogin extends View {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
  }

  onSubmit = e => {
    const { email, password } = this.state;
    e.preventDefault();
    this.setState(() => {
      onLogin({ email, password });
    });
    console.log(email);
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12" className="p-0">
            <form className="p-3">
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
            </form>
            <div className="text-center">
              <MDBBtn
                type={"submit"}
                className="btn-auth"
                onClick={this.onSubmit}
              >
                Sign Up <Icon size={24} icon={ic_keyboard_arrow_right} />
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default FormLogin;
