const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

// Public routes
router.get("/", jobController.getAllJobs);
router.get("/:id", jobController.getJobById);

// Protected routes (require authentication)
router.post("/:jobId/apply", verifyToken, jobController.applyForJob);
router.get(
  "/user/applications",
  verifyToken,
  jobController.getUserApplications
);

// Admin routes
router.post("/", verifyToken, isAdmin, jobController.createJob);
router.post("/generate", verifyToken, isAdmin, jobController.generateJobs);
router.put("/:id", verifyToken, isAdmin, jobController.updateJob);
router.delete("/:id", verifyToken, isAdmin, jobController.deleteJob);

module.exports = router;
