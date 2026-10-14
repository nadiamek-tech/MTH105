// {"file": "week-05.html", "title": "MTH 105 Week 5 · Probability Theory", "wk": "#6B3FA0", "wkd": "#C3A1FF"}
const FT='font-family="Schibsted Grotesk,Arial"', MONO='font-family="JetBrains Mono,monospace"';
function dieTool(el){
  const EV={'Even number':[2,4,6],'Greater than 4':[5,6],'A 3':[3],'Not a 6':[1,2,3,4,5]};
  el.innerHTML=`<div class="tool"><div class="seg2">${Object.keys(EV).map((k,i)=>`<button type="button" aria-pressed="${i===0}">${k}</button>`).join('')}</div><div class="pic"></div><div class="feedback"></div></div>`;
  const pip={1:[[50,50]],2:[[28,28],[72,72]],3:[[25,25],[50,50],[75,75]],4:[[28,28],[72,28],[28,72],[72,72]],5:[[25,25],[75,25],[50,50],[25,75],[75,75]],6:[[28,22],[72,22],[28,50],[72,50],[28,78],[72,78]]};
  const draw=k=>{ const on=EV[k];
    el.querySelector('.pic').innerHTML=`<svg viewBox="0 0 520 110" role="img" aria-label="Sample space of a die">${[1,2,3,4,5,6].map((d,i)=>`<g transform="translate(${15+i*84},10)"><rect width="70" height="70" rx="12" fill="${on.includes(d)?'var(--wk)':'var(--surface)'}" stroke="var(--ink)" stroke-width="2"/>${pip[d].map(([x,y])=>`<circle cx="${x*.7}" cy="${y*.7}" r="6" fill="${on.includes(d)?'#fff':'var(--ink)'}"/>`).join('')}</g>`).join('')}<text x="260" y="104" text-anchor="middle" ${MONO} font-size="12" fill="var(--muted)">S = {1, 2, 3, 4, 5, 6}</text></svg>`;
    el.querySelector('.feedback').innerHTML=`Event “${k}” = {${on.join(', ')}} → P = ${on.length}/6 = <b>${ST.r4(on.length/6)}</b>`; };
  el.querySelectorAll('.seg2 button').forEach(b=>b.addEventListener('click',()=>{ el.querySelectorAll('.seg2 button').forEach(x=>x.setAttribute('aria-pressed',x===b)); draw(b.textContent); })); draw('Even number');
}

Lesson.mount({
  week:5, clo:'CLO 2', title:'Probability Theory', chapter:'Ch 5: Modeling Variation with Probability · Gould, Ryan & Wong (2020)',
  intro:'Probability measures how likely something is before it happens: a number from 0 (impossible) to 1 (certain).',
  topics:[
  { id:'sample-space', title:'Sample space and events',
    def:'An <b>experiment</b> has uncertain results; each result is an <b>outcome</b>. All outcomes form the <b>sample space S</b>. An <b>event</b> is a set of outcomes.',
    life:{text:'Roll one die: S = {1, 2, 3, 4, 5, 6}. “Even number” is the event {2, 4, 6}.', fig:{label:'Roll one fair die', build:dieTool}},
    meaning:{text:'Before calculating any probability, list S and the outcomes in the event.'} },

  { id:'basic-rule', title:'The basic rule',
    def:'When outcomes are equally likely, P(E) = favourable outcomes ÷ total outcomes. Every probability is between 0 and 1.',
    life:{text:'A bag holds 5 red, 3 blue and 2 green balls. Pick one without looking. Data: illustrative.'},
    formula:{f:`${T('p','P('+v('E')+')')} = ${fr(T('f','favourable outcomes'),T('t','total outcomes'))}`,
      parts:[['p','<b>P(E)</b>: probability of event E.'],['f','Outcomes where E happens.'],['t','All possible outcomes (the size of S).']],
      sub:`P(red) = ${fr('5','5 + 3 + 2')}`, keys:'5 ÷ ( 5 + 3 + 2 ) =', ans:`<div class="m">P(red) = <b>0.5</b></div>`, ansRaw:true},
    meaning:{text:'0.5 means red comes up in about half of many repeated picks. All outcomes together add up to 1.',
      fig:{label:'The probability scale', html:`<svg viewBox="0 0 520 90" role="img" aria-label="Probability scale from 0 to 1"><defs><linearGradient id="pg" x1="0" x2="1"><stop offset="0" stop-color="var(--muted)"/><stop offset="1" stop-color="var(--wk)"/></linearGradient></defs><rect x="20" y="30" width="480" height="12" rx="6" fill="url(#pg)"/>${[[0,'0','impossible'],[.5,'0.5','even chance'],[1,'1','certain']].map(([p,t,s])=>`<text x="${20+480*p}" y="22" text-anchor="${p===0?'start':p===1?'end':'middle'}" font-family="JetBrains Mono,monospace" font-size="13" fill="var(--ink)">${t}</text><text x="${20+480*p}" y="62" text-anchor="${p===0?'start':p===1?'end':'middle'}" font-family="Schibsted Grotesk,Arial" font-size="12" fill="var(--muted)">${s}</text>`).join('')}</svg>`}} },

  { id:'complement', title:'The complement rule',
    def:'“Not A” is everything outside A. P(A) and P(not A) always add to 1.',
    life:{text:'20% of deliveries arrive late. What share arrives on time? Data: illustrative.'},
    formula:{f:`${T('n','P(not '+v('A')+')')} = ${T('one','1')} − ${T('a','P('+v('A')+')')}`,
      parts:[['n','<b>P(not A)</b>: A does not happen.'],['one','<b>1</b>: the whole sample space.'],['a','<b>P(A)</b>: A happens.']],
      sub:'P(on time) = 1 − 0.20', keys:'1 − 0 . 2 =', ans:`<div class="m">P(on time) = <b>0.80</b></div>`, ansRaw:true},
    meaning:{text:'Use the complement when “not A” or “at least one” is easier to count the other way round.'} },

  { id:'addition', title:'The addition rule (OR)',
    def:'“A or B” means at least one happens. Add, then subtract the overlap so it is not counted twice. If A and B are <b>mutually exclusive</b> (no overlap), just add.',
    life:{text:'Of 60 students, 35 take Arabic, 25 take French and 10 take both. Data: illustrative.'},
    formula:{f:`${T('or','P('+v('A')+' or '+v('B')+')')} = ${T('a','P('+v('A')+')')} + ${T('b','P('+v('B')+')')} − ${T('ab','P('+v('A')+' and '+v('B')+')')}`,
      parts:[['or','<b>P(A or B)</b>: at least one happens.'],['a','<b>P(A)</b>: probability of A.'],['b','<b>P(B)</b>: probability of B.'],['ab','<b>P(A and B)</b>: the overlap, counted twice otherwise.']],
      sub:`P(Arabic or French) = ${fr('35','60')} + ${fr('25','60')} − ${fr('10','60')}`, keys:'( 3 5 + 2 5 − 1 0 ) ÷ 6 0 =', ans:`<div class="m">= 50/60 ≈ <b>0.833</b></div>`, ansRaw:true},
    meaning:{text:'In a Venn diagram, the overlap sits inside both circles. Change the counts and watch the rule.', fig:{label:'Change the counts', build:ST.vennTool, caption:'P(A or B) = P(A) + P(B) − P(A and B).'}} },

  { id:'multiplication', title:'The multiplication rule (AND) and tree diagrams',
    def:'For <b>independent</b> events, P(A and B) = P(A) × P(B). In a tree, multiply along a path; add paths for “or”.',
    life:{text:'A student is assigned a group (Male or Female) and a lab session (Morning or Evening) at random. Each split is 1/2.'},
    formula:{f:`${T('and','P('+v('A')+' and '+v('B')+')')} = ${T('a','P('+v('A')+')')} × ${T('b','P('+v('B')+')')}`,
      parts:[['and','<b>P(A and B)</b>: both happen.'],['a','<b>P(A)</b>'],['b','<b>P(B)</b>: unchanged by A when the events are independent.']],
      sub:'P(Female and Evening) = 1/2 × 1/2', keys:'0 . 5 × 0 . 5 =', ans:`<div class="m">= <b>1/4 = 0.25</b></div>`, ansRaw:true},
    meaning:{text:'The tree lists the sample space: 2 × 2 = 4 equally likely paths. P(Evening) = 1/4 + 1/4 = 1/2 (add the paths).',
      fig:{label:'Sample space: 4 outcomes', html:ST.treeSVG([['Male','Female'],['Morning','Evening']],{hl:['Female, Evening']})}} },

  { id:'event-types', title:'Types of events',
    def:'<b>Mutually exclusive</b>: cannot happen together. <b>Independent</b>: one does not change the other. <b>Dependent</b>: one changes the other. <b>Complementary</b>: opposites that add to 1.',
    life:{text:'Name the relationship for each pair.', fig:{label:'6 pairs', build:el=>W.sort(el,{buckets:['Mutually exclusive','Independent','Dependent','Complementary'],items:[
      {t:'Rain tomorrow / no rain tomorrow',a:3,why:'One is the opposite of the other; they add to 1.'},
      {t:'Toss a coin / roll a die',a:1,why:'One does not affect the other.'},
      {t:'Draw two cards without replacement',a:2,why:'The first card changes what is left.'},
      {t:'Choose tea / choose coffee (only one drink)',a:0,why:'Cannot happen together.'},
      {t:'Two students each toss their own coin',a:1,why:'One toss does not affect the other.'},
      {t:'Pass the exam / fail the same exam',a:3,why:'Opposites of each other.'}]})}},
    meaning:{text:'The relationship decides the rule: OR → add (minus the overlap); AND → multiply; NOT → 1 minus.'} }
  ],
  takeaways:{label:'Week 5 on one page', mindmap:{center:'Probability', branches:[
    {t:'Words',items:['Experiment, outcome','Sample space S','Event E']},
    {t:'Basic rule',items:['P(E) = favourable ÷ total','0 ≤ P ≤ 1']},
    {t:'Complement',items:['P(not A) = 1 − P(A)']},
    {t:'Addition (OR)',items:['P(A) + P(B) − P(A and B)','Mutually exclusive: just add']},
    {t:'Multiplication (AND)',items:['Independent: P(A) × P(B)','Tree: multiply along, add across']}]}},
  practice:[
    {type:'Easy',q:'A box has 3 red and 7 blue pens. P(red)?',hint:'3 ÷ 10 = <b>0.3</b>.'},
    {type:'Easy',q:'P(a flight leaves on time) = 0.82. P(it does not)?',hint:'Complement: 1 − 0.82 = <b>0.18</b>.'},
    {type:'Easy',q:'A recycling box has 12 plastic, 6 glass and 2 metal items. One is picked at random. P(glass)?',hint:'6 ÷ 20 = <b>0.3</b>.'},
    {type:'Medium',q:'A student takes one mode: bus 0.45, metro 0.30, car 0.25. P(bus or metro)?',hint:'Mutually exclusive: 0.45 + 0.30 = <b>0.75</b>.'},
    {type:'Medium',q:'P(A) = 0.4, P(B) = 0.5, P(A and B) = 0.2. P(A or B)?',hint:'OR → add, minus both: 0.4 + 0.5 − 0.2 = <b>0.7</b>.'},
    {type:'Medium',q:'Toss a coin and roll a die. How many outcomes? P(tails and an even number)?',hint:'2 × 6 = <b>12</b> outcomes. P = 1/2 × 3/6 = <b>0.25</b>.'},
    {type:'Hard',q:'Two independent machines: P(A works) = 0.95, P(B works) = 0.90. P(both work)? P(at least one works)?',hint:'Both: 0.95 × 0.90 = <b>0.855</b>. At least one: 1 − (0.05 × 0.10) = <b>0.995</b>.'},
    {type:'Hard',q:'A box has 3 defective and 7 good batteries. Pick 2 without replacement. P(both defective)?',hint:'Dependent: 3/10 × 2/9 = 6/90 ≈ <b>0.067</b>.'}],
  next:'Next: Week 6, discrete probability distributions. <a href="week-06.html">Open Week 6 →</a>'
});
