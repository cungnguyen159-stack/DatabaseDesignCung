import { neon } from "@neondatabase/serverless";

export const handler = async (event) => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const body = JSON.parse(event.body);

    const { full_name, phone, address } = body;

    const result = await sql.query(
      `INSERT INTO customers (full_name, phone, address)
       VALUES ($1, $2, $3) RETURNING *`,
      [full_name, phone, address]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, customer: result[0] }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
