import { neon } from '@neondatabase/serverless';

export default async (req) => {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || "";

    const sql = neon(process.env.DATABASE_URL);

    const result = await sql`
      SELECT * FROM movies
      WHERE LOWER(title) LIKE ${"%" + q.toLowerCase() + "%"}
         OR LOWER(genre) LIKE ${"%" + q.toLowerCase() + "%"}
    `;

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
