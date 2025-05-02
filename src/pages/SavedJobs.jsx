import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Divider,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Alert,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  Work as WorkIcon,
  AttachMoney as SalaryIcon,
  Delete as DeleteIcon,
  MoreVert as MoreIcon,
  Share as ShareIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";

// Mock saved jobs data
const initialSavedJobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    salary: "$120,000 - $160,000",
    type: "Full-time",
    savedDate: "2024-03-15",
    applicationDeadline: "2024-03-30",
    status: "Not Applied",
    description:
      "We are seeking an experienced Full Stack Developer to join our growing team...",
    requirements: ["5+ years experience", "React", "Node.js", "AWS"],
    benefits: ["Health insurance", "401(k)", "Remote work"],
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Creative Designs Inc",
    location: "New York, NY",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    savedDate: "2024-03-14",
    applicationDeadline: "2024-03-28",
    status: "Applied",
    description:
      "Looking for a talented UX/UI Designer to create beautiful and functional interfaces...",
    requirements: ["3+ years experience", "Figma", "Adobe XD", "User Research"],
    benefits: ["Flexible hours", "Stock options", "Professional development"],
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "Cloud Systems",
    location: "Remote",
    salary: "$130,000 - $170,000",
    type: "Remote",
    savedDate: "2024-03-13",
    applicationDeadline: "2024-03-29",
    status: "Not Applied",
    description:
      "Join our DevOps team to build and maintain our cloud infrastructure...",
    requirements: ["4+ years experience", "Kubernetes", "Docker", "CI/CD"],
    benefits: ["Remote work", "Health insurance", "Learning budget"],
  },
];

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState(initialSavedJobs);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleMenuOpen = (event, job) => {
    setAnchorEl(event.currentTarget);
    setSelectedJob(job);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedJob(null);
  };

  const handleRemoveJob = (jobId) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
    handleMenuClose();
    setAlert({
      severity: "success",
      message: "Job removed from saved jobs",
    });
  };

  const handleShare = (job) => {
    // Implement share functionality
    navigator.clipboard.writeText(
      `Check out this job: ${job.title} at ${job.company}`
    );
    handleMenuClose();
    setAlert({
      severity: "success",
      message: "Job link copied to clipboard",
    });
  };

  const getDaysUntilDeadline = (deadline) => {
    const days = Math.ceil(
      (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Saved Jobs
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {savedJobs.length} jobs saved
        </Typography>
      </Box>

      {/* Alert */}
      {alert && (
        <Alert
          severity={alert.severity}
          sx={{ mb: 2 }}
          onClose={() => setAlert(null)}
        >
          {alert.message}
        </Alert>
      )}

      {/* Job Listings */}
      <Grid container spacing={3}>
        {savedJobs.map((job) => (
          <Grid item xs={12} key={job.id}>
            <Card
              sx={{
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-2px)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {job.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {job.company}
                    </Typography>
                  </Box>
                  <Box>
                    <Tooltip title="More options">
                      <IconButton onClick={(e) => handleMenuOpen(e, job)}>
                        <MoreIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
                  <Chip icon={<LocationIcon />} label={job.location} />
                  <Chip icon={<WorkIcon />} label={job.type} />
                  <Chip icon={<SalaryIcon />} label={job.salary} />
                  <Chip
                    icon={<CalendarIcon />}
                    label={`${getDaysUntilDeadline(
                      job.applicationDeadline
                    )} days left`}
                    color={
                      getDaysUntilDeadline(job.applicationDeadline) < 7
                        ? "error"
                        : "default"
                    }
                  />
                </Box>

                <Typography variant="body2" paragraph>
                  {job.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Requirements:
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {job.requirements.map((req, index) => (
                      <Chip key={index} label={req} size="small" />
                    ))}
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Saved on: {new Date(job.savedDate).toLocaleDateString()}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Deadline:{" "}
                      {new Date(job.applicationDeadline).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Chip
                      label={job.status}
                      color={job.status === "Applied" ? "success" : "default"}
                      sx={{ mr: 1 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={job.status === "Applied"}
                    >
                      {job.status === "Applied" ? "Applied" : "Apply Now"}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => selectedJob && handleShare(selectedJob)}>
          <ShareIcon sx={{ mr: 1 }} /> Share
        </MenuItem>
        <MenuItem
          onClick={() => selectedJob && handleRemoveJob(selectedJob.id)}
        >
          <DeleteIcon sx={{ mr: 1 }} /> Remove
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default SavedJobs;
