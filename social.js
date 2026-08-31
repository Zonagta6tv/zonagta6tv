/* ZonaGTA6TV Social Network — Supabase client */
(() => {
  const cfg = window.ZG_SUPABASE_URL || "";
  const key = window.ZG_SUPABASE_KEY || "";
  const ready = cfg.startsWith("http") && !key.includes("PEGA_AQUI") && key.length > 20;
  const $ = s => document.querySelector(s);
  let sb = null, currentUser = null, currentProfile = null;

  const esc = s => String(s ?? "").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const ago = d => {
    const sec = Math.max(1, Math.floor((Date.now()-new Date(d).getTime())/1000));
    if(sec<60) return `hace ${sec}s`; if(sec<3600) return `hace ${Math.floor(sec/60)}m`;
    if(sec<86400) return `hace ${Math.floor(sec/3600)}h`; return new Date(d).toLocaleDateString('es-CO',{day:'2-digit',month:'short',year:'numeric'});
  };
  const toast = msg => {
    let x=$('#socialToast'); if(!x){x=document.createElement('div');x.id='socialToast';x.className='social-notify';document.body.appendChild(x)}
    x.textContent=msg; clearTimeout(x._t); x._t=setTimeout(()=>x.remove(),3500);
  };
  const initials = p => esc((p?.display_name || p?.username || 'JG').slice(0,2).toUpperCase());
  const avatar = p => p?.avatar_url ? `<img class="social-avatar" src="${esc(p.avatar_url)}" alt="">` : `<div class="social-avatar">${initials(p)}</div>`;

  function modal(id, title, body){
    document.querySelectorAll('.social-modal').forEach(x=>x.remove());
    const d=document.createElement('div'); d.className='modal open social-modal'; d.id=id;
    d.innerHTML=`<div class="modal-card"><button class="close" data-social-close>×</button><h3>${title}</h3>${body}</div>`;
    d.addEventListener('click',e=>{if(e.target===d||e.target.matches('[data-social-close]'))d.remove()});
    document.body.appendChild(d); return d;
  }

  function authModal(){
    const d=modal('socialAuth','ZonaGTA6TV // ACCESO',`
      <div class="social-tabs"><button id="tabLogin" class="neon-btn">ENTRAR</button><button id="tabSignup" class="ghost-btn">CREAR CUENTA</button></div>
      <label>Email</label><input id="authEmail" type="email" autocomplete="email" placeholder="tu@email.com">
      <label>Contraseña</label><input id="authPass" type="password" autocomplete="current-password" placeholder="Mínimo 6 caracteres">
      <div id="usernameWrap" hidden><label>Nombre de usuario</label><input id="authUsername" maxlength="30" placeholder="ej: CarlosGTA"></div>
      <div id="displayWrap" hidden><label>Nombre visible</label><input id="authDisplay" maxlength="60" placeholder="Carlos"></div>
      <div class="modal-actions"><button class="neon-btn" id="authSubmit">ENTRAR</button></div>
      <div id="authMsg"></div>`);
    let signup=false;
    const toggle=()=>{
      signup=!signup; $('#usernameWrap').hidden=!signup; $('#displayWrap').hidden=!signup;
      $('#authSubmit').textContent=signup?'CREAR CUENTA':'ENTRAR'; $('#tabLogin').className=signup?'ghost-btn':'neon-btn'; $('#tabSignup').className=signup?'neon-btn':'ghost-btn';
      $('#authMsg').textContent='';
    };
    $('#tabLogin').onclick=()=>{if(signup)toggle()}; $('#tabSignup').onclick=()=>{if(!signup)toggle()};
    $('#authSubmit').onclick=async()=>{
      const email=$('#authEmail').value.trim(), password=$('#authPass').value;
      const msg=$('#authMsg'); msg.className='';
      if(!email||password.length<6){msg.className='social-error';msg.textContent='Escribe un email válido y una contraseña de al menos 6 caracteres.';return}
      $('#authSubmit').disabled=true;
      try{
        if(signup){
          const username=$('#authUsername').value.trim().toLowerCase().replace(/[^a-z0-9_]/g,'');
          const display=$('#authDisplay').value.trim()||username;
          if(username.length<3){throw new Error('El nombre de usuario debe tener al menos 3 caracteres.')}
          const {data,error}=await sb.auth.signUp({email,password,options:{data:{username,display_name:display}}});
          if(error)throw error;
          if(data.session){d.remove(); await loadUser()} else {msg.className='social-success';msg.textContent='Cuenta creada. Revisa tu correo para confirmar la cuenta y luego inicia sesión.'}
        }else{
          const {error}=await sb.auth.signInWithPassword({email,password}); if(error)throw error;
          d.remove(); await loadUser();
        }
      }catch(e){msg.className='social-error';msg.textContent=e.message||'No se pudo completar la operación.'}
      finally{$('#authSubmit').disabled=false}
    };
  }

  function profileModal(){
    if(!currentProfile)return;
    const d=modal('socialProfile','MI PERFIL',`
      ${avatar(currentProfile)}
      <label>Nombre visible</label><input id="profDisplay" maxlength="60" value="${esc(currentProfile.display_name)}">
      <label>Usuario</label><input disabled value="@${esc(currentProfile.username)}">
      <label>Biografía</label><input id="profBio" maxlength="160" value="${esc(currentProfile.bio||'')}">
      <div class="modal-actions"><button class="neon-btn" id="saveProfile">GUARDAR CAMBIOS</button><button class="ghost-btn" id="logout">CERRAR SESIÓN</button></div>
      <div id="profMsg"></div>`);
    $('#saveProfile').onclick=async()=>{
      const {error}=await sb.from('profiles').update({display_name:$('#profDisplay').value.trim()||currentProfile.username,bio:$('#profBio').value.trim()}).eq('id',currentUser.id);
      if(error){$('#profMsg').className='social-error';$('#profMsg').textContent=error.message;return}
      d.remove(); await loadUser(); toast('Perfil actualizado.');
    };
    $('#logout').onclick=async()=>{await sb.auth.signOut();d.remove();await loadUser();toast('Sesión cerrada.')}
  }

  async function loadUser(){
    const {data:{user}}=await sb.auth.getUser(); currentUser=user||null;
    if(currentUser){
      let {data,error}=await sb.from('profiles').select('*').eq('id',currentUser.id).single();
      if(error||!data){
        await new Promise(r=>setTimeout(r,400));
        ({data}=await sb.from('profiles').select('*').eq('id',currentUser.id).single());
      }
      currentProfile=data;
    } else currentProfile=null;
    const login=$('#socialLoginBtn'), profile=$('#socialProfileBtn'), form=$('#postForm'), box=$('#socialUserBox'), status=$('#socialStatus');
    if(login){login.textContent=currentUser?'CERRAR SESIÓN':'INICIAR SESIÓN';login.onclick=async()=>currentUser?(await sb.auth.signOut(),await loadUser()):authModal()}
    if(profile){profile.hidden=!currentUser;profile.onclick=profileModal}
    if(form)form.hidden=!currentUser;
    if(box){box.hidden=!currentUser;box.innerHTML=currentProfile?`${avatar(currentProfile)} <strong>@${esc(currentProfile.username)}</strong><br><small>${esc(currentProfile.bio||'Sin biografía')}</small>`:''}
    if(status)status.textContent=currentUser?`Conectado como @${currentProfile?.username||currentUser.email}. Ya puedes publicar y participar.`:'Conecta tu cuenta para publicar, comentar, dar likes y seguir a otros fans.';
    await renderFeed();
  }

  async function renderFeed(){
    const out=$('#socialFeed'); if(!out)return;
    if(!ready){out.innerHTML='<div class="social-empty"><strong>Supabase aún no está conectado.</strong><br>Abre <code>supabase-config.js</code> y coloca la URL y la clave pública de tu proyecto.</div>';return}
    out.innerHTML='<div class="social-loading">Cargando publicaciones...</div>';
    const {data:posts,error}=await sb.from('posts').select('id,user_id,content,image_url,created_at,profiles:user_id(id,username,display_name,avatar_url)').order('created_at',{ascending:false}).limit(30);
    if(error){out.innerHTML=`<div class="social-empty">No se pudo cargar el feed.<br><small>${esc(error.message)}</small></div>`;return}
    if(!posts?.length){out.innerHTML='<div class="social-empty">Todavía no hay publicaciones. Sé el primero en entrar a la red.</div>';return}
    const ids=posts.map(p=>p.id);
    const [{data:likes},{data:comments}]=await Promise.all([
      sb.from('post_likes').select('post_id,user_id').in('post_id',ids),
      sb.from('comments').select('id,post_id,user_id,content,created_at,profiles:user_id(username,display_name)').in('post_id',ids).order('created_at',{ascending:true})
    ]);
    const likeMap={},commentMap={};
    (likes||[]).forEach(x=>(likeMap[x.post_id]??=[]).push(x));
    (comments||[]).forEach(x=>(commentMap[x.post_id]??=[]).push(x));
    out.innerHTML=`<div class="social-feed">${posts.map(p=>{
      const pr=p.profiles||{}, ls=likeMap[p.id]||[], cs=commentMap[p.id]||[], liked=!!currentUser&&ls.some(x=>x.user_id===currentUser.id);
      return `<article class="social-card" data-post="${p.id}">
        <div class="social-author">${avatar(pr)}<div><strong>${esc(pr.display_name||pr.username)}</strong><small>@${esc(pr.username||'jugador')} · ${ago(p.created_at)}</small></div></div>
        <div class="social-content">${esc(p.content)}</div>
        ${p.image_url?`<img src="${esc(p.image_url)}" alt="" style="max-width:100%;border-radius:10px">`:''}
        <div class="social-actions"><button data-like="${p.id}" class="${liked?'liked':''}">♥ ${ls.length}</button><button data-comment-focus="${p.id}">💬 ${cs.length}</button>${currentUser&&currentUser.id!==p.user_id?`<button data-follow="${p.user_id}">＋ SEGUIR</button>`:''}</div>
        <div class="social-comments">${cs.slice(-10).map(c=>`<div class="social-comment"><b>${esc(c.profiles?.display_name||c.profiles?.username||'Usuario')}</b><small>${ago(c.created_at)}</small><div>${esc(c.content)}</div></div>`).join('')}
        ${currentUser?`<form class="comment-form" data-comment="${p.id}"><input maxlength="1000" placeholder="Escribe un comentario..."><button>ENVIAR</button></form>`:`<small>Inicia sesión para comentar.</small>`}</div>
      </article>`;
    }).join('')}</div>`;
    out.querySelectorAll('[data-like]').forEach(b=>b.onclick=()=>toggleLike(b.dataset.like));
    out.querySelectorAll('[data-comment-focus]').forEach(b=>b.onclick=()=>out.querySelector(`form[data-comment="${b.dataset.comment}"] input`)?.focus());
    out.querySelectorAll('[data-comment]').forEach(f=>f.onsubmit=async e=>{e.preventDefault();await addComment(f.dataset.comment,f.querySelector('input').value,f.querySelector('input'))});
    out.querySelectorAll('[data-follow]').forEach(b=>b.onclick=()=>follow(b.dataset.follow,b));
  }

  async function toggleLike(postId){
    if(!currentUser){authModal();return}
    const {data}=await sb.from('post_likes').select('post_id').eq('post_id',postId).eq('user_id',currentUser.id).maybeSingle();
    if(data) await sb.from('post_likes').delete().eq('post_id',postId).eq('user_id',currentUser.id);
    else {const {error}=await sb.from('post_likes').insert({post_id:postId,user_id:currentUser.id});if(error)toast(error.message)}
    await renderFeed();
  }
  async function addComment(postId,content,input){
    content=content.trim();if(!content)return;if(!currentUser){authModal();return}
    const {error}=await sb.from('comments').insert({post_id:postId,user_id:currentUser.id,content});
    if(error)toast(error.message);else {input.value='';await renderFeed()}
  }
  async function follow(userId,button){
    if(!currentUser){authModal();return}
    const {data}=await sb.from('follows').select('follower_id').eq('follower_id',currentUser.id).eq('following_id',userId).maybeSingle();
    if(data){await sb.from('follows').delete().eq('follower_id',currentUser.id).eq('following_id',userId);button.textContent='＋ SEGUIR'}
    else {const {error}=await sb.from('follows').insert({follower_id:currentUser.id,following_id:userId});if(error)toast(error.message);else button.textContent='✓ SIGUIENDO'}
  }

  async function setupMapVotes(){
    const buttons=[...document.querySelectorAll('[data-vote]')];
    if(!buttons.length||!ready)return;
    // Remove the old localStorage handlers from app.js.
    buttons.forEach(b=>{const c=b.cloneNode(true);b.replaceWith(c)});
    const fresh=[...document.querySelectorAll('[data-vote]')];
    const render=async()=>{
      const {data,error}=await sb.from('map_votes').select('region,user_id');
      if(error)return;
      const counts={};(data||[]).forEach(v=>counts[v.region]=(counts[v.region]||0)+1);
      const total=Object.values(counts).reduce((a,b)=>a+b,0);
      const voteTotal=$('#voteTotal'); if(voteTotal) voteTotal.textContent=total;
      fresh.forEach(b=>b.classList.toggle('voted',(data||[]).some(v=>v.region===b.dataset.vote&&v.user_id===currentUser?.id)));
      // If the project uses an older schema without user_id in select, fetch current vote separately below.
      fresh.forEach(b=>{const n=b.querySelector('[data-vote-count]');if(n)n.textContent=counts[b.dataset.vote]||0});
    };
    fresh.forEach(b=>b.addEventListener('click',async()=>{
      if(!currentUser){authModal();return}
      const region=b.dataset.vote;
      const {data}=await sb.from('map_votes').select('id').eq('region',region).eq('user_id',currentUser.id).maybeSingle();
      if(data){await sb.from('map_votes').delete().eq('id',data.id);toast('Voto retirado.')}
      else {const {error}=await sb.from('map_votes').insert({region,user_id:currentUser.id});if(error)toast(error.message);else toast('¡Voto registrado!')}
      await render();
    }));
    await render();
  }

  function init(){
    if(!ready){
      const s=$('#socialStatus'); if(s)s.textContent='La interfaz social está instalada. Falta conectar las credenciales públicas de Supabase en supabase-config.js.';
      return;
    }
    sb=window.supabase.createClient(cfg,key);
    const form=$('#postForm'), area=$('#postContent'), count=$('#postCount');
    area?.addEventListener('input',()=>count.textContent=`${area.value.length} / 2000`);
    form?.addEventListener('submit',async e=>{
      e.preventDefault();const content=area.value.trim();if(!content)return;
      const {error}=await sb.from('posts').insert({user_id:currentUser.id,content});
      if(error)toast(error.message);else{area.value='';count.textContent='0 / 2000';await renderFeed();toast('Publicación creada.')}
    });
    sb.auth.onAuthStateChange(()=>setTimeout(loadUser,0));
    loadUser();
    setupMapVotes();
  }
  document.addEventListener('DOMContentLoaded',init);
})();