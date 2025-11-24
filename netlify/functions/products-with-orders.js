import { neon } from "@neondatabase/serverless";

export const handler = async () => {
  try {
    const sql = neon(process.env.DATABASE_URL);

    // LEFT JOIN orders + products để lấy thông tin sản phẩm của mỗi đơn hàng
    const result = await sql.query(`
      SELECT
        o.order_id,
        o.order_date,
        o.quantity,
        o.total_price,
        p.product_id,
        p.product_name,
        p.category,
        p.price AS product_price
      FROM orders o
      LEFT JOIN products p ON o.product_id = p.product_id
      ORDER BY o.order_id;
    `);

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
