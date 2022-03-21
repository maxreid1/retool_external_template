import React from 'react'

import { 
  Box,
  Divider,
  Grid,
  Link,
  Paper,
  Typography 
} from '@mui/material'


const HomePage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              Exciting Homepage :)
            </Typography>
            <Typography variant="body1">Barebones framework only - demo content to follow!</Typography>
            <Typography variant="body1">Monorepo with frontend and backend in separate workspaces</Typography>
            <Typography variant="body1">Should be easy to make fast modifications to labeling, theming (soon!), api responses</Typography>
            <Typography variant="body1">Although frontend and backend are separate, can use just two files in root for most config:</Typography>
            <Typography variant="body1">1) /start.example can be used as a startup script, setting all necessary env variables</Typography>
            <Typography variant="body1">2) /config.js can be used to store simple modifications (e.g. menu choices, icons, themes) </Typography>
            <Typography variant="body1">All choices up for discussion as no real standards for mono-repos, and it's deliberately a bit hacky to support changes in field by SEs</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>On this screen:</Typography>
            <Typography variant="body1">Title bar shows the current user groups</Typography>
            <Typography variant="body1">Collapsible sidebar is based on content defined in /config/js, filtered by the user's group</Typography>
            <Typography variant="body1">User menu has placeholders for registration, login/out, and allows manual switching of user group</Typography>
            <Typography variant="body1">Notifications icon is just a placeholder</Typography>
            <Typography variant="body1">All design taken straight from Material UI (mui.com)</Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default HomePage