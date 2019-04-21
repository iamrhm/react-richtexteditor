import React from 'react';
import Button from '@material-ui/core/Button';
import './InputPanel.css';


const InputPanel = ({ buttonValues, toggleStyle }) => {
  return (
    <div className='input-panel'>
      {
        Object.keys(buttonValues).map((key) => {
          return (
          <Button 
            key={key}
            onClick = {(e)=>toggleStyle(key)}
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