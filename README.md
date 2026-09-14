# Registro Académico

## Requisitos

- Node.js y npm
- PostgreSQL

## Inicio rápido

### 1. Variables de entorno

Copia los archivos de ejemplo en cada carpeta:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

En `backend/.env`, cambia `DB_USER` y `DB_PASSWORD` por los de tu PostgreSQL. El resto puedes dejarlo igual si usas la configuración por defecto:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=registro_academico
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
JWT_SECRET=cambiar_esto_en_produccion
JWT_EXPIRES_IN=8h
```

En `frontend/.env` normalmente no hace falta tocar nada:

```env
VITE_API_URL=http://localhost:3000
```



### 2. Instalar dependencias

```bash
cd backend && npm install
cd ../frontend && npm install
```



### 3. Arrancar el proyecto

Abre **dos terminales**.

**Terminal 1 — backend:**

```bash
cd backend
npm run dev
```

Al iniciar, el backend crea la base de datos, las tablas y los usuarios de desarrollo si aún no existen.

**Terminal 2 — frontend:**

```bash
cd frontend
npm run dev
```

Abre en el navegador la URL que muestre Vite (por defecto `http://localhost:5173`).

## Usuarios de desarrollo

Al arrancar el backend se crean estos usuarios (solo si no existen):


| Rol      | Email                     | Contraseña    |
| -------- | ------------------------- | ------------- |
| Alumno   | `alumno@registro.local`   | `alumno123`   |
| Profesor | `profesor@registro.local` | `profesor123` |
| Jefe     | `jefe@registro.local`     | `jefe123`     |
| Admin    | `admin@registro.local`    | `admin123`    |


En desarrollo, el login tiene botones para rellenar cada cuenta automáticamente.

## Comprobar que el backend responde

```bash
curl http://localhost:3000/health
```

Respuesta esperada: `{"ok":true,"database":"up"}`