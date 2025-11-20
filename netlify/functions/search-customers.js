import { neon } from "@neondatabase/serverless";

export const handler = async (event, context) => {
  try {
    const sql = neon(process.env.DATABASE_URL);

    const { q } = event.queryStringParameters || {};

    if (!q) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Search query required" })
      };
    }

    // Tạo pattern cho LIKE
    const pattern = `%${q}%`;

    // Query tìm kiếm full_name hoặc phone
    const result = await sql.query(
      `SELECT * FROM customers 
       WHERE full_name ILIKE $1 OR phone ILIKE $1 
       ORDER BY full_name`,
      [pattern]
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
