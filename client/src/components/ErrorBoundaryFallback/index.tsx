import { Box } from '@mui/material';
import React from 'react';

const ErrorBoundaryFallback = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        border: '1px solid #d32f2f',
        color: '#d32f2f',
      }}
    >
      Something went wrong with SignalR Connection!
    </Box>
  );
};

export default ErrorBoundaryFallback;
