/* MTH 105 lesson page: one lecture = one page.
   Each topic follows the same pattern: Definition → Around us → Formula, solved step by step → What it means.
   The lecture ends with Takeaways and Practice.
   Learning supports (assets/supports.js) can split the page into sections or parts, and turn on the voice.
   Needs course.js (widgets W, theme) loaded first. */
(function(){
  const W=window.Lecture.W, esc=W.esc;
  const LS=window.LearningSupports||{on:()=>false,get:()=>null};
  const PARTS={def:'Definition',life:'Around us',formula:'Formula · solve it step by step',meaning:'What it means'};
  const el=(t,a={},html='')=>{ const e=document.createElement(t); Object.entries(a).forEach(([k,v])=>e.setAttribute(k,v)); if(html) e.innerHTML=html; return e; };

  function figure(f){ const fig=el('figure',{class:'lfig'}); if(f.label) fig.appendChild(el('span',{class:'eyebrow'},esc(f.label)));
    const body=el('div'); if(f.html) body.innerHTML=f.html; fig.appendChild(body);
    if(f.caption) fig.appendChild(el('figcaption',{class:'caption'},f.caption));
    if(f.mindmap) W.mindmap(body,f.mindmap); if(f.flow) W.flow(body,f.flow,{});
    return {fig,build:()=>{ if(f.build) f.build(body,W); }}; }

  function part(kind,text,f,builds){
    const p=el('div',{class:'lpart lp-'+kind,'data-part':kind});
    p.appendChild(el('span',{class:'ltag'},PARTS[kind]));
    const row=el('div',{class:'lrow'+(f?'':' nofig')});
    if(text){ const t=el('div',{class:'ltext say'}); t.innerHTML=text; row.appendChild(t); }
    if(f){ const F=figure(f); row.appendChild(F.fig); builds.push(F.build); }
    p.appendChild(row); return p;
  }

  window.Lesson={ mount(cfg){ window.__LESSON=cfg;
    document.title=cfg.pageTitle||document.title;
    document.body.classList.add('lesson');
    const builds=[];
    /* top bar: back link, contents, voice, theme */
    const bar=el('header',{class:'lbar'});
    const secs=cfg.topics.map(t=>({id:t.id,t:t.title})).concat(cfg.inClass?[{id:'in-class',t:'In class'}]:[]).concat([{id:'takeaways',t:'Takeaways'},{id:'practice',t:'Practice'}]);
    bar.innerHTML=`<div class="lbar-in"><a class="brand" href="${cfg.home||'lectures.html'}"><b>MTH 105</b><span>← Lectures · Week ${cfg.week}</span></a>
      <nav class="lchips" aria-label="In this lecture">${secs.map((s,i)=>`<a href="#${s.id}" data-id="${s.id}"><span>${i+1}</span>${esc(s.t)}</a>`).join('')}</nav>
      <div class="lctl">${LS.on('voice')?'<button type="button" class="pill listen" id="listen">▶ Listen</button>':''}<button type="button" class="pill" id="theme" title="Light or dark">◐</button></div></div><div class="progress"><i></i></div>`;
    document.body.appendChild(bar);
    bar.querySelector('#theme').addEventListener('click',()=>GED102Theme.toggle());

    const main=el('main',{class:'lmain'});
    const head=el('section',{class:'lhead',id:'top'});
    head.innerHTML=`<span class="eyebrow">Week ${cfg.week} · ${esc(cfg.clo)}</span><h1>${esc(cfg.title)}</h1>
      <p class="lmeta">${esc(cfg.chapter)} · Instructor: <b>Eng. Nadia Mek</b></p>
      <p class="lintro say">${cfg.intro}</p>
      <div class="lplan"><span class="eyebrow">In this lecture</span><ol>${secs.map(s=>`<li><a href="#${s.id}">${esc(s.t)}</a></li>`).join('')}</ol>
      <p class="lhow">Every topic: <b>Definition</b> → <b>Around us</b> → <b>Formula, step by step</b> → <b>What it means</b>.</p></div>`;
    main.appendChild(head);

    cfg.topics.forEach((t,i)=>{
      const s=el('section',{class:'lsec',id:t.id}); s.appendChild(el('h2',{},`<span class="no">${i+1}</span>${esc(t.title)}`));
      if(t.demo) s.appendChild(el('div',{class:'ldemo'},`<b>Demonstrated in class</b><span>${t.demo}</span>`));
      if(t.def) s.appendChild(part('def',t.def,null,builds));
      if(t.life) s.appendChild(part('life',t.life.text,t.life.fig,builds));
      if(t.formula){ const p=el('div',{class:'lpart lp-formula','data-part':'formula'}); p.appendChild(el('span',{class:'ltag'},PARTS.formula));
        if(t.formulaNote){ const n=el('p',{class:'ltext say'}); n.innerHTML=t.formulaNote; p.appendChild(n); }
        const box=el('div',{class:'ldecode'}); p.appendChild(box); builds.push(()=>F.decode(box,t.formula)); s.appendChild(p); }
      if(t.meaning) s.appendChild(part('meaning',t.meaning.text,t.meaning.fig,builds));
      main.appendChild(s);
    });

    if(cfg.inClass){
      const ic=cfg.inClass, sec=el('section',{class:'lsec lclass',id:'in-class'});
      sec.appendChild(el('h2',{},`<span class="no">${cfg.topics.length+1}</span>In class`));
      sec.appendChild(el('div',{class:'lc-paper'},`<span class="lc-stamp">On the board · on paper</span>
        <p class="lc-lead say">${ic.intro||'We solve these together in class. Bring the handout, or write in the box below each exercise.'}</p>
        <ol class="lc-how"><li><b>Watch</b> your professor demonstrate the method on the board.</li><li><b>Try</b> it yourself on the handout or in the writing box.</li><li><b>Check</b> the answer together in class. It is not posted online.</li></ol>
        <button type="button" class="lc-print">Print handout</button>`));
      ic.items.forEach((x,i)=>{ const card=el('div',{class:'lc-ex'});
        card.innerHTML=`<div class="lc-exh"><b>Exercise ${i+1}</b>${x.draw?'<span class="lc-tag">Draw</span>':''}</div><p class="lc-q say">${x.q}</p>${x.tips?`<details class="lc-tips"><summary>Before you start</summary><ol>${x.tips.map(t=>`<li>${t}</li>`).join('')}</ol></details>`:''}<div class="lc-pad"></div><p class="lc-ans">Answer: solved together in class.</p>`;
        sec.querySelector('.lc-paper').appendChild(card);
        builds.push(()=>{ if(window.Pad) Pad.create(card.querySelector('.lc-pad'),{key:'inclass-'+i,bg:x.draw?'grid':'lines',height:x.draw?360:240,name:`week${cfg.week}-exercise${i+1}`}); }); });
      sec.querySelector('.lc-print').addEventListener('click',()=>{
        const w=window.open('','_blank'); if(!w) return;
        w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>MTH 105 · Week ${cfg.week} · In-class handout</title><style>
          body{font-family:Arial,sans-serif;margin:18mm;color:#111}h1{font-size:18px;margin:0}p.m{margin:4px 0 14px;color:#444;font-size:12px}
          .nm{display:flex;gap:24px;font-size:13px;margin-bottom:16px}.nm span{flex:1;border-bottom:1px solid #999;padding-bottom:2px}
          .ex{page-break-inside:avoid;margin-bottom:14px}.ex b{font-size:14px}.ex p{font-size:13px;margin:4px 0 6px}
          .box{border:1px solid #999;height:85mm}.grid{background-image:linear-gradient(#ccc 1px,transparent 1px),linear-gradient(90deg,#ccc 1px,transparent 1px);background-size:5mm 5mm}
          .lines{background-image:linear-gradient(transparent 7mm,#ccc 7mm);background-size:100% 7.25mm}
          @page{size:A4;margin:0}</style></head><body><h1>MTH 105 · Week ${cfg.week} · ${esc(cfg.title)}</h1><p class="m">In-class handout · Eng. Nadia Mek · solved together on the board</p>
          <div class="nm"><span>Name:</span><span>Student ID:</span><span>Section:</span></div>
          ${ic.items.map((x,i)=>`<div class="ex"><b>Exercise ${i+1}</b><p>${x.q}</p><div class="box ${x.draw?'grid':'lines'}"></div></div>`).join('')}
          <script>setTimeout(()=>print(),300)<\/script></body></html>`); w.document.close(); });
      main.appendChild(sec);
    }

    const tk=el('section',{class:'lsec',id:'takeaways'}); tk.appendChild(el('h2',{},`<span class="no">${secs.length-1}</span>Takeaways`));
    const tkb=el('div',{class:'lpart','data-part':'takeaways'}); const tkf=figure(cfg.takeaways); tkb.appendChild(tkf.fig); builds.push(tkf.build); tk.appendChild(tkb); main.appendChild(tk);
    const pr=el('section',{class:'lsec',id:'practice'}); pr.appendChild(el('h2',{},`<span class="no">${secs.length}</span>Practice`));
    const prb=el('div',{class:'lpart','data-part':'practice'}); prb.appendChild(el('p',{class:'ltext say'},'Solve on paper first, then open the model working. Easy to hard.'));
    const pbox=el('div'); prb.appendChild(pbox); builds.push(()=>W.practice(pbox,cfg.practice,{label:'Show answer',prefix:''})); pr.appendChild(prb);
    if(cfg.next) pr.appendChild(el('p',{class:'lnext'},cfg.next));
    main.appendChild(pr);

    const pager=el('nav',{class:'lpager','aria-label':'Move through the lecture'}); main.appendChild(pager);
    document.body.appendChild(main);
    document.body.appendChild(el('p',{class:'support-note'},'This website is interactive course support. It does not replace classes, attendance or class activities.'));
    builds.forEach(b=>{ try{ b(); }catch(e){ console.error(e); } });

    /* view: whole page (default) · one section at a time · one part at a time */
    const view=LS.get('view')||'page';
    const sections=[...main.querySelectorAll('.lsec')];
    const units = view==='section' ? sections.map(s=>[s]) : view==='part' ? sections.flatMap(s=>[...s.querySelectorAll(':scope > .lpart')].map(p=>[s,p])) : null;
    let cur=0;
    const chips=[...bar.querySelectorAll('.lchips a')];
    const mark=id=>chips.forEach(c=>{ const on=c.dataset.id===id; c.classList.toggle('on',on); if(on&&c.scrollIntoView) c.scrollIntoView({block:'nearest',inline:'nearest'}); });
    const prog=f=>bar.querySelector('.progress i').style.width=(Math.max(0,Math.min(1,f))*100)+'%';
    function showUnit(i,scroll=true){
      cur=Math.max(0,Math.min(units.length-1,i)); const [s,p]=units[cur];
      sections.forEach(x=>x.hidden=x!==s);
      if(p) s.querySelectorAll(':scope > .lpart').forEach(x=>x.hidden=x!==p);
      head.hidden=cur!==0;
      mark(s.id); prog(units.length>1?cur/(units.length-1):1);
      const ttl=x=>x.querySelector('h2').innerText.replace(/^\d+\s*/,'');
      const lab=u=>!u?'':u[1]?`${sections.indexOf(u[0])+1} · ${u[1].querySelector('.ltag')?u[1].querySelector('.ltag').textContent.split(' · ')[0]:ttl(u[0])}`:ttl(u[0]);
      pager.innerHTML=`<button type="button" class="prev" ${cur===0?'disabled':''}><small>← Previous</small>${esc(lab(units[cur-1])||'Start')}</button><span class="pc">${cur+1} of ${units.length}</span><button type="button" class="next" ${cur===units.length-1?'disabled':''}><small>Next →</small>${esc(lab(units[cur+1])||'End')}</button>`;
      pager.querySelector('.prev').onclick=()=>showUnit(cur-1); pager.querySelector('.next').onclick=()=>showUnit(cur+1);
      try{ history.replaceState(null,'','#'+s.id); }catch(e){}
      if(scroll) window.scrollTo({top:0});
    }
    const target=()=>{ const h=decodeURIComponent(location.hash.slice(1)); if(!h) return null; const m=h.match(/^s(\d+)$/); return m?sections[Math.min(+m[1],sections.length-1)]:document.getElementById(h); };
    if(units){
      document.body.classList.add('lsplit');
      chips.forEach(c=>c.addEventListener('click',e=>{ e.preventDefault(); const i=units.findIndex(u=>u[0].id===c.dataset.id); if(i>=0) showUnit(i); }));
      head.querySelectorAll('.lplan a').forEach(a=>a.addEventListener('click',e=>{ e.preventDefault(); const i=units.findIndex(u=>'#'+u[0].id===a.getAttribute('href')); if(i>=0) showUnit(i); }));
      addEventListener('keydown',e=>{ if(/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return; if(e.key==='ArrowRight') showUnit(cur+1); if(e.key==='ArrowLeft') showUnit(cur-1); });
      const t=target(); showUnit(t?Math.max(0,units.findIndex(u=>u[0]===t||u[0].contains(t))):0,false);
    } else {
      pager.remove();
      const t=target(); if(t) setTimeout(()=>t.scrollIntoView(),60);
      const io=new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting){ mark(e.target.id); try{ history.replaceState(null,'','#'+e.target.id); }catch(x){} } }); },{rootMargin:'-30% 0px -60% 0px'});
      sections.forEach(s=>io.observe(s));
      const onScroll=()=>{ const d=document.documentElement; prog(d.scrollTop/((d.scrollHeight-d.clientHeight)||1)); };
      addEventListener('scroll',onScroll,{passive:true}); onScroll();
      sections.forEach(s=>{ if(s.id) s.addEventListener('focusin',()=>{}); });
      addEventListener('hashchange',()=>{ const t2=target(); if(t2) t2.scrollIntoView(); });
    }

    /* optional voice (Learning supports → Read aloud) */
    const listen=bar.querySelector('#listen');
    if(listen){ const speechSynthesis=window.speechSynthesis||{cancel(){},speak(){},getVoices:()=>[]};
      const synth=speechSynthesis; let voice=null, on=false, q=[], qi=0, player=null, rec=null;
      const all=[...document.querySelectorAll('.say')], key=(location.pathname.split('/').pop()||'').replace(/\.html$/,'');
      fetch('audio/manifest.json').then(r=>r.ok?r.json():null).then(m=>{ const f=m&&m.pages&&m.pages[key]&&m.pages[key][0]; if(f&&f.length===all.length) rec=f; }).catch(()=>{});
      const pick=()=>{ const vs=synth.getVoices(); voice=vs.find(v=>/en-GB/.test(v.lang)&&/female|Serena|Kate|Libby|Sonia|Google UK English Female/i.test(v.name))||vs.find(v=>/^en/.test(v.lang))||null; };
      pick(); synth.onvoiceschanged=pick;
      const words=t=>t.replace(/x̄/g,'x bar').replace(/Σ/g,'sum of').replace(/σ/g,'sigma').replace(/μ/g,'mu').replace(/√/g,'square root of').replace(/−/g,' minus ').replace(/×/g,' times ').replace(/÷/g,' divided by ').replace(/²/g,' squared');
      const clear=()=>document.querySelectorAll('.speaking').forEach(x=>x.classList.remove('speaking'));
      const stop=()=>{ on=false; synth.cancel(); if(player){ player.pause(); player.onended=null; player=null; } clear(); listen.textContent='▶ Listen'; listen.setAttribute('aria-pressed','false'); };
      const visible=x=>!x.closest('[hidden]');
      const next=()=>{ clear(); if(!on) return; while(qi<q.length&&!visible(q[qi])) qi++; if(qi>=q.length){ if(units&&cur<units.length-1){ showUnit(cur+1); q=[...document.querySelectorAll('.say')]; qi=q.findIndex(visible); if(qi<0){ stop(); return; } } else { stop(); return; } }
        const x=q[qi++]; x.classList.add('speaking'); x.scrollIntoView({block:'center',behavior:'smooth'});
        const i=all.indexOf(x), file=rec&&rec[i];
        if(file){ player=new Audio('audio/'+file); player.onended=()=>{ if(on) next(); }; player.play().catch(()=>{ player=null; speakSynth(x); }); return; }
        speakSynth(x); };
      const speakSynth=x=>{ const u=new SpeechSynthesisUtterance(words(x.innerText)); if(voice) u.voice=voice; u.onend=()=>{ if(on) next(); }; u.onerror=()=>{ if(on) next(); }; synth.speak(u); };
      listen.addEventListener('click',()=>{ if(on){ stop(); return; } on=true; listen.textContent='❚❚ Pause'; listen.setAttribute('aria-pressed','true');
        q=[...document.querySelectorAll('.say')]; const top=innerHeight*0.2; qi=q.findIndex(x=>visible(x)&&x.getBoundingClientRect().bottom>top); if(qi<0) qi=0; next(); });
    }
  }};
})();
