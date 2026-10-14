// {"file": "week-02.html", "title": "MTH 105 Week 2 · Describing and Organizing Data", "wk": "#1F63B5", "wkd": "#7FB2FF"}
const FT='font-family="Schibsted Grotesk,Arial"', MONO='font-family="JetBrains Mono,monospace"';
const COM=[['Car',16],['Metro',12],['Bus',8],['Walk',4]];
function barPie(el){
  el.innerHTML=`<div class="tool"><div class="seg2"><button type="button" aria-pressed="true">Bar chart</button><button type="button" aria-pressed="false">Pie chart</button></div><div class="pic"></div>
   <div class="tblwrap"><table class="tbl"><tr><th>Mode</th>${COM.map(c=>`<td>${c[0]}</td>`).join('')}<th>Total</th></tr><tr><th>f</th>${COM.map(c=>`<td>${c[1]}</td>`).join('')}<td>40</td></tr><tr><th>rf = f ÷ n</th>${COM.map(c=>`<td>${c[1]/40}</td>`).join('')}<td>1</td></tr></table></div></div>`;
  const cols=['var(--wk)','var(--c3)','var(--c4)','var(--muted)'];
  const draw=m=>{ let s='';
    if(m===0){ s=`<svg viewBox="0 0 520 200" role="img" aria-label="Bar chart">${COM.map(([t,f],i)=>{ const h=f*9; return `<rect x="${50+i*115}" y="${170-h}" width="70" height="${h}" fill="${cols[i]}"/><text x="${85+i*115}" y="${163-h}" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">${f}</text><text x="${85+i*115}" y="190" text-anchor="middle" ${FT} font-size="13" fill="var(--ink)">${t}</text>`; }).join('')}<line x1="40" x2="500" y1="170" y2="170" stroke="var(--ink)"/></svg>`; }
    else { let a0=-Math.PI/2; s=`<svg viewBox="0 0 520 200" role="img" aria-label="Pie chart">`+COM.map(([t,f],i)=>{ const a1=a0+2*Math.PI*f/40, large=a1-a0>Math.PI?1:0, cx=180,cy=100,r=85; const p=`M${cx},${cy} L${cx+r*Math.cos(a0)},${cy+r*Math.sin(a0)} A${r},${r} 0 ${large} 1 ${cx+r*Math.cos(a1)},${cy+r*Math.sin(a1)} Z`; a0=a1; return `<path d="${p}" fill="${cols[i]}" stroke="var(--surface)" stroke-width="2"/><rect x="320" y="${40+i*30}" width="14" height="14" fill="${cols[i]}"/><text x="342" y="${52+i*30}" ${FT} font-size="13" fill="var(--ink)">${t} · ${f/40*100}%</text>`; }).join('')+'</svg>'; }
    el.querySelector('.pic').innerHTML=s; };
  el.querySelectorAll('.seg2 button').forEach((b,i)=>b.addEventListener('click',()=>{ el.querySelectorAll('.seg2 button').forEach(x=>x.setAttribute('aria-pressed',x===b)); draw(i); })); draw(0);
}
const H_AGE = ST.hist([4,9,8,5,3,1],['9.5','19.5','29.5','39.5','49.5','59.5','69.5'],{xlabel:'Age (years)',aria:'Histogram of visitor ages',ymax:10});

Lecture.mount({
  id:'mth105-w2', course:'MTH 105', home:'lectures.html', homeLabel:'Lectures', short:'Week 2 · Organizing data', eyebrow:'Week 2 · CLO 1', noTeacher:true,
  title:'Describing and Organizing Data', meta:'Ch.2: Picturing Variation with Graphs · Gould, Ryan & Wong (2020)', endLabel:'Weeks 3–4 →',
  scenes:[
  { nav:'Start here', title:'Organize before you analyze', minutes:3,
    narration:[`Raw data are hard to read. Tables and graphs show the pattern. <span class="mono">Topics: Frequency distributions · Histograms and frequency polygons · Cumulative frequency distributions. CLO 1.</span>`],
    src:'Reading: Gould, Ryan &amp; Wong (2020), Ch.2: Picturing Variation with Graphs.',
    fig:{label:'From raw data to a picture', flow:[{t:'Raw data',s:'a list',d:'Hard to see any pattern.'},{t:'Frequency table',s:'count',d:'How many in each category or class.'},{t:'Graph',s:'see it',d:'Bar, pie, histogram, polygon, ogive.'},{t:'Describe',s:'shape, centre, spread',d:'What the picture tells us.'}]} },

  { nav:'Relative frequency', title:'Frequency and relative frequency', minutes:8,
    narration:[`Count each category (f), then divide by the total (n) to get the share.`],
    fig:{label:'Formula breakdown', build:el=>F.decode(el,{
      f:`${T('rf',v('rf'))} = ${fr(T('f',v('f')),T('n',v('n')))}`,
      parts:[['rf','<b>rf</b>: relative frequency, the share of the total (0 to 1).'],['f','<b>f</b>: frequency, how many in this category.'],['n','<b>n</b>: total number of observations.']],
      sub:`${v('rf')}<sub>Car</sub> = ${fr('16','40')}`, subNote:'40 students: 16 come by car.',
      keys:'1 6 ÷ 4 0 =', ans:`<div class="m">rf = <b>0.40</b> = 40%</div>`, ansRaw:true, ansNote:'All the rf values add up to 1.'})} },

  { nav:'Bar and pie', title:'Bar charts and pie charts', minutes:6,
    narration:[`For categories: a <b>bar chart</b> compares sizes (bars with gaps); a <b>pie chart</b> shows parts of a whole (100%).`],
    src:'Data: how 40 students get to campus (illustrative).',
    fig:{label:'Same data, two charts', build:barPie} },

  { nav:'Class width', title:'Grouping numbers into classes', minutes:8,
    narration:[`For many numbers, group them into classes of equal width. Width = range ÷ number of classes, rounded <b>up</b>.`],
    fig:{label:'Formula breakdown', build:el=>F.decode(el,{
      f:`${T('w','Width')} = ${fr(T('r','Max − Min'),T('k','k'))}`,
      parts:[['w','<b>Width</b>: the size of each class.'],['r','<b>Max − Min</b>: the range of the data.'],['k','<b>k</b>: the number of classes you choose (usually 5 to 10).']],
      sub:`Width = ${fr('98 − 42','6')}`, subNote:'25 test scores: lowest 42, highest 98, 6 classes.',
      keys:'( 9 8 − 4 2 ) ÷ 6 =', ans:`<div class="m">9.33 → round up → <b>10</b></div><p class="calcnote">Classes: 40–49, 50–59, 60–69, 70–79, 80–89, 90–99</p>`, ansRaw:true})} },

  { nav:'Frequency table', title:'Frequency distribution and histogram', minutes:12,
    narration:[`Build the table: class, boundaries, midpoint, frequency, relative and cumulative frequency. A <b>histogram</b> draws it with touching bars.`],
    src:'Default data: 20 final exam scores, from the Week 3 slides. Type your own.',
    fig:{label:'Build your own table', build:el=>ST.freqTool(el)} },

  { nav:'Shape', title:'The shape of a histogram', minutes:6,
    narration:[`Follow the tail. Tail to the right: <b>positively skewed</b>. Tail to the left: <b>negatively skewed</b>. No long tail: <b>symmetric</b>.`],
    fig:{label:'Switch the shape', build:ST.shapeTool} },

  { nav:'Polygon and ogive', title:'Frequency polygons and cumulative frequency', minutes:8,
    narration:[`A <b>frequency polygon</b> joins the midpoints and closes on the axis. An <b>ogive</b> plots cumulative frequency at each upper boundary.`],
    fig:{label:'Same data, two graphs', build:ST.polyTool} },

  { nav:'Practice', title:'Practice', kind:'activity', minutes:20,
    narration:[`New data. Answer on paper first.`], src:'Data: illustrative.',
    fig:{label:'5 questions', build:practice([
      {type:'Easy',q:'Blood types of 50 donors at a Sharjah blood drive: O 22, A 14, B 10, AB 4. Find each relative frequency and the mode.',hint:'O 0.44, A 0.28, B 0.20, AB 0.08 (sum = 1). Mode: <b>O</b>.'},
      {type:'Easy',q:'Bar chart or histogram for (a) blood type (b) daily temperature?',hint:'(a) <b>Bar chart</b>: categories, bars with gaps. (b) <b>Histogram</b>: continuous numbers, touching bars.'},
      {type:'Medium',q:'Daily PM10 readings range from 31 to 88. Make 6 classes. What is the width and what are the classes?',hint:'(88 − 31) ÷ 6 = 9.5 → <b>10</b>. Classes 31–40, 41–50, 51–60, 61–70, 71–80, 81–90.'},
      {type:'Medium',q:`Ages of 30 visitors to a science museum:${H_AGE}Find the midpoints, the cumulative frequencies and the shape.`,hint:'Classes 10–19 … 60–69, f = 4, 9, 8, 5, 3, 1. Midpoints 14.5, 24.5, 34.5, 44.5, 54.5, 64.5. Cum. f = 4, 13, 21, 26, 29, 30. <b>Right-skewed</b>.'},
      {type:'Hard',q:'Using the same data: what percentage of visitors were younger than 49.5? Which graph shows this directly?',hint:'Cum. f at 49.5 = 26 → 26 ÷ 30 ≈ <b>86.7%</b>. The <b>ogive</b>.'}])} },

  { nav:'Exit quiz', title:'Exit quiz', kind:'check', minutes:5, narration:[`Five quick questions.`],
    fig:{label:'Check yourself', build:el=>W.quiz(el,[
      {q:'In a histogram, the bars…',o:['have gaps','touch','are ordered by height'],a:1,why:'Classes are continuous intervals, so bars touch.'},
      {q:'A class is 20–29. Its midpoint is…',o:['24.5','25','29.5'],a:0,why:'(20 + 29) ÷ 2 = 24.5.'},
      {q:'Relative frequency = …',o:['f × n','f ÷ n','n ÷ f'],a:1,why:'Share of the total.'},
      {q:'An ogive uses…',o:['midpoints','cumulative frequency','relative frequency only'],a:1,why:'Cumulative frequency at upper boundaries.'},
      {q:'Most values are high and the tail is on the left. The shape is…',o:['symmetric','positively skewed','negatively skewed'],a:2,why:'Tail left → negative skew.'}])} },

  { nav:'Takeaways', title:'Takeaways', kind:'review', minutes:2, narration:[`Next: Weeks 3–4, Ch.3: Numerical Summaries of Center and Variation.`],
    fig:{label:'Week 2 on one page', mindmap:{center:'Week 2', branches:[
      {t:'Categories',items:['rf = f ÷ n','Bar: compare','Pie: part of 100%']},
      {t:'Classes',items:['Width = range ÷ k, round up','Midpoint = (lower + upper) ÷ 2','Boundaries: ± 0.5']},
      {t:'Graphs for numbers',items:['Histogram: touching bars','Polygon: midpoints, closes on axis','Ogive: cumulative, upper boundaries']},
      {t:'Shape',items:['Symmetric','Right tail → positive skew','Left tail → negative skew']}]}} }
  ]
});
