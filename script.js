const P={"2016-10": 571.4, "2016-11": 755.0, "2016-12": 672.0, "2017-01": 725.0, "2017-02": 643.0, "2017-03": 705.1, "2017-04": 737.15, "2017-05": 708.25, "2017-06": 728.0, "2017-07": 713.0, "2017-08": 721.15, "2017-09": 748.55, "2017-10": 727.0, "2017-11": 717.0, "2017-12": 701.0, "2018-01": 751.4, "2018-02": 768.91, "2018-03": 741.0, "2018-04": 754.0, "2018-05": 746.47, "2018-06": 734.0, "2018-07": 713.0, "2018-08": 685.7, "2018-09": 688.0, "2018-10": 700.0, "2018-11": 698.25, "2018-12": 709.0, "2019-01": 738.0, "2019-02": 732.7, "2019-03": 721.0, "2019-04": 710.75, "2019-05": 702.75, "2019-06": 716.0, "2019-07": 745.0, "2019-08": 796.75, "2019-09": 780.5, "2019-10": 771.5, "2019-11": 754.0, "2019-12": 758.8, "2020-01": 781.0, "2020-02": 787.0, "2020-03": 782.0, "2020-04": 848.0, "2020-05": 856.0, "2020-06": 888.0, "2020-07": 914.0, "2020-08": 982.85, "2020-09": 975.0, "2020-10": 964.23, "2020-11": 942.85, "2020-12": 919.0, "2021-01": 920.0, "2021-02": 908.0, "2021-03": 873.0, "2021-04": 872.0, "2021-05": 906.25, "2021-06": 913.0, "2021-07": 905.0, "2021-08": 893.0, "2021-09": 897.14, "2021-10": 893.53, "2021-11": 927.0, "2021-12": 894.0, "2022-01": 916.18, "2022-02": 936.81, "2022-03": 1001.0, "2022-04": 1159.0, "2022-05": 1240.0, "2022-06": 1152.0, "2022-07": 1127.0, "2022-08": 1216.0, "2022-09": 1314.0, "2022-10": 1273.0, "2022-11": 1652.0, "2022-12": 2025.0, "2023-01": 2114.0, "2023-02": 1960.0, "2023-03": 2251.0, "2023-04": 2514.0, "2023-05": 2742.0, "2023-06": 2485.75, "2023-07": 2485.75, "2023-08": 2571.5, "2023-09": 2517.75, "2023-10": 2720.0, "2023-11": 3109.0, "2023-12": 3342.0, "2024-01": 3909.0, "2024-02": 4069.0, "2024-03": 3520.0, "2024-04": 3742.75, "2024-05": 3596.05, "2024-06": 3571.0, "2024-07": 3744.26, "2024-08": 3858.0, "2024-09": 4014.71, "2024-10": 4164.18, "2024-11": 4061.95, "2024-12": 4383.0, "2025-01": 4373.2, "2025-02": 4689.77, "2025-03": 4863.04, "2025-04": 5375.5, "2025-05": 5178.04, "2025-06": 5497.15, "2025-07": 5295.71, "2025-08": 5175.2, "2025-09": 5701.44, "2025-10": 6481.72, "2025-11": 6164.74, "2025-12": 6543.76, "2026-01": 6988.76, "2026-02": 7467.04, "2026-03": 8515.94, "2026-04": 8060.32, "2026-05": 7712.78, "2026-06": 7020.43, "2026-07": 6562.54, "2026-08": 7015.09, "2026-09": 7219.33, "2026-10": 7068.93};
const NOW=7045.71;            // Swiss Gold buy-back price per 24k gram, 16 Oct 2026
const END=new Date(Date.UTC(2026,9,14));
const fmt=n=>Math.round(n).toLocaleString('en-US');
const yrs=n=>n===1?'1 year':n+' years';
const $=id=>document.getElementById(id);

function history(m,years){
  const start=new Date(Date.UTC(2026-years,9,15));
  let g=0,paid=0,pts=[];
  for(let d=new Date(start);d<=END;d.setUTCDate(d.getUTCDate()+1)){
    const k=d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0');
    g+=m/P[k];paid+=m;if(d.getUTCDate()===15)pts.push(g);
  }
  pts.push(g);return{g,paid,pts,start};
}
function draw(pts,y0){
  const c=$('c'),r=window.devicePixelRatio||1,w=c.clientWidth,h=c.clientHeight;
  c.width=w*r;c.height=h*r;const x=c.getContext('2d');x.scale(r,r);
  const cs=getComputedStyle(document.documentElement),gold=cs.getPropertyValue('--gold').trim(),deep=cs.getPropertyValue('--goldDeep').trim(),line=cs.getPropertyValue('--line').trim(),mut=cs.getPropertyValue('--muted').trim();
  const pad=22,max=pts[pts.length-1]||1;
  x.strokeStyle=line;x.lineWidth=1;for(let i=0;i<=3;i++){const y=pad+(h-2*pad)*i/3;x.beginPath();x.moveTo(0,y);x.lineTo(w,y);x.stroke();}
  // time runs left to right
  const X=i=>6+(w-12)*i/(pts.length-1),Y=v=>h-pad-(h-2*pad)*v/max;
  x.beginPath();pts.forEach((v,i)=>i?x.lineTo(X(i),Y(v)):x.moveTo(X(i),Y(v)));
  x.lineTo(X(pts.length-1),h-pad);x.lineTo(X(0),h-pad);x.closePath();x.globalAlpha=.18;x.fillStyle=gold;x.fill();x.globalAlpha=1;
  x.beginPath();pts.forEach((v,i)=>i?x.lineTo(X(i),Y(v)):x.moveTo(X(i),Y(v)));x.strokeStyle=deep;x.lineWidth=3;x.stroke();
  x.beginPath();x.arc(X(pts.length-1),Y(max),5,0,7);x.fillStyle=deep;x.fill();
  x.fillStyle=mut;x.font='600 12px Poppins, sans-serif';x.textAlign='left';x.fillText(String(y0),2,h-4);x.textAlign='right';x.fillText('2026',w-2,h-4);
  x.textAlign='right';x.fillText(max.toFixed(1)+' g',X(pts.length-1)-8,Y(max)+16);
}
function press(id,v){document.querySelectorAll('#'+id+' button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v==String(v)));}
function run(){
  const m=Math.max(0,+$('m').value||0),y=+$('y').value,r=history(m,y),val=r.g*NOW;
  $('yv').textContent=yrs(y);
  $('dline').innerHTML='That\'s <b>'+m.toLocaleString('en-US')+' EGP</b> every day, spent on 24 karat gold, from October '+(2026-y)+' to October 2026 ('+yrs(y)+').';
  $('g').textContent=r.g.toFixed(2)+' g';
  $('paid').textContent=fmt(r.paid)+' EGP';
  $('now').textContent=fmt(val)+' EGP';
  $('gain').textContent=(val>=r.paid?'+':'')+fmt(val-r.paid)+' EGP';
  $('x').textContent=r.paid?(val/r.paid).toFixed(1)+'×':'—';
  press('chips',m);draw(r.pts,2026-y);
}
$('m').addEventListener('input',run);$('y').addEventListener('input',run);
document.querySelectorAll('.chips').forEach(c=>c.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$(c.dataset.for).value=b.dataset.v;run();}));
addEventListener('resize',run);
(document.fonts?document.fonts.ready:Promise.resolve()).then(run);run();
