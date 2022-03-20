import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link as RouterLink, Routes, Route } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import { 
  AppBar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar, 
  Typography,
} from '@mui/material'

import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BarChartIcon from '@mui/icons-material/BarChart'

import HomePage from './pages/HomePage'
import FullPageEmbed from './pages/FullPageEmbed'
import HybridPage from './pages/HybridPage'
import PanelPage from './pages/PanelPage'
import SplashPage from './pages/SplashPage'

import { homepage } from '../../config'

const AppBarOffset = styled('div')(({ theme }) => theme.mixins.toolbar)  // Spacer for placing content below AppBar
const AppBarFiller = () => <Box sx={{ flexGrow: 1 }} />                  // Spacer for placing content on right of AppBar
const drawerWidth = 240

function App() {
  const [heading, setHeading] = useState(homepage.title)

  useEffect(() => {
    fetch('/api/test')
      .then(res => res.text())
      .then(heading => setHeading(heading))
  })

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar variant="dense">
            <Link to='/' component={RouterLink}>
              <IconButton edge="start" sx={{ mr: 2 }}>
                <HomeIcon />
              </IconButton>
            </Link>
            <Typography variant="h6" color="inherit" component="div">
              {heading}
            </Typography>

            <AppBarFiller />
            
            <IconButton color="inherit" sx={{ mr: 2 }}>
              <Badge badgeContent={3} color="info">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <AccountCircle />
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{ width: drawerWidth }}
        >
          <AppBarOffset />
          <Box sx={{ overflow: 'auto' }}>
            {homepage.sidebar.map(group => (
              <>
                <List>
                  {group.items.map(item => (
                    <Link
                      key={item.key}
                      to={{pathname: item.url}}
                      component={RouterLink}
                      underline='none'
                    >
                      <ListItem button key={item.key + 'listItem'}>
                        <ListItemIcon key={item.key + 'listItemIcon'}>
                          {
                            {
                            'InboxIcon': <InboxIcon />,
                            'MailIcon': <MailIcon />,
                            'AddToDriveIcon': <AddToDriveIcon />,
                            'BarChartIcon': <BarChartIcon />,
                            }[item.icon]
                          }
                        </ListItemIcon>
                        <ListItemText primary={item.title} key={item.key + 'listItemText'}/>
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
              </>
              ))}
          </Box>
        </Drawer> 

        <Box sx={{ width: '100%', height: '100vh', flexGrow: 1 }}>
          <AppBarOffset />
          <Routes>
            <Route exact path='/' element={<HomePage />}/>
            <Route path='/full_page_embed' element={<FullPageEmbed />}/>
            <Route path='/hybrid_page' element={<HybridPage />}/>
            <Route path='/splash_page' element={<SplashPage />}/>
            <Route path='/panel_embed' element={<PanelPage />}/>
          </Routes>
        </Box>
      </Box>
    </Router>
  )
}

export default App