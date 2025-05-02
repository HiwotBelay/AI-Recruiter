const db = require("../config/db.config");

exports.createCandidate = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      currentPosition,
      yearsOfExperience,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !currentPosition ||
      !yearsOfExperience
    ) {
      return res.status(400).send({
        message: "All fields are required!",
      });
    }

    // Check if candidate with email already exists
    const [existingCandidates] = await db.query(
      "SELECT * FROM candidates WHERE email = ?",
      [email]
    );

    if (existingCandidates.length > 0) {
      return res.status(400).send({
        message: "A candidate with this email already exists!",
      });
    }

    // Create candidate
    const [result] = await db.query(
      `INSERT INTO candidates 
       (first_name, last_name, email, phone, current_position, years_of_experience, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        email,
        phone,
        currentPosition,
        yearsOfExperience,
        "New",
      ]
    );

    res.status(201).send({
      message: "Candidate created successfully!",
      id: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error creating candidate",
    });
  }
};

exports.getCandidates = async (req, res) => {
  try {
    const [candidates] = await db.query(
      "SELECT * FROM candidates ORDER BY created_at DESC"
    );

    res.status(200).send(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error retrieving candidates",
    });
  }
};

exports.getCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const [candidates] = await db.query(
      "SELECT * FROM candidates WHERE id = ?",
      [id]
    );

    if (candidates.length === 0) {
      return res.status(404).send({
        message: "Candidate not found!",
      });
    }

    res.status(200).send(candidates[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error retrieving candidate",
    });
  }
};

exports.updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phone,
      currentPosition,
      yearsOfExperience,
      status,
    } = req.body;

    // Check if candidate exists
    const [candidates] = await db.query(
      "SELECT * FROM candidates WHERE id = ?",
      [id]
    );

    if (candidates.length === 0) {
      return res.status(404).send({
        message: "Candidate not found!",
      });
    }

    // Update candidate
    await db.query(
      `UPDATE candidates 
       SET first_name = ?, last_name = ?, email = ?, phone = ?, 
           current_position = ?, years_of_experience = ?, status = ?
       WHERE id = ?`,
      [
        firstName,
        lastName,
        email,
        phone,
        currentPosition,
        yearsOfExperience,
        status,
        id,
      ]
    );

    res.status(200).send({
      message: "Candidate updated successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error updating candidate",
    });
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM candidates WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        message: "Candidate not found!",
      });
    }

    res.status(200).send({
      message: "Candidate deleted successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error deleting candidate",
    });
  }
};
