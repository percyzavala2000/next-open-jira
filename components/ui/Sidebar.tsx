import { useContext } from "react";
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { UIContext } from "../../context/ui";

const menuItems:string[]=[
    "inbox",
    "starred",
    "sent",
    "drafts",
    "trash",
    "spam"
]

export const Sidebar = () => {
  const { sidemenuOpen,handleClose} = useContext(UIContext);
  
  return (
    <Drawer
      anchor="left"
      open={sidemenuOpen}
      onClose={handleClose} 
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h5"> Menu </Typography>
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {item === "inbox" ? (
                  <InboxOutlinedIcon />
                ) : (
                  <EmailOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <Divider />

        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {item === "inbox" ? (
                  <InboxOutlinedIcon />
                ) : (
                  <EmailOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
