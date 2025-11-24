import { neon } from '@neondatabase/serverless';

export default async (req) => {
  try {
    if (req.method !== "DELETE")
      return new Response("Method Not Allowed", { status: 405 });

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id)
      return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });

    const sql = neon(process.env.DATABASE_URL);

    await sql`DELETE FROM movies WHERE movie_id = ${id}`;

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
