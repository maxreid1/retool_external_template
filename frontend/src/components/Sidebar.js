import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
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
} from "@mui/material";

export const Sidebar = ({ open = true, sections, onClick, width }) => {

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      color: "#ffffff",
      background: "#080928",
      position: "relative",
      whiteSpace: "nowrap",
      width: width,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shortest,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.shortest,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  return (
    <Drawer variant="permanent" open={open}>
      <Box display="flex" justifyContent="space-between" marginTop="24px">
        <Box display="flex">
          <img
            src="https://i.ibb.co/b2k0Ss0/Screen-Shot-2021-09-10-at-5-29-42-PM-removebg-preview.png"
            width="100%"
          />
        </Box>
        <Box alignSelf="flex-end" marginTop="-100">
          <IconButton style={{ color: "#ffffff" }} onClick={onClick}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ overflow: "auto", color: "#ffffff" }} marginTop="40">
        {sections.map((section) => (
          <>
            <List disablePadding={true}>
              {section.items.map((item, idx) => (
                <Link
                  key={idx}
                  to={{ pathname: [section.section, item.slug].join("/") }}
                  component={RouterLink}
                  underline="none"
                >
                  <ListItem
                    button
                    key={item.key + "listItem"}
                    sx={{
                      left: 2.5,
                    }}
                  >
                    <ListItemIcon
                      style={{ color: "#ffffff" }}
                      key={item.key + "listItemIcon"}
                    >
                      <Icon color="#ffffff">{item.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      key={item.key + "listItemText"}
                      sx={{
                        left: -20,
                      }}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
          </>
        ))}
      </Box>
    </Drawer>
  );
};
