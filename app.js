const NEWS=[
["OFICIAL","27 AGO 2026","Rockstar presenta un Extended Look de GTA VI","La mirada extendida fue publicada el 27 de agosto de 2026 y está capturada con metraje del juego en PlayStation 5.","ROCKSTAR"],
["LANZAMIENTO","ACTUAL","GTA VI mantiene su lanzamiento para el 19 de noviembre de 2026","La página oficial de Rockstar mantiene la fecha y las plataformas PlayStation 5 y Xbox Series X|S.","OFICIAL"],
["MUNDO","ACTUAL","Leonida y Vice City concentran el nuevo universo","Rockstar describe una conspiración criminal que se extiende por todo el estado ficticio de Leonida.","ROCKSTAR"],
["PERSONAJES","OFICIAL","Jason y Lucia son el eje de la historia","La información oficial presenta a ambos como una pareja obligada a depender uno del otro para sobrevivir.","ROCKSTAR"],
["MEDIA","27 AGO 2026","El nuevo metraje amplía la lectura del mundo","El Extended Look añade contexto visual sobre actividades, lugares y personajes.","ANÁLISIS"],
["COMUNIDAD","HOY","La cuenta atrás entra en tramo decisivo","El portal reúne noticias, guías y debates para seguir el lanzamiento.","ZONA GTA6TV"]
];
const BLOG=[["DOSSIER 01","El estado de Leonida","Qué sabemos de Vice City, los Cayos y el resto del escenario según Rockstar."],["DOSSIER 02","Jason + Lucia","La ficha de protagonistas y la historia de una pareja atrapada en una conspiración."],["DOSSIER 03","Cómo leer un rumor","Un método para separar anuncio oficial, reporte periodístico y filtración no verificada."]];
const GUIDES=[["01","Guía de fuentes","Cómo reconocer una noticia oficial de Rockstar."],["02","Guía de personajes","Jason, Lucia y las figuras de Leonida."],["03","Guía anti-spoilers","Cómo seguir GTA VI sin arruinarte la historia."],["04","Guía de lanzamiento","Checklist para el día uno y los primeros descubrimientos."]];
const LEAKS=[["ALTA","Rumores de gameplay","Tras nuevas demostraciones, la comunidad analiza sistemas visibles. Son interpretaciones de terceros, no confirmaciones."],["MEDIA","Detalles supuestamente vistos en material no autorizado","Existen afirmaciones online sobre funciones internas. El portal no aloja ni enlaza archivos filtrados."],["BAJA","Predicciones de próximos anuncios","Hipótesis de fans sobre campañas, tráilers o nuevas revelaciones."]];
const ARTICLE=`<span class="eyebrow">DOSSIER LEONIDA</span><h2>El futuro se siente vivo.</h2><p>Rockstar sitúa GTA VI en el estado ficticio de Leonida, con Vice City como centro del relato. La información oficial también presenta a Jason Duval y Lucia como protagonistas atrapados en una conspiración criminal que se extiende por el estado.</p><p>Esta V2 está pensada como una experiencia visual primero y un portal útil después: noticias, editoriales, guías, galería, rumores etiquetados y comunidad.</p><p><strong>Regla editorial:</strong> lo confirmado se presenta como confirmado; el rumor se etiqueta como rumor.</p>`;
const el=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
el("#newsCards").innerHTML=NEWS.map((n,i)=>`<article class="card"><div class="art"><b>${["VI","VICE","LEONIDA","J+L","EXT","LIVE"][i]}</b></div><div class="card-body"><div class="meta">${n[0]} · ${n[1]}</div><h3>${n[2]}</h3><p>${n[3]}</p><button class="read" data-article="official">ABRIR DOSSIER →</button></div></article>`).join("");
el("#blogCards").innerHTML=BLOG.map(x=>`<article class="story"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("");
el("#guideCards").innerHTML=GUIDES.map(x=>`<article class="guide"><div class="n">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("");
el("#leakCards").innerHTML=LEAKS.map((x,i)=>`<article class="leak"><div class="confidence ${i===0?"high":i===1?"mid":"low"}">● CONFIANZA ${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("");

const open=id=>el("#"+id).classList.add("open"), close=id=>el("#"+id).classList.remove("open");
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>close(b.dataset.close));
el("#openSearch").onclick=()=>open("searchModal"); el("#heroSearch").onclick=()=>open("searchModal");
el("#searchInput").addEventListener("input",e=>{const q=e.target.value.trim().toLowerCase(),out=el("#results");if(!q){out.innerHTML="";return}const f=NEWS.filter(n=>n.join(" ").toLowerCase().includes(q));out.innerHTML=f.length?f.map(n=>`<div class="search-item"><b>${esc(n[2])}</b><div style="color:#8e92a5;font-size:11px">${esc(n[3])}</div></div>`).join(""):"<p style='color:#787d90'>Sin resultados.</p>"});
document.querySelectorAll(".gallery-card").forEach(b=>b.onclick=()=>{el("#galleryFull").src=b.dataset.image;open("galleryModal")});
document.addEventListener("click",e=>{if(e.target.matches("[data-article]")){el("#articleBody").innerHTML=ARTICLE;open("articleModal")}});
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("open")}));

// Comentarios locales: funcionan sin backend. Para comentarios públicos reales, configura Utterances.
const KEY="zonagta6tv_v2_comments";
let comments=JSON.parse(localStorage.getItem(KEY)||"[]");
function render(){el("#commentCount").textContent=`${comments.length} comentario${comments.length===1?"":"s"}`;el("#comments").innerHTML=comments.length?comments.slice().reverse().map(c=>`<div class="comment"><b>${esc(c.name)}</b><time>${new Date(c.time).toLocaleString("es-CO")}</time><p>${esc(c.text)}</p></div>`).join(""):"<p style='color:#717588'>Sé el primero en comentar.</p>"}render();
el("#commentForm").addEventListener("submit",e=>{e.preventDefault();comments.push({name:el("#name").value.trim(),text:el("#message").value.trim(),time:Date.now()});localStorage.setItem(KEY,JSON.stringify(comments));e.target.reset();render();toast("Comentario local publicado.")});
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
