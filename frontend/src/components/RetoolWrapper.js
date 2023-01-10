import React, { useEffect, useState } from 'react'
import { Button, Container, Typography, Box } from '@mui/material'
import Retool from 'react-retool'

const RetoolWrapper = ({
  retoolAppName = "",
  accessToken = "",
  showBorder = "",
  key = "",
  userProfile = "",
  darkMode="",
  font=""
}) => { 

  const [retoolEmbedUrl, setRetoolEmbedUrl] = useState([])
  const appFormatting = {darkMode, font}
  console.log(appFormatting)
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
    {/* 
    The below uses the embed link, and does not work as expected
    */}
        <Retool url={`${retoolEmbedUrl}`} data={appFormatting}  />
          {/* 
    The below uses the embed link after the redirect, and does work as expected
    */}
        
        {/* 
        <Retool url={`https://retool.shopco.partners/embedded/authed/966bf7fc-9057-11ed-bb00-b78554d89588`} 
        data={appFormatting} 
         /> */}
       
    </Container>
  )
}

export default RetoolWrapper