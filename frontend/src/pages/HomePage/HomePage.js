import React from 'react'

import { 
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Toolbar, 
  Typography 
} from '@mui/material'


const HomePage = () => {
  return (
    <Box 
      component="main"
      sx={{
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Exciting Homepage :)
              </Typography>
              <Typography component="body">Barebones framework only - demo content to follow!</Typography>
              <Typography component="body">Monorepo with frontend and backend in separate workspaces</Typography>
              <Typography component="body">Should be easy to make fast modifications to labeling, theming (soon!), api responses</Typography>
              <Typography component="body">Although frontend and backend are separate, can use just two files in root for most config:</Typography>
              <Typography component="body">1) /start.example can be used as a startup script, setting all necessary env variables</Typography>
              <Typography component="body">2) /config.js can be used to store simple modifications (e.g. menu choices, icons, themes) </Typography>
              <Typography component="body">All choices up for discussion as no real standards for mono-repos, and it's deliberately a bit hacky to support changes in field by SEs</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" color="primary" gutterBottom>On this screen:</Typography>
              <Typography component="body">Title comes from a combination of /config.js plus an example API request</Typography>
              <Typography component="body">Drawer/sidebar content defined in /config/js (can be used to drive a router config, too)</Typography>
              <Typography component="body">All design taken straight from Material UI (mui.com)</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" color="primary" gutterBottom>Material templates under review:</Typography>
              <Typography component="body"><Link href="https://www.bbc.co.uk">Minimal - Full</Link></Typography>
              <Typography component="body"><Link href="https://www.bbc.co.uk">Minimal - Simple</Link></Typography>
              <Typography component="body"><Link href="https://mui.com/store/items/minimal-dashboard-free/">Minimal - Free/MIT License</Link></Typography>
              <Typography component="body"><Link href="https://mui.com/getting-started/templates/">MUI Getting Started Examples - Free/MIT License</Link></Typography>
              <Typography component="body"><Link href="https://github.com/mui/material-ui/tree/master/docs/data/material/getting-started/templates/dashboard">Dashboard (simple layout) - Free/MIT License</Link></Typography>
              <Typography component="body"><Link href="https://mui.com/store/items/paperbase/">Paperbase (inc. signup) - Free/MIT License</Link></Typography>
              <Typography component="body"><Link href="https://mui.com/store/items/onepirate/">OnePirate (Splash page) - Free/MIT License</Link></Typography>
              <Divider></Divider>
              <Typography component="body">Do we have to be concerned about licensing? Paid templates appear to forbid distribution of code, unless each customer buys a license.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HomePage