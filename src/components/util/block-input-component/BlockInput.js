import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';

import './BlockInput.css'
export default class BlockInput extends Component {
  
  render() {
    let { value, onChange,placeholder } = this.props;
    return (
        <div className='block-input-container'>
          <TextField
            className = 'block-input-field'
            placeholder = {placeholder}
            value={value}
            fullWidth
            multiline
            margin="normal"
            InputLabelProps={{
              shrink: true,
              disableUnderline: true,
            }}
            onChange={(e)=>{onChange(e)}}
          />   

        </div>
    );
  }
}
