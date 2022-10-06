import React from 'react'

import { 
  Box,
  Grid,
  Typography
} from '@mui/material'


const SplashPage = () => {
    return (
        
        <div style={{ 
            backgroundImage: `url("https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg")` 
          }}>
            
                   
                    <img src="https://i.ibb.co/b2k0Ss0/Screen-Shot-2021-09-10-at-5-29-42-PM-removebg-preview.png" />
                    <Typography variant="h6" color="white" gutterBottom>
                        Welcome! Log-in To Your Account in the Top Right Corner
                    </Typography>
        
        </div>
    )
}

export default SplashPage