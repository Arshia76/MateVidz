import React from 'react';
import Load from './Loader1.gif';

const Loader = () => {
  return (
    <div className='d-flex justify-content-center align-items-center mt-5 w-100'>
      <img
        style={{ width: '300px', height: '300px' }}
        src={Load}
        alt='loading...'
      />
    </div>
  );
};

export default Loader;
