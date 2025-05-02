const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Job = sequelize.define("Job", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobType: {
    type: DataTypes.ENUM("full-time", "part-time", "contract", "internship"),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  required_skills: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  min_experience: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  min_education: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary_range: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("open", "closed", "draft"),
    defaultValue: "open",
  },
});

module.exports = Job;
