import { neon } from '@neondatabase/serverless';

export default async (req) => {
  try {
    if (req.method !== "POST")
      return new Response("Method Not Allowed", { status: 405 });

    const { title, director, release_year, available, genre, rating } = await req.json();

    if (!title || !director)
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });

    const sql = neon(process.env.DATABASE_URL);

    const result = await sql(
      `INSERT INTO movies (title, director, release_year, available, genre, rating)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, director, release_year, available, genre, rating]
    );

    return new Response(JSON.stringify(result[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
