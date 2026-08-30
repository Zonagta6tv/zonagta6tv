# ZonaGTA6TV V1.1

Versión ampliada de la red social de GTA 6.

## Incluye
- Diseño social responsive.
- Registro preparado para Email/Password y Google OAuth.
- Perfil con nombre, apellido, usuario, fecha de nacimiento, país y biografía.
- Feed, posts, comentarios, likes y compartir.
- Chat general con Supabase Realtime.
- Tablas para seguidores y futuras mejoras.
- RLS para proteger operaciones de usuario.
- Trigger para crear perfiles al registrarse.
- Compatible con GitHub Pages como frontend estático.

## Activación real
1. Crea un proyecto en Supabase.
2. Ejecuta `supabase_schema_v1_1.sql`.
3. Activa Email y Google en Authentication > Providers.
4. Configura Site URL y Redirect URLs con tu URL de GitHub Pages.
5. Añade tu URL y `anon/public key` a `config.js`.
6. Activa Realtime para `posts`, `comments`, `likes`, `follows` y `messages`.
7. Publica el contenido del ZIP en GitHub Pages.

IMPORTANTE: nunca pongas una `service_role` key en `config.js` ni en GitHub.
