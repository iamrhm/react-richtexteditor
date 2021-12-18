import React from 'react';

function MentionLink(props) {
  console.log(props);
  return (
    <a
      className="mentioned-list"
    >
      {props.children}
    </a>
  );
}

export default MentionLink;