import React from 'react'
import { Box, Select } from '@mui/material'
import { styled } from '@mui/system';

const MySelectSort = styled(Select)({
  height: '50px',
  border: '1px solid #240376',
  color: '#240376',
  borderRadius: '4px',
  padding: '8px',
  width: '100%',
  boxSizing: 'border-box'
})


export function MySelect ({children, about, ...props}) {
  
  return (
      <Box p={1}>
        <MySelectSort {...props}>
          {children}
        </MySelectSort>
      </Box>
      
  )
}
