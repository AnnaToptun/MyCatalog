import React from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { Box } from '@mui/material';
import {styled} from '@material-ui/styles';
const TextAreaNew = styled(TextareaAutosize)({
  border: '1px solid #240376',
  color: '#240376',
  borderRadius: '4px',
  padding: '1rem',
  width: '100%',
  height: '100px',
  fontSize: '18px',
  textAlign: 'justify',
  resize: 'vertical',
    boxSizing: 'border-box',
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
})
export function TextArea ({ ...props}) {
  return (
    <Box p={1}>
      <TextAreaNew {...props}/>
    </Box>
    
  )
}
