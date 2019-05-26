import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import './InputModal.css'

const formControlStyle = {
  flexDirection: 'row'
}

const InputModal = ({
  entityType,
  open,
  onChange = () => { },
  saveInput = () => { },
  onClose = () => { },
  userInputLink,
}) => {
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={(e) => onClose(e)}
    >
      <DialogContent>
        {
          entityType === 'link' && 
          <FormControl
          style={formControlStyle}
          >
            <TextField
              id="outlined-name"
              label="Link"
              value={userInputLink}
              onChange={(e) => onChange(e,entityType)}
              margin="normal"
              variant="outlined"
            />
            {
              userInputLink.length > 0 &&
              <IconButton
                color="primary"
                component="span"
                onMouseDown={(e) => saveInput(e,entityType)}
              >
                <Icon>check</Icon>
              </IconButton>
            }
            {
              userInputLink.length <= 0 &&
              <IconButton
                color="primary"
                component="span"
                onMouseDown={(e) => saveInput(e,entityType)}
              >
                <Icon>close</Icon>
              </IconButton>
            }
        </FormControl>
        }
      </DialogContent>
    </Dialog>
  )
}

export default InputModal;