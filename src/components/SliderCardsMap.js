import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardText } from "mdbreact";

import ImgCardDama from "../assets/img/ropa-dama.jpg";
import ImgCardHombre from "../assets/img/ropa-hombre.jpg";

const SliderCardsMap = (props) => {
  const { inventory } = props;
  console.log("inventory desde SliderCardsMap ", inventory);

  return (
    <MDBRow>
      <MDBCol md="12">
        <h6 className="mt-4 mb-3">Recently Tagged Publications</h6>
      </MDBCol>
      <div
        className="scrollbar scrollbar-primary "
        style={{ overflow: "auto", whiteSpace: "nowrap" }}
      >
        {inventory ? (inventory.map((item, i) => (
          <MDBCard
            key={i} item={item}
            style={{
              width: "10rem",
              margin: "15px",
              display: "inline-block"
            }}
          >
            <div
              className="img-card"
              style={{ backgroundImage: `url(${item.picture})` }}
            />
            <MDBCardText className="p-2">{item.name}</MDBCardText>
          </MDBCard>
        ))) : (
            <h1>Hola</h1>
          )
        }

      </div>
    </MDBRow>
  );
}
export default SliderCardsMap;
