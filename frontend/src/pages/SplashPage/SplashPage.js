import React from 'react'

import { 
  Box,
  Grid,
  Typography
} from '@mui/material'


const SplashPage = () => {
    return (
        <Grid container spacing={3} sx={{ p: 2}}>
            <Grid item xs={12}>
                <Box>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Splash Page
                    </Typography>
                    <img src="https://place-puppy.com/300x300" />
                </Box>
            </Grid>
        </Grid>
    )
}

export default SplashPage