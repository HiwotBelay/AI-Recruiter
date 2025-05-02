const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resume.controller");
const upload = require("../middleware/upload.middleware");
const { verifyToken } = require("../middleware/auth.middleware");

// Route for uploading and evaluating a resume
router.post(
  "/upload/:jobId",
  verifyToken,
  upload.single("resume"),
  resumeController.uploadAndEvaluate
);

// Route for getting resume evaluation results
router.get(
  "/evaluation/:candidateId/:jobId",
  verifyToken,
  resumeController.getEvaluation
);

// Route for downloading a resume
router.get(
  "/download/:candidateId",
  verifyToken,
  resumeController.downloadResume
);

// Route for deleting a resume and its evaluation
router.delete("/:candidateId", verifyToken, resumeController.deleteResume);

module.exports = router;
