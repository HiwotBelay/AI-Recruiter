const fs = require("fs");
const path = require("path");
const db = require("../config/db.config");
const resumeEvaluation = require("../services/resumeEvaluation.service");

exports.uploadAndEvaluate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        message: "Please upload a resume file!",
      });
    }

    const { candidateId, jobId } = req.body;

    // Get job requirements
    const [jobs] = await db.query("SELECT * FROM jobs WHERE id = ?", [jobId]);

    if (jobs.length === 0) {
      return res.status(404).send({
        message: "Job not found!",
      });
    }

    const jobRequirements = jobs[0];

    // Extract text from resume
    const resumeText = await resumeEvaluation.extractTextFromFile(
      req.file.path
    );

    // Extract skills and keywords
    const resumeKeywords = await resumeEvaluation.extractSkillsAndKeywords(
      resumeText
    );

    // Evaluate resume against job requirements
    const evaluation = await resumeEvaluation.evaluateResume(
      resumeText,
      JSON.stringify(jobRequirements)
    );

    // Calculate match score
    const matchScore = resumeEvaluation.calculateMatchScore(resumeKeywords, {
      requiredSkills: jobRequirements.required_skills.split(","),
      requiredExperience: jobRequirements.min_experience,
      requiredEducation: jobRequirements.min_education,
    });

    // Save file information and evaluation to database
    const [result] = await db.query(
      `INSERT INTO resume_evaluations 
       (candidate_id, job_id, resume_url, evaluation_result, match_score, keywords) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        candidateId,
        jobId,
        req.file.filename,
        JSON.stringify(evaluation),
        matchScore.overall,
        JSON.stringify(resumeKeywords),
      ]
    );

    // Update candidate status
    await db.query(
      "UPDATE candidates SET resume_url = ?, status = ? WHERE id = ?",
      [req.file.filename, "Evaluated", candidateId]
    );

    res.status(200).send({
      message: "Resume uploaded and evaluated successfully!",
      evaluationId: result.insertId,
      evaluation: evaluation,
      matchScore: matchScore,
      keywords: resumeKeywords,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error processing resume",
    });
  }
};

exports.getEvaluation = async (req, res) => {
  try {
    const { candidateId, jobId } = req.params;

    const [evaluations] = await db.query(
      `SELECT * FROM resume_evaluations 
       WHERE candidate_id = ? AND job_id = ?
       ORDER BY created_at DESC LIMIT 1`,
      [candidateId, jobId]
    );

    if (evaluations.length === 0) {
      return res.status(404).send({
        message: "Evaluation not found!",
      });
    }

    const evaluation = evaluations[0];
    evaluation.evaluation_result = JSON.parse(evaluation.evaluation_result);
    evaluation.keywords = JSON.parse(evaluation.keywords);

    res.status(200).send(evaluation);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error retrieving evaluation",
    });
  }
};

exports.downloadResume = async (req, res) => {
  try {
    const { candidateId } = req.params;

    const [candidates] = await db.query(
      "SELECT resume_url FROM candidates WHERE id = ?",
      [candidateId]
    );

    if (candidates.length === 0 || !candidates[0].resume_url) {
      return res.status(404).send({
        message: "Resume not found!",
      });
    }

    const resumeUrl = candidates[0].resume_url;
    const filePath = path.join(__dirname, "../uploads/resumes", resumeUrl);

    if (!fs.existsSync(filePath)) {
      return res.status(404).send({
        message: "Resume file not found!",
      });
    }

    res.download(filePath, resumeUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error downloading resume",
    });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const { candidateId } = req.params;

    const [candidates] = await db.query(
      "SELECT resume_url FROM candidates WHERE id = ?",
      [candidateId]
    );

    if (candidates.length === 0 || !candidates[0].resume_url) {
      return res.status(404).send({
        message: "Resume not found!",
      });
    }

    const resumeUrl = candidates[0].resume_url;
    const filePath = path.join(__dirname, "../uploads/resumes", resumeUrl);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete evaluation records
    await db.query("DELETE FROM resume_evaluations WHERE candidate_id = ?", [
      candidateId,
    ]);

    // Update candidate
    await db.query(
      "UPDATE candidates SET resume_url = NULL, status = ? WHERE id = ?",
      ["Pending", candidateId]
    );

    res.status(200).send({
      message: "Resume and evaluations deleted successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error deleting resume",
    });
  }
};
