import React from 'react'

import BackIcon from '../icons/back-icon';
import './style.css';

export default function Header() {
  return (
    <header className="header">
      <div className="back-icon">
        <BackIcon />
      </div>
      <div className="info">
      <div className="profile-image">
        <span>
          🧑🏻
        </span>
      </div>
      <div className="heder-text">
        Posting on <b>Super Hero Forum</b>
      </div>
      </div>
      <div className="post-btn-container">
        <button className="btn btn-post pointer">
          Post
        </button>
      </div>
    </header>
  )
}
