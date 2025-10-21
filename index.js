const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = 3000;

// PostgreSQL pool setup (Neon)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Needed for Neon SSL
  },
});

// Example route: GET /sales
app.get("/sales", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM sales_data_cleaned LIMIT 100",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error querying DB:", err);
    res.status(500).send("Database error");
  }
});

app.listen(port, () => {
  console.log(`✅ API server running at http://localhost:${port}`);
});
