const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sequelize = require("sequelize");

exports.register = async (req, res) => {
  try {
    const { username, email, password, role = "recruiter" } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({
      where: {
        [sequelize.Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or username already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: process.env.JWT_EXPIRE || "24h" }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Error registering user",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: process.env.JWT_EXPIRE || "24h" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, username, email, role, created_at FROM users WHERE id = ?",
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).send({
        message: "User not found!",
      });
    }

    res.status(200).send(users[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error retrieving user profile",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Check if email is already taken
    if (email) {
      const [existingUsers] = await db.query(
        "SELECT * FROM users WHERE email = ? AND id != ?",
        [email, req.user.id]
      );

      if (existingUsers.length > 0) {
        return res.status(400).send({
          message: "Email already taken!",
        });
      }
    }

    // Update user
    await db.query("UPDATE users SET username = ?, email = ? WHERE id = ?", [
      username,
      email,
      req.user.id,
    ]);

    res.status(200).send({
      message: "Profile updated successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error updating profile",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Find user
    const [users] = await db.query("SELECT * FROM users WHERE id = ?", [
      req.user.id,
    ]);

    const user = users[0];

    // Verify current password
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).send({
        message: "Current password is incorrect!",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      req.user.id,
    ]);

    res.status(200).send({
      message: "Password changed successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error changing password",
    });
  }
};
