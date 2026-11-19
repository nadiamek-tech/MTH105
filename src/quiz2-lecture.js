// {"file": "quiz2-lecture.html", "title": "MTH 105 Quiz 2 Brief Lecture", "wk": "#1F63B5", "wkd": "#7FB2FF"}
/* Quiz 2 brief lecture: for a student who missed the classes. Per chapter: what it is, key words, coloured formulas,
   how to get each value (calculator keys, z-table, critical-value table), one exercise solved step by step with every decision. */

/* ---------- colour helpers (green = top of fraction, red = bottom, purple = brackets, orange = + and Σ) ---------- */
const CT=s=>s.replace(/[()]/g,c=>`<span class="kb">${c}</span>`).replace(/[+Σ]/g,c=>`<span class="ks">${c}</span>`);
const FR=(n,d)=>`<span class="fr"><span class="n">${CT(n)}</span><span class="d">${CT(d)}</span></span>`;
const EQ=h=>`<div class="eq">${h}</div>`;
const V=(s,c='v1')=>`<span class="${c}">${s}</span>`;           // coloured value
const ANS=s=>`<span class="ans">${s}</span>`;
const KEYS=(ks,res)=>`<div class="keys"><span class="kl">Calculator</span>${ks.map(k=>`<kbd${/^(SHIFT|nCr|=|x²|√|\^|Ans)$/.test(k)?' class="fn"':''}>${k}</kbd>`).join('')}${res!==undefined?`<span class="kr">${res}</span>`:''}</div>`;
const CALC=(e,r)=>`<div class="cimg">${Board.calc(e,r)}</div>`;
const DECIDE=(q,a)=>`<div class="decide"><span class="dq">Decide · ${q}</span><span class="da">${a}</span></div>`;
const STEP=(n,title,why,body,side='')=>`<div class="step"><div class="sn">${n}</div><div class="sb"><div class="st">${title}</div>${why?`<div class="sw">${why}</div>`:''}${body}</div>${side?`<div class="ss">${side}</div>`:''}</div>`;
const BOX=(cls,title,body)=>`<div class="box ${cls}"><div class="bt">${title}</div>${body}</div>`;
const WORDS=a=>`<div class="words">${a.map(([s,m])=>`<div><b>${s}</b><span>${m}</span></div>`).join('')}</div>`;
const MIS=(bad,good)=>`<div class="mis"><div class="bad"><b>✗ Mistake</b>${bad}</div><div class="good"><b>✓ Correct</b>${good}</div></div>`;
const bell=(m,lab='')=>{const P=[];for(let i=0;i<=40;i++){const x=-3+i*0.15;P.push([10+i*2,34-26*Math.exp(-x*x/2)]);}
  const inR=x=>m==='l'?x<=58:m==='r'?x>=58:(x>=44&&x<=58);
  const sh=P.filter(([x])=>inR(x)), d='M'+P.map(q=>q.join(',')).join(' L');
  const a=`M${sh[0][0]},34 L`+sh.map(q=>q.join(',')).join(' L')+` L${sh[sh.length-1][0]},34 Z`;
  return `<svg class="bell" viewBox="0 0 100 38" width="110" height="42" aria-hidden="true"><path d="${a}" fill="var(--c1)" opacity=".45"/><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="8" y1="34" x2="92" y2="34" stroke="currentColor" stroke-width="1.2"/></svg>`;};

/* ---------- z-table (area to the LEFT of z) ---------- */
const Phi=z=>{const t=1/(1+0.2316419*Math.abs(z)),d=0.3989423*Math.exp(-z*z/2),p=d*t*(0.3193815+t*(-0.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));return z>0?1-p:p;};
const zrow=r=>[...Array(10)].map((_,c)=>{const z=r<0||Object.is(r,-0)?r-c/100:r+c/100;return Phi(Math.round(z*100)/100).toFixed(4);});
const rl=r=>(r<0||Object.is(r,-0)?'−':'')+Math.abs(r).toFixed(1);
const ZT=(rows,hl=[])=>`<div class="tw"><table class="zt"><tr><th>z</th>${[...Array(10)].map((_,c)=>`<th class="${hl.some(h=>h.c===c)?'hc':''}">.0${c}</th>`).join('')}</tr>${rows.map(r=>{const v=zrow(r),h=hl.find(x=>x.r===r);
  return `<tr class="${h?'hr':''}"><th>${rl(r)}</th>${v.map((x,c)=>`<td class="${h&&h.c===c?'hit':''}">${x}</td>`).join('')}</tr>`;}).join('')}</table></div>`;
const FULLZ=()=>{const rows=[];for(let i=34;i>=1;i--)rows.push(-i/10);rows.push(-0);for(let i=0;i<=34;i++)rows.push(i/10);return ZT(rows);};

/* ================= chapters ================= */
const CH=[];

/* ---------- 1 · Binomial ---------- */
CH.push({id:'binomial',wk:'Week 7',t:'Binomial distribution',href:'week-07.html',html:`
${BOX('what','What is it?',`<p>We repeat the same trial <b>n</b> times. Each trial is a <b>success</b> or a <b>failure</b>. X counts the successes.</p><p class="egl">Example: a shop has 6 visitors; each buys (success) or not (failure).</p>`)}
${BOX('chk','Is it binomial? All 4 must be true',`<div class="four"><div>① Fixed number of trials <b>n</b></div><div>② Only 2 outcomes</div><div>③ Same probability <b>p</b> every time</div><div>④ Trials independent</div></div>`)}
${BOX('kw','Key words',WORDS([['n','number of trials'],['p','probability of success'],['q','failure = 1 − p'],['x','number of successes we want'],['nCx','number of ways to choose x out of n']]))}
${BOX('fm','Formulas',`<div class="fgrid">${EQ(`P(X = x) = ${V('nCx')} · ${V('p','v2')}<sup>x</sup> · ${V('q','v3')}<sup>n − x</sup>`)}${EQ(`Mean: μ = n · p`)}${EQ(`SD: σ = √${CT('(n · p · q)')}`)}</div>
 <div class="which"><div><b>Exactly x</b>use the formula once</div><div><b>At least 1</b>1 − P(X = 0)</div><div><b>At most 1</b>P(X = 0) + P(X = 1)</div></div>`)}
${BOX('get','How to get the values',`<p>nCx on the calculator: type n, then <b>SHIFT</b> and <b>÷</b> (nCr), then x.</p>${KEYS(['6','SHIFT','÷ nCr','2','='],'15')}<p>Powers: use <b>x²</b> or <b>^</b>.</p>${KEYS(['0.6','^','4','='],'0.1296')}`)}
<h3 class="exh">Solved exercise</h3>
<div class="ex">40% of shop visitors buy something. 6 visitors come in.<ol type="a"><li>Find P(exactly 2 buy).</li><li>Find P(at least 1 buys).</li><li>Find the mean and the SD of the number who buy.</li></ol></div>
${STEP(1,'Check it is binomial','Go through the 4 conditions.',`<div class="four sm"><div>n = 6 fixed ✓</div><div>buy / not buy ✓</div><div>p = 0.4 each time ✓</div><div>visitors independent ✓</div></div>${DECIDE('which distribution?','Binomial')}`)}
${STEP(2,'Write n, p, q','q is always 1 − p.',EQ(`n = ${V('6')} · p = ${V('0.4','v2')} · q = 1 − 0.4 = ${V('0.6','v3')}`))}
${STEP(3,'(a) Exactly 2','“Exactly” → one use of the formula with x = 2, so n − x = 4.',EQ(`P(X = 2) = ${V('6C2')} · ${V('0.4','v2')}<sup>2</sup> · ${V('0.6','v3')}<sup>4</sup>`)+EQ(`= 15 × 0.16 × 0.1296 = ${ANS('0.3110')}`),CALC('6nCr2×0.4²×0.6^4','0.31104'))}
${STEP(4,'(b) At least 1','At least 1 = 1, 2, 3, 4, 5 or 6. Faster: everything (1) minus “none”.',DECIDE('which rule?','1 − P(X = 0)')+EQ(`P(X = 0) = 6C0 · 0.4<sup>0</sup> · 0.6<sup>6</sup> = 0.6<sup>6</sup> = 0.0467`)+EQ(`P(X ≥ 1) = 1 − 0.0467 = ${ANS('0.9533')}`),CALC('1−0.6^6','0.953344'))}
${STEP(5,'(c) Mean and SD','Mean = expected number of buyers.',EQ(`μ = 6 × 0.4 = ${ANS('2.4')} visitors`)+EQ(`σ = √${CT('(6 × 0.4 × 0.6)')} = √1.44 = ${ANS('1.2')}`),CALC('√(6×0.4×0.6)','1.2'))}
${MIS('P(X ≥ 1) = P(X = 1) = 0.1866','“At least 1” = 1 − P(X = 0) = 0.9533')}`});

/* ---------- 2 · Normal ---------- */
CH.push({id:'normal',wk:'Weeks 8–9',t:'Normal distribution and the z-table',href:'week-09.html',html:`
${BOX('what','What is it?',`<p>Many measures (heights, times, marks) make a <b>bell shape</b>: most values near the mean μ, few far away. <b>Probability = area under the bell</b>. The total area is 1.</p>`)}
${BOX('kw','Key words',WORDS([['μ','mean, the centre of the bell'],['σ','standard deviation, the spread'],['x','the value in the question'],['z','how many σ the value x is from μ'],['z-table','gives the area to the LEFT of z']]))}
${BOX('fm','Formulas',`<div class="fgrid">${EQ(`z = ${FR('x − μ','σ')}`)}${EQ(`x = μ + z · σ`)}</div>
 <div class="which"><div>${bell('l')}<b>Less than</b>table value</div><div>${bell('r')}<b>More than</b>1 − table value</div><div>${bell('b')}<b>Between</b>big − small</div></div>`)}
${BOX('get','Why and how to use the z-table',`<p>Every normal bell has a different μ and σ, so we change x into <b>z</b>. Then one table works for all bells. The z-table is given in the quiz.</p>
 <div class="read"><div><b>1</b>Round z to 2 decimals, e.g. z = 1.24</div><div><b>2</b>Row = first decimal: <b>1.2</b></div><div><b>3</b>Column = second decimal: <b>.04</b></div><div><b>4</b>Where they meet = area to the left: <b>0.8925</b></div></div>
 ${ZT([1.1,1.2,1.3],[{r:1.2,c:4}])}
 <p class="sm">Negative z: use the negative rows the same way (row −0.5, column .02 → 0.3015).</p>
 <details class="fullz"><summary>Open the full z-table</summary>${FULLZ()}<p class="sm"><a href="assets/z-table.pdf">Download the z-table (PDF)</a></p></details>`)}
<h3 class="exh">Solved exercise</h3>
<div class="ex">Delivery time is normal with μ = 30 min and σ = 5 min.<ol type="a"><li>Find P(delivery takes less than 36.2 min).</li><li>Find P(more than 36.2 min).</li><li>Find P(between 27.4 and 36.2 min).</li></ol></div>
${STEP(1,'(a) Draw and shade','“Less than” → shade the left side.',DECIDE('which case?',`Less than → table value`),bell('l'))}
${STEP(2,'(a) Find z','Brackets first: x − μ, then divide by σ.',EQ(`z = ${FR('36.2 − 30','5')} = ${FR('6.2','5')} = ${V('1.24')}`),CALC('(36.2−30)÷5','1.24'))}
${STEP(3,'(a) Read the table','Row 1.2, column .04.',ZT([1.2],[{r:1.2,c:4}])+EQ(`P(X &lt; 36.2) = ${ANS('0.8925')}`))}
${STEP(4,'(b) More than','Same z. The table gives the left area, we want the right area.',DECIDE('which case?','More than → 1 − table')+EQ(`P(X &gt; 36.2) = 1 − 0.8925 = ${ANS('0.1075')}`),CALC('1−0.8925','0.1075'))}
${STEP(5,'(c) Between: z for 27.4','Two values → two z-scores.',EQ(`z = ${FR('27.4 − 30','5')} = ${FR('−2.6','5')} = ${V('−0.52')}`)+ZT([-0.5],[{r:-0.5,c:2}])+EQ(`table(−0.52) = 0.3015`),CALC('(27.4−30)÷5','−0.52'))}
${STEP(6,'(c) Subtract','Big area − small area.',DECIDE('which case?','Between → big − small')+EQ(`P(27.4 &lt; X &lt; 36.2) = 0.8925 − 0.3015 = ${ANS('0.5910')}`),CALC('0.8925−0.3015','0.591'))}
${MIS('No brackets: 36.2 − 30 ÷ 5 = 30.2','Brackets: (36.2 − 30) ÷ 5 = 1.24')}`});

/* ---------- 3 · Confidence interval ---------- */
CH.push({id:'ci',wk:'Week 11',t:'Confidence interval for the mean',href:'week-11.html',html:`
${BOX('what','What is it?',`<p>We do not know the mean μ of the whole population. From a sample we get x̄. A <b>confidence interval</b> is a range around x̄ that probably contains μ.</p><p class="egl">Interval = x̄ − E to x̄ + E. E is the margin of error.</p>`)}
${BOX('kw','Key words',WORDS([['x̄','sample mean (centre of the interval)'],['σ','population standard deviation'],['n','sample size'],['SE','standard error = σ ÷ √n'],['z*','number from the confidence level'],['E','margin of error = z* × SE']]))}
${BOX('fm','Formulas',`<div class="fgrid">${EQ(`SE = ${FR('σ','√n')}`)}${EQ(`E = z* × SE`)}${EQ(`x̄ − E  to  x̄ + E`)}</div><p class="sm">If σ is not known: use s instead of σ and t* instead of z* (t* is given, df = n − 1).</p>`)}
${BOX('get','Where does z* come from?',`<p>95% in the middle leaves 2.5% in each tail. So the area to the left is 0.975. Find 0.975 inside the z-table: row 1.9, column .06 → <b>z* = 1.96</b>.</p>
 ${ZT([1.9],[{r:1.9,c:6}])}
 <div class="tw"><table class="ct"><tr><th>Confidence</th><th>Left area</th><th>z*</th></tr><tr><td>90%</td><td>0.95</td><td><b>1.645</b></td></tr><tr class="hr"><td>95%</td><td>0.975</td><td><b>1.96</b></td></tr><tr><td>99%</td><td>0.995</td><td><b>2.576</b></td></tr></table></div>`)}
<h3 class="exh">Solved exercise</h3>
<div class="ex">64 customers waited on average x̄ = 12.5 min. σ = 4 min.<ol type="a"><li>Find the 95% confidence interval for the mean waiting time.</li><li>Interpret it.</li></ol></div>
${STEP(1,'Write the data','Find each value in the question.',EQ(`x̄ = ${V('12.5')} · σ = ${V('4','v2')} · n = ${V('64','v3')} · 95%`))}
${STEP(2,'Choose z*','σ is given → use z*. 95% → 1.96.',DECIDE('z or t?','σ known → z* = 1.96'))}
${STEP(3,'Standard error','Divide σ by the square root of n.',EQ(`SE = ${FR('4','√64')} = ${FR('4','8')} = ${V('0.5')}`),CALC('4÷√(64)','0.5'))}
${STEP(4,'Margin of error','Multiply z* by SE.',EQ(`E = 1.96 × 0.5 = ${V('0.98')}`),CALC('1.96×0.5','0.98'))}
${STEP(5,'The interval','Subtract E for the lower end, add E for the upper end.',EQ(`12.5 − 0.98 = ${V('11.52')}`)+EQ(`12.5 + 0.98 = ${V('13.48')}`)+EQ(`95% CI: ${ANS('(11.52 , 13.48)')} min`),CALC('12.5+0.98','13.48'))}
${STEP(6,'(b) Interpret','Always about the mean of ALL customers, with the units.',`<p class="say">We are 95% confident that the mean waiting time of all customers is between 11.52 and 13.48 minutes.</p>`)}
${MIS('“95% of customers wait between 11.52 and 13.48 min”','The interval is about the <b>mean</b> μ, not about each customer')}`});

/* ---------- 4 · Chi-square ---------- */
CH.push({id:'chi',wk:'Week 12',t:'Chi-square test of independence',href:'week-12.html',html:`
${BOX('what','What is it?',`<p>Two <b>categorical</b> variables in a table (e.g. study year and library use). Are they <b>related</b>? We compare what we <b>observed</b> (O) with what we would <b>expect</b> (E) if they were not related.</p>`)}
${BOX('kw','Key words',WORDS([['H₀','the variables are independent (not related)'],['H₁','the variables are related'],['O','observed count (in the table)'],['E','expected count if H₀ is true'],['df','degrees of freedom'],['α','significance level, usually 0.05']]))}
${BOX('fm','Formulas',`<div class="fgrid">${EQ(`E = ${FR('row total × column total','grand total')}`)}${EQ(`χ² = Σ ${FR('(O − E)²','E')}`)}${EQ(`df = ${CT('(rows − 1)(columns − 1)')}`)}</div>
 <div class="which"><div><b>χ² &gt; critical value</b>reject H₀ → related</div><div><b>χ² &lt; critical value</b>do not reject H₀ → not related</div></div>`)}
${BOX('get','Where does the critical value come from?',`<p>From the chi-square table (given in the quiz): row = df, column = α.</p>
 <div class="tw"><table class="ct"><tr><th>df</th><th>α = 0.10</th><th class="hc">α = 0.05</th><th>α = 0.01</th></tr>${[[1,'2.706','3.841','6.635'],[2,'4.605','5.991','9.210'],[3,'6.251','7.815','11.345'],[4,'7.779','9.488','13.277']].map(r=>`<tr class="${r[0]===1?'hr':''}"><th>${r[0]}</th><td>${r[1]}</td><td class="${r[0]===1?'hit':''}">${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</table></div>`)}
<h3 class="exh">Solved exercise</h3>
<div class="ex">Is the study year related to using the library? α = 0.05.
 <div class="tw"><table class="ct"><tr><th></th><th>Yes</th><th>No</th></tr><tr><th>Year 1</th><td>45</td><td>15</td></tr><tr><th>Year 2</th><td>30</td><td>30</td></tr></table></div></div>
${STEP(1,'Hypotheses','H₀ always says “independent”.',EQ(`H₀: study year and library use are independent`)+EQ(`H₁: they are dependent (related)`))}
${STEP(2,'α, df and χ² critical','α is in the question. Then df, then the table. In exams, χ² critical is sometimes given.',EQ(`α = ${V('0.05')}`)+EQ(`df = ${CT('(2 − 1)(2 − 1)')} = ${V('1')}`)+EQ(`χ²<sub>critical</sub> = ${V('3.841','v2')}`))}
${STEP(3,'Expected counts','Totals, then E = row total × column total ÷ grand total. Then O and E in one table.',`<div class="tw"><table class="ct"><tr><th></th><th>Yes</th><th>No</th><th class="tot">Total</th></tr><tr><th>Year 1</th><td>45</td><td>15</td><td class="tot">60</td></tr><tr><th>Year 2</th><td>30</td><td>30</td><td class="tot">60</td></tr><tr><th class="tot">Total</th><td class="tot">75</td><td class="tot">45</td><td class="tot">120</td></tr></table></div>`+EQ(`Year 1, Yes: ${FR('60 × 75','120')} = ${V('37.5')}`)+EQ(`Year 1, No: ${FR('60 × 45','120')} = ${V('22.5')}`)+`<div class="tw"><table class="ct"><tr><th>O (E)</th><th>Yes</th><th>No</th></tr><tr><th>Year 1</th><td><b>45</b> <span class="v2">(37.5)</span></td><td><b>15</b> <span class="v2">(22.5)</span></td></tr><tr><th>Year 2</th><td><b>30</b> <span class="v2">(37.5)</span></td><td><b>30</b> <span class="v2">(22.5)</span></td></tr></table></div>`,CALC('60×75÷120','37.5'))}
${STEP(4,'χ² calculated','One bracket per cell, then add.',EQ(`χ² = ${FR('(45 − 37.5)²','37.5')} ${CT('+')} ${FR('(15 − 22.5)²','22.5')} ${CT('+')} ${FR('(30 − 37.5)²','37.5')} ${CT('+')} ${FR('(30 − 22.5)²','22.5')}`)+EQ(`χ² = 1.5 ${CT('+')} 2.5 ${CT('+')} 1.5 ${CT('+')} 2.5 = ${ANS('8')}`),CALC('(45−37.5)²÷37.5+(15−22.5)²÷22.5+(30−37.5)²÷37.5+(30−22.5)²÷22.5','8'))}
${STEP(5,'Decision','Rule: calculated &lt; critical → fail to reject H₀ (we fail to prove the dependency). Calculated &gt; critical → reject H₀ (the dependency is proven).',DECIDE('8 vs 3.841','8 &gt; 3.841 → reject H₀')+`<p class="say">At the 5% significance level (95% confidence), study year and library use are dependent: they are related.</p>`)}
${MIS('df = n − 1 = 119','df = (rows − 1)(columns − 1) = 1')}`});

(function(){
  const css=`
body.q2l{background:var(--bg);--c1:#1F63B5;--c2:#B5651D;--c3:#7c3aed;--cg:#15803d;--cr:#c62828;--ck:#7c3aed;--cs:#ea580c}
:root[data-theme="dark"] body.q2l{--c1:#7FB2FF;--c2:#f0a35e;--c3:#c4a5ff;--cg:#4ade80;--cr:#ff8a80;--ck:#c4a5ff;--cs:#fb923c}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) body.q2l{--c1:#7FB2FF;--c2:#f0a35e;--c3:#c4a5ff;--cg:#4ade80;--cr:#ff8a80;--ck:#c4a5ff;--cs:#fb923c}}
.ql-main{padding:22px 12px 40px}
.ql-cover,.ch{max-width:900px;margin:0 auto 22px;background:var(--surface);border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,.08);padding:30px 44px}
.ql-top{display:flex;justify-content:space-between;gap:12px;font-family:var(--f-mono);font-size:.74rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);border-bottom:2px solid var(--ink);padding-bottom:8px}
.ql-cover h1{font-family:var(--f-display);font-size:clamp(1.9rem,4.5vw,2.6rem);font-weight:800;text-align:center;margin:20px 0 4px}
.ql-cover>p{text-align:center;color:var(--muted);font-family:var(--f-display);margin:0 0 14px}
.ql-toc{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.ql-toc a{display:block;text-decoration:none;color:var(--ink);border:1px solid var(--line);border-left:5px solid var(--c1);border-radius:8px;padding:9px 12px;font-family:var(--f-display);height:100%}
.ql-toc small{display:block;color:var(--c1);font-family:var(--f-mono);font-size:.7rem;text-transform:uppercase;letter-spacing:.06em}
.ql-tools{text-align:center;margin-top:14px}
.ch{scroll-margin-top:72px;font-family:var(--f-display)}
.ch-h{display:flex;justify-content:space-between;align-items:flex-end;gap:10px;border-bottom:3px solid var(--c1);padding-bottom:8px;margin-bottom:14px}
.ch-h h2{font-size:1.6rem;font-weight:800;margin:0;line-height:1.15}
.ch-h small{display:block;font-family:var(--f-mono);font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;color:var(--c1)}
.ch-h a{font-size:.85rem;white-space:nowrap}
.ch p{margin:6px 0}
.box{border-radius:10px;padding:10px 14px;margin:10px 0;border:1px solid var(--line);border-left:6px solid var(--bc,var(--c1));background:color-mix(in srgb,var(--bc,var(--c1)) 6%,var(--surface))}
.box .bt{font-family:var(--f-mono);font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;font-weight:700;color:var(--bc,var(--c1));margin-bottom:4px}
.box.what{--bc:var(--c1)}.box.chk{--bc:var(--cg)}.box.kw{--bc:var(--c3)}.box.fm{--bc:var(--cr)}.box.get{--bc:var(--c2)}
.egl{color:var(--muted);font-size:.95rem}
.four{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}.four>div{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:6px 8px;font-size:.92rem}
.four.sm>div{font-size:.88rem}
.words{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:6px}.words>div{display:flex;gap:8px;align-items:baseline;background:var(--surface);border-radius:8px;padding:5px 8px;border:1px solid var(--line)}
.words b{color:var(--c3);font-family:var(--f-mono);min-width:2.6em;white-space:nowrap}.words span{font-size:.9rem}
.fgrid{display:flex;flex-wrap:wrap;gap:8px 12px}
.eq{font-family:var(--f-mono);font-size:1.02rem;display:flex;align-items:center;flex-wrap:wrap;gap:.3em;margin:4px 0;padding:4px 10px;background:var(--surface);border-radius:8px;border:1px solid var(--line);width:fit-content;max-width:100%}
.fr{display:inline-flex;flex-direction:column;text-align:center;vertical-align:middle;margin:0 .15em}.fr .n{color:var(--cg);border-bottom:2px solid currentColor;padding:0 .3em}.fr .n{border-color:var(--ink)}.fr .d{color:var(--cr);padding:0 .3em}
.kb{color:var(--ck);font-weight:700}.ks{color:var(--cs);font-weight:700}
.v1{color:var(--c1);font-weight:700}.v2{color:var(--c2);font-weight:700}.v3{color:var(--c3);font-weight:700}
.ans{background:var(--cg);color:#fff;border-radius:6px;padding:1px 8px;font-weight:700}
.which{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-top:8px}.which>div{display:flex;flex-direction:column;align-items:center;text-align:center;background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:6px;font-size:.92rem}.which b{color:var(--cr)}
.bell{color:var(--ink)}
.keys{display:flex;flex-wrap:wrap;align-items:center;gap:5px;margin:6px 0}.keys .kl{font-family:var(--f-mono);font-size:.72rem;text-transform:uppercase;color:var(--muted);margin-right:4px}
.keys kbd{font-family:var(--f-mono);font-size:.85rem;background:#e8e8e4;color:#15181c;border-radius:6px;padding:2px 8px;box-shadow:0 2px 0 #9aa}.keys kbd.fn{background:#4a505b;color:#fff}
.keys .kr{font-family:var(--f-mono);font-weight:700;margin-left:6px}.keys .kr:before{content:'→ '}
.read{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:6px 0}.read>div{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:6px 8px;font-size:.9rem}.read>div>b:first-child{display:inline-block;width:20px;height:20px;border-radius:50%;background:var(--c2);color:#fff;text-align:center;font-size:.75rem;line-height:20px;margin-right:4px}
.tw{overflow-x:auto;margin:6px 0}
.zt,.ct{border-collapse:collapse;font-family:var(--f-mono);font-size:.82rem;background:var(--surface)}
.zt th,.zt td,.ct th,.ct td{border:1px solid var(--line);padding:3px 7px;text-align:center}
.zt th,.ct th{background:color-mix(in srgb,var(--ink) 6%,var(--surface))}
.zt .hc,.ct .hc{background:color-mix(in srgb,var(--c2) 25%,var(--surface))}
.zt tr.hr th,.ct tr.hr th,.zt tr.hr td,.ct tr.hr td{background:color-mix(in srgb,var(--c2) 14%,var(--surface))}
.zt td.hit,.ct td.hit{background:var(--c2)!important;color:#fff;font-weight:700}
.ct .tot{color:var(--cr);font-weight:700}
.fullz summary{cursor:pointer;font-weight:700;color:var(--c2);margin-top:6px}.fullz .tw{max-height:420px}
.sm{font-size:.88rem;color:var(--muted)}
.exh{font-size:1.15rem;margin:20px 0 6px;color:var(--c1)}
.ex{border:2px solid var(--ink);border-radius:10px;padding:10px 14px;font-size:1rem}.ex ol{margin:6px 0 0;padding-left:24px}
.step{display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:10px;align-items:start;border-bottom:1px dashed var(--line);padding:10px 0}
.sn{width:30px;height:30px;border-radius:50%;background:var(--c1);color:#fff;font-weight:800;display:grid;place-items:center}
.st{font-weight:800;font-size:1.02rem}.sw{color:var(--muted);font-size:.9rem;margin:1px 0 4px}
.ss{width:150px}.cimg svg{width:150px;height:auto;display:block}.ss .bell{display:block;margin:4px auto}
.decide{display:inline-flex;flex-wrap:wrap;align-items:center;gap:8px;border:2px solid var(--cs);border-radius:8px;padding:4px 10px;margin:4px 0;background:color-mix(in srgb,var(--cs) 8%,var(--surface))}
.dq{font-family:var(--f-mono);font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;color:var(--cs);font-weight:700}.da{font-weight:800}
.say{border-left:4px solid var(--cg);padding:4px 10px;background:color-mix(in srgb,var(--cg) 8%,var(--surface));border-radius:0 8px 8px 0;font-weight:600}
.mis{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.mis>div{border-radius:8px;padding:8px 10px;font-size:.92rem}.mis b{display:block;font-size:.8rem;text-transform:uppercase;letter-spacing:.05em}
.mis .bad{background:color-mix(in srgb,var(--cr) 9%,var(--surface));border:1px solid var(--cr)}.mis .bad b{color:var(--cr)}
.mis .good{background:color-mix(in srgb,var(--cg) 9%,var(--surface));border:1px solid var(--cg)}.mis .good b{color:var(--cg)}
@media (max-width:700px){.ql-cover,.ch{padding:20px 14px}.ql-main{padding:12px 6px 30px}.ql-toc,.four,.read{grid-template-columns:1fr 1fr}.step{grid-template-columns:30px minmax(0,1fr)}.ss{grid-column:2;width:140px}.mis{grid-template-columns:1fr}.ch-h{flex-direction:column;align-items:flex-start}}
@media print{
  :root,:root[data-theme]{--bg:#fff!important;--surface:#fff!important;--ink:#111!important;--muted:#444!important;--line:#bbb!important;color-scheme:light}
  body.q2l{--c1:#1F63B5;--c2:#B5651D;--c3:#7c3aed;--cg:#15803d;--cr:#c62828;--ck:#7c3aed;--cs:#ea580c}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  @page{size:A4;margin:10mm}
  body{background:#fff!important;font-size:12px}
  .lbar,.ql-cover,.support-note,.ca-btn,.ca-panel,.calm-start,.ch-h a,.fullz{display:none!important}
  .ql-main{padding:0}
  .ch{box-shadow:none;border:0;padding:0;margin:0;max-width:none;break-before:page}
  .ch:first-of-type{break-before:auto}
  .step,.box,.mis,.ex{break-inside:avoid}
  .ss,.cimg svg{width:105px}
}`;
  const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
  document.body.classList.add('lesson','q2l');
  const el=(t,a={},h='')=>{ const e=document.createElement(t); Object.entries(a).forEach(([k,v])=>e.setAttribute(k,v)); if(h) e.innerHTML=h; return e; };

  const bar=el('header',{class:'lbar'});
  bar.innerHTML=`<div class="lbar-in"><a class="brand" href="exams.html"><b>MTH 105</b><span>← Exams · Quiz 2 brief lecture</span></a>
    <nav class="lchips" aria-label="Chapters">${CH.map((w,i)=>`<a href="#${w.id}" data-id="${w.id}">${i+1} · ${esc(w.t)}</a>`).join('')}</nav>
    <div class="lctl"><button type="button" class="pill" id="pr-top">Print / PDF</button><button type="button" class="pill" id="theme" title="Light or dark">◐</button></div></div><div class="progress"><i></i></div>`;
  document.body.appendChild(bar);
  bar.querySelector('#theme').addEventListener('click',()=>GED102Theme.toggle());
  bar.querySelector('#pr-top').addEventListener('click',()=>window.print());

  const main=el('main',{class:'ql-main'});
  const cover=el('section',{class:'ql-cover'});
  cover.innerHTML=`<div class="ql-top"><span>MTH 105 · Introduction to Statistics</span><span>Fall 2026 · Nadia</span></div>
    <h1>Quiz 2 · Brief lecture</h1><p>Missed a class? Each chapter: what it is · key words · formulas · how to get the values · one exercise solved step by step</p>
    <ol class="ql-toc">${CH.map(w=>`<li><a href="#${w.id}"><small>${w.wk}</small>${w.t}</a></li>`).join('')}</ol>
    <div class="ql-tools"><button type="button" class="btn" id="pr">Print / Save as PDF</button></div>`;
  main.appendChild(cover);
  cover.querySelector('#pr').addEventListener('click',()=>window.print());
  CH.forEach((w,i)=>{
    const s=el('section',{class:'ch',id:w.id});
    s.innerHTML=`<div class="ch-h"><h2><small>${w.wk} · chapter ${i+1} of 4</small>${w.t}</h2><a href="${w.href}">Full lecture →</a></div>${w.html}`;
    main.appendChild(s);
  });
  document.body.appendChild(main);
  document.body.appendChild(el('p',{class:'support-note'},'This website is interactive course support. It does not replace classes, attendance or class activities.'));

  const chips=[...bar.querySelectorAll('.lchips a')], secs=[...main.querySelectorAll('.ch')];
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) chips.forEach(c=>c.classList.toggle('on',c.dataset.id===e.target.id)); }),{rootMargin:'-20% 0px -70% 0px'});
  secs.forEach(x=>io.observe(x));
  const onScroll=()=>{ const d=document.documentElement; bar.querySelector('.progress i').style.width=(d.scrollTop/((d.scrollHeight-d.clientHeight)||1)*100)+'%'; };
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
  const h=location.hash.slice(1); if(h&&document.getElementById(h)) setTimeout(()=>document.getElementById(h).scrollIntoView(),60);
})();
