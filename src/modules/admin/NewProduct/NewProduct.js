import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import SidebarComponent from "../../../components/SidebarComponent";

import ImgDefault from "../../../assets/img/img-default.png";
import * as R from 'ramda';
import { Link } from "react-router-dom";
import View from 'react-flux-state';
import {productModel} from './newproduct-models';
import { productStore, PRODUCT_EVENT, PRODUCT_ERROR_EVENT} from './newproduct-store';
import { toast } from 'react-toastify';
import { error } from 'pure-logger';
import { createProduct } from "./newproduct-actions";

class NewProductScreen extends View {
  constructor(props) {
    super(props);
    this.state = {
      data: R.clone(productModel)
    };
    this.onError = error.bind(this);

  }

  componentDidMount() {
    this.subscribe( productStore, PRODUCT_EVENT, () => {})
    this.subscribe( productStore, PRODUCT_ERROR_EVENT, (err) => {
      toast.error(err.message)
    })

  }

  onChange = (e) => {
    e.preventDefault();
    const { data } = this.state;
    data[e.target.name] = e.target.value;
    this.setState({
      data,
    });
  }

  onToggle = (valueIndex, optionsIndex, questionIndex) => {
    const { data } = this.state;
    const question = data[optionsIndex].options[questionIndex];
    question.values.forEach((value, i) => (value.checked = i === valueIndex));
    data[optionsIndex][questionIndex] = question;
    this.setState({ data });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState(() => {
      createProduct(R.clone(this.state.data))
    })
  }

  render() {
    const { data } = this.state;
    const {
      name,
      description,
      newColor,
      price,
      additionalFee,
      shippingFee } = data
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
                <label className="Customlabel text-center" htmlFor="upload-photo">
                  <img
                    src={ImgDefault}
                    alt="default"
                    className="img-fluid img-label"
                    width="80"
                  />
                </label>
                <input 
                  type="file" 
                  name="photo" 
                  id="upload-photo" />
                <small className="text-center">
                  JPG or PNG format with a maximum of 5mb
                </small>
              </MDBCol>
              <MDBCol md="9">
                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      name='name'
                      value={name} 
                      onChange={this.onChange}
                      label="Product Name" 
                      className="mt-0" />
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
                    <MDBInput 
                      name='description'
                      value={description}
                      onChange={this.onChange}
                      label="Description" 
                      className="mt-0" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <MDBRow>
                      <MDBCol md="9">
                        <div>
                          <h6 className="font-weight-bold mb-3">
                            Size Article
                          </h6>
                        </div>
                        <label className="container-radio">
                          XXS
                          <input  type="radio" checked="checked" name="radio" />
                          <span className="checkmark" />
                        </label>
                        <label className="container-radio">
                          xS
                          <input  type="radio" name="radio" />
                          <span className="checkmark" />
                        </label>
                        <label className="container-radio">
                          S
                          <input type="radio" name="radio" />
                          <span className="checkmark" />
                        </label>
                        <label className="container-radio">
                          M
                          <input type="radio" name="radio" />
                          <span className="checkmark" />
                        </label>
                        <label className="container-radio">
                          L
                          <input type="radio" name="radio" />
                          <span className="checkmark" />
                        </label>
                        <label className="container-radio">
                          XL
                          <input type="radio" name="radio" />
                          <span className="checkmark" />
                        </label>
                      </MDBCol>
                      <MDBCol md="3">
                        <h6 className="font-weight-bold m-0">
                          Quantity Article
                        </h6>
                        <select className="browser-default custom-select mt-1 mb-3">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <h6 className="font-weight-bold mb-3 mt-3">
                      Color Article
                    </h6>
                    <label className="container-radio">
                      Color
                      <input type="radio" checked="checked" name="radio" />
                      <span className="checkmark" />
                    </label>
                    <label className="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span className="checkmark" />
                    </label>
                    <label className="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span className="checkmark" />
                    </label>
                    <label className="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span className="checkmark" />
                    </label>
                    <label className="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span className="checkmark" />
                    </label>
                    <label className="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span className="checkmark" />
                    </label>
                  </MDBCol>
                  <MDBCol md="12">
                    <label className="container-radio">
                      Color
                      <input type="radio" checked="checked" name="radio" />
                      <span className="checkmark" />
                    </label>
                    <label className="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span className="checkmark" />
                    </label>
                    <label className="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span className="checkmark" />
                    </label>
                    <label className="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span className="checkmark" />
                    </label>
                    <label className="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span className="checkmark" />
                    </label>
                    <label className="container-radio">
                      Color
                      <input type="radio" name="radio" />
                      <span className="checkmark" />
                    </label>
                  </MDBCol>
                  <MDBCol md="12">
                    <MDBInput 
                      name='newColor'
                      value={newColor}
                      onChange={this.onChange}
                      label="Other Color" 
                      className="mt-0" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <h5 className="text-center font-weight-bold">
                      *Bazl Fee 15%
                    </h5>
                  </MDBCol>
                  <MDBCol md="2">
                    <MDBInput 
                      name='price'
                      value={price}
                      onChange={this.onChange}
                      label="Price" 
                      className="mt-0" />
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
                    <MDBInput 
                    name='additionalFee'
                    value={additionalFee}
                    onChange={this.onChange}
                    label="Additional Fee" 
                    className="mt-0" />
                  </MDBCol>
                  <MDBCol>
                    <MDBInput 
                    name='shippingFee'
                    value={shippingFee}
                    onChange={this.onChange}
                    label="Shipping Fee" 
                    className="mt-0" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol className="text-center">
                    <MDBBtn onClick={this.onSubmit} className="btn btn-circle mt-4 mb-5">
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
