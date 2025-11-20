import { neon } from "@neondatabase/serverless";

export const handler = async (event, context) => {
  try {
    const sql = neon(process.env.DATABASE_URL);

    const { category, sortBy, order } = event.queryStringParameters || {};

    if (!category) {
      return { statusCode: 400, body: JSON.stringify({ error: "category required" }) };
    }

    const validSorts = ["product_name", "price", "category"];
    const validOrders = ["ASC", "DESC"];

    const sortColumn = validSorts.includes(sortBy) ? sortBy : "price";
    const sortOrder = validOrders.includes(order?.toUpperCase()) ? order.toUpperCase() : "DESC";

    const result = await sql.query(
      `SELECT * FROM products WHERE category = $1 ORDER BY ${sortColumn} ${sortOrder}`,
      [category]
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
