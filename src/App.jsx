import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ResumeScreening from "./pages/ResumeScreening";
import CandidateMatching from "./pages/CandidateMatching";
import InterviewScheduling from "./pages/InterviewScheduling";
import Chatbot from "./pages/Chatbot";
import Analytics from "./pages/Analytics";
import Jobs from "./pages/Jobs";
import CandidateEvaluation from "./pages/CandidateEvaluation";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFD700", // Light yellow
      light: "#FFF4B3",
      dark: "#CCAA00",
    },
    secondary: {
      main: "#FFA726", // Orange
      light: "#FFD95B",
      dark: "#C77800",
    },
    background: {
      default: "#FFF9E6", // Very light yellow
      paper: "#FFFFFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            background: "linear-gradient(135deg, #FFF9E6 0%, #FFFFFF 100%)",
          }}
        >
          <Navbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              animation: "fadeIn 0.5s ease-in-out",
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/resume-screening" element={<ResumeScreening />} />
              <Route
                path="/candidate-matching"
                element={<CandidateMatching />}
              />
              <Route
                path="/interview-scheduling"
                element={<InterviewScheduling />}
              />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/login" element={<ResumeScreening />} />
              <Route path="/evaluate" element={<CandidateEvaluation />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
