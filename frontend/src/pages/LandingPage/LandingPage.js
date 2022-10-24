import React from 'react'
import { 
    Box, Typography, Container
  } from '@mui/material'
import Retool from 'react-retool'

const LandingPage = () => { 
  return (
      <Box sx={{ height: "1200px", marginTop:"20"}}>
      {/* <Typography variant="h3" align='center' marginTop={'32'} marginBottom={'0'}>Welcome to your Shop Co. Portal!</Typography> */}
          <Container maxWidth={false} maxHeight={true} >
              <Retool url='https://demos.retool.dev/embedded/public/372d1438-b60c-4736-a833-3a90c3088d78' />
          </Container>
      </Box>
      
  )
}

export default LandingPage