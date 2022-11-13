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
        <Box  sx={{ height: "1200px" , margintop: '20'}}>
            <Container maxWidth={false} t>
                <Retool url={url} />
            </Container>
           
        </Box>
    )
}

export default FullPageEmbed