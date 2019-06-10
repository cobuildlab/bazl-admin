import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = () => (
  <ClipLoader sizeUnit={'px'} size={120} color={'#44c1f6'} loading={true} />
);

export { Loader };
