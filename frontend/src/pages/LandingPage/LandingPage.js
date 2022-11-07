import React, { useEffect, useState } from 'react'
import { 
    Box, Container
  } from '@mui/material'
import Retool from 'react-retool'

const LandingPage = ({
  externalIdentifier = "",
  groups = [5,6],
  pageUuid = "abc"
}) => { 

  const [retoolEmbedUrl, setRetoolEmbedUrl] = useState('')

  useEffect(() => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ externalIdentifier, groups, pageUuid })
    };
  
    fetch('/embedUrl', options)
    .then((res) => res.json())
    .then(data => {
      console.log('RETURNED URL:', data)
      setRetoolEmbedUrl(data.embedUrl)
    })
  })

  return (
      <Box sx={{ height: "1200px", marginTop:"20"}}>
          <Container maxWidth={false} maxHeight={true} >
              <Retool url={retoolEmbedUrl} />
          </Container>
      </Box>
  )
}

export default LandingPage