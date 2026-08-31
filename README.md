# ZonaGTA6TV — V7 MAPA LEÓNIDA + COMUNIDAD

Versión lista para GitHub Pages.

## Incluye
- Comentarios públicos con Disqus + comentarios de invitado (sin GitHub).
- Repositorio configurado: `zonagta6tv/zonagta6tv`.
- Mapeo de comentarios por título de página (`issue-term="title"`).
- Nueva sección interactiva **Mapa de Leónida**.
- Seis regiones presentadas como regiones confirmadas por Rockstar: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia y Mount Kalaga National Park.
- Explorador visual por regiones.
- Encuesta local sobre la opinión del mapa.
- Veredicto editorial: priorizar diversidad, densidad y actividades sobre tamaño bruto.
- La sección evita presentar mapas filtrados o reconstrucciones de fans como mapas oficiales.

## Publicación
Sube el contenido de esta carpeta a `zonagta6tv/zonagta6tv` y espera a que GitHub Pages despliegue el cambio.

## Comentarios
La aplicación de Utterances debe estar instalada en el repositorio y Issues debe estar habilitado.


## Comentarios
El ZIP usa Disqus. Debes crear el sitio con shortname `zonagta6tv` (o cambiar `DISQUS_SHORTNAME` en `app.js`) y activar **Guest Commenting** en Disqus. Los visitantes podrán comentar sin cuenta de GitHub.

## Redes
YouTube usa el botón oficial de suscripción de Google. TikTok usa un botón que abre directamente el perfil oficial de ZonaGTA6TV para seguirlo.

## V8 reparado

- Corregido el contenedor de comentarios: ahora usa el elemento `#disqus_thread` que espera Disqus.
- Corregida la carga de las imágenes de **Últimas noticias** usando los SVG locales incluidos en el ZIP.
- Añadido `onerror` para sustituir automáticamente una imagen rota por una imagen local de respaldo.
- Los comentarios muestran un aviso claro si Disqus no está configurado o el dominio de GitHub Pages no está autorizado.

## YouTube reparado

- Los enlaces de YouTube ahora usan una búsqueda directa de `ZonaGTA6TV`, evitando el error de página no disponible cuando el identificador `@ZonaGTA6TV` no está registrado o ha cambiado.
- El botón de suscripción de Google fue sustituido por un enlace seguro a la búsqueda de YouTube, para evitar que el widget falle por un canal inexistente.
- Cuando tengas la URL exacta del canal de YouTube, se puede sustituir la búsqueda por el enlace directo al canal.
