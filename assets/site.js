/* Shared header: logo (home), Lectures · Lab · Exams, theme. Put <div id="hub" data-cur="lectures"></div> first in <body>. */
(function(){
  const el=document.getElementById('hub'); if(!el) return; const cur=el.dataset.cur||'';
  const L=[['lectures.html','Lectures','lectures'],['lab.html','Lab','lab'],['exams.html','Exams','exams']];
  el.className='hub'; el.innerHTML=`<div class="hub-in"><a class="crs" href="index.html">MTH 105</a><nav aria-label="Course sections">${L.map(([h,t,k])=>`<a href="${h}" ${k===cur?'aria-current="page"':''}>${t}</a>`).join('')}</nav><button type="button" class="pill" id="theme" title="Switch light or dark">◐</button></div>`;
  el.querySelector('#theme').addEventListener('click',()=>window.GED102Theme&&GED102Theme.toggle());
})();
/* Midterm banner on every page until the exam starts */
(function(){
  const end=new Date('2026-10-19T09:30:00+04:00').getTime(); if(Date.now()>end) return;
  const d=Math.ceil((end-Date.now())/86400000), when=d>1?d+' days to go':d===1?'Tomorrow':'Today';
  const html=`<a class="mbanner" href="midterm-practice.html"><b>Midterm</b> Monday 19 October 2026 · 9:30 AM · HUB-Yard Zones A, B, D <span>${when} · Revise now →</span></a>`;
  const put=()=>{ const hub=document.getElementById('hub'); if(hub){ hub.insertAdjacentHTML('afterend',html); return; }
    const toc=document.querySelector('.toc'); if(toc){ const h=toc.querySelector('.meta'); (h||toc.firstChild).insertAdjacentHTML('beforebegin',html); } };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',put); else setTimeout(put,0);
})();
