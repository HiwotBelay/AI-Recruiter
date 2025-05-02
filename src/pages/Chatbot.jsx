import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Avatar,
  Button,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  ListItemAvatar,
  Chip,
  CircularProgress,
  Fade,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Send as SendIcon,
  Add as AddIcon,
  History as HistoryIcon,
  Search as SearchIcon,
  AttachFile as AttachFileIcon,
  InsertEmoticon as EmoticonIcon,
  Menu as MenuIcon,
  NotificationsNone as NotificationIcon,
  Delete as DeleteIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  RestartAlt as RestartIcon,
  Save as SaveIcon,
  CloudUpload as CloudUploadIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon,
  Description as FileIcon,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";

// Mock user profile data (in a real app, this would come from your auth system)
const USER_PROFILE = {
  id: "12345",
  name: "John Smith",
  email: "john.smith@example.com",
  role: "Job Seeker",
  avatar: "JS",
  appliedJobs: 4,
  matchingScore: 85,
  skills: ["React", "Node.js", "Python", "AWS"],
  experience: "5 years",
  preferredRole: "Senior Full Stack Developer",
};

// Predefined responses for different contexts
const RESPONSE_TEMPLATES = {
  JOB_SEARCH: {
    keywords: ["job", "work", "position", "career", "opportunity"],
    responses: [
      {
        text: "I can help you find the perfect job! What type of position are you looking for?",
        suggestions: ["Full-time", "Part-time", "Remote", "Entry-level"],
      },
      {
        text: "Let me help you with your job search. What industry interests you?",
        suggestions: ["Technology", "Healthcare", "Finance", "Education"],
      },
    ],
  },
  RESUME_HELP: {
    keywords: ["resume", "cv", "experience", "skills"],
    responses: [
      {
        text: "I can help you improve your resume. Would you like to:",
        suggestions: [
          "Upload resume for review",
          "Get resume tips",
          "See resume templates",
        ],
      },
      {
        text: "Let's work on making your resume stand out. What specific aspect would you like help with?",
        suggestions: [
          "Format review",
          "Content optimization",
          "Skills section",
          "Work experience",
        ],
      },
    ],
  },
  INTERVIEW_PREP: {
    keywords: ["interview", "prepare", "questions", "practice"],
    responses: [
      {
        text: "I'll help you prepare for your interviews. What type would you like to practice?",
        suggestions: [
          "Technical interview",
          "Behavioral questions",
          "HR round",
          "Mock interview",
        ],
      },
      {
        text: "Interview preparation is crucial. Let's focus on:",
        suggestions: [
          "Common questions",
          "STAR method",
          "Body language",
          "Follow-up questions",
        ],
      },
    ],
  },
  APPLICATION_SUBMITTED: {
    keywords: ["applied", "submit", "application", "status"],
    responses: [
      {
        text: "Great! Your application has been submitted. Here's what you can do next:",
        suggestions: [
          "Track application",
          "Prepare for interview",
          "Browse more jobs",
          "Get tips",
        ],
      },
      {
        text: "Application received! While you wait, would you like to:",
        suggestions: [
          "Research company",
          "Practice interviews",
          "Update profile",
          "See similar jobs",
        ],
      },
    ],
  },
  FALLBACK: {
    responses: [
      {
        text: "I'm here to help with your career journey. What would you like to explore?",
        suggestions: [
          "Job search",
          "Resume help",
          "Interview prep",
          "Career advice",
        ],
      },
      {
        text: "I'm your AI recruitment assistant. How can I assist you today?",
        suggestions: [
          "Find jobs",
          "Review resume",
          "Practice interviews",
          "Get career tips",
        ],
      },
    ],
  },
};

const Chatbot = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! I can help you with job applications, CV uploads, and interview scheduling. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [chatHistory, setChatHistory] = useState([]);
  const [currentContext, setCurrentContext] = useState("general");
  const [errorCount, setErrorCount] = useState(0);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const responseTimeoutRef = useRef(null);
  const [userProfile] = useState(USER_PROFILE);

  // Update the interviews state with more detailed information
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      jobTitle: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      date: "2024-03-25",
      time: "14:00",
      type: "Technical Interview",
      link: "https://meet.google.com/abc-defg-hij",
      interviewer: "Sarah Johnson",
      matchingScore: 92,
      candidateName: USER_PROFILE.name,
      preparationTips: [
        "Review full stack architecture",
        "Prepare system design examples",
        "Practice coding problems",
        "Research company products",
      ],
    },
  ]);

  useEffect(() => {
    if (location.state?.context === "application_submitted") {
      const jobId = location.state.jobId;
      addMessage(
        "bot",
        "I see you've just applied for a position! I can help you upload your CV/resume and keep track of your interview schedule."
      );
    }
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponseContext = (userMessage) => {
    const messageLower = userMessage.toLowerCase();

    for (const [context, data] of Object.entries(RESPONSE_TEMPLATES)) {
      if (data.keywords?.some((keyword) => messageLower.includes(keyword))) {
        return context;
      }
    }
    return "FALLBACK";
  };

  const generateBotResponse = async (userMessage, context = currentContext) => {
    setIsTyping(true);
    setErrorCount(0); // Reset error count on new message

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const responseContext = getResponseContext(userMessage);
      const templates =
        RESPONSE_TEMPLATES[responseContext] || RESPONSE_TEMPLATES.FALLBACK;
      const response =
        templates.responses[
          Math.floor(Math.random() * templates.responses.length)
        ];

      // Add context-specific handling
      if (context === "application_submitted") {
        response.text = `${response.text}\n\nRegarding your recent application, I can help you:`;
        response.suggestions = [
          "Prepare for interviews",
          "Track application status",
          "View similar jobs",
          "Get company insights",
        ];
      }

      setCurrentContext(responseContext.toLowerCase());
      setIsTyping(false);

      return {
        id: messages.length + 2,
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        suggestions: response.suggestions,
      };
    } catch (error) {
      console.error("Error generating response:", error);
      setErrorCount((prev) => prev + 1);

      // Provide fallback response after multiple errors
      if (errorCount >= 2) {
        return {
          id: messages.length + 2,
          text: "I apologize for the technical difficulty. Let's try a different approach. What specific help do you need?",
          sender: "bot",
          timestamp: new Date(),
          suggestions: ["Start over", "Try different topic", "Contact support"],
        };
      }

      return {
        id: messages.length + 2,
        text: "I'm having trouble understanding. Could you please rephrase your question?",
        sender: "bot",
        timestamp: new Date(),
        suggestions: RESPONSE_TEMPLATES.FALLBACK.responses[0].suggestions,
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    addMessage("user", input);
    setInput("");
    setIsTyping(true);

    // Simulate bot processing
    setTimeout(() => {
      processUserInput(input.toLowerCase());
      setIsTyping(false);
    }, 1000);
  };

  const addMessage = (type, content) => {
    setMessages((prev) => [
      ...prev,
      {
        type,
        content,
        timestamp: new Date(),
      },
    ]);
  };

  const processUserInput = (input) => {
    if (
      input.includes("upload") ||
      input.includes("cv") ||
      input.includes("resume")
    ) {
      addMessage(
        "bot",
        `Hi ${userProfile.name}, would you like to upload your CV or resume? Click the attachment icon below or drag and drop your file here.`
      );
    } else if (input.includes("interview") || input.includes("schedule")) {
      showInterviewSchedule();
    } else if (input.includes("match") || input.includes("profile")) {
      showCandidateMatch();
    } else if (input.includes("help") || input.includes("assist")) {
      addMessage(
        "bot",
        `Hello ${userProfile.name}, I can help you with:\n1. Uploading your CV/resume\n2. Checking your interview schedule\n3. Viewing your candidate matching score\n4. Application status\n\nWhat would you like to know?`
      );
    } else {
      addMessage(
        "bot",
        `${userProfile.name}, I'm here to help with your job application process. You can ask me about:\n- Uploading CV/resume\n- Interview schedules\n- Candidate matching\n- Application status`
      );
    }
  };

  const showCandidateMatch = () => {
    const matchMessage =
      `👤 Candidate Profile: ${userProfile.name}\n` +
      `Role: ${userProfile.preferredRole}\n` +
      `Experience: ${userProfile.experience}\n` +
      `Matching Score: ${userProfile.matchingScore}%\n\n` +
      `🎯 Key Skills:\n${userProfile.skills.join(", ")}\n\n` +
      `📊 Application Status:\n` +
      `- Applied Jobs: ${userProfile.appliedJobs}\n` +
      `- Active Interviews: ${interviews.length}\n` +
      `- Profile Completion: 95%`;

    addMessage("bot", matchMessage);
  };

  const showInterviewSchedule = () => {
    if (interviews.length === 0) {
      addMessage(
        "bot",
        `${userProfile.name}, you don't have any interviews scheduled yet. I'll notify you as soon as one is scheduled!`
      );
      return;
    }

    const interviewMessages = interviews
      .map(
        (interview) =>
          `📅 Interview Details for ${userProfile.name}:\n` +
          `Position: ${interview.jobTitle}\n` +
          `Company: ${interview.company}\n` +
          `Date: ${new Date(interview.date).toLocaleDateString()}\n` +
          `Time: ${interview.time}\n` +
          `Type: ${interview.type}\n` +
          `Interviewer: ${interview.interviewer}\n` +
          `Matching Score: ${interview.matchingScore}%\n` +
          `Meeting Link: ${interview.link}\n\n` +
          `🎯 Preparation Tips:\n${interview.preparationTips
            .map((tip) => `• ${tip}`)
            .join("\n")}`
      )
      .join("\n\n");

    addMessage("bot", interviewMessages);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadType(file.name.toLowerCase().includes("cv") ? "CV" : "Resume");
      setUploadDialogOpen(true);
    }
  };

  const handleUploadConfirm = () => {
    // Simulate file upload
    addMessage(
      "bot",
      `Thank you for uploading your ${uploadType}. I'll process it and update your profile.`
    );
    setSnackbar({
      open: true,
      message: `${uploadType} uploaded successfully!`,
      severity: "success",
    });
    setUploadDialogOpen(false);
    setSelectedFile(null);

    // Simulate processing delay and feedback
    setTimeout(() => {
      addMessage(
        "bot",
        "I've analyzed your document and updated your profile. Your application is now complete. I'll notify you when an interview is scheduled."
      );
    }, 2000);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sidebarItems = [
    { icon: <AddIcon />, text: "New Chat" },
    { icon: <HistoryIcon />, text: "Recent Chats" },
    { text: "Find Applicants that ..." },
    { text: "Separate the Google Ap..." },
    { text: "Schedule Applicants ..." },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#FFFBEB" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            bgcolor: "#FFFDF7",
            border: "none",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <IconButton sx={{ mb: 2 }}>
            <MenuIcon />
          </IconButton>

          <List>
            {sidebarItems.map((item, index) => (
              <ListItem
                key={index}
                button
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: index === 0 ? "transparent" : "transparent",
                  "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
                }}
              >
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.9rem",
                      fontWeight: index < 2 ? 500 : 400,
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* User Profile Section */}
        <Box
          sx={{
            mt: "auto",
            p: 2,
            bgcolor: "#FFE4B5",
            color: "#333",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar sx={{ bgcolor: "#FFA500" }}>{userProfile.avatar}</Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 500, color: "#333" }}
            >
              {userProfile.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              {userProfile.role}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Chip
              size="small"
              label={`Match: ${userProfile.matchingScore}%`}
              color="primary"
              sx={{ mb: 0.5 }}
            />
            <Typography variant="caption" color="text.secondary">
              {userProfile.appliedJobs} Applications
            </Typography>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "#333" }}>
            AI Recruitment Assistant
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Start new chat">
              <IconButton
                onClick={() => {
                  setMessages([
                    {
                      type: "bot",
                      content:
                        "Hello! I can help you with job applications, CV uploads, and interview scheduling. How can I assist you today?",
                      timestamp: new Date(),
                    },
                  ]);
                  setCurrentContext("general");
                  setSelectedFile(null);
                }}
              >
                <RestartIcon />
              </IconButton>
            </Tooltip>
            <IconButton>
              <NotificationIcon />
            </IconButton>
            <TextField
              size="small"
              placeholder="Search messages..."
              sx={{
                width: 200,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
                  bgcolor: "white",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Messages Container */}
        <Box sx={{ flexGrow: 1, overflow: "auto", mb: 2 }}>
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: message.type === "user" ? "flex-end" : "flex-start",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  maxWidth: "70%",
                }}
              >
                <ListItemAvatar sx={{ minWidth: 40 }}>
                  <Avatar
                    sx={{
                      bgcolor:
                        message.type === "bot"
                          ? "primary.main"
                          : "secondary.main",
                    }}
                  >
                    {message.type === "bot" ? <BotIcon /> : <PersonIcon />}
                  </Avatar>
                </ListItemAvatar>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor:
                      message.type === "user"
                        ? "primary.light"
                        : "background.paper",
                    color: message.type === "user" ? "white" : "text.primary",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                    {message.content}
                  </Typography>
                  {message.type === "user" && (
                    <Avatar
                      sx={{
                        ml: 1,
                        bgcolor: "#666",
                        width: 32,
                        height: 32,
                      }}
                    >
                      U
                    </Avatar>
                  )}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <Box
                      sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}
                    >
                      {message.suggestions.map((suggestion, index) => (
                        <Chip
                          key={index}
                          label={suggestion}
                          onClick={() => {
                            setInput(suggestion);
                            handleSend();
                          }}
                          sx={{
                            bgcolor: "#FFE4B5",
                            "&:hover": {
                              bgcolor: "#FFD700",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Paper>
                {message.type === "user" && (
                  <Avatar
                    sx={{
                      ml: 1,
                      bgcolor: "#666",
                      width: 32,
                      height: 32,
                    }}
                  >
                    U
                  </Avatar>
                )}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  color: "#666",
                  alignSelf:
                    message.type === "user" ? "flex-end" : "flex-start",
                  ml: message.type === "bot" ? 5 : 0,
                  mr: message.type === "user" ? 5 : 0,
                }}
              >
                {formatTime(message.timestamp)}
              </Typography>
            </Box>
          ))}
          {isTyping && (
            <Box sx={{ display: "flex", alignItems: "center", ml: 5 }}>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              <Typography variant="body2" color="textSecondary">
                AI is typing...
              </Typography>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Message Input */}
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            bgcolor: "#FFFDF7",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Tooltip title="Upload file">
              <IconButton
                size="small"
                onClick={() => fileInputRef.current.click()}
              >
                <AttachFileIcon />
              </IconButton>
            </Tooltip>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx"
            />
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{ mx: 1 }}
            />
            <Tooltip title="Send message">
              <IconButton
                onClick={handleSend}
                disabled={!input.trim() && !selectedFile}
                sx={{
                  bgcolor:
                    input.trim() || selectedFile ? "#007AFF" : "transparent",
                  color: input.trim() || selectedFile ? "white" : "inherit",
                  "&:hover": {
                    bgcolor:
                      input.trim() || selectedFile
                        ? "#0056b3"
                        : "rgba(0,0,0,0.04)",
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
          {selectedFile && (
            <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
              <Chip
                icon={<AttachFileIcon />}
                label={selectedFile.name}
                onDelete={() => setSelectedFile(null)}
                variant="outlined"
                size="small"
              />
            </Box>
          )}
        </Paper>
      </Box>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
      >
        <DialogTitle>Upload {uploadType}</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: "center", py: 2 }}>
            <FileIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="body1" gutterBottom>
              Selected file: {selectedFile?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              File size: {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={handleUploadConfirm}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Chatbot;
