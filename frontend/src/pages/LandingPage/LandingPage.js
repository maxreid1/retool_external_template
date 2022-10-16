import React from 'react'
import { 
    Box, Typography, Container
  } from '@mui/material'
import Retool from 'react-retool'

const LandingPage = () => { 
  return (
      <Box sx={{ height: "1200px" }}>
      <Typography variant="h2" align='center'>Welcome to your Shop. Co Portal!</Typography>
          <Container maxWidth={false}>
              <Retool url='https://demos.retool.dev/embedded/public/227f6799-7b3d-4fa2-9be7-ad215b933bf1' />
          </Container>
      </Box>
      
  )
}

export default LandingPage