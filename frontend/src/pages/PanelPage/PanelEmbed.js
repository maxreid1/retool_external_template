import React from 'react'
import { useParams } from "react-router-dom"

import {
  Box
 } from '@mui/material'

import Retool from 'react-retool'


const PanelEmbed = ({ routes }) => {
  const { slug } = useParams()
  const url = routes[slug].retool_app

  return (
    <Box sx={{ height: "660px" }}>
      <Retool url={url} />
    </Box>
  )
}

export default PanelEmbed