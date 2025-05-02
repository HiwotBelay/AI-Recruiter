import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Divider,
  Paper,
  Tooltip,
  Tab,
  Tabs,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Slider,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  AttachMoney as SalaryIcon,
  BookmarkBorder as SaveIcon,
  Bookmark as SavedIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  Timer as TimerIcon,
} from "@mui/icons-material";
import UserProfile from "../components/UserProfile";

// Mock job data (expanded)
const jobListings = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    companyLogo: "https://logo.clearbit.com/microsoft.com",
    location: "San Francisco, CA",
    salary: "$120,000 - $160,000",
    type: "Full-time",
    posted: "2 days ago",
    description:
      "We are seeking an experienced Full Stack Developer to join our growing team...",
    requirements: ["5+ years experience", "React", "Node.js", "AWS"],
    benefits: ["Health insurance", "401(k)", "Remote work"],
    matchScore: 95,
    applicants: 45,
    deadline: "2024-03-30",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Creative Designs Inc",
    location: "New York, NY",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    posted: "1 day ago",
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
    posted: "3 days ago",
    description:
      "Join our DevOps team to build and maintain our cloud infrastructure...",
    requirements: ["4+ years experience", "Kubernetes", "Docker", "CI/CD"],
    benefits: ["Remote work", "Health insurance", "Learning budget"],
  },
];

// Additional job categories
const jobCategories = [
  { name: "Software Development", count: 156 },
  { name: "Data Science", count: 89 },
  { name: "UI/UX Design", count: 67 },
  { name: "Product Management", count: 45 },
  { name: "DevOps", count: 34 },
  { name: "Machine Learning", count: 23 },
];

const FindJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [salaryRange, setSalaryRange] = useState([50, 200]);
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");

  const handleSaveJob = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredJobs = jobListings
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation =
        !locationFilter ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesType =
        jobTypeFilter === "all" ||
        job.type.toLowerCase() === jobTypeFilter.toLowerCase();
      return matchesSearch && matchesLocation && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "matchScore":
          return b.matchScore - a.matchScore;
        case "salary":
          return (
            parseInt(b.salary.replace(/\D/g, "")) -
            parseInt(a.salary.replace(/\D/g, ""))
          );
        case "recent":
          return new Date(b.posted) - new Date(a.posted);
        default:
          return 0;
      }
    });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* User Profile Section */}
      <UserProfile />

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          variant="fullWidth"
        >
          <Tab label="All Jobs" />
          <Tab label="Recommended" />
          <Tab label="Recent" />
          <Tab label="Remote" />
        </Tabs>
      </Paper>

      {/* Search and Filter Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              placeholder="Search jobs by title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="matchScore">Match Score</MenuItem>
                <MenuItem value="salary">Salary</MenuItem>
                <MenuItem value="recent">Most Recent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<FilterIcon />}
              onClick={() => setIsFilterDrawerOpen(true)}
              sx={{ height: "56px" }}
            >
              Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Sidebar - Categories */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Job Categories
            </Typography>
            <List>
              {jobCategories.map((category) => (
                <ListItem
                  key={category.name}
                  button
                  selected={selectedCategories.includes(category.name)}
                  onClick={() => handleCategoryToggle(category.name)}
                >
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={category.name}
                    secondary={`${category.count} jobs`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Job Listings */}
        <Grid item xs={12} md={9}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">
              {filteredJobs.length} Jobs Found
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {filteredJobs.map((job) => (
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
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={8}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          {job.companyLogo && (
                            <Box
                              component="img"
                              src={job.companyLogo}
                              alt={job.company}
                              sx={{
                                width: 40,
                                height: 40,
                                mr: 2,
                                borderRadius: 1,
                              }}
                            />
                          )}
                          <Box>
                            <Typography variant="h6" gutterBottom>
                              {job.title}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                            >
                              {job.company}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            mb: 2,
                            flexWrap: "wrap",
                          }}
                        >
                          <Chip icon={<LocationIcon />} label={job.location} />
                          <Chip icon={<WorkIcon />} label={job.type} />
                          <Chip icon={<SalaryIcon />} label={job.salary} />
                          <Chip
                            icon={<StarIcon />}
                            label={`${job.matchScore}% Match`}
                            color="primary"
                          />
                        </Box>

                        <Typography variant="body2" paragraph>
                          {job.description}
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" gutterBottom>
                            Requirements:
                          </Typography>
                          <Box
                            sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
                          >
                            {job.requirements.map((req, index) => (
                              <Chip key={index} label={req} size="small" />
                            ))}
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              gutterBottom
                            >
                              <TimerIcon
                                sx={{
                                  fontSize: 16,
                                  mr: 0.5,
                                  verticalAlign: "text-bottom",
                                }}
                              />
                              Posted {job.posted}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <TrendingIcon
                                sx={{
                                  fontSize: 16,
                                  mr: 0.5,
                                  verticalAlign: "text-bottom",
                                }}
                              />
                              {job.applicants} applicants
                            </Typography>
                          </Box>

                          <Box sx={{ mt: 2 }}>
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              sx={{ mb: 1 }}
                            >
                              Apply Now
                            </Button>
                            <Button
                              variant="outlined"
                              fullWidth
                              startIcon={
                                savedJobs.includes(job.id) ? (
                                  <SavedIcon />
                                ) : (
                                  <SaveIcon />
                                )
                              }
                              onClick={() => handleSaveJob(job.id)}
                            >
                              {savedJobs.includes(job.id)
                                ? "Saved"
                                : "Save Job"}
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
      >
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Salary Range (K)
            </Typography>
            <Slider
              value={salaryRange}
              onChange={(e, newValue) => setSalaryRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={300}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Experience Level
            </Typography>
            <FormControl fullWidth>
              <Select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <MenuItem value="all">All Levels</MenuItem>
                <MenuItem value="entry">Entry Level</MenuItem>
                <MenuItem value="mid">Mid Level</MenuItem>
                <MenuItem value="senior">Senior Level</MenuItem>
                <MenuItem value="executive">Executive</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Job Type
            </Typography>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Full-time" />
              <FormControlLabel control={<Checkbox />} label="Part-time" />
              <FormControlLabel control={<Checkbox />} label="Contract" />
              <FormControlLabel control={<Checkbox />} label="Remote" />
              <FormControlLabel control={<Checkbox />} label="Internship" />
            </FormGroup>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setIsFilterDrawerOpen(false)}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Container>
  );
};

export default FindJobs;
