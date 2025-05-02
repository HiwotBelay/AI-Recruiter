import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  VideoCall as VideoCallIcon,
  MeetingRoom as MeetingRoomIcon,
  Add as AddIcon,
} from "@mui/icons-material";

const InterviewScheduling = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);

  const interviews = [
    {
      id: 1,
      candidate: "John Doe",
      position: "Senior Software Engineer",
      date: "2025-03-25",
      time: "10:00 AM",
      type: "Technical",
      interviewer: "Sarah Johnson",
      status: "Scheduled",
      image: "https://source.unsplash.com/random/150x150?portrait",
      location: "Meeting Room A",
      duration: "1 hour",
    },
    {
      id: 2,
      candidate: "Jane Smith",
      position: "Product Manager",
      date: "2025-03-26",
      time: "2:00 PM",
      type: "Behavioral",
      interviewer: "Mike Wilson",
      status: "Pending",
      image: "https://source.unsplash.com/random/150x150?woman",
      location: "Virtual",
      duration: "45 minutes",
    },
    {
      id: 3,
      candidate: "Mike Johnson",
      position: "UX Designer",
      date: "2025-03-27",
      time: "11:00 AM",
      type: "Portfolio Review",
      interviewer: "Emily Brown",
      status: "Scheduled",
      image: "https://source.unsplash.com/random/150x150?man",
      location: "Meeting Room B",
      duration: "1 hour",
    },
  ];

  const handleOpenDialog = (interview) => {
    setSelectedInterview(interview);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedInterview(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ color: "#333" }}>
          Interview Scheduling
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            backgroundColor: "#FFD700",
            "&:hover": {
              backgroundColor: "#FFA726",
            },
          }}
        >
          Schedule New Interview
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #FFF9E6 0%, #FFFFFF 100%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#333" }}>
              Upcoming Interviews
            </Typography>
            {interviews.map((interview) => (
              <Card
                key={interview.id}
                sx={{
                  mb: 2,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <CardMedia
                        component="img"
                        image={interview.image}
                        alt={interview.candidate}
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <Typography variant="h6">
                        {interview.candidate}
                      </Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {interview.position}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                        <Chip
                          label={interview.type}
                          size="small"
                          sx={{
                            backgroundColor: "#FFE0B2",
                            color: "#333",
                          }}
                        />
                        <Chip
                          label={interview.status}
                          color={
                            interview.status === "Scheduled"
                              ? "success"
                              : "warning"
                          }
                          size="small"
                        />
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          <CalendarIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          {interview.date}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          {interview.time} ({interview.duration})
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <PersonIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          {interview.interviewer}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          {interview.location}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={
                            interview.location === "Virtual" ? (
                              <VideoCallIcon />
                            ) : (
                              <MeetingRoomIcon />
                            )
                          }
                          onClick={() => handleOpenDialog(interview)}
                          sx={{
                            borderColor: "#FFD700",
                            color: "#333",
                            "&:hover": {
                              borderColor: "#FFA726",
                              backgroundColor: "rgba(255, 215, 0, 0.1)",
                            },
                          }}
                        >
                          {interview.location === "Virtual"
                            ? "Join Meeting"
                            : "View Details"}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #FFF9E6 0%, #FFFFFF 100%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#333" }}>
              Interview Statistics
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Interviews
                </Typography>
                <Typography variant="h4">1,234</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Scheduled This Week
                </Typography>
                <Typography variant="h4">45</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Completion Rate
                </Typography>
                <Typography variant="h4">92%</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mb: 2, color: "#333" }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                fullWidth
                onClick={() => setOpenDialog(true)}
                sx={{
                  borderColor: "#FFD700",
                  color: "#333",
                  "&:hover": {
                    borderColor: "#FFA726",
                    backgroundColor: "rgba(255, 215, 0, 0.1)",
                  },
                }}
              >
                Schedule New Interview
              </Button>
              <Button
                startIcon={<CalendarIcon />}
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: "#FFD700",
                  color: "#333",
                  "&:hover": {
                    borderColor: "#FFA726",
                    backgroundColor: "rgba(255, 215, 0, 0.1)",
                  },
                }}
              >
                View Calendar
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedInterview ? "Interview Details" : "Schedule New Interview"}
        </DialogTitle>
        <DialogContent>
          {selectedInterview ? (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Candidate Information
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <CardMedia
                    component="img"
                    image={selectedInterview.image}
                    alt={selectedInterview.candidate}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <Box>
                    <Typography variant="h6">
                      {selectedInterview.candidate}
                    </Typography>
                    <Typography color="text.secondary">
                      {selectedInterview.position}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  <CalendarIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  {selectedInterview.date} at {selectedInterview.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <PersonIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  Interviewer: {selectedInterview.interviewer}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  {selectedInterview.location}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Interview Details
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <Chip
                    label={selectedInterview.type}
                    size="small"
                    sx={{
                      backgroundColor: "#FFE0B2",
                      color: "#333",
                    }}
                  />
                  <Chip
                    label={selectedInterview.status}
                    color={
                      selectedInterview.status === "Scheduled"
                        ? "success"
                        : "warning"
                    }
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Duration: {selectedInterview.duration}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Candidate"
                  defaultValue=""
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="john">John Doe</MenuItem>
                  <MenuItem value="jane">Jane Smith</MenuItem>
                  <MenuItem value="mike">Mike Johnson</MenuItem>
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Interview Type"
                  defaultValue=""
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="technical">Technical</MenuItem>
                  <MenuItem value="behavioral">Behavioral</MenuItem>
                  <MenuItem value="portfolio">Portfolio Review</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  type="time"
                  label="Time"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField select fullWidth label="Interviewer" defaultValue="">
                  <MenuItem value="sarah">Sarah Johnson</MenuItem>
                  <MenuItem value="mike">Mike Wilson</MenuItem>
                  <MenuItem value="emily">Emily Brown</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          {!selectedInterview && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFD700",
                "&:hover": {
                  backgroundColor: "#FFA726",
                },
              }}
            >
              Schedule Interview
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InterviewScheduling;
