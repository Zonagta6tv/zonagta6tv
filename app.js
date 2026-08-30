const cfg=window.ZGTA_CONFIG||{};
const configured=cfg.SUPABASE_URL && !cfg.SUPABASE_URL.includes("PEGA_AQUI") && cfg.SUPABASE_ANON_KEY && !cfg.SUPABASE_ANON_KEY.includes("PEGA_AQUI");
const sb=configured?supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY):null;
let user=null, profile=null, channel=null, liked=new Set();

const $=id=>document.getElementById(id);
function toast(s){$("toast").textContent=s;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2800)}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function initials(p){return ((p?.first_name||p?.username||"G")[0]||"G").toUpperCase()}
function openModal(html){$("modalContent").innerHTML=html;$("modal").classList.remove("hidden")}
function closeModal(){$("modal").classList.add("hidden")}

const loginForm=()=>`<h2>Iniciar sesión</h2><div class="sub">Entra a tu cuenta de ZonaGTA6TV.</div><button class="google" id="google">Continuar con Google</button><div class="or">o con email</div><div class="field"><label>Email</label><input id="liEmail" type="email"></div><div class="field"><label>Contraseña</label><input id="liPass" type="password"></div><button class="primary full" id="doLogin">Iniciar sesión</button><p class="fine">¿Aún no tienes cuenta? <a href="#" id="toSignup">Crear cuenta</a></p>`;
const signupForm=()=>`<h2>Crear tu cuenta</h2><div class="sub">Únete a la comunidad de GTA 6.</div><button class="google" id="google">Continuar con Google</button><div class="or">o con email</div><div class="row"><div class="field"><label>Nombre</label><input id="suFirst"></div><div class="field"><label>Apellido</label><input id="suLast"></div></div><div class="field"><label>Nombre de usuario</label><input id="suUser" maxlength="24" placeholder="sin espacios"></div><div class="field"><label>Fecha de nacimiento</label><input id="suBirth" type="date"></div><div class="field"><label>País o región</label><select id="suCountry"><option>Colombia</option><option>México</option><option>Argentina</option><option>Chile</option><option>España</option><option>Estados Unidos</option><option>Otro</option></select></div><div class="field"><label>Email</label><input id="suEmail" type="email"></div><div class="field"><label>Contraseña</label><input id="suPass" type="password" minlength="8"></div><label style="font-size:12px;color:#aeb7c4"><input id="suTerms" type="checkbox"> Acepto términos, privacidad y normas de la comunidad.</label><button class="primary full" id="doSignup" style="margin-top:12px">Crear cuenta</button><p class="fine">La fecha de nacimiento se solicita para aplicar las reglas de edad de la plataforma. Nunca guardes la contraseña fuera del proveedor de autenticación.</p>`;

function wireAuth(){
$("google").onclick=google;
if($("doLogin")) $("doLogin").onclick=login;
if($("doSignup")) $("doSignup").onclick=signup;
if($("toSignup")) $("toSignup").onclick=e=>{e.preventDefault();openSignup()}
}
async function google(){
 if(!sb)return toast("Configura Supabase primero.");
 const {error}=await sb.auth.signInWithOAuth({provider:"google",options:{redirectTo:location.href}});
 if(error)toast(error.message);
}
async function login(){
 const email=$("liEmail").value.trim(),password=$("liPass").value;
 const {error}=await sb.auth.signInWithPassword({email,password});
 if(error)toast(error.message);else{closeModal();toast("Sesión iniciada");}
}
async function signup(){
 if(!$("suTerms").checked)return toast("Debes aceptar las normas.");
 const username=$("suUser").value.trim().toLowerCase().replace(/[^a-z0-9_]/g,"");
 if(username.length<3)return toast("El usuario debe tener al menos 3 caracteres.");
 const data={first_name:$("suFirst").value.trim(),last_name:$("suLast").value.trim(),username,birth_date:$("suBirth").value,country:$("suCountry").value};
 const {data:r,error}=await sb.auth.signUp({email:$("suEmail").value.trim(),password:$("suPass").value,data});
 if(error)toast(error.message);else{closeModal();toast(r.session?"Cuenta creada":"Cuenta creada. Revisa tu email para confirmar.");}
}
function openLogin(){if(!configured)return toast("Abre config.js y configura Supabase.");openModal(loginForm());wireAuth()}
function openSignup(){if(!configured)return toast("Abre config.js y configura Supabase.");openModal(signupForm());wireAuth()}
$("openLogin").onclick=openLogin;$("openSignup").onclick=openSignup;$("join").onclick=openSignup;$("closeModal").onclick=closeModal;
$("modal").onclick=e=>{if(e.target===$("modal"))closeModal()};
$("logout").onclick=async()=>{await sb.auth.signOut();toast("Sesión cerrada")};

async function loadProfile(){
 if(!user){profile=null;return}
 const {data,error}=await sb.from("profiles").select("*").eq("id",user.id).maybeSingle();
 if(error)console.error(error); profile=data;
 if(!profile && user.user_metadata?.username){
   const {data:p}=await sb.from("profiles").insert({id:user.id,username:user.user_metadata.username,first_name:user.user_metadata.first_name||"",last_name:user.user_metadata.last_name||"",birth_date:user.user_metadata.birth_date||null,country:user.user_metadata.country||null}).select().single();
   profile=p;
 }
 renderUser();
}
function renderUser(){
 const p=profile||user?.user_metadata;
 $("meName").textContent=p?(p.first_name?`${p.first_name} ${p.last_name||""}`.trim():p.username||"Usuario"):"Invitado";
 $("meHandle").textContent=p?`@${p.username||"usuario"}`:"@invitado";
 $("composerAvatar").textContent=initials(p);
 $("openLogin").classList.toggle("hidden",!!user);$("openSignup").classList.toggle("hidden",!!user);$("logout").classList.toggle("hidden",!user);
 $("publish").disabled=!user;$("postHint").textContent=user?"Comparte con la comunidad.":"Inicia sesión para publicar.";
 $("authNotice").classList.toggle("hidden",!!user);
 $("chatInput").disabled=!user;$("chatForm button").disabled=!user;$("chatStatus").textContent=user?"🟢 Conectado":"Inicia sesión";
}

async function loadFeed(){
 if(!sb){$("feed").innerHTML=`<div class="card"><b>Vista previa de ZonaGTA6TV</b><p class="muted">Configura Supabase para cargar el feed real.</p></div>`;return}
 const {data,error}=await sb.from("posts").select("id,body,created_at,user_id,profiles(username,first_name,last_name)").order("created_at",{ascending:false}).limit(50);
 if(error){$("feed").innerHTML=`<div class="card">No se pudo cargar el feed: ${esc(error.message)}</div>`;return}
 $("postCount").textContent=data.length;liked=new Set();
 if(user){const ids=data.map(x=>x.id);if(ids.length){const r=await sb.from("likes").select("post_id").eq("user_id",user.id).in("post_id",ids);(r.data||[]).forEach(x=>liked.add(x.post_id))}}
 $("feed").innerHTML=data.map(renderPost).join("");
 for(const p of data){const c=await sb.from("comments").select("id,body,created_at,profiles(username)").eq("post_id",p.id).order("created_at",{ascending:true}).limit(20);const box=document.querySelector(`[data-comments="${p.id}"]`);if(box)box.innerHTML=(c.data||[]).map(x=>`<div class="comment"><b>@${esc(x.profiles?.username||"usuario")}</b> ${esc(x.body)}</div>`).join("")||'<small>Aún no hay comentarios.</small>'}
}
function renderPost(p){
 const name=p.profiles?.first_name?`${p.profiles.first_name} ${p.profiles.last_name||""}`.trim():p.profiles?.username||"Usuario";
 return `<article class="post"><div class="postHead"><div class="avatar">${esc((p.profiles?.username||"U")[0].toUpperCase())}</div><div><div class="postName">${esc(name)}</div><div class="postHandle">@${esc(p.profiles?.username||"usuario")} · <span class="time">${new Date(p.created_at).toLocaleString("es-CO")}</span></div></div></div><div class="postBody">${esc(p.body)}</div><div class="postActions"><button class="${liked.has(p.id)?"liked":""}" onclick="likePost(${p.id},this)">♥ Me gusta</button><button onclick="toggleComments(${p.id})">💬 Comentar</button><button onclick="copyPost(${p.id})">↗ Compartir</button></div><div class="comments" id="comments-${p.id}" style="display:none"><div data-comments="${p.id}"></div>${user?`<form class="commentForm" onsubmit="commentPost(event,${p.id})"><input id="comment-${p.id}" maxlength="500" placeholder="Escribe un comentario…"><button class="primary">Enviar</button></form>`:`<small>Inicia sesión para comentar.</small>`}</div></article>`
}
window.toggleComments=id=>{const x=$(`comments-${id}`);x.style.display=x.style.display==="none"?"block":"none"}
window.likePost=async(id,b)=>{if(!user)return openLogin();const r=await sb.from("likes").select("post_id").eq("post_id",id).eq("user_id",user.id).maybeSingle();if(r.data){await sb.from("likes").delete().eq("post_id",id).eq("user_id",user.id);liked.delete(id);b.classList.remove("liked")}else{await sb.from("likes").insert({post_id:id,user_id:user.id});liked.add(id);b.classList.add("liked")}}
window.commentPost=async(e,id)=>{e.preventDefault();const i=$(`comment-${id}`),v=i.value.trim();if(!v)return;const {error}=await sb.from("comments").insert({post_id:id,user_id:user.id,body:v});if(error)toast(error.message);else{i.value="";toast("Comentario publicado");loadFeed()}}
window.copyPost=async id=>{const u=location.href.split("#")[0]+`#post-${id}`;try{await navigator.clipboard.writeText(u);toast("Enlace copiado")}catch{toast(u)}}
$("publish").onclick=async()=>{const body=$("postBody").value.trim();if(!body)return;if(!user)return openLogin();const {error}=await sb.from("posts").insert({user_id:user.id,body});if(error)toast(error.message);else{$("postBody").value="";toast("Publicación creada");loadFeed()}};

async function loadChat(){
 if(!sb||!user){$("messages").innerHTML='<div class="msg">Inicia sesión para entrar al chat.</div>';return}
 const {data}=await sb.from("messages").select("id,body,created_at,user_id,profiles(username)").eq("room","general").order("created_at",{ascending:true}).limit(100);
 $("messages").innerHTML=(data||[]).map(m=>`<div class="msg ${m.user_id===user.id?"me":""}"><b>@${esc(m.profiles?.username||"usuario")}</b><br>${esc(m.body)}</div>`).join("");
 $("messages").scrollTop=999999;
 if(channel)sb.removeChannel(channel);
 channel=sb.channel("zgta-chat").on("postgres_changes",{event:"INSERT",schema:"public",table:"messages",filter:"room=eq.general"},async()=>loadChat()).subscribe();
}
$("chatForm").onsubmit=async e=>{e.preventDefault();if(!user)return;const v=$("chatInput").value.trim();if(!v)return;const {error}=await sb.from("messages").insert({user_id:user.id,body:v,room:"general"});if(error)toast(error.message);$("chatInput").value=""};

async function init(){
 if(!configured){$("setup").classList.remove("hidden");renderUser();loadFeed();return}
 const {data}=await sb.auth.getSession();user=data.session?.user||null;await loadProfile();renderUser();await loadFeed();await loadChat();
 sb.auth.onAuthStateChange(async(_e,s)=>{user=s?.user||null;await loadProfile();renderUser();await loadFeed();await loadChat()});
 // Realtime feed refresh
 sb.channel("zgta-feed").on("postgres_changes",{event:"*",schema:"public",table:"posts"},()=>loadFeed()).subscribe();
}
init();
