import 'dotenv/config'
import pg from 'pg'
import { applySeed, getDbConfig } from './init-db.js'

const { Pool } = pg

const pool = new Pool(getDbConfig())

try {
  await applySeed(pool)
  console.log('Seed aplicada: usuarios de desarrollo listos (si no existían).')
} finally {
  await pool.end()
}
