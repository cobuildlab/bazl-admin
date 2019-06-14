import React from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardText } from 'mdbreact';
import PropTypes from 'prop-types';

const SliderCardsMap = (props) => {
  const { inventory } = props;
  return (
    <MDBRow>
      <MDBCol md="12">
        <h6 className="mt-4 mb-3">Recently Tagged Publications</h6>
      </MDBCol>
      <div
        className="scrollbar scrollbar-primary "
        style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
        {inventory.map((item, i) => (
          <MDBCard
            key={i}
            item={item}
            style={{
              width: '10rem',
              margin: '15px',
              display: 'inline-block',
            }}>
            <div
              className="img-card"
              style={{ backgroundImage: `url(${item.picture})` }}
            />
            <MDBCardText className="p-2">{item.name}</MDBCardText>
          </MDBCard>
        ))}
      </div>
    </MDBRow>
  );
};

SliderCardsMap.propTypes = {
  inventory: PropTypes.string.isRequired,
};

export default SliderCardsMap;
