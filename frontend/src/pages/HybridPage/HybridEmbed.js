import React from 'react'

import Box from '@mui/material/Box'

import Retool from 'react-retool'

import { publicApps } from '../../../config'

const HybridEmbed = () => {
  return (
    <Box>
      <Retool url={publicApps.hybridPage} />
    </Box>
  )
}

export default HybridEmbed