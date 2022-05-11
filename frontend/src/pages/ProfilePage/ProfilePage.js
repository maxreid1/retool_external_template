import React from 'react'

import { 
  Box,
  Divider,
  Grid,
  Paper,
  Typography 
} from '@mui/material'
import Highlight from 'react-highlight'


const ProfilePage = ({ user, userProfile, idTokenClaims, authTokenClaims }) => {
  return (
    <Grid container spacing={3} sx={{ p: 2}}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography variant="h5" color="primary" gutterBottom>
              Profile Page
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
            <Typography variant="h5" color="primary" gutterBottom>On this screen</Typography>
            <Typography variant="body1">Title bar shows the current user groups</Typography>
            <Typography variant="body1">Collapsible sidebar is based on content defined in /config/js, filtered by the user's group</Typography>
            <Typography variant="body1">User menu has placeholders for registration, login/out, and allows manual switching of user group</Typography>
            <Typography variant="body1">Notifications icon is just a placeholder</Typography>
            <Typography variant="body1">All design taken straight from Material UI (mui.com)</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography variant="h5" color="primary" gutterBottom>User data</Typography>
            <Typography variant="h6">user - useAuth0().user</Typography>
            <Highlight className="language-json">{JSON.stringify(user, null, 2)}</Highlight>
            <Divider />
            <Typography variant="h6">userProfile - based on Auth0 app_metadata and user_metadata</Typography>
            <Highlight className="language-json">{JSON.stringify(userProfile, null, 2)}</Highlight>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography variant="h5" color="primary" gutterBottom>ID and Access Token Claims</Typography>
            <Typography variant="h6">ID Token</Typography>
            <Highlight className="language-json">{JSON.stringify(idTokenClaims, null, 2)}</Highlight>
            <Divider />
            <Typography variant="h6">Auth Token</Typography>
            <Highlight className="language-json">{JSON.stringify(authTokenClaims, null, 2)}</Highlight>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ProfilePage