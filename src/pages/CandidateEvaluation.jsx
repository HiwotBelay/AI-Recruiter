import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  LinearProgress,
  Rating,
} from "@mui/material";
import {
  Work as WorkIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Psychology as PsychologyIcon,
} from "@mui/icons-material";

const CandidateEvaluation = () => {
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [error, setError] = useState("");
  const [candidateData, setCandidateData] = useState({
    name: "",
    email: "",
    yearsOfExperience: "",
    education: "",
    skills: "",
    previousCompanies: "",
    achievements: "",
    certifications: "",
  });

  const handleInputChange = (field) => (event) => {
    setCandidateData({ ...candidateData, [field]: event.target.value });
    setError("");
  };

  const evaluateCandidate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate API call to AI evaluation service
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // AI Evaluation Logic
      const experienceScore = Math.min(
        parseInt(candidateData.yearsOfExperience) / 5,
        5
      );
      const educationScore = candidateData.education
        .toLowerCase()
        .includes("bachelor")
        ? 4
        : 3;
      const skillsScore = candidateData.skills.split(",").length / 2;
      const achievementsScore =
        candidateData.achievements.split(".").length / 2;
      const certificationsScore =
        candidateData.certifications.split(",").length;

      const overallScore =
        experienceScore * 0.3 +
        educationScore * 0.2 +
        skillsScore * 0.2 +
        achievementsScore * 0.15 +
        certificationsScore * 0.15;

      const evaluationResult = {
        overallScore: Math.min(overallScore, 5),
        experienceScore,
        educationScore,
        skillsScore,
        achievementsScore,
        certificationsScore,
        strengths: [
          "Strong technical background",
          "Relevant industry experience",
          "Proven track record",
        ],
        areasForImprovement: [
          "Additional certifications",
          "Leadership experience",
          "Project management skills",
        ],
        recommendation:
          overallScore >= 4
            ? "Highly Recommended"
            : overallScore >= 3
            ? "Recommended"
            : "Consider with Caution",
        matchPercentage: Math.round(overallScore * 20),
      };

      setEvaluation(evaluationResult);
    } catch (err) {
      setError("Failed to evaluate candidate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: "bold" }}>
        AI-Powered Candidate Evaluation
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Candidate Information
            </Typography>
            <Box component="form" onSubmit={evaluateCandidate}>
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                value={candidateData.name}
                onChange={handleInputChange("name")}
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={candidateData.email}
                onChange={handleInputChange("email")}
                required
              />
              <TextField
                fullWidth
                label="Years of Experience"
                type="number"
                margin="normal"
                value={candidateData.yearsOfExperience}
                onChange={handleInputChange("yearsOfExperience")}
                required
              />
              <TextField
                fullWidth
                label="Education"
                margin="normal"
                value={candidateData.education}
                onChange={handleInputChange("education")}
                required
              />
              <TextField
                fullWidth
                label="Skills (comma-separated)"
                margin="normal"
                value={candidateData.skills}
                onChange={handleInputChange("skills")}
                required
              />
              <TextField
                fullWidth
                label="Previous Companies"
                margin="normal"
                value={candidateData.previousCompanies}
                onChange={handleInputChange("previousCompanies")}
                required
              />
              <TextField
                fullWidth
                label="Key Achievements"
                multiline
                rows={3}
                margin="normal"
                value={candidateData.achievements}
                onChange={handleInputChange("achievements")}
                required
              />
              <TextField
                fullWidth
                label="Certifications (comma-separated)"
                margin="normal"
                value={candidateData.certifications}
                onChange={handleInputChange("certifications")}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ mt: 3 }}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Evaluate Candidate"
                )}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {evaluation && (
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Evaluation Results
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  {evaluation.recommendation}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={evaluation.matchPercentage}
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  Match Percentage: {evaluation.matchPercentage}%
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <WorkIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">Experience</Typography>
                    <Rating value={evaluation.experienceScore} readOnly />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <SchoolIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">Education</Typography>
                    <Rating value={evaluation.educationScore} readOnly />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <CodeIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">Skills</Typography>
                    <Rating value={evaluation.skillsScore} readOnly />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <PsychologyIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h6">Achievements</Typography>
                    <Rating value={evaluation.achievementsScore} readOnly />
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Strengths
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {evaluation.strengths.map((strength, index) => (
                    <Chip key={index} label={strength} color="success" />
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Areas for Improvement
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {evaluation.areasForImprovement.map((area, index) => (
                    <Chip key={index} label={area} color="warning" />
                  ))}
                </Box>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CandidateEvaluation;
