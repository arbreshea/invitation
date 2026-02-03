import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pkg from 'pg'

dotenv.config()

const { Pool } = pkg

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false }, 
})

app.get('/health', async (_req, res) => {
	try {
		const r = await pool.query('SELECT 1 as ok')
		res.json({ ok: true, db: r.rows[0] })
	} catch (err) {
		res.status(500).json({ ok: false, error: String(err) })
	}
})

app.get('/invitees', async (req, res) => {
	const type = req.query.type 
	try {
		const { rows } = await pool.query(
			`SELECT name, invite_type, accepted
       FROM invitees
       WHERE ($1::text IS NULL OR invite_type = $1)
       ORDER BY invite_type, name`,
			[type ?? null],
		)
		res.json(rows)
	} catch (err) {
		res.status(500).json({ error: String(err) })
	}
})

app.get('/pending', async (req, res) => {
	const type = req.query.type
	if (!type) return res.status(400).json({ error: 'Missing ?type=' })

	try {
		const { rows } = await pool.query(
			`SELECT name
       FROM invitees
       WHERE invite_type = $1 AND accepted IS NULL
       ORDER BY name`,
			[type],
		)
		res.json(rows)
	} catch (err) {
		res.status(500).json({ error: String(err) })
	}
})

app.post('/respond', async (req, res) => {
	const { name, inviteType, accepted } = req.body

	if (!name || !inviteType || typeof accepted !== 'boolean') {
		return res.status(400).json({
			error: 'Body must be { name, inviteType, accepted: true|false }',
		})
	}

	try {
		await pool.query(
			`UPDATE invitees
       SET accepted = $3,
           accepted_at = CASE WHEN $3 = true THEN now() ELSE accepted_at END
       WHERE name = $1 AND invite_type = $2`,
			[name, inviteType, accepted],
		)

		res.json({ ok: true })
	} catch (err) {
		res.status(500).json({ error: String(err) })
	}
})

const PORT = 5050
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
