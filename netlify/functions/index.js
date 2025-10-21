const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

exports.handler = async function(event, context) {
  try {
    const result = await pool.query(
      "SELECT * FROM sales_data_cleaned LIMIT 100",
    );
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (err) {
    console.error("Error querying DB:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Database error" }),
    };
  }
};
