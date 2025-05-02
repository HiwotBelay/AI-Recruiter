import React from "react";
import {
  Paper,
  Grid,
  IconButton,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Upload as UploadIcon,
  Schedule as ScheduleIcon,
  Assessment as AssessmentIcon,
  Group as GroupIcon,
  Analytics as AnalyticsIcon,
} from "@mui/icons-material";

const QuickActions = () => {
  const actions = [
    {
      icon: <AddIcon />,
      label: "Add Candidate",
      color: "#FFD700",
    },
    {
      icon: <UploadIcon />,
      label: "Upload Resume",
      color: "#FFA726",
    },
    {
      icon: <ScheduleIcon />,
      label: "Schedule Interview",
      color: "#FFB74D",
    },
    {
      icon: <AssessmentIcon />,
      label: "Create Assessment",
      color: "#FFCC80",
    },
    {
      icon: <GroupIcon />,
      label: "Team Meeting",
      color: "#FFE0B2",
    },
    {
      icon: <AnalyticsIcon />,
      label: "View Reports",
      color: "#FFF3E0",
    },
  ];

  return (
    <Paper
      sx={{
        p: 2,
        mt: 2,
        background: "linear-gradient(135deg, #FFF9E6 0%, #FFFFFF 100%)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "#333" }}>
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid item xs={4} sm={2} key={index}>
            <Tooltip title={action.label}>
              <IconButton
                sx={{
                  width: "100%",
                  height: "80px",
                  backgroundColor: action.color,
                  "&:hover": {
                    backgroundColor: action.color,
                    transform: "translateY(-4px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {action.icon}
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "0.7rem",
                      color: "#333",
                      textAlign: "center",
                    }}
                  >
                    {action.label}
                  </Typography>
                </Box>
              </IconButton>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default QuickActions;
