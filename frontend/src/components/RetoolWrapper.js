import React, { useEffect, useState } from 'react'
import { Button, Container, Typography, Box } from '@mui/material'
import Retool from 'react-retool'

const RetoolWrapper = ({
  retoolAppName = "",
  accessToken = "",
  showBorder = "",
  key = "",
  userProfile = "",
  darkMode,
}) => { 

  const [retoolEmbedUrl, setRetoolEmbedUrl] = useState([])
  const appFormatting = { 
    darkMode: darkMode 
  };
  console.log(darkMode)
  const appFormattingString = JSON.stringify(appFormatting)
  useEffect(() => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ retoolAppName, accessToken, userProfile })
    };
    fetch('/api/embedUrl', options)
    .then(res => res.json())
    .then(data => { setRetoolEmbedUrl(data.embedUrl)})
  }, [retoolAppName])
  
  return (

    <Container maxWidth={false} disableGutters style={{ marginTop: 66, border:  showBorder ? '5px dashed #FFD4D2' : 'none'}}>
        
        <Box id="retooldata">{appFormattingString}</Box>
        <Retool url={`${retoolEmbedUrl}`} data={appFormatting} />
       
    </Container>
  )
}

export default RetoolWrapper