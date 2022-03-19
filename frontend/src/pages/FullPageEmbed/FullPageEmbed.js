import React, { useRef } from 'react'

import {
  Container
} from '@mui/material'

import { publicApps } from '../../../../config'

const FullPageEmbed = () => {
    const embeddedIframe = useRef(null)

    return (
        <Container>
            <iframe
                height="100%"
                width="100%"
                frameBorder="none"
                src={publicApps.fullPage}
                ref={embeddedIframe}
                title="retool"
            ></iframe>
        </Container>
    )
}

export default FullPageEmbed