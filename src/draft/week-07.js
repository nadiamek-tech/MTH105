// {"file": "week-07.html", "title": "MTH 105 Week 7 · Bernoulli and Binomial Distributions", "wk": "#C2410C", "wkd": "#FFA463"}
const FT='font-family="Schibsted Grotesk,Arial"', MONO='font-family="JetBrains Mono,monospace"';
const W2='<a href="https://nadiamek-tech.github.io/MindTheGap/workshop-02.html" target="_blank" rel="noopener">E(X) and Var(X), step by step: Mind the Gap Workshop 2 ↗</a>';
const bern=`<svg viewBox="0 0 520 170" role="img" aria-label="Bernoulli distribution"><line x1="80" x2="440" y1="140" y2="140" stroke="var(--ink)"/>
  <rect x="140" y="${140-0.96*110}" width="80" height="${0.96*110}" fill="var(--c2)" opacity=".6"/><rect x="300" y="${140-0.04*110}" width="80" height="${0.04*110}" fill="var(--wk)"/>
  <text x="180" y="160" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">x = 0 · failure</text><text x="340" y="160" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">x = 1 · success</text>
  <text x="180" y="${130-0.96*110}" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">q = 0.96</text><text x="340" y="${130-0.04*110}" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">p = 0.04</text></svg>`;

Lecture.mount({
  id:'mth105-w7', course:'MTH 105', home:'lectures.html', homeLabel:'Lectures', short:'Week 7 · Bernoulli and Binomial', eyebrow:'Week 7 · CLO 2', noTeacher:true,
  title:'Discrete Probability Distributions', meta:'Ch 6: Modelling Random Events: The Normal and Binomial Models · Gould, Ryan & Wong (2020)', endLabel:'Weeks 8–9 →',
  scenes:[
  { nav:'Start here', title:'Success or failure, again and again', minutes:3,
    narration:[`Many questions count successes in repeated trials. <span class="mono">Topics: Examples of discrete random variables: Bernoulli and Binomial distributions. CLO 2.</span>`],
    src:'Reading: Gould, Ryan &amp; Wong (2020), Ch 6: Modelling Random Events: The Normal and Binomial Models.',
    fig:{label:'From one trial to n trials', flow:[{t:'Bernoulli',s:'one trial',d:'Success with probability p.'},{t:'Repeat n times',s:'independent',d:'Same p every time.'},{t:'Binomial X',s:'count successes',d:'X = 0, 1, …, n.'}]} },

  { nav:'Bernoulli', title:'The Bernoulli distribution', minutes:6,
    narration:[`One trial, two outcomes: success (x = 1) with probability p, failure (x = 0) with q = 1 − p. E(X) = p and Var(X) = p·q.`],
    src:'Example: one solar panel is defective with p = 0.04 (illustrative).',
    fig:{label:'One trial', html:bern} },

  { nav:'Binomial or not?', title:'Activity · Is it binomial?', kind:'activity', minutes:8,
    narration:[`Binomial needs all four: fixed n, two outcomes, constant p, independent trials.`],
    fig:{label:'5 situations', build:el=>W.sort(el,{buckets:['Binomial','Not binomial'],items:[
      {t:'Number of heads in 10 coin tosses',a:0,why:'n = 10, two outcomes, p = 0.5, independent.'},
      {t:'Number of rolls until the first 6',a:1,why:'n is not fixed.'},
      {t:'Hearts among 5 cards drawn without replacement',a:1,why:'p changes after each card: not independent.'},
      {t:'Patients who recover out of 15, each with p = 0.7',a:0,why:'All four conditions hold.'},
      {t:'Emails opened out of 20 sent, p = 0.25 each',a:0,why:'Fixed n, open or not, constant p, independent clients.'}]})} },

  { nav:'Binomial formula', title:'The binomial formula', minutes:12,
    narration:[`P(X = x): choose which x trials succeed, then multiply the success and failure probabilities.`],
    fig:{label:'Formula breakdown', build:el=>F.decode(el,{
      f:`${T('P','P('+v('X')+' = '+v('x')+')')} = ${T('C','C('+v('n')+', '+v('x')+')')} · ${T('px',v('p')+'<sup>'+v('x')+'</sup>')} · ${T('q',v('q')+'<sup>'+v('n')+' − '+v('x')+'</sup>')}`,
      parts:[['P','Probability of exactly <b>x</b> successes.'],['C','<b>C(n, x)</b>: number of ways to choose the x successes (nCr key).'],['px','<b>p<sup>x</sup></b>: x successes.'],['q','<b>q<sup>n − x</sup></b>: the remaining failures, q = 1 − p.']],
      sub:`P(X = 5) = C(6, 5) · 0.8<sup>5</sup> · 0.2<sup>1</sup>`, subNote:'80% of a bakery’s deliveries arrive on time. 6 deliveries: P(exactly 5 on time)?',
      keys:'6 nCr 5 × 0 . 8 ^ 5 × 0 . 2 =', ans:`<div class="m">6 × 0.32768 × 0.2 = <b>0.3932</b></div>`, ansRaw:true})} },

  { nav:'Mean of binomial', title:'Mean, variance and SD of a binomial', minutes:6,
    narration:[`Shortcuts: E(X) = n·p, Var(X) = n·p·q, SD = √(n·p·q).`],
    fig:{label:'Formula breakdown', build:el=>F.decode(el,{
      f:`${T('e','E('+v('X')+')')} = ${T('n',v('n'))}${T('p',v('p'))}<br>${T('v','Var('+v('X')+')')} = ${T('n',v('n'))}${T('p',v('p'))}${T('q',v('q'))}`,
      parts:[['n','<b>n</b>: number of trials.'],['p','<b>p</b>: probability of success.'],['q','<b>q = 1 − p</b>.'],['e','<b>E(X)</b>: expected number of successes.'],['v','<b>Var(X)</b>: spread of the number of successes.']],
      sub:`E(X) = 10 × 0.7<br>Var(X) = 10 × 0.7 × 0.3`, subNote:'70% of students check email daily; sample of 10.',
      ans:`<div class="m">E(X) = <b>7</b> &nbsp; Var(X) = <b>2.1</b> &nbsp; SD ≈ <b>1.45</b></div>`, ansRaw:true})} },

  { nav:'Binomial tool', title:'Tool · Binomial probabilities', minutes:8,
    narration:[`Move n, p and x. Watch the shape and check your answers.`],
    fig:{label:'Drag n, p and x', build:ST.binomTool} },

  { nav:'Practice', title:'Practice', kind:'activity', minutes:25,
    narration:[`Check the four conditions first.`], src:'Data: illustrative.',
    fig:{label:'4 questions', build:practice([
            {type:'Easy',q:'One solar panel is defective with p = 0.04. Which distribution? E(X) and Var(X)?',hint:'<b>Bernoulli</b>. E(X) = <b>0.04</b>, Var(X) = 0.04 × 0.96 = <b>0.0384</b>.'},
      {type:'Medium',q:'25% of e-scooter riders wear helmets. In a sample of 8, P(exactly 2 wear helmets)?',hint:'C(8, 2) × 0.25² × 0.75⁶ = 28 × 0.0625 × 0.1780 ≈ <b>0.3115</b>.'},
      {type:'Medium',q:'Same riders: find E(X), Var(X) and SD.',hint:'E = 8 × 0.25 = <b>2</b>. Var = 8 × 0.25 × 0.75 = <b>1.5</b>. SD ≈ <b>1.22</b>.'},
      {type:'Hard',q:'Same riders: P(at least one wears a helmet)?',hint:'Complement: 1 − P(0) = 1 − 0.75⁸ ≈ 1 − 0.1001 = <b>0.8999</b>.'}])} },

  { nav:'Exit quiz', title:'Exit quiz', kind:'check', minutes:5, narration:[`Three quick questions.`],
    fig:{label:'Check yourself', build:el=>W.quiz(el,[
      {q:'Which is NOT a binomial condition?',o:['fixed n','constant p','normal shape','independent trials'],a:2,why:'Two outcomes, fixed n, constant p, independence.'},
      {q:'n = 20, p = 0.1. E(X) =',o:['2','0.1','18'],a:0,why:'n·p = 2.'},
      {q:'n = 20, p = 0.1. Var(X) =',o:['2','1.8','0.9'],a:1,why:'n·p·q = 20 × 0.1 × 0.9.'}])} },

  { nav:'Takeaways', title:'Takeaways', kind:'review', minutes:2, narration:[`Next: Weeks 8–9, the normal distribution.`],
    fig:{label:'Week 7 on one page', mindmap:{center:'Binomial', branches:[
      {t:'Bernoulli',items:['One trial','E = p, Var = pq']},
      {t:'Binomial',items:['Fixed n, two outcomes, constant p, independent','P(X = x) = C(n, x)pˣqⁿ⁻ˣ','E = np, Var = npq']}]}} }
  ]
});
