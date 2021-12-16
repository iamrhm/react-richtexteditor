import React, { Component } from "react";

import "./style.css";

export default class ImageBlock extends Component {
  handleCaptionChange = (event) => {
    event.stopPropagation();
    this.props.container.updateData({ caption: event.target.value });
  }

  render() {
    return (
      <div  className='image-component'>
        <div className='image-container'>
          <div className='image-wrapper'>
            <img src={this.props.data.src} alt="" className='uploaded-image'/>
          </div>
        </div>
      </div>
    );
  }
}