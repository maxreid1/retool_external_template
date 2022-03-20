import React from 'react'

import { 
  Box,
  Grid,
  Paper,
  Typography
} from '@mui/material'

import Retool from 'react-retool'

import { publicApps } from '../../../config'

const HybridPage = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Hybrid Page
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Hybrid Page
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Retool url={publicApps.hybridPage} />
                </Box>
            </Grid>
        </Grid>
    )
}

export default HybridPage