-- Usuarios iniciales de desarrollo (solo si no existen ese email).
-- Contraseñas: alumno123 | profesor123 | jefe123 | admin123

INSERT INTO usuarios (email, password_hash, nombre, rol)
VALUES
  (
    'alumno@registro.local',
    '$2b$10$BruuwQ.Mc5y0R/PGL6IMNuZyNAz9DTiSQZj2jb479/oFDlGRQ2YWG',
    'Alumno Demo',
    'alumno'
  ),
  (
    'profesor@registro.local',
    '$2b$10$iB0GgmYu1bmMSKqkYgvsAuubJD6KTEM/kDj51wZD/dOr/aLox8goa',
    'Profesor Demo',
    'profesor'
  ),
  (
    'jefe@registro.local',
    '$2b$10$V8qENZeglpVB9iMt7ZwobuL8tGl5x3SNEJGsltyq5TK/0iHphfB9G',
    'Jefe Inicial',
    'jefe'
  ),
  (
    'admin@registro.local',
    '$2b$10$FQwHPX4QC9C2ea4syKj5t.xZqcFGMOKnc3tvvtpj3eXqRAhC3aLa6',
    'Admin Demo',
    'admin'
  )
ON CONFLICT (email) DO NOTHING;
