import React from 'react';
import { toast } from 'react-toastify';
import { error } from 'pure-logger';
import * as R from 'ramda';
import View from 'react-flux-state';
import Validate from 'react-validate-form';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBAnimation,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from 'mdbreact';
import {
  productStore,
  PRODUCT_EVENT,
  PRODUCT_ERROR_EVENT,
  PRODUCT_CATEGORIES_EVENT,
} from './newproduct-store';
import { landingStore, LOGIN_EVENT } from '../landing/landing-store';
import { createProduct, getCategory } from './newproduct-actions';
import SidebarComponent from '../../components/SidebarComponent';
import ModalComponent from './components/ModalComponent';
import Color from '../../components/Color';
import ImgDefault from '../../assets/img/img-default.png';
import { validations } from './newproduct-utils';
import { ProductModel } from './newproduct-models';
import { Loader } from '../../components/Loader';
import { Products } from './components/Products';
import { totalQuantity } from '../inventory/inventory-utils';

class NewProductView extends View {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      userID: '',
      image: null,
      showNewProductForm: false,
      product: {},
      categories: [],
      btnDisabled: true,
      loading: false,
      fieldsRequired: false,
    };
    this.onError = error.bind(this);
  }

  componentWillMount() {
    const model = R.clone(ProductModel);
    this.setState({
      data: model,
    });
  }

  componentDidMount() {
    this.subscribe(productStore, PRODUCT_EVENT, () => {
      this.props.history.push('/inventory');
      toast.success('Product Uploaded');
    });
    this.subscribe(productStore, PRODUCT_ERROR_EVENT, (e) => {
      toast.error(e.message);
    });
    this.subscribe(landingStore, LOGIN_EVENT, (user) => {
      this.setState({
        userID: user.id,
      });
    });
    this.subscribe(productStore, PRODUCT_CATEGORIES_EVENT, (categories) => {
      categories.sort(function(o1, o2) {
        if (o1.name > o2.name) {
          return 1;
        } else if (o1.name < o2.name) {
          return -1;
        }
        return 0;
      });
      this.setState({
        categories,
      });
    });
    getCategory();
  }

  onChange = (e) => {
    e.preventDefault();
    const data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({
      data: data,
    });
  };

  onImageChange = (e) => {
    let reader = new FileReader();
    const data = this.state.data;
    const image = e.target.files[0];
    const picture = e.target.files[0];
    reader.onloadend = () => {
      data.picture = reader.result;
      this.setState({
        data: data,
        image: picture,
      });
    };
    reader.readAsDataURL(image);
  };

  onNewProduct = () => {
    const { product } = this.state;
    if (product && product.size && product.quantity && product.color) {
      const data = this.state.data;
      let products = data.products.slice();
      products.push(this.state.product);
      data.products = products;
      this.setState({
        data: data,
        showNewProductForm: false,
        fieldsRequired: false,
      });
    } else {
      toast.error('All Fields are Required');
      this.setState({ fieldsRequired: true });
    }
  };

  onChangeProduct = (e) => {
    const product = R.clone(this.state.product);
    product[e.target.name] = e.target.value;
    this.setState({
      product: product,
    });
  };

  onChangeColor = (color) => {
    const product = R.clone(this.state.product);
    product['color'] = color;
    this.setState({
      product: product,
    });
  };

  onDeleteProduct = (index) => {
    const data = this.state.data;
    data.products.splice(index, 1);
    this.setState({
      data,
    });
  };

  changeFlag = () => {
    this.setState((prevState) => ({
      showNewProductForm: !prevState.showNewProductForm,
    }));
  };

  onSubmit = () => {
    const { name, category, description, products, price } = this.state.data;
    let finalQuantity = totalQuantity(products);
    if (
      name === '' ||
      category === '' ||
      description === '' ||
      products.length === 0 ||
      price === ''
    ) {
      toast.error('All Fields are Required');
    } else {
      createProduct(R.clone(this.state.data), this.state.image, finalQuantity);
      this.setState({
        loading: true,
      });
    }
  };

  render() {
    const { data, categories, fieldsRequired, product } = this.state;
    let picture = this.state.data.picture;
    let percent = [];
    for (let index = 1; index <= 30; index++) {
      let objAux = {
        value: index,
        name: index + '%',
      };
      percent.push(objAux);
    }

    if (picture != null) {
      picture = (
        <img
          src={this.state.data.picture}
          alt="default"
          className="img-product"
          width="auto"
        />
      );
    } else {
      picture = (
        <label className="Customlabel text-center" htmlFor="upload-photo">
          <img
            src={ImgDefault}
            alt="default"
            className="img-fluid img-label"
            width="80"
          />
        </label>
      );
    }
    return (
      <React.Fragment>
        <SidebarComponent>
          <div className="d-flex justify-content-between nav-admin">
            <div>
              <h2 className="m-0">New Product</h2>
            </div>
            <div>
              <Link
                to="/data-import"
                className="btn btn-circle btn-circle-link">
                Import Csv
              </Link>
            </div>
          </div>
          {this.state.loading ? (
            <Loader />
          ) : (
            <MDBAnimation type="fadeIn" dutarion="1s">
              <Validate validations={validations}>
                {({ validate, errorMessages, allValid }) => (
                  <form>
                    <MDBContainer className="body" fluid>
                      <MDBRow>
                        <MDBCol className="text-center" md="3">
                          {picture}
                          <input
                            type="file"
                            name="picture"
                            id="upload-photo"
                            accept="image/*"
                            onChange={this.onImageChange}
                          />
                          <small>JPG or PNG format with a maximum of 5mb</small>
                        </MDBCol>
                        <MDBCol md="9">
                          <MDBRow style={{ marginBottom: '20px' }}>
                            <MDBCol>
                              <MDBInput
                                type="text"
                                name="name"
                                onChange={this.onChange}
                                onKeyUp={validate}
                                value={this.state.data.name}
                                label="Product Name"
                                className="mt-0"
                                required
                              />
                              <p className="error-message">
                                {errorMessages.name}
                              </p>
                            </MDBCol>
                            <MDBCol>
                              <select
                                className="browser-default custom-select mt-1"
                                name="category"
                                onChange={this.onChange}>
                                <option selected disabled>
                                  Choose your option
                                </option>
                                {categories.map((category) => (
                                  <option
                                    key={category.value}
                                    value={category.value}>
                                    {category.name}
                                  </option>
                                ))}
                              </select>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow>
                            <MDBCol>
                              <MDBInput
                                name="description"
                                onChange={this.onChange}
                                label="Description"
                                className="mt-0"
                              />
                              <p className="error-message">
                                {errorMessages.description}
                              </p>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow>
                            <MDBCol md="12">
                              {data.products.length !== 0 ? (
                                <div>
                                  {data.products.map((product, index) => (
                                    <Products
                                      key={index}
                                      index={index}
                                      product={product}
                                      onDeleteProduct={() =>
                                        this.onDeleteProduct(index)
                                      }
                                    />
                                  ))}
                                </div>
                              ) : (
                                <MDBContainer className="body" fluid>
                                  <h6 className="text-black-50 text-center">
                                    Add size, color and quantity per product
                                  </h6>
                                </MDBContainer>
                              )}

                              <div className="d-flex justify-content-center align-items-center details-btn">
                                <MDBBtn
                                  onClick={() => this.changeFlag()}
                                  className="btn btn-circle">
                                  Add Details
                                </MDBBtn>
                              </div>
                              {this.state.showNewProductForm ? (
                                <div>
                                  <MDBCard
                                    style={{
                                      marginBottom: '20px',
                                    }}>
                                    <MDBCardBody
                                      style={{
                                        paddingBottom: '0px',
                                        paddingTop: '5px',
                                        marginTop: '5px',
                                      }}>
                                      <MDBRow className="d-flex justify-content-around align-items-center text-center">
                                        <MDBCol md="3">
                                          <MDBInput
                                            label="Size"
                                            className={`product mt-0 ${
                                              fieldsRequired && !product.size
                                                ? 'red-borders'
                                                : ''
                                            }`}
                                            type="text"
                                            name="size"
                                            onChange={this.onChangeProduct}
                                            onKeyUp={validate}
                                            required
                                          />
                                          <p className="error-message">
                                            {errorMessages.size}
                                          </p>
                                        </MDBCol>
                                        <MDBCol md="3">
                                          <Color
                                            className={
                                              fieldsRequired && !product.color
                                                ? 'red-borders'
                                                : ''
                                            }
                                            onChangeColor={this.onChangeColor}
                                          />
                                          <p className="error-message">
                                            {errorMessages.color}
                                          </p>
                                        </MDBCol>
                                        <MDBCol md="3">
                                          <MDBInput
                                            label="Quantity"
                                            className={`product mt-0 ${
                                              fieldsRequired &&
                                              !product.quantity
                                                ? 'red-borders'
                                                : ''
                                            }`}
                                            type="number"
                                            name="quantity"
                                            onChange={this.onChangeProduct}
                                            onKeyUp={validate}
                                            required
                                          />
                                          <p className="error-message">
                                            {errorMessages.quantity}
                                          </p>
                                        </MDBCol>
                                        <MDBCol
                                          md="1"
                                          style={{
                                            marginTop: '-5px',
                                            paddingLeft: '0px',
                                          }}>
                                          <MDBBtn
                                            className="btn-add"
                                            onClick={this.onNewProduct}>
                                            <MDBIcon icon="plus" />
                                          </MDBBtn>
                                        </MDBCol>
                                      </MDBRow>
                                    </MDBCardBody>
                                  </MDBCard>
                                </div>
                              ) : (
                                <div></div>
                              )}
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
                                type="number"
                                name="price"
                                onChange={this.onChange}
                                onKeyUp={validate}
                                value={this.state.data.price}
                                label="Price"
                                className="mt-0"
                                required
                              />
                              <p className="error-message">
                                {errorMessages.price}
                              </p>
                            </MDBCol>
                            <MDBCol
                              md="2"
                              style={{ display: 'flex', alignItems: 'center' }}>
                              <small>Add Additional Commission</small>
                            </MDBCol>
                            <MDBCol md="3">
                              <select
                                className="browser-default custom-select mt-1"
                                name="additionalFee"
                                onChange={this.onChange}>
                                <option selected disabled>
                                  Select %
                                </option>
                                {percent.map((category) => (
                                  <option
                                    key={category.value}
                                    value={category.value}>
                                    {category.name}
                                  </option>
                                ))}
                              </select>
                              <p className="error-message">
                                {errorMessages.additionalFee}
                              </p>
                            </MDBCol>
                            <MDBCol
                              md="2"
                              style={{ display: 'flex', alignItems: 'center' }}>
                              <small>Free Shipping</small>
                            </MDBCol>
                            <MDBCol md="3">
                              <select
                                className="browser-default custom-select mt-1"
                                name="shippingFee"
                                onChange={this.onChange}>
                                <option selected key="Not" value="Not">
                                  Not
                                </option>
                                <option key="Yes" value="Yes">
                                  Yes
                                </option>
                              </select>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow>
                            <MDBCol className="text-center">
                              <ModalComponent
                                allValid={allValid}
                                callbackFromParent={this.onSubmit}
                              />
                            </MDBCol>
                          </MDBRow>
                        </MDBCol>
                      </MDBRow>
                    </MDBContainer>
                  </form>
                )}
              </Validate>
            </MDBAnimation>
          )}
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default NewProductView;
