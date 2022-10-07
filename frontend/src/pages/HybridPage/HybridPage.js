import React from 'react'

import { 
  Grid,
  Paper,
  Typography
} from '@mui/material'

import HybridEmbed from './HybridEmbed'

const HybridPage = ({ routes }) => {
    return (
        <Grid container spacing={3} sx={{ p: 2}}>
            {/* <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper sx={{ p: 2}}>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Small Panel
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper sx={{ p: 2}}>
                            <Typography variant="h6" color="primary" gutterBottom>
                                Large Panel
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid> */}
            <Grid item xs={12}>
                <HybridEmbed routes={routes}/>
            </Grid>
        </Grid>
    )
}

export default HybridPage