import React from 'react'

import { 
  Grid,
  Paper,
  Typography
} from '@mui/material'

import HybridEmbed from './HybridEmbed'

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
                <HybridEmbed />
            </Grid>
        </Grid>
    )
}

export default HybridPage