import React from 'react';
import { MDBContainer, MDBBtn, MDBIcon, MDBAnimation, MDBRow, MDBCol } from 'mdbreact';
import SidebarComponent from '../../components/SidebarComponent';
import { Loader } from '../../components/Loader';
import TableInventory from './components/TableInventory';
import { Link } from 'react-router-dom';
import View from 'react-flux-state';
import { INVENTORY_EVENT, INVENTORY_ERROR_EVENT, SEARCH_EVENT, inventoryStore } from './inventory-store';
import { fetchUserProducts, searchProduct } from './inventory-actions';
import { toast } from 'react-toastify';

class InventoryView extends View {
  constructor(props){
    super(props);
    this.state ={
      products : [],
      loading:true,
    }
  }
  componentDidMount() {
    this.subscribe(inventoryStore, INVENTORY_EVENT, (product) => {
      const products = product;
      this.setState({
        products: products,
        loading:false,
      });
    });
    this.subscribe(inventoryStore, INVENTORY_ERROR_EVENT, (error) =>{
      toast.error(error.message);
    })
    this.subscribe(inventoryStore, SEARCH_EVENT, (product) => {
      const products = product;
      console.log(products);
      this.setState({
        products : products,
      })

    })
    fetchUserProducts();

  }

  onSearch = (e) =>{
    if(e.key === 'Enter'){

      let search = e.target.value;
      
      searchProduct(search);
    }

    
  }
  ViewInventory(){
    if(this.state.products.length === 0){
      return (
        <MDBContainer className = "empty-inventory" fluid >
          <MDBRow>
            <MDBCol >
              <h2>Oh No! You have an empty Inventory</h2>
              <h3>Create your first Product now</h3>
              < MDBBtn className = "btn btn-circle-success " >
                <Link to="/new-product" className="inventory-link">Publish Now</Link>
              </MDBBtn>

            </MDBCol>
          </MDBRow>
        </MDBContainer>
      );
    }else{
      return (<MDBAnimation type="fadeIn" >
        <MDBContainer className="body" fluid>
          <TableInventory products ={this.state.products} />
        </MDBContainer>
      </MDBAnimation>
      ); }
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
                onKeyPress={this.onSearch}
              />
            </div>
            <div>
              <MDBBtn to="/new-product" className="btn btn-circle">
                        Search <MDBIcon icon="search" className="ml-1" />
              </MDBBtn>
            </div>
          </div>
                 
          {this.state.loading ? (
            <Loader/>
          ): (
                    <>
            {this.ViewInventory()}
        </>  
          )}
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default InventoryView;
