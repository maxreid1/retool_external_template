import React, { useRef } from 'react'

// import Retool from 'react-retool'

const publicApp = "https://example.retool.com/embedded/public/d67b65ab-3afa-4a58-9ba1-b3bcff63e7c5"

import { 
  Box
} from '@mui/material'


const FullPageEmbed = () => {
    const embeddedIframe = useRef(null)

    return (
        <Box>
            {/* <Retool 
                url={publicApp}
            /> */}
            <iframe
                height="100%"
                width="100%"
                frameBorder="none"
                src={publicApp}
                ref={embeddedIframe}
                title="retool"
            ></iframe>
        </Box>
    )
}

export default FullPageEmbed