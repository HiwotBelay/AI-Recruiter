const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidate.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// All routes are protected
router.use(verifyToken);

// Create a new candidate
router.post("/", candidateController.createCandidate);

// Get all candidates
router.get("/", candidateController.getCandidates);

// Get a single candidate
router.get("/:id", candidateController.getCandidate);

// Update a candidate
router.put("/:id", candidateController.updateCandidate);

// Delete a candidate
router.delete("/:id", candidateController.deleteCandidate);

module.exports = router;
