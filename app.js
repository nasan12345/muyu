const $=id=>document.getElementById(id);
const KP='my_final_p',KS='my_final_s',KC='my_final_ch';
let S={v:'splash',l:1,s:0,pk:null,ti:null,run:false,sec:180};

function L(k,d){try{return JSON.parse(localStorage.getItem(k)||d)}catch{return JSON.parse(d)}}
function W(k,v){localStorage.setItem(k,JSON.stringify(v))}
function done(){return Object.values(L(KP,'{}')).filter(v=>v==='done').length}
function ph(){const n=done();return n>=17?5:n>=12?4:n>=8?3:n>=4?2:1}
function pd(){return PHASES[ph()]}
function ls(id){const p=L(KP,'{}');if(p[id]==='done')return'd';if(id===1||p[id-1]==='done')return'o';return'l'}
function cl(){return LEVELS.find(l=>l.id===S.l)}

function go(name){
  S.v=name;
  document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));
  $(name==='splash'?'spl':name==='home'?'hom':name==='levels'?'lvl':'ply').classList.add('on');
}

function CK(){
  const t=new Date().toISOString().slice(0,10),s=L(KS,'{"n":0,"d":""}');
  if(s.d===t)return;const y=new Date(Date.now()-86400000).toISOString().slice(0,10);
  s.n=s.d===y?s.n+1:1;s.d=t;W(KS,s);
}

function enter(){CK();renderHome();go('home')}

function renderHome(){
  const p=pd(),c=done(),s=L(KS,'{"n":0,"d":""}');
  $('heroBg').style.backgroundImage=`url('${p.image}')`;
  $('phaseDot').style.background=p.color;$('phaseDot').style.boxShadow='0 0 10px '+p.color;
  $('phaseTag').textContent=p.name;$('phaseTag').style.color=p.color;
  let gt,gs;
  if(s.n>=21){gt='……';gs='木鱼声和心跳融在一起。';}
  else if(s.n>=7){gt='哟，认真的啊。';gs='连续'+s.n+'天，木鱼敲出了节奏。';}
  else if(s.n>=3){gt='嗯，不错。';gs='连续'+s.n+'天，鼓点越来越稳。';}
  else if(c>=21){gt='你来了。';gs='笃。笃。笃。';}
  else if(c>0){gt='在找鼓点？';gs='第'+c+'/21关 · '+p.name;}
  else{gt='……敲一下试试？';gs='木鱼从后面探出头。';}
  $('greetTxt').textContent=gt;$('greetSub').textContent=gs;
  $('hpFill').style.width=(c/21*100)+'%';$('hpNum').textContent=c+'/21';
  const si=$('streakInfo');si.style.display=s.n>=2?'':'none';
  if(s.n>=2)si.textContent=(s.n>=7?'🔥':'✨')+' 连续'+s.n+'天';
  $('btnCont').textContent=c>=21?'再来一轮':c===0?'开始成长':'继续成长';
}

function goContinue(){let n=done()+1;if(done()>=21||n>21)n=1;startLvl(n)}
function goResult(){go('play');$('playTtl').textContent='真实的自己';showResult();$('navPrev').style.visibility='hidden';$('navNext').textContent='返回首页';$('navNext').onclick=function(){restartJourney();};}
function goLevels(){renderLevels();go('levels')}
function goReset(){if(confirm('确定重新开始？')){W(KP,'{}');W(KS,'{"n":0,"d":""}');W(KC,'{}');renderHome();}}

function renderLevels(){
  $('lvMeta').textContent=done()+'/21';
  const g=$('lvGrid');g.innerHTML='';
  for(let i=1;i<=21;i++){
    const s=ls(i),l=LEVELS[i-1],d=document.createElement('div');
    d.style.cssText='aspect-ratio:3/4;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;background-size:cover;background-position:center;position:relative';
    d.style.backgroundImage=`url('images/card_${String(i).padStart(2,'0')}_hd.jpg')`;
    if(s==='l'){d.style.opacity='.2';d.style.border='1px solid rgba(255,255,255,.06)';}
    else if(s==='o'){d.style.border='1px solid rgba(184,160,200,.25)';d.style.cursor='pointer';d.onclick=()=>startLvl(i);}
    else{d.style.border='1px solid rgba(176,160,184,.35)';d.style.cursor='pointer';d.onclick=()=>startLvl(i);d.innerHTML+='<span style=position:absolute;top:6px;right:8px;font-size:12px;color:#b8a0c8>✓</span>';}
    const nc=s==='l'?'rgba(255,255,255,.1)':s==='o'?'#b8a0c8':'#d0c0e0';
    const tc=s==='l'?'rgba(255,255,255,.05)':s==='o'?'rgba(255,255,255,.45)':'rgba(255,255,255,.35)';
    d.innerHTML+=`<span style=\"font-size:clamp(18px,5vw,26px);font-weight:700;z-index:1;color:${nc}\">${i}</span><span style=\"font-size:clamp(9px,2.2vw,11px);margin-top:2px;letter-spacing:2px;z-index:1;color:${tc}\">${l.title}</span>`;
    g.appendChild(d);
  }
}
function goLevelsBack(){renderHome();go('home')}

function startLvl(id){S.l=id;S.s=0;S.pk=null;if(S.ti){clearInterval(S.ti);S.ti=null;S.run=false;S.sec=180;}go('play');renderPlay();}
function renderPlay(){
  const l=cl(),s=S.s;
  $('playTtl').textContent='第'+S.l+'关';
  let dots='';for(let i=0;i<4;i++)dots+=`<span style=\"display:inline-block;width:${i===s?'18px':'8px'};height:8px;border-radius:${i===s?'4px':'50%'};background:${i===s?'#b8a0c8':i<s?'rgba(176,160,184,.35)':'rgba(255,255,255,.12)'};transition:.3s\"></span>`;
  $('playSteps').innerHTML=dots;
  const prv=$('navPrev'),nxt=$('navNext');
  prv.style.visibility=s>0?'visible':'hidden';
  nxt.textContent=s===3?'完成':'下一步';
  nxt.disabled=(s===1&&S.pk===null);
  if(s===1&&S.pk!==null){var ch=L(KC,'{}');ch[S.l]=S.pk;W(KC,ch);}
  const b=$('playBody');
  if(s===0){b.innerHTML=`<div style=\"height:100%;display:flex;flex-direction:column\"><img src=\"images/story_lvl${S.l}.jpg\" style=\"width:100%;height:42%;object-fit:cover;flex-shrink:0\"><div style=\"flex:1;overflow-y:auto;padding:16px 18px\"><div style=\"font-size:11px;color:rgba(255,255,255,.35);letter-spacing:2px;margin-bottom:4px\">${pd().name} · 第${l.id}关</div><div style=\"color:#b8a0c8;font-size:clamp(22px,7vw,30px);font-weight:700;letter-spacing:4px;margin-bottom:4px\">${l.title}</div><div style=\"color:rgba(184,160,200,.4);font-size:clamp(12px,3.5vw,15px);margin-bottom:12px\">${l.subtitle}</div><div style=\"color:rgba(255,255,255,.65);font-size:clamp(13px,3.5vw,16px);line-height:1.8;white-space:pre-line\">${l.story.text}</div></div></div>`}
  else if(s===1){b.innerHTML=`<div style=\"height:100%;display:flex;align-items:center;justify-content:center;padding:20px\"><div style=\"width:100%\"><div style=\"color:#b8a0c8;font-size:clamp(17px,4.5vw,22px);font-weight:600;letter-spacing:2px;margin-bottom:16px\">如果是你，会怎么做？</div><div id=\"cw\">${l.choices.map((c,i)=>`<button data-i=\"${i}\" style=\"display:block;width:100%;padding:14px 18px;margin-bottom:10px;border-radius:12px;border:1px solid rgba(184,160,200,.15);background:rgba(184,160,200,.04);color:rgba(255,255,255,.8);font-size:clamp(13px,3.5vw,16px);text-align:left;cursor:pointer\">${c.text}</button>`).join('')}</div><div id=\"fb\" style=\"display:none;margin-top:14px;padding:14px 16px;border-radius:12px;background:rgba(176,160,184,.05);color:#b8a0c8;font-size:clamp(12px,3vw,15px);line-height:1.6\"></div><div id=\"rx\" style=\"display:none\"></div></div></div>`;
    document.querySelectorAll('#cw button').forEach(btn=>{btn.onclick=function(){
      if(S.pk!==null)return;const i=parseInt(this.dataset.i);S.pk=i;
      document.querySelectorAll('#cw button').forEach(b=>{b.disabled=true;b.style.opacity='.4'});
      this.style.borderColor='#b0a0b8';this.style.background='rgba(176,160,184,.18)';
      $('fb').textContent=l.choices[i].feedback;$('fb').style.display='';
      setTimeout(()=>{const pn=ph(),pn2=pd().name,ek=l.choices[i].emo||'confused',cn=EMOJI_MAP[ek]||'疑惑',pns=['','一','二','三','四','五'];
        $('rx').innerHTML=`<div style=\"display:flex;align-items:center;gap:10px;margin-top:12px;padding:12px 14px;border-radius:12px;background:rgba(176,160,184,.04)\"><img src=\"images/${pn}_阶段${pns[pn]}_${pn2}_${cn}.png\" style=\"width:44px;height:44px;border-radius:50%\"><span style=\"color:#b8a0c8;font-size:13px\">${['木鱼敲了一下。','木鱼轻轻敲了两下。','木鱼歪着头看你。'][i]||'木鱼看着你。'}</span></div>`;
        $('rx').style.display='';},400);
      setTimeout(()=>{S.s=2;renderPlay();},2500);$('navNext').disabled=true;
    }});}
  else if(s===2){b.innerHTML=`<div style=\"height:100%;display:flex;flex-direction:column\"><img src=\"${pd().pracImg||pd().image}\" style=\"width:100%;height:38%;object-fit:cover;flex-shrink:0\"><div style=\"flex:1;overflow-y:auto;padding:16px 18px\"><div style=\"font-size:11px;color:rgba(255,255,255,.35);letter-spacing:2px;margin-bottom:8px\">今日行动 · ${l.practice.title}</div><div style=\"color:rgba(255,255,255,.65);font-size:clamp(13px,3.5vw,15px);line-height:1.8;white-space:pre-line;margin-bottom:16px\">${l.practice.instruction}</div><div style=\"text-align:center\"><div id=\"td\" style=\"font-size:clamp(42px,12vw,60px);font-weight:200;color:#b8a0c8;letter-spacing:4px\">03:00</div><div style=\"font-size:12px;color:rgba(255,255,255,.35);margin:6px 0 14px\">行动倒计时</div><button id=\"tb\" onclick=\"toggleTimer()\" style=\"padding:12px 36px;border-radius:50px;font-size:14px;cursor:pointer;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.05);color:#fff\">开始行动</button></div></div></div>`}
  else if(s===3){b.innerHTML=`<div style=\"height:100%;display:flex;flex-direction:column\"><img src=\"images/sutra_scene.jpg\" style=\"width:100%;height:38%;object-fit:cover;flex-shrink:0\"><div style=\"flex:1;overflow-y:auto;padding:16px 18px\"><div style=\"padding-bottom:14px;margin-bottom:14px;border-bottom:1px solid rgba(255,255,255,.05)\"><div style=\"color:rgba(208,192,232,.5);font-size:clamp(13px,3vw,15px);line-height:1.8;font-style:italic\">${l.sutra}</div><div style=\"margin-top:12px;padding-top:12px;border-top:1px dashed rgba(255,255,255,.05);color:#b8a0c8;font-size:clamp(13px,3vw,15px)\">${l.sutraBaihua}</div></div><div style=\"text-align:center\"><div style=\"color:#b8a0c8;font-size:clamp(16px,4vw,22px);font-weight:300;letter-spacing:2px\">${l.quote}</div><span style=\"color:rgba(184,160,200,.25);font-size:11px;margin-top:6px;display:block\">—— 木鱼</span></div></div></div>`}
}

function prevStep(){if(S.s>0){S.s--;S.pk=null;renderPlay();}}
function nextStep(){if(S.s<3){S.s++;renderPlay();}else completeLvl();}
function goPlayBack(){renderLevels();go('levels')}

function toggleTimer(){
  const btn=$('tb'),disp=$('td');if(!btn||!disp)return;
  if(S.ti){clearInterval(S.ti);S.ti=null;S.run=false;btn.textContent='开始行动';}
  else{S.run=true;S.sec=180;btn.textContent='暂停';
    const tick=()=>{const m=Math.floor(S.sec/60),s=S.sec%60;disp.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');if(S.sec<=0){clearInterval(S.ti);S.ti=null;S.run=false;btn.textContent='完成 ✓';}S.sec--;};
    tick();S.ti=setInterval(tick,1000);}
}

function completeLvl(){
  if(S.ti){clearInterval(S.ti);S.ti=null;S.run=false;}
  const p=L(KP,'{}');if(p[S.l]!=='done'){p[S.l]='done';W(KP,p);}
  if(done()>=21){showEnding();return;}
  var nxt=S.l+1;
  S.l=nxt;S.s=0;S.pk=null;S.sec=180;
  renderPlay();
}
function showEnding(){
  var b=$('playBody');
  b.innerHTML='<div style=\"height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px;text-align:center\"><img src=\"'+pd().image+'\" style=\"width:70%;max-width:280px;object-fit:contain;margin-bottom:20px;animation:fadein 2s ease\"><div style=\"color:#b8a0c8;font-size:clamp(22px,6vw,36px);font-weight:700;letter-spacing:6px;margin-bottom:6px\">旅程完成</div><div style=\"color:rgba(255,255,255,.5);font-size:clamp(13px,3.5vw,16px);margin-bottom:20px\">21课，21次选择。<br>你从第一关的焦虑，走到了最后一关的自在。<br>木鱼从一只躲在木鱼后面不敢敲的瘦小猫，<br>变成了与心跳同频的自在木鱼。<br><br>你也一样。<br>笃。笃。笃。<br>节奏在你手里。<br>来看看，这一路走来——<br>你成了什么样的自己？</div><button onclick=\"showResult()\" style=\"padding:14px 40px;border-radius:50px;border:none;background:linear-gradient(135deg,#8a60a8,#b0a0b8);color:#fff;font-size:clamp(14px,4vw,18px);font-weight:600;letter-spacing:4px;cursor:pointer\">真实的自己</button></div>';
  $('navPrev').style.visibility='hidden';
  $('navNext').textContent='返回首页';
  $('navNext').onclick=function(){restartJourney();};
}
function showResult(){
  var ch=L(KC,'{}'),score=0;
  for(var i=1;i<=21;i++){if(ch[i]===0)score++;}
  var result,accessory,desc,accImg;
  if(score<=7){result='笃行者';accessory='竹简书';desc='一步一印，如竹简上的刻痕。朴拙之中藏大智，一字一句皆是功夫。木鱼说：笃。一下。一下。就够了。';accImg='images/item_bamboo.jpg';}
  else if(score<=14){result='破局者';accessory='拂尘';desc='拂去迷雾，拨云见日。不惧混沌，敢在乱中找自己的路。木鱼说：扫一扫，就清楚了。';accImg='images/item_whisk.jpg';}
  else{result='自在者';accessory='葫芦';desc='壶中自有天地。你已不畏外物，不假于形。进退自如，收放随心。木鱼说：乾坤在手，何须多求。';accImg='images/item_gourd.jpg';}
  var b=$('playBody');
  b.innerHTML='<div style=\"height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px;text-align:center\"><div style=\"color:#b8a0c8;font-size:clamp(24px,7vw,38px);font-weight:700;letter-spacing:8px;margin-bottom:2px\">'+result+'</div><div style=\"color:rgba(255,255,255,.4);font-size:clamp(12px,3vw,15px);margin-bottom:16px\">获得 · '+accessory+'</div><img src=\"'+accImg+'\" style=\"width:75%;max-width:300px;object-fit:contain;margin-bottom:16px\"><div style=\"color:rgba(255,255,255,.45);font-size:clamp(12px,3.2vw,15px);max-width:300px;line-height:1.8;margin-bottom:20px\">'+desc+'</div><button onclick=\"restartJourney()\" style=\"padding:14px 40px;border-radius:50px;border:none;background:linear-gradient(135deg,#8a60a8,#b0a0b8);color:#fff;font-size:clamp(14px,4vw,18px);font-weight:600;letter-spacing:4px;cursor:pointer\">重新成长</button></div>';
  $('navPrev').style.visibility='hidden';
  $('navNext').textContent='返回首页';
  $('navNext').onclick=function(){restartJourney();};
}
function restartJourney(){
  S.l=1;S.s=0;S.pk=null;S.sec=180;
  if(S.ti){clearInterval(S.ti);S.ti=null;S.run=false;}
  go('home');renderHome();
}
function goComplete(){
  $('ov').style.display='none';
  var nxt=done()+1;if(nxt>21)nxt=1;
  S.l=nxt;S.s=0;S.pk=null;
  if(S.ti){clearInterval(S.ti);S.ti=null;S.run=false;S.sec=180;}
  go('play');renderPlay();
}
renderHome();
