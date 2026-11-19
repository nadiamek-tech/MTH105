// {"file": "quiz2-practice.html", "title": "MTH 105 Quiz 2 Practice", "wk": "#1F63B5", "wkd": "#7FB2FF"}
(function(){
  const css=`body.q2p{background:var(--bg)}
.qp{max-width:900px;margin:22px auto 40px;padding:0 12px;font-family:var(--f-display)}
.qp-top{display:flex;justify-content:space-between;gap:12px;font-family:var(--f-mono);font-size:.74rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);border-bottom:2px solid var(--ink);padding-bottom:8px}
.qp h1{font-size:clamp(1.9rem,4.5vw,2.6rem);font-weight:800;text-align:center;margin:22px 0 4px}
.qp>p{text-align:center;color:var(--muted);margin:0 0 20px}
.qp-g{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.qp-c{background:var(--surface);border:1px solid var(--line);border-top:6px solid var(--cc);border-radius:12px;padding:18px;display:flex;flex-direction:column;gap:10px}
.qp-c small{font-family:var(--f-mono);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--cc);font-weight:700}
.qp-c h2{margin:0;font-size:1.35rem}
.qp-s{display:flex;flex-wrap:wrap;gap:4px}.qp-s span{font-size:.78rem;border-radius:999px;padding:2px 9px;background:color-mix(in srgb,var(--cc) 12%,var(--surface));color:var(--ink)}
.qp-b{display:flex;gap:8px;flex-wrap:wrap;margin-top:auto}
.qp-all{text-align:center;margin-top:18px}.qp .btn{text-decoration:none}
@media (max-width:700px){.qp-g{grid-template-columns:1fr}}`;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  document.body.classList.add('lesson','q2p');
  const bar=document.createElement('header');bar.className='lbar';
  bar.innerHTML=`<div class="lbar-in"><a class="brand" href="exams.html"><b>MTH 105</b><span>← Exams · Quiz 2 practice</span></a><div class="lctl"><button type="button" class="pill" id="theme" title="Light or dark">◐</button></div></div>`;
  document.body.appendChild(bar);bar.querySelector('#theme').addEventListener('click',()=>GED102Theme.toggle());
  const C=[{c:'#9C2A6B',k:'Part 1 · Week 11',t:'Confidence interval for the mean',s:['Data','Critical value','SE','Margin of error','Interval and meaning'],h:'ci-practice.html',p:'downloads/MTH105-CI-practice.pdf'},
           {c:'#2E7D32',k:'Part 2 · Week 12',t:'Chi-square test of independence',s:['Hypotheses','α, df, χ² critical','Expected counts','χ² calculated','Decision'],h:'chi-square-practice.html',p:'downloads/MTH105-Chi-square-practice.pdf'}];
  const m=document.createElement('main');m.className='qp';
  m.innerHTML=`<div class="qp-top"><span>MTH 105 · Introduction to Statistics</span><span>Fall 2026 · Nadia</span></div>
   <h1>Quiz 2 practice</h1><p>Confidence intervals and the chi-square test · 6 exercises each · the same 5 steps every time</p>
   <div class="qp-g">${C.map(x=>`<section class="qp-c" style="--cc:${x.c}"><small>${x.k}</small><h2>${x.t}</h2><div class="qp-s">${x.s.map((s,i)=>`<span>${i+1} · ${s}</span>`).join('')}</div>
     <div class="qp-b"><a class="btn" href="${x.h}">Open practice</a><a class="btn ghost" href="${x.p}" download>Download PDF</a></div></section>`).join('')}</div>
   <div class="qp-all"><a class="btn" href="downloads/MTH105-Quiz2-practice.pdf" download>Download both (one PDF)</a></div>`;
  document.body.appendChild(m);
  const n=document.createElement('p');n.className='support-note';n.textContent='This website is interactive course support. It does not replace classes, attendance or class activities.';document.body.appendChild(n);
})();
