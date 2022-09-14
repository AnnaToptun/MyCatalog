import React from 'react'
import { Box } from '@mui/system'
import { Input } from '@mui/material'
import styled from '@emotion/styled';

const InputBlock = styled(Input)({
    border: '1px solid #240376',
    color: '#240376',
    borderRadius: '4px',
    padding: '6px',
    width: '100%',
    fontSize: '1.2em'
});

export function MyInput ({...props}) {
  
  return (
    <Box p={1}>
      <InputBlock  {...props}/>
    </Box>
    
  )
}
