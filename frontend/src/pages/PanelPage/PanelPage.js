import React, { useEffect } from 'react'

import { 
  Grid,
  Paper,
  Typography
} from '@mui/material'

import PanelEmbed from './PanelEmbed'

const PanelPage = () => {
    const [data, setData] = React.useState()

    useEffect(() => {
        const handler = (event) => {
            if (event.origin === "https://example.retool.com") {
            try {
                const parsed = JSON.parse(event.data);
                if (parsed) {
                setData(parsed);
                }
            } catch (e) {}
            }
        };

        window.addEventListener("message", handler);

        return () => window.removeEventListener("message", handler);
    }, [])

    return (
        <Grid container spacing={3} sx={{ p: 2}}>
            <Grid item xs={6}>
                <Paper sx={{ p: 2}}>
                    <Typography variant="h6" color="primary" gutterBottom>
                        {JSON.stringify(data, null, 2)}
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