import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import { 
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar, 
  Typography 
} from '@mui/material'

import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BarChartIcon from '@mui/icons-material/BarChart'

import HomePage from './pages/HomePage'
import FullPageEmbed from './pages/FullPageEmbed'
import HybridPage from './pages/HybridPage'
import SplashPage from './pages/SplashPage'

import { homepage } from '../../config'

const AppBarOffset = styled('div')(({ theme }) => theme.mixins.toolbar)
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
            <Link to='/'>
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <AddReactionOutlinedIcon />
              </IconButton>
            </Link>
            <Typography variant="h6" color="inherit" component="div">
              {heading}
            </Typography>
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

        <Box>
          <AppBarOffset />
          <Switch>
            <Route exact path='/' render={props =>
              <HomePage />
            } />
            <Route path='/full_page_embed' render={props =>
              <FullPageEmbed />
            } />
            <Route path='/hybrid_page' render={props =>
              <HybridPage />
            } />
            <Route path='/splash_page' render={props =>
              <SplashPage />
            } />
            <Redirect to="/" />
          </Switch>
        </Box>
      </Box>
    </Router>
  )
}

export default App