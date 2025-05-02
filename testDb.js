const db = require("./config/db.config");

async function testConnection() {
  try {
    // Test basic connection
    const [result1] = await db.query("SELECT 1");
    console.log("Database connection successful!");
    console.log("Basic query result:", result1);

    // Show all tables
    const [tables] = await db.query("SHOW TABLES FROM quenerecruit_db");
    console.log("\nAvailable tables:");
    tables.forEach((table) => {
      console.log("-", Object.values(table)[0]);
    });

    process.exit(0);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

testConnection();
