// {"file": "week-03.html", "title": "MTH 105 Week 3 · Central Tendency and Position", "wk": "#0E7C66", "wkd": "#5FD3B5"}
const FT='font-family="Schibsted Grotesk,Arial"', MONO='font-family="JetBrains Mono,monospace"';
const W2='<a href="https://nadiamek-tech.github.io/MindTheGap/workshop-02.html" target="_blank" rel="noopener">Every symbol, step by step: Mind the Gap Workshop 2 ↗</a>';
const CASES=[['Exam scores (difficult exam)','30, 45, 50, 82, 85, 87, 88, 90, 91, 92, 93, 95, 95','78.69','88','95','Mean < median < mode → <b>left-skewed</b>'],
             ['Coffee cups sold per day','45, 47, 48, 49, 50, 50, 50, 51, 52, 53, 55','50','50','50','Mean = median = mode → <b>symmetric</b>'],
             ['Salaries (thousand $)','42, 45, 48, 50, 52, 55, 58, 60, 62, 150, 180, 200','83.5','56.5','none','Median < mean → <b>right-skewed</b>']];
function threeCases(el){
  el.innerHTML=`<div class="tool"><div class="seg2">${CASES.map((c,i)=>`<button type="button" aria-pressed="${i===0}">${c[0].split(' (')[0]}</button>`).join('')}</div><div class="pic"></div></div>`;
  const draw=i=>{ const [t,d,m,md,mo,c]=CASES[i]; el.querySelector('.pic').innerHTML=`<p class="mono" style="margin:0 0 6px">${t}: ${d}</p><div class="out"><div><small>Mean</small><b>${m}</b></div><div><small>Median</small><b>${md}</b></div><div><small>Mode</small><b>${mo}</b></div></div><div class="feedback" style="margin-top:8px">${c}</div>`; };
  el.querySelectorAll('.seg2 button').forEach((b,i)=>b.addEventListener('click',()=>{ el.querySelectorAll('.seg2 button').forEach(x=>x.setAttribute('aria-pressed',x===b)); draw(i); })); draw(0);
}
function medianFinder(el){
  el.innerHTML=`<div class="tool"><label for="md-in">Data</label><textarea id="md-in" rows="2">7 3 9 5 20 6</textarea><div class="pic"></div><div class="feedback"></div></div>`;
  const run=()=>{ const a=ST.nums(el.querySelector('#md-in').value); if(a.length<1) return; const s=[...a].sort((p,q)=>p-q), n=s.length, pos=(n+1)/2;
    const mid=n%2?[(n-1)/2]:[n/2-1,n/2]; const cnt={}; s.forEach(x=>cnt[x]=(cnt[x]||0)+1); const mx=Math.max(...Object.values(cnt)); const modes=mx>1?Object.keys(cnt).filter(k=>cnt[k]===mx):[];
    el.querySelector('.pic').innerHTML=`<div class="keys">${s.map((x,i)=>`<kbd class="${mid.includes(i)?'eq':''}">${x}</kbd>`).join('')}</div>`;
    el.querySelector('.feedback').innerHTML=`n = ${n} → position (n + 1) ÷ 2 = <b>${pos}</b> → median = <b>${ST.r2(ST.median(s))}</b>${n%2?'':' (mean of the two middle values)'} · mode = <b>${modes.length?modes.join(', '):'none'}</b>`; };
  el.querySelector('textarea').addEventListener('input',run); run();
}

Lesson.mount({
  week:3, clo:'CLO 1', title:'Measures of Central Tendency and Position', chapter:'Ch.3: Numerical Summaries of Center and Variation · Gould, Ryan & Wong (2020)',
  intro:'One number for the middle of the data, and a way to say where a value sits.',
  topics:[
  { id:'mean', title:'The mean',
    def:'The <b>mean</b> x̄ is the balance point of the data: add all values and divide by how many there are.',
    life:{text:'Five friends sleep 8, 9, 10, 12 and 13 hours over a weekend. What is the typical amount? Data: illustrative.'},
    formula:{f:`${T('xb',XB)} = ${fr(`${T('S',SG)}${T('x',v('x'))}`,T('n',v('n')))}`,
      parts:[['xb','<b>x̄</b> (“x-bar”): the sample mean.'],['S','<b>Σ</b>: add up everything after it.'],['x','<b>x</b>: each data value.'],['n','<b>n</b>: how many values.']],
      sub:`${XB} = ${fr('8 + 9 + 10 + 12 + 13','5')}`, keys:'( 8 + 9 + 1 0 + 1 2 + 1 3 ) ÷ 5 =', ans:`<div class="m">${XB} = 52 ÷ 5 = <b>10.4</b> hours</div>`, ansRaw:true},
    meaning:{text:'If all five slept the same amount, each would sleep 10.4 hours. The mean uses every value, so one extreme value moves it.'} },

  { id:'median', title:'Median and mode',
    def:'The <b>median</b> is the middle value after sorting. The <b>mode</b> is the most frequent value; it is the only centre for nominal data.',
    life:{text:'Delivery times (min): 7, 3, 9, 5, 20, 6. Sort first: 3, 5, 6, 7, 9, 20.'},
    formula:{f:`${T('pos','Position')} = ${fr(`${T('n',v('n'))} + 1`,'2')}`,
      parts:[['pos','<b>Position</b>: where the median sits in the sorted list.'],['n','<b>n</b>: how many values.']],
      sub:`Position = ${fr('6 + 1','2')} = 3.5`, subNote:'Halfway between the 3rd and 4th values.', keys:'( 6 + 7 ) ÷ 2 =',
      ans:`<div class="m">Median = (6 + 7) ÷ 2 = <b>6.5</b> min</div>`, ansRaw:true, ansNote:'n odd → the middle value. n even → mean of the two middle values.'},
    meaning:{text:'Type any data to see the middle and the mode.', fig:{label:'Type data, see the middle', build:medianFinder}} },

  { id:'which', title:'Which centre to use?',
    def:'In <b>symmetric</b> data, mean ≈ median ≈ mode. <b>Skew</b> pulls the mean towards the tail.',
    life:{text:'Salaries in a small company: most earn 42–62 thousand, three managers earn 150–200 thousand. Data: Week 1–2 slides.'},
    meaning:{text:'For skewed data or outliers, report the <b>median</b>. For symmetric data, the mean.', fig:{label:'Three data sets', build:threeCases}} },

  { id:'quartiles', title:'Percentiles and quartiles',
    def:'A <b>percentile</b> gives the position of a value: P25 = Q1, P50 = median, P75 = Q3.',
    life:{text:'“Your score is at the 75th percentile” means 75% of the class scored at or below you.'},
    meaning:{text:'Sort, find the median, then the median of each half. When n is odd, leave the median out of both halves.',
      fig:{label:'Data: 3, 5, 7, 8, 9, 11, 13, 15, 18 (n = 9)', html:`<div class="keys">${[3,5,7,8,9,11,13,15,18].map((x,i)=>`<kbd class="${i===4?'eq':''}">${x}</kbd>`).join('')}</div><div class="steps" style="margin-top:10px">Median: position (9 + 1) ÷ 2 = 5 → <b>9</b><br>Lower half 3, 5, 7, 8 → Q1 = (5 + 7) ÷ 2 = <b>6</b><br>Upper half 11, 13, 15, 18 → Q3 = (13 + 15) ÷ 2 = <b>14</b></div>`}} }
  ],
  takeaways:{label:'Week 3 on one page', mindmap:{center:'Week 3', branches:[
    {t:'Mean',items:['x̄ = Σx ÷ n']},{t:'Median',items:['Sort first','Position (n + 1) ÷ 2']},{t:'Mode',items:['Most frequent','Only centre for nominal data']},
    {t:'Skew',items:['Mean pulled to the tail','Skewed data → median']},{t:'Position',items:['Q1 = P25, median = P50, Q3 = P75']}]}},
  practice:[
    {type:'Easy',q:'Find the mean of 4, 8, 6, 10, 7.',hint:'x̄ = 35 ÷ 5 = <b>7</b>.'},
    {type:'Easy',q:'Find the median of 15, 3, 9, 12, 6, 18.',hint:'Sorted: 3, 6, 9, 12, 15, 18. n = 6 → (9 + 12) ÷ 2 = <b>10.5</b>.'},
    {type:'Easy',q:'Favourite campus café of 10 students: A, B, A, C, A, B, A, C, B, A. Which centre can you use, and what is it?',hint:'Nominal data: only the <b>mode</b>. Mode = <b>A</b> (5 times).'},
    {type:'Medium',q:'Hours of sleep of 8 students: 6, 7, 5, 8, 7, 9, 7, 6. Find the mean, median and mode.',hint:'Sorted: 5, 6, 6, 7, 7, 7, 8, 9. Mean = 55 ÷ 8 = <b>6.875</b>. Median = (7 + 7) ÷ 2 = <b>7</b>. Mode = <b>7</b>.'},
    {type:'Medium',q:'Find Q1 and Q3 of 1, 3, 4, 6, 8, 9, 11, 14.',hint:'Lower half 1, 3, 4, 6 → Q1 = (3 + 4) ÷ 2 = <b>3.5</b>. Upper half 8, 9, 11, 14 → Q3 = (9 + 11) ÷ 2 = <b>10</b>.'},
    {type:'Hard',q:'Weekly study hours of 40 students: 0–5: 8, 6–10: 15, 11–15: 12, 16–20: 5. Estimate the mean using midpoints.',hint:'Midpoints 2.5, 8, 13, 18. Σf·m = 20 + 120 + 156 + 90 = 386. Mean ≈ 386 ÷ 40 = <b>9.65 hours</b>.'},
    {type:'Hard',q:'Monthly salaries (thousand AED) of 6 staff: 8, 9, 9, 10, 11, 40. Find the mean, median and mode. Which is the best typical value?',hint:'Mean = 87 ÷ 6 = <b>14.5</b>. Median = (9 + 10) ÷ 2 = <b>9.5</b>. Mode = <b>9</b>. The <b>median</b>: 40 pulls the mean up.'}],
  next:'Next: Week 4, measures of dispersion. <a href="week-04.html">Open Week 4 →</a>'
});
