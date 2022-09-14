import { Tab } from '@mui/material'
import React from 'react'

export function AsideTab ({children, ...props}) {
  
  return (
    <Tab sx={{padding: '10px', background: '#240376', color: '#fff'}} {...props}/>
  )
}