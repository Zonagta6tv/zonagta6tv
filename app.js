const NEWS=[
["OFICIAL","27 AGO 2026","Rockstar publica un Extended Look de GTA VI","El nuevo vistazo oficial amplía el contexto de Vice City, Leonida y sus personajes con metraje del juego.","ROCKSTAR","oficial"],
["LANZAMIENTO","ACTUALIZADO","GTA VI mantiene su lanzamiento para el 19 de noviembre de 2026","La página oficial mantiene la fecha de lanzamiento y las plataformas PlayStation 5 y Xbox Series X|S.","OFICIAL","oficial"],
["MUNDO","ACTUALIZADO","Leónida se expande mucho más allá de Vice City","El material oficial muestra Vice City junto a zonas como Leonida Keys, Port Gellhorn, Ambrosia, Grassrivers y Mount Kalaga.","ROCKSTAR","mundo"],
["PERSONAJES","OFICIAL","Jason y Lucia están en el centro de la historia","Rockstar presenta a Jason Duval y Lucia Caminos como una pareja obligada a confiar el uno en el otro.","ROCKSTAR","personajes"],
["GALERÍA","NUEVO","70 capturas oficiales para explorar GTA VI","La biblioteca oficial de Rockstar reúne imágenes de personajes, localizaciones y escenas de Leonida.","MEDIA","oficial"],
["COMUNIDAD","HOY","ZonaGTA6TV abre una nueva etapa editorial","Noticias, análisis, imágenes, rumores etiquetados y comunidad reunidos en un formato de blog visual.","ZONA GTA6TV","comunidad"]
];
const BLOG=[
["DOSSIER 01","Vice City: el corazón de Leónida","La ciudad vuelve con neón, playas, tráfico, vida nocturna y una identidad visual más detallada. El material oficial la presenta como el centro del universo de GTA VI."],
["DOSSIER 02","Jason y Lucia: una alianza peligrosa","Jason intenta construir una vida sencilla mientras Lucia sale de prisión decidida a cambiar su destino. Su relación será clave para la historia."],
["DOSSIER 03","Un estado, muchas caras","Los Cayos, Port Gellhorn, Ambrosia, Grassrivers y el Parque Nacional Mount Kalaga muestran que GTA VI no se limita a una sola ciudad."],
["DOSSIER 04","Cómo leer las filtraciones","En ZonaGTA6TV diferenciamos anuncios oficiales, reportes de terceros, teorías de la comunidad y rumores no verificados para que el lector sepa qué está viendo."],
["DOSSIER 05","La guía visual de GTA VI","Recorre personajes, vehículos, lugares y detalles ambientales a través de la galería oficial publicada por Rockstar Games."],
["DOSSIER 06","Cuenta atrás hacia Leónida","La fecha oficial sigue marcada para el 19 de noviembre de 2026. Mientras llega, el blog reúne lo más importante sin perder el contexto."]
];
const GUIDES=[["01","Guía de fuentes","Cómo reconocer una noticia oficial de Rockstar y distinguirla de una publicación de la comunidad."],["02","Guía de personajes","Jason, Lucia y las figuras de Leónida que Rockstar ya ha presentado oficialmente."],["03","Guía de Leónida","Qué conocemos de Vice City, Leonida Keys, Port Gellhorn, Ambrosia, Grassrivers y Mount Kalaga."],["04","Guía anti-spoilers","Cómo seguir las novedades sin entrar en detalles que puedan arruinarte la historia."],["05","Guía de imágenes","Cómo navegar por la biblioteca visual oficial de GTA VI."],["06","Guía ZonaGTA6TV","Dónde encontrar las noticias largas, vídeos, clips y comunidad del proyecto."]];
const LEAKS=[["ALTA","Interpretaciones de gameplay","La comunidad analiza sistemas visibles en material oficial. Son interpretaciones, no confirmaciones de funciones no anunciadas."],["MEDIA","Afirmaciones no verificadas","Existen publicaciones online sobre supuestos detalles internos. ZonaGTA6TV no aloja ni distribuye copias filtradas."],["BAJA","Predicciones de próximos anuncios","Teorías de fans sobre futuros tráilers, personajes o revelaciones. Se presentan únicamente como especulación."]];
const ARTICLE=`<span class="eyebrow">DOSSIER ZONAGTA6TV</span><h2>Leónida, vista desde dentro.</h2><p>GTA VI está ambientado en el estado ficticio de Leónida, con Vice City como uno de sus principales escenarios. La información oficial de Rockstar también presenta a Jason Duval y Lucia Caminos como protagonistas.</p><p>La nueva ZonaGTA6TV funciona como un blog visual: noticias rápidas, artículos largos, guías, galería, rumores etiquetados y enlaces a vídeos de la comunidad.</p><p><strong>Regla editorial:</strong> lo oficial se etiqueta como oficial; los análisis se presentan como análisis; los rumores nunca se disfrazan de confirmación.</p>`;
const el=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
function renderNews(filter="todos"){
  // Las imágenes de noticias se incrustan en el JS para que funcionen
  // incluso cuando GitHub Pages publica el proyecto dentro de una subcarpeta.
  const images=[
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNTIwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmMmViNCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzIwZTlmZiIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJyIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii4zNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+CjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiBmaWxsPSIjMDcwODExIi8+PHJlY3QgeD0iLTEwMCIgeT0iODAiIHdpZHRoPSIxMTAwIiBoZWlnaHQ9IjI2MCIgcng9IjgwIiBmaWxsPSJ1cmwoI2cpIiBvcGFjaXR5PSIuMjgiIHRyYW5zZm9ybT0icm90YXRlKC04IDQ1MCAyNjApIi8+CjxjaXJjbGUgY3g9IjcxMCIgY3k9IjExMCIgcj0iMTcwIiBmaWxsPSJ1cmwoI3IpIiBvcGFjaXR5PSIuNyIvPjxjaXJjbGUgY3g9IjE2MCIgY3k9IjQyMCIgcj0iMTMwIiBmaWxsPSJ1cmwoI3IpIiBvcGFjaXR5PSIuMzUiLz4KPHBhdGggZD0iTTAgNDIwIEwxODAgMjgwIEwyOTAgMzU1IEw0MzAgMTgwIEw1NjAgMzAwIEw3MDAgMTYwIEw5MDAgMzMwIFY1MjAgSDBaIiBmaWxsPSIjMDUwNjBjIiBvcGFjaXR5PSIuODIiLz4KPHBhdGggZD0iTTAgNDQ1IEw5MDAgMjUwIiBzdHJva2U9IiMyMGU5ZmYiIHN0cm9rZS13aWR0aD0iMyIgb3BhY2l0eT0iLjY1Ii8+PHBhdGggZD0iTTAgNDY1IEw5MDAgMjcwIiBzdHJva2U9IiNmZjJlYjQiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iLjU1Ii8+Cjx0ZXh0IHg9IjU0IiB5PSIxMDAiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iNzAwIiBsZXR0ZXItc3BhY2luZz0iNyI+Wk9OQUdUQTZUVjwvdGV4dD4KPHRleHQgeD0iNTQiIHk9IjM5MCIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNjIiIGZvbnQtd2VpZ2h0PSI5MDAiPkVYVEVOREVEIExPT0s8L3RleHQ+Cjx0ZXh0IHg9IjU4IiB5PSI0MzAiIGZpbGw9IiMyMGU5ZmYiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iNzAwIiBsZXR0ZXItc3BhY2luZz0iNSI+Uk9DS1NUQVI8L3RleHQ+Cjwvc3ZnPg==",
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNTIwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmN2ExOCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZDI1MSIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJyIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii4zNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+CjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiBmaWxsPSIjMDcwODExIi8+PHJlY3QgeD0iLTEwMCIgeT0iODAiIHdpZHRoPSIxMTAwIiBoZWlnaHQ9IjI2MCIgcng9IjgwIiBmaWxsPSJ1cmwoI2cpIiBvcGFjaXR5PSIuMjgiIHRyYW5zZm9ybT0icm90YXRlKC04IDQ1MCAyNjApIi8+CjxjaXJjbGUgY3g9IjcxMCIgY3k9IjExMCIgcj0iMTcwIiBmaWxsPSJ1cmwoI3IpIiBvcGFjaXR5PSIuNyIvPjxjaXJjbGUgY3g9IjE2MCIgY3k9IjQyMCIgcj0iMTMwIiBmaWxsPSJ1cmwoI3IpIiBvcGFjaXR5PSIuMzUiLz4KPHBhdGggZD0iTTAgNDIwIEwxODAgMjgwIEwyOTAgMzU1IEw0MzAgMTgwIEw1NjAgMzAwIEw3MDAgMTYwIEw5MDAgMzMwIFY1MjAgSDBaIiBmaWxsPSIjMDUwNjBjIiBvcGFjaXR5PSIuODIiLz4KPHBhdGggZD0iTTAgNDQ1IEw5MDAgMjUwIiBzdHJva2U9IiNmZmQyNTEiIHN0cm9rZS13aWR0aD0iMyIgb3BhY2l0eT0iLjY1Ii8+PHBhdGggZD0iTTAgNDY1IEw5MDAgMjcwIiBzdHJva2U9IiNmZjdhMTgiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iLjU1Ii8+Cjx0ZXh0IHg9IjU0IiB5PSIxMDAiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iNzAwIiBsZXR0ZXItc3BhY2luZz0iNyI+Wk9OQUdUQTZUVjwvdGV4dD4KPHRleHQgeD0iNTQiIHk9IjM5MCIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNjIiIGZvbnQtd2VpZ2h0PSI5MDAiPjE5IE5PViAyMDI2PC90ZXh0Pgo8dGV4dCB4PSI1OCIgeT0iNDMwIiBmaWxsPSIjZmZkMjUxIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9IjcwMCIgbGV0dGVyLXNwYWNpbmc9IjUiPkxBTlpBTUlFTlRPPC90ZXh0Pgo8L3N2Zz4=",
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNTIwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iIzIwZTlmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzhhNjJmZiIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJyIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii4zNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+CjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiBmaWxsPSIjMDcwODExIi8+PHJlY3QgeD0iLTEwMCIgeT0iODAiIHdpZHRoPSIxMTAwIiBoZWlnaHQ9IjI2MCIgcng9IjgwIiBmaWxsPSJ1cmwoI2cpIiBvcGFjaXR5PSIuMjgiIHRyYW5zZm9ybT0icm90YXRlKC04IDQ1MCAyNjApIi8+CjxjaXJjbGUgY3g9IjcxMCIgY3k9IjExMCIgcj0iMTcwIiBmaWxsPSJ1cmwoI3IpIiBvcGFjaXR5PSIuNyIvPjxjaXJjbGUgY3g9IjE2MCIgY3k9IjQyMCIgcj0iMTMwIiBmaWxsPSJ1cmwoI3IpIiBvcGFjaXR5PSIuMzUiLz4KPHBhdGggZD0iTTAgNDIwIEwxODAgMjgwIEwyOTAgMzU1IEw0MzAgMTgwIEw1NjAgMzAwIEw3MDAgMTYwIEw5MDAgMzMwIFY1MjAgSDBaIiBmaWxsPSIjMDUwNjBjIiBvcGFjaXR5PSIuODIiLz4KPHBhdGggZD0iTTAgNDQ1IEw5MDAgMjUwIiBzdHJva2U9IiM4YTYyZmYiIHN0cm9rZS13aWR0aD0iMyIgb3BhY2l0eT0iLjY1Ii8+PHBhdGggZD0iTTAgNDY1IEw5MDAgMjcwIiBzdHJva2U9IiMyMGU5ZmYiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iLjU1Ii8+Cjx0ZXh0IHg9IjU0IiB5PSIxMDAiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iNzAwIiBsZXR0ZXItc3BhY2luZz0iNyI+Wk9OQUdUQTZUVjwvdGV4dD4KPHRleHQgeD0iNTQiIHk9IjM5MCIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNjIiIGZvbnQtd2VpZ2h0PSI5MDAiPkxFw5NOSURBPC90ZXh0Pgo8dGV4dCB4PSI1OCIgeT0iNDMwIiBmaWxsPSIjOGE2MmZmIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9IjcwMCIgbGV0dGVyLXNwYWNpbmc9IjUiPk1BUEE8L3RleHQ+Cjwvc3ZnPg==",
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNTIwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmMmViNCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZDI1MSIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJyIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii4zNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+CjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiBmaWxsPSIjMDcwODExIi8+PHJlY3QgeD0iLTEwMCIgeT0iODAiIHdpZHRoPSIxMTAwIiBoZWlnaHQ9IjI2MCIgcng9IjgwIiBmaWxsPSJ1cmwoI2cpIiBvcGFjaXR5PSIuMjgiIHRyYW5zZm9ybT0icm90YXRlKC04IDQ1MCAyNjApIi8+CjxjaXJjbGUgY3g9IjcxMCIgY3k9IjExMCIgcj0iMTcwIiBmaWxsPSJ1cmwoI3IpIiBvcGFjaXR5PSIuNyIvPjxjaXJjbGUgY3g9IjE2MCIgY3k9IjQyMCIgcj0iMTMwIiBmaWxsPSJ1cmwoI3IpIiBvcGFjaXR5PSIuMzUiLz4KPHBhdGggZD0iTTAgNDIwIEwxODAgMjgwIEwyOTAgMzU1IEw0MzAgMTgwIEw1NjAgMzAwIEw3MDAgMTYwIEw5MDAgMzMwIFY1MjAgSDBaIiBmaWxsPSIjMDUwNjBjIiBvcGFjaXR5PSIuODIiLz4KPHBhdGggZD0iTTAgNDQ1IEw5MDAgMjUwIiBzdHJva2U9IiNmZmQyNTEiIHN0cm9rZS13aWR0aD0iMyIgb3BhY2l0eT0iLjY1Ii8+PHBhdGggZD0iTTAgNDY1IEw5MDAgMjcwIiBzdHJva2U9IiNmZjJlYjQiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iLjU1Ii8+Cjx0ZXh0IHg9IjU0IiB5PSIxMDAiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iNzAwIiBsZXR0ZXItc3BhY2luZz0iNyI+Wk9OQUdUQTZUVjwvdGV4dD4KPHRleHQgeD0iNTQiIHk9IjM5MCIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNjIiIGZvbnQtd2VpZ2h0PSI5MDAiPkpBU09OICsgTFVDSUE8L3RleHQ+Cjx0ZXh0IHg9IjU4IiB5PSI0MzAiIGZpbGw9IiNmZmQyNTEiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iNzAwIiBsZXR0ZXItc3BhY2luZz0iNSI+SElTVE9SSUE8L3RleHQ+Cjwvc3ZnPg==",
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNTIwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iIzIwZTlmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmN2ExOCIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJyIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii4zNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+CjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiBmaWxsPSIjMDcwODExIi8+PHJlY3QgeD0iLTEwMCIgeT0iODAiIHdpZHRoPSIxMTAwIiBoZWlnaHQ9IjI2MCIgcng9IjgwIiBmaWxsPSJ1cmwoI2cpIiBvcGFjaXR5PSIuMjgiIHRyYW5zZm9ybT0icm90YXRlKC04IDQ1MCAyNjApIi8+CjxjaXJjbGUgY3g9IjcxMCIgY3k9IjExMCIgcj0iMTcwIiBmaWxsPSJ1cmwoI3IpIiBvcGFjaXR5PSIuNyIvPjxjaXJjbGUgY3g9IjE2MCIgY3k9IjQyMCIgcj0iMTMwIiBmaWxsPSJ1cmwoI3IpIiBvcGFjaXR5PSIuMzUiLz4KPHBhdGggZD0iTTAgNDIwIEwxODAgMjgwIEwyOTAgMzU1IEw0MzAgMTgwIEw1NjAgMzAwIEw3MDAgMTYwIEw5MDAgMzMwIFY1MjAgSDBaIiBmaWxsPSIjMDUwNjBjIiBvcGFjaXR5PSIuODIiLz4KPHBhdGggZD0iTTAgNDQ1IEw5MDAgMjUwIiBzdHJva2U9IiNmZjdhMTgiIHN0cm9rZS13aWR0aD0iMyIgb3BhY2l0eT0iLjY1Ii8+PHBhdGggZD0iTTAgNDY1IEw5MDAgMjcwIiBzdHJva2U9IiMyMGU5ZmYiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iLjU1Ii8+Cjx0ZXh0IHg9IjU0IiB5PSIxMDAiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iNzAwIiBsZXR0ZXItc3BhY2luZz0iNyI+Wk9OQUdUQTZUVjwvdGV4dD4KPHRleHQgeD0iNTQiIHk9IjM5MCIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNjIiIGZvbnQtd2VpZ2h0PSI5MDAiPjcwIENBUFRVUkFTPC90ZXh0Pgo8dGV4dCB4PSI1OCIgeT0iNDMwIiBmaWxsPSIjZmY3YTE4IiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9IjcwMCIgbGV0dGVyLXNwYWNpbmc9IjUiPkdBTEVSw41BPC90ZXh0Pgo8L3N2Zz4=",
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MDAgNTIwIj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iIzhhNjJmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzIwZTlmZiIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJyIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii4zNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+CjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTIwIiBmaWxsPSIjMDcwODExIi8+PHJlY3QgeD0iLTEwMCIgeT0iODAiIHdpZHRoPSIxMTAwIiBoZWlnaHQ9IjI2MCIgcng9IjgwIiBmaWxsPSJ1cmwoI2cpIiBvcGFjaXR5PSIuMjgiIHRyYW5zZm9ybT0icm90YXRlKC04IDQ1MCAyNjApIi8+CjxjaXJjbGUgY3g9IjcxMCIgY3k9IjExMCIgcj0iMTcwIiBmaWxsPSJ1cmwoI3IpIiBvcGFjaXR5PSIuNyIvPjxjaXJjbGUgY3g9IjE2MCIgY3k9IjQyMCIgcj0iMTMwIiBmaWxsPSJ1cmwoI3IpIiBvcGFjaXR5PSIuMzUiLz4KPHBhdGggZD0iTTAgNDIwIEwxODAgMjgwIEwyOTAgMzU1IEw0MzAgMTgwIEw1NjAgMzAwIEw3MDAgMTYwIEw5MDAgMzMwIFY1MjAgSDBaIiBmaWxsPSIjMDUwNjBjIiBvcGFjaXR5PSIuODIiLz4KPHBhdGggZD0iTTAgNDQ1IEw5MDAgMjUwIiBzdHJva2U9IiMyMGU5ZmYiIHN0cm9rZS13aWR0aD0iMyIgb3BhY2l0eT0iLjY1Ii8+PHBhdGggZD0iTTAgNDY1IEw5MDAgMjcwIiBzdHJva2U9IiM4YTYyZmYiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iLjU1Ii8+Cjx0ZXh0IHg9IjU0IiB5PSIxMDAiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iNzAwIiBsZXR0ZXItc3BhY2luZz0iNyI+Wk9OQUdUQTZUVjwvdGV4dD4KPHRleHQgeD0iNTQiIHk9IjM5MCIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNjIiIGZvbnQtd2VpZ2h0PSI5MDAiPlpPTkEgR1RBNlRWPC90ZXh0Pgo8dGV4dCB4PSI1OCIgeT0iNDMwIiBmaWxsPSIjMjBlOWZmIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9IjcwMCIgbGV0dGVyLXNwYWNpbmc9IjUiPkNPTVVOSURBRDwvdGV4dD4KPC9zdmc+"
  ];
  const labels=["VI","19 NOV","LEÓNIDA","J+L","MEDIA","ZONA"];
  const cards=NEWS.filter(n=>filter==="todos"||n[5]===filter).map(n=>{
    const originalIndex=NEWS.indexOf(n);
    const src=images[originalIndex] || "assets/vice-neon.svg";
    return `<article class="card news-card" data-category="${esc(n[5])}">
      <div class="art">
        <img src="${src}" alt="${esc(n[2])}" loading="lazy" decoding="async"
             onerror="this.onerror=null;this.src=images[originalIndex] || images[0];this.classList.add('img-fallback')">
        <span class="art-glow"></span><b>${labels[originalIndex]||"NEWS"}</b>
      </div>
      <div class="card-body">
        <div class="meta">${esc(n[0])} · ${esc(n[1])}</div>
        <h3>${esc(n[2])}</h3><p>${esc(n[3])}</p>
        <button class="read" data-article="official">ABRIR ARTÍCULO →</button>
      </div>
    </article>`;
  }).join("");
  const target=el("#newsCards");
  if(target) target.innerHTML=cards || '<p class="empty-state">No hay noticias en esta categoría.</p>';
}
renderNews();
document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-filter]").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderNews(b.dataset.filter)}));
el("#blogCards").innerHTML=BLOG.map(x=>`<article class="story"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("");
el("#guideCards").innerHTML=GUIDES.map(x=>`<article class="guide"><div class="n">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("");
el("#leakCards").innerHTML=LEAKS.map((x,i)=>`<article class="leak"><div class="confidence ${i===0?"high":i===1?"mid":"low"}">● CONFIANZA ${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("");

const open=id=>el("#"+id).classList.add("open"), close=id=>el("#"+id).classList.remove("open");
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>close(b.dataset.close));
el("#openSearch").onclick=()=>open("searchModal"); el("#heroSearch").onclick=()=>open("searchModal");
el("#searchInput").addEventListener("input",e=>{const q=e.target.value.trim().toLowerCase(),out=el("#results");if(!q){out.innerHTML="";return}const f=NEWS.filter(n=>n.join(" ").toLowerCase().includes(q));out.innerHTML=f.length?f.map(n=>`<div class="search-item"><b>${esc(n[2])}</b><div style="color:#8e92a5;font-size:11px">${esc(n[3])}</div></div>`).join(""):"<p style='color:#787d90'>No encontramos resultados.</p>"});
document.querySelectorAll(".gallery-card").forEach(b=>b.onclick=()=>{el("#galleryFull").src=b.dataset.image;open("galleryModal")});
document.addEventListener("click",e=>{if(e.target.matches("[data-article]")){el("#articleBody").innerHTML=ARTICLE;open("articleModal")}});
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("open")}));

// ===== Comentarios públicos =====
// Disqus es el servicio de comentarios. Para que los visitantes puedan escribir,
// el shortname debe existir en Disqus y "Guest Commenting" debe estar activado.
const DISQUS_SHORTNAME="zonagta6tv";
const disqusHost=el("#disqus_thread");
if(disqusHost && DISQUS_SHORTNAME && !DISQUS_SHORTNAME.startsWith("TU_")){
  window.disqus_config=function(){
    this.page.url=window.location.href.split("#")[0];
    this.page.identifier="zonagta6tv:"+window.location.pathname;
    this.page.title=document.title;
  };
  const s=document.createElement("script");
  s.src="https://"+DISQUS_SHORTNAME+".disqus.com/embed.js";
  s.async=true;
  s.setAttribute("data-timestamp",String(Date.now()));
  s.setAttribute("crossorigin","anonymous");
  s.onerror=()=>{
    disqusHost.innerHTML='<div class="setup-card"><strong>Comentarios temporalmente no disponibles.</strong><br>Comprueba que el sitio <code>zonagta6tv</code> esté creado y que el dominio de GitHub Pages esté autorizado en Disqus.</div>';
  };
  disqusHost.appendChild(s);
}


// ===== Leonida map explorer =====
const REGION_INFO={
  vice:["Vice City","El corazón urbano: playas, barrios, puertos, aeropuerto y la mayor concentración de vida urbana.",6],
  keys:["Leonida Keys","Archipiélago tropical al sur: carreteras sobre puentes, agua, ocio y rutas marítimas.",5],
  grass:["Grassrivers","Humedales inspirados en los Everglades, pensados para romper el ritmo urbano y explorar naturaleza.",5],
  amb:["Ambrosia","Interior industrial y agrícola, con la refinería de azúcar como uno de sus elementos distintivos.",4],
  port:["Port Gellhorn","Costa deteriorada y turística, con una identidad más áspera y decadente que Vice City.",4],
  kalaga:["Mount Kalaga","Zona norte de naturaleza y montaña: caza, pesca y espacios para desconectarse de la ciudad.",5]
};
document.querySelectorAll("[data-region]").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll("[data-region]").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
  const d=REGION_INFO[btn.dataset.region];
  if(!d)return;
  el("#regionTitle").textContent=d[0];el("#regionText").textContent=d[1];el("#regionScore").textContent=d[2]+" / 6";el("#regionBar").style.width=(d[2]/6*100)+"%";
}));
const voteKey="zgta6tv-map-votes-v1";
let mapVotes=JSON.parse(localStorage.getItem(voteKey)||"{}");
function renderVotes(){const total=Object.values(mapVotes).reduce((a,b)=>a+b,0);el("#voteTotal").textContent=total;document.querySelectorAll("[data-vote]").forEach(b=>b.classList.toggle("voted",!!mapVotes[b.dataset.vote]&&mapVotes[b.dataset.vote]>0));}
document.querySelectorAll("[data-vote]").forEach(b=>b.addEventListener("click",()=>{const k=b.dataset.vote;mapVotes[k]=(mapVotes[k]||0)+1;localStorage.setItem(voteKey,JSON.stringify(mapVotes));renderVotes();el("#voteMessage").textContent="¡Voto registrado! Ahora cuéntanos por qué en los comentarios.";}));
renderVotes();

// ===== Visual data layer =====
const activityChart=el("#activityChart");
const pulseBars=el("#pulseBars");
function renderCharts(){
  if(activityChart){
    const vals=[48,62,55,78,71,91,84,96,88,100,93,86];
    activityChart.innerHTML=vals.map((v,i)=>`<span style="--h:${v}%;--d:${i*70}ms"><b>${v}</b></span>`).join("");
  }
  if(pulseBars){
    const vals=[72,86,64,94,78,90,69,88,76,96,82,92];
    pulseBars.innerHTML=vals.map((v,i)=>`<i style="--h:${v}%;--d:${i*90}ms"></i>`).join("");
  }
}
renderCharts();
setInterval(()=>{
  if(!activityChart||!pulseBars)return;
  [...activityChart.children].forEach((x,i)=>x.style.setProperty("--h",(55+Math.floor(Math.random()*45))+"%"));
  [...pulseBars.children].forEach((x,i)=>x.style.setProperty("--h",(58+Math.floor(Math.random()*42))+"%"));
  const states=["ALTO","MÁXIMO","ACTIVO"];
  el("#pulseText").textContent=states[Math.floor(Math.random()*states.length)];
},2400);

// Música original ambiental incluida en el ZIP. No es la banda sonora de GTA VI.
const audio=el("#ambientAudio"), audioBtn=el("#audioBtn");
audio.volume=.18;
audioBtn.onclick=async()=>{try{if(audio.paused){await audio.play();audioBtn.classList.add("active");audioBtn.textContent="🔊";toast("Ambiente sonoro activado.");}else{audio.pause();audioBtn.classList.remove("active");audioBtn.textContent="♫";toast("Ambiente pausado.");}}catch{toast("Pulsa de nuevo para activar el audio.")}};

// Parallax 3D + cursor glow
const hero=el(".hero-art");
window.addEventListener("pointermove",e=>{
  const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
  if(innerWidth>720) hero.style.transform=`rotateY(${x*5}deg) rotateX(${-y*3}deg)`;
  const g=el("#cursorGlow");g.style.left=e.clientX+"px";g.style.top=e.clientY+"px";
});
window.addEventListener("pointerleave",()=>hero.style.transform="");
document.addEventListener("mouseleave",()=>hero.style.transform="");
const io=new IntersectionObserver(entries=>entries.forEach(x=>x.isIntersecting&&x.target.classList.add("in")),{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>io.observe(x));

// FPS HUD: visual indicator, not a hardware benchmark.
let frames=0,last=performance.now();
function fpsTick(t){frames++;if(t-last>500){el("#fps").textContent=Math.min(60,Math.round(frames*1000/(t-last)));frames=0;last=t}requestAnimationFrame(fpsTick)}requestAnimationFrame(fpsTick);

const target=new Date("2026-11-19T00:00:00-05:00");
function tick(){let s=Math.max(0,Math.floor((target-new Date())/1000)),d=Math.floor(s/86400);s%=86400;let h=Math.floor(s/3600);s%=3600;let m=Math.floor(s/60),z=s%60;el("#bigCountdown").textContent=`${d}d ${String(h).padStart(2,"0")}h ${String(m).padStart(2,"0")}m ${String(z).padStart(2,"0")}s`}tick();setInterval(tick,1000);
el("#themeBtn").onclick=()=>{document.body.classList.toggle("light");el("#modeLabel").textContent=document.body.classList.contains("light")?"VIOLET SUNSET":"NEON NIGHT";toast("Ambiente actualizado.")};

const QUIZ=[["¿Cuál es el estado ficticio de GTA VI?","Leonida",["Los Santos","Leonida","Liberty City","North Yankton"]],["¿Quiénes son los protagonistas?","Jason y Lucia",["Michael y Franklin","Jason y Lucia","Trevor y Lamar","Niko y Roman"]],["¿Cuándo está previsto el lanzamiento oficial?","19 de noviembre de 2026",["6 de mayo de 2025","19 de noviembre de 2026","4 de diciembre de 2026","27 de agosto de 2026"]]];
let qi=0,score=0;
function missionCompleteSound(){
  try{const C=window.AudioContext||window.webkitAudioContext; if(!C)return; const ctx=new C(); const now=ctx.currentTime;
    [[523.25,0],[659.25,.12],[783.99,.24],[1046.5,.42]].forEach(([f,t])=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,now+t);g.gain.exponentialRampToValueAtTime(.16,now+t+.025);g.gain.exponentialRampToValueAtTime(.0001,now+t+.32);o.connect(g).connect(ctx.destination);o.start(now+t);o.stop(now+t+.34)});
  }catch(e){}
}
function quiz(){const q=QUIZ[qi];el("#quizBody").innerHTML=`<span class="eyebrow">QUIZ GTA6</span><h2>${q[0]}</h2>${q[2].map(a=>`<button class="neon-btn" style="width:100%;margin:6px 0" data-answer="${esc(a)}">${esc(a)}</button>`).join("")}`;el("#quizBody").querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>{if(b.dataset.answer===q[1])score++;qi++;if(qi<QUIZ.length)quiz();else{missionCompleteSound();el("#quizBody").innerHTML=`<span class="eyebrow">✦ MISIÓN COMPLETADA</span><h2>${score}/${QUIZ.length}</h2><p style="color:#9fa2b4">Nivel de agente ${score===3?"LEONIDA ELITE":score===2?"VICE CITY PRO":"ROOKIE"}. Tu experiencia sonora se ha desbloqueado.</p><div class="mission-result-badge">🏆 INSIGNIA ZONA GTA6TV</div><button class="neon-btn" id="again">REPETIR MISIÓN</button>`;el("#again").onclick=()=>{qi=0;score=0;quiz()}}})}
el("#quizBtn").onclick=()=>{qi=0;score=0;quiz();open("quizModal")};
function toast(t){const x=el("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2200)}

// ===== V3 immersion layer =====
const boot=el("#bootScreen");
window.addEventListener("load",()=>setTimeout(()=>boot.classList.add("done"),1550));
const particles=el("#cityParticles");
if(particles){
  for(let i=0;i<55;i++){const p=document.createElement("i");p.style.left=Math.random()*100+"%";p.style.top=(30+Math.random()*70)+"%";p.style.animationDelay=(Math.random()*6)+"s";p.style.animationDuration=(4+Math.random()*8)+"s";particles.appendChild(p)}
}
document.querySelectorAll("[data-scroll]").forEach(b=>b.addEventListener("click",()=>el("#"+b.dataset.scroll)?.scrollIntoView({behavior:"smooth"})));
const tickers=["EXTENDED LOOK · ROCKSTAR GAMES","JASON + LUCIA · LEONIDA","VICE CITY · 19 NOV 2026","COMMUNITY NETWORK · ONLINE","VISUAL DATABASE · UPDATED"];
let ti=0; setInterval(()=>{ti=(ti+1)%tickers.length;el("#tickerText").textContent=tickers[ti]},3200);
setInterval(()=>{const h=80+Math.floor(Math.random()*18),a=["HIGH","MAX","ACTIVE"][Math.floor(Math.random()*3)];el("#heatValue").textContent=h+"%";el("#activityValue").textContent=a},1800);
document.addEventListener("keydown",e=>{
 if(e.key==="/"){e.preventDefault();open("searchModal");setTimeout(()=>el("#searchInput").focus(),80)}
 if(e.key.toLowerCase()==="g"){el("#gallery")?.scrollIntoView({behavior:"smooth"})}
 if(e.key.toLowerCase()==="m"){audioBtn.click()}
 if(e.key==="Escape")document.querySelectorAll(".modal.open").forEach(x=>x.classList.remove("open"));
});
