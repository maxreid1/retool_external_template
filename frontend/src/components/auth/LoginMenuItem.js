import { useAuth0 } from "@auth0/auth0-react"
import React from "react"

import { Button, MenuItem } from '@mui/material'

export const LoginMenuItem = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <MenuItem key='auth0-login'>
      <Button onClick={() => loginWithRedirect()}>
        Log In
      </Button>      
    </MenuItem>
  )
}