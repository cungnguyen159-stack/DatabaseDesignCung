import { neon } from "@neondatabase/serverless";

export const handler = async (event) => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const { id } = event.queryStringParameters;

    await sql.query(`DELETE FROM customers WHERE customer_id=$1`, [id]);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, deleted_id: id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
