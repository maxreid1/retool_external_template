import React, { useEffect, useState, useContext } from 'react'
import { Link as RouterLink, Navigate, Routes, Route, useParams, Redirect } from 'react-router-dom'

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { SignupMenuItem } from './components/auth/SignupMenuItem' 
import { LoginMenuItem } from './components/auth/LoginMenuItem' 
import { LogoutMenuItem } from './components/auth/LogoutMenuItem' 
import Moment from 'react-moment';
import { decodeToken } from './utils/auth'

// Material Components
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import { 
  Badge,
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
  Switch,
  Toolbar, 
  Typography,
} from '@mui/material'

// Material Icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MenuIcon from '@mui/icons-material/Menu'

// External Template Pages
import ProfilePage from './pages/ProfilePage'
import FullPageEmbed from './pages/FullPageEmbed'
import HybridPage from './pages/HybridPage'
import PanelPage from './pages/PanelPage'
import SplashPage from './pages/SplashPage'
import LandingPage from './pages/LandingPage'

const RETOOL_LANDING_PAGE_UUID = "063ae5a6-5b07-11ed-94b5-f7ac74a32e3a"

const components = {
  'full_page_embed': FullPageEmbed,
  'hybrid_page': HybridPage,
  'panel_page': PanelPage,
};

const DateTime = () => {
  var [date,setDate] = useState(new Date());
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
      }
  
  });
  return(
      <div >
        <p style={{'margin-left': '30','margin-top': '50', 'line-height' : '0px'}}> {date.toLocaleDateString()}</p>
        <h2 style={{'margin-left': '30', 'padding-top': '2', 'line-height' : '0px'}}>{date.toLocaleTimeString()}</h2>
      </div>
  )
};





// External Template Config
import { auth, homepage } from '../config'
import { padding } from '@mui/system'

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

// const [isVisible, setIsVisible] = useState(true)

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

const RequireAuth = ({ currentGroup, routes }) => {
  const { slug } = useParams()
  const embed = components[slug] ?? FullPageEmbed

  const permitted = routes[slug].groups || []
  const group = currentGroup || ''

  const Component = withAuthenticationRequired(embed, {
    onRedirecting: () => <Navigate to='/login' />
  })

  return permitted.includes(group) ? <Component routes={routes} /> : <Navigate to='/login' />  
}






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
  const ProtectedComponent = ({ component, ...propsForComponent}) => {
    const Cp = withAuthenticationRequired(component);
    return <Cp {...propsForComponent} />
  }


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


  const toggleHighlightRetool = () => {
    setHighlightRetool(!highlightRetool)
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
  // get user profile and tokens from Auth0
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
    return <Routes>
     <Route path='*' element={<Navigate to='/login' />}/>
    <Route path='/login' element={<SplashPage />}/>
    
    </Routes>;

  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {isAuthenticated && <AppBar position="absolute" open={drawerIsOpen}>
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
              // ? [user.name, user.email, userProfile?.user.group].join(' | ')
              ? JSON.stringify(userProfile)
              : '(not logged in)'
            } 
          </Typography>

          <AppBarFiller />
          
          {/* <IconButton color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent={3} color="info">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}

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
      

            {isAuthenticated && <Divider />}
            <Link
                    
                    to={
                      {pathname: '/profile_page'}
                    }
                    component={RouterLink}
                    underline='none'
                  > <MenuItem><Typography>View Profile</Typography></MenuItem></Link>
            {!isAuthenticated && <SignupMenuItem />}
            {!isAuthenticated && <LoginMenuItem />}
            {isAuthenticated && <LogoutMenuItem />}
            <Switch toggleHighlightRetool></Switch>Highlight Retool

 
          </Menu>
        </Toolbar>
      </AppBar>}

      {isAuthenticated && <Drawer
        variant="permanent"
        open={drawerIsOpen}
      >
        <Box display='flex' justifyContent='space-between' marginLeft={drawerPadding} marginTop={drawerPadding}>
          <Box display='flex' marginTop='-15'>
          <icon >
            </icon><img src='https://i.ibb.co/SBfqNbc/imageedit-1-4156875095.png' width='100%' marginTop='-2000'/>
          </Box>
          <Box alignSelf='flex-end' marginTop='-100'>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
          </Box>
        </Box>
        {/* <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        > */}
         
        {/* </Toolbar> */}
      <Box>
        {drawerIsOpen && 
      <Typography><DateTime>
        </DateTime></Typography>
       }
      </Box>
        <Box sx={{ overflow: 'auto'}} marginTop='40'>
          {sidebar.map(section => (
            <>
              <List disablePadding={true} classes>
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
                     <ListItemIcon key={item.key + 'listItemIcon'}  >
                        <Icon>{item.icon}</Icon>
                
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

          {/* Landing Pages */}
          <Route  path='/login' element={
               <SplashPage />
          }/>
          <Route path='/' element ={
           <LandingPage externalIdentifier={user.email} groups={[5,6]} pageUuid={RETOOL_LANDING_PAGE_UUID} />
          //  <LandingPage externalIdentifier={user.email} groups={userProfile.user.retoolGroups} pageUuid={userProfile.user.retoolPageUuid} />
          }/>

          <Route path='/profile_page' 
          element={<ProtectedComponent component={ProfilePage} user={user} userProfile={userProfile} idTokenClaims={idTokenClaims} authTokenClaims={authTokenClaims} />
          }/> 

          {/* Configurable Public Apps */}     
          {/* <Route path='/public/:slug' element={
          <PrivateRoute>
            <FullPageEmbed routes={routes} />
             </PrivateRoute>
          }/> */}
          
          {/* Default Demo Apps */}
          <Route path='/default_demo/:slug' element={
            
        // <PrivateRoute>
        // <ProtectedComponent component={RequireAuth} routes={routes} currentGroup={userProfile?.user.group}/>
            <RequireAuth routes={routes} currentGroup={userProfile?.user.group} />
            // </PrivateRoute>
    
          }/>
        


          {/* Configurable Protected Apps */}
          <Route path='/protected/:slug' element={
            <RequireAuth routes={routes} currentGroup={userProfile?.user.group} />
          }/>

          <Route path="*" element={
          <Navigate to='/'/>} />
         
         
 
        </Routes>
        

      </Box>
   
    </Box>

 
  )
}


export default App