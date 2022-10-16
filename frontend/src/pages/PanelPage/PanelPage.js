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
            // if (event.origin === retoolDomain) {
            try {
                const parsed = JSON.parse(event.data);
                if (parsed) {
                    setData(parsed);
                }
            } catch (e) {}
            // }
        };

        window.addEventListener("message", handler);

        return () => window.removeEventListener("message", handler);
    }, [])

    return (
        <Grid container spacing={3} sx={{ p: 2}}>
             <Grid item xs={6}>
                <Paper sx={{ p: 2}}>
                    <PanelEmbed routes={routes} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={{ p: 2}}>
                    <Box sx={{ height: "660px" }}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Details for Selected Store
                        </Typography>
                        <Divider />
                        
                        {data && <Box sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                {data.City}, {data.State}
                            </Typography>
                            {/* <Chip label={data.City} /> */}
                            <Box sx={{ pt: 2 }}>
                                <Typography variant="h7">
                                   Current Status:
                                </Typography>
                                { data.is_active && <Typography color="green">
                                    🟢 {data.status} until {data.close}
                                </Typography>  }
                                { !data.is_active && <Typography color="red">
                                   🔴 Temporarily {data.status}. Coming Online At {data.open}
                                </Typography>  }
                                {/* <Typography variant="body1">
                                    {data.COUNTRY}
                                </Typography>  
                                <Typography variant="body1">
                                    {data.PHONE}
                                </Typography> */}
                            </Box>                      
                        </Box>}
                    </Box>
                </Paper>
            </Grid>
           
        </Grid>
    )
}

export default PanelPage