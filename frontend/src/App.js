import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link as RouterLink, Routes, Route } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import { 
  Badge,
  Box,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar, 
  Typography,
} from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BarChartIcon from '@mui/icons-material/BarChart'

import HomePage from './pages/HomePage'
import FullPageEmbed from './pages/FullPageEmbed'
import HybridPage from './pages/HybridPage'
import PanelPage from './pages/PanelPage'
import SplashPage from './pages/SplashPage'


import { groups, homepage } from '../../config'

const AppBarOffset = styled('div')(({ theme }) => theme.mixins.toolbar)  // Spacer for placing content below AppBar
const AppBarFiller = () => <Box sx={{ flexGrow: 1 }} />                  // Spacer for placing content on right of AppBar
const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


function App() {
  const [heading, setHeading] = useState(homepage.title)
  const [drawerIsOpen, setDrawerIsOpen] = useState(true)
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false)
  const [userGroups, setUserGroups] = useState(['admin'])
  const [sidebar, setSidebar] = useState([])

  const toggleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  }

  const toggleUserMenu = () => {
    setUserMenuIsOpen(!userMenuIsOpen)
  }

  const handleSwitchGroup = (group) => {
    setUserGroups([group])
    toggleUserMenu()
  }

  useEffect(() => {
    setHeading(JSON.stringify(userGroups))
  }, [userGroups])

  useEffect(() => {
    setSidebar(homepage.sidebar)
  })

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar position="absolute" open={drawerIsOpen}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(drawerIsOpen && { display: 'none' }),
                }}
              >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Current user groups: {heading}
            </Typography>

            <AppBarFiller />
            
            <IconButton color="inherit" sx={{ mr: 2 }}>
              <Badge badgeContent={3} color="info">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <AccountCircle id='appbar-user-icon' onClick={toggleUserMenu}/>
            <Menu
              sx={{ mt: '45px' }}
              id='appbar-user-menu'
              anchorEl={document.getElementById('appbar-user-icon')}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(userMenuIsOpen)}
              onClose={toggleUserMenu}
            >
              <MenuItem key={'user-menu-register'} onClick={toggleUserMenu}>
                <Typography>Register</Typography>
              </MenuItem>
              <MenuItem key={'user-menu-login'} onClick={toggleUserMenu}>
                <Typography>Login</Typography>
              </MenuItem>
              <MenuItem key={'user-menu-logout'} onClick={toggleUserMenu}>
                <Typography>Logout</Typography>
              </MenuItem>
              <MenuItem key={'user-menu-cancel'} onClick={toggleUserMenu}>
                <Typography>Cancel</Typography>
              </MenuItem>
              <Divider />
              {groups.map((group) => (
                <MenuItem key={group} onClick={() => handleSwitchGroup(group)}>
                  <Typography>Switch to {group}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          open={drawerIsOpen}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Box sx={{ overflow: 'auto' }}>
            {sidebar.map(group => (
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
                            {'HomeIcon': <HomeIcon />,
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