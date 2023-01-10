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
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup
} from "@mui/material";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    color: "#ffffff",
    background: "#080928",
    position: "relative",
    whiteSpace: "nowrap",
    width: 250,
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


const FontSelector = () => {
  const [font, setFont] = React.useState('');

  const handleChange = (event) => {
    setFont(event.target.value);
  };
  return (
  <FormControl variant="filled" fullWidth>
  <InputLabel id="font-select-label" style={{color: '#080928'}}>Font</InputLabel>
    <Select
      labelId="font-select-label"
      id="font-select"
      value={font}
      // label="Font"
      onChange={handleChange}
      style={{backgroundColor: "white"}}
      
      >
              <MenuItem value={1}>Retool Default</MenuItem>
              <MenuItem value={2}>Times New Roman</MenuItem>
              <MenuItem value={3}>Calibri</MenuItem>
              <MenuItem value={4}>Arial</MenuItem>
            </Select>
          </FormControl>
  )
}

const DarkModeSelector = ({handleDarkModeToggle}) => {
 
  return (
    <FormGroup>
    <FormControlLabel control={<Switch  onChange={handleDarkModeToggle} backgroundColor="#fffff"/>} label="Dark Mode" />
  </FormGroup>
  );
}

const Sidebar = ({ drawerIsOpen = true, sidebarList, onClick, handleDarkModeToggle }) => {
  return (
    <Drawer variant="permanent" open={drawerIsOpen}>
      <Box display="flex" justifyContent="space-between" marginTop="24px">
        <Box display="flex">
          <img
            src="https://i.ibb.co/b2k0Ss0/Screen-Shot-2021-09-10-at-5-29-42-PM-removebg-preview.png"
            width="100%"
          />
        </Box>
        <Box alignSelf="flex-end">
          <IconButton style={{ color: "#ffffff" }} onClick={onClick}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ overflow: "auto", color: "#ffffff" }} marginTop="40">
        <List disablePadding={true}>
          {sidebarList.map((item) => (
            <React.Fragment key={item.slug}>
              <Link
                to={{ pathname: item.slug }}
                component={RouterLink}
                underline="none"
              >
                <ListItem
                  button
                  sx={{
                    left: 2.5,
                  }}
                >
                  <ListItemIcon style={{ color: "#ffffff" }}>
                    <Icon color="#ffffff">{item.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      left: -20,
                    }}
                  />
                </ListItem>
              </Link>
            </React.Fragment>
          ))}
        </List>
        <Divider />

      </Box>
      <Box position={"fixed"} bottom={'15'} width={'220'} marginLeft={'15'} >
      {drawerIsOpen && <FontSelector handleDarkModeToggle={handleDarkModeToggle}></FontSelector>}
      </Box>
      <Box position={"fixed"} bottom={'75'} width={'220'} marginLeft={'50'} >
       {drawerIsOpen && <DarkModeSelector handleDarkModeToggle={handleDarkModeToggle}> </DarkModeSelector>} 
      </Box>
   
    </Drawer>
  );
};

export default Sidebar;
