import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import SidebarComponent from "../../components/SidebarComponent";
import ImgDefault from "../../assets/img/img-default.png";
import { Link } from "react-router-dom";
import View from 'react-flux-state';
import {toast} from 'react-toastify';
import { inventoryStore, INVENTORY_DETAIL_EVENT, INVENTORY_DETAIL_ERROR, 
INVENTORY_UPDATE_EVENT,INVENTORY_UPDATE_ERROR,
INVENTORY_DELETE_EVENT,INVENTORY_DELETE_ERROR} from './inventory-store';
import { error } from 'pure-logger';
import { fetchDetailProduct, updateProduct,deleteProduct } from "./inventory-actions";
import * as R from 'ramda';

class InventoryDetailView extends View {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            image: null
        };
        this.onError = error.bind(this);

    }

    
    componentDidMount() {
        this.subscribe(inventoryStore, INVENTORY_DETAIL_EVENT, (data) => {
            this.setState({
                data: data
            })
         })
         this.subscribe(inventoryStore, INVENTORY_DETAIL_ERROR, (e) =>{
             toast.error(e.message);
         })
         this.subscribe(inventoryStore, INVENTORY_UPDATE_EVENT, () =>{
             this.props.history.push('/inventory');
             toast.success("Product Updated");
             
         })
         this.subscribe(inventoryStore, INVENTORY_UPDATE_ERROR, (e) =>{
             toast.error("Error Updating product" , e.message);
         })
         this.subscribe(inventoryStore, INVENTORY_DELETE_EVENT, () =>{
             this.props.history.push('/inventory');
             toast.success("Product Deleted");
         })
         this.subscribe(inventoryStore, INVENTORY_DELETE_ERROR, e =>{
             toast.error("Error Deleting prouct", e.message);
         })
        
         fetchDetailProduct(this.props.match.params.id);
        
    }

    onChange = (e) => {
        
        e.preventDefault();
        const data = this.state.data;
        data[e.target.name] = e.target.value;

        this.setState({
            data: data,
        });
    }


    onImageChange = (e) => {
        let reader = new FileReader();
        const data = this.state.data;
        const image = e.target.files[0];
        const picture = e.target.files[0];
        reader.onloadend = () => {
            data.picture = reader.result;
            
            this.setState({
                data: data,
                image: picture
            })
        }
        reader.readAsDataURL(image);
        
    }
    onUpdate = () => {
        updateProduct(R.clone(this.state.data), this.state.image, this.props.match.params.id);
    }
    onDelete = () =>{
        deleteProduct(this.props.match.params.id);
    }
    render() {
        let picture = this.state.data.picture;
        if (picture != null) {
            picture = <img
                src={this.state.data.picture}
                alt="default"
                className="img-fluid"
                width="auto"
            />
        } else {
            picture = <img
                src={ImgDefault}
                alt="default"
                className="img-fluid img-label"
                width="80"
            />
        }
        return (
            <React.Fragment>
                <SidebarComponent>
                    <div className="d-flex justify-content-between nav-admin body">
                        <div>
                            <h2 className="m-0">Product {this.state.data.name}</h2>
                        </div>
                        <div>
                            <Link
                                to="/new-product"
                                className="btn btn-circle btn-circle-link"
                            >
                                Publication
              </Link>
                        </div>

                    </div>
                    <form>
                        <MDBContainer className="body" fluid>
                            <MDBRow>
                                <MDBCol md="3">
                                    <label className="Customlabel text-center" htmlFor="upload-photo">
                                        {picture}
                                    </label>
                                    <input
                                        type="file"
                                        name="picture"
                                        id="upload-photo" onChange={this.onImageChange} />
                                    <small className="text-center">
                                        JPG or PNG format with a maximum of 5mb
                </small>
                                </MDBCol>
                                <MDBCol md="9">
                                    <MDBRow>
                                        <MDBCol>
                                            <MDBInput
                                                type="text"
                                                name='name'
                                                onChange={this.onChange}
                                                label={this.state.data.name}
                                                className="mt-0" />
                                        </MDBCol>
                                        <MDBCol>
                                            <select className="browser-default custom-select mt-1" name="category" onChange={this.onChange} value={this.state.data.category}>
                                                <option disabled>Choose your option</option>
                                                <option value="Clock">
                                                    Clock
                                                    </option>
                                                <option value="Accessories" >
                                                    Accessories
                                                </option>
                                                <option value="Shoes">
                                                    Shoes
                                                    </option>
                                                <option value="Dresses">
                                                    Dresses
                                                    </option>
                                                <option value="Pants">
                                                    Pants
                                                    </option>
                                                <option value="Jeans">
                                                    Jeans
                                                    </option>
                                                <option value="Straps">
                                                    Straps
                                                    </option>
                                                <option value="Handbags">
                                                    Handbags
                                                    </option>
                                                <option value="Wallets">
                                                    Wallets
                                                    </option>
                                                <option value="Scarves">
                                                    Scarves
                                                    </option>
                                                <option value="Costumes">
                                                    Costumes
                                                    </option>
                                                <option value="Sports Shoes">
                                                    Sport Shoes
                                                    </option>
                                                <option value="Telephone">
                                                    Telephone
                                                    </option>
                                            </select>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol>
                                            <MDBInput
                                                name='description'
                                                onChange={this.onChange}
                                                label={this.state.data.description}

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
                                                    <label className="container-radio" name="size" onChange={this.onChange}  >
                                                        XXS
                                                        <input type="radio" name="size" value="XSS" onChange={this.onChange} checked={this.state.data.size === 'XSS'} />
                                                        <span className="checkmark" />
                                                    </label>
                                                    <label className="container-radio">
                                                        xS
                                                            <input type="radio" name="size" value="XS" onChange={this.onChange} checked={this.state.data.size === 'XS'} />
                                                        <span className="checkmark" />
                                                    </label>
                                                    <label className="container-radio">
                                                        S
                                                        <input type="radio" name="size" value="S" onChange={this.onChange} checked={this.state.data.size === 'S'} />
                                                        <span className="checkmark" />
                                                    </label>
                                                    <label className="container-radio">
                                                        M
                                                        <input type="radio" name="size" value="M" onChange={this.onChange} checked={this.state.data.size === 'M'}/>
                                                        <span className="checkmark" />
                                                    </label>
                                                    <label className="container-radio">
                                                        L
                                                        <input type="radio" name="size" value="L" onChange={this.onChange} checked={this.state.data.size === 'L'}/>
                                                        <span className="checkmark" />
                                                    </label>
                                                    <label className="container-radio">
                                                        XL
                                                        <input type="radio" name="size" value="XL" onChange={this.onChange} checked={this.state.data.size === 'XL'} />
                                                        <span className="checkmark" />
                                                    </label>
                                                </MDBCol>
                                                <MDBCol md="3">
                                                    <h6 className="font-weight-bold m-0">
                                                        Quantity Article
                        </h6>
                                                    <input type="number" name="quantity" min="1" max="1000" defaultValue={this.state.data.quantity} onChange={this.onChange} />
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="12">
                                            <h6 className="font-weight-bold mb-3 mt-3">
                                                Color Article
                    </h6>
                                        </MDBCol>
                                        <MDBCol md="12">
                                            <label className="container-radio">
                                                Black
                                                <input type="radio" name="color" value="Black" onChange={this.onChange} checked={this.state.data.color === 'Black'}/>
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                White
                                                <input type="radio" name="color" value="White" onChange={this.onChange} checked={this.state.data.color === 'White'} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Gray
                                                <input type="radio" name="color" value="Gray" onChange={this.onChange} checked={this.state.data.color === 'Gray'} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Purple
                                                <input type="radio" name="color" value="Purple" onChange={this.onChange} checked={this.state.data.color === 'Purple'} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Orange
                                                 <input type="radio" name="color" value="Orange" onChange={this.onChange} checked={this.state.data.color === 'Orange'} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Beige
                                                <input type="radio" name="color" value="Beige" onChange={this.onChange} checked={this.state.data.color === 'Beige'}/>
                                                <span className="checkmark" />
                                            </label>
                                        </MDBCol>
                                        <MDBCol md="12">
                                            <label className="container-radio">
                                                Green
                                                <input type="radio" name="color" value="Green" onChange={this.onChange} checked={this.state.data.color === 'Green'} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio" >
                                                Yellow
                                                <input type="radio" name="color" value="Yellow" onChange={this.onChange} checked={this.state.data.color === 'Yellow'}/>
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Brown
                                                <input type="radio" name="color" value="Brown" onChange={this.onChange} checked={this.state.data.color === 'Brown'} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Blue
                                                <input type="radio" name="color" value="Blue" onChange={this.onChange} checked={this.state.data.color === 'Blue'}/>
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Red
                                                <input type="radio" name="radio" value="Red" onChange={this.onChange} checked={this.state.data.color === 'Red'} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Pink
                                                <input type="radio" name="color" value="Pink" onChange={this.onChange} checked={this.state.data.color === 'Pink'} />
                                                <span className="checkmark" />
                                            </label>
                                        </MDBCol>
                                        <MDBCol md="12">
                                            <MDBInput
                                                name='color'
                                                onChange={this.onChange}
                                                label={this.state.data.color}
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

                                                onChange={this.onChange}
                                                label={this.state.data.price}
                                                className="mt-0" />
                                        </MDBCol>
                                        <MDBCol>
                                            <small>Commission percentage Minimum commission 3%</small>
                                        </MDBCol>
                                        <MDBCol md="2">
                                            <select className="browser-default custom-select mt-1" name="commission" value={this.state.data.commission} onChange={this.onChange}>
                                                <option disabled>Choose your Commission</option>
                                                <option value="3%">3%</option>
                                                <option value="4%">4%</option>
                                                <option value="5%">5%</option>
                                            </select>
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBInput
                                                name='additionalFee'

                                                onChange={this.onChange}
                                                label={this.state.data.additionalFee}
                                                className="mt-0" />
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBInput
                                                name='shippingFee'

                                                onChange={this.onChange}
                                                label={this.state.data.shippingFee}
                                                className="mt-0" />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol className="text-center">
                                            <MDBBtn onClick={this.onUpdate} className="btn btn-circle mt-4 mb-5">
                                                Update
                    </MDBBtn>
                                            <MDBBtn onClick={this.onDelete} className="btn btn-circle-danger mt-4 mb-5">
                                                Delete
                    </MDBBtn>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </form>
                </SidebarComponent>
            </React.Fragment>
        );
    }
}

export default InventoryDetailView;