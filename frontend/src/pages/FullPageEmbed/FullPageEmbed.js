import React, { useRef } from 'react'

import Retool from 'react-retool'

import {
  Container
} from '@mui/material'

import { publicApps } from '../../../../config'

const FullPageEmbed = () => {
    // const embeddedIframe = useRef(null)

    return (
        <Container>
            <Retool url={publicApps.fullPage} />
            {/* <iframe
                height="100%"
                width="100%"
                frameBorder="none"
                src={publicApps.fullPage}
                ref={embeddedIframe}
                title="retool"
            ></iframe> */}
        </Container>
    )
}

export default FullPageEmbed