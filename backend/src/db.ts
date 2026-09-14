import pg from 'pg'
import { applySchema, ensureDatabaseExists, getDbConfig } from './init-db.js'

const { Pool } = pg

export let pool!: pg.Pool

export async function initializeDatabase(): Promise<void> {
  const config = getDbConfig()
  await ensureDatabaseExists(config)
  pool = new Pool(config)
  await applySchema(pool)
}

export async function checkDatabase(): Promise<boolean> {
  try {
    if (!pool) return false
    await pool.query('SELECT 1')
    return true
  } catch {
    return false
  }
}
