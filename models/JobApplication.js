const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./User");
const Job = require("./Job");

const JobApplication = sequelize.define("JobApplication", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Job,
      key: "id",
    },
  },
  status: {
    type: DataTypes.ENUM("pending", "reviewed", "accepted", "rejected"),
    defaultValue: "pending",
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  appliedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Define relationships
JobApplication.belongsTo(User);
JobApplication.belongsTo(Job);
User.hasMany(JobApplication);
Job.hasMany(JobApplication);

module.exports = JobApplication;
