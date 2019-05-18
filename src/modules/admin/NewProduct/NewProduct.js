import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import SidebarComponent from "../../../components/SidebarComponent";

import { Link } from "react-router-dom";

class NewProductScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SidebarComponent>
          <div className="d-flex justify-content-between nav-admin body">
            <div>
              <h2 className="m-0">New Product</h2>
            </div>
            <div>
              <Link
                to="/new-product"
                className="btn btn-circle btn-circle-link"
              >
                New Publications
              </Link>
            </div>
          </div>
          <MDBContainer className="body" fluid>
            <MDBRow>
              <MDBCol md="3">
                <label className="Customlabel" for="upload-photo">
                  Browse...
                </label>
                <input type="file" name="photo" id="upload-photo" />
              </MDBCol>
              <MDBCol md="9">
                <MDBRow>
                  <MDBCol>
                    <MDBInput label="Product Name" className="mt-0" />
                  </MDBCol>
                  <MDBCol>
                    <select className="browser-default custom-select">
                      <option>Choose your option</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                    </select>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <MDBInput label="Description" className="mt-0" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <label class="container-radio">
                      XXS
                      <input type="radio" checked="checked" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      xS
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      S
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      M
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      L
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      XL
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default NewProductScreen;
