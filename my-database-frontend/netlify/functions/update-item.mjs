import { neon } from '@neondatabase/serverless';

export default async (req) => {
  try {
    if (req.method !== "PUT")
      return new Response("Method Not Allowed", { status: 405 });

    const body = await req.json();
    const { movie_id, title, director, release_year, available, genre, rating } = body;

    if (!movie_id)
      return new Response(JSON.stringify({ error: "movie_id required" }), { status: 400 });

    const sql = neon(process.env.DATABASE_URL);

    const result = await sql(
      `UPDATE movies
       SET title=$2, director=$3, release_year=$4, available=$5, genre=$6, rating=$7
       WHERE movie_id=$1 RETURNING *`,
      [movie_id, title, director, release_year, available, genre, rating]
    );

    return new Response(JSON.stringify(result[0] || {}), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
