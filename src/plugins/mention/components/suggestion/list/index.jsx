import React from 'react';

import './style.css';

const Suggestion = ({
  title,
  subtitle
}) => {
  const handleClick = (e) => {
    const addMentionEvent = new CustomEvent('add-mention', {
      detail: {
        title,
        subtitle
      }
    });
    window.dispatchEvent(addMentionEvent);
  }
  return (
    <div className="item">
      <div className="item-title" onClick={handleClick}>
        { title }
      </div>
      <div className="item-subtitle">
        {subtitle}
      </div>
    </div>
  );
}


export default Suggestion;