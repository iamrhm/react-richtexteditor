import React from 'react';

import './style.css';

const MentionComponent = (props) => {
  return (
    <span className="mention">
      {props.children}
    </span>
  );
};

export default MentionComponent;