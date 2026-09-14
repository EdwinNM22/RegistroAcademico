-- Usuario jefe inicial (solo si aún no existe ese email).
-- Contraseña: jefe123
-- Cámbiala después del primer login.

INSERT INTO usuarios (email, password_hash, nombre, rol)
VALUES (
  'jefe@registro.local',
  '$2b$10$V8qENZeglpVB9iMt7ZwobuL8tGl5x3SNEJGsltyq5TK/0iHphfB9G',
  'Jefe Inicial',
  'jefe'
)
ON CONFLICT (email) DO NOTHING;
