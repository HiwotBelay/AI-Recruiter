import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Container,
  Card,
  CardContent,
  useTheme,
  Avatar,
} from "@mui/material";
import {
  AutoFixHigh as AutomationIcon,
  Psychology as BiasIcon,
  Chat as ChatIcon,
  SmartToy as RobotIcon,
  Work as WorkIcon,
  Assessment as AssessmentIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";

const Dashboard = () => {
  const theme = useTheme();

  const stats = [
    { value: "24K", label: "Happy Client" },
    { value: "72", label: "Companies" },
    { value: "98%", label: "Success Rate" },
  ];

  const challenges = [
    {
      title: "Manual Screening",
      description: "Time consuming and prone to errors",
    },
    {
      title: "Hiring Bias",
      description: "Leads to lack of diversity",
    },
    {
      title: "Inefficient Communication",
      description: "Poor Candidate Engagement",
    },
    {
      title: "Poor Matching",
      description: "Difficulty finding the right fit",
    },
  ];

  const solutions = [
    {
      icon: <AutomationIcon sx={{ fontSize: 40, color: "#ff7043" }} />,
      title: "Automation",
      description: "Automates repetitive task",
    },
    {
      icon: <BiasIcon sx={{ fontSize: 40, color: "#ff7043" }} />,
      title: "Reduces Bias",
      description: "Improve candidate Matching",
    },
    {
      icon: <ChatIcon sx={{ fontSize: 40, color: "#ff7043" }} />,
      title: "Real-Time Chat",
      description: "Improve candidate Engagement",
    },
  ];

  const RobotAvatar = () => (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 500,
        height: 500,
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background Circle */}
      <Box
        sx={{
          position: "absolute",
          width: "80%",
          height: "80%",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #ff7043 0%, #ffa726 100%)",
          opacity: 0.2,
        }}
      />

      {/* Robot Icon */}
      <RobotIcon
        sx={{
          fontSize: 200,
          color: "#ff7043",
          filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.2))",
        }}
      />

      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "20%",
          animation: "float 3s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-10px)" },
          },
        }}
      >
        <WorkIcon sx={{ fontSize: 40, color: "#ff9800" }} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "30%",
          right: "25%",
          animation: "float 3s ease-in-out infinite 1s",
        }}
      >
        <AssessmentIcon sx={{ fontSize: 40, color: "#ff9800" }} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          right: "20%",
          animation: "float 3s ease-in-out infinite 0.5s",
        }}
      >
        <PersonIcon sx={{ fontSize: 40, color: "#ff9800" }} />
      </Box>
    </Box>
  );

  const ChallengesIllustration = () => (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 400,
        bgcolor: "#f5f5f5",
        borderRadius: 4,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          padding: 4,
          width: "100%",
          height: "100%",
        }}
      >
        {[...Array(6)].map((_, index) => (
          <Paper
            key={index}
            sx={{
              p: 2,
              bgcolor: "white",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              transform: `rotate(${Math.random() * 6 - 3}deg)`,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Avatar
              sx={{
                bgcolor: `rgba(255, 112, 67, ${0.5 + Math.random() * 0.5})`,
                width: 40,
                height: 40,
              }}
            >
              <PersonIcon />
            </Avatar>
            <Box
              sx={{
                width: "100%",
                height: 8,
                bgcolor: "#eee",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${30 + Math.random() * 70}%`,
                  height: "100%",
                  bgcolor: "#ff7043",
                }}
              />
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Overlay gradient */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(45deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ pt: 8, pb: 12 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              sx={{
                color: "#ff7043",
                fontWeight: 500,
                mb: 2,
                display: "block",
              }}
            >
              Over 98% Success rate
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 3,
                background: "linear-gradient(45deg, #ff7043 30%, #ff9800 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Revolutionizing
              <br />
              Hiring
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 4, maxWidth: "80%" }}
            >
              AI-Powered Solution to streamline recruitment. Eliminate biases
              and enhance candidate experience. Data driven insights for
              optimized hiring strategies
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#ff7043",
                color: "white",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "#ff5722",
                },
              }}
            >
              Get Started →
            </Button>

            {/* Statistics */}
            <Box sx={{ display: "flex", gap: 6, mt: 6 }}>
              {stats.map((stat, index) => (
                <Box key={index}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, color: "#ff7043", mb: 1 }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <RobotAvatar />
          </Grid>
        </Grid>

        {/* Recruitment Challenges Section */}
        <Box sx={{ py: 8 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 6, fontWeight: 600 }}
          >
            Recruitment Challenges
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 4 }}>
                {challenges.map((challenge, index) => (
                  <Box key={index} sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
                      {index + 1}. {challenge.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#ff7043" }}>
                      {challenge.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <ChallengesIllustration />
            </Grid>
          </Grid>
        </Box>

        {/* Our Solution Section */}
        <Box sx={{ py: 8 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 6, fontWeight: 600 }}
          >
            Our Solution
          </Typography>
          <Grid container spacing={4}>
            {solutions.map((solution, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "#fff5f2",
                    border: "1px solid #ffe0d6",
                    boxShadow: "none",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 2 }}>{solution.icon}</Box>
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
                      {solution.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {solution.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
