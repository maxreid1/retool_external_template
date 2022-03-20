import React from 'react'

import Retool from 'react-retool'

import {
  Container
} from '@mui/material'

import { publicApps } from '../../../config'

const FullPageEmbed = () => {
    return (
        <Container>
            <Retool url={publicApps.fullPage} />
        </Container>
    )
}

export default FullPageEmbed