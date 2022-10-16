import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"
import { Button, containerClasses, MenuItem } from '@mui/material'

const LoginMenuItem = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <MenuItem key='auth0-login'>
      <Button  onClick={() => loginWithRedirect()} variant="contained" sx={{color:'white'}}>
        Click Here to Log In
      </Button>      
    </MenuItem>
  )
}

import { 
  Box,
  Grid,
  Typography
} from '@mui/material'

const SplashPage = () => {
    return (
        
        <div style={{ 
            backgroundImage: `url("https://images.pexels.com/photos/326281/pexels-photo-326281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")` ,
            position: 'absolute',
            backgroundSize: 'cover',
            width: '100%',
            height: '120%',
            marginTop: -65,
            marginBottom: 65
          }}>
            
                   <Box display={'flex'} justifyContent='right' marginTop='200' marginRight='100'>
                    < img src="https://i.ibb.co/b2k0Ss0/Screen-Shot-2021-09-10-at-5-29-42-PM-removebg-preview.png" className='center' />
                    </Box>
                    <Box display={'flex'} justifyContent='right'  marginRight='300'>
                    <Typography variant="h6" color="black" gutterBottom >
                       
                        <LoginMenuItem></LoginMenuItem>
                    </Typography>
                    </Box>
   
        {}
        </div>
        
    )
}

export default SplashPage