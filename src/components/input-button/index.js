import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';

import './InputPanel.css';

const buttonStyle = {
  border: '.5px solid rgba(0, 0, 0, 0.19)',
  margin: '1%',
  color: 'rgba(0, 0, 0, 0.5)'
}
const activeButtonStyle = {
  border: '.5px solid rgba(0, 0, 0, 0.19)',
  margin: '1%',
}
const InputPanel = ({ 
  editorState, 
  buttonValues, 
  userEventListner, 
}) => {
  let currentInlineStyle = editorState.getCurrentInlineStyle()
  return (
    <div className='input-panel'>
      {
        Object.keys(buttonValues).map((key) => {
          if(key === 'image'){
            return(
              <Fragment
              key={key}
              >
                <input
                  accept="image/*"
                  id="image-button-file"
                  multiple
                  type="file"
                  className = 'image-input'
                  onChange={(e) => userEventListner(e,'image')}
                />
                <label htmlFor="image-button-file" className='input-image-label'>
                  <Button
                    component="span"
                    style={currentInlineStyle.has(key) ? activeButtonStyle : buttonStyle}
                    color={currentInlineStyle.has(key) ? 'primary' : 'default'}
                    key={key}
                  >
                    {key.toUpperCase()}
                  </Button>
                </label>
            </Fragment>
            )
          }
          return (
            <Button
              style={currentInlineStyle.has(key) ? activeButtonStyle : buttonStyle}
              color={currentInlineStyle.has(key) ? 'primary' : 'default'}
              key={key}
              onMouseDown={(e) => userEventListner(e, key)}
            >
              {key.toUpperCase()}
            </Button>

          )
        })
      }
    </div>
  )
}
export default InputPanel