import { Box, Checkbox, FormControlLabel  } from '@mui/material'
import React from 'react'



export function MyCheckBox ({label, ...props}) {
  console.log(label)
  return (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            {...props}
            sx={{ "& .MuiSvgIcon-root": { color: "#240376", fontSize: '2em' } }}
          />
        }
        sx={{'css-ahj2mt-MuiTypography-root': {fontSize: '45px'}}}
        label={label}
      />
    </Box>
  );
}
