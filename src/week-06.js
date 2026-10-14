// {"file": "week-06.html", "title": "MTH 105 Weeks 6–7 · Discrete Probability Distributions", "wk": "#B4530A", "wkd": "#FFA463"}
const FT='font-family="Schibsted Grotesk,Arial"', MONO='font-family="JetBrains Mono,monospace"';
const W2='<a href="https://nadiamek-tech.github.io/MindTheGap/workshop-02.html" target="_blank" rel="noopener">E(X) and Var(X), step by step: Mind the Gap Workshop 2 ↗</a>';
const bern=`<svg viewBox="0 0 520 170" role="img" aria-label="Bernoulli distribution"><line x1="80" x2="440" y1="140" y2="140" stroke="var(--ink)"/>
  <rect x="140" y="${140-0.96*110}" width="80" height="${0.96*110}" fill="var(--c2)" opacity=".6"/><rect x="300" y="${140-0.04*110}" width="80" height="${0.04*110}" fill="var(--wk)"/>
  <text x="180" y="160" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">x = 0 · failure</text><text x="340" y="160" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">x = 1 · success</text>
  <text x="180" y="${130-0.96*110}" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">q = 0.96</text><text x="340" y="${130-0.04*110}" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">p = 0.04</text></svg>`;

Lecture.mount({
  id:'mth105-w6', course:'MTH 105', home:'lectures.html', homeLabel:'Lectures', short:'Weeks 6–7 · Discrete distributions', eyebrow:'Weeks 6–7 · CLO 2', noTeacher:true,
  title:'Discrete Probability Distributions', meta:'Ch 6: Modelling Random Events: The Normal and Binomial Models · Gould, Ryan & Wong (2020)', endLabel:'Weeks 8–9 →',
  scenes:[
  { nav:'Start here', title:'Every value, with its probability', minutes:3,
    narration:[`A <b>random variable X</b> turns outcomes into numbers. A discrete one takes countable values (0, 1, 2 …). Its distribution lists every value with its probability. <span class="mono">Topics: Definition of discrete random variables · Expected value, variance and standard deviation of discrete random variables · Examples of discrete random variables: Bernoulli and Binomial distributions. CLO 2.</span>`],
    src:'Reading: Gould, Ryan &amp; Wong (2020), Ch 6: Modelling Random Events: The Normal and Binomial Models.',
    fig:{label:'Buses arriving per hour', html:`<table class="tbl"><tr><th>x</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>P(x)</th><td>0.1</td><td>0.3</td><td>0.4</td><td>0.2</td></tr></table><p class="calcnote">0.1 + 0.3 + 0.4 + 0.2 = 1 ✓</p>`} },

  { nav:'Valid distribution', title:'A valid probability distribution', minutes:8,
    narration:[`Two conditions: every P(x) is between 0 and 1, and all P(x) add up to 1. A missing value k = 1 − (sum of the others).`],
    fig:{label:'Edit P(x) · check validity', build:ST.distTool} },

  { nav:'Expected value', title:'Expected value E(X)', minutes:10,
    narration:[`E(X) is the long-run average of X: multiply each value by its probability and add.`], src:W2,
    fig:{label:'Formula breakdown', build:el=>F.decode(el,{
      f:`${T('e',v('E')+'('+v('X')+')')} = ${T('S',SG)} ${T('x',v('x'))} · ${T('p',v('P')+'('+v('x')+')')}`,
      parts:[['e','<b>E(X)</b>: the expected value, also μ.'],['S','<b>Σ</b>: add over every value of x.'],['x','<b>x</b>: each possible value.'],['p','<b>P(x)</b>: its probability.']],
      sub:`E(X) = 0(0.1) + 1(0.3) + 2(0.4) + 3(0.2)`, subNote:'Buses per hour.',
      keys:'0 × 0 . 1 + 1 × 0 . 3 + 2 × 0 . 4 + 3 × 0 . 2 =', ans:`<div class="m">E(X) = <b>1.7</b></div><p class="calcnote">On average, 1.7 buses arrive per hour.</p>`, ansRaw:true})} },

  { nav:'Variance and SD', title:'Variance and standard deviation of X', minutes:10,
    narration:[`Var(X) measures how far X typically lands from E(X). SD = √Var(X).`],
    fig:{label:'Formula breakdown', build:el=>F.decode(el,{
      f:`${T('v','Var('+v('X')+')')} = ${T('S',SG)} ${T('d','('+v('x')+' − μ)<sup>2</sup>')} · ${T('p',v('P')+'('+v('x')+')')}`,
      parts:[['v','<b>Var(X)</b>: variance of X.'],['S','<b>Σ</b>: add over every x.'],['d','<b>(x − μ)²</b>: squared distance from E(X) = μ.'],['p','<b>P(x)</b>: weight each squared distance by its probability.']],
      sub:`(0 − 1.7)²(0.1) + (1 − 1.7)²(0.3) + (2 − 1.7)²(0.4) + (3 − 1.7)²(0.2)`,
      keys:'( 0 − 1 . 7 ) x² × 0 . 1 + ( 1 − 1 . 7 ) x² × 0 . 3 + …', keyNote:'Always bracket the negative before squaring.',
      ans:`<div class="m">0.289 + 0.147 + 0.036 + 0.338 = <b>0.81</b></div><p class="calcnote">SD = √0.81 = 0.9 buses.</p>`, ansRaw:true})} },

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
    narration:[`Check validity first. Use the tools to check answers.`], src:'Data: illustrative.',
    fig:{label:'6 questions', build:practice([
      {type:'Easy',q:'Is this valid? x: 0, 1, 2, 3 with P(x): 0.2, 0.3, 0.4, 0.2',hint:'<b>No</b>: the sum is 1.1.'},
      {type:'Medium',q:'Goals per match: P(0) = 0.25, P(1) = 0.35, P(2) = k, P(3) = 0.15. Find k, E(X), Var(X) and SD.',hint:'k = <b>0.25</b>. E(X) = 0 + 0.35 + 0.50 + 0.45 = <b>1.3</b>. E(X²) = 2.7, Var = 2.7 − 1.69 = <b>1.01</b>, SD ≈ <b>1.005</b>.'},
      {type:'Easy',q:'One solar panel is defective with p = 0.04. Which distribution? E(X) and Var(X)?',hint:'<b>Bernoulli</b>. E(X) = <b>0.04</b>, Var(X) = 0.04 × 0.96 = <b>0.0384</b>.'},
      {type:'Medium',q:'25% of e-scooter riders wear helmets. In a sample of 8, P(exactly 2 wear helmets)?',hint:'C(8, 2) × 0.25² × 0.75⁶ = 28 × 0.0625 × 0.1780 ≈ <b>0.3115</b>.'},
      {type:'Medium',q:'Same riders: find E(X), Var(X) and SD.',hint:'E = 8 × 0.25 = <b>2</b>. Var = 8 × 0.25 × 0.75 = <b>1.5</b>. SD ≈ <b>1.22</b>.'},
      {type:'Hard',q:'Same riders: P(at least one wears a helmet)?',hint:'Complement: 1 − P(0) = 1 − 0.75⁸ ≈ 1 − 0.1001 = <b>0.8999</b>.'}])} },

  { nav:'Exit quiz', title:'Exit quiz', kind:'check', minutes:5, narration:[`Five quick questions.`],
    fig:{label:'Check yourself', build:el=>W.quiz(el,[
      {q:'P(x) for x = 0, 1, 2 is 0.3, 0.5, k. k =',o:['0.2','0.8','1'],a:0,why:'1 − 0.8.'},
      {q:'E(X) means…',o:['the most likely value','the long-run average','the largest value'],a:1,why:'Average over many repetitions.'},
      {q:'Which is NOT a binomial condition?',o:['fixed n','constant p','normal shape','independent trials'],a:2,why:'Two outcomes, fixed n, constant p, independence.'},
      {q:'n = 20, p = 0.1. E(X) =',o:['2','0.1','18'],a:0,why:'n·p = 2.'},
      {q:'n = 20, p = 0.1. Var(X) =',o:['2','1.8','0.9'],a:1,why:'n·p·q = 20 × 0.1 × 0.9.'}])} },

  { nav:'Takeaways', title:'Takeaways', kind:'review', minutes:2, narration:[`Next: Weeks 8–9, the normal distribution.`],
    fig:{label:'Weeks 6–7 on one page', mindmap:{center:'Discrete X', branches:[
      {t:'Valid',items:['0 ≤ P(x) ≤ 1','ΣP(x) = 1']},
      {t:'Summaries',items:['E(X) = Σx·P(x)','Var(X) = Σ(x − μ)²·P(x)','SD = √Var(X)']},
      {t:'Bernoulli',items:['One trial','E = p, Var = pq']},
      {t:'Binomial',items:['Fixed n, two outcomes, constant p, independent','P(X = x) = C(n, x)pˣqⁿ⁻ˣ','E = np, Var = npq']}]}} }
  ]
});
