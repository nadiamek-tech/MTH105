/* Shared header: logo (home), Lectures · Lab · Exams, theme. Put <div id="hub" data-cur="lectures"></div> first in <body>. */
(function(){
  const el=document.getElementById('hub'); if(!el) return; const cur=el.dataset.cur||'';
  const L=[['lectures.html','Lectures','lectures'],['lab.html','Lab','lab'],['exams.html','Exams','exams']];
  el.className='hub'; el.innerHTML=`<div class="hub-in"><a class="logo" href="index.html" title="Course home"><img src="assets/cud-logo.png" alt="Canadian University Dubai"></a><a class="crs" href="index.html">MTH 105</a><nav aria-label="Course sections">${L.map(([h,t,k])=>`<a href="${h}" ${k===cur?'aria-current="page"':''}>${t}</a>`).join('')}</nav><button type="button" class="pill" id="theme" title="Switch light or dark">◐</button></div>`;
  el.querySelector('#theme').addEventListener('click',()=>window.GED102Theme&&GED102Theme.toggle());
})();
