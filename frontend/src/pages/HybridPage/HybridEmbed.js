import React from 'react'

import {
  Box,
  ToggleButton,
  ToggleButtonGroup
 } from '@mui/material'

import Retool from 'react-retool'

import { publicApps } from '../../../config'

const HybridEmbed = () => {
  const [selected, setSelected] = React.useState(0);
  const handleChange = (_, data) => {
    setSelected(data);
  };

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "none" }} id="retool-data">
          {selected}
        </Box>
        <ToggleButtonGroup
          color="primary"
          size="small"
          fullWidth
          variant="text"
          exclusive
          onChange={handleChange}
          value={selected}
        >
          <ToggleButton value={0}>Map</ToggleButton>
          <ToggleButton value={1}>Driving Directions</ToggleButton>
          <ToggleButton value={2}>Origin</ToggleButton>
          <ToggleButton value={3}>Destination</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Retool url={publicApps.hybridPage} />
    </Box>
  )
}

export default HybridEmbed