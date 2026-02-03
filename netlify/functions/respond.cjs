const { Client } = require("pg");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  const { name, inviteType, accepted } = body;

  if (!name || !inviteType || typeof accepted !== "boolean") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Body must be { name, inviteType, accepted: true|false }",
      }),
    };
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    await client.query(
      `
      UPDATE invitees
      SET accepted = $3,
          accepted_at = CASE WHEN $3 = true THEN now() ELSE accepted_at END
      WHERE name = $1
        AND invite_type = $2
      `,
      [name, inviteType, accepted]
    );

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(err) }),
    };
  } finally {
    try {
      await client.end();
    } catch {}
  }
};
