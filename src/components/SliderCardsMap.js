import React from 'react';
import { MDBCard, MDBCardText, MDBContainer } from 'mdbreact';
import PropTypes from 'prop-types';

const SliderCardsMap = (props) => {
  const { inventory } = props;
  return (
    <React.Fragment>
      <h4 className="font-weight-bold text-black-50">Recently Publications</h4>
      <div
        className="scrollbar scrollbar-primary"
        style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
        {inventory.length !== 0 ? (
          <div>
            {inventory.map((item, i) => (
              <MDBCard
                key={i}
                item={item}
                className="hover"
                style={{
                  width: '10rem',
                  margin: '15px',
                  display: 'inline-block',
                }}>
                <div
                  className="img-card-publication"
                  style={{ backgroundImage: `url(${item.picture})` }}
                />
                <MDBCardText className="p-2">{item.name}</MDBCardText>
              </MDBCard>
            ))}
          </div>
        ) : (
          <MDBContainer className="body" fluid>
            <h4 className="text-black-50">There Are No Publications Yet</h4>
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
