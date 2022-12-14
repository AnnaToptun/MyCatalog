import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { Box } from '@mui/material';
const classLoading ={
    loading: {
        position: 'relative',
        color: '#240376',
        size: '150px',
    },
    loadingBox: {
        display: 'flex', 
        justifyContent: 'center', 
        margin: '20% 0'
    },
}
export function Loading({children}) {
    return (
        <Box style={classLoading.loadingBox}>
            <Stack  spacing={4}>
                <CircularProgress style={classLoading.loading} size={250}>
                    {children}
                </CircularProgress> 
            </Stack>
        </Box>
        
    );
}