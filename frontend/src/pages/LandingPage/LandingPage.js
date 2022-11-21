import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
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
    <Container maxWidth={false} disableGutters style={{ marginTop: 64 }}>
        <Retool url={`${retoolEmbedUrl}`} />
    </Container>
  )
}

export default LandingPage