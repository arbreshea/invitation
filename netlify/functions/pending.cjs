const { Client } = require("pg");

exports.handler = async (event) => {
  const inviteType = event.queryStringParameters?.type;

  if (!inviteType) {
    return {
      statusCode: 400,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: "Missing query param: type" }),
    };
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    // Adjust table/column names if yours differ
    const result = await client.query(
      `
      SELECT name
      FROM invitees
      WHERE invite_type = $1
        AND (accepted IS NULL OR accepted = false)
      ORDER BY name ASC
      `,
      [inviteType]
    );

    const names = result.rows.map((r) => r.name);

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ names }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: String(err) }),
    };
  } finally {
    try {
      await client.end();
    } catch {}
  }
};
