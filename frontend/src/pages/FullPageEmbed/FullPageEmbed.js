import React from 'react'
import { useParams } from "react-router-dom"

import Retool from 'react-retool'

import {
  Box,
  Container,
} from '@mui/material'
import { margin } from '@mui/system'


const FullPageEmbed = ({ routes }) => { 
    const { slug } = useParams()
    const url = routes[slug].retool_app

    return (
        <Box marginTop={'-30'}  sx={{ height: "1200px" }}>
            <Container maxWidth={false} t>
                <Retool url={url} />
            </Container>
           
        </Box>
    )
}

export default FullPageEmbed