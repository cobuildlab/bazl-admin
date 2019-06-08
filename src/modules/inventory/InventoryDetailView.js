import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import SidebarComponent from "../../components/SidebarComponent";
import ImgDefault from "../../assets/img/img-default.png";
import { Link } from "react-router-dom";
import View from 'react-flux-state';
import { inventoryStore, INVENTORY_DETAIL_EVENT} from './inventory-store';
import { error } from 'pure-logger';
import { fetchDetailProduct } from "./inventory-actions";

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
         console.log(this.props.match.params.id);
         fetchDetailProduct(this.props.match.params.id);
        
    }

    onChange = (e) => {
        console.log(this.state);
        e.preventDefault();
        console.log(e.target.name, e.target.value);
        const data = this.state.data;
        data[e.target.name] = e.target.value;
        console.log(data);

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
            console.log(data);
            this.setState({
                data: data,
                image: picture
            })
        }
        reader.readAsDataURL(image);
        console.log(this.state);
    }
    onSubmit = (e) => {
     console.log("Hey, Take it Easy Man, Isn't over Yet");
        
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
                                New Publications
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
                                            <select className="browser-default custom-select mt-1" name="category" onChange={this.onChange}>
                                                <option>Choose your option</option>
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
                                                    <label className="container-radio" name="size" onChange={this.onChange} >
                                                        XXS
                          <input type="radio" name="size" value="XSS" onChange={this.onChange} />
                                                        <span className="checkmark" />
                                                    </label>
                                                    <label className="container-radio">
                                                        xS
                          <input type="radio" name="size" value="XS" onChange={this.onChange} />
                                                        <span className="checkmark" />
                                                    </label>
                                                    <label className="container-radio">
                                                        S
                          <input type="radio" name="size" value="S" onChange={this.onChange} />
                                                        <span className="checkmark" />
                                                    </label>
                                                    <label className="container-radio">
                                                        M
                          <input type="radio" name="size" value="M" onChange={this.onChange} />
                                                        <span className="checkmark" />
                                                    </label>
                                                    <label className="container-radio">
                                                        L
                          <input type="radio" name="size" value="L" onChange={this.onChange} />
                                                        <span className="checkmark" />
                                                    </label>
                                                    <label className="container-radio">
                                                        XL
                          <input type="radio" name="size" value="XL" onChange={this.onChange} />
                                                        <span className="checkmark" />
                                                    </label>
                                                </MDBCol>
                                                <MDBCol md="3">
                                                    <h6 className="font-weight-bold m-0">
                                                        Quantity Article
                        </h6>
                                                    <input type="number" name="quantity" min="1" max="1000" label={this.state.data.number} onChange={this.onChange} />
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
                      <input type="radio" name="color" value="Black" onChange={this.onChange} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                White
                      <input type="radio" name="color" value="White" onChange={this.onChange} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Gray
                      <input type="radio" name="color" value="Gray" onChange={this.onChange} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Purple
                      <input type="radio" name="color" value="Purple" onChange={this.onChange} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Orange
                      <input type="radio" name="color" value="Orange" onChange={this.onChange} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Beige
                      <input type="radio" name="color" value="Beige" onChange={this.onChange} />
                                                <span className="checkmark" />
                                            </label>
                                        </MDBCol>
                                        <MDBCol md="12">
                                            <label className="container-radio">
                                                Green
                      <input type="radio" name="color" value="Green" onChange={this.onChange} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio" >
                                                Yellow
                      <input type="radio" name="color" value="Yellow" onChange={this.onChange} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Brown
                      <input type="radio" name="color" value="Brown" onChange={this.onChange} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Blue
                      <input type="radio" name="color" value="Blue" onChange={this.onChange} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Red
                      <input type="radio" name="radio" value="Red" onChange={this.onChange} />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-radio">
                                                Pink
                      <input type="radio" name="color" value="Pink" onChange={this.onChange} />
                                                <span className="checkmark" />
                                            </label>
                                        </MDBCol>
                                        <MDBCol md="12">
                                            <MDBInput
                                                name='color'
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

                                                onChange={this.onChange}
                                                label={this.state.data.price}
                                                className="mt-0" />
                                        </MDBCol>
                                        <MDBCol>
                                            <small>Commission percentage Minimum commission 3%</small>
                                        </MDBCol>
                                        <MDBCol md="2">
                                            <select className="browser-default custom-select mt-1" name="commission" label={this.state.data.commission} onChange={this.onChange}>
                                                <option value=''>  </option>
                                                <option value="3">3%</option>
                                                <option value="4">4%</option>
                                                <option value="5">5%</option>
                                            </select>
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBInput
                                                name='additionalFee'

                                                onChange={this.onChange}
                                                label="Additional Fee"
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
                                            <MDBBtn onClick={this.onSubmit} className="btn btn-circle mt-4 mb-5">
                                                Publish
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