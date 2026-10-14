// {"file": "week-06.html", "title": "MTH 105 Week 6 · Discrete Probability Distributions", "wk": "#B4530A", "wkd": "#FFA463"}
const FT='font-family="Schibsted Grotesk,Arial"', MONO='font-family="JetBrains Mono,monospace"';
const W2='<a href="https://nadiamek-tech.github.io/MindTheGap/workshop-02.html" target="_blank" rel="noopener">E(X) and Var(X), step by step: Mind the Gap Workshop 2 ↗</a>';
const bern=`<svg viewBox="0 0 520 170" role="img" aria-label="Bernoulli distribution"><line x1="80" x2="440" y1="140" y2="140" stroke="var(--ink)"/>
  <rect x="140" y="${140-0.96*110}" width="80" height="${0.96*110}" fill="var(--c2)" opacity=".6"/><rect x="300" y="${140-0.04*110}" width="80" height="${0.04*110}" fill="var(--wk)"/>
  <text x="180" y="160" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">x = 0 · failure</text><text x="340" y="160" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">x = 1 · success</text>
  <text x="180" y="${130-0.96*110}" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">q = 0.96</text><text x="340" y="${130-0.04*110}" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">p = 0.04</text></svg>`;

Lesson.mount({
  week:6, clo:'CLO 2', title:'Discrete Probability Distributions', chapter:'Ch 6: Modeling Random Events: The Normal and Binomial Models · Gould, Ryan & Wong (2020)',
  intro:'A random variable turns outcomes into numbers. Its distribution lists every value with its probability.',
  topics:[
  { id:'random-variable', title:'Discrete random variables and valid distributions',
    def:'A <b>random variable X</b> gives a number to each outcome. <b>Discrete</b>: countable values (0, 1, 2 …). A distribution is <b>valid</b> when every P(x) is between 0 and 1 and all P(x) add to 1.',
    life:{text:'X = number of buses arriving at a stop in one hour. Data: illustrative.',
      fig:{label:'Buses per hour', html:`<table class="tbl"><tr><th>x</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>P(x)</th><td>0.1</td><td>0.3</td><td>0.4</td><td>k</td></tr></table>`}},
    formula:{f:`${T('k',v('k'))} = ${T('one','1')} − ${T('S',SG)}${T('o','(other P(x))')}`,
      parts:[['k','<b>k</b>: the missing probability.'],['one','<b>1</b>: all probabilities add to 1.'],['S','<b>Σ</b>: add up.'],['o','The probabilities you already know.']],
      sub:'k = 1 − (0.1 + 0.3 + 0.4)', keys:'1 − ( 0 . 1 + 0 . 3 + 0 . 4 ) =', ans:`<div class="m">k = <b>0.2</b></div>`, ansRaw:true, ansNote:'Check: 0 ≤ 0.2 ≤ 1 and the total is 1 → valid.'},
    meaning:{text:'Edit the probabilities and the tool checks both conditions.', fig:{label:'Edit P(x) · check validity', build:ST.distTool}} },

  { id:'expected-value', title:'Expected value E(X)',
    def:'The <b>expected value</b> E(X), or μ, is the long-run average of X: multiply each value by its probability and add.',
    life:{text:'Same bus stop: 0, 1, 2 or 3 buses with probabilities 0.1, 0.3, 0.4, 0.2.'},
    formula:{f:`${T('e',v('E')+'('+v('X')+')')} = ${T('S',SG)} ${T('x',v('x'))} · ${T('p',v('P')+'('+v('x')+')')}`,
      parts:[['e','<b>E(X)</b>: the expected value, also μ.'],['S','<b>Σ</b>: add over every value of x.'],['x','<b>x</b>: each possible value.'],['p','<b>P(x)</b>: its probability.']],
      sub:'E(X) = 0(0.1) + 1(0.3) + 2(0.4) + 3(0.2)', keys:'0 × 0 . 1 + 1 × 0 . 3 + 2 × 0 . 4 + 3 × 0 . 2 =', ans:`<div class="m">E(X) = <b>1.7</b> buses</div>`, ansRaw:true},
    meaning:{text:'Over many hours, the stop gets 1.7 buses per hour on average. E(X) need not be a possible value of X.'} },

  { id:'variance-x', demo:'Your professor completes the E(X) and Var(X) table on the board.', title:'Variance and standard deviation of X',
    def:'<b>Var(X)</b> measures how far X typically lands from E(X). <b>SD = √Var(X)</b>, in the units of X.',
    life:{text:'Same bus stop, with μ = 1.7.'},
    formula:{f:`${T('v','Var('+v('X')+')')} = ${T('S',SG)} ${T('d','('+v('x')+' − μ)<sup>2</sup>')} · ${T('p',v('P')+'('+v('x')+')')}`,
      parts:[['v','<b>Var(X)</b>: variance of X.'],['S','<b>Σ</b>: add over every x.'],['d','<b>(x − μ)²</b>: squared distance from E(X) = μ.'],['p','<b>P(x)</b>: weight each squared distance by its probability.']],
      sub:'(0 − 1.7)²(0.1) + (1 − 1.7)²(0.3) + (2 − 1.7)²(0.4) + (3 − 1.7)²(0.2)', keys:'( 0 − 1 . 7 ) x² × 0 . 1 + ( 1 − 1 . 7 ) x² × 0 . 3 + …', keyNote:'Always bracket the negative before squaring.',
      ans:`<div class="m">0.289 + 0.147 + 0.036 + 0.338 = <b>0.81</b></div><p class="calcnote">SD = √0.81 = 0.9 buses.</p>`, ansRaw:true},
    meaning:{text:'In a typical hour, the number of buses is about 0.9 away from the average of 1.7. Bigger SD = less predictable.',
      fig:{label:'Buses per hour · P(x)', html:`<svg viewBox="0 0 520 170" role="img" aria-label="Probability distribution of buses per hour"><line x1="60" x2="480" y1="140" y2="140" stroke="var(--ink)"/>${[[0,.1],[1,.3],[2,.4],[3,.2]].map(([x,p])=>`<rect x="${90+x*100}" y="${140-p*280}" width="60" height="${p*280}" fill="var(--wk)" opacity=".8"/><text x="${120+x*100}" y="${132-p*280}" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">${p}</text><text x="${120+x*100}" y="160" text-anchor="middle" ${MONO} font-size="12" fill="var(--ink)">${x}</text>`).join('')}<line x1="${120+1.7*100}" x2="${120+1.7*100}" y1="20" y2="140" stroke="var(--ink)" stroke-dasharray="5 4"/><text x="${126+1.7*100}" y="30" ${MONO} font-size="12" fill="var(--ink)">μ = 1.7</text></svg>`}} }
  ],
  inClass:{intro:'We complete the table and draw the distribution together on the board.', items:[
    {q:'X = number of phone notifications in 10 minutes. x: 0, 1, 2, 3, 4 with P(x): 0.10, 0.25, 0.30, k, 0.10. Find k, E(X), Var(X) and the SD. Interpret the SD in one sentence.', tips:['k = 1 − (sum of the others).','E(X): multiply each x by P(x) and add.','Var(X): (x − μ)² × P(x), then add.']},
    {q:'Draw the probability histogram of X from Exercise 1 and mark μ on it.', draw:true, tips:['One bar per value of x.','Bar height = P(x).','Mark μ with a vertical line.']}]},
  takeaways:{label:'Week 6 on one page', mindmap:{center:'Discrete X', branches:[
    {t:'Discrete',items:['Countable values 0, 1, 2 …']},{t:'Valid',items:['0 ≤ P(x) ≤ 1','ΣP(x) = 1','k = 1 − others']},
    {t:'Summaries',items:['E(X) = Σx·P(x)','Var(X) = Σ(x − μ)²·P(x)','SD = √Var(X)']}]}},
  practice:[
    {type:'Easy',q:'Is this valid? x: 0, 1, 2, 3 with P(x): 0.2, 0.3, 0.4, 0.2',hint:'<b>No</b>: the sum is 1.1.'},
    {type:'Easy',q:'P(x) for x = 0, 1, 2, 3 is 0.15, 0.25, k, 0.20. Find k.',hint:'k = 1 − 0.60 = <b>0.40</b>.'},
    {type:'Easy',q:'x: 1, 2, 3 with P(x): 0.2, 0.5, 0.3. Find E(X).',hint:'1(0.2) + 2(0.5) + 3(0.3) = <b>2.1</b>.'},
    {type:'Medium',q:'x: 0, 1, 2 with P(x): 0.5, 0.3, 0.2. Find E(X), Var(X) and SD.',hint:'E(X) = <b>0.7</b>. (0 − 0.7)²(0.5) + (1 − 0.7)²(0.3) + (2 − 0.7)²(0.2) = 0.245 + 0.027 + 0.338 = <b>0.61</b>. SD = √0.61 ≈ <b>0.78</b>.'},
    {type:'Medium',q:'Goals per match: P(0) = 0.25, P(1) = 0.35, P(2) = k, P(3) = 0.15. Find k and E(X).',hint:'k = 1 − 0.75 = <b>0.25</b>. E(X) = 0 + 0.35 + 0.50 + 0.45 = <b>1.3</b> goals per match on average.'},
    {type:'Hard',q:'Same goals table: find Var(X) and SD, and interpret SD in one sentence.',hint:'Σ(x − 1.3)²P(x) = 0.4225 + 0.0315 + 0.1225 + 0.4335 = <b>1.01</b>. SD = √1.01 ≈ <b>1.005</b>: a typical match is about 1 goal away from the average of 1.3.'}],
  next:'Next: Week 7, Bernoulli and binomial distributions (in preparation).'
});
