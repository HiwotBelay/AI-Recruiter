import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Paper,
  Chip,
  LinearProgress,
  Grid,
  Button,
} from "@mui/material";
import {
  Work as WorkIcon,
  LocationOn as LocationIcon,
  School as EducationIcon,
  Star as StarIcon,
} from "@mui/icons-material";

// Profile image URL (replace with your actual image URL)
const PROFILE_IMAGE = "https://randomuser.me/api/portraits/men/32.jpg";

const USER_DATA = {
  name: "John Smith",
  title: "Senior Software Engineer",
  location: "San Francisco, CA",
  education: "M.S. Computer Science",
  experience: "8+ years",
  skills: ["React", "Node.js", "Python", "AWS", "Docker"],
  profileCompletion: 85,
  appliedJobs: 12,
  savedJobs: 24,
  matchScore: 92,
};

const UserProfile = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Grid container spacing={3}>
        {/* Left Column - Avatar and Basic Info */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={PROFILE_IMAGE}
              alt={USER_DATA.name}
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: "3px solid #fff",
                boxShadow: "0 0 15px rgba(0,0,0,0.1)",
              }}
            />
            <Typography variant="h5" gutterBottom>
              {USER_DATA.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {USER_DATA.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationIcon sx={{ mr: 1, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {USER_DATA.location}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EducationIcon sx={{ mr: 1, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {USER_DATA.education}
              </Typography>
            </Box>
            <Button variant="contained" color="primary" fullWidth>
              Edit Profile
            </Button>
          </Box>
        </Grid>

        {/* Right Column - Stats and Skills */}
        <Grid item xs={12} md={8}>
          {/* Profile Completion */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Profile Completion
            </Typography>
            <LinearProgress
              variant="determinate"
              value={USER_DATA.profileCompletion}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="caption" color="text.secondary">
              {USER_DATA.profileCompletion}% Complete
            </Typography>
          </Box>

          {/* Stats */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{USER_DATA.appliedJobs}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Applied Jobs
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{USER_DATA.savedJobs}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Saved Jobs
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{USER_DATA.matchScore}%</Typography>
                <Typography variant="body2" color="text.secondary">
                  Match Score
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Skills */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Skills
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {USER_DATA.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  icon={<StarIcon />}
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                />
              ))}
            </Box>
          </Box>

          {/* Experience */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Experience
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <WorkIcon sx={{ mr: 1, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {USER_DATA.experience} of professional experience
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserProfile;
