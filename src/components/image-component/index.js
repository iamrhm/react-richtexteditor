import React from 'react';

import './ImageComponent.css'

const Image = ({ block, contentState })  => {
  const entityKey = block.getEntityAt(0);
  const { src, data } = entityKey ? contentState.getEntity(entityKey).getData() : {};
  return (
    <div className='image-component'>
      <div className='image-container'>
        <div className='image-wrapper'>
          <img className='upoaded-image' alt='uploaded' src={src}/>
        </div>
      </div>
      <div className="text-container">
        <h3 placeholder={data}>{data}</h3>
      </div>
    </div>
  );
};

export default Image