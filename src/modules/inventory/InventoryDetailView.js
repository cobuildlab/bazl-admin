import React from 'react';
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
import SidebarComponent from '../../components/SidebarComponent';
import ImgDefault from '../../assets/img/img-default.png';
import { Link } from 'react-router-dom';
import View from 'react-flux-state';
import { Products } from './components/Products';
import Validate from 'react-validate-form';
import { validations } from '../new-product/newproduct-utils';
import { totalQuantity } from './inventory-utils';
import { toast } from 'react-toastify';
import { Loader } from '../../components/Loader';
import {
  inventoryStore,
  INVENTORY_DETAIL_EVENT,
  INVENTORY_ERROR_EVENT,
  INVENTORY_UPDATE_EVENT,
  INVENTORY_DELETE_EVENT,
} from './inventory-store';
import { error } from 'pure-logger';
import {
  fetchDetailProduct,
  updateProduct,
  deleteProduct,
} from './inventory-actions';
import * as R from 'ramda';
import ModalUpdate from './components/ModalUpdate';
import ModalDelete from './components/ModalDelete';
import { getCategory } from '../new-product/newproduct-actions';
import {
  productStore,
  PRODUCT_CATEGORIES_EVENT,
} from '../new-product/newproduct-store';
import Color from '../../components/Color';

class InventoryDetailView extends View {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      image: null,
      loading: true,
      showNewProductForm: false,
      product: {},
      categories: [],
    };
    this.onError = error.bind(this);
  }

  componentDidMount() {
    this.subscribe(inventoryStore, INVENTORY_DETAIL_EVENT, (data) => {
      this.setState({
        data: data,
        loading: false,
      });
    });
    this.subscribe(inventoryStore, INVENTORY_ERROR_EVENT, (e) => {
      toast.error(e.message);
    });
    this.subscribe(inventoryStore, INVENTORY_UPDATE_EVENT, () => {
      this.props.history.push('/inventory');
      toast.success('Product Updated');
      this.setState({
        loading: false,
      });
    });
    this.subscribe(inventoryStore, INVENTORY_DELETE_EVENT, () => {
      this.props.history.push('/inventory');
      toast.success('Product Deleted');
      this.setState({
        loading: false,
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
    fetchDetailProduct(this.props.match.params.id);
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
  onUpdate = (confirm) => {
    const { name, description, products, price, shippingFee } = this.state.data;
    let finalQuantity = totalQuantity(this.state.data.products);
    if (confirm) {
      if (
        name === '' ||
        description === '' ||
        products.length === 0 ||
        price === '' ||
        shippingFee === ''
      ) {
        toast.error('All Fields are Required');
      } else {
        updateProduct(
          R.clone(this.state.data),
          this.state.image,
          finalQuantity,
          this.props.match.params.id,
        );
        this.setState({
          loading: true,
        });
      }
    }
  };

  onDelete = (confirm) => {
    if (confirm === true) {
      deleteProduct(this.props.match.params.id);
      this.setState({
        loading: true,
      });
    }
  };

  onNewProduct = () => {
    const data = this.state.data;
    let products = data.products.slice();
    products.push(this.state.product);
    data.products = products;
    console.log(data, 'data');
    this.setState({
      data: data,
      showNewProductForm: false,
    });
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

  render() {
    const { data, categories } = this.state;
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
        <label className="imgLabel" htmlFor="upload-photo">
          <img
            src={this.state.data.picture}
            alt="default"
            className="img-product"
            width="auto"
          />
        </label>
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
              <h2 className="m-0">Product {this.state.data.name}</h2>
            </div>
            <div>
              <Link
                to="/new-product"
                className="btn btn-circle btn-circle-link">
                Publication
              </Link>
            </div>
          </div>
          <MDBAnimation type="fadeIn" duration="1s">
            {this.state.loading ? (
              <Loader />
            ) : (
              <Validate validations={validations}>
                {({ validate, errorMessages, allValid }) => (
                  <form>
                    <MDBContainer className="body" fluid>
                      <MDBRow>
                        <MDBCol md="3">
                          {picture}
                          <input
                            type="file"
                            name="picture"
                            id="upload-photo"
                            onChange={this.onImageChange}
                          />
                          <small className="text-center">
                            JPG or PNG format with a maximum of 5mb
                          </small>
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
                                onChange={this.onChange}
                                value={this.state.data.category}>
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
                                value={this.state.data.description}
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
                                            className=" product mt-0"
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
                                          {/* <MDBInput
                                            label="Color"
                                            className="product mt-0"
                                            type="text"
                                            name="color"
                                            onChange={this.onChangeProduct}
                                            onKeyUp={validate}
                                            required
                                          /> */}
                                          <Color
                                            onChangeColor={this.onChangeColor}
                                          />
                                          <p className="error-message">
                                            {errorMessages.color}
                                          </p>
                                        </MDBCol>
                                        <MDBCol md="3">
                                          <MDBInput
                                            label="Quantity"
                                            className="product mt-0"
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
                            <MDBCol md="3">
                              <MDBInput
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
                              md="3"
                              style={{ display: 'flex', alignItems: 'center' }}>
                              <small>Add Additional Commission</small>
                            </MDBCol>
                            <MDBCol md="3">
                              <select
                                className="browser-default custom-select mt-1"
                                name="additionalFee"
                                onChange={this.onChange}
                                value={this.state.data.additionalFee}>
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
                            <MDBCol>
                              {/* <MDBInput
                                name="shippingFee"
                                onChange={this.onChange}
                                onKeyUp={validate}
                                label="Shipping Fee"
                                className="mt-0"
                                value={this.state.data.shippingFee}
                                required
                              /> */}
                              <select
                                className="browser-default custom-select mt-1"
                                name="shippingFee"
                                onChange={this.onChange}
                                value={this.state.data.shippingFee}>
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
                              <ModalUpdate callbackFromParent={this.onUpdate} />
                              <ModalDelete callbackFromParent={this.onDelete} />
                            </MDBCol>
                          </MDBRow>
                        </MDBCol>
                      </MDBRow>
                    </MDBContainer>
                  </form>
                )}
              </Validate>
            )}
          </MDBAnimation>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default InventoryDetailView;
