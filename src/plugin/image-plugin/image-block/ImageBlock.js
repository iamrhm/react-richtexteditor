import React, { Component } from "react";

import BlockInput from "../../../components/util/block-input-component/BlockInput";

import "./ImageBlockStyle.css";

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
            <img src={this.props.data.src} alt="" className='upoaded-image'/>
          </div>
        </div>

        <figcaption
          className='imageCaption'>
          <BlockInput
            placeholder="Type caption for image (optional)"
            value={this.props.data.caption}
            onChange={this.handleCaptionChange}
            className='image-caption'
          />
        </figcaption>
      </div>
    );
  }
}