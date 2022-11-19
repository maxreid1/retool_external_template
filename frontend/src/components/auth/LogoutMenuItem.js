import { useAuth0 } from "@auth0/auth0-react"
import React from "react"

import { Button, MenuItem } from '@mui/material'

export const LogoutMenuItem = () => {
  const { logout } = useAuth0()

  return (
    <MenuItem key='auth0-logout'>
      <Button style={{ color: '#000000' }} onClick={() => logout({ returnTo: window.location.origin }) }>
        Log Out
      </Button>
    </MenuItem>
  )
}