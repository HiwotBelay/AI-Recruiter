import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

// Mock data for jobs
const jobListings = [
  {
    id: 1,
    title: "Graphic Designer",
    company: "Really Great Site",
    location: "Ethiopia, Bahirdar",
    salary: "$80,000 - $120,000",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Join our creative team as a Graphic Designer and help create stunning visual content for our clients.",
    requirements: [
      "Bachelor's degree in Graphic Design",
      "Strong understanding of design principles",
      "Experience with motion graphics and video editing",
    ],
    applicationDeadline: "2025-04-30",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Creative Designs Inc",
    location: "Ethiopia, Amhar",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Looking for a talented UX/UI Designer to create beautiful and functional interfaces...",
    requirements: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    applicationDeadline: "2025-04-10",
  },
  {
    id: 3,
    title: "Senior UX/UI Designer",
    company: "Digital Solutions",
    location: "Ethiopia, Gondar",
    salary: "$130,000 - $170,000",
    type: "Remote",
    experience: "5+ years",
    description:
      "Join our UX/UI team to create innovative and user-friendly interfaces...",
    requirements: ["Figma", "Adobe XD", "User Research", "Design Systems"],
    applicationDeadline: "2025-04-20",
  },
];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    jobType: "all",
    location: "all",
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    portfolio: "",
    coverLetter: "",
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplicationChange = (field, value) => {
    setApplicationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleSubmitApplication = () => {
    // Here you would typically send the application data to your backend
    console.log("Submitting application:", {
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      ...applicationData,
    });

    // Reset form and close dialog
    setApplicationData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      portfolio: "",
      coverLetter: "",
    });
    setOpenDialog(false);
    alert("Application submitted successfully!");
  };

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesJobType =
      filters.jobType === "all" ||
      job.type.toLowerCase() === filters.jobType.toLowerCase();

    const matchesLocation =
      filters.location === "all" ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesJobType && matchesLocation;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search and Filters */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search jobs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, company, or location"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Job Type</InputLabel>
            <Select
              value={filters.jobType}
              label="Job Type"
              onChange={(e) => handleFilterChange("jobType", e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="full-time">Full-time</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              value={filters.location}
              label="Location"
              onChange={(e) => handleFilterChange("location", e.target.value)}
            >
              <MenuItem value="all">All Locations</MenuItem>
              <MenuItem value="bahirdar">Bahirdar</MenuItem>
              <MenuItem value="amhar">Amhar</MenuItem>
              <MenuItem value="gondar">Gondar</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Job Listings */}
      <Grid container spacing={3}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} key={job.id}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>
                      {job.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {job.company} • {job.location}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {job.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        💰 {job.salary} • 🕒 {job.type} • 📅 Experience:{" "}
                        {job.experience}
                      </Typography>
                      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        Application Deadline:{" "}
                        {new Date(job.applicationDeadline).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleApply(job)}
                    >
                      Apply Now
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Application Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Apply for {selectedJob?.title} at {selectedJob?.company}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={applicationData.name}
                onChange={(e) =>
                  handleApplicationChange("name", e.target.value)
                }
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={applicationData.email}
                onChange={(e) =>
                  handleApplicationChange("email", e.target.value)
                }
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={applicationData.phone}
                onChange={(e) =>
                  handleApplicationChange("phone", e.target.value)
                }
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Years of Experience"
                value={applicationData.experience}
                onChange={(e) =>
                  handleApplicationChange("experience", e.target.value)
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Portfolio URL"
                value={applicationData.portfolio}
                onChange={(e) =>
                  handleApplicationChange("portfolio", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cover Letter"
                multiline
                rows={4}
                value={applicationData.coverLetter}
                onChange={(e) =>
                  handleApplicationChange("coverLetter", e.target.value)
                }
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmitApplication}
            disabled={
              !applicationData.name ||
              !applicationData.email ||
              !applicationData.phone ||
              !applicationData.coverLetter
            }
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Jobs;
