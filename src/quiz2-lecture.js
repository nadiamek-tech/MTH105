// {"file": "quiz2-lecture.html", "title": "MTH 105 Quiz 2 in 4 Pages", "wk": "#1F63B5", "wkd": "#7FB2FF"}
/* Quiz 2 in 4 pages: one page per chapter = takeaway + formula cards + one fully solved exercise (decisions, calculations, calculator, answer). */
const B=Board;
const L=(h,c)=>B.line(h,c);
const bell=(m)=>{const P=[];for(let i=0;i<=40;i++){const x=-3+i*0.15;P.push([10+i*2,34-26*Math.exp(-x*x/2)]);}
  const inR=x=>m==='l'?x<=56:m==='r'?x>=56:(x>=40&&x<=56);
  const sh=P.filter(([x])=>inR(x)), d='M'+P.map(q=>q.join(',')).join(' L');
  const a=`M${sh[0][0]},34 L`+sh.map(q=>q.join(',')).join(' L')+` L${sh[sh.length-1][0]},34 Z`;
  return `<svg class="bell" viewBox="0 0 100 38" width="90" height="34" aria-hidden="true"><path d="${a}" fill="#c62828" opacity=".3"/><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="8" y1="34" x2="92" y2="34" stroke="currentColor" stroke-width="1.2"/></svg>`;};
const card=(t,lines)=>`<div class="fc"><div class="fc-t">${t}</div>${B.make([{lines}],'')}</div>`;

const WEEKS=[
 {id:'binomial',wk:'Week 7',t:'Binomial distribution',href:'week-07.html',
  take:['Two outcomes: success or failure.','Fixed n, same p, independent trials.','Write n, p, q first.'],
  forms:[card('Exactly x',[L('P(X = x) = nCx · p<sup>x</sup> · q<sup>n − x</sup>')]),card('Mean',[L('μ = n · p')]),card('SD',[L('σ = √(n · p · q)')])],
  q:'40% of shop visitors buy something. 6 visitors come in.',
  parts:['P(exactly 2 buy)?','P(at least 1 buys)?','Mean and SD of the number who buy.'],
  sol:[
   {t:'Decide',lines:[L('Buy or not → 2 outcomes ✓ · n = 6 fixed ✓ · same p ✓ · independent ✓'),L('→ <b>Binomial</b>'),L('n = 6 · p = 0.4 · q = 0.6')]},
   {t:'(a) exactly 2',lines:[L('P(X = 2) = 6C2 · 0.4<sup>2</sup> · 0.6<sup>4</sup>'),L('= 15 × 0.16 × 0.1296'),L('= <b>0.3110</b>','ans')],calc:['6nCr2×0.4²×0.6^4','0.31104']},
   {t:'(b) at least 1',lines:[L('Decide: at least 1 = everything except 0'),L('P(X ≥ 1) = 1 − P(X = 0)'),L('= 1 − 0.6<sup>6</sup> = <b>0.9533</b>','ans')],calc:['1−0.6^6','0.953344']},
   {t:'(c) mean, SD',lines:[L('μ = 6 × 0.4 = <b>2.4</b>','ans'),L('σ = √(6 × 0.4 × 0.6) = √1.44 = <b>1.2</b>','ans')],calc:['√(6×0.4×0.6)','1.2']}]},
 {id:'normal',wk:'Weeks 8–9',t:'Normal distribution',href:'week-09.html',
  take:['Bell shape, centre μ, spread σ.','The table gives the area to the <b>left</b> of z.','Always draw and shade first.'],
  forms:[card('z-score',[B.fr('z','x − μ','σ')]),card('Less than',[L(bell('l')),L('table')]),card('More than',[L(bell('r')),L('1 − table')]),card('Between',[L(bell('b')),L('big − small')])],
  q:'Delivery time is normal with μ = 30 min and σ = 5 min.',
  parts:['P(delivery takes less than 38 min)?','P(more than 38 min)?','P(between 25 and 38 min)?'],
  sol:[
   {t:'(a) less than 38',lines:[L('Decide: less than → '+bell('l')+' → table'),B.fr('z','38 − 30','5','',{}),L('z = 1.60 → row 1.6, column 0.00'),L('P = <b>0.9452</b>','ans')],calc:['(38−30)÷5','1.6']},
   {t:'(b) more than 38',lines:[L('Decide: more than → '+bell('r')+' → 1 − table'),L('P = 1 − 0.9452 = <b>0.0548</b>','ans')],calc:['1−0.9452','0.0548']},
   {t:'(c) between 25 and 38',lines:[L('Decide: between → '+bell('b')+' → big − small'),B.fr('z','25 − 30','5'),L('z = −1.00 → 0.1587'),L('P = 0.9452 − 0.1587 = <b>0.7865</b>','ans')],calc:['0.9452−0.1587','0.7865']}]},
 {id:'ci',wk:'Week 11',t:'Confidence interval for the mean',href:'week-11.html',
  take:['An interval that estimates the population mean μ.','Centre = x̄ · width = margin of error E.','More confidence → wider interval.'],
  forms:[card('Standard error',[B.fr('SE','σ','√n')]),card('Margin',[L('E = z* × SE')]),card('Interval',[L('x̄ − E  to  x̄ + E')]),card('z*',[L('90% → 1.645'),L('95% → 1.96'),L('99% → 2.576')])],
  q:'64 customers waited on average x̄ = 12.5 min. σ = 4 min.',
  parts:['Find the 95% confidence interval for the mean waiting time.','Interpret it.'],
  sol:[
   {t:'Decide',lines:[L('σ known → use z*'),L('95% → z* = <b>1.96</b>'),L('x̄ = 12.5 · σ = 4 · n = 64')]},
   {t:'Step 1 · SE',lines:[B.fr('SE','4','√64'),L('= 4 ÷ 8 = <b>0.5</b>')],calc:['4÷√(64)','0.5']},
   {t:'Step 2 · E',lines:[L('E = 1.96 × 0.5 = <b>0.98</b>')],calc:['1.96×0.5','0.98']},
   {t:'Step 3 · interval',lines:[L('12.5 − 0.98 = 11.52'),L('12.5 + 0.98 = 13.48'),L('(<b>11.52</b> , <b>13.48</b>) min','ans')],calc:['12.5+0.98','13.48']},
   {t:'(b) interpret',lines:[L('We are 95% confident that the mean waiting time of <b>all</b> customers is between 11.52 and 13.48 min.')]}]},
 {id:'chi',wk:'Week 12',t:'Chi-square test of independence',href:'week-12.html',
  take:['Are two categorical variables related?','H₀ always says: independent.','Big χ² → far from H₀ → reject.'],
  forms:[card('Expected',[B.fr('E','row × column','total')]),card('χ²',[L('χ² = Σ '+B.frac('(O − E)²','E'))]),card('df',[L('(r − 1)(c − 1)')]),card('Decide',[L('χ² &gt; critical → reject H₀'),L('χ² &lt; critical → keep H₀')])],
  q:'Is the study year related to using the library? α = 0.05, critical value 3.841.'+B.tb(['','Yes','No','Total'],[['Year 1','45','15','60'],['Year 2','30','30','60']],['Total','75','45','120']),
  parts:['Write H₀ and H₁.','Find the expected counts.','Find χ² and df, decide, and conclude.'],
  sol:[
   {t:'(a) hypotheses',lines:[L('H₀: year and library use are independent'),L('H₁: they are related')]},
   {t:'(b) expected',lines:[B.fr('E<sub>Year 1, Yes</sub>','60 × 75','120','',{}),L('= <b>37.5</b> · No: 60 × 45 ÷ 120 = <b>22.5</b>'),L('Year 2: same totals → 37.5 and 22.5')],calc:['60×75÷120','37.5']},
   {t:'(c) χ²',lines:[L('O − E = ±7.5 in every cell → (7.5)<sup>2</sup> = 56.25'),L('χ² = 56.25÷37.5 + 56.25÷22.5 + 56.25÷37.5 + 56.25÷22.5'),L('= 1.5 + 2.5 + 1.5 + 2.5 = <b>8</b>','ans')],calc:['(45−37.5)²÷37.5+(15−22.5)²÷22.5+(30−37.5)²÷37.5+(30−22.5)²÷22.5','8']},
   {t:'Decide',lines:[L('df = (2 − 1)(2 − 1) = 1'),L('8 &gt; 3.841 → <b>reject H₀</b>','ans'),L('Study year and library use are related.')]}]}];

(function(){
  const css=`
body.q2l{background:var(--bg)}
.ql-main{padding:22px 12px 40px}
.ql-cover,.wkp{max-width:880px;margin:0 auto 22px;background:var(--surface);border:1px solid var(--line);border-radius:6px;box-shadow:0 10px 40px rgba(0,0,0,.08);padding:34px 48px}
.ql-top{display:flex;justify-content:space-between;gap:12px;font-family:var(--f-mono);font-size:.74rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);border-bottom:2px solid var(--ink);padding-bottom:8px}
.ql-cover h1{font-family:var(--f-display);font-size:clamp(1.9rem,4.5vw,2.6rem);font-weight:800;text-align:center;margin:20px 0 4px}
.ql-cover p{text-align:center;color:var(--muted);font-family:var(--f-display);margin:0 0 14px}
.ql-toc{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.ql-toc a{display:block;text-decoration:none;color:var(--ink);border:1px solid var(--line);border-radius:8px;padding:9px 12px;font-family:var(--f-display);height:100%}
.ql-toc small{display:block;color:var(--wk);font-family:var(--f-mono);font-size:.7rem;text-transform:uppercase;letter-spacing:.06em}
.ql-tools{text-align:center;margin-top:14px}
.wkp{scroll-margin-top:72px}
.wk-h{display:flex;justify-content:space-between;align-items:baseline;gap:10px;border-bottom:2px solid var(--ink);padding-bottom:6px}
.wk-h h2{font-family:var(--f-display);font-size:1.55rem;font-weight:800;margin:0}
.wk-h small{font-family:var(--f-mono);font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;color:var(--wk)}
.wk-h a{font-family:var(--f-display);font-size:.85rem}
.lbl{font-family:var(--f-mono);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--wk);font-weight:700;margin:14px 0 6px}
.take{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.take div{background:var(--wk-soft);border-radius:8px;padding:8px 10px;font-family:var(--f-display);font-size:.95rem}
.fcs{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}
.fc{display:flex;flex-direction:column}.fc-t{font-family:var(--f-display);font-weight:700;font-size:.85rem;margin-bottom:-4px}
.fc .bd{flex:1;margin:6px 0 0;padding:4px 12px;font-size:1.2rem}.fc .bd-g{padding:6px 0}
.fc .bd>p,.fc .bd>.bd-foot{display:none}
.ex{border:2px solid var(--ink);border-radius:10px;padding:10px 14px}
.ex p{margin:0}.ex ol{margin:6px 0 0;padding-left:24px}
.bell{vertical-align:middle;color:var(--bi,#1c3a9c)}
.sol .bd{font-size:1.25rem}
@media (max-width:700px){.ql-cover,.wkp{padding:22px 16px}.ql-main{padding:12px 6px 30px}.ql-toc,.take{grid-template-columns:1fr 1fr}.sol .bd-g{grid-template-columns:minmax(0,1fr)}.sol .bcalc{max-width:200px}}
@media print{
  :root,:root[data-theme]{--bg:#fff!important;--surface:#fff!important;--ink:#111!important;--muted:#444!important;--line:#bbb!important;color-scheme:light}
  @page{size:A4;margin:9mm 10mm}
  body{background:#fff!important}
  .lbar,.ql-cover,.support-note,.ca-btn,.ca-panel,.calm-start,.wk-h a{display:none!important}
  .ql-main{padding:0}
  .wkp{box-shadow:none;border:0;padding:0;margin:0;max-width:none;break-after:page}
  .wkp:last-child{break-after:auto}
  .lbl{margin:7px 0 3px}
  .take div{padding:4px 8px;font-size:.85rem}
  .fc .bd{font-size:1rem}
  .sol .bd{font-size:.92rem;padding:2px 10px;display:grid;grid-template-columns:1fr 1fr;column-gap:16px;break-inside:auto}
  .sol .bd-g{grid-template-columns:minmax(0,1fr) 92px;padding:4px 0;break-inside:avoid;border-top:2px dashed #d6d2c6}
  .sol .bd-g:nth-child(-n+2){border-top:0}
  .sol .bd>:not(.bd-g){grid-column:1/-1}
  .sol .bcalc{padding:2px 4px}.sol .bcalc>span{font-size:.75rem}
}`;
  const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
  document.body.classList.add('lesson','q2l');
  const el=(t,a={},h='')=>{ const e=document.createElement(t); Object.entries(a).forEach(([k,v])=>e.setAttribute(k,v)); if(h) e.innerHTML=h; return e; };

  const bar=el('header',{class:'lbar'});
  bar.innerHTML=`<div class="lbar-in"><a class="brand" href="exams.html"><b>MTH 105</b><span>← Exams · Quiz 2 in 4 pages</span></a>
    <nav class="lchips" aria-label="Pages">${WEEKS.map((w,i)=>`<a href="#${w.id}" data-id="${w.id}">${i+1} · ${esc(w.t)}</a>`).join('')}</nav>
    <div class="lctl"><button type="button" class="pill" id="pr-top">Print / PDF</button><button type="button" class="pill" id="theme" title="Light or dark">◐</button></div></div><div class="progress"><i></i></div>`;
  document.body.appendChild(bar);
  bar.querySelector('#theme').addEventListener('click',()=>GED102Theme.toggle());
  bar.querySelector('#pr-top').addEventListener('click',()=>window.print());

  const main=el('main',{class:'ql-main'});
  const cover=el('section',{class:'ql-cover'});
  cover.innerHTML=`<div class="ql-top"><span>MTH 105 · Introduction to Statistics</span><span>Fall 2026 · Nadia</span></div>
    <h1>Quiz 2 in 4 pages</h1><p>One page per chapter: takeaway · formulas · one exercise solved step by step</p>
    <ol class="ql-toc">${WEEKS.map((w,i)=>`<li><a href="#${w.id}"><small>${w.wk}</small>${w.t}</a></li>`).join('')}</ol>
    <div class="ql-tools"><button type="button" class="btn" id="pr">Print / Save as PDF (4 pages)</button></div>`;
  main.appendChild(cover);
  cover.querySelector('#pr').addEventListener('click',()=>window.print());

  WEEKS.forEach((w,i)=>{
    const s=el('section',{class:'wkp',id:w.id});
    s.innerHTML=`<div class="wk-h"><h2><small>${w.wk} · page ${i+1} of 4</small><br>${w.t}</h2><a href="${w.href}">Full lecture →</a></div>
      <div class="lbl">Takeaway</div><div class="take">${w.take.map(t=>`<div>${t}</div>`).join('')}</div>
      <div class="lbl">Formulas</div><div class="fcs">${w.forms.join('')}</div>
      <div class="lbl">Exercise</div><div class="ex"><p>${w.q}</p><ol type="a">${w.parts.map(p=>`<li>${p}</li>`).join('')}</ol></div>
      <div class="lbl">Solution</div><div class="sol">${B.make(w.sol,'')}</div>`;
    main.appendChild(s);
  });
  document.body.appendChild(main);
  document.body.appendChild(el('p',{class:'support-note'},'This website is interactive course support. It does not replace classes, attendance or class activities.'));

  const chips=[...bar.querySelectorAll('.lchips a')], secs=[...main.querySelectorAll('.wkp')];
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) chips.forEach(c=>c.classList.toggle('on',c.dataset.id===e.target.id)); }),{rootMargin:'-30% 0px -60% 0px'});
  secs.forEach(x=>io.observe(x));
  const onScroll=()=>{ const d=document.documentElement; bar.querySelector('.progress i').style.width=(d.scrollTop/((d.scrollHeight-d.clientHeight)||1)*100)+'%'; };
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
  const h=location.hash.slice(1); if(h&&document.getElementById(h)) setTimeout(()=>document.getElementById(h).scrollIntoView(),60);
})();
