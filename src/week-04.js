// {"file": "week-04.html", "title": "MTH 105 Week 4 · Measures of Dispersion", "wk": "#0F766E", "wkd": "#5FD3B5"}
const FT='font-family="Schibsted Grotesk,Arial"', MONO='font-family="JetBrains Mono,monospace"';
const W2='<a href="https://nadiamek-tech.github.io/MindTheGap/workshop-02.html" target="_blank" rel="noopener">Every symbol, step by step: Mind the Gap Workshop 2 ↗</a>';

Lecture.mount({
  id:'mth105-w4', course:'MTH 105', home:'lectures.html', homeLabel:'Lectures', short:'Week 4 · Dispersion', eyebrow:'Week 4 · CLO 1', noTeacher:true,
  title:'Measures of Central Tendency, Position, & Dispersion', meta:'Ch.3: Numerical Summaries of Center and Variation · Gould, Ryan & Wong (2020)', endLabel:'Week 5 →',
  scenes:[
  { nav:'Start here', title:'One number for the spread', minutes:3,
    narration:[`The same mean can hide very different spreads. <span class="mono">Topics: Variance and standard deviation · Coefficient of variation. CLO 1.</span>`],
    src:'Reading: Gould, Ryan &amp; Wong (2020), Ch.3: Numerical Summaries of Center and Variation.',
    fig:{label:'This week', mindmap:{center:'Week 4', branches:[{t:'Simple spread',items:['Range','IQR','Boxplot']},{t:'Around the mean',items:['Variance s²','SD s']},{t:'Compare',items:['CV %']}]}} },

  { nav:'Range, IQR, boxplot', title:'Range, IQR and the boxplot', minutes:12,
    narration:[`<b>Range</b> = max − min. <b>IQR</b> = Q3 − Q1, the spread of the middle 50%. The boxplot shows min, Q1, median, Q3 and max.`],
    fig:{label:'Type data, see the boxplot', build:ST.boxTool, caption:'Outliers: beyond Q1 − 1.5·IQR or Q3 + 1.5·IQR.'} },

  { nav:'Variance', title:'Sample variance', minutes:12,
    narration:[`Variance is the average squared distance from the mean. For a sample, divide by <b>n − 1</b>.`],
    src:W2,
    fig:{label:'Formula breakdown', build:el=>F.decode(el,{
      f:`${T('s2',v('s')+'<sup>2</sup>')} = ${fr(`${T('S',SG)}${T('d','('+v('x')+' − '+XB+')<sup>2</sup>')}`,T('n1',v('n')+' − 1'))}`,
      parts:[['s2','<b>s²</b>: the sample variance (squared units).'],['S','<b>Σ</b>: add up.'],['d','<b>(x − x̄)²</b>: distance from the mean, squared. Subtract first, then square.'],['n1','<b>n − 1</b>: one less than the sample size.']],
      sub:`${v('s')}<sup>2</sup> = ${fr('(−4)² + (−2)² + (−1)² + 1² + 6²','5 − 1')}`, subNote:'Data: 4, 6, 7, 9, 14. Mean = 8.',
      keys:'( 1 6 + 4 + 1 + 1 + 3 6 ) ÷ ( 5 − 1 ) =', ans:`<div class="m">s² = 58 ÷ 4 = <b>14.5</b></div>`, ansRaw:true, ansNote:'Population variance σ² divides by N instead of n − 1.'})} },

  { nav:'Standard deviation', title:'Standard deviation', minutes:8,
    narration:[`The standard deviation is the square root of the variance: the typical distance from the mean, in the original units.`],
    fig:{label:'Formula breakdown', build:el=>F.decode(el,{
      f:`${T('s',v('s'))} = ${sq(T('s2',v('s')+'<sup>2</sup>'))}`,
      parts:[['s','<b>s</b>: the sample standard deviation.'],['s2','<b>s²</b>: the variance you just found.']],
      sub:`${v('s')} = ${sq('14.5')}`, keys:'√ 1 4 . 5 =', ans:`<div class="m">s ≈ <b>3.81</b></div>`, ansRaw:true, ansNote:'Report it with the mean: 8 ± 3.81.'})} },

  { nav:'CV', title:'Coefficient of variation', minutes:8,
    narration:[`The CV is the SD as a percentage of the mean. Use it to compare spread across different means or units.`],
    fig:{label:'Formula breakdown', build:el=>F.decode(el,{
      f:`${T('cv','CV')} = ${fr(T('s',v('s')),T('xb',XB))} × 100%`,
      parts:[['cv','<b>CV</b>: relative spread, in %.'],['s','<b>s</b>: standard deviation.'],['xb','<b>x̄</b>: mean.']],
      sub:`CV<sub>temp</sub> = ${fr('6','15')} × 100%<br>CV<sub>rain</sub> = ${fr('30','100')} × 100%`, subNote:'City A temperature: mean 15 °C, s 6 °C. City B rainfall: mean 100 mm, s 30 mm.',
      keys:'6 ÷ 1 5 × 1 0 0 =', ans:`<div class="m">40% vs 30%</div><p class="calcnote">Temperature varies more, relative to its mean.</p>`, ansRaw:true})} },

  { nav:'Check any data', title:'Tool · Check your calculations', minutes:5,
    narration:[`Type any data set to check the mean, median, mode, s², s and CV step by step.`],
    fig:{label:'Deviation table', build:el=>ST.spreadTool(el)} },

  { nav:'Practice', title:'Practice', kind:'activity', minutes:25,
    narration:[`Use a deviation table. Check with the tool.`], src:'Data: illustrative.',
    fig:{label:'5 questions', build:practice([
      {type:'Easy',q:'Data: 12, 15, 17, 18, 20, 22, 25, 28, 31. Find the range and IQR.',hint:'Range = 31 − 12 = <b>19</b>. Q1 = (15 + 17) ÷ 2 = 16, Q3 = (25 + 28) ÷ 2 = 26.5, IQR = <b>10.5</b>.'},
      {type:'Medium',q:'Daily steps (thousands): 3.2, 4.5, 5.1, 5.8, 6.0, 6.4, 7.2, 7.9, 8.3, 14.6. Q1 = 5.1, Q3 = 7.9. Is 14.6 an outlier?',hint:'IQR = 2.8. Upper fence = 7.9 + 1.5 × 2.8 = 12.1. 14.6 &gt; 12.1 → <b>yes, outlier</b>.'},
      {type:'Medium',q:'Water used per shower (L) by 5 students: 40, 45, 50, 55, 60. Find s², s and CV.',hint:'Mean 50. Squares: 100, 25, 0, 25, 100 → Σ = 250. <b>s² = 250 ÷ 4 = 62.5</b>, <b>s ≈ 7.91</b>, <b>CV ≈ 15.8%</b>.'},
      {type:'Medium',q:'Two desalination plants. A: mean 120 ML/day, s = 9. B: mean 45 ML/day, s = 5. Which is more consistent?',hint:'CV(A) = 7.5%, CV(B) ≈ 11.1%. <b>Plant A</b> is more consistent.'},
      {type:'Hard',q:'Temperatures (°C): 21, 23, 25, 25, 26. Find the range, IQR, s², s and CV.',hint:'Range = <b>5</b>. Q1 = 22, Q3 = 25.5 → IQR = <b>3.5</b>. Mean 24, squares 9, 1, 1, 1, 4 → Σ = 16. s² = 16 ÷ 4 = <b>4</b>, s = <b>2</b>, CV = 2 ÷ 24 ≈ <b>8.3%</b>.'}])} },

  { nav:'Quick check', title:'Quick check', kind:'check', minutes:5, narration:[`Calculate, then open the answer.`],
    fig:{label:'4 calculations', build:practice([
      {q:'Find the range of 4, 9, 2, 15, 7.',hint:'15 − 2 = <b>13</b>.'},
      {q:'Find s² and s for 2, 4, 6.',hint:'Mean 4. Squares 4, 0, 4 → Σ = 8. s² = 8 ÷ 2 = <b>4</b>, s = <b>2</b>.'},
      {q:'Mean = 50, s = 5. Find the CV.',hint:'5 ÷ 50 × 100% = <b>10%</b>.'},
      {q:'Q1 = 12, Q3 = 20. Find the IQR and the outlier fences.',hint:'IQR = <b>8</b>. Fences: 12 − 12 = <b>0</b> and 20 + 12 = <b>32</b>.'}])} },

  { nav:'Takeaways', title:'Takeaways', kind:'review', minutes:2, narration:[`Next: Week 5, Ch 5: Modeling Variation with Probability.`],
    fig:{label:'Week 4 on one page', mindmap:{center:'Week 4', branches:[
      {t:'Range and IQR',items:['Range = max − min','IQR = Q3 − Q1','Fences: Q1 − 1.5·IQR, Q3 + 1.5·IQR']},
      {t:'Variance',items:['s² = Σ(x − x̄)² ÷ (n − 1)','Subtract, square, add, divide']},
      {t:'SD',items:['s = √s²','Same units as the data']},
      {t:'CV',items:['CV = s ÷ x̄ × 100%','Smaller CV = more consistent']}]}} }
  ]
});
