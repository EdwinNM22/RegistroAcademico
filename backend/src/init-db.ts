import { readFile } from 'node:fs/promises'
import path from 'node:path'
import pg from 'pg'

const { Client } = pg

export type DbConfig = {
  host: string
  port: number
  database: string
  user: string
  password: string
}

export function getDbConfig(): DbConfig {
  return {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME ?? 'registro_academico',
    user: process.env.DB_USER ?? 'registro',
    password: process.env.DB_PASSWORD ?? 'registro',
  }
}

function assertSafeDatabaseName(name: string): string {
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
    throw new Error(`Nombre de base de datos inválido: ${name}`)
  }
  return name
}

export async function ensureDatabaseExists(config: DbConfig): Promise<void> {
  const dbName = assertSafeDatabaseName(config.database)

  const admin = new Client({
    host: config.host,
    port: config.port,
    database: 'postgres',
    user: config.user,
    password: config.password,
  })

  await admin.connect()

  try {
    const { rows } = await admin.query<{ exists: number }>(
      'SELECT 1 AS exists FROM pg_database WHERE datname = $1',
      [dbName],
    )

    if (rows.length === 0) {
      // template0 evita fallos si template1 tiene collation desactualizada tras actualizar el SO.
      await admin.query(
        `CREATE DATABASE ${dbName} WITH TEMPLATE template0 ENCODING 'UTF8'`,
      )
    }
  } finally {
    await admin.end()
  }
}

export async function applySchema(pool: pg.Pool): Promise<void> {
  const schemaPath = path.join(process.cwd(), 'sql', 'schema.sql')
  const sql = await readFile(schemaPath, 'utf8')
  await pool.query(sql)
}

export async function applySeed(pool: pg.Pool): Promise<void> {
  const seedPath = path.join(process.cwd(), 'sql', 'seed_jefe.sql')
  const sql = await readFile(seedPath, 'utf8')
  await pool.query(sql)
}
