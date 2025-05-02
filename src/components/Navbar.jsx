import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Container,
  useTheme,
  useMediaQuery,
  InputBase,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Circle as CircleIcon,
  Close as CloseIcon,
  Work as WorkIcon,
  BookmarkBorder as SavedIcon,
  Description as ResumeIcon,
  Business as CompanyIcon,
  Timeline as ApplicationsIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Event as EventIcon,
  Chat as ChatIcon,
  Analytics as AnalyticsIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElJobs, setAnchorElJobs] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New candidate application received",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      message: "Interview scheduled for tomorrow",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      message: "Resume screening completed",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenJobsMenu = (event) => {
    setAnchorElJobs(event.currentTarget);
  };

  const handleCloseJobsMenu = () => {
    setAnchorElJobs(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      // Implement search functionality here
      console.log("Searching for:", searchQuery);
    }
  };

  const handleNotificationRead = (notificationId) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    handleNotificationClose();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Jobs", icon: <WorkIcon />, path: "/jobs" },
    {
      text: "Resume Screening",
      icon: <AssessmentIcon />,
      path: "/resume-screening",
    },
    {
      text: "Candidate Matching",
      icon: <PeopleIcon />,
      path: "/candidate-matching",
    },
    {
      text: "Interview Scheduling",
      icon: <EventIcon />,
      path: "/interview-scheduling",
    },
    { text: "Chatbot", icon: <ChatIcon />, path: "/chatbot" },
    { text: "Analytics", icon: <AnalyticsIcon />, path: "/analytics" },
    {
      text: "Candidate Evaluation",
      icon: <AssessmentIcon />,
      path: "/evaluate",
    },
  ];

  const jobMenuItems = [
    {
      title: "Find Jobs",
      icon: <SearchIcon />,
      path: "/jobs",
      description: "Search and apply for jobs",
    },
    {
      title: "Saved Jobs",
      icon: <SavedIcon />,
      path: "/saved-jobs",
      description: "View your bookmarked jobs",
    },
    {
      title: "My Applications",
      icon: <ApplicationsIcon />,
      path: "/applications",
      description: "Track your job applications",
    },
    {
      title: "Resume Builder",
      icon: <ResumeIcon />,
      path: "/resume-builder",
      description: "Create and manage your resumes",
    },
    {
      title: "Company Research",
      icon: <CompanyIcon />,
      path: "/companies",
      description: "Research potential employers",
    },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(to right, #4a4d3d, #5c5f4d)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and Brand */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": {
                transform: "scale(1.05)",
                transition: "transform 0.3s ease",
              },
            }}
            component={Link}
            to="/"
          >
            <Logo />
            <Typography
              variant="h6"
              noWrap
              sx={{
                ml: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "#deb887",
                textDecoration: "none",
                textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
              }}
            >
              QueneRecruit
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ color: "#deb887" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    onClick={() => {
                      handleClose();
                      navigate(item.path);
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {item.icon}
                      {item.text}
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              <Box sx={{ display: "flex", gap: 2, ml: 4 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: "#deb887",
                      fontWeight: location.pathname === item.path ? 600 : 500,
                      "&:hover": {
                        color: "#fff",
                        textShadow: "0 0 10px #deb887",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item.text}
                  </Button>
                ))}

                {/* Enhanced Jobs Dropdown */}
                <Button
                  onClick={handleOpenJobsMenu}
                  sx={{
                    color: "#deb887",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: location.pathname === "/jobs" ? 600 : 500,
                    "&:hover": {
                      color: "#fff",
                      textShadow: "0 0 10px #deb887",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <WorkIcon sx={{ mr: 0.5 }} />
                  Jobs
                  <ArrowDropDownIcon />
                </Button>
                <Menu
                  anchorEl={anchorElJobs}
                  open={Boolean(anchorElJobs)}
                  onClose={handleCloseJobsMenu}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      width: 320,
                      maxWidth: "100%",
                      mt: 1.5,
                      "& .MuiMenuItem-root": {
                        py: 1.5,
                      },
                    },
                  }}
                >
                  {jobMenuItems.map((item) => (
                    <MenuItem
                      key={item.title}
                      component={Link}
                      to={item.path}
                      onClick={handleCloseJobsMenu}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(222,184,135,0.1)",
                        },
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        secondary={item.description}
                        primaryTypographyProps={{
                          fontWeight: 500,
                        }}
                        secondaryTypographyProps={{
                          fontSize: "0.75rem",
                        }}
                      />
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Box sx={{ flexGrow: 1 }} />

              {/* Search Bar */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(222,184,135,0.1)",
                  borderRadius: "8px",
                  padding: "4px 12px",
                  marginRight: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(222,184,135,0.2)",
                  },
                }}
              >
                <SearchIcon sx={{ color: "#deb887", mr: 1 }} />
                <InputBase
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleSearch}
                  sx={{
                    color: "#deb887",
                    "& input": {
                      color: "#deb887",
                      "&::placeholder": {
                        color: "rgba(222,184,135,0.7)",
                        opacity: 1,
                      },
                    },
                  }}
                />
              </Box>

              {/* Notification Icon */}
              <IconButton
                onClick={handleNotificationClick}
                sx={{
                  color: "#deb887",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/* Notifications Popover */}
              <Popover
                open={Boolean(notificationAnchorEl)}
                anchorEl={notificationAnchorEl}
                onClose={handleNotificationClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    width: 320,
                    maxHeight: 400,
                    overflow: "auto",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Notifications</Typography>
                  <IconButton size="small" onClick={handleClearNotifications}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Divider />
                {notifications.length > 0 ? (
                  <List>
                    {notifications.map((notification) => (
                      <ListItem
                        key={notification.id}
                        onClick={() => handleNotificationRead(notification.id)}
                        sx={{
                          cursor: "pointer",
                          backgroundColor: notification.read
                            ? "transparent"
                            : "rgba(222,184,135,0.1)",
                          "&:hover": {
                            backgroundColor: "rgba(222,184,135,0.2)",
                          },
                        }}
                      >
                        <ListItemIcon>
                          <CircleIcon
                            sx={{
                              fontSize: 8,
                              color: notification.read
                                ? "transparent"
                                : "#deb887",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={notification.message}
                          secondary={notification.time}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ p: 2, textAlign: "center" }}>
                    <Typography color="text.secondary">
                      No notifications
                    </Typography>
                  </Box>
                )}
              </Popover>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
