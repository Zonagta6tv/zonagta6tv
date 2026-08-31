# ZonaGTA6TV + Supabase — guía de puesta en marcha

Este paquete convierte la sección Comunidad en una red social real usando Supabase y GitHub Pages.

## 1. Crear el proyecto

Entra a Supabase y crea un proyecto nuevo. Cuando termine:

- Project URL: `Project Settings > Data API`
- Publishable/anon key: `Project Settings > API Keys`

No uses ni publiques la `service_role`/secret key.

## 2. Crear la base de datos

Abre `SQL Editor` en Supabase, crea una consulta nueva, pega TODO el contenido de `supabase_schema.sql` y pulsa Run.

Se crearán:

- `profiles`
- `posts`
- `comments`
- `post_likes`
- `follows`
- `notifications`
- `map_votes`
- bucket público `avatars`
- políticas RLS
- notificaciones automáticas para likes, comentarios y seguidores

## 3. Poner las credenciales

Abre `supabase-config.js` y cambia:

`PEGA_AQUI_TU_SUPABASE_URL`

por la URL de tu proyecto.

Cambia:

`PEGA_AQUI_TU_PUBLISHABLE_ANON_KEY`

por la clave pública/anon.

Estas dos claves sí pueden estar en una web estática. La `service_role` NO.

## 4. Configurar autenticación

En Supabase ve a `Authentication > Providers > Email`.

Puedes dejar activada la confirmación por correo, que es la opción recomendada. El usuario recibirá un correo antes de poder iniciar sesión.

Para desarrollo puedes desactivar temporalmente `Confirm email`.

## 5. Configurar GitHub Pages

Sube TODOS los archivos de este ZIP al repositorio, manteniendo:

- `index.html`
- `app.js`
- `social.js`
- `supabase-config.js`
- `supabase_schema.sql`
- `styles.css`
- `assets/`

Después activa GitHub Pages desde `Settings > Pages`.

## 6. Funcionamiento

Los visitantes pueden leer el feed públicamente.

Los usuarios registrados pueden:

- crear publicaciones;
- comentar;
- dar y quitar likes;
- seguir/dejar de seguir usuarios;
- editar nombre y biografía;
- votar en el mapa;
- recibir notificaciones generadas por likes, comentarios y follows.

La clave pública está protegida por RLS. Cada usuario solo puede modificar sus propios perfiles, publicaciones, comentarios, likes, follows, votos y notificaciones.

## 7. Antes de publicar

En Supabase > Authentication > URL Configuration añade tu dominio de GitHub Pages como `Site URL` y, si corresponde, como Redirect URL.

Ejemplo:

`https://TU-USUARIO.github.io/TU-REPOSITORIO/`

No copies este ejemplo literalmente: usa la URL real de tu página.

## 8. Prueba rápida

1. Abre la web.
2. Pulsa `INICIAR SESIÓN`.
3. Crea una cuenta.
4. Confirma el email si está activada esa opción.
5. Inicia sesión.
6. Publica un mensaje.
7. Abre la web en una ventana incógnito.
8. Crea otra cuenta y prueba comentario, like y seguir.

## Importante

GitHub Pages solo sirve los archivos. Supabase es quien guarda las cuentas y datos de la red social.

No necesitas un servidor Node/PHP para esta versión.
