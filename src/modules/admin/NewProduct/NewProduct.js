import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import SidebarComponent from "../../../components/SidebarComponent";

import ImgDefault from "../../../assets/img/img-default.png";

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
                <label className="Customlabel text-center" for="upload-photo">
                  <img
                    src={ImgDefault}
                    alt="default"
                    className="img-fluid img-label"
                    width="80"
                  />
                </label>
                <input type="file" name="photo" id="upload-photo" />
                <small className="text-center">
                  JPG or PNG format with a maximum of 5mb
                </small>
              </MDBCol>
              <MDBCol md="9">
                <MDBRow>
                  <MDBCol>
                    <MDBInput label="Product Name" className="mt-0" />
                  </MDBCol>
                  <MDBCol>
                    <select className="browser-default custom-select mt-1">
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
                    <h6 className="font-weight-bold mb-3 mt-3">Size Article</h6>
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
                <MDBRow>
                  <MDBCol md="12">
                    <h6 className="font-weight-bold mb-3 mt-3">
                      Color Article
                    </h6>
                    <label class="container-radio">
                      Color
                      <input type="radio" checked="checked" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                  </MDBCol>
                  <MDBCol md="12">
                    <label class="container-radio">
                      Color
                      <input type="radio" checked="checked" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                    <label class="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span class="checkmark" />
                    </label>
                  </MDBCol>
                  <MDBCol md="12">
                    <MDBInput label="Other Color" className="mt-0" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <h5 className="text-center font-weight-bold">
                      *Bazl Fee 15%
                    </h5>
                  </MDBCol>
                  <MDBCol md="2">
                    <MDBInput label="Price" className="mt-0" />
                  </MDBCol>
                  <MDBCol>
                    <small>Commission percentage Minimum commission 3%</small>
                  </MDBCol>
                  <MDBCol md="2">
                    <select className="browser-default custom-select mt-1">
                      <option value="1">3%</option>
                      <option value="2">4%</option>
                      <option value="3">5%</option>
                    </select>
                  </MDBCol>
                  <MDBCol>
                    <MDBInput label="Additional Fee" className="mt-0" />
                  </MDBCol>
                  <MDBCol>
                    <MDBInput label="Shipping Fee" className="mt-0" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol className="text-center">
                    <MDBBtn className="btn btn-circle mt-4 mb-5">
                      Publish
                    </MDBBtn>
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
