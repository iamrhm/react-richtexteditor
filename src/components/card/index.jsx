import React from 'react';

import './style.module.css';

const Card = ({
  id,
  name,
  intro,
  image,
}) => {
  return (
    <div className="card-container">
      <div className="super-hero-image">
        <img
          className="super-hero-image"
          src={image}
          alt=""
        />
      </div>
      <div className="info-block">
        <div className="item-title">
          { name }
        </div>
        <div className="item-subtitle">
          { intro }
        </div>
      </div>
    </div>
  );
}

export default Card;
