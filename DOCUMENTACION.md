# Registro Académico — Informe de avance

Documento de lo realizado en cada etapa. Sin instrucciones de instalación ni pasos a seguir.

---

## Stack

| Área | Tecnología |
|------|------------|
| Lenguaje | TypeScript |
| Frontend | React, Vite |
| Backend | Node.js, Fastify |
| Base de datos | PostgreSQL |
| Acceso a DB | `pg` (pool) |
| Config | `dotenv` (`.env`) |
| Control de versiones | Git |

---

## Etapa 1 — Entorno base

Se inicializó el repositorio Git y se dejó un `.gitignore` para dependencias, builds y variables de entorno.

Quedaron dos aplicaciones TypeScript independientes:

- **frontend:** Vite + React
- **backend:** Fastify con un endpoint `GET /health`

Ambos entornos de desarrollo quedaron operativos en local.

---

## Etapa 2 — Conexión con PostgreSQL

Se preparó el backend para hablar con PostgreSQL:

- Cliente `pg` y carga de variables con `dotenv`
- Pool de conexión en `backend/src/db.ts`
- Variables de ejemplo en `backend/.env.example` (y `.env` local, fuera del repo)
- `GET /health` responde también el estado de la base (`database: "up"` | `"down"`)

La base prevista es `registro_academico`. Falta solo tener el servicio PostgreSQL encendido y esa base/usuario creados en la máquina.

---

## Pendiente (aún no hecho)

- Tablas / migraciones
- Endpoints CRUD
- Consumo de la API desde el frontend
