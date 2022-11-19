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

  const [retoolEmbedUrl, setRetoolEmbedUrl] = useState([])

  useEffect(() => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ externalIdentifier, groups, pageUuid })
    };
    fetch('/api/embedUrl', options)
    .then(res => res.json())
    .then(data => { setRetoolEmbedUrl(data.embedUrl)})
  }, [pageUuid])

  return (
      <Box sx={{ height: "1200px", marginTop:"20"}}>
          <Container maxWidth={false} disableGutters height="100vh">
              <Retool url={`${retoolEmbedUrl}`} />
          </Container>
      </Box>
  )
}

export default LandingPage