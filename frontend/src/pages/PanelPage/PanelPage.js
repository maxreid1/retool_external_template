import React, { useEffect } from 'react'

import { 
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography
} from '@mui/material'

import PanelEmbed from './PanelEmbed'

import { retoolDomain } from '../../../config'

const PanelPage = ({ routes }) => {
    const [data, setData] = React.useState()

    useEffect(() => {
        const handler = (event) => {
            if (event.origin === retoolDomain) {
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
                    <Box sx={{ height: "660px" }}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Details for Selected Customer
                        </Typography>
                        <Divider />
                        
                        {data && <Box sx={{ p: 2 }}>
                            <Typography variant="h6" color="secondary" gutterBottom>
                                {data.CONTACT_NAME}, {data.COMPANY_NAME}
                            </Typography>
                            <Chip label={data.CONTACT_TITLE} />
                            <Box sx={{ pt: 2 }}>
                                <Typography variant="body1">
                                    {data.ADDRESS}
                                </Typography>
                                <Typography variant="body1">
                                    {data.CITY}
                                </Typography>  
                                <Typography variant="body1">
                                    {data.COUNTRY}
                                </Typography>  
                                <Typography variant="body1">
                                    {data.PHONE}
                                </Typography>
                            </Box>                      
                        </Box>}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={{ p: 2}}>
                    <PanelEmbed routes={routes} />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default PanelPage