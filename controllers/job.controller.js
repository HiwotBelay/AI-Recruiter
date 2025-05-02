const Job = require("../models/Job");
const JobApplication = require("../models/JobApplication");
const { generateMultipleJobs } = require("../utils/jobGenerator");

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    console.error("Create job error:", error);
    res
      .status(500)
      .json({ message: "Error creating job", error: error.message });
  }
};

exports.generateJobs = async (req, res) => {
  try {
    const count = req.query.count ? parseInt(req.query.count) : 5;
    const jobs = generateMultipleJobs(count);
    const createdJobs = await Job.bulkCreate(jobs);
    res.status(201).json(createdJobs);
  } catch (error) {
    console.error("Generate jobs error:", error);
    res
      .status(500)
      .json({ message: "Error generating jobs", error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { status: "open" },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: JobApplication,
          attributes: ["id", "status", "appliedAt"],
        },
      ],
    });
    res.json(jobs);
  } catch (error) {
    console.error("Get jobs error:", error);
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [
        {
          model: JobApplication,
          attributes: ["id", "status", "appliedAt"],
        },
      ],
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    console.error("Get job error:", error);
    res
      .status(500)
      .json({ message: "Error fetching job", error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    await job.update(req.body);
    res.json(job);
  } catch (error) {
    console.error("Update job error:", error);
    res
      .status(500)
      .json({ message: "Error updating job", error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    await job.destroy();
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete job error:", error);
    res
      .status(500)
      .json({ message: "Error deleting job", error: error.message });
  }
};

exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id; // From auth middleware
    const { coverLetter } = req.body;

    // Check if job exists and is open
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if (job.status !== "open") {
      return res
        .status(400)
        .json({ message: "This position is no longer open" });
    }

    // Check if user has already applied
    const existingApplication = await JobApplication.findOne({
      where: { jobId, userId },
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this position" });
    }

    // Create application
    const application = await JobApplication.create({
      jobId,
      userId,
      coverLetter,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Job application error:", error);
    res
      .status(500)
      .json({ message: "Error submitting application", error: error.message });
  }
};

exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const applications = await JobApplication.findAll({
      where: { userId },
      include: [
        {
          model: Job,
          attributes: ["title", "department", "location", "status"],
        },
      ],
      order: [["appliedAt", "DESC"]],
    });
    res.json(applications);
  } catch (error) {
    console.error("Get applications error:", error);
    res
      .status(500)
      .json({ message: "Error fetching applications", error: error.message });
  }
};
