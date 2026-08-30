const NEWS=[
{tag:"OFICIAL",date:"27 AGO 2026",title:"Rockstar presenta un Extended Look de GTA VI",text:"La nueva presentación ofrece una mirada ampliada al mundo, personajes y situaciones de Vice City y Leonida."},
{tag:"LANZAMIENTO",date:"ACTUAL",title:"La fecha oficial sigue: 19 de noviembre de 2026",text:"Rockstar mantiene GTA VI para PlayStation 5 y Xbox Series X|S."},
{tag:"COMMUNITY",date:"30 AGO 2026",title:"El hype entra en fase final",text:"Con la campaña de marketing acelerándose, la comunidad analiza cada detalle mostrado y prepara la cuenta regresiva."},
{tag:"ANÁLISIS",date:"ESTUDIO",title:"Jason y Lucia: una dupla en el centro del caos",text:"El portal reúne la información oficial sobre los protagonistas y sus vínculos con el submundo de Leonida."},
{tag:"MUNDO",date:"ESTUDIO",title:"Vice City es solo una parte de Leonida",text:"El estado ficticio inspirado en Florida amplía el escenario más allá de la ciudad."},
{tag:"TECNOLOGÍA",date:"ESTUDIO",title:"Una ciudad diseñada para sentirse viva",text:"Actividades, tráfico, policía, fauna y rutinas ayudan a construir una experiencia dinámica."}
];
const BLOG=[
["01","¿Qué cambió en Vice City?","Una lectura visual del nuevo mapa y de cómo se siente la ciudad en 2026."],
["02","Jason + Lucia","Qué ha confirmado Rockstar sobre su historia, personalidad y relación."],
["03","El ecosistema de Leonida","Carreteras, costa, Cayos y zonas rurales: el mundo que rodea Vice City."]
];
const GUIDES=[
["01","Guía de exploración","Cómo organizar una ruta de descubrimiento cuando llegue el juego."],
["02","Guía de personajes","Ficha rápida para recordar quién es quién."],
["03","Guía de noticias","Cómo distinguir anuncio oficial, rumor y filtración."],
["04","Guía anti-spoilers","Buenas prácticas para disfrutar el lanzamiento sin arruinarte la historia."]
];
const RUMORS=[
["ALTA","Rumor sobre nuevos detalles de gameplay","Circulan comentarios de la comunidad tras el Extended Look. No se consideran confirmados hasta que Rockstar los publique."],
["MEDIA","Supuestas funciones vistas en material no autorizado","Existen afirmaciones de terceros sobre sistemas del juego. ZonaGTA6TV no aloja ni enlaza material robado."],
["BAJA","Predicciones sobre futuros anuncios","Especulación de fans y creadores. Útil para debatir, no para tratar como noticia."]
];
const ARTICLES={
world:`<span class="kicker">ANÁLISIS</span><h2>Leonida: más que una ciudad</h2><p>Rockstar sitúa GTA VI en el estado ficticio de Leonida, con Vice City como núcleo. El objetivo editorial de este portal es separar lo confirmado de lo especulativo y convertir cada nuevo anuncio en contexto útil para la comunidad.</p><p>La cobertura de ZonaGTA6TV priorizará fuentes oficiales, fechas claras y etiquetas visibles. Cuando aparezca un rumor, tendrá su propia categoría y nivel de confianza.</p><p><strong>Regla del Hub:</strong> si Rockstar no lo ha confirmado, no lo presentamos como hecho.</p>`
};

const newsGrid=document.querySelector("#newsGrid");
newsGrid.innerHTML=NEWS.map((n,i)=>`<article class="card tilt" data-search="${(n.title+" "+n.text+" "+n.tag).toLowerCase()}"><div class="card-art"><span class="art-word">${["VI","VICE","LEONIDA","J+L","MAP","LIVE"][i]}</span></div><div class="card-body"><div class="meta"><span>${n.tag}</span><span>${n.date}</span></div><h3>${n.title}</h3><p>${n.text}</p><button class="read read-article" data-article="world">ABRIR DOSSIER →</button></div></article>`).join("");
document.querySelector("#blogList").innerHTML=BLOG.map(x=>`<article class="blog-item"><b class="blog-num">${x[0]}</b><div><h3>${x[1]}</h3><p>${x[2]}</p></div></article>`).join("");
document.querySelector("#guideGrid").innerHTML=GUIDES.map(x=>`<article class="guide"><span class="num">${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("");
document.querySelector("#rumorGrid").innerHTML=RUMORS.map(x=>`<article class="rumor"><span class="confidence">● CONFIANZA ${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p><small>Actualizado: 30/08/2026</small></article>`).join("");

function countdown(){const target=new Date("2026-11-19T00:00:00-05:00"), now=new Date();let s=Math.max(0,Math.floor((target-now)/1000));let d=Math.floor(s/86400);s%=86400;let h=Math.floor(s/3600);s%=3600;let m=Math.floor(s/60);let sec=s%60;document.querySelector("#countdown").textContent=`${String(d).padStart(3,"0")}D ${String(h).padStart(2,"0")}H ${String(m).padStart(2,"0")}M ${String(sec).padStart(2,"0")}S`}countdown();setInterval(countdown,1000);

const toast=(t)=>{const e=document.querySelector("#toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2400)};
document.querySelector("#searchBtn").onclick=()=>document.querySelector("#searchModal").classList.add("open");
document.querySelector("#menuBtn").onclick=()=>document.querySelector("#nav").classList.toggle("open");
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>document.getElementById(b.dataset.close).classList.remove("open"));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("open")}));
document.addEventListener("click",e=>{const b=e.target.closest(".read-article");if(!b)return;document.querySelector("#articleContent").innerHTML=ARTICLES[b.dataset.article]||ARTICLES.world;document.querySelector("#articleModal").classList.add("open")});
document.querySelector("#searchInput").addEventListener("input",e=>{const q=e.target.value.trim().toLowerCase();const r=document.querySelector("#searchResults");if(!q){r.innerHTML="<p style='color:#777'>Escribe algo para buscar.</p>";return}const found=NEWS.filter(n=>(n.title+" "+n.text+" "+n.tag).toLowerCase().includes(q));r.innerHTML=found.length?found.map(n=>`<div class="search-result"><strong>${n.title}</strong><div style="color:#888;font-size:12px">${n.text}</div></div>`).join(""):"<p style='color:#777'>No encontramos resultados en esta versión.</p>"});

const KEY="zonagta6tv_comments_v1";let comments=JSON.parse(localStorage.getItem(KEY)||"[]");
function esc(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function renderComments(){const el=document.querySelector("#comments");document.querySelector("#commentCount").textContent=`${comments.length} comentarios`;el.innerHTML=comments.length?comments.slice().reverse().map(c=>`<div class="comment"><strong>${esc(c.name)}</strong><time>${new Date(c.time).toLocaleString("es-CO")}</time><p>${esc(c.text)}</p></div>`).join(""):"<p style='color:#6f6a7b'>Todavía no hay comentarios. Sé el primero.</p>"}renderComments();
document.querySelector("#commentForm").addEventListener("submit",e=>{e.preventDefault();const name=document.querySelector("#commentName").value.trim(),text=document.querySelector("#commentText").value.trim();if(!name||!text)return;comments.push({name,text,time:Date.now()});localStorage.setItem(KEY,JSON.stringify(comments));e.target.reset();renderComments();toast("Mensaje publicado en tu dispositivo.")});
document.querySelector("#clearComments").onclick=()=>{comments=[];localStorage.removeItem(KEY);renderComments();toast("Comentarios locales borrados.")};

if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.querySelectorAll(".tilt").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateY(-3px)`});el.addEventListener("pointerleave",()=>el.style.transform="")})}
window.addEventListener("load",()=>setTimeout(()=>document.querySelector("#boot").classList.add("hide"),450));
