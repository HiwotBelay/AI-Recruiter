const sequelize = require("./db.config");
const User = require("../models/User");

async function initializeDatabase() {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync all models
    await sequelize.sync({ force: true }); // Note: force:true will drop existing tables
    console.log("Database synchronized successfully");

    // Create a default admin user
    await User.create({
      username: "admin",
      email: "admin@example.com",
      password: "$2a$10$XK.fXxPW9M9VVzf3OKjYx.1XwjVE3tZNzJHGQ8vd9G3YzPVWvqKXi", // password: admin123
      role: "admin",
    });
    console.log("Default admin user created");
  } catch (error) {
    console.error("Unable to initialize database:", error);
  }
}

// Run the initialization
initializeDatabase();
