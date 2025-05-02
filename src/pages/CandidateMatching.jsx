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
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Person as PersonIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  Message as MessageIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const CandidateMatching = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const candidates = [
    {
      id: 1,
      name: "John Doe",
      position: "Senior Software Engineer",
      match: 95,
      experience: "8 years",
      location: "New York, NY",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
      rating: 4.8,
      image: "https://source.unsplash.com/random/150x150?portrait",
      availability: "Immediate",
      status: "Shortlisted",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Product Manager",
      match: 88,
      experience: "6 years",
      location: "San Francisco, CA",
      skills: ["Product Strategy", "Agile", "User Research", "Data Analysis"],
      rating: 4.5,
      image: "https://source.unsplash.com/random/150x150?woman",
      availability: "2 weeks",
      status: "Under Review",
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "UX Designer",
      match: 92,
      experience: "5 years",
      location: "Austin, TX",
      skills: ["Figma", "User Testing", "Prototyping", "Design Systems"],
      rating: 4.7,
      image: "https://source.unsplash.com/random/150x150?man",
      availability: "1 week",
      status: "Shortlisted",
    },
  ];

  const handleOpenDialog = (candidate) => {
    setSelectedCandidate(candidate);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCandidate(null);
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
          Candidate Matching
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonIcon />}
          sx={{
            backgroundColor: "#FFD700",
            "&:hover": {
              backgroundColor: "#FFA726",
            },
          }}
        >
          Add New Position
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
              Matched Candidates
            </Typography>
            {candidates.map((candidate) => (
              <Card
                key={candidate.id}
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
                        image={candidate.image}
                        alt={candidate.name}
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6">{candidate.name}</Typography>
                        <Rating
                          value={candidate.rating}
                          precision={0.1}
                          readOnly
                          size="small"
                        />
                      </Box>
                      <Typography color="text.secondary" gutterBottom>
                        {candidate.position}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                        {candidate.skills.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            sx={{
                              backgroundColor: "#FFE0B2",
                              color: "#333",
                            }}
                          />
                        ))}
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          <WorkIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          {candidate.experience} experience
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <LocationIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          {candidate.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <ScheduleIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          Available in {candidate.availability}
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
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="body2">Match:</Typography>
                          <LinearProgress
                            variant="determinate"
                            value={candidate.match}
                            sx={{
                              flexGrow: 1,
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: "rgba(0,0,0,0.1)",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#FFD700",
                              },
                            }}
                          />
                          <Typography variant="body2">
                            {candidate.match}%
                          </Typography>
                        </Box>
                        <Chip
                          label={candidate.status}
                          color={
                            candidate.status === "Shortlisted"
                              ? "success"
                              : "warning"
                          }
                          size="small"
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<MessageIcon />}
                          onClick={() => handleOpenDialog(candidate)}
                          sx={{
                            borderColor: "#FFD700",
                            color: "#333",
                            "&:hover": {
                              borderColor: "#FFA726",
                              backgroundColor: "rgba(255, 215, 0, 0.1)",
                            },
                          }}
                        >
                          View Details
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
              Matching Statistics
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Matches
                </Typography>
                <Typography variant="h4">1,234</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  High Match Rate (>90%)
                </Typography>
                <Typography variant="h4">456</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Average Match Rate
                </Typography>
                <Typography variant="h4">85%</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mb: 2, color: "#333" }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                startIcon={<PersonIcon />}
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
                Add New Position
              </Button>
              <Button
                startIcon={<ScheduleIcon />}
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
                Schedule Interviews
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
        {selectedCandidate && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CardMedia
                  component="img"
                  image={selectedCandidate.image}
                  alt={selectedCandidate.name}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Box>
                  <Typography variant="h6">{selectedCandidate.name}</Typography>
                  <Typography color="text.secondary">
                    {selectedCandidate.position}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Skills
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selectedCandidate.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        sx={{
                          backgroundColor: "#FFE0B2",
                          color: "#333",
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Experience
                  </Typography>
                  <Typography>{selectedCandidate.experience}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Location
                  </Typography>
                  <Typography>{selectedCandidate.location}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Availability
                  </Typography>
                  <Typography>
                    Available in {selectedCandidate.availability}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Match Rate
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={selectedCandidate.match}
                      sx={{
                        flexGrow: 1,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "rgba(0,0,0,0.1)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#FFD700",
                        },
                      }}
                    />
                    <Typography>{selectedCandidate.match}%</Typography>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button
                variant="contained"
                startIcon={<MessageIcon />}
                sx={{
                  backgroundColor: "#FFD700",
                  "&:hover": {
                    backgroundColor: "#FFA726",
                  },
                }}
              >
                Contact Candidate
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default CandidateMatching;
