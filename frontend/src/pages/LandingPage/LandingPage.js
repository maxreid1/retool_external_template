import React from 'react'
import { 
    Box, Typography, Container
  } from '@mui/material'
import Retool from 'react-retool'

const LandingPage = () => { 
  return (
      <Box sx={{ height: "1200px" }}>
      <Typography variant="h2" align='center' marginTop={'32'} marginBottom={'15'}>Welcome to your Shop Co. Portal!</Typography>
          <Container maxWidth={false}>
              <Retool url='https://demos.retool.dev/apps/Embed%20Demo%20-%20Merchant%20Portal/1-%20Bronze%20-%20Store%20Overview%202?_embed=true' />
          </Container>
      </Box>
      
  )
}

export default LandingPage