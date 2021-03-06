import React from 'react';
import View from 'react-flux-state';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBAnimation } from 'mdbreact';
import SidebarComponent from '../../components/SidebarComponent';
import { Loader } from '../../components/Loader';
import TableSales from '../sales/TableSalesView';
import { inventoryStore, INVENTORY_EVENT } from '../inventory/inventory-store';
import { fetchUserProducts } from '../inventory/inventory-actions';
import SliderCardsMap from '../../components/SliderCardsMap';
import { salesStore, SALE_EVENT } from '../sales/sales-store';
import { fetchSales } from '../sales/sales-action';
import { landingStore, USER_EVENT } from '../landing/landing-store';

class HomeView extends View {
  constructor(props) {
    super(props);
    this.state = {
      loadingInventory: true,
      inventory: [],
      sales: [],
      data: {
        tags: '0',
        impressions: '0',
        sales: '0',
        products: '0',
      },
    };
  }

  componentDidMount() {
    this.subscribe(inventoryStore, INVENTORY_EVENT, (datas) => {
      let { inventory } = this.state;
      inventory = R.clone(datas);
      let newData = R.clone(this.state.data);
      let totalProducts = inventory.length;
      let totalImpressions = 0;

      inventory.forEach((element) => {
        if (element.views) {
          totalImpressions = totalImpressions + element.views;
        }
      });
      newData.products = totalProducts;
      newData.impressions = totalImpressions;

      this.setState({
        inventory,
        loadingInventory: false,
        data: newData,
      });
    });
    this.subscribe(salesStore, SALE_EVENT, (sale) => {
      const sales = sale;
      let newData = R.clone(this.state.data);
      let totalSales = sales.length;
      newData.sales = totalSales;
      this.setState({
        data: newData,
      });
    });
    const sessionUser = landingStore.getState(USER_EVENT);
    let newData = R.clone(this.state.data);
    newData.tags = sessionUser.totalTags;
    this.setState({
      data: newData,
    });
    fetchUserProducts();
    fetchSales();
  }

  detailPublication = (publication) => {
    this.props.history.push(`/inventory-details/${publication.productID}`);
  };

  render() {
    const { inventory, loadingInventory, data } = this.state;
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
                    {data.tags}
                    <small className="font-weight-normal"> Tag</small>
                  </h6>
                </MDBCol>
                <MDBCol>
                  <h5 className="font-weight-bold text-black-50">
                    Total Impressions
                  </h5>
                  <h6 className="text-primary font-weight-bold">
                    {data.impressions} <small>Impressions</small>
                  </h6>
                </MDBCol>
                <MDBCol>
                  <h5 className="font-weight-bold text-black-50">
                    Total Sales
                  </h5>
                  <h6 className="text-primary font-weight-bold">
                    {data.sales} <small>Sales</small>
                  </h6>
                </MDBCol>
                <MDBCol>
                  <h5 className="font-weight-bold text-black-50">
                    Total Products
                  </h5>
                  <h6 className="text-primary font-weight-bold">
                    {data.products} <small>Products</small>
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
                <SliderCardsMap
                  inventory={inventory}
                  detailPublication={this.detailPublication}
                />
              )}
              <br />
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
