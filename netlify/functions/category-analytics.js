import { neon } from "@neondatabase/serverless";

export const handler = async (event, context) => {
  try {
    const sql = neon(process.env.DATABASE_URL);

    const result = await sql.query(`
      SELECT
        COUNT(*) AS total_orders,
        SUM(total_price) AS total_revenue,
        AVG(total_price) AS avg_order_value,
        COUNT(DISTINCT customer_id) AS total_customers
      FROM orders
    `);

    return {
      statusCode: 200,
      body: JSON.stringify(result[0])
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
