import React from 'react';
import { MDBContainer, MDBAnimation } from 'mdbreact';
import SidebarComponent from '../../components/SidebarComponent';
import Logo from '../../assets/img/Bazl-logo.png';

class PrivacyView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SidebarComponent>
          <MDBAnimation type="fadeIn">
            <MDBContainer fluid className="body">
              <div className="d-flex justify-content-center p-4">
                <img src={Logo} alt="Bazl" className="img-fluid" />
              </div>
              <h1 className="d-flex justify-content-center p-4">
                Terms of services and privacy policy
              </h1>
              <p>
                &nbsp; &nbsp; &nbsp; &nbsp;Cras mattis consectetur purus sit
                amet fermentum. Cras justo odio, dapibus ac facilisis in,
                egestas eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros. Praesent commodo cursus magna, vel
                scelerisque nisl consectetur et. Vivamus sagittis lacus vel
                augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
                bibendum nulla sed consectetur. Praesent commodo cursus magna,
                vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                ullamcorper nulla non metus auctor fringilla. Cras mattis
                consectetur purus sit amet fermentum. Cras justo odio, dapibus
                ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean
                lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
                consectetur purus sit amet fermentum. Cras justo odio, dapibus
                ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
              </p>
              <p>
                &nbsp; &nbsp; &nbsp; &nbsp;Praesent commodo cursus magna, vel
                scelerisque nisl consectetur et. Vivamus sagittis lacus vel
                augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
                bibendum nulla sed consectetur. Praesent commodo cursus magna,
                vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                ullamcorper nulla non metus auctor fringilla. Cras mattis
                consectetur purus sit amet fermentum. Cras justo odio, dapibus
                ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean
                lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
                consectetur purus sit amet fermentum. Cras justo odio, dapibus
                ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
              </p>
              <p>
                &nbsp; &nbsp; &nbsp; &nbsp;Praesent commodo cursus magna, vel
                scelerisque nisl consectetur et. Vivamus sagittis lacus vel
                augue laoreet rutrum faucibus dolor auctor. Aenean lacinia
                bibendum nulla sed consectetur. Praesent commodo cursus magna,
                vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                ullamcorper nulla non metus auctor fringilla. Cras mattis
                consectetur purus sit amet fermentum. Cras justo odio, dapibus
                ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean
                lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla.
              </p>
            </MDBContainer>
          </MDBAnimation>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export { PrivacyView };
