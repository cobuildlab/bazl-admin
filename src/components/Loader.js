import React from 'react';
import { ClipLoader } from 'react-spinners';
import { Container } from 'mdbreact';

const Loader = () => (
  < Container
    fluid
    className = "h-100 d-flex align-items-center d-flex justify-content-center bg-left" >
    <ClipLoader sizeUnit={'px'} size={120} color={'#44c1f6'} loading={true} />
  </Container>
);

export { Loader };
