import React from 'react';
import {Box, CircularProgress} from '@mui/material';

const Loader = () => {

    return (
        <Box
            top={0} left={0} bottom={0} right={0}
            position="absolute" display="flex"
            alignItems="center" justifyContent="center"
            style={{backgroundColor:"#AAAAAA77",zIndex:"10000"}}
        >
            <CircularProgress/>
        </Box>
    )
};

export default Loader;