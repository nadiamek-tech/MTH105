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

Lecture.mount({
  id:'mth105-w1', course:'MTH 105', home:'lectures.html', homeLabel:'Lectures', short:'Week 1 · Introduction', eyebrow:'Week 1 · CLO 1', noTeacher:true,
  title:'Introduction to Statistics', meta:'Ch.1: Introduction to Data · Gould, Ryan & Wong (2020)', endLabel:'Week 2 →',
  scenes:[
  { nav:'Start here', title:'From data to decisions', minutes:5,
    narration:[`Statistics is the science of collecting, organizing, analyzing, interpreting and communicating data to support decisions. <span class="mono">Topics: Descriptive and inferential statistics · Definitions of representative samples and importance of sample size, and impact of outliers · Illustrative practical examples of use of Statistics. CLO 1.</span>`],
    src:'Reading: Gould, Ryan &amp; Wong (2020), Ch.1: Introduction to Data.',
    fig:{label:'The statistical workflow', flow:[
      {t:'Collect',s:'get data',d:'Survey, experiment or records.'},{t:'Organize',s:'tables',d:'Frequency tables and lists.'},{t:'Analyze',s:'graphs, numbers',d:'Charts, mean, spread.'},{t:'Interpret',s:'what it means',d:'In the context of the question.'},{t:'Communicate',s:'decide',d:'Report the finding and its uncertainty.'}]} },

  { nav:'Descriptive vs inferential', title:'Descriptive and inferential statistics', minutes:8,
    narration:[`<b>Descriptive</b> statistics describe the data we have: tables, graphs, averages. <b>Inferential</b> statistics use a sample to estimate or test something about the whole population.`],
    fig:{label:'Sort each statement', build:el=>W.sort(el,{buckets:['Descriptive','Inferential'],items:[
      {t:'The mean of our 25 quiz scores was 7.2.',a:0,why:'It only describes the 25 scores we have.'},
      {t:'Based on 500 residents surveyed, about 55% of all Dubai residents use the Metro weekly.',a:1,why:'It generalises from a sample to the population.'},
      {t:'A bar chart shows how our class travels to campus.',a:0,why:'A graph of the data we collected.'},
      {t:'A trial of 200 patients suggests the new drug lowers blood pressure for adults in general.',a:1,why:'It draws a conclusion beyond the 200 patients.'}]})} },

  { nav:'Population and sample', title:'Population vs sample', minutes:8,
    narration:[`The <b>population</b> is the whole group we want to study (size N). A <b>sample</b> is the part we actually measure (size n). Numbers that describe a population are <b>parameters</b>; numbers from a sample are <b>statistics</b>.`],
    fig:{label:'Parameter vs statistic', html:popSVG} },

  { nav:'Types of data', title:'Types of data', minutes:8,
    narration:[`<b>Qualitative</b> data are categories: nominal (no order) or ordinal (ordered). <b>Quantitative</b> data are numbers: discrete (counted) or continuous (measured).`],
    fig:{label:'The building blocks', html:typesSVG} },

  { nav:'Sort the variables', title:'Activity · Classify the variables', kind:'activity', minutes:10,
    narration:[`Pick the type for each variable.`],
    fig:{label:'8 variables', build:el=>W.sort(el,{buckets:['Nominal','Ordinal','Discrete','Continuous'],items:[
      {t:'Emirate of residence',a:0,why:'Names, no order.'},{t:'Hotel star rating (1★ to 5★)',a:1,why:'Ordered categories; gaps between stars are not equal.'},
      {t:'Number of siblings',a:2,why:'Counted: 0, 1, 2 …'},{t:'Daily maximum temperature (°C)',a:3,why:'Measured; can take decimals.'},
      {t:'Student ID number',a:0,why:'A label: the digits are not quantities.'},{t:'Satisfaction: low, medium, high',a:1,why:'Ordered categories.'},
      {t:'Number of cars passing a toll gate in an hour',a:2,why:'Counted.'},{t:'Time to finish a 5 km run',a:3,why:'Measured.'}]})} },

  { nav:'Sample size', title:'Representative samples and sample size', minutes:10,
    narration:[`A <b>representative</b> sample looks like the population: choose it at random, not by convenience. Bigger random samples give estimates closer to the truth.`],
    fig:{label:'Drag the sample size', build:sampleTool} },

  { nav:'Outliers', title:'The impact of outliers', minutes:8,
    narration:[`An <b>outlier</b> is a value far from the rest. It pulls the mean towards it; the median barely moves.`],
    src:'Data: pizza delivery times in minutes, from the Week 1 slides.',
    fig:{label:'Delivery times · add or remove the outlier', build:outlierTool} },

  { nav:'Check the claim', title:'Activity · Is this conclusion valid?', kind:'activity', minutes:10,
    narration:[`A campus newsletter polls 30 students in the main library at 9 PM: 21 say they prefer studying at night. Headline: “70% of students prefer studying at night.”`],
    fig:{label:'Question the data', build:practice([
      {q:'What is the variable, and what type of data is it?',hint:'Study-time preference. <b>Qualitative (nominal)</b>: night or day.'},
      {q:'What are the population and the sample?',hint:'Population: <b>all students</b>. Sample: the <b>30 students</b> in the library at 9 PM.'},
      {q:'Is the sample representative?',hint:'<b>No.</b> Students in the library at 9 PM are more likely to be night studiers: a convenience sample biased towards “night”.'},
      {q:'How would you fix the study?',hint:'Select students <b>at random</b> from the whole student list, and use a larger n.'}])} },

  { nav:'Practice', title:'Practice', kind:'activity', minutes:15,
    narration:[`New examples. Answer first, then check.`], src:'Data: illustrative.',
    fig:{label:'5 questions', build:practice([
      {type:'Easy',q:'A health survey asks 400 adults in Dubai and finds 28% exercise daily. Name the population, sample, parameter and statistic.',hint:'Population: all adults in Dubai. Sample: the 400 surveyed. Statistic: <b>28%</b>. Parameter: the true % of <b>all</b> Dubai adults who exercise daily (unknown).'},
      {type:'Easy',q:'Classify: (a) blood type (b) number of emails received today (c) height in cm (d) class rank (1st, 2nd, 3rd).',hint:'(a) Nominal (b) Discrete (c) Continuous (d) Ordinal.'},
      {type:'Medium',q:'Descriptive or inferential? “From 1,200 shoppers surveyed, we estimate 35% of UAE shoppers buy groceries online.”',hint:'<b>Inferential</b>: it generalises from 1,200 shoppers to all UAE shoppers.'},
      {type:'Medium',q:'To estimate gym use at CUD, a researcher asks students as they leave the gym. What is wrong?',hint:'Every person asked already uses the gym: the sample is <b>biased</b>. Take a random sample of all students.'},
      {type:'Hard',q:'Commute times (min): 20, 22, 25, 24, 23, 95. Find the mean and median. Which is the better “typical” value?',hint:'Mean = 209 ÷ 6 ≈ <b>34.8</b>. Median = (23 + 24) ÷ 2 = <b>23.5</b>. The <b>median</b>: the outlier 95 pulls the mean up.'}])} },

  { nav:'Quick check', title:'Quick check', kind:'check', minutes:5, narration:[`Calculate, then open the answer.`],
    fig:{label:'3 calculations', build:practice([
      {q:'In a sample of 250 residents, 85 use the Metro. What percentage is this, and is it a parameter or a statistic?',hint:'85 ÷ 250 × 100% = <b>34%</b>. It comes from a sample → <b>statistic</b>.'},
      {q:'Delivery times (min): 12, 14, 13, 15, 46. Find the mean and the median.',hint:'Mean = 100 ÷ 5 = <b>20</b>. Sorted: 12, 13, 14, 15, 46 → median = <b>14</b>.'},
      {q:'Remove the outlier 46. Find the new mean and median. Which measure changed more?',hint:'Mean = 54 ÷ 4 = <b>13.5</b>; median = (13 + 14) ÷ 2 = <b>13.5</b>. The <b>mean</b> changed more (20 → 13.5).'}])} },

  { nav:'Takeaways', title:'Takeaways', kind:'review', minutes:2,
    narration:[`Next week: Ch.2, Picturing Variation with Graphs.`],
    fig:{label:'Week 1 on one page', mindmap:{center:'Week 1', branches:[
      {t:'Statistics',items:['Collect, organize, analyze, interpret, communicate','Descriptive: describe the data','Inferential: sample → population']},
      {t:'Population and sample',items:['Population N → parameters μ, σ','Sample n → statistics x̄, s']},
      {t:'Types of data',items:['Nominal, ordinal','Discrete, continuous']},
      {t:'Good samples',items:['Random, representative','Larger n → closer estimates']},
      {t:'Outliers',items:['Pull the mean','Median resists them']}]}} }
  ]
});
