
import React from 'react'
import { styled } from '@mui/system';

const MyButton = styled('button')({
  border: '1px solid rgb(250, 250, 250)',
  background: '#240376',
  color: 'rgb(250, 250, 250)',
  borderRadius: '4px',
  padding: '10px',
  minWidth: '150px',
  boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)',
  fontSize: '16px',
  cursor: 'pointer'
});

export function Buttons ({children, ...props}) {
  
  return (
    <MyButton variant='outlined'  {...props}>{children}</MyButton>
    
  )
}