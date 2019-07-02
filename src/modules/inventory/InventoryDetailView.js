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

class InventoryDetailView extends View {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      image: null,
      loading: true,
      showNewProductForm: false,
      product: {},
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
    if (confirm) {
      updateProduct(
        R.clone(this.state.data),
        this.state.image,
        this.props.match.params.id,
      );
      this.setState({
        loading: true,
      });
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
    const { data } = this.state;
    let picture = this.state.data.picture;
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
                      <MDBRow>
                        <MDBCol>
                          <MDBInput
                            type="text"
                            name="name"
                            onChange={this.onChange}
                            label={this.state.data.name}
                            className="mt-0"
                          />
                        </MDBCol>
                        <MDBCol>
                          <select
                            className="browser-default custom-select mt-1"
                            name="category"
                            onChange={this.onChange}
                            value={this.state.data.category}>
                            <option disabled>Choose your option</option>
                            <option value="Clock">Clock</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Dresses">Dresses</option>
                            <option value="Pants">Pants</option>
                            <option value="Jeans">Jeans</option>
                            <option value="Straps">Straps</option>
                            <option value="Handbags">Handbags</option>
                            <option value="Wallets">Wallets</option>
                            <option value="Scarves">Scarves</option>
                            <option value="Costumes">Costumes</option>
                            <option value="Sports Shoes">Sport Shoes</option>
                            <option value="Telephone">Telephone</option>
                          </select>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol>
                          <MDBInput
                            name="description"
                            onChange={this.onChange}
                            label={this.state.data.description}
                            className="mt-0"
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol>
                          <MDBRow></MDBRow>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
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

                        <div className="d-flex justify-content-center align-items-center">
                          <MDBBtn
                            onClick={() => this.changeFlag()}
                            className="btn btn-circle">
                            Add Product
                          </MDBBtn>
                        </div>
                        {this.state.showNewProductForm ? (
                          <div>
                            <h5>New Product</h5>
                            <MDBCard style={{ marginBottom: '20px' }}>
                              <MDBCardBody
                                style={{
                                  paddingBottom: '0px',
                                  paddingTop: '0px',
                                }}>
                                <MDBRow className="d-flex justify-content-around align-items-center text-center">
                                  <MDBCol md="3">
                                    <MDBInput
                                      label="Size"
                                      className="mt-0"
                                      type="text"
                                      name="size"
                                      onChange={this.onChangeProduct}
                                    />
                                  </MDBCol>
                                  <MDBCol md="3">
                                    <MDBInput
                                      label="Color"
                                      className="mt-0"
                                      type="text"
                                      name="color"
                                      onChange={this.onChangeProduct}
                                    />
                                  </MDBCol>
                                  <MDBCol md="3">
                                    <MDBInput
                                      label="Quantity"
                                      className="mt-0"
                                      type="number"
                                      name="quantity"
                                      onChange={this.onChangeProduct}
                                    />
                                  </MDBCol>
                                  <MDBCol md="1">
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
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="12">
                          <h5 className="text-center font-weight-bold">
                            *Bazl Fee 15%
                          </h5>
                        </MDBCol>
                        <MDBCol md="2">
                          <MDBInput
                            name="price"
                            onChange={this.onChange}
                            label={this.state.data.price}
                            className="mt-0"
                          />
                        </MDBCol>
                        <MDBCol>
                          <small>
                            Commission percentage Minimum commission 3%
                          </small>
                        </MDBCol>
                        <MDBCol md="2">
                          <select
                            className="browser-default custom-select mt-1"
                            name="commission"
                            value={this.state.data.commission}
                            onChange={this.onChange}>
                            <option disabled>Choose your Commission</option>
                            <option value="3%">3%</option>
                            <option value="4%">4%</option>
                            <option value="5%">5%</option>
                          </select>
                        </MDBCol>
                        <MDBCol>
                          <MDBInput
                            name="additionalFee"
                            onChange={this.onChange}
                            label={this.state.data.additionalFee}
                            className="mt-0"
                          />
                        </MDBCol>
                        <MDBCol>
                          <MDBInput
                            name="shippingFee"
                            onChange={this.onChange}
                            label={this.state.data.shippingFee}
                            className="mt-0"
                          />
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
          </MDBAnimation>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default InventoryDetailView;
