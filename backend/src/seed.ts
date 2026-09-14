import 'dotenv/config'
import pg from 'pg'
import { applySeed, getDbConfig } from './init-db.js'

const { Pool } = pg

const pool = new Pool(getDbConfig())

try {
  await applySeed(pool)
  console.log('Seed aplicada: usuario jefe inicial listo (si no existía).')
} finally {
  await pool.end()
}
