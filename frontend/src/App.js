import React, { useEffect, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { decodeToken } from "./utils/auth";

// Material Components
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

import SplashPage from "./pages/SplashPage";
import LandingPage from "./pages/LandingPage";
import { homepage, auth } from "../config";

const STORE_OVERVIEW_UUID = "1e2458f2-5e43-11ed-b603-87a6ce75e0eb";
const ORDERS_UUID = "56a70878-5e43-11ed-b603-5f3bd9271091";
const COUPONS_UUID = "69176596-4009-11ed-92e5-13ce361830e2";
// const SCORECARD_UUID = "55c9b804-667e-11ed-b17e-33e1ab49dcd6";

// MUI spacer components and variables
const AppBarOffset = styled("div")(({ theme }) => theme.mixins.toolbar);
const SIDEBAR_WIDTH_PX = 250;

const App = () => {
  const {
    isLoading,
    isAuthenticated,
    user,
    getIdTokenClaims,
    getAccessTokenSilently,
  } = useAuth0();

  const [userProfile, setUserProfile] = useState(null); // "In memory" state variable for user attributes e.g. roles
  const [accessToken, setAccessToken] = useState(null); // JWT access token (raw string)
  const [idTokenClaims, setIdTokenClaims] = useState(null); // JWT ID token claims
  const [authTokenClaims, setAuthTokenClaims] = useState(null); // JWT access token

  const [drawerIsOpen, setDrawerIsOpen] = useState(true); // Left hand var bar
  const [sidebar, setSidebar] = useState([]); // Config data for sidebar. Dynamic i.e. filtered based on RBAC

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

  const toggleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  /**
   * Sets the user's current group, which serves to demonstrate dynamic RBAC-based features
   * Updates both user metadata on Auth0 & the in-memory userProfile state variable
   * @param {string} group - group to set as user's current group
   */
  const handleSwitchGroup = (group) => {
    updateUserMetadata(accessToken, {
      user_metadata: { group: group },
    });

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
        const idTokenClaims = await getIdTokenClaims();
        setIdTokenClaims(idTokenClaims);

        const token = await getAccessTokenSilently();
        setAccessToken(token);
        setAuthTokenClaims(decodeToken(token));

        console.log(decodeToken(token))

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

  // Update sidebar when user group changes
  useEffect(() => {
    let filteredSidebar = [];
    if (userProfile?.user.group === "admin") {
      filteredSidebar = homepage.sidebar;
    } else {
      homepage.sidebar.forEach((section) => {
        let filteredSection = {
          section: section.section,
          items: section.items.filter(
            (item) =>
              item.groups.length === 0 ||
              item.groups.includes(userProfile?.user.group)
          ),
        };
        if (filteredSection.items.length > 0) {
          filteredSidebar.push(filteredSection);
        }
      });
    }
    setSidebar(filteredSidebar);
  }, [userProfile]);

  if (isLoading) {
    return "";
  } else if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<SplashPage />} />
      </Routes>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isAuthenticated && (
        <Topbar
          sidebarWidth={SIDEBAR_WIDTH_PX}
          drawerIsOpen={drawerIsOpen}
          userProfile={userProfile}
          user={user}
          onSwitchGroup={(role) => handleSwitchGroup(role)}
          isAuthenticated={isAuthenticated}
          onToggleDrawer={() => toggleDrawer()}
        />
      )}
      {isAuthenticated && (
        <Sidebar
          sections={sidebar}
          open={drawerIsOpen}
          onClick={() => toggleDrawer()}
          width={SIDEBAR_WIDTH_PX}
        />
      )}
      <Box sx={{ width: "100%", height: "100vh", flexGrow: 1 }}>
        <AppBarOffset />
        <Routes>
          <Route path="/login" element={<SplashPage />} />
          <Route
            path="/"
            element={
              <LandingPage
                externalIdentifier={user.email}
                groups={[5, 6, 7]}
                pageUuid={STORE_OVERVIEW_UUID}
              />
            }
          />
          <Route
            path="/sales"
            element={
              <LandingPage
                externalIdentifier={user.email}
                groups={[5, 6, 7]}
                pageUuid={ORDERS_UUID}
              />
            }
          />
          {/* <Route
            path="/scorecard"
            element={
              <LandingPage
                externalIdentifier={user.email}
                groups={[5, 6, 7]}
                pageUuid={SCORECARD_UUID}
              />
            }
          /> */}
          <Route
            path="/coupons"
            element={
              <LandingPage
                externalIdentifier={user.email}
                groups={[5, 6, 7]}
                pageUuid={COUPONS_UUID}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
