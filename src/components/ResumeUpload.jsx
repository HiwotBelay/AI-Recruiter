import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Description as FileIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";

const API_BASE_URL = "http://localhost:5000/api";

const ResumeUpload = ({ candidateId }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Check file type
      const fileType = selectedFile.type;
      if (
        ![
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(fileType)
      ) {
        setError("Please upload a PDF or DOC file");
        return;
      }
      // Check file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("candidateId", candidateId);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(`${API_BASE_URL}/resumes/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Upload failed");
      }

      const data = await response.json();
      setSuccess("Resume uploaded successfully!");
      setUploadedFile(data.file);
      setFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Error uploading resume");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!candidateId) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(`${API_BASE_URL}/resumes/${candidateId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Delete failed");
      }

      setUploadedFile(null);
      setSuccess("Resume deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Error deleting resume");
    }
  };

  const handleDownload = async () => {
    if (!candidateId) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `${API_BASE_URL}/resumes/download/${candidateId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = uploadedFile?.filename || "resume";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download error:", err);
      setError(err.message || "Error downloading resume");
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 2 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Resume Upload
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Supported formats: PDF, DOC, DOCX (Max size: 5MB)
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadIcon />}
          disabled={loading}
        >
          Select Resume
          <input
            type="file"
            hidden
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
          />
        </Button>

        {file && (
          <List>
            <ListItem>
              <ListItemIcon>
                <FileIcon />
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
              />
            </ListItem>
          </List>
        )}

        {uploadedFile && (
          <List>
            <ListItem>
              <ListItemIcon>
                <FileIcon />
              </ListItemIcon>
              <ListItemText
                primary={uploadedFile.filename}
                secondary={`${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB`}
              />
              <IconButton onClick={handleDownload} title="Download">
                <DownloadIcon />
              </IconButton>
              <IconButton onClick={handleDelete} title="Delete">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          </List>
        )}

        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!file || loading}
          startIcon={loading ? <CircularProgress size={20} /> : <UploadIcon />}
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </Button>
      </Box>
    </Paper>
  );
};

export default ResumeUpload;
