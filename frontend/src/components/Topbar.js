import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

import { LogoutMenuItem } from "./auth/LogoutMenuItem";

export const Topbar = ({
  sidebarWidth = 250,
  drawerIsOpen,
  user = {},
  onToggleDrawer,
  ...props
}) => {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    boxShadow: "none",
    borderBottom: "2px solid #eeeeee",
    zIndex: theme.zIndex.drawer + 1,
    ...(open && {
      marginLeft: sidebarWidth,
      width: `calc(100% - ${sidebarWidth}px)`,
    }),
  }));

  return (
    <AppBar position="fixed" open={drawerIsOpen}>
      <Toolbar
        sx={{
          pr: "24px",
          color: "#080928 ",
        }}
      >
        <IconButton
          edge="start"
          aria-label="open drawer"
          onClick={onToggleDrawer}
          sx={{
            marginRight: "36px",
            ...(drawerIsOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box>
          <div style={{ fontWeight: 900, fontSize: 24, letterSpacing: ".25px" }}>Shopco Merchant</div>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <span
          style={{
            marginRight: "20px",
            fontSize: "16px",
            letterSpacing: ".25px",
            fontWeight: 500
          }}
        >
          {user.name}
        </span>
        <UserMenu {...props} />
      </Toolbar>
    </AppBar>
  );
};

const UserMenu = ({ userProfile = {}, isAuthenticated, onSwitchGroup }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <AccountCircle
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />
      <Menu
        sx={{ mt: "45px", color: "#080928" }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {isAuthenticated &&
          userProfile?.app.roles.map((role) => (
            <MenuItem key={role} onClick={() => onSwitchGroup(role)}>
              <Typography>Impersonate {role}</Typography>
            </MenuItem>
          ))}
        {isAuthenticated && <Divider />}
        <Link
          to={{ pathname: "/profile_page" }}
          component={RouterLink}
          underline="none"
        >
          {" "}
          <MenuItem style={{ color: "#080928" }}>
            <Typography>View profile</Typography>
          </MenuItem>
        </Link>
        {isAuthenticated && <LogoutMenuItem />}
      </Menu>
    </div>
  );
};
