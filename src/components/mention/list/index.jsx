import React from 'react';

import './style.css';

const Suggestion = ({
    title,
    subtitle
  }) => {
  return (
    <div className="item">
      <div className="item-title">
        { title }
      </div>
      <div className="item-subtitle">
        {subtitle}
      </div>
    </div>
  );
}


export default Suggestion;