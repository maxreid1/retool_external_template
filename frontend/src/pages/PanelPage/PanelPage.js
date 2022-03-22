import React from 'react'

import { 
  Grid,
  Paper,
  Typography
} from '@mui/material'

import PanelEmbed from './PanelEmbed'

const PanelPage = () => {
    return (
        <Grid container spacing={3} sx={{ p: 2}}>
            <Grid item xs={6}>
                <Paper sx={{ p: 2}}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Panel Page
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={{ p: 2}}>
                    <PanelEmbed />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default PanelPage