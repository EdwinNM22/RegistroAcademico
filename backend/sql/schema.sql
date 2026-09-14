-- Esquema completo de registro_academico
-- Al ejecutar este archivo se crean (o se confirman) todas las tablas.

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  rol VARCHAR(50) NOT NULL CHECK (rol IN ('alumno', 'profesor', 'jefe', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS materias (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(50) NOT NULL UNIQUE,
  nombre VARCHAR(255) NOT NULL,
  creditos SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS semestres (
  id SERIAL PRIMARY KEY,
  anio SMALLINT NOT NULL,
  ciclo VARCHAR(10) NOT NULL CHECK (ciclo IN ('I', 'II')),
  fecha_inicio DATE,
  fecha_fin DATE,
  UNIQUE (anio, ciclo)
);

CREATE TABLE IF NOT EXISTS inscripciones (
  id SERIAL PRIMARY KEY,
  alumno_id INTEGER NOT NULL REFERENCES usuarios (id),
  materia_id INTEGER NOT NULL REFERENCES materias (id),
  semestre_id INTEGER NOT NULL REFERENCES semestres (id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (alumno_id, materia_id, semestre_id)
);

-- Cada inscripcion tiene 3 periodos.
CREATE TABLE IF NOT EXISTS periodos_academicos (
  id SERIAL PRIMARY KEY,
  inscripcion_id INTEGER NOT NULL REFERENCES inscripciones (id) ON DELETE CASCADE,
  numero SMALLINT NOT NULL CHECK (numero BETWEEN 1 AND 3),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (inscripcion_id, numero)
);

-- Cada periodo puede tener hasta 5 evaluaciones y un parcial.
-- El peso del parcial es 50% y el resto se reparte entre las otras evaluaciones.
CREATE TABLE IF NOT EXISTS evaluaciones (
  id SERIAL PRIMARY KEY,
  periodo_id INTEGER NOT NULL REFERENCES periodos_academicos (id) ON DELETE CASCADE,
  orden SMALLINT NOT NULL CHECK (orden BETWEEN 1 AND 6),
  nombre VARCHAR(255) NOT NULL,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('parcial', 'actividad')),
  peso NUMERIC(5, 2) NOT NULL CHECK (peso > 0 AND peso <= 50),
  valor NUMERIC(5, 2) NOT NULL CHECK (valor >= 0 AND valor <= 10),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (periodo_id, orden)
);

-- Nota general del periodo; al final del semestre se promedian las 3.
CREATE TABLE IF NOT EXISTS notas (
  id SERIAL PRIMARY KEY,
  periodo_id INTEGER NOT NULL UNIQUE REFERENCES periodos_academicos (id) ON DELETE CASCADE,
  valor NUMERIC(5, 2) NOT NULL CHECK (valor >= 0 AND valor <= 10),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Registro de asistencia por clase o fecha.
CREATE TABLE IF NOT EXISTS asistencias (
  id SERIAL PRIMARY KEY,
  inscripcion_id INTEGER NOT NULL REFERENCES inscripciones (id) ON DELETE CASCADE,
  fecha DATE NOT NULL,
  estado VARCHAR(20) NOT NULL CHECK (estado IN ('presente', 'ausente', 'tarde', 'justificada')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (inscripcion_id, fecha)
);
