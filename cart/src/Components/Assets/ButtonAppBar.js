import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button, Divider, Drawer } from "@mui/material";
import DrawerList from "./DrawerList";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar(props) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(props.au);
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState(false);

  const handleChange = () => {
    navigate("/signUp");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCart = () => {
    setAnchorEl(null);
    navigate("/cart");
  };

  const handleLogout = (e) => {
    sessionStorage.removeItem("Uname");
    setAnchorEl(null);
    setAuth(null);
    navigate("/home");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  useEffect(() => {
    setAuth(props.au);
  }, [props.au]);

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", top: "0" }}>
      <FormGroup></FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.page}
          </Typography>
          {auth ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleCart}>My Cart</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>LogOut</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" onClick={handleChange}>
              Login
            </Button>
          )}
        </Toolbar>
        <React.Fragment key="left">
          <Drawer open={state} onClose={toggleDrawer(false)}>
            <DrawerList />
          </Drawer>
        </React.Fragment>
      </AppBar>
    </Box>
  );
}
