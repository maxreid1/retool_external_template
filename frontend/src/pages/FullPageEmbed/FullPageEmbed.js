import React from 'react'
import { useParams } from "react-router-dom"

import Retool from 'react-retool'

import {
  Box,
  Container,
} from '@mui/material'


const FullPageEmbed = ({ routes }) => { 
    const { slug } = useParams()
    const url = routes[slug].retool_app

    return (
        <Box sx={{ height: "1200px" }}>
            <Container maxWidth={false}>
                <Retool url={url} />
            </Container>
        </Box>
    )
}

export default FullPageEmbed