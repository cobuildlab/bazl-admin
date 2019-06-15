import React from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardText } from 'mdbreact';

import ImgCardDama from '../assets/img/ropa-dama.jpg';
import ImgCardHombre from '../assets/img/ropa-hombre.jpg';

class SliderCards extends React.Component {
  render() {
    return (
      <MDBRow>
        <MDBCol md="12">
          <h6 className="mt-4 mb-3">Recently Tagged Publications</h6>
        </MDBCol>
        <div
          className="scrollbar scrollbar-primary "
          style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
          <MDBCard
            style={{
              width: '10rem',
              margin: '15px',
              display: 'inline-block',
            }}>
            <div
              className="img-card"
              style={{ backgroundImage: `url(${ImgCardDama})` }}
            />
            <MDBCardText className="p-2">@username</MDBCardText>
          </MDBCard>
          <MDBCard
            style={{
              width: '10rem',
              margin: '15px',
              display: 'inline-block',
            }}>
            <div
              className="img-card"
              style={{ backgroundImage: `url(${ImgCardHombre})` }}
            />
            <MDBCardText className="p-2">@username</MDBCardText>
          </MDBCard>
          <MDBCard
            style={{
              width: '10rem',
              margin: '15px',
              display: 'inline-block',
            }}>
            <div
              className="img-card"
              style={{ backgroundImage: `url(${ImgCardDama})` }}
            />
            <MDBCardText className="p-2">@username</MDBCardText>
          </MDBCard>
          <MDBCard
            style={{
              width: '10rem',
              margin: '15px',
              display: 'inline-block',
            }}>
            <div
              className="img-card"
              style={{ backgroundImage: `url(${ImgCardHombre})` }}
            />
            <MDBCardText className="p-2">@username</MDBCardText>
          </MDBCard>
          <MDBCard
            style={{
              width: '10rem',
              margin: '15px',
              display: 'inline-block',
            }}>
            <div
              className="img-card"
              style={{ backgroundImage: `url(${ImgCardDama})` }}
            />
            <MDBCardText className="p-2">@username</MDBCardText>
          </MDBCard>
          <MDBCard
            style={{
              width: '10rem',
              margin: '15px',
              display: 'inline-block',
            }}>
            <div
              className="img-card"
              style={{ backgroundImage: `url(${ImgCardHombre})` }}
            />
            <MDBCardText className="p-2">@username</MDBCardText>
          </MDBCard>
        </div>
      </MDBRow>
    );
  }
}
export default SliderCards;
