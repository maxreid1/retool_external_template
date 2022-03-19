import React, { useRef } from 'react'

import {
  Box
} from '@mui/material'

import { publicApps } from '../../../../config'

const FullPageEmbed = () => {
    const embeddedIframe = useRef(null)

    return (
        <Box sx={{ width: 1080 }}>
            <iframe
                height="100%"
                width="100%"
                frameBorder="none"
                src={publicApps.fullPage}
                ref={embeddedIframe}
                title="retool"
            ></iframe>
        </Box>
    )
}

export default FullPageEmbed