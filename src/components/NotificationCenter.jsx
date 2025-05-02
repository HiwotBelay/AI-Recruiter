import React, { useState } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

const NotificationCenter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications] = useState([
    {
      id: 1,
      type: "success",
      message: "New candidate matched for Software Engineer position",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "warning",
      message: "Interview scheduled with John Doe",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "info",
      message: "New resume uploaded for review",
      time: "2 hours ago",
    },
  ]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon color="success" />;
      case "warning":
        return <WarningIcon color="warning" />;
      case "info":
        return <InfoIcon color="info" />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        sx={{
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: 400,
            width: 360,
            mt: 1,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              button
              onClick={handleClose}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <ListItemIcon>
                {getNotificationIcon(notification.type)}
              </ListItemIcon>
              <ListItemText
                primary={notification.message}
                secondary={notification.time}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Typography
            variant="body2"
            color="primary"
            align="center"
            sx={{ width: "100%" }}
          >
            View All Notifications
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NotificationCenter;
