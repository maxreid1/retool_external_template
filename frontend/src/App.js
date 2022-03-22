import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link as RouterLink, Navigate, Routes, Route } from 'react-router-dom'

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

// Icons
import HomeIcon from '@mui/icons-material/Home'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BarChartIcon from '@mui/icons-material/BarChart'

// Pages
import HomePage from './pages/HomePage'
import FullPageEmbed from './pages/FullPageEmbed'
import HybridPage from './pages/HybridPage'
import PanelPage from './pages/PanelPage'
import SplashPage from './pages/SplashPage'

// Utility functions
import { updateUser, getUser, deleteUser, login, logout, isLoggedIn } from './utils/auth'
import { updateGroup, getGroup, deleteGroup } from './utils/prefs'

// Config
import { homepage } from '../config'

// routes object is used to validate URLs against user's group setting
let routes = {}
homepage.sidebar.forEach(section => {
  section.items.forEach(item => routes[item.url] = item.groups)
})

// spacer components and variables
const AppBarOffset = styled('div')(({ theme }) => theme.mixins.toolbar)  // Spacer for placing content below AppBar
const AppBarFiller = () => <Box sx={{ flexGrow: 1 }} />                  // Spacer for placing content on right of AppBar
const drawerWidth = 200

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

const RequireAuth = ({ children, currentGroup, routeGroups }) => {
  console.log('RequireAuth(), routeGroups', routeGroups)
  let permitted = routeGroups || []
  let group = currentGroup || ''

  return permitted.includes(group) ? children  : <Navigate to='/' />  
}

const App = () => {
  const [user, setUser] = useState(getUser())
  const [currentUserGroup, setCurrentUserGroup] = useState(getGroup())
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false)
  const [sidebar, setSidebar] = useState([])

  const toggleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  }

  const toggleUserMenu = () => {
    setUserMenuIsOpen(!userMenuIsOpen)
  }

  const handleRegister = () => {
    fetch('/auth/register')
      .then(response => response.json())
      .then(token => {
        let user = updateUser(token)
        setUser(user)
        setCurrentUserGroup(user.roles[0])
        login()
        location.reload()
      })
  }

  const handleLogin = () => {
    setUser(getUser())
    setCurrentUserGroup(getGroup())
    login()
  }

  const handleLogout = () => {
    setCurrentUserGroup(null)
    logout()
  }

  const handleCancelAccount = () => {
    setUser(null)
    deleteUser()
    deleteGroup()
    logout()
    location.reload()
  }

  const handleSwitchGroup = (group) => {
    updateGroup(group)
    setCurrentUserGroup(getGroup())
    toggleUserMenu()
  }

  useEffect(() => {
    if (user && user.roles) {
      let group = getGroup()
      if (group && user.roles.includes(group)) {
        setCurrentUserGroup(getGroup())
      } else {
        updateGroup(user.roles[0])
        setCurrentUserGroup(getGroup())
      }
    } else {
      deleteGroup()
      setCurrentUserGroup(getGroup())
    }
  }, [user])

  // On changing user group, update sidebar and routes
  useEffect(() => {
    let filteredSidebar = []
    if (currentUserGroup === 'admin') {
      filteredSidebar = homepage.sidebar
    } else {
      homepage.sidebar.forEach(section => {
        let filteredSection = { 
          title: section.title,
          items: section.items.filter(item => (isLoggedIn() && item.groups.includes(currentUserGroup)) || item.groups.length === 0)
        }
        if (filteredSection.items.length > 0) {
          filteredSidebar.push(filteredSection)
        }
      })
    }
    setSidebar(filteredSidebar)
  }, [currentUserGroup])

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
              {isLoggedIn() && user
                ? user.username + ' (' + currentUserGroup + ') | Available user groups: ' + (user && JSON.stringify(user.roles))
                : '(not logged in)'
              } 
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
              {!getUser() && <MenuItem key={'user-menu-register'} onClick={handleRegister}>
                <Typography>Register</Typography>
              </MenuItem>}
              {getUser() && !isLoggedIn() && <MenuItem key={'user-menu-login'} onClick={handleLogin}>
                <Typography>Login</Typography>
              </MenuItem>}
              {getUser() && isLoggedIn() && <MenuItem key={'user-menu-logout'} onClick={handleLogout}>
                <Typography>Logout</Typography>
              </MenuItem>}
              {getUser() && <MenuItem key={'user-menu-cancel'} onClick={handleCancelAccount}>
                <Typography>Cancel Account</Typography>
              </MenuItem>}
              
              {isLoggedIn() && <Divider />}
              {isLoggedIn() && user.roles.map((group) => (
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
            {/* Public routes */}
            <Route exact path='/' element={<HomePage />}/>
            <Route path='/splash_page' element={<SplashPage />}/>
            
            {/* Protected routes depending on user group */}
            <Route path='/full_page_embed' element={
              <RequireAuth currentGroup={currentUserGroup} routeGroups={routes['/full_page_embed']}>
                <FullPageEmbed />
              </RequireAuth>
            }/>
            <Route path='/hybrid_page' element={
              <RequireAuth currentGroup={currentUserGroup} routeGroups={routes['/hybrid_page']}>
                <HybridPage />
              </RequireAuth>
            }/>
            <Route path='/panel_embed' element={
              <RequireAuth currentGroup={currentUserGroup} routeGroups={routes['/panel_embed']}>
                <PanelPage />
              </RequireAuth>
            }/>
          </Routes>
        </Box>
        
      </Box>
    </Router>
  )
}

export default App