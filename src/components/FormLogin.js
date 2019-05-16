import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { Icon } from "react-icons-kit";
import { ic_mail_outline } from "react-icons-kit/md/ic_mail_outline";
import { ic_lock_outline } from "react-icons-kit/md/ic_lock_outline";
import { facebook } from "react-icons-kit/fa/facebook";
import { googlePlus } from "react-icons-kit/fa/googlePlus";
import { ic_keyboard_arrow_right } from "react-icons-kit/md/ic_keyboard_arrow_right";

class FormLogin extends React.Component {
  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12" className="p-0">
            <form className="p-3">
              <div className="text-center">
                <MDBBtn size="sm" className="btn-auth text-left mb-3 p-0">
                  <Icon icon={facebook} className="btn-icon" /> Login with
                  Facebook
                </MDBBtn>
                <MDBBtn size="sm" className="btn-auth text-left mb-3 p-0">
                  <Icon icon={googlePlus} className="btn-icon" /> Login with
                  Google
                </MDBBtn>
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

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <Icon icon={ic_mail_outline} />
                  </span>
                </div>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <Icon icon={ic_lock_outline} />
                  </span>
                </div>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                />
              </div>
              <p className="text-center">Don't remember your password?</p>
            </form>
            <div className="text-center">
              <MDBBtn className="btn-auth">
                Login <Icon size={24} icon={ic_keyboard_arrow_right} />
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default FormLogin;
