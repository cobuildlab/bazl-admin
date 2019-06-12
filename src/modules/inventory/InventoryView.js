import React from "react";
import { Container, MDBContainer, MDBBtn, MDBIcon, MDBAnimation } from "mdbreact";
import SidebarComponent from "../../components/SidebarComponent";
import {ClipLoader} from 'react-spinners';
import TableInventory from "./components/TableInventory";
import View from 'react-flux-state';
import {INVENTORY_EVENT, INVENTORY_ERROR_EVENT, inventoryStore} from './inventory-store';
import { fetchUserProducts} from './inventory-actions';
import {toast} from 'react-toastify';
class InventoryView extends View {
  constructor(props){
    super(props);
    this.state ={
      products : [],
      loading:true
    }
  }
  componentDidMount() {
    this.subscribe(inventoryStore, INVENTORY_EVENT, (product) => {
      const products = product;
      this.setState({
        products: products,
        loading:false
      });
    });
    this.subscribe(inventoryStore, INVENTORY_ERROR_EVENT, (error) =>{
      toast.error(error.message);
    })
    fetchUserProducts();
  }
  render() {
    return (
      <React.Fragment>
          <SidebarComponent>
          <div className="d-flex justify-content-between nav-admin body">
            <div className="form-group form-group-search">
              <input
                type="text"
                placeholder="Search"
                className="form-control form-control-search"
                id="formGroupExampleInput"
                />
            </div>
                    <div>
                      <MDBBtn to="/new-product" className="btn btn-circle">
                        Search <MDBIcon icon="search" className="ml-1" />
                      </MDBBtn>
                    </div>
      </div>
                 
                  {this.state.loading ? (
                     <Container
                    fluid
                    className="h-100 d-flex align-items-center d-flex justify-content-center bg-left">
                    <ClipLoader
                      sizeUnit={'px'}
                      size={150}
                      color={'#123abc'}
                      loading={true}
                    />
                  </Container>
                  ): (
                    <>
          <MDBAnimation type='fadeIn' >
            <MDBContainer className="body" fluid>
              <TableInventory products ={this.state.products} />
            </MDBContainer>
          </MDBAnimation>
        </>  
            )}
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default InventoryView;
