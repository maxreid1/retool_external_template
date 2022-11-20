import React from 'react'

import { 
  Box,
  Divider,
  Grid,
  Paper,
  Typography 
} from '@mui/material'
import Highlight from 'react-highlight'

import { homepage, theme } from '../../../config'


const ProfilePage = ({ user, userProfile, idTokenClaims, authTokenClaims }) => {
  return (
    <Grid container style={{ overflow: 'scroll'}} spacing={3} sx={{ p: 2}}>

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

      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography variant="h5" color="primary" gutterBottom>Homepage Config</Typography>
            <Highlight className="language-json">{JSON.stringify(homepage, null, 2)}</Highlight>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Box>
            <Typography variant="h5" color="primary" gutterBottom>Theme</Typography>
            <Highlight className="language-json">{JSON.stringify(theme, null, 2)}</Highlight>
          </Box>
        </Paper>
      </Grid>

    </Grid>
  )
}

export default ProfilePage