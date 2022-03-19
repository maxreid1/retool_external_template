import React, { useRef } from 'react'

// import Retool from 'react-retool'

import { publicApps } from '../../../../config'

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
                src={publicApps.fullPage}
                ref={embeddedIframe}
                title="retool"
            ></iframe>
        </Box>
    )
}

export default FullPageEmbed