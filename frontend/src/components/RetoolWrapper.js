import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import Retool from 'react-retool'

const RetoolWrapper = ({
  retoolAppName = "",
  accessToken = ""
}) => { 

  const [retoolEmbedUrl, setRetoolEmbedUrl] = useState([])

  useEffect(() => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ retoolAppName, accessToken })
    };
    fetch('/api/embedUrl', options)
    .then(res => res.json())
    .then(data => { setRetoolEmbedUrl(data.embedUrl)})
  }, [retoolAppName])

  return (
    <Container maxWidth={false} disableGutters style={{ marginTop: 64 }}>
        <Retool url={`${retoolEmbedUrl}`} />
    </Container>
  )
}

export default RetoolWrapper