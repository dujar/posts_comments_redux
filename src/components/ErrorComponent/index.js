import React from 'react';

const errorComponent = props => {
  return (
    <div>
      There is no page to load!
      {props.message}
      <div>Deal with it!</div>
    </div>
  );
};

export default errorComponent;
