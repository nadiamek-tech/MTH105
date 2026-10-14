// {"file": "week-01.html", "title": "MTH 105 Week 1 · Introduction to Statistics", "wk": "#C8102E", "wkd": "#FF7A7F"}
const FT='font-family="Schibsted Grotesk,Arial"', MONO='font-family="JetBrains Mono,monospace"';

function sampleTool(el){
  el.innerHTML=`<div class="tool"><div class="sl"><label for="sm-n">Sample size n</label><input type="range" id="sm-n" min="5" max="200" step="5" value="10"><b class="mono" id="sm-nv"></b></div><div class="pic"></div><div class="feedback"></div><p class="mono" style="margin:0;color:var(--muted)">Population: 1,000 students, 60% prefer evening classes (illustrative). 20 random samples.</p></div>`;
  const run=()=>{ const n=+el.querySelector('#sm-n').value; el.querySelector('#sm-nv').textContent=n; let seed=11; const rnd=()=>{ seed=(seed*16807)%2147483647; return seed/2147483647; };
    const ps=[...Array(20)].map(()=>{ let k=0; for(let i=0;i<n;i++) if(rnd()<.6) k++; return k/n; });
    const Wd=520,Hd=120,L=20,R=20,X=p=>L+(Wd-L-R)*p;
    el.querySelector('.pic').innerHTML=`<svg viewBox="0 0 ${Wd} ${Hd}" role="img" aria-label="Sample percentages"><line x1="${L}" x2="${Wd-R}" y1="80" y2="80" stroke="var(--ink)"/>${[0,.2,.4,.6,.8,1].map(p=>`<line x1="${X(p)}" x2="${X(p)}" y1="80" y2="86" stroke="var(--muted)"/><text x="${X(p)}" y="100" text-anchor="middle" ${MONO} font-size="11" fill="var(--muted)">${p*100}%</text>`).join('')}
      <line x1="${X(.6)}" x2="${X(.6)}" y1="10" y2="80" stroke="var(--wk)" stroke-width="2" stroke-dasharray="5 4"/><text x="${X(.6)+6}" y="20" ${FT} font-size="12" font-weight="700" fill="var(--wk)">true 60%</text>
      ${ps.map((p,i)=>`<circle cx="${X(p)}" cy="${70-(i%6)*9}" r="5" fill="var(--c2)" opacity=".75"/>`).join('')}</svg>`;
    const lo=Math.min(...ps), hi=Math.max(...ps);
    el.querySelector('.feedback').innerHTML=`Samples gave between <b>${Math.round(lo*100)}%</b> and <b>${Math.round(hi*100)}%</b>. ${n<40?'Small samples swing a lot.':'Larger samples land closer to 60%.'}`; };
  el.querySelector('input').addEventListener('input',run); run();
}
function outlierTool(el){
  const base=[14,16,15,17,15];
  el.innerHTML=`<div class="tool"><div class="seg2"><button type="button" aria-pressed="false">Without 90</button><button type="button" aria-pressed="true">With 90</button></div><div class="pic"></div><div class="out"></div></div>`;
  const draw=on=>{ const a=on?[...base,90]:base, m=a.reduce((p,q)=>p+q,0)/a.length, md=ST.median(a), X=v=>20+480*(v-10)/85;
    el.querySelector('.pic').innerHTML=`<svg viewBox="0 0 520 110" role="img" aria-label="Delivery times dot plot"><line x1="20" x2="500" y1="70" y2="70" stroke="var(--ink)"/>${[10,30,50,70,90].map(t=>`<text x="${X(t)}" y="92" text-anchor="middle" ${MONO} font-size="11" fill="var(--muted)">${t}</text>`).join('')}
      ${a.map((v,i)=>`<circle cx="${X(v)}" cy="${60-(a.slice(0,i).filter(w=>w===v).length)*12}" r="6" fill="${v===90?'var(--wk)':'var(--c2)'}"/>`).join('')}
      <line x1="${X(m)}" x2="${X(m)}" y1="10" y2="70" stroke="var(--wk)" stroke-width="2"/><text x="${X(m)+5}" y="16" ${FT} font-size="12" font-weight="700" fill="var(--wk)">mean</text>
      <line x1="${X(md)}" x2="${X(md)}" y1="30" y2="70" stroke="var(--c3)" stroke-width="2" stroke-dasharray="5 4"/><text x="${X(md)+5}" y="44" text-anchor="start" ${FT} font-size="12" font-weight="700" fill="var(--c3)">median</text></svg>`;
    el.querySelector('.out').innerHTML=`<div><small>Mean</small><b>${ST.r2(m)} min</b></div><div><small>Median</small><b>${ST.r2(md)} min</b></div>`; };
  el.querySelectorAll('.seg2 button').forEach((b,i)=>b.addEventListener('click',()=>{ el.querySelectorAll('.seg2 button').forEach(x=>x.setAttribute('aria-pressed',x===b)); draw(i===1); }));
  draw(true);
}
const popSVG=`<svg viewBox="0 0 520 220" role="img" aria-label="Population and sample">
  <ellipse cx="200" cy="110" rx="180" ry="95" fill="var(--wk-soft)" stroke="var(--wk)" stroke-width="2"/>
  <text x="70" y="40" ${FT} font-weight="800" font-size="16" fill="var(--wk)">Population · N</text>
  <text x="70" y="62" ${FT} font-size="13" fill="var(--ink)">Parameters: μ, σ, p</text>
  ${[...Array(36)].map((_,i)=>`<circle cx="${80+(i%9)*26}" cy="${88+Math.floor(i/9)*26}" r="6" fill="var(--muted)" opacity=".45"/>`).join('')}
  <ellipse cx="245" cy="140" rx="62" ry="36" fill="none" stroke="var(--c2)" stroke-width="2.5"/>
  ${[[214,140],[240,140],[266,140],[227,114],[253,166]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" fill="var(--c2)"/>`).join('')}
  <path d="M310 140 C350 140 360 150 390 150" fill="none" stroke="var(--c2)" stroke-width="2"/>
  <text x="396" y="146" ${FT} font-weight="800" font-size="16" fill="var(--c2)">Sample · n</text>
  <text x="396" y="168" ${FT} font-size="13" fill="var(--ink)">Statistics: x̄, s, p̂</text></svg>`;
const typesSVG=`<svg viewBox="0 0 520 210" role="img" aria-label="Types of data">
  <rect x="200" y="10" width="120" height="34" rx="8" fill="var(--wk)"/><text x="260" y="32" text-anchor="middle" ${FT} font-weight="700" font-size="14" fill="#fff">Data</text>
  ${[[130,'Qualitative','categories','var(--wk)',[[60,'Nominal','no order'],[200,'Ordinal','ordered']]],[390,'Quantitative','numbers','var(--c2)',[[320,'Discrete','counted'],[460,'Continuous','measured']]]].map(([x,t,s,c,kids])=>`<line x1="260" y1="44" x2="${x}" y2="76" stroke="var(--line)" stroke-width="2"/><rect x="${x-70}" y="76" width="140" height="40" rx="8" fill="var(--surface)" stroke="${c}" stroke-width="2"/><text x="${x}" y="94" text-anchor="middle" ${FT} font-weight="700" font-size="14" fill="${c}">${t}</text><text x="${x}" y="109" text-anchor="middle" ${FT} font-size="11" fill="var(--muted)">${s}</text>
    ${kids.map(([kx,kt,ks])=>`<line x1="${x}" y1="116" x2="${kx}" y2="150" stroke="var(--line)" stroke-width="2"/><rect x="${kx-55}" y="150" width="110" height="44" rx="8" fill="var(--bg)" stroke="var(--line)"/><text x="${kx}" y="170" text-anchor="middle" ${FT} font-weight="700" font-size="13" fill="var(--ink)">${kt}</text><text x="${kx}" y="186" text-anchor="middle" ${FT} font-size="11" fill="var(--muted)">${ks}</text>`).join('')}`).join('')}</svg>`;

const P1=T('ph',PH);
Lesson.mount({
  week:1, clo:'CLO 1', title:'Introduction to Statistics', chapter:'Ch.1: Introduction to Data · Gould, Ryan & Wong (2020)',
  intro:'Statistics turns data into decisions: we collect, organize, analyze, interpret and communicate.',
  topics:[
  { id:'statistics', title:'What is statistics?',
    def:'<b>Statistics</b> is the science of collecting, organizing, analyzing, interpreting and communicating data to support decisions.',
    life:{text:'A transport authority wants to know whether a new Metro feeder bus is worth running. It counts riders (collect), puts them in a table (organize), draws a chart (analyze), reads it (interpret) and reports a decision (communicate). Data: illustrative.'},
    meaning:{text:'Every statistics question follows the same five steps. This course teaches each one.',
      fig:{label:'The statistical workflow', flow:[{t:'Collect',s:'get data',d:'Survey, experiment or records.'},{t:'Organize',s:'tables',d:'Frequency tables and lists.'},{t:'Analyze',s:'graphs, numbers',d:'Charts, mean, spread.'},{t:'Interpret',s:'what it means',d:'In the context of the question.'},{t:'Communicate',s:'decide',d:'Report the finding and its uncertainty.'}]}} },

  { id:'descriptive', title:'Descriptive and inferential statistics',
    def:'<b>Descriptive</b> statistics describe the data we have: tables, graphs, averages. <b>Inferential</b> statistics use a sample to say something about the whole population.',
    life:{text:'Sort each statement. Ask: does it stay with the data we have, or go beyond it?',
      fig:{label:'Sort each statement', build:el=>W.sort(el,{buckets:['Descriptive','Inferential'],items:[
        {t:'The mean of our 25 quiz scores was 7.2.',a:0,why:'It only describes the 25 scores we have.'},
        {t:'Based on 500 residents surveyed, about 55% of all Dubai residents use the Metro weekly.',a:1,why:'It generalises from a sample to the population.'},
        {t:'A bar chart shows how our class travels to campus.',a:0,why:'A graph of the data we collected.'},
        {t:'A trial of 200 patients suggests the new drug lowers blood pressure for adults in general.',a:1,why:'It draws a conclusion beyond the 200 patients.'}]})}},
    meaning:{text:'Weeks 1–6 are mostly descriptive. From Week 10, we use samples to estimate the population: inferential statistics.'} },

  { id:'population', title:'Population and sample',
    def:'The <b>population</b> is the whole group we study (size N). A <b>sample</b> is the part we measure (size n). A number describing the population is a <b>parameter</b>; a number from a sample is a <b>statistic</b>.',
    life:{text:'A survey of 250 Dubai residents finds that 85 use the Metro. The 250 are the sample; all Dubai residents are the population. Data: illustrative.'},
    formula:{f:`${P1} = ${fr(T('x',v('x')),T('n',v('n')))}`,
      parts:[['ph','<b>p̂</b> (“p-hat”): the sample proportion, a statistic.'],['x','<b>x</b>: how many in the sample have the feature.'],['n','<b>n</b>: the sample size.']],
      sub:`p̂ = ${fr('85','250')}`, subNote:'85 of 250 residents use the Metro.', keys:'8 5 ÷ 2 5 0 =',
      ans:`<div class="m">p̂ = <b>0.34</b> = 34%</div>`, ansRaw:true, ansNote:'A statistic: it comes from the sample, not from all residents.'},
    meaning:{text:'We use the statistic (p̂ = 34%) to estimate the unknown parameter p: the true share of all residents.', fig:{label:'Parameter vs statistic', html:popSVG}} },

  { id:'types', title:'Types of data',
    def:'<b>Qualitative</b> data are categories: <b>nominal</b> (no order) or <b>ordinal</b> (ordered). <b>Quantitative</b> data are numbers: <b>discrete</b> (counted) or <b>continuous</b> (measured).',
    life:{text:'Classify these everyday variables.',
      fig:{label:'8 variables', build:el=>W.sort(el,{buckets:['Nominal','Ordinal','Discrete','Continuous'],items:[
        {t:'Emirate of residence',a:0,why:'Names, no order.'},{t:'Hotel star rating (1★ to 5★)',a:1,why:'Ordered categories; gaps between stars are not equal.'},
        {t:'Number of siblings',a:2,why:'Counted: 0, 1, 2 …'},{t:'Daily maximum temperature (°C)',a:3,why:'Measured; can take decimals.'},
        {t:'Student ID number',a:0,why:'A label: the digits are not quantities.'},{t:'Satisfaction: low, medium, high',a:1,why:'Ordered categories.'},
        {t:'Number of cars passing a toll gate in an hour',a:2,why:'Counted.'},{t:'Time to finish a 5 km run',a:3,why:'Measured.'}]})}},
    meaning:{text:'The type decides the tools: categories → counts, bar and pie charts, mode. Numbers → histograms, mean, spread.', fig:{label:'The building blocks', html:typesSVG}} },

  { id:'samples', title:'Representative samples and sample size',
    def:'A <b>representative</b> sample looks like the population. Choose it <b>at random</b>, not by convenience. Larger random samples give estimates closer to the truth.',
    life:{text:'A newsletter asks 30 students in the library at 9 PM; 21 say they prefer studying at night. Headline: “70% of students prefer night study.” The sample is biased: students in the library at night already study at night.'},
    meaning:{text:'Drag the sample size. With small n, sample results swing widely; with large n, they cluster near the true value.', fig:{label:'Drag the sample size', build:sampleTool}} },

  { id:'outliers', title:'The impact of outliers',
    def:'An <b>outlier</b> is a value far from the rest of the data.',
    life:{text:'Pizza delivery times (min): 12, 14, 13, 15, 46. One late delivery (46) is far from the others.'},
    formula:{f:`${T('xb',XB)} = ${fr(`${T('S',SG)}${T('x',v('x'))}`,T('n',v('n')))}`,
      parts:[['xb','<b>x̄</b>: the mean.'],['S','<b>Σ</b>: add up.'],['x','<b>x</b>: each value.'],['n','<b>n</b>: how many values.']],
      sub:`x̄ = ${fr('12 + 14 + 13 + 15 + 46','5')}`, keys:'( 1 2 + 1 4 + 1 3 + 1 5 + 4 6 ) ÷ 5 =',
      ans:`<div class="m">x̄ = <b>20</b> min</div>`, ansRaw:true, ansNote:'The median is 14 min. Four of five deliveries took 15 min or less.'},
    meaning:{text:'The outlier pulls the mean up to 20; the median stays at 14. With outliers, report the median.', fig:{label:'Add or remove the outlier', build:outlierTool}} }
  ],
  takeaways:{label:'Week 1 on one page', mindmap:{center:'Week 1', branches:[
    {t:'Statistics',items:['Collect, organize, analyze, interpret, communicate','Descriptive vs inferential']},
    {t:'Population and sample',items:['N → parameters μ, σ, p','n → statistics x̄, s, p̂']},
    {t:'Types of data',items:['Nominal, ordinal','Discrete, continuous']},
    {t:'Good samples',items:['Random, representative','Larger n → closer estimates']},
    {t:'Outliers',items:['Pull the mean','Median resists them']}]}},
  practice:[
    {type:'Easy',q:'A health survey asks 400 adults in Dubai and finds 28% exercise daily. Name the population, sample, parameter and statistic.',hint:'Population: all adults in Dubai. Sample: the 400 surveyed. Statistic: <b>28%</b>. Parameter: the true % of <b>all</b> Dubai adults who exercise daily (unknown).'},
    {type:'Easy',q:'Classify: (a) blood type (b) number of emails received today (c) height in cm (d) class rank (1st, 2nd, 3rd).',hint:'(a) Nominal (b) Discrete (c) Continuous (d) Ordinal.'},
    {type:'Easy',q:'In a sample of 250 residents, 85 use the Metro. Find p̂ as a percentage.',hint:'p̂ = 85 ÷ 250 = <b>0.34 = 34%</b>.'},
    {type:'Medium',q:'Descriptive or inferential? “From 1,200 shoppers surveyed, we estimate 35% of UAE shoppers buy groceries online.”',hint:'<b>Inferential</b>: it generalises from 1,200 shoppers to all UAE shoppers.'},
    {type:'Medium',q:'To estimate gym use at CUD, a researcher asks students as they leave the gym. What is wrong, and how would you fix it?',hint:'Every person asked already uses the gym: the sample is <b>biased</b>. Take a <b>random</b> sample of all students.'},
    {type:'Hard',q:'Commute times (min): 20, 22, 25, 24, 23, 95. Find the mean and the median. Which is the better typical value?',hint:'Mean = 209 ÷ 6 ≈ <b>34.8</b>. Median = (23 + 24) ÷ 2 = <b>23.5</b>. The <b>median</b>: the outlier 95 pulls the mean up.'},
    {type:'Hard',q:'Remove 95 from the commute data. Find the new mean and median. Which measure changed more?',hint:'Mean = 114 ÷ 5 = <b>22.8</b>; median = <b>23</b>. The <b>mean</b> changed more (34.8 → 22.8).'}],
  next:'Next: Week 2, Ch.2 Picturing Variation with Graphs. <a href="week-02.html">Open Week 2 →</a>'
});
