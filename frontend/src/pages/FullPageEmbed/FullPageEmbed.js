import React from 'react'

import Retool from 'react-retool'

import {
  Box,
  Container,
} from '@mui/material'

import { publicApps } from '../../../config'

const FullPageEmbed = () => {
    return (
        <Box sx={{ height: "1200px" }}>
            <Container maxWidth={false}>
                <Retool url={publicApps.fullPage} />
            </Container>
        </Box>
    )
}

export default FullPageEmbed