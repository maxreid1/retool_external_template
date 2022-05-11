import { useAuth0 } from "@auth0/auth0-react"
import React from "react"

import { Button, MenuItem } from '@mui/material'

export const SignupMenuItem = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <MenuItem key='auth0-signup'>
      <Button onClick={() => loginWithRedirect({ screen_hint: "signup" }) }>
        Sign Up
      </Button>
    </MenuItem>
  );
};