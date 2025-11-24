import { neon } from "@neondatabase/serverless";

export const handler = async (event) => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const { customer_id } = event.queryStringParameters;

    await sql.query(`DELETE FROM customers WHERE customer_id=$1`, [customer_id]);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, deleted_id: customer_id }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
  }
};
