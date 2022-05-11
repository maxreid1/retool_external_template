import React, { useEffect, useState } from 'react'
import { Link as RouterLink, Navigate, Routes, Route } from 'react-router-dom'

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { decodeToken } from './utils/auth'

import { SignupMenuItem } from './components/auth/SignupMenuItem' 
import { LoginMenuItem } from './components/auth/LoginMenuItem' 
import { LogoutMenuItem } from './components/auth/LogoutMenuItem' 

// Material Components
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

// Material Icons
import HomeIcon from '@mui/icons-material/Home'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BarChartIcon from '@mui/icons-material/BarChart'

// External Template Pages
import ProfilePage from './pages/ProfilePage'
import FullPageEmbed from './pages/FullPageEmbed'
import HybridPage from './pages/HybridPage'
import PanelPage from './pages/PanelPage'
import SplashPage from './pages/SplashPage'

// External Template Config
import { auth, homepage } from '../config'


let routes = {}
homepage.sidebar.forEach(section => {
  section.items.forEach(item => routes[item.url] = item.groups)
})

// MUI spacer components and variables
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
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const RequireAuth = ({ component, currentGroup, routeGroups, ...props }) => {
  let permitted = routeGroups || []
  let group = currentGroup || ''

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <Navigate to='/' />
  })

  return permitted.includes(group) ? <Component {...props} /> : <Navigate to='/' />  
}

const App = () => {
  const { isAuthenticated, user, getIdTokenClaims, getAccessTokenSilently } = useAuth0()

  const [userProfile, setUserProfile] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [idTokenClaims, setIdTokenClaims] = useState(null)
  const [authTokenClaims, setAuthTokenClaims] = useState(null)
  
  const [drawerIsOpen, setDrawerIsOpen] = useState(true)
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false)
  const [sidebar, setSidebar] = useState([])

  const updateUserMetadata = async (accessToken, update) => {
    const updateUserDetailsUrl = `https://${auth.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user.sub}`
    const updateResponse = await fetch(updateUserDetailsUrl, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update)
    })
    const verifyUpdate = await updateResponse.json()
  }

  const toggleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  }

  const toggleUserMenu = () => {
    setUserMenuIsOpen(!userMenuIsOpen)
  }

  const handleSwitchGroup = (group) => {
    updateUserMetadata(accessToken, {
      user_metadata: { group: group }
    })

    setUserProfile({ 
      ...userProfile, 
      ...{
        user: { 
          group: group 
        }
      }
    })
  }

  // user profile and tokens from Auth0
  useEffect(() => {
    const getUserMetadata = async () => {    
      try {
        const idTokenClaims = await getIdTokenClaims()
        setIdTokenClaims(idTokenClaims)

        const token = await getAccessTokenSilently()
        setAccessToken(token)
        setAuthTokenClaims(decodeToken(token))

        const userDetailsByIdUrl = `https://${auth.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user.sub}`
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const { app_metadata, user_metadata } = await metadataResponse.json()
        setUserProfile({
          app: app_metadata,
          user: user_metadata,
        })

        updateUserMetadata(token, {
          user_metadata: {
            latestLogin: Date.now()
          }
        })
      } catch (e) {
        console.warn('getUserMetadata failed:', e)
      }
    }

    if (user?.sub) {
      getUserMetadata()
    }
  }, [user?.sub])

  // Update sidebar and routes when user group changes
  useEffect(() => {
    let filteredSidebar = []
    if (userProfile?.user.group === 'admin') {
      filteredSidebar = homepage.sidebar
    } else {
      homepage.sidebar.forEach(section => {
        let filteredSection = { 
          title: section.title,
          items: section.items.filter(item => item.groups.length === 0 || item.groups.includes(userProfile?.user.group))
        }
        if (filteredSection.items.length > 0) {
          filteredSidebar.push(filteredSection)
        }
      })
    }
    setSidebar(filteredSidebar)
  }, [userProfile])

  return (
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
            {isAuthenticated && user
              ? [user.name, user.email, userProfile?.user.group].join(' | ')
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
            {isAuthenticated && userProfile?.app.roles.map((role) => (
              <MenuItem key={role} onClick={() => handleSwitchGroup(role)}>
                <Typography>Impersonate {role}</Typography>
              </MenuItem>
            ))}

            <Divider />
            {!isAuthenticated && <SignupMenuItem />}
            {!isAuthenticated && <LoginMenuItem />}
            {isAuthenticated && <LogoutMenuItem />}
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
          <Route exact path='/' element={
            <SplashPage />
          }/>
          <Route path='/profile_page' element={
            <ProfilePage user={user} userProfile={userProfile} idTokenClaims={idTokenClaims} authTokenClaims={authTokenClaims} />
          }/>
          
          {/* Protected routes depending on user group */}
          <Route path='/full_page_embed' element={
            <RequireAuth currentGroup={userProfile?.user.group} routeGroups={routes['/full_page_embed']} component={FullPageEmbed} />
          }/>
          <Route path='/hybrid_page' element={
            <RequireAuth currentGroup={userProfile?.user.group} routeGroups={routes['/hybrid_page']} component={HybridPage} />
          }/>
          <Route path='/panel_embed' element={
            <RequireAuth currentGroup={userProfile?.user.group} routeGroups={routes['/panel_embed']} component={PanelPage} />
          }/>
        </Routes>
      </Box>
      
    </Box>
  )
}

export default App