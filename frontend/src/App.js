import React, { useEffect, useState } from 'react'
import { Link as RouterLink, Navigate, Routes, Route, useParams } from 'react-router-dom'

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { LogoutMenuItem } from './components/auth/LogoutMenuItem' 
import { decodeToken } from './utils/auth'

// Material Components
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import { 
  Box,
  Divider,
  Icon,
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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'

import SplashPage from './pages/SplashPage'
import LandingPage from './pages/LandingPage'

const STORE_OVERVIEW_UUID = "8b84c306-653b-11ed-abdd-33fcffe2e973"
const SALES_UUID = "927bbad4-653b-11ed-8581-ebfd170076b9"
const COUPONS_UUID = "9c92715c-653b-11ed-abdd-9f8d29c80a25"
const SCORECARD_UUID = "55c9b804-667e-11ed-b17e-33e1ab49dcd6"

// External Template Config
import { auth, homepage } from '../config'

let routes = {}
homepage.sidebar.forEach(section => {
  section.items.forEach(item => {
    routes[item.slug] = item
  })
})

// MUI spacer components and variables
const AppBarOffset = styled('div')(({ theme }) => theme.mixins.toolbar)  // Spacer for placing content below AppBar
const AppBarFiller = () => <Box sx={{ flexGrow: 1 }} />                  // Spacer for placing content on right of AppBar
const drawerWidth = 250

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  boxShadow: 'none',
  borderBottom: '2px solid #eeeeee',
  zIndex: theme.zIndex.drawer + 1,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}))


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      color: '#ffffff',
      background: '#080928',
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shortest,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.shortest,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const App = () => {

  const { isLoading, isAuthenticated, user, getIdTokenClaims, getAccessTokenSilently } = useAuth0()

  const [userProfile, setUserProfile] = useState(null)            // "In memory" state variable for user attributes e.g. roles
  const [accessToken, setAccessToken] = useState(null)            // JWT access token (raw string)
  const [idTokenClaims, setIdTokenClaims] = useState(null)        // JWT ID token claims 
  const [authTokenClaims, setAuthTokenClaims] = useState(null)    // JWT access token
  
  const [drawerIsOpen, setDrawerIsOpen] = useState(true)          // Left hand var bar
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false)     // Top right user menu
  const [highlightRetool, setHighlightRetool] = useState(true)
  const [sidebar, setSidebar] = useState([])                      // Config data for sidebar. Dynamic i.e. filtered based on RBAC

  /**
   * Updates user metadata on Auth0
   * @param {string} accessToken - Access Token for Auth0 Management API
   * @param {Object} update  - Request body; the metadata values to be set
   */
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
  }

  const toggleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  }

  const toggleUserMenu = () => {
    setUserMenuIsOpen(!userMenuIsOpen)
  }

  /**
   * Sets the user's current group, which serves to demonstrate dynamic RBAC-based features
   * Updates both user metadata on Auth0 & the in-memory userProfile state variable
   * @param {string} group - group to set as user's current group
   */
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

  const drawerPadding = 3

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
  

  // Update sidebar when user group changes
  useEffect(() => {
    let filteredSidebar = []
    if (userProfile?.user.group === 'admin') {
      filteredSidebar = homepage.sidebar
    } else {
       homepage.sidebar.forEach(section => {
        let filteredSection = { 
          section: section.section,
          items: section.items.filter(item => item.groups.length === 0 || item.groups.includes(userProfile?.user.group))
        }
        if (filteredSection.items.length > 0) {
          filteredSidebar.push(filteredSection)
        }
      })
    }
    setSidebar(filteredSidebar)
  }, [userProfile])

  if (isLoading) {
    return '';
  }
  else if (!isAuthenticated) {
    return (
      <Routes>
        <Route path='*' element={<Navigate to='/login' />}/>
        <Route path='/login' element={<SplashPage />}/>
      </Routes>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {isAuthenticated && <AppBar position="fixed" open={drawerIsOpen}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
            color: '#000000'
          }}
        >
          <IconButton
              edge="start"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(drawerIsOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
          </IconButton>

    <Box>
          <div style={{ fontWeight: '800', fontSize: 24}}>
              Shopco Merchant
            </div>
    </Box>
          <AppBarFiller />
          <span style={{ marginRight: '20px', fontSize: '14px', letterSpacing: '.25px'}}> {user.name} </span>
          <AccountCircle id='appbar-user-icon' onClick={toggleUserMenu}/>
          <Menu
            sx={{ mt: '45px', color: 'black'}}
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
      

            {isAuthenticated && <Divider />}
            <Link    
              to={
                {pathname: '/profile_page'}
              }
              component={RouterLink}
              underline='none'
            > <MenuItem><Typography>View Profile</Typography></MenuItem></Link>
            {isAuthenticated && <LogoutMenuItem />}
          </Menu>
        </Toolbar>
      </AppBar>}

      {isAuthenticated && <Drawer
        variant="permanent"
        open={drawerIsOpen}
      >
        <Box display='flex' justifyContent='space-between' marginLeft={drawerPadding} marginTop={drawerPadding}>
          <Box display='flex'>
            <img src='https://i.ibb.co/b2k0Ss0/Screen-Shot-2021-09-10-at-5-29-42-PM-removebg-preview.png' width='100%' />
          </Box>
          <Box alignSelf='flex-end' marginTop='-100'>
          <IconButton style={{ color: "#ffffff"}} onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
          </Box>
        </Box>
      <Box>
      </Box>
        <Box sx={{ overflow: 'auto', color: '#ffffff'}} marginTop='40'>
          {sidebar.map(section => (
            <>
              <List disablePadding={true} >
                {section.items.map(item => (
                  
                  <Link
                    key={item.key}
                    to={
                      {pathname: [section.section, item.slug].join('/')}
                    }
                    component={RouterLink}
                    underline='none'
                  > 
                    <ListItem button key={item.key + 'listItem'} sx={{
                       left: 2.5
                    }}>
                     <ListItemIcon style={{ color: '#ffffff'}} key={item.key + 'listItemIcon'}  >
                        <Icon color="#ffffff">{item.icon}</Icon>
                
                      </ListItemIcon>
                   
                      <ListItemText primary={item.title} key={item.key + 'listItemText'} sx={{
                        left: -20
                      }}/>

                    </ListItem>
      
                  </Link>
                ))}
              </List>
              <Divider />
            </>
            ))}
        </Box>
      </Drawer>} 

      <Box sx={{ width: '100%', height: '100vh', flexGrow: 1 }}>
        <AppBarOffset />     
        <Routes>
          <Route  path='/login' element={<SplashPage/>}/>
          <Route path='/' element ={<LandingPage externalIdentifier={user.email} groups={[5,6,7]} pageUuid={STORE_OVERVIEW_UUID} />}/>
          <Route path='/sales' element ={<LandingPage externalIdentifier={user.email} groups={[5,6,7]} pageUuid={SALES_UUID} />}/>
          <Route path='/scorecard' element ={<LandingPage externalIdentifier={user.email} groups={[5,6,7]} pageUuid={SCORECARD_UUID} />}/>
          <Route path='/coupons' element ={<LandingPage externalIdentifier={user.email} groups={[5,6,7]} pageUuid={COUPONS_UUID} />} />
          <Route path="*" element={<Navigate to='/'/>}/>
        </Routes>
      </Box>
    </Box>
  )
}

export default App