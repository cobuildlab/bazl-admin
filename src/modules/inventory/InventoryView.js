import React from 'react';
import { MDBContainer, MDBBtn, MDBAnimation, MDBRow, MDBCol } from 'mdbreact';
import * as R from 'ramda';
import SidebarComponent from '../../components/SidebarComponent';
import { Loader } from '../../components/Loader';
import TableInventory from './components/TableInventory';
import { Link } from 'react-router-dom';
import View from 'react-flux-state';
import {
  INVENTORY_EVENT,
  INVENTORY_ERROR_EVENT,
  // SEARCH_EVENT,
  inventoryStore,
} from './inventory-store';
import { fetchUserProducts } from './inventory-actions';
import { toast } from 'react-toastify';

class InventoryView extends View {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productsAux: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.subscribe(inventoryStore, INVENTORY_EVENT, (product) => {
      let products = product;
      products.sort(function(o1, o2) {
        if (o1.name > o2.name) {
          return 1;
        } else if (o1.name < o2.name) {
          return -1;
        }
        return 0;
      });
      this.setState({
        products: products,
        productsAux: products,
        loading: false,
      });
    });
    this.subscribe(inventoryStore, INVENTORY_ERROR_EVENT, (error) => {
      toast.error(error.message);
    });
    // this.subscribe(inventoryStore, SEARCH_EVENT, (product) => {
    //   const products = product;
    //   console.log("SEARCH_EVENT",products);
    //   let productsAux = R.clone(products)
    //   this.setState({
    //     products,
    //     productsAux,
    //   });
    // });
    fetchUserProducts();
  }
  // onSearch = (e) => {
  //   if (e.key === 'Enter') {
  //     let search = e.target.value;

  //     searchProduct(search);
  //   }
  // };

  onChange = (e) => {
    let { products } = this.state;
    let productsAux = R.clone(products);

    productsAux = products.filter(function(item) {
      return (
        item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });

    this.setState({
      productsAux,
    });
  };

  ViewInventory() {
    if (this.state.products.length === 0) {
      return (
        <MDBContainer className="empty-inventory" fluid>
          <MDBRow>
            <MDBCol>
              <h4>Oh No! You have an empty Inventory</h4>
              <h5>Create your first Product now</h5>
              <MDBBtn className="btn btn-circle-success ">
                <Link to="/new-product" className="inventory-link">
                  Publish Now
                </Link>
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      );
    } else {
      return (
        <MDBAnimation type="fadeIn">
          <MDBContainer className="body" fluid>
            <TableInventory products={this.state.productsAux} />
          </MDBContainer>
        </MDBAnimation>
      );
    }
  }
  render() {
    return (
      <React.Fragment>
        <SidebarComponent>
          <div className="d-flex justify-content-between nav-admin">
            <div className="form-group form-group-search">
              <input
                type="text"
                placeholder="Search"
                className="form-control form-control-search"
                id="formGroupExampleInput"
                // onKeyPress={this.onSearch}
                onChange={this.onChange}
              />
            </div>
            <div>
              <Link
                to="/new-product"
                className="btn btn-circle btn-circle-link">
                Upload
              </Link>
            </div>
          </div>

          {this.state.loading ? <Loader /> : <>{this.ViewInventory()}</>}
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default InventoryView;
