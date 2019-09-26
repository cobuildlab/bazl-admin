import React from 'react';
import View from 'react-flux-state';
import { toast } from 'react-toastify';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBIcon, MDBAnimation } from 'mdbreact';
import { landingStore, USER_EVENT } from '../landing/landing-store';
import { inventoryStore, INVENTORY_EVENT } from '../inventory/inventory-store';
import { fetchProfileAction, updateProfileAction } from './profile-actions';
import { fetchUserProducts } from '../inventory/inventory-actions';
import { userModel } from './Profile-models';
import { EditBasicInformation } from './components/EditBasicInformation';
import { Loader } from '../../components/Loader';
import SidebarComponent from '../../components/SidebarComponent';
import { salesStore, SALE_EVENT } from '../sales/sales-store';
import { fetchSales } from '../sales/sales-action';

class EditProfileView extends View {
  constructor(props) {
    super(props);
    const user = landingStore.getState(USER_EVENT);
    this.state = {
      user: { ...R.clone(userModel), ...user },
      loadingBankAccounts: false,
      loadingUser: false,
      loadingInventory: true,
      deleteBankAccountModalIsOpen: false,
      bankAccountIndex: 0,
      inventory: [],
      data: {
        totalSales: '0',
      },
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
    this.subscribe(landingStore, USER_EVENT, (user) => {
      this.setState(
        {
          loadingUser: false,
          loadingBankAccounts: false,
          deleteBankAccountModalIsOpen: false,
          user,
        },
        () => {
          toast.info('Successful');
          this.props.history.push('/profile');
        },
      );
    });
    this.subscribe(salesStore, SALE_EVENT, (sale) => {
      let totalSales = 0;
      sale.forEach((element) => {
        let { products } = element;
        products.forEach((product) => {
          totalSales =
            totalSales + parseFloat(product.price) * product.totalQuantity;
        });
      });
      let newData = R.clone(this.state.data);
      newData.totalSales = totalSales;
      this.setState({
        data: newData,
      });
    });
    fetchUserProducts();
    fetchProfileAction();
    fetchSales();
  }

  onUpdateUser = (updateUser) => {
    const user = R.clone(this.state.user);
    user.name = updateUser.name;
    user.description = updateUser.description;
    user.picture = updateUser.picture;
    this.setState({ loadingUser: true }, () => {
      updateProfileAction(user);
    });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      deleteBankAccountModalIsOpen: !prevState.deleteBankAccountModalIsOpen,
    }));
  };

  flagEdit = () => {
    this.props.history.push('/profile');
  };

  render() {
    const { name, description, picture } = this.state.user;
    const { loadingUser, data } = this.state;
    return (
      <SidebarComponent>
        <div className="d-flex justify-content-between nav-admin body">
          <div>
            <h2 className="m-0">Edit Profile</h2>
          </div>
          <div>
            <Link to={'/profile'} className="btn btn-circle btn-circle-link">
              Profile
              <MDBIcon icon="upload" className="ml-1" />
            </Link>
          </div>
        </div>
        <MDBAnimation type="fadeIn">
          <MDBContainer>
            <MDBRow>
              <EditBasicInformation
                name={name}
                description={description}
                picture={picture}
                onCancel={this.flagEdit}
                onSave={this.onUpdateUser}
                data={data}
              />
            </MDBRow>
            {loadingUser ? (
              <div className="text-center">
                <Loader />
              </div>
            ) : (
              <div></div>
            )}
          </MDBContainer>
        </MDBAnimation>
      </SidebarComponent>
    );
  }
}

export default EditProfileView;
