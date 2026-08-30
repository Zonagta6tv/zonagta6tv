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
function renderNews(filter="todos"){const labels=["VI","VICE","LEÓNIDA","J+L","MEDIA","ZONA"];el("#newsCards").innerHTML=NEWS.filter(n=>filter==="todos"||n[5]===filter).map((n,i)=>`<article class="card" data-category="${n[5]}"><div class="art"><b>${labels[i%labels.length]}</b></div><div class="card-body"><div class="meta">${n[0]} · ${n[1]}</div><h3>${n[2]}</h3><p>${n[3]}</p><button class="read" data-article="official">ABRIR ARTÍCULO →</button></div></article>`).join("")}renderNews();
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

// Comentarios locales: funcionan sin backend. Para comentarios públicos reales, configura Utterances.
const KEY="zonagta6tv_v2_comments";
let comments=JSON.parse(localStorage.getItem(KEY)||"[]");
function render(){el("#commentCount").textContent=`${comments.length} comentario${comments.length===1?"":"s"}`;el("#comments").innerHTML=comments.length?comments.slice().reverse().map(c=>`<div class="comment"><b>${esc(c.name)}</b><time>${new Date(c.time).toLocaleString("es-CO")}</time><p>${esc(c.text)}</p></div>`).join(""):"<p style='color:#717588'>Sé la primera persona en comentar.</p>"}render();
el("#commentForm").addEventListener("submit",e=>{e.preventDefault();comments.push({name:el("#name").value.trim(),text:el("#message").value.trim(),time:Date.now()});localStorage.setItem(KEY,JSON.stringify(comments));e.target.reset();render();toast("Comentario publicado en este navegador.")});
el("#clearComments").onclick=()=>{comments=[];localStorage.removeItem(KEY);render();toast("Comentarios locales eliminados.")};

// Cambia este valor por "usuario/repositorio" para activar comentarios públicos reales con Utterances.
const UTTERANCES_REPO="TU_USUARIO/TU_REPOSITORIO";
if(!UTTERANCES_REPO.startsWith("TU_")){
  const s=document.createElement("script");s.src="https://utteranc.es/client.js";s.async=true;s.crossOrigin="anonymous";
  s.setAttribute("repo",UTTERANCES_REPO);s.setAttribute("issue-term","pathname");s.setAttribute("theme","github-dark");
  el("#utterances").replaceChildren(s);
}

// Música original ambiental incluida en el ZIP. No es la banda sonora de GTA VI.
const audio=el("#ambientAudio"), audioBtn=el("#audioBtn");
audio.volume=.18;
audioBtn.onclick=async()=>{try{if(audio.paused){await audio.play();audioBtn.classList.add("active");audioBtn.textContent="♫";toast("Ambiente futurista activado.");}else{audio.pause();audioBtn.classList.remove("active");toast("Ambiente pausado.");}}catch{toast("El navegador bloqueó el audio. Pulsa de nuevo.")}};

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
function quiz(){const q=QUIZ[qi];el("#quizBody").innerHTML=`<span class="eyebrow">QUIZ GTA6</span><h2>${q[0]}</h2>${q[2].map(a=>`<button class="neon-btn" style="width:100%;margin:6px 0" data-answer="${esc(a)}">${esc(a)}</button>`).join("")}`;el("#quizBody").querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>{if(b.dataset.answer===q[1])score++;qi++;if(qi<QUIZ.length)quiz();else{el("#quizBody").innerHTML=`<span class="eyebrow">RESULTADO</span><h2>${score}/${QUIZ.length}</h2><p style="color:#9fa2b4">Nivel de agente ${score===3?"LEONIDA ELITE":score===2?"VICE CITY PRO":"ROOKIE"}.</p><button class="neon-btn" id="again">REPETIR QUIZ</button>`;el("#again").onclick=()=>{qi=0;score=0;quiz()}}})}
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
