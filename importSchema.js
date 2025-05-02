const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Create a connection to MySQL without password
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null, // Changed to null instead of empty string
});

// Read the schema file
const schemaPath = path.join(__dirname, "database", "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

// Split the schema into individual statements
const statements = schema
  .split(";")
  .map((statement) => statement.trim())
  .filter((statement) => statement.length > 0);

// Execute each statement
async function importSchema() {
  try {
    for (const statement of statements) {
      await new Promise((resolve, reject) => {
        connection.query(statement, (err) => {
          if (err) {
            console.error("Error executing statement:", err);
            reject(err);
          } else {
            console.log(
              "Successfully executed:",
              statement.substring(0, 50) + "..."
            );
            resolve();
          }
        });
      });
    }
    console.log("Schema imported successfully!");
  } catch (error) {
    console.error("Failed to import schema:", error);
  } finally {
    connection.end();
  }
}

importSchema();
