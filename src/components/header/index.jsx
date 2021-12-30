import React from 'react'

import BackIcon from '../icons/back-icon';
import './style.css';

export default function Header() {
  return (
    <div className="header">
      <span className="back-icon">
        <BackIcon />
      </span>
      <div className="info">
      <div className="profile-image">
        🧑🏻
      </div>
      <div className="heder-text">
        Posting on <b>Super Hero Forum</b>
      </div>
      </div>
      <div className="post-btn-container">
        <button className="btn btn-post">
          Post
        </button>
      </div>
    </div>
  )
}
