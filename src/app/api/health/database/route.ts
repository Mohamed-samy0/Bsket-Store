import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return Response.json(
      { status: "error", message: "DATABASE_URL is not configured" },
      { status: 500 },
    );
  }

  try {
    const sql = neon(databaseUrl);
    await sql`SELECT 1`;

    return Response.json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Neon Postgres health check failed:", error);

    return Response.json(
      { status: "error", database: "unavailable" },
      { status: 503 },
    );
  }
}
