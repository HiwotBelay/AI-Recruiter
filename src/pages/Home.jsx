import React from "react";
import { Box, Container, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff6e5 0%, #fff9e5 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "calc(100vh - 64px)", // Subtract navbar height
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Left Content */}
          <Box sx={{ maxWidth: "600px", py: 8 }}>
            <Typography
              variant="overline"
              sx={{
                color: "#ff6b4a",
                fontWeight: 600,
                letterSpacing: 1.5,
                mb: 2,
                display: "block",
              }}
            >
              OVER 98% SUCCESS RATE
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 700,
                color: "#ff6b4a",
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Revolutionizing
              <br />
              Hiring
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#666",
                mb: 4,
                fontSize: "1.1rem",
                maxWidth: "500px",
                lineHeight: 1.6,
              }}
            >
              AI-Powered Solution to streamline recruitment. Eliminate biases
              and enhance candidate experience. Data driven insights for
              optimized hiring strategies
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/resume-screening")}
              sx={{
                backgroundColor: "#ff6b4a",
                color: "#fff",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#ff5436",
                },
              }}
            >
              Get Started
            </Button>
          </Box>

          {/* Right Illustration */}
          <Box
            sx={{
              position: "absolute",
              right: -100,
              top: "50%",
              transform: "translateY(-50%)",
              width: "800px",
              height: "800px",
              display: { xs: "none", md: "block" },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              {/* Background Circle */}
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "600px",
                  height: "600px",
                  borderRadius: "50%",
                  background: "rgba(255, 107, 74, 0.1)",
                }}
              />

              {/* Robot Icon */}
              <Box
                sx={{
                  position: "absolute",
                  right: 100,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "400px",
                  height: "400px",
                  "& svg": {
                    width: "100%",
                    height: "100%",
                  },
                }}
              >
                <svg
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simple Robot Face */}
                  <rect
                    x="40"
                    y="40"
                    width="120"
                    height="120"
                    rx="20"
                    fill="#ff6b4a"
                  />
                  <circle cx="70" cy="80" r="15" fill="white" />
                  <circle cx="130" cy="80" r="15" fill="white" />
                  <rect
                    x="60"
                    y="110"
                    width="80"
                    height="10"
                    rx="5"
                    fill="white"
                  />
                </svg>
              </Box>

              {/* Floating Elements */}
              <Box
                sx={{
                  position: "absolute",
                  right: 50,
                  top: 100,
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#ff6b4a",
                  borderRadius: "12px",
                  transform: "rotate(15deg)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: 400,
                  top: 200,
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#ff6b4a",
                  borderRadius: "50%",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: 200,
                  bottom: 100,
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#ff6b4a",
                  transform: "rotate(45deg)",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
