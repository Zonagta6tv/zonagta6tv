# ZonaGTA6TV V1 — instalación real

## 1. Crear backend
Crea un proyecto gratuito en Supabase.

## 2. Base de datos
En Supabase → SQL Editor, pega y ejecuta `supabase_schema.sql`.

## 3. Auth
En Authentication → Providers:
- Activa Email.
- Activa Google.
- En Google crea las credenciales OAuth y copia Client ID/Secret en Supabase.

En Authentication → URL Configuration:
- Site URL: tu URL de GitHub Pages.
- Redirect URLs: tu URL de GitHub Pages y la URL exacta del repositorio si usas `usuario.github.io/repositorio/`.

## 4. Realtime
En Database → Replication, habilita Realtime para:
- `messages`
- `posts`
- `comments`

## 5. Conectar el frontend
Edita `config.js`:

```js
window.ZGTA_CONFIG = {
  SUPABASE_URL: "https://TU-PROYECTO.supabase.co",
  SUPABASE_ANON_KEY: "TU_ANON_PUBLIC_KEY"
};
```

Solo usa la `anon/public key`. **Nunca subas una `service_role` key a GitHub.**

## 6. GitHub Pages
Sube el contenido del ZIP a la rama/fuente que usa GitHub Pages y activa Pages.

### Funciones V1
- Registro con email + contraseña.
- Login/logout.
- OAuth con Google.
- Perfil básico.
- Feed persistente.
- Publicaciones de hasta 2000 caracteres.
- Comentarios.
- Me gusta.
- Seguimientos preparados en BD.
- Chat general en tiempo real mediante Supabase Realtime.
- Diseño responsive.
- RLS para impedir que un usuario publique/comente/mande mensajes haciéndose pasar por otro.
