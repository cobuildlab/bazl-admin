import React from 'react';
import { MDBCol, MDBCard, MDBCardText, MDBContainer } from 'mdbreact';
import PropTypes from 'prop-types';

const SliderCardsMap = (props) => {
  const { inventory } = props;
  return (
    <React.Fragment>
      <MDBCol md="12">
        <h6 className="mt-4 mb-3 font-body"><strong>Recently Tagged Publications</strong></h6>
      </MDBCol>
      <div
        className="scrollbar scrollbar-primary "
        style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
        {inventory.length !== 0 ? (
          <div>
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
        ) : (
          <MDBContainer className="body" fluid>
            <h4 className="font-weight-bold text-black-50">
              There Are No Publications Yet
            </h4>
          </MDBContainer>
        )}
      </div>
    </React.Fragment>
  );
};

SliderCardsMap.propTypes = {
  inventory: PropTypes.array.isRequired,
};

export default SliderCardsMap;
