import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

export default function DrawerList() {
  const navigate = useNavigate();
  const handleNav = (txt) => {
    navigate(`/${txt}`);
  };

  return (
    <div style={{ background: "primary-dark" }}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {["Home", "Cart"].map((text, index) => (
            <ListItem key={text} disablePadding onClick={handleNav(text)}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </div>
  );
}
