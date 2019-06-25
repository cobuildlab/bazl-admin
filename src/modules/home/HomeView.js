import React from 'react';
import View from 'react-flux-state';
import SidebarComponent from '../../components/SidebarComponent';
import { MDBContainer, MDBRow, MDBCol, MDBAnimation } from 'mdbreact';
import { Loader } from '../../components/Loader';
import TableSales from '../sales/TableSalesView';
import { Link } from 'react-router-dom';
import { inventoryStore, INVENTORY_EVENT } from '../inventory/inventory-store';
import { fetchUserProducts } from '../inventory/inventory-actions';
import * as R from 'ramda';
import SliderCardsMap from '../../components/SliderCardsMap';

class HomeView extends View {
  constructor(props) {
    super(props);
    this.state = {
      loadingInventory: true,
      inventory: [],
    };
  }

  componentDidMount() {
    this.subscribe(inventoryStore, INVENTORY_EVENT, (data) => {
      let { inventory } = this.state;
      inventory = R.clone(data);
      this.setState({
        inventory,
        loadingInventory: false,
      });
    });
    fetchUserProducts();
  }

  render() {
    const { inventory, loadingInventory } = this.state;
    return (
      <React.Fragment>
        <SidebarComponent>
          <div className="d-flex justify-content-between nav-admin">
            <div>
              <h2 className="m-0 font-body">
                <strong>Home</strong>
              </h2>
            </div>
            <div>
              <Link
                to="/new-product"
                className="btn btn-circle btn-circle-link">
                Upload
              </Link>
            </div>
          </div>
          <MDBAnimation type="fadeIn">
            <MDBContainer className="body" fluid>
              <MDBRow>
                <MDBCol>
                  <h5 className="font-weight-bold text-black-50">Total Tags</h5>
                  <h6 className="text-primary font-weight-bold">
                    0<small className="font-weight-normal"> Tag</small>
                  </h6>
                </MDBCol>
                <MDBCol>
                  <h5 className="font-weight-bold text-black-50">
                    Total Impressions
                  </h5>
                  <h6 className="text-primary font-weight-bold">
                    0 <small>Impressions</small>
                  </h6>
                </MDBCol>
                <MDBCol>
                  <h5 className="font-weight-bold text-black-50">
                    Total Sales
                  </h5>
                  <h6 className="text-primary font-weight-bold">
                    0 <small>Sales</small>
                  </h6>
                </MDBCol>
                <MDBCol>
                  <h5 className="font-weight-bold text-black-50">
                    Total Products
                  </h5>
                  <h6 className="text-primary font-weight-bold">
                    0 <small>View</small>
                  </h6>
                </MDBCol>
              </MDBRow>
              <br></br>
              <h5 className="font-weight-bold text-black-50">
                Recently Publications
              </h5>
              {loadingInventory ? (
                <div className="text-center">
                  <Loader />
                </div>
              ) : (
                <SliderCardsMap inventory={inventory} />
              )}
              <h5 className="font-weight-bold text-black-50">Recent Sales</h5>
              <TableSales />
            </MDBContainer>
          </MDBAnimation>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default HomeView;
