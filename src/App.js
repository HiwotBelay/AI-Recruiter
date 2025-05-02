import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ResumeScreening from "./pages/ResumeScreening";
import CandidateMatching from "./pages/CandidateMatching";
import InterviewScheduling from "./pages/InterviewScheduling";
import Chatbot from "./pages/Chatbot";
import Analytics from "./pages/Analytics";
import Jobs from "./pages/Jobs";
import JobApplication from "./pages/JobApplication";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6b4a",
      light: "#ff9d7f",
      dark: "#c53d1b",
    },
    secondary: {
      main: "#4a4d3d",
      light: "#76795c",
      dark: "#222521",
    },
    background: {
      default: "#fff9f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#2d2d2d",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#2d2d2d",
          boxShadow: "none",
          borderBottom: "1px solid #eaeaea",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #eaeaea",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        },
      },
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/resume-screening" />;
  }
  return children;
};

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
            bgcolor: "background.default",
          }}
        >
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/resume-screening" element={<ResumeScreening />} />
              <Route
                path="/candidate-matching"
                element={
                  <ProtectedRoute>
                    <CandidateMatching />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/interview-scheduling"
                element={
                  <ProtectedRoute>
                    <InterviewScheduling />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chatbot"
                element={
                  <ProtectedRoute>
                    <Chatbot />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/job-application" element={<JobApplication />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
