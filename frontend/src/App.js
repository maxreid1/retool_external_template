import React, { useEffect, useState } from "react";
import { Navigate, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import RetoolWrapper from "./components/RetoolWrapper";

import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

import SplashPage from "./pages/SplashPage";
import { homepage, auth, darkModeFormatting} from "../config";
import QuickLogin from "./pages/QuickLogin";


const App = () => {
  const { 
    isLoading, 
    isAuthenticated, 
    user, 
    getAccessTokenSilently, 
  } = useAuth0();

  const [userProfile, setUserProfile] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [drawerIsOpen, setDrawerIsOpen] = useState(true);
  const [sidebarList, setSidebarList] = useState([]);
  const [showBorder, setShowBorder] = useState(false);
  const [seed, setSeed] = useState(1);
  const [font, setFont] = useState('Retool Default')
  const location = useLocation();
  const [darkMode, setDarkModeToggle] = useState(false);
  const [darkModeTopbar, setDarkModeTopbarToggle] = useState(false);
  const handleDarkModeToggle = () => {
    setDarkModeToggle(!darkMode);
    setTimeout(() => {setDarkModeTopbarToggle(!darkModeTopbar)},133);
  }
  const formatting = darkModeTopbar ? darkModeFormatting.darkModePalette : darkModeFormatting.lightModePalette;


  useEffect(() => {
    // Run the callback function when the route changes
    setDarkModeToggle(false);
    setDarkModeTopbarToggle(false)
    setFont('Retool Default');
  }, [location.pathname]);

  /**
   * Updates user metadata on Auth0
   * @param {string} accessToken - Access Token for Auth0 Management API
   * @param {Object} update  - Request body; the metadata values to be set
   */
  const updateUserMetadata = async (accessToken, update) => {
    const updateUserDetailsUrl = `https://${auth.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user.sub}`;
    await fetch(updateUserDetailsUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  /**
   * Sets the user's current group, which serves to demonstrate dynamic RBAC-based features
   * Updates both user metadata on Auth0 & the userProfile state variable
   * @param {string} group - group to set as user's current group
   */
  const handleSwitchGroup = (group) => {
    updateUserMetadata(accessToken, {
      user_metadata: { group: group },
    }).then(setSeed(Math.random()));

    setUserProfile({
      ...userProfile,
      ...{
        user: {
          group: group,
        },
      },
    });
    
  };

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);

        const userDetailsByIdUrl = `https://${auth.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user.sub}`;
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { app_metadata, user_metadata } = await metadataResponse.json();
        setUserProfile({
          app: app_metadata,
          user: user_metadata,
        });

        updateUserMetadata(token, {
          user_metadata: {
            latestLogin: Date.now(),
          },
        });
      } catch (e) {
        console.warn("getUserMetadata failed:", e);
      }
    };
    if (user?.sub) {
      getUserMetadata();
    }
  }, [user?.sub]);

  useEffect(() => {
    let isAdmin = userProfile?.user?.group === "admin";
    if (isAdmin) {
      setSidebarList(homepage.sidebarList);
    } else {
      const filteredSidebar = homepage.sidebarList.filter(
        (item) =>
          item.groups.length === 0 ||
          item.groups.includes(userProfile?.user?.group)
      );
      setSidebarList(filteredSidebar);
    }
  }, [userProfile]);

  if (isLoading) return "";

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/quicklogin" element={<QuickLogin />} />
        <Route path="*" element={<SplashPage />} />
      </Routes>
    );
  }

  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex", flexGrow: 1, backgroundColor: formatting.backgroundColor }}>
      <Routes>
        <Route path="/login" element={<SplashPage />} />
        <Route
          path="/"
          element={
            <LayoutWrapper
              drawerIsOpen={drawerIsOpen}
              userProfile={userProfile}
              user={user}
              handleSwitchGroup={handleSwitchGroup}
              toggleDrawer={() => setDrawerIsOpen(!drawerIsOpen)}
              sidebarList={sidebarList}
              handleShowBorder={() => setShowBorder(!showBorder)}
              handleSetFont={setFont}
              activeFont={font}
              formatting={formatting}
              darkModeTopbar={darkModeTopbar}
              handleDarkModeToggle={handleDarkModeToggle}
            />
          }
        >
          {sidebarList.map((item) => (
            <Route
              key={`/` + item.slug}
              path={`/` + item.slug}
              element={
                <RetoolWrapper
                  retoolAppName={item.retoolAppName}
                  accessToken={accessToken}
                  showBorder={showBorder}
                  key={seed}
                  userProfile={userProfile}
                  activeFont={font}
                  darkMode={darkMode}
                />
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Box>
  );
};

const LayoutWrapper = ({ toggleDrawer, ...rest }) => (
  <>
    <CssBaseline />
    <Topbar onToggleDrawer={toggleDrawer} {...rest} />
    <Sidebar onClick={toggleDrawer} {...rest} />
    <Outlet />
  </>
);

export default App;
