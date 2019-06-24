import React from 'react';
import PropTypes from 'prop-types';
import View from 'react-flux-state';
import firebase from 'firebase';
// import { ClipLoader } from 'react-spinners';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../modules/landing/landing-actions';
import { landingStore, USER_EVENT } from '../modules/landing/landing-store';

/**
 * User Session component
 */
class Session extends View {
  constructor(props) {
    super(props);
    this.state = {
      firebaseAcquired: false,
    };
  }

  async componentDidMount() {
    firebase.auth().onAuthStateChanged(async (firebaseUser) => {
      console.log(`DEBUG:firebaseUSer:`, firebaseUser);
      if (firebaseUser) {
        return await fetchUser(firebaseUser.email);
      }
      window.location.href = '/';
    });

    this.subscribe(landingStore, USER_EVENT, (user) => {
      console.log(`DEBUG:firebaseUSer:`, user);
      this.setState({ firebaseAcquired: true }, () => {});
    });
  }

  render() {
    const { firebaseAcquired } = this.state;
    if (firebaseAcquired === false)
      return (
        <Container
          fluid
          className="h-100 d-flex align-items-center d-flex justify-content-center bg-left">
          {/* <ClipLoader
            sizeUnit={'px'}
            size={150}
            color={'#123abc'}
            loading={true}
          /> */}
        </Container>
      );

    return this.props.children;
  }
}

Session.propTypes = {
  client: PropTypes.any,
  logOut: PropTypes.func,
  children: PropTypes.any,
};

export default withRouter(Session);
