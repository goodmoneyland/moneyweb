var ML_WM={id:'mlwm',afterDraw:function(c){var x=c.ctx,a=c.chartArea;if(!a)return;x.save();x.globalAlpha=0.18;x.fillStyle='#ffffff';x.font='700 '+Math.max(14,Math.min(40,(a.right-a.left)/12))+'px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('moneyland.co.kr',(a.left+a.right)/2,(a.top+a.bottom)/2);x.restore();}};var ML_ADMIN_EMAILS=['saymeany@gmail.com','good.moneyland@gmail.com'];function _mlIsAdmin(){try{var u=JSON.parse(localStorage.getItem('ml_user')||'null');return!!(u&&u.email&&ML_ADMIN_EMAILS.indexOf(String(u.email).trim().toLowerCase())>=0);}catch(e){return false;}}
function _mlIsInput(t){return t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT'||t.isContentEditable);}
function _mlBindDoc(doc){if(!doc||doc.__mlBound)return;try{doc.addEventListener('contextmenu',function(e){if(_mlIsAdmin()||_mlIsInput(e.target))return;e.preventDefault();});doc.addEventListener('dragstart',function(e){if(_mlIsAdmin()||_mlIsInput(e.target))return;e.preventDefault();});doc.addEventListener('keydown',function(e){if(_mlIsAdmin())return;var k=(e.key||'').toLowerCase();if(e.key==='F12'){e.preventDefault();return;}
if(e.ctrlKey&&e.shiftKey&&(k==='i'||k==='j'||k==='c')){e.preventDefault();return;}
if(e.ctrlKey&&!_mlIsInput(e.target)&&(k==='u'||k==='s')){e.preventDefault();return;}});doc.__mlBound=true;}catch(e){}}
function _mlProtectFrameDoc(doc){if(!doc)return;try{if(!doc.__mlStyled){var st=doc.createElement('style');st.textContent='html:not(.ml-admin) body{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none;}'
+'input,textarea,select,[contenteditable="true"]{-webkit-user-select:text!important;-moz-user-select:text!important;user-select:text!important;-webkit-touch-callout:default!important;}';(doc.head||doc.documentElement).appendChild(st);doc.__mlStyled=true;}
_mlBindDoc(doc);if(doc.documentElement)doc.documentElement.classList.toggle('ml-admin',_mlIsAdmin());}catch(e){}}
function _mlApplyProtect(){try{document.documentElement.classList.toggle('ml-admin',_mlIsAdmin());}catch(e){}
try{var fr=document.querySelectorAll('iframe');for(var i=0;i<fr.length;i++){try{_mlProtectFrameDoc(fr[i].contentDocument);}catch(e){}}}catch(e){}}
(function(){_mlBindDoc(document);function hook(ifr){try{ifr.addEventListener('load',function(){_mlProtectFrameDoc(ifr.contentDocument);});}catch(e){}
try{if(ifr.contentDocument&&ifr.contentDocument.readyState!=='loading')_mlProtectFrameDoc(ifr.contentDocument);}catch(e){}}
function init(){_mlApplyProtect();var fr=document.querySelectorAll('iframe');for(var i=0;i<fr.length;i++)hook(fr[i]);try{var mo=new MutationObserver(function(muts){for(var i=0;i<muts.length;i++){var ns=muts[i].addedNodes;for(var j=0;j<ns.length;j++){var n=ns[j];if(n.tagName==='IFRAME')hook(n);else if(n.querySelectorAll){var inner=n.querySelectorAll('iframe');for(var k=0;k<inner.length;k++)hook(inner[k]);}}}});mo.observe(document.documentElement,{childList:true,subtree:true});}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();async function hardReload(){try{if('caches'in window){const keys=await caches.keys();await Promise.all(keys.map(k=>caches.delete(k)));}}catch(e){}
location.reload(true);}
const WEEKDAYS=['일','월','화','수','목','금','토'];function isWeekday(d){const w=d.getDay();return w!==0&&w!==6;}
function prevBizDay(d){const r=new Date(d);do{r.setDate(r.getDate()-1);}while(!isWeekday(r));return r;}
function nextBizDay(d){const r=new Date(d);do{r.setDate(r.getDate()+1);}while(!isWeekday(r));return r;}
function toYMD(d){return d.getFullYear().toString()
+String(d.getMonth()+1).padStart(2,'0')
+String(d.getDate()).padStart(2,'0');}
function toLabel(d){return`${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')} ${WEEKDAYS[d.getDay()]}`;}
const TODAY=new Date();let currentDate=new Date(TODAY);if(!isWeekday(currentDate))currentDate=prevBizDay(currentDate);const TODAY_YMD=toYMD(new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate()));function renderDateNav(){const ymd=toYMD(currentDate);const isToday=ymd>=TODAY_YMD;document.getElementById('date-label').innerHTML=toLabel(currentDate);document.getElementById('arr-newer').classList.toggle('disabled',isToday);document.getElementById('arr-older').classList.remove('disabled');}
function moveDate(dir){if(dir==='older'){currentDate=prevBizDay(currentDate);}else{const nxt=nextBizDay(currentDate);if(toYMD(nxt)<=TODAY_YMD)currentDate=nxt;else return;}
renderDateNav();loadCurrentTab();}
var BINDEX={};fetch('/moneyweb/briefing_index.json?t='+Date.now()).then(r=>r.json()).then(data=>{BINDEX=data;updateStatBadge();initialRoute();}).catch(()=>{console.warn('briefing_index.json 로드 실패');initialRoute();});var APP_BUILD=null;var _updatePending=false;function _checkVersion(){fetch('/moneyweb/api/version.json?t='+Date.now()).then(r=>r.ok?r.json():null).then(j=>{if(!j||!j.build)return;if(APP_BUILD===null){APP_BUILD=j.build;return;}
if(j.build!==APP_BUILD){_updatePending=true;_applyUpdate();}}).catch(()=>{});}
function _applyUpdate(){if(!_updatePending)return;var ae=document.activeElement;var typing=ae&&(ae.tagName==='INPUT'||ae.tagName==='TEXTAREA'||ae.isContentEditable);if(typing)return;if(typeof hardReload==='function')hardReload();else location.reload(true);}
document.addEventListener('visibilitychange',_applyUpdate);window.addEventListener('focus',_applyUpdate);window.addEventListener('hashchange',_applyUpdate);var _idleTimer=null;function _resetIdle(){if(_idleTimer)clearTimeout(_idleTimer);_idleTimer=setTimeout(function(){_applyUpdate();},60000);}
['mousemove','mousedown','keydown','touchstart','scroll','wheel'].forEach(function(ev){window.addEventListener(ev,_resetIdle,{passive:true});});_resetIdle();_checkVersion();setInterval(_checkVersion,120000);try{if('serviceWorker'in navigator){navigator.serviceWorker.getRegistrations().then(function(rs){rs.forEach(function(r){r.unregister();});}).catch(function(){});}
if('caches'in window){caches.keys().then(function(ks){ks.forEach(function(k){caches.delete(k);});}).catch(function(){});}}catch(e){}
window.addEventListener('pageshow',function(e){if(e.persisted)_checkVersion();});function updateStatBadge(){}
const TAB_KEY={'us-morning':'us-morning','kr-morning':'kr-morning','report':'report','per':'sector-per','kr-theme':'kr-theme','kr-thememap':'kr-thememap',};const NO_DATE_TABS=['home','schedule','idea','community','tgtprc','nxt','kr-marketmap','global-marketmap','global-thememap','kr-sugup'];var currentTab='home';function toggleDrawer(){const btn=document.getElementById('hamburger-btn');const panel=document.getElementById('drawer-panel');const overlay=document.getElementById('drawer-overlay');const open=panel.classList.toggle('open');btn.classList.toggle('open',open);overlay.classList.toggle('open',open);}
function drawerNav(tab){document.querySelectorAll('.drawer-tab').forEach(t=>{t.classList.toggle('active',t.dataset.tab===tab);});const topEl=document.querySelector(`.ntab[data-tab="${tab}"], .ntab-home[data-tab="${tab}"]`);if(topEl)switchTab(tab,topEl);else switchTab(tab,{classList:{add:()=>{},remove:()=>{}},dataset:{}});document.getElementById('drawer-panel').classList.remove('open');document.getElementById('drawer-overlay').classList.remove('open');document.getElementById('hamburger-btn').classList.remove('open');}
document.addEventListener('keydown',e=>{if(e.key==='/'&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'){e.preventDefault();const si=document.getElementById('search-input');if(si)si.focus();}
if(e.key==='Escape'){const gm=document.getElementById('glmodal');if(gm&&gm.classList.contains('open'))glClose();}});function switchTab(tab,el){document.querySelectorAll('.ntab, .ntab-home').forEach(t=>t.classList.remove('active'));if(el&&el.classList)el.classList.add('active');currentTab=tab;document.getElementById('subtab-bar').style.display=(tab==='schedule')?'flex':'none';document.getElementById('kr-theme-bar').style.display=(tab==='kr-theme')?'flex':'none';document.getElementById('kr-thememap-bar').style.display=(tab==='kr-thememap')?'flex':'none';document.getElementById('commodity-bar').style.display=(tab==='dram')?'flex':'none';if(tab!=='kr-theme')document.getElementById('wrap-newhigh').style.display='none';document.getElementById('date-nav').style.visibility='visible';document.querySelectorAll('.page-inner').forEach(p=>p.classList.remove('active'));['us-morning','kr-morning','report','per','peer','kr-theme','kr-marketmap','global-marketmap','global-thememap','kr-thememap','kr-sugup','dram','lithium','shipbuilding','trade'].forEach(k=>{const w=document.getElementById('wrap-'+k);if(w)w.style.display='none';});if(tab==='home'){document.getElementById('page-home').classList.add('active');loadHomeSummary();}
else if(tab==='schedule'){document.getElementById('page-schedule').classList.add('active');loadAllScheduleDashboard();}
else if(tab==='idea'){document.getElementById('page-idea').classList.add('active');renderIdeas();}
else if(tab==='community')document.getElementById('page-community').classList.add('active');else if(tab==='trump'){document.getElementById('page-trump').classList.add('active');loadTrumpPage();}
else if(tab==='global-high'){document.getElementById('page-global-high').classList.add('active');loadGlobalHigh();}
else if(tab==='tgtprc'){const pg=document.getElementById('page-tgtprc');pg.classList.add('active');pg.classList.remove('tp-detail');loadTgtprcPage();}
else if(tab==='nxt'){document.getElementById('page-nxt').classList.add('active');nxtInit();}
else if(tab==='kr-marketmap'){document.getElementById('wrap-kr-marketmap').style.display='block';}
else if(tab==='global-marketmap'){document.getElementById('wrap-global-marketmap').style.display='block';var _gmf=document.getElementById('page-global-marketmap');if(_gmf&&!_gmf.src){_gmf.src=_gmf.getAttribute('data-src')+'?v='+Date.now();}}
else if(tab==='global-thememap'){document.getElementById('wrap-global-thememap').style.display='block';var _gtf=document.getElementById('page-global-thememap');if(_gtf&&!_gtf.src){_gtf.src=_gtf.getAttribute('data-src')+'?v='+Date.now();}}
else if(tab==='kr-sugup'){document.getElementById('wrap-kr-sugup').style.display='block';}
else if(tab==='dram'){switchCommodityTab('memory',document.getElementById('cmd-memory'));}
else if(tab==='trade'){document.getElementById('wrap-trade').style.display='block';}
else if(tab==='peer'){document.getElementById('wrap-peer').style.display='block';var _pf=document.getElementById('page-peer');if(_pf&&!_pf.src){_pf.src=_pf.getAttribute('data-src')+'?v='+Date.now();}}
if(tab==='kr-theme'){switchKrThemeTab('stk-high',document.getElementById('krt-stk-high'));}
else if(tab==='kr-thememap'){switchThemeMapTab('map',document.getElementById('krm-map'));}
else if(tab==='per'){const wPer=document.getElementById('wrap-per');if(wPer)wPer.style.display='flex';loadFrame('per');if(!_perValChartLoaded){_perValChartLoaded=true;loadValChart();}}
else if(TAB_KEY[tab]){const w=document.getElementById('wrap-'+tab);if(w)w.style.display='block';loadFrame(tab);}
syncHashFromTab(tab);}
var _validTabs=null;function getValidTabs(){if(!_validTabs){_validTabs=new Set();document.querySelectorAll('[data-tab]').forEach(el=>{if(el.dataset.tab)_validTabs.add(el.dataset.tab);});}
return _validTabs;}
function syncHashFromTab(tab){if(tab==='home'){if(location.hash)history.pushState(null,'',location.pathname+location.search);}else if(location.hash.slice(1)!==tab){location.hash=tab;}}
function applyRoute(tab){if(!getValidTabs().has(tab))tab='home';const el=document.querySelector(`.ntab[data-tab="${tab}"], .ntab-home[data-tab="${tab}"]`);document.querySelectorAll('.drawer-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));switchTab(tab,el||{classList:{add(){},remove(){}},dataset:{}});}
window.addEventListener('hashchange',()=>{let tab=decodeURIComponent((location.hash||'').slice(1))||'home';if(!getValidTabs().has(tab))tab='home';if(tab===currentTab)return;applyRoute(tab);});var _routedInit=false;function initialRoute(){if(_routedInit)return;_routedInit=true;let tab=decodeURIComponent((location.hash||'').slice(1))||'home';if(!getValidTabs().has(tab))tab='home';applyRoute(tab);try{const s=new URLSearchParams(location.search).get('s');if(s)openStockDeepLink(s.trim());}catch(e){}}
function openStockDeepLink(s){if(!s)return;if(/^\d{6}$/.test(s)){if(window.openKrStock)openKrStock(s);}else if(window.glPopup){glPopup(s.toUpperCase());}}
function copyStockLink(s,btn){const url=location.origin+'/?s='+encodeURIComponent(s);const done=()=>{if(!btn)return;const old=btn.innerHTML;btn.innerHTML='✅ 복사됨';setTimeout(()=>{btn.innerHTML=old;},1400);};if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url).then(done).catch(()=>{prompt('링크 복사:',url);});}else{prompt('링크 복사:',url);}}
function getFileSrc(tab){const key=TAB_KEY[tab];if(!key||!BINDEX[key])return null;if(tab==='per'&&BINDEX[key].length)return BINDEX[key][0].src;if(tab==='us-morning'&&BINDEX[key].length){const latestBiz=isWeekday(TODAY)?TODAY_YMD:toYMD(prevBizDay(TODAY));if(toYMD(currentDate)>=latestBiz)return BINDEX[key][0].src;}
const ymd=toYMD(currentDate);const list=BINDEX[key];for(const entry of list){const lblYMD=entryLabelToYMD(entry.label);if(lblYMD===ymd)return entry.src;}
const before=list.filter(e=>entryLabelToYMD(e.label)<=ymd);if(before.length>0)return before[0].src;return null;}
function entryLabelToYMD(label){const m=label.match(/(\d{2})\.(\d{2})/);if(!m)return'';const year=new Date().getFullYear();return`${year}${m[1]}${m[2]}`;}
const TODAY_EMPTY_TABS={'kr-morning':{icon:'🌅',t:'한국 모닝브리핑',s:'오늘 모닝브리핑은 아직 생성 전입니다. 보통 장 시작 전 아침에 업데이트됩니다.'},'report':{icon:'📑',t:'리포트',s:'오늘 리포트는 아직 생성 전입니다.'},};function loadFrame(tab){const src=getFileSrc(tab);const frameId='page-'+tab;const frame=document.getElementById(frameId);const ph=document.getElementById('ph-'+tab);const phSub=document.getElementById('ph-'+tab+'-sub');if(!frame)return;if(ph){const _m=ph.querySelector('.msg');if(_m)_m.textContent='파일 로딩중...';}
const te=TODAY_EMPTY_TABS[tab];if(te&&toYMD(currentDate)>=TODAY_YMD&&!_exactSrcFor(tab)){frame.style.display='none';try{frame.contentWindow.location.replace('about:blank');}catch(e){frame.src='about:blank';}
if(ph){ph.style.display='flex';ph.innerHTML=`<div class="icon">${te.icon}</div>`
+`<div class="msg">${te.t} — 아직 생성 전입니다</div>`
+`<div class="sub" id="ph-${tab}-sub">${toLabel(currentDate)} · ${te.s}</div>`;}
return;}
if(!src){if(ph)ph.style.display='flex';frame.style.display='none';frame.src='';if(phSub)phSub.textContent=toLabel(currentDate)+' 파일 없음';return;}
if(ph){ph.style.display='flex';if(phSub)phSub.textContent='';}
frame.style.display='none';const newSrc=src+'?t='+Date.now();if(frame.src&&frame.contentWindow){try{frame.contentWindow.location.replace(newSrc);}catch(e){frame.src=newSrc;}}else{frame.src=newSrc;}}
function onFrameLoad(tab){const frame=document.getElementById('page-'+tab);const ph=document.getElementById('ph-'+tab);if(!frame||!frame.src||frame.src===window.location.href)return;if(ph)ph.style.display='none';frame.style.display='block';frame.classList.add('active');_injectKrPopup(frame);if(tab==='kr-theme')_injectKrThemeLayout(frame);if(tab==='kr-thememap'&&_pendingThemeFocus){const _nm=_pendingThemeFocus;_pendingThemeFocus=null;_focusThemeInMap(frame,_nm);setTimeout(()=>_focusThemeInMap(frame,_nm),300);}
if(tab==='per'){_sizePerFrame();setTimeout(_sizePerFrame,250);setTimeout(_sizePerFrame,700);}
try{_mlProtectFrameDoc(frame.contentDocument||(frame.contentWindow&&frame.contentWindow.document));}catch(e){}}
function _sizePerFrame(){const box=document.getElementById('per-frame-box');const f=document.getElementById('page-per');if(!box||!f)return;try{const doc=f.contentDocument||f.contentWindow.document;if(!doc||!doc.body)return;const h=Math.max(doc.documentElement.scrollHeight||0,doc.body.scrollHeight||0);if(h<60)return;f.style.position='relative';f.style.height=h+'px';box.style.flex='none';box.style.height=h+'px';box.style.overflow='visible';}catch(e){}}
let _perRz;window.addEventListener('resize',()=>{const w=document.getElementById('wrap-per');if(!w||w.style.display==='none')return;clearTimeout(_perRz);_perRz=setTimeout(_sizePerFrame,200);});function _injectKrThemeLayout(frame){try{const iDoc=frame.contentDocument||frame.contentWindow.document;if(!iDoc||!iDoc.body)return;const style=iDoc.createElement('style');style.textContent=`
      .nav-bar, .nav-btn, .page-header, .update-badge { display:none !important; }
      body { padding-bottom:20px; }
      .section-card:first-of-type { margin-top:14px; }
    `;iDoc.head.appendChild(style);_applyKrThemeSection(['am','pm','close'].includes(_krThemeTab)?_krThemeTab:'am');}catch(e){console.warn('kr-theme 레이아웃 주입 실패',e);}}
function _applyKrThemeSection(tab){const frame=document.getElementById('page-kr-theme');if(!frame)return;try{const iDoc=frame.contentDocument||frame.contentWindow.document;if(!iDoc)return;const map={am:'sec-am',pm:'sec-pm',close:'sec-close'};['sec-am','sec-pm','sec-close'].forEach(id=>{const el=iDoc.getElementById(id);if(el)el.style.display=(map[tab]===id)?'':'none';});}catch(e){}}
var _krThemeTab='am';var _newHighData=null;var _perValChartLoaded=false;async function loadValChart(){const el=document.getElementById('valchart-content');el.innerHTML='<div style="color:var(--muted);padding:20px;">로딩 중...</div>';try{const[perData,depData]=await Promise.all([fetch('/moneyweb/api/chart_kospi_per.json?t='+Date.now()).then(r=>r.json()),fetch('/moneyweb/api/chart_deposit_credit.json?t='+Date.now()).then(r=>r.json()),]);const lastFng=perData.fng_per?.slice(-1)[0];const lastKospi1=perData.kospi?.slice(-1)[0];const lastDep=depData.deposit?.slice(-1)[0];const lastKospi2=depData.kospi?.slice(-1)[0];const fmtTri=n=>n?(n/10000).toFixed(1)+'조원':'-';const trlLabel='Trail PER'+(lastFng?'  '+lastFng.trl.toFixed(2)+'x':'');const fwdLabel='Fwd 12M PER'+(lastFng?'  '+lastFng.fwd.toFixed(2)+'x':'');const ksp1Label='코스피 지수'+(lastKospi1?'  '+lastKospi1.v.toLocaleString('ko-KR'):'');const depLabel='고객예탁금'+(lastDep?'  '+fmtTri(lastDep.dep):'');const crdLabel='신용잔고'+(lastDep?'  '+fmtTri(lastDep.crd):'');const ksp2Label='코스피 지수'+(lastKospi2?'  '+lastKospi2.v.toLocaleString('ko-KR'):'');el.innerHTML='<div style="flex:1;min-width:0;">'
+'<div style="font-size:13px;font-weight:800;margin-bottom:6px;color:var(--text);">KOSPI PER 추이 (2년)</div>'
+'<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px;">'
+'<canvas id="chart-per" style="width:100%;height:280px;"></canvas></div></div>'
+'<div style="flex:1;min-width:0;">'
+'<div style="font-size:13px;font-weight:800;margin-bottom:6px;color:var(--text);">고객예탁금 vs 신용잔고 (2년)</div>'
+'<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px;">'
+'<canvas id="chart-dep" style="width:100%;height:280px;"></canvas></div></div>';const gridColor='rgba(255,255,255,0.08)';const tickColor='#e2e8f0';const fmtYMD=d=>d.slice(0,4)+'-'+d.slice(4,6)+'-'+d.slice(6,8);const watermarkPlugin={id:'watermark',afterDraw(chart){const ctx=chart.ctx;const{left,right,top,bottom}=chart.chartArea;const cx=(left+right)/2;const cy=(top+bottom)/2+(bottom-top)*0.15;ctx.save();ctx.globalAlpha=0.18;ctx.font='bold 52px sans-serif';ctx.fillStyle='#ffffff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('moneyland.co.kr',cx,cy);ctx.restore();}};{const fng=perData.fng_per||[];const krx=perData.krx_per||[];const kospi=perData.kospi||[];const labels=krx.map(r=>fmtYMD(r.d));const fngDates=fng.map(r=>fmtYMD(r.d));new Chart(document.getElementById('chart-per'),{plugins:[watermarkPlugin],type:'line',data:{labels,datasets:[{label:trlLabel,data:_alignData(fngDates,labels,fng.map(r=>r.trl)),borderColor:'#3fb950',borderWidth:2.5,pointRadius:4,pointHoverRadius:6,tension:0.3,spanGaps:true,yAxisID:'y1'},{label:fwdLabel,data:_alignData(fngDates,labels,fng.map(r=>r.fwd)),borderColor:'#f87171',borderWidth:2.5,pointRadius:4,pointHoverRadius:6,tension:0.3,spanGaps:true,yAxisID:'y1'},{label:ksp1Label,data:_alignData(kospi.map(r=>fmtYMD(r.d)),labels,kospi.map(r=>r.v)),borderColor:'rgba(150,150,150,0.5)',borderWidth:1.5,pointRadius:0,fill:true,backgroundColor:'rgba(150,150,150,0.06)',tension:0.2,spanGaps:true,yAxisID:'y2'},]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{labels:{color:tickColor,font:{size:22,weight:'bold'},boxWidth:32,padding:20}},tooltip:{backgroundColor:'#0f1829',titleColor:'#e2e8f0',bodyColor:'#94a3b8',callbacks:{label:ctx=>{const v=ctx.parsed.y;if(v==null)return null;return ctx.dataset.yAxisID==='y2'?ctx.dataset.label+': '+v.toLocaleString('ko-KR'):ctx.dataset.label+': '+v.toFixed(2)+'x';}}}},scales:{x:{ticks:{color:tickColor,maxTicksLimit:14,font:{size:10}},grid:{color:gridColor}},y1:{position:'left',ticks:{color:tickColor,callback:v=>v+'x'},grid:{color:gridColor},title:{display:true,text:'PER (배수)',color:tickColor,font:{size:10}}},y2:{position:'right',ticks:{color:tickColor,callback:v=>v.toLocaleString('ko-KR')},grid:{display:false},title:{display:true,text:'코스피 지수',color:tickColor,font:{size:10}}},}}});}
{const dep=depData.deposit||[];const kospi=depData.kospi||[];const dates=dep.map(r=>fmtYMD(r.d));const depV=dep.map(r=>r.dep);const crdV=dep.map(r=>r.crd);const kospiV=_alignData(kospi.map(r=>fmtYMD(r.d)),dates,kospi.map(r=>r.v));new Chart(document.getElementById('chart-dep'),{plugins:[watermarkPlugin],type:'line',data:{labels:dates,datasets:[{label:depLabel,data:depV,borderColor:'#f59e0b',borderWidth:2,pointRadius:0,tension:0.2,spanGaps:true,yAxisID:'y1'},{label:crdLabel,data:crdV,borderColor:'#ef4444',borderWidth:2,pointRadius:0,tension:0.2,spanGaps:true,yAxisID:'y1'},{label:ksp2Label,data:kospiV,borderColor:'rgba(150,150,150,0.5)',borderWidth:1.5,pointRadius:0,fill:true,backgroundColor:'rgba(150,150,150,0.06)',tension:0.2,spanGaps:true,yAxisID:'y2'},]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{labels:{color:tickColor,font:{size:22,weight:'bold'},boxWidth:32,padding:20}},tooltip:{backgroundColor:'#0f1829',titleColor:'#e2e8f0',bodyColor:'#94a3b8',callbacks:{label:ctx=>{const v=ctx.parsed.y;if(v==null)return null;return ctx.dataset.label+': '+(v!=null?v.toLocaleString('ko-KR'):'-');}}}},scales:{x:{ticks:{color:tickColor,maxTicksLimit:12,font:{size:10}},grid:{color:gridColor}},y1:{position:'left',ticks:{color:tickColor,callback:v=>v.toLocaleString('ko-KR')},grid:{color:gridColor},title:{display:true,text:'금액 (억원)',color:tickColor,font:{size:10}}},y2:{position:'right',ticks:{color:tickColor,callback:v=>v.toLocaleString('ko-KR')},grid:{display:false},title:{display:true,text:'코스피 지수',color:tickColor,font:{size:10}}},}}});}}catch(e){el.innerHTML='<div style="color:#f87171;padding:20px;">로드 실패: '+e.message+'</div>';}}
function _alignData(srcDates,tgtDates,srcVals){const map={};srcDates.forEach((d,i)=>{map[d]=srcVals[i];});return tgtDates.map(d=>map[d]!=null?map[d]:null);}
function switchCommodityTab(sub,btn){document.querySelectorAll('#commodity-bar .stab').forEach(b=>b.classList.remove('active'));if(btn)btn.classList.add('active');const map={memory:'wrap-dram',lithium:'wrap-lithium',ship:'wrap-shipbuilding'};Object.values(map).forEach(id=>{const w=document.getElementById(id);if(w)w.style.display='none';});const w=document.getElementById(map[sub]||'wrap-dram');if(w)w.style.display='block';}
function switchKrThemeTab(tab,btn){_krThemeTab=tab;document.querySelectorAll('#kr-theme-bar .stab').forEach(b=>b.classList.remove('active'));if(btn)btn.classList.add('active');const wrapTheme=document.getElementById('wrap-kr-theme');const wrapHigh=document.getElementById('wrap-newhigh');if(tab==='stk-high'||tab==='etf-high'||tab==='rank-chg'){wrapTheme.style.display='none';wrapHigh.style.display='block';if(tab==='rank-chg')renderRankCombined();else renderNewHigh(tab);}else{wrapTheme.style.display='block';wrapHigh.style.display='none';_applyKrThemeSection(tab);}}
function switchThemeMapTab(sub,btn){document.querySelectorAll('#kr-thememap-bar .stab').forEach(b=>b.classList.remove('active'));if(btn)btn.classList.add('active');const wMap=document.getElementById('wrap-kr-thememap');const wTheme=document.getElementById('wrap-kr-theme');document.getElementById('wrap-newhigh').style.display='none';if(sub==='map'){if(wTheme)wTheme.style.display='none';if(wMap)wMap.style.display='block';loadFrame('kr-thememap');}else{_krThemeTab=sub;if(wMap)wMap.style.display='none';if(wTheme)wTheme.style.display='block';if(toYMD(currentDate)>=TODAY_YMD&&!_exactSrcFor('kr-theme')){_showKrThemeEmpty(sub);return;}
const want=getFileSrc('kr-theme');const f=document.getElementById('page-kr-theme');if(f&&want&&f.getAttribute('data-srckey')!==want){f.setAttribute('data-srckey',want);loadFrame('kr-theme');}else{_applyKrThemeSection(sub);}}}
function _exactSrcFor(tab){const list=BINDEX[TAB_KEY[tab]]||[];const ymd=toYMD(currentDate);for(const e of list){if(entryLabelToYMD(e.label)===ymd)return e.src;}
return null;}
function _showKrThemeEmpty(sub){const f=document.getElementById('page-kr-theme');const ph=document.getElementById('ph-kr-theme');if(f){f.style.display='none';f.removeAttribute('data-srckey');try{f.contentWindow.location.replace('about:blank');}catch(e){f.src='about:blank';}}
const map={am:{t:'🌅 오전 특징주',s:'오전 장중 특징주는 11:50 이후 업데이트됩니다.'},pm:{t:'☀️ 오후 특징주',s:'오후 장중 특징주는 14:50 이후 업데이트됩니다.'},close:{t:'🌆 특징주 정리',s:'장마감 후 특징주 정리는 17:30 이후 업데이트됩니다.'},};const m=map[sub]||map.am;if(ph){ph.style.display='flex';ph.innerHTML=`<div class="icon">🕐</div>`
+`<div class="msg">${m.t} — 아직 수집 전입니다</div>`
+`<div class="sub" id="ph-kr-theme-sub">${toLabel(currentDate)} · ${m.s}</div>`;}}
async function _buildPrevDayFullView(){const[r1,r2,r3,r4]=await Promise.all([fetch('/moneyweb/api/new_high_52w_kospi.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]})),fetch('/moneyweb/api/new_high_52w_kosdaq.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]})),fetch('/moneyweb/api/new_high_alltime_kospi.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]})),fetch('/moneyweb/api/new_high_alltime_kosdaq.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]})),]);const fmt=n=>n?Number(n).toLocaleString('ko-KR'):'-';const fmtD=d=>d?`${d.slice(0,4)}.${d.slice(4,6)}.${d.slice(6,8)}`:'';const allRows=[...(r1.rows||[]),...(r2.rows||[]),...(r3.rows||[]),...(r4.rows||[])];if(!allRows.length)return'';const sctr={};allRows.forEach(r=>{const s=r.SCTR_NM||'미분류';sctr[s]=(sctr[s]||0)+1;});const sctrSorted=Object.entries(sctr).sort((a,b)=>b[1]-a[1]);const sctrPill=([nm,cnt])=>'<div style="display:flex;align-items:center;justify-content:space-between;padding:2px 6px;margin-bottom:2px;border-radius:4px;background:var(--card2);">'
+'<span class="kr-nh-sname" style="font-size:16.5px;color:var(--text);">▣ '+nm+'</span>'
+'<span style="font-size:16.5px;font-weight:700;color:#f59e0b;margin-left:8px;flex-shrink:0;">'+cnt+'</span></div>';const summaryCard='<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px;margin-bottom:16px;max-width:340px;">'
+'<div style="font-size:17.2px;font-weight:800;margin-bottom:6px;">신고가 섹터 <span style="font-size:14px;color:var(--muted);font-weight:400;">'+allRows.length+'개</span></div>'
+sctrSorted.map(sctrPill).join('')+'</div>';const rowHtml=r=>{const cl=r.UD_RT>=0?'#ef4444':'#3b82f6';const sign=r.UD_RT>=0?'+':'';return`<tr style="border-bottom:1px solid var(--border);cursor:pointer;"
        onmouseover="this.style.background='var(--card2)'" onmouseout="this.style.background=''"
        onclick="openKrStock('${r.ITM_CD}','${(r.ITM_NM||'').replace(/'/g,"&#39;")}')">
      <td style="padding:7px 10px;font-size:19.5px;font-weight:700;">${r.ITM_NM}</td>
      <td style="padding:7px 10px;font-size:16.5px;color:var(--muted);">${r.ITM_CD}</td>
      <td style="padding:7px 10px;font-size:16.5px;color:var(--muted);">${r.SCTR_NM||'-'}</td>
      <td style="padding:7px 10px;text-align:right;font-size:19.5px;font-weight:700;">${fmt(r.EPRC)}</td>
      <td style="padding:7px 10px;text-align:right;font-size:19.5px;font-weight:800;color:${cl};">${sign+(r.UD_RT||0).toFixed(2)+'%'}</td>
      <td style="padding:7px 10px;text-align:right;font-size:18px;color:#f59e0b;font-weight:700;">${fmt(r.HPRC||r.W52_HPRC||r.ALLTIME_HPRC)}</td>
    </tr>`;};const thead=`<thead><tr>${['종목명','코드','섹터','종가','등락률','장중신고가'].map((c,i)=>
    `<th style="padding:8px 10px;text-align:${i>2?'right':'left'};font-size:16.5px;color:var(--muted);border-bottom:2px solid var(--border);">${c}</th>`
  ).join('')}</tr></thead>`;const section=(title,rows,date)=>rows.length?`
    <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-bottom:16px;">
      <div style="padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;">
        <span style="font-size:19.5px;font-weight:700;color:#ef4444;">${title}</span>
        <span style="font-size:16.5px;color:var(--muted);">${fmtD(date)} 기준 ${rows.length}개</span>
      </div>
      <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;">${thead}<tbody>${rows.map(rowHtml).join('')}</tbody></table></div>
    </div>`:'';return summaryCard+`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      <div>
        ${section('KOSPI 역사적 신고가', r3.rows||[], r3.trd_ymd)}
        ${section('KOSPI 52주 신고가', r1.rows||[], r1.trd_ymd)}
      </div>
      <div>
        ${section('KOSDAQ 역사적 신고가', r4.rows||[], r4.trd_ymd)}
        ${section('KOSDAQ 52주 신고가', r2.rows||[], r2.trd_ymd)}
      </div>
    </div>`;}
async function renderNewHigh(tab){const el=document.getElementById('newhigh-content');if(tab==='etf-high'){el.innerHTML='<div style="color:var(--muted);font-size: 19.5px;">로딩 중...</div>';try{let data=await fetch('/moneyweb/api/new_high_etf.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]}));if(!(data.rows||[]).length){data=await fetch('/moneyweb/api/new_high_etf_52w.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]}));}
const rows=data.rows||[];if(!rows.length){el.innerHTML='<div style="padding:40px;text-align:center;color:var(--muted);">데이터 없음</div>';return;}
const fmtD=d=>d?d.slice(0,4)+'.'+d.slice(4,6)+'.'+d.slice(6,8):'';const fmt=n=>n?Number(n).toLocaleString('ko-KR'):'-';const sectorMap={};rows.forEach(r=>{const s=(!r.sector||r.sector==='기타')?'기타 ETF':r.sector;if(!sectorMap[s])sectorMap[s]=[];sectorMap[s].push(r);});Object.values(sectorMap).forEach(arr=>arr.sort((a,b)=>(b.ud_rt||0)-(a.ud_rt||0)));const sectors=Object.entries(sectorMap).filter(([s])=>s!=='기타 ETF').sort((a,b)=>b[1].length-a[1].length).map(([s])=>s);if(sectorMap['기타 ETF'])sectors.push('기타 ETF');const sumPill=(s)=>'<div style="display:flex;align-items:center;justify-content:space-between;padding:2px 6px;margin-bottom:2px;border-radius:4px;background:var(--card2);">'
+'<span style="font-size: 16.5px;color:var(--text);">▣ '+s+'</span>'
+'<span style="font-size: 16.5px;font-weight:700;color:#f59e0b;margin-left:8px;">'+sectorMap[s].length+'</span>'
+'</div>';const buildEtfRow=(r)=>{const live=_getPrice(r.itm_cd);const prc=(live&&live.curr_prc)||r.close_prc;const rawU=live?live.ud_rt:r.ud_rt;const u=rawU!=null?rawU:null;const c=(u==null||u>=0)?'#ef4444':'#3b82f6';const udStr=u!=null?(u>=0?'+':'')+u.toFixed(2)+'%':'-';const tg=r.is_alltime?'🏆 ':(r.is_uplimit?'🚨 ':'');const nm_esc=r.itm_nm.replace(/'/g,"&#39;");return'<tr style="cursor:pointer;" onclick="openKrStock(\''+r.itm_cd+'\',\''+nm_esc+'\')"'
+' onmouseover="this.style.background=\'var(--card2)\'" onmouseout="this.style.background=\'\'">'
+'<td style="padding:4px 10px 4px 8px;font-size:13.5px;font-weight:600;line-height:1.4;word-break:keep-all;">'+tg+r.itm_nm+'</td>'
+'<td style="padding:4px 6px;text-align:right;font-size:13.5px;font-weight:700;white-space:nowrap;width:72px;">'+fmt(prc)+'</td>'
+'<td style="padding:4px 10px 4px 4px;text-align:right;font-size:13.5px;font-weight:800;color:'+c+';white-space:nowrap;width:66px;">'+udStr+'</td>'
+'</tr>';};const buildEtfCard=(s)=>{const items=sectorMap[s];return'<div style="border:1px solid var(--border);border-radius:8px;overflow:hidden;">'
+'<div style="padding:5px 10px;background:var(--card2);font-size:14px;font-weight:700;border-bottom:1px solid var(--border);">▣ '+s
+' <span style="color:#f59e0b;">('+items.length+')</span></div>'
+'<table style="border-collapse:collapse;table-layout:fixed;width:100%;"><colgroup>'
+'<col style="width:auto"/><col style="width:72px"/><col style="width:66px"/>'
+'</colgroup><tbody>'+items.map(buildEtfRow).join('')+'</tbody></table></div>';};const summaryCol='<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px;min-width:160px;">'
+'<div style="font-size: 17.2px;font-weight:800;margin-bottom:6px;">ETF 신고가 섹터</div>'
+'<div style="font-size: 16.5px;color:#ef4444;font-weight:700;margin-bottom:8px;">📦 ETF '+rows.length+'개</div>'
+sectors.map(sumPill).join('')
+'</div>';const mainSectors=sectors.filter(s=>s!=='기타 ETF');const hasGita=!!sectorMap['기타 ETF'];const gitaItems=hasGita?sectorMap['기타 ETF']:[];const mainGrid='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;align-items:start;">'
+mainSectors.map(buildEtfCard).join('')
+'</div>';let gitaHtml='';if(hasGita){gitaHtml='<div style="border:1px solid var(--border);border-radius:8px;overflow:hidden;margin-top:12px;">'
+'<div style="padding:5px 10px;background:var(--card2);font-size:14px;font-weight:700;border-bottom:1px solid var(--border);">▣ 기타 ETF'
+' <span style="color:#f59e0b;">('+gitaItems.length+')</span></div>'
+'<div style="display:grid;grid-template-columns:1fr 1fr;">'
+'<table style="border-collapse:collapse;table-layout:fixed;width:100%;"><colgroup><col/><col style="width:72px"/><col style="width:66px"/></colgroup><tbody>'
+gitaItems.slice(0,Math.ceil(gitaItems.length/2)).map(buildEtfRow).join('')
+'</tbody></table>'
+'<table style="border-collapse:collapse;table-layout:fixed;width:100%;border-left:1px solid var(--border);"><colgroup><col/><col style="width:72px"/><col style="width:66px"/></colgroup><tbody>'
+gitaItems.slice(Math.ceil(gitaItems.length/2)).map(buildEtfRow).join('')
+'</tbody></table>'
+'</div></div>';}
el.innerHTML='<div style="font-size: 21px;font-weight:800;margin-bottom:12px;">📦 ETF 신고가'
+' <span style="font-size: 16.5px;color:var(--muted);font-weight:400;">'+fmtD(data.trd_ymd)+' 기준 '+rows.length+'개</span></div>'
+'<div style="display:grid;grid-template-columns:160px 1fr;gap:12px;align-items:start;">'
+summaryCol
+'<div>'+mainGrid+gitaHtml+'</div>'
+'</div>';}catch(e){el.innerHTML='<div style="color:#f87171;padding:20px;">데이터 로드 실패: '+e.message+'</div>';}
return;}
const isMarketOpen=KR_MARKET_STATUS==='KRX'||KR_MARKET_STATUS==='NXT_PRE';if(isMarketOpen){el.innerHTML=`<div style="color:var(--muted);font-size: 19.5px;">로딩 중...</div>`;try{const[stkData,etfData]=await Promise.all([fetch('/moneyweb/api/new_high_stocks.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]})),fetch('/moneyweb/api/new_high_etf.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]})),]);const _kstYmd=new Date(Date.now()+9*3600*1000).toISOString().slice(0,10).replace(/-/g,'');const _isToday=(stkData.trd_ymd===_kstYmd);const stkRows=_isToday?(stkData.rows||[]):[];const etfRows=_isToday?(etfData.rows||[]):[];const nxtStkRows=stkData.nxt_rows||[];const nxtEtfRows=etfData.nxt_rows||[];const hasNxt=nxtStkRows.length>0||nxtEtfRows.length>0;const _emptyMsg='장 시작 후 당일 신고가가 나오면 실시간 표시됩니다 (집계 중)';const fmtD=d=>d?`${d.slice(0,4)}.${d.slice(4,6)}.${d.slice(6,8)}`:'';const fmt=n=>n!=null&&n!==''?Number(n).toLocaleString('ko-KR'):'-';const buildStkTr=r=>{const live=_getPrice(r.itm_cd);const prc=(live&&live.curr_prc)||r.close_prc;const rawU=live?live.ud_rt:r.ud_rt;const u=rawU!=null?rawU:null;const c=u==null?'var(--muted)':u>=0?'#ef4444':'#3b82f6';const udStr=u!=null?(u>=0?'+':'')+u.toFixed(2)+'%':'-';const tg=r.is_alltime?'🏆 ':(r.is_uplimit?'🚨 ':'');const nm_esc=r.itm_nm.replace(/'/g,"&#39;");return`<tr style="cursor:pointer;border-bottom:1px solid var(--border);"
            onmouseover="this.style.background='var(--card2)'" onmouseout="this.style.background=''"
            onclick="openKrStock('${r.itm_cd}','${nm_esc}')">
          <td style="padding:6px 10px;font-size:18px;font-weight:700;">${tg}${r.itm_nm}</td>
          <td style="padding:6px 10px;font-size:15px;color:var(--muted);">${r.sector||'-'}</td>
          <td style="padding:6px 10px;text-align:right;font-size:18px;font-weight:700;">${fmt(prc)}</td>
          <td style="padding:6px 10px;text-align:right;font-size:18px;font-weight:800;color:${c};">${udStr}</td>
        </tr>`;};const buildEtfTr=r=>{const prc=r.close_prc;const u=r.ud_rt!=null?r.ud_rt:null;const c=u==null?'var(--muted)':u>=0?'#ef4444':'#3b82f6';const udStr=u!=null?(u>=0?'+':'')+u.toFixed(2)+'%':'-';const tg=r.is_alltime?'🏆 ':(r.is_uplimit?'🚨 ':'');const nm_esc=r.itm_nm.replace(/'/g,"&#39;");return`<tr style="cursor:pointer;border-bottom:1px solid var(--border);"
            onmouseover="this.style.background='var(--card2)'" onmouseout="this.style.background=''"
            onclick="openKrStock('${r.itm_cd}','${nm_esc}')">
          <td style="padding:6px 10px;font-size:17px;font-weight:600;word-break:keep-all;">${tg}${r.itm_nm}</td>
          <td style="padding:6px 10px;font-size:14px;color:var(--muted);">${r.sector||'-'}</td>
          <td style="padding:6px 10px;text-align:right;font-size:17px;font-weight:700;">${fmt(prc)}</td>
          <td style="padding:6px 10px;text-align:right;font-size:17px;font-weight:800;color:${c};">${udStr}</td>
        </tr>`;};const thead=cols=>`<thead><tr>${cols.map((c,i)=>
        `<th style="padding:7px 10px;text-align:${i>1?'right':'left'};font-size:15px;color:var(--muted);border-bottom:2px solid var(--border);">${c}</th>`
      ).join('')}</tr></thead>`;const alltime=stkRows.filter(r=>r.is_alltime).length;const uplimit=stkRows.filter(r=>r.is_uplimit).length;const stkPanel=`
        <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden;">
          <div style="padding:10px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;">
            <span style="font-size:18px;font-weight:800;">📈 개별종목</span>
            <span style="font-size:15px;color:var(--muted);">${stkRows.length}개</span>
            ${alltime ? `<span style="font-size:14px;color:#f59e0b;font-weight:700;">🏆 ${alltime}</span>` : ''}
            ${uplimit ? `<span style="font-size:14px;color:#ef4444;font-weight:700;">🚨 ${uplimit}</span>` : ''}
          </div>
          <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;">
            ${thead(['종목명','섹터','현재가','등락률'])}
            <tbody>${stkRows.length ? stkRows.map(buildStkTr).join('') : `<tr><td colspan="4"style="padding:30px;text-align:center;color:var(--muted);">${_emptyMsg}</td></tr>`}</tbody>
          </table></div>
        </div>`;const etfPanel=`
        <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden;">
          <div style="padding:10px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;">
            <span style="font-size:18px;font-weight:800;">📦 ETF</span>
            <span style="font-size:15px;color:var(--muted);">${etfRows.length}개</span>
            <span style="margin-left:auto;font-size:13px;color:var(--muted);">전일 종가 기준</span>
          </div>
          <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;">
            ${thead(['ETF명','섹터','종가','등락률'])}
            <tbody>${etfRows.length ? etfRows.map(buildEtfTr).join('') : '<tr><td colspan="4" style="padding:30px;text-align:center;color:var(--muted);">데이터 없음</td></tr>'}</tbody>
          </table></div>
        </div>`;const nxtBanner=hasNxt?(()=>{const nxtAll=[...nxtStkRows,...nxtEtfRows];const nxtItems=nxtAll.map(r=>{const live=_getPrice(r.itm_cd);const prc=(live&&live.curr_prc)||r.close_prc;const rawU=live?live.ud_rt:r.ud_rt;const u=rawU!=null?rawU:null;const c=u==null?'var(--muted)':u>=0?'#ef4444':'#3b82f6';const udStr=u!=null?(u>=0?'+':'')+u.toFixed(2)+'%':'-';const tg=r.is_alltime?'🏆 ':(r.is_uplimit?'🚨 ':'');const nm_esc=r.itm_nm.replace(/'/g,"&#39;");return`<tr style="cursor:pointer;"
              onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background=''"
              onclick="openKrStock('${r.itm_cd}','${nm_esc}')">
            <td style="padding:5px 10px;font-size:15px;font-weight:700;">${tg}${r.itm_nm}</td>
            <td style="padding:5px 10px;font-size:13px;color:var(--muted);">${r.sector||'-'}</td>
            <td style="padding:5px 10px;text-align:right;font-size:15px;font-weight:700;">${fmt(prc)}</td>
            <td style="padding:5px 10px;text-align:right;font-size:15px;font-weight:800;color:${c};">${udStr}</td>
          </tr>`;}).join('');return`<div style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.35);border-radius:10px;overflow:hidden;margin-bottom:12px;">
          <div style="padding:8px 14px;border-bottom:1px solid rgba(251,191,36,0.25);display:flex;align-items:center;gap:8px;">
            <span style="font-size:16px;font-weight:800;color:#fbbf24;">⚡ NXT 프리마켓 신고가</span>
            <span style="font-size:13px;color:rgba(251,191,36,0.8);">${nxtAll.length}개</span>
            <span style="margin-left:auto;font-size:12px;color:rgba(251,191,36,0.7);">장 시작 전 · NXT 거래소</span>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tbody>${nxtItems}</tbody>
          </table>
        </div>`;})():'';el.innerHTML=`<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
          <span style="font-size:20px;font-weight:800;">📈 오늘 장중 신고가</span>
          <span style="font-size:15px;color:var(--muted);">${_isToday ? fmtD(stkData.trd_ymd) : fmtD(_kstYmd)} 기준</span>
          <span style="margin-left:auto;font-size:13px;color:#22c55e;background:rgba(34,197,94,0.1);padding:3px 10px;border-radius:6px;border:1px solid rgba(34,197,94,0.3);">🟢 장중</span>
        </div>
        ${nxtBanner}
        <div class="kr-nh-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          ${stkPanel}
          ${etfPanel}
        </div>`;try{const prevHtml=await _buildPrevDayFullView();if(prevHtml){el.innerHTML+=`<div style="margin-top:28px;padding-top:20px;border-top:2px solid var(--border);">
              <div style="font-size:18px;font-weight:800;color:var(--muted);margin-bottom:14px;">📋 전일 신고가 정리</div>
              ${prevHtml}
            </div>`;}}catch(e){console.warn('전일 신고가 정리 로드 실패',e);}}catch(e){el.innerHTML=`<div style="color:#f87171;padding:20px;">데이터 로드 실패: ${e.message}</div>`;}
return;}
el.innerHTML=`<div style="color:var(--muted);font-size: 19.5px;">로딩 중...</div>`;try{const _etfWithFallback=async()=>{const d=await fetch('/moneyweb/api/new_high_etf.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]}));if((d.rows||[]).length)return d;return fetch('/moneyweb/api/new_high_etf_52w.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]}));};const[r1,r2,r3,r4,stkData,etfData]=await Promise.all([fetch('/moneyweb/api/new_high_52w_kospi.json?t='+Date.now()).then(r=>r.json()),fetch('/moneyweb/api/new_high_52w_kosdaq.json?t='+Date.now()).then(r=>r.json()),fetch('/moneyweb/api/new_high_alltime_kospi.json?t='+Date.now()).then(r=>r.json()),fetch('/moneyweb/api/new_high_alltime_kosdaq.json?t='+Date.now()).then(r=>r.json()),fetch('/moneyweb/api/new_high_stocks.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]})),_etfWithFallback(),]);const fmt=n=>n?Number(n).toLocaleString('ko-KR'):'-';const fmtD=d=>d?`${d.slice(0,4)}.${d.slice(4,6)}.${d.slice(6,8)}`:'';const stkRows=stkData.rows||[];const etfRows=etfData.rows||[];let summaryHtml='';if(stkRows.length||etfRows.length){const alltime=stkRows.filter(r=>r.is_alltime).length;const uplimit=stkRows.filter(r=>r.is_uplimit).length;const stkSctr={};stkRows.forEach(r=>{const s=r.sector||'미분류';stkSctr[s]=(stkSctr[s]||0)+1;});const stkSctrSorted=Object.entries(stkSctr).sort((a,b)=>b[1]-a[1]);const etfSctr={};etfRows.forEach(r=>{const s=r.sector||'기타 ETF';etfSctr[s]=(etfSctr[s]||0)+1;});const etfSctrSorted=Object.entries(etfSctr).sort((a,b)=>b[1]-a[1]);const sctrPill=([nm,cnt])=>'<div style="display:flex;align-items:center;justify-content:space-between;padding:2px 6px;margin-bottom:2px;border-radius:4px;background:var(--card2);">'
+'<span class="kr-nh-sname" style="font-size: 16.5px;color:var(--text);">▣ '+nm+'</span>'
+'<span style="font-size: 16.5px;font-weight:700;color:#f59e0b;margin-left:8px;flex-shrink:0;">'+cnt+'</span>'
+'</div>';const detailRows=stkRows.filter(r=>(r.sector||'미분류')!=='미분류');const detailSctr={};detailRows.forEach(r=>{const s=r.sector||'미분류';if(!detailSctr[s])detailSctr[s]=[];detailSctr[s].push(r);});const detailSorted=Object.entries(detailSctr).sort((a,b)=>b[1].length-a[1].length);const buildStkCard=(sctr,items)=>{const trs=items.map(r=>{const u=r.ud_rt||0;const c=u>=0?'#ef4444':'#3b82f6';const sg=u>=0?'+':'';const tg=r.is_alltime?'🏆 ':(r.is_uplimit?'🚨 ':'');const udStr=u!==0?sg+u.toFixed(2)+'%':'-';return'<tr style="cursor:pointer;"'
+' onmouseover="this.style.background=\'var(--card2)\'" onmouseout="this.style.background=\'\'"'
+' onclick="openKrStock(\''+r.itm_cd+'\',\''+r.itm_nm.replace(/'/g,"&#39;")+'\')">'
+'<td style="padding:3px 8px;font-size: 18px;font-weight:600;white-space:nowrap;">'+tg+r.itm_nm+'</td>'
+'<td style="padding:3px 4px;text-align:right;font-size: 18px;font-weight:700;white-space:nowrap;">'+fmt(r.close_prc)+'</td>'
+'<td style="padding:3px 8px 3px 4px;text-align:right;font-size: 18px;font-weight:800;color:'+c+';white-space:nowrap;">'+udStr+'</td>'
+'</tr>';}).join('');return'<div style="border:1px solid var(--border);border-radius:8px;overflow:hidden;margin-bottom:8px;display:inline-block;min-width:0;">'
+'<div style="padding:4px 8px;background:var(--card2);font-size: 16.5px;font-weight:700;border-bottom:1px solid var(--border);">▣ '+sctr
+' <span style="color:var(--muted);font-weight:400;">('+items.length+')</span></div>'
+'<table style="border-collapse:collapse;"><tbody>'+trs+'</tbody></table></div>';};const detailCards=detailSorted.map(([s,it])=>buildStkCard(s,it)).join('');summaryHtml='<div class="kr-nh-grid" style="display:grid;grid-template-columns:160px 160px 1fr;gap:12px;margin-bottom:16px;align-items:start;">'
+'<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px;">'
+'<div style="font-size: 17.2px;font-weight:800;margin-bottom:6px;">신고가 섹터</div>'
+'<div style="font-size: 16.5px;color:#ef4444;font-weight:700;margin-bottom:6px;">📈 개별종목 '+stkRows.length+'개'
+(alltime?'&nbsp;<span style="color:#f59e0b;">🏆 '+alltime+'</span>':'')
+(uplimit?'&nbsp;<span style="color:#ef4444;">🚨 '+uplimit+'</span>':'')
+'</div>'
+stkSctrSorted.map(sctrPill).join('')
+'</div>'
+'<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px;">'
+'<div style="font-size: 16.5px;color:#ef4444;font-weight:700;margin-bottom:6px;">📦 ETF '+etfRows.length+'개</div>'
+etfSctrSorted.map(sctrPill).join('')
+'</div>'
+'<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:start;">'
+detailCards
+'</div>'
+'</div>';}
const rowHtml=r=>{const cl=r.UD_RT>=0?'#ef4444':'#3b82f6';const sign=r.UD_RT>=0?'+':'';return`<tr style="border-bottom:1px solid var(--border);cursor:pointer;transition:background .1s;"
          onmouseover="this.style.background='var(--card2)'" onmouseout="this.style.background=''"
          onclick="openKrStock('${r.ITM_CD}','${r.ITM_NM}')">
        <td style="padding:7px 10px;font-size: 19.5px;font-weight:700;">${r.ITM_NM}</td>
        <td style="padding:7px 10px;font-size: 16.5px;color:var(--muted);">${r.ITM_CD}</td>
        <td style="padding:7px 10px;font-size: 16.5px;color:var(--muted);">${r.SCTR_NM||'-'}</td>
        <td style="padding:7px 10px;text-align:right;font-size: 19.5px;font-weight:700;">${fmt(r.EPRC)}</td>
        <td style="padding:7px 10px;text-align:right;font-size: 19.5px;font-weight:800;color:${cl};">${sign+(r.UD_RT||0).toFixed(2)+'%'}</td>
        <td style="padding:7px 10px;text-align:right;font-size: 18px;color:#f59e0b;font-weight:700;">${fmt(r.HPRC||r.W52_HPRC||r.ALLTIME_HPRC)}</td>
      </tr>`;};const thead=`<thead><tr>${['종목명','코드','섹터','종가','등락률','장중신고가'].map((c,i)=>
      `<th style="padding:8px 10px;text-align:${i>2?'right':'left'};font-size: 16.5px;color:var(--muted);border-bottom:2px solid var(--border);">${c}</th>`
    ).join('')}</tr></thead>`;const section=(title,rows,date)=>rows.length?`
      <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-bottom:16px;">
        <div style="padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;">
          <span style="font-size: 19.5px;font-weight:700;color:#ef4444;">${title}</span>
          <span style="font-size: 16.5px;color:var(--muted);">${fmtD(date)} 기준 ${rows.length}개</span>
        </div>
        <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;">${thead}<tbody>${rows.map(rowHtml).join('')}</tbody></table></div>
      </div>`:'';el.innerHTML=summaryHtml+`
      <h3 style="font-size: 22.5px;font-weight:800;margin-bottom:16px;">📈 종목 신고가</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div>
          ${section('KOSPI 역사적 신고가', r3.rows||[], r3.trd_ymd)}
          ${section('KOSPI 52주 신고가', r1.rows||[], r1.trd_ymd)}
        </div>
        <div>
          ${section('KOSDAQ 역사적 신고가', r4.rows||[], r4.trd_ymd)}
          ${section('KOSDAQ 52주 신고가', r2.rows||[], r2.trd_ymd)}
        </div>
      </div>`;}catch(e){el.innerHTML=`<div style="color:#f87171;padding:20px;">데이터 로드 실패: ${e.message}</div>`;}}
function _rkFmt(n){return(n!=null&&n!=='')?Number(n).toLocaleString('ko-KR'):'-';}
function _rkKrw(n){n=Number(n)||0;if(n>=1e12)return(n/1e12).toFixed(n>=1e13?0:1)+'조';if(n>=1e8)return Math.round(n/1e8).toLocaleString('ko-KR')+'억';return _rkFmt(n);}
function _rkUd(u){if(u==null)return{c:'var(--muted)',s:'-'};const c=u>0?'#ef4444':(u<0?'#3b82f6':'var(--muted)');return{c,s:(u>0?'+':'')+Number(u).toFixed(2)+'%'};}
function _rkTime(t){return t?String(t).slice(11,16):'';}
function _rkTopSectors(rows,n){n=n||3;const cnt={};(rows||[]).forEach(r=>{const x=r.sector;if(x&&x!=='미분류')cnt[x]=(cnt[x]||0)+1;});return Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,n);}
function _rkSecLine(rows){const t=_rkTopSectors(rows,3);if(!t.length)return'';return'<div style="font-size:11.5px;color:var(--muted);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">🏷️ '
+t.map(([x,c])=>x+' <b style="color:#f59e0b;font-weight:700;">'+c+'</b>').join(' · ')+'</div>';}
let _rankValMode='value';function setRankValMode(m){_rankValMode=m;renderRankCombined();}
async function renderRankCombined(){const el=document.getElementById('newhigh-content');el.innerHTML='<div style="color:var(--muted);font-size:19.5px;">로딩 중...</div>';try{const[ks,kq,valD,turnD,etfD]=await Promise.all([fetch('/moneyweb/api/rank_change_kospi.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]})),fetch('/moneyweb/api/rank_change_kosdaq.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]})),fetch('/moneyweb/api/rank_value.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]})),fetch('/moneyweb/api/rank_turnover.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]})),fetch('/moneyweb/api/rank_value_etf.json?t='+Date.now()).then(r=>r.json()).catch(()=>({rows:[]})),]);const chgRow=(r,i)=>{const live=_getPrice(r.itm_cd);const prc=(live&&live.curr_prc)||r.curr_prc;const u=live&&live.ud_rt!=null?live.ud_rt:r.ud_rt;const ud=_rkUd(u);const nm_esc=(r.itm_nm||'').replace(/'/g,"&#39;");return`<tr style="cursor:pointer;border-bottom:1px solid var(--border);"
          onmouseover="this.style.background='var(--card2)'" onmouseout="this.style.background=''"
          onclick="openKrStock('${r.itm_cd}','${nm_esc}')">
        <td style="padding:5px 4px 5px 8px;text-align:right;font-size:13px;color:var(--muted);">${i+1}</td>
        <td style="padding:5px 12px 5px 6px;font-size:15px;font-weight:700;white-space:nowrap;">${r.itm_nm}<span style="font-size:11.5px;color:var(--muted);font-weight:400;margin-left:5px;">${r.sector||''}</span></td>
        <td style="padding:5px 8px;text-align:right;font-size:14.5px;font-weight:700;white-space:nowrap;">${_rkFmt(prc)}</td>
        <td style="padding:5px 10px 5px 6px;text-align:right;font-size:14.5px;font-weight:800;color:${ud.c};white-space:nowrap;">${ud.s}</td>
      </tr>`;};const chgCol=(title,d,accent)=>{const rows=d.rows||[];return`<div style="border:1px solid var(--border);border-radius:10px;overflow:hidden;">
        <div style="padding:7px 12px;background:var(--card2);border-bottom:1px solid var(--border);">
          <div style="font-size:15px;font-weight:800;white-space:nowrap;">${accent} ${title} <span style="color:var(--muted);font-weight:400;font-size:12.5px;">${rows.length}</span></div>
          ${_rkSecLine(rows)}
        </div>
        <table style="border-collapse:collapse;table-layout:auto;">
          <tbody>${rows.length ? rows.map(chgRow).join('') : '<tr><td colspan="4" style="padding:24px;text-align:center;color:var(--muted);">집계 중</td></tr>'}</tbody>
        </table></div>`;};const mode=_rankValMode;const isTurn=mode==='turnover';const isEtf=mode==='etf';const vd=isTurn?turnD:(isEtf?etfD:valD);const vrows=vd.rows||[];const mv=vd.market_value||{};const share=(amt,mkt)=>{const tot=mv[mkt];return(tot&&amt)?(amt/tot*100).toFixed(amt/tot>=0.1?1:2)+'%':'-';};const mkBadge=(mkt)=>{if(!mkt||mkt==='-')return'';const kospi=mkt==='KOSPI';return`<span style="font-size:11px;padding:1px 5px;border-radius:3px;font-weight:700;
        color:${kospi?'#2563eb':'#059669'};background:${kospi?'rgba(37,99,235,.12)':'rgba(5,150,105,.12)'};">${mkt}</span>`;};const secTxt=(s)=>(s&&s!=='미분류')?s:'';const valRow=(r,i)=>{const live=_getPrice(r.itm_cd);const prc=(live&&live.curr_prc)||r.curr_prc;const u=live&&live.ud_rt!=null?live.ud_rt:r.ud_rt;const ud=_rkUd(u);const nm_esc=(r.itm_nm||'').replace(/'/g,"&#39;");const metric=isTurn?(r.turnover!=null?Number(r.turnover).toFixed(2)+'%':'-'):_rkKrw(r.trd_amt);const sub=isTurn?_rkKrw(r.trd_amt):(isEtf?_rkKrw(r.mktcap):share(r.trd_amt,r.market));return`<tr style="cursor:pointer;border-bottom:1px solid var(--border);"
          onmouseover="this.style.background='var(--card2)'" onmouseout="this.style.background=''"
          onclick="openKrStock('${r.itm_cd}','${nm_esc}')">
        <td style="padding:5px 4px 5px 8px;text-align:right;font-size:13px;color:var(--muted);">${i+1}</td>
        <td style="padding:5px 8px;font-size:15px;font-weight:700;white-space:nowrap;">${r.itm_nm} ${mkBadge(r.market)}<span style="font-size:11.5px;color:var(--muted);font-weight:400;margin-left:5px;">${secTxt(r.sector)}</span></td>
        <td style="padding:5px 8px;text-align:right;font-size:14px;font-weight:700;white-space:nowrap;">${_rkFmt(prc)}</td>
        <td style="padding:5px 8px;text-align:right;font-size:14px;font-weight:800;color:${ud.c};white-space:nowrap;">${ud.s}</td>
        <td style="padding:5px 10px 5px 8px;text-align:right;font-size:15px;font-weight:800;color:#f59e0b;white-space:nowrap;">${metric}</td>
        <td style="padding:5px 10px 5px 4px;text-align:right;font-size:13px;color:var(--muted);white-space:nowrap;">${sub}</td>
      </tr>`;};const tabBtn=(m,label)=>{const on=mode===m;return`<div onclick="setRankValMode('${m}')" style="cursor:pointer;padding:4px 11px;border-radius:7px;font-size:13.5px;font-weight:700;white-space:nowrap;
        ${on?'background:#f59e0b;color:#111;':'background:var(--card2);color:var(--muted);border:1px solid var(--border);'}">${label}</div>`;};const metricHead=isTurn?'회전율':'거래대금';const subHead=isTurn?'거래대금':(isEtf?'시총':'비중');const mvLine=(mv.KOSPI||mv.KOSDAQ)?`<div style="font-size:12.5px;color:var(--muted);margin-top:3px;">오늘 전체 거래대금 · 코스피 <b style="color:var(--text);">${mv.KOSPI?_rkKrw(mv.KOSPI):'-'}</b> · 코스닥 <b style="color:var(--text);">${mv.KOSDAQ?_rkKrw(mv.KOSDAQ):'-'}</b></div>`:'';const valCol=`<div style="border:1px solid var(--border);border-radius:10px;overflow:hidden;">
        <div style="padding:7px 12px;background:var(--card2);border-bottom:1px solid var(--border);">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span style="font-size:15px;font-weight:800;white-space:nowrap;">💰 거래대금 상위</span>
            ${tabBtn('value','거래대금')}${tabBtn('turnover','시총대비')}${tabBtn('etf','ETF')}
          </div>
          ${mvLine}
          ${_rkSecLine(vrows)}
        </div>
        <table style="border-collapse:collapse;width:100%;table-layout:auto;">
          <thead><tr style="background:var(--card2);">
            <th style="padding:6px 4px 6px 8px;text-align:right;font-size:12px;color:var(--muted);border-bottom:2px solid var(--border);">#</th>
            <th style="padding:6px 8px;text-align:left;font-size:12px;color:var(--muted);border-bottom:2px solid var(--border);">종목</th>
            <th style="padding:6px 8px;text-align:right;font-size:12px;color:var(--muted);border-bottom:2px solid var(--border);">현재가</th>
            <th style="padding:6px 8px;text-align:right;font-size:12px;color:var(--muted);border-bottom:2px solid var(--border);">등락률</th>
            <th style="padding:6px 10px 6px 8px;text-align:right;font-size:12px;color:#f59e0b;font-weight:800;border-bottom:2px solid var(--border);">${metricHead}</th>
            <th style="padding:6px 10px 6px 4px;text-align:right;font-size:12px;color:var(--muted);border-bottom:2px solid var(--border);">${subHead}</th>
          </tr></thead>
          <tbody>${vrows.length ? vrows.map(valRow).join('') : '<tr><td colspan="6" style="padding:30px;text-align:center;color:var(--muted);">집계 중</td></tr>'}</tbody>
        </table></div>`;const upd=ks.updated_at||kq.updated_at||vd.updated_at;el.innerHTML=`<div style="font-size:21px;font-weight:800;margin-bottom:4px;">🔥 등락률·거래대금 상위</div>
       <div style="font-size:13.5px;color:var(--muted);margin-bottom:12px;">코스피·코스닥 상승률 + 거래대금 상위 (ETF 제외)${upd?' · '+_rkTime(upd)+' 기준':''}</div>
       <div style="display:grid;grid-template-columns:max-content max-content minmax(360px,1fr);gap:14px;align-items:start;">
         ${chgCol('코스피', ks, '📈')}
         ${chgCol('코스닥', kq, '📊')}
         ${valCol}
       </div>`;}catch(e){el.innerHTML=`<div style="color:#f87171;padding:20px;">데이터 로드 실패: ${e.message}</div>`;}}
function _injectKrPopup(frame){try{const iDoc=frame.contentDocument||frame.contentWindow.document;if(!iDoc||!iDoc.body)return;frame.contentWindow.openPopup=function(cd){window.parent.openKrStock(cd);};iDoc.querySelectorAll('a[href*="tradingview.com"]').forEach(a=>{const m=a.href.match(/KRX(?::|%3A)(\d{6})/i);if(!m)return;const cd=m[1];const nm=a.textContent.trim();a.removeAttribute('target');a.addEventListener('click',e=>{e.preventDefault();window.parent.openKrStock(cd,nm);});a.style.setProperty('cursor','pointer','important');});}catch(e){console.warn('iframe KR팝업 주입 실패',e);}}
function _injectPeerPopup(frame){try{frame.contentWindow.glPopup=function(tk){window.parent.glPopup(tk);};}catch(e){console.warn('peer 해외팝업 주입 실패',e);}}
function loadCurrentTab(){if(!TAB_KEY[currentTab])return;const w=document.getElementById('wrap-'+currentTab);if(w)w.style.display='block';loadFrame(currentTab);}
async function loadHomeSummary(){if(!BINDEX||Object.keys(BINDEX).length===0)return;const usList=BINDEX['us-morning'];if(usList&&usList.length>0){document.getElementById('home-us-date').textContent=usList[0].label;loadUSCard(usList[0].src);}
const krList=BINDEX['kr-morning'];if(krList&&krList.length>0){document.getElementById('home-kr-date').textContent=krList[0].label;loadKRCard(krList[0].src);}
const rpList=BINDEX['report'];if(rpList&&rpList.length>0){document.getElementById('home-rp-date').textContent=rpList[0].label;loadReportCard(rpList[0].src);}
loadHomeSchedule();loadThemeToday();loadNewHighSection();loadDrBinance();}
let DR_HIST=null;function _drChip(p){if(p==null)return'<b style="color:#94a3b8">—</b>';const clr=p>0?'#ef4444':p<0?'#3b82f6':'#94a3b8';return`<b style="color:${clr}">${p > 0 ? '+' : ''}${p.toFixed(2)}%</b>`;}
function _drLiveLabel(status){if(status==='KRX')return'실시간';if(status==='NXT_PRE'||status==='NXT_EVE')return'NXT';return'NXT마감';}
function _drSparkFor(key){if(!DR_HIST||!DR_HIST.points)return'';const arr=DR_HIST.points[key];const base=(DR_HIST.base||{})[key];if(!arr||arr.length<2)return'';return _sparkSvg(arr,base,'dr_'+key);}
function _drSrcRow(label,sub,o,sparkKey,liveLbl,clickUrl,clickTitle){if(!o||o.krw==null){return`<div class="dr-srow"><div class="dr-src">${label}<span>${sub}</span></div>`
+`<div class="dr-vals"><span class="dr-na">시세 없음</span></div></div>`;}
const raw=o.price!=null?`${o.price.toLocaleString('en-US', {maximumFractionDigits: 2})} ${o.ccy}`:'';const linkable=!!clickUrl;const cls=linkable?'dr-srow dr-link':'dr-srow';const onclk=linkable?` onclick="window.open('${clickUrl}','_blank')" title="${clickTitle || ''}"`:'';const go=linkable?'<span class="dr-go">↗</span>':'';return`<div class="${cls}"${onclk}>
    <div class="dr-src">${label}${go}<span>${sub}</span></div>
    <div class="dr-vals">
      <span class="dr-krw">${Math.round(o.krw).toLocaleString('ko-KR')}원</span><span class="dr-raw">${raw}</span>
      <div class="dr-prems"><span class="dr-prem-lbl">정규장 </span>${_drChip(o.prem_close)}<span class="dr-prem-lbl">${liveLbl} </span>${_drChip(o.prem_live)}</div>
    </div>
    <div class="dr-spark">${_drSparkFor(sparkKey)}</div>
  </div>`;}
function renderDrCard(s,liveLbl){const el=document.getElementById('dr-card-'+s.code);if(!el)return;const lp=(window._getPrice&&_getPrice(s.code))||null;const krx=(lp&&lp.curr_prc)?lp.curr_prc:s.krx_live;const chg=(lp&&lp.ud_rt!=null)?lp.ud_rt:s.krx_live_chg;const krxEl=el.querySelector('.dr-krx');if(krxEl){let h=krx?Math.round(krx).toLocaleString('ko-KR')+'원':'—';if(chg!=null){const c=chg,clr=c>0?'#ef4444':c<0?'#3b82f6':'#94a3b8',arr=c>0?'▲':c<0?'▼':'';h+=`<small style="color:${clr}">${arr}${Math.abs(c).toFixed(2)}%</small>`;}
krxEl.innerHTML=h;}
const body=el.querySelector('.dr-body');if(body){const binSym=(s.binance&&s.binance.symbol)||'';const binUrl=binSym?`https://www.binance.com/en/futures/${binSym}`:'';const tvSym=(s.gdr&&s.gdr.tv)||'';const tvUrl=tvSym?`https://www.tradingview.com/chart/?symbol=${encodeURIComponent(tvSym)}`:'';body.innerHTML=_drSrcRow('바이낸스','선물',s.binance,s.code+'_bin',liveLbl,binUrl,'바이낸스 선물 차트 열기')
+_drSrcRow('GDR',(s.gdr&&s.gdr.ticker)||'',s.gdr,s.code+'_gdr',liveLbl,tvUrl,'트레이딩뷰 차트 열기');}}
async function loadDrBinance(){try{const[r1,r2]=await Promise.all([fetch('/moneyweb/api/dr_binance.json?t='+Date.now()),fetch('/moneyweb/api/dr_binance_history.json?t='+Date.now()),]);if(!r1.ok)return;const data=await r1.json();DR_HIST=r2.ok?await r2.json():null;const liveLbl=_drLiveLabel(data.market_status);(data.stocks||[]).forEach(s=>renderDrCard(s,liveLbl));}catch(e){}}
async function loadUSCard(src){const body=document.getElementById('home-us-body');try{const res=await fetch(src);const html=await res.text();let issues=[];let stocks=[];const dm=html.match(/const\s+DATA\s*=\s*(\{[\s\S]*?\})\s*;/);if(dm){try{const DATA=JSON.parse(dm[1]);issues=(DATA.issues||[]).slice(0,3).map(it=>(it.title||'').trim()).filter(Boolean);stocks=(DATA.movers_up||[]).slice(0,3).map(s=>({name:(s.name||'').trim(),pct:(s.pct||'').trim()})).filter(s=>s.name);}catch(e){}}
if(issues.length===0&&stocks.length===0){const doc=new DOMParser().parseFromString(html,'text/html');issues=Array.from(doc.querySelectorAll('.issue-title')).slice(0,3).map(el=>el.textContent.trim());const upRows=doc.querySelectorAll('.mover-row.up-row');for(let i=0;i<Math.min(3,upRows.length);i++){const nm=upRows[i].querySelector('.m-name');const pct=upRows[i].querySelector('.m-pct');if(nm&&pct){const nameText=(nm.firstChild&&nm.firstChild.nodeType===3)?nm.firstChild.textContent.trim():nm.textContent.trim();stocks.push({name:nameText,pct:pct.textContent.trim()});}}}
let out='';if(issues.length>0){issues.forEach((t,i)=>{out+=`<div class="brief-issue-row"><span class="issue-num">${i+1}</span><span class="brief-issue">${t}</span></div>`;});}
if(stocks.length>0){out+='<div class="stocks-inline">';stocks.forEach((s,i)=>{if(i>0)out+='<span class="stock-chip-sep">|</span>';out+=`<span class="stock-chip"><span class="stock-chip-name">${s.name}</span><span class="brief-stock-pct up" style="font-size: 15.8px;">${s.pct}</span></span>`;});out+='</div>';}
body.innerHTML=out||'<div style="color:var(--muted);font-size: 18px;">데이터 없음</div>';}catch(e){body.innerHTML='<div style="color:var(--muted);font-size: 18px;">로드 실패</div>';}}
async function loadKRCard(src){const body=document.getElementById('home-kr-body');try{const res=await fetch(src);const html=await res.text();const doc=new DOMParser().parseFromString(html,'text/html');let out='';const cards=Array.from(doc.querySelectorAll('.ncard'));if(cards.length>0){const headOf=c=>{const h=c.querySelector('.nhead');return h?h.textContent.trim():'';};const kickOf=c=>{const k=c.querySelector('.nkick');return k?k.textContent.trim():'';};const stockOf=c=>{const p=c.querySelector('[onclick*="openPopup"]');if(!p)return null;const m=(p.getAttribute('onclick')||'').match(/openPopup\('([^']*)','([^']*)'\)/);if(m)return{code:m[1],name:m[2]};const t=p.textContent.trim();return t?{code:'',name:t}:null;};const firstHead=headOf(cards[0]);if(firstHead){const k=kickOf(cards[0]);out+=`<div class="brief-issue">${k ? k + ': ' : ''}${firstHead}</div>`;}
out+='<div class="brief-stocks">';let n=0;for(let i=1;i<cards.length&&n<3;i++){const st=stockOf(cards[i]);if(!st)continue;const hd=headOf(cards[i]);const safeNm=st.name.replace(/'/g,"\\'");const click=st.code?`openKrStock('${st.code}','${safeNm}')`:`openKrStockByName('${safeNm}')`;out+=`<div class="brief-stock-row"><span class="brief-stock-name kr-stock" style="flex-shrink:0;" onclick="${click};event.stopPropagation();">${st.name}</span>${hd ? `<span style="font-size:16.5px;color:var(--text);font-weight:600;flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-left:8px;">${hd}</span>` : ''}</div>`;n++;}
out+='</div>';}
if(!out){const sumRows=doc.querySelectorAll('.sum-row');if(sumRows.length>0){const firstTag=sumRows[0].querySelector('.sum-tag');const firstDesc=sumRows[0].querySelector('.sum-desc');const title=firstTag?firstTag.textContent.trim():'';const desc=firstDesc?firstDesc.textContent.trim():'';if(title||desc)out+=`<div class="brief-issue">${title}${title && desc ? ': ' : ''}${desc}</div>`;out+='<div class="brief-stocks">';for(let i=1;i<Math.min(4,sumRows.length);i++){const tag=sumRows[i].querySelector('.sum-tag');const d=sumRows[i].querySelector('.sum-desc');if(tag){const nm=tag.textContent.trim();const newsText=d?d.textContent.trim():'';out+=`<div class="brief-stock-row"><span class="brief-stock-name kr-stock" style="flex-shrink:0;" onclick="openKrStockByName('${nm}');event.stopPropagation();">${nm}</span>${newsText ? `<span style="font-size:16.5px;color:var(--text);font-weight:600;flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-left:8px;">${newsText}</span>` : ''}</div>`;}}
out+='</div>';}}
body.innerHTML=out||'<div style="color:var(--muted);font-size: 18px;">데이터 없음</div>';}catch(e){body.innerHTML='<div style="color:var(--muted);font-size: 18px;">로드 실패</div>';}}
async function loadReportCard(src){const body=document.getElementById('home-rp-body');try{const res=await fetch(src);const html=await res.text();const doc=new DOMParser().parseFromString(html,'text/html');const rows=doc.querySelectorAll('tbody tr');const items=[];for(let i=0;i<Math.min(3,rows.length);i++){const nameEl=rows[i].querySelector('td:nth-child(2) a')||rows[i].querySelector('td:nth-child(2)');const titleEl=rows[i].querySelector('td:nth-child(3)');if(nameEl&&titleEl)items.push({name:nameEl.textContent.trim(),title:titleEl.textContent.trim()});}
if(items.length===0){body.innerHTML='<div style="color:var(--muted);font-size: 18px;">데이터 없음</div>';return;}
let out='<div class="brief-stocks">';items.forEach(item=>{out+=`<div class="brief-stock-row">
        <span class="brief-stock-name kr-stock" onclick="openKrStockByName('${item.name}');event.stopPropagation();">${item.name}</span>
        <span style="font-size: 15px;color:var(--muted);flex:1;text-align:right;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:58%;">${item.title}</span>
      </div>`;});out+='</div>';body.innerHTML=out;}catch(e){body.innerHTML='<div style="color:var(--muted);font-size: 18px;">로드 실패</div>';}}
async function loadHomeSchedule(){const el=document.getElementById('home-schedule');const dateEl=document.getElementById('date-schedule');try{const doc=await ensureEveningDoc();const todayStr=`${TODAY.getMonth()+1}/${TODAY.getDate()}`;const rows=doc?extractTodayEvents(doc,todayStr):[];const evList=BINDEX['us-evening'];if(dateEl&&evList&&evList.length)dateEl.textContent=evList[0].label;if(!rows.length){el.innerHTML='<div style="color:var(--muted);font-size:18px;padding:8px 0;">오늘 예정 일정 없음</div>';return;}
const sorted=rows.sort((a,b)=>{const o={HIGH:0,MID:1,LOW:2};return(o[a.imp]??3)-(o[b.imp]??3);});const badgeCls=(imp)=>imp==='HIGH'?'badge-high':imp==='MID'?'badge-med':'badge-low';let out='';sorted.slice(0,3).forEach(r=>{out+=`<div class="sch-row" onclick="switchTab('schedule',document.querySelector('[data-tab=schedule]'))">
        <span class="sch-time">${r.time || ''}</span>
        <span class="sch-title">${r.name}</span>
        ${r.imp ? `<span class="sch-badge ${badgeCls(r.imp)}">${r.imp}</span>` : ''}
      </div>`;});el.innerHTML=out;}catch(e){el.innerHTML='<div style="color:var(--muted);font-size:18px;padding:8px 0;">로드 실패</div>';}}
async function loadThemeToday(){const el=document.getElementById('home-theme');const dateEl=document.getElementById('date-theme');try{const res=await fetch('/moneyweb/api/theme_today.json?t='+Date.now());const d=await res.json();if(dateEl&&d.updated_at){const m=String(d.updated_at).match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/);dateEl.textContent=m?`${m[2]}.${m[3]} ${m[4]}:${m[5]}`:'';}
const pill=(t)=>{const up=(t.chg||0)>=0;const c=up?'#ef4444':'#3b82f6';const s=(up?'+':'')+Number(t.chg).toFixed(2)+'%';const bg=up?'rgba(239,68,68,0.12)':'rgba(59,130,246,0.12)';const nmAttr=String(t.name).replace(/&/g,'&amp;').replace(/"/g,'&quot;');return`<span class="theme-pill" data-theme="${nmAttr}" onclick="openThemeBubble(this,event)" title="${nmAttr} 버블 보기" style="cursor:pointer;background:${bg};">${t.name} <b style="color:${c}">${s}</b></span>`;};let out='';if(d.up&&d.up.length){out+=`<div class="theme-section"><div class="theme-period"><span style="color:#ef4444;">▲ 상승 테마</span></div>`
+`<div class="theme-pills">${d.up.map(pill).join('')}</div></div>`;}
if(d.down&&d.down.length){out+=`<div class="theme-section"><div class="theme-period"><span style="color:#3b82f6;">▼ 하락 테마</span></div>`
+`<div class="theme-pills">${d.down.map(pill).join('')}</div></div>`;}
el.innerHTML=out||'<div style="color:var(--muted);font-size:18px;">데이터 없음</div>';}catch(e){el.innerHTML='<div style="color:var(--muted);font-size:18px;">로드 실패</div>';}}
var _pendingThemeFocus=null;function openThemeBubble(el,ev){if(ev)ev.stopPropagation();const name=(el&&el.dataset)?el.dataset.theme:null;if(!name)return;_pendingThemeFocus=name;switchTab('kr-thememap',document.querySelector('[data-tab="kr-thememap"]'));}
function _focusThemeInMap(frame,name){try{const doc=frame.contentDocument,win=frame.contentWindow;if(!doc||!win||!win.selectByNo)return false;const target=String(name).trim();let found=null;doc.querySelectorAll('#list .card[data-no]').forEach(c=>{const nm=c.querySelector('.nm');if(nm&&nm.textContent.trim()===target)found=c;});if(!found)return false;win.selectByNo(+found.dataset.no);found.scrollIntoView({block:'center'});return true;}catch(e){return false;}}
async function loadThemeSection(src){const el=document.getElementById('home-theme');try{const dm=src.match(/(\d{4})(\d{2})(\d{2})/);const dateLabel=dm?`${dm[2]}.${dm[3]}`:'';const res=await fetch(src);const html=await res.text();const doc=new DOMParser().parseFromString(html,'text/html');const sections=[{id:'sec-am',label:'오전',time:'11:50'},{id:'sec-pm',label:'오후',time:'14:50'},{id:'sec-close',label:'마감',time:'18:00'},];let out='';sections.forEach(({id,label,time})=>{const sec=doc.getElementById(id);if(!sec)return;const upCol=sec.querySelectorAll('.theme-col')[0];if(!upCol)return;const pills=upCol.querySelectorAll('.pills-wrap span');if(pills.length===0)return;out+=`<div class="theme-section">
        <div class="theme-period">
          <span style="color:var(--text);">${label}</span>
          <span class="theme-date-tag">${dateLabel} ${time}</span>
        </div>
        <div class="theme-pills">`;Array.from(pills).slice(0,5).forEach(p=>{out+=`<span class="theme-pill pill-up">${p.textContent.trim()}</span>`;});out+=`</div></div>`;});el.innerHTML=out||'<div style="color:var(--muted);font-size: 18px;">데이터 없음</div>';}catch(e){el.innerHTML='<div style="color:var(--muted);font-size: 18px;">로드 실패</div>';}}
async function loadNewHighSection(){const el=document.getElementById('home-newhigh');const dateEl=document.getElementById('date-newhigh');try{const res=await fetch('/moneyweb/api/new_high_stocks.json?t='+Date.now());const data=await res.json();const rows=data.rows||[];if(dateEl&&data.trd_ymd&&String(data.trd_ymd).length===8){const t=String(data.trd_ymd);dateEl.textContent=`${t.slice(4,6)}.${t.slice(6,8)}`;}
if(rows.length===0){el.innerHTML='<div style="color:var(--muted);font-size: 18px;">데이터 없음</div>';return;}
let out='';rows.slice(0,3).forEach(row=>{const live=_getPrice(row.itm_cd);const u=live?live.ud_rt:row.ud_rt;const pct=u!=null?(u>=0?'+'+u.toFixed(2):u.toFixed(2))+'%':'';const tg=row.is_alltime?'🏆 ':(row.is_uplimit?'🚨 ':'');out+=`<div class="high-row">
        <span class="high-nm kr-stock" onclick="openKrStock('${row.itm_cd}');event.stopPropagation();">${tg}${row.itm_nm}</span>
        <span class="high-sector">${row.sector || ''}</span>
        <span class="high-pct ${u != null && u >= 0 ? 'up' : 'dn'}">${pct}</span>
      </div>`;});if(rows.length>3){out+=`<div class="more-indicator" onclick="switchTab('kr-theme',document.querySelector('[data-tab=\\'kr-theme\\']'))">···</div>`;}
el.innerHTML=out;}catch(e){el.innerHTML='<div style="color:var(--muted);font-size: 18px;">로드 실패</div>';}}
function switchSubtab(stab,el){document.querySelectorAll('.stab').forEach(t=>t.classList.remove('active'));el.classList.add('active');['all-schedule','domestic','weekly-events','earn-calendar','earn-points'].forEach(s=>{const d=document.getElementById('stab-'+s);if(d)d.style.display=(s===stab)?'block':'none';});if(stab==='all-schedule')loadAllScheduleDashboard();else if(stab==='weekly-events')loadEveningTab('주간 매크로 이벤트','stab-weekly-events');else if(stab==='earn-calendar')loadEveningTab('실적 캘린더','stab-earn-calendar');else if(stab==='earn-points')loadEveningTab('실적 포인트','stab-earn-points');}
function switchSubtabById(stabId){const el=document.querySelector(`.stab[data-stab="${stabId}"]`);if(el)switchSubtab(stabId,el);}
async function loadAllScheduleDashboard(){const el=document.getElementById('stab-all-schedule');if(!el||el.dataset.loaded==='1')return;el.innerHTML='<div class="eve-loading">로딩중...</div>';const doc=await ensureEveningDoc();const todayStr=`${TODAY.getMonth()+1}/${TODAY.getDate()}`;const weeklyRows=doc?extractTodayEvents(doc,todayStr):[];const earnRows=doc?extractTodayEarnings(doc,todayStr):[];const pointRows=doc?extractTodayEarnPoints(doc,todayStr):[];function buildSection(title,stabId,rows){let content='';if(!rows){content='<div class="sched-dash-empty">데이터 연결 예정</div>';}else if(rows.length===0){content='<div class="sched-dash-empty">오늘 해당 데이터 없음</div>';}else{content=rows.join('');}
return`<div class="sched-dash-section">
      <div class="sched-dash-hd">
        <span class="sched-dash-hd-title">${title}</span>
        <span class="sched-dash-viewall" onclick="switchSubtabById('${stabId}')">전체보기 →</span>
      </div>${content}</div>`;}
const domRows=null;const sorted=weeklyRows.sort((a,b)=>{const o={HIGH:0,MID:1,LOW:2};return(o[a.imp]??3)-(o[b.imp]??3);});const shown=sorted.slice(0,8);const remaining=sorted.length-shown.length;const evtHtml=shown.map(r=>`<div class="sched-dash-row">
      <span class="sched-dash-time">${r.time}</span>
      <span class="sched-dash-name">${r.name}</span>
      ${r.imp ? `<span class="sched-dash-badge ${r.imp.toLowerCase()}">${r.imp}</span>` : ''}
    </div>`);if(remaining>0)evtHtml.push(`<div class="sched-dash-more" onclick="switchSubtabById('weekly-events')">+ ${remaining}개 더 보기 →</div>`);const earnHtml=earnRows.map(r=>`<div class="sched-dash-row">
      <span class="sched-dash-tk">${r.ticker}</span>
      <span class="sched-dash-co">${r.company}</span>
      <span class="sched-dash-eps">${r.eps}</span>
      ${r.timing ? `<span class="sched-dash-badge ${r.timing}">${r.timing==='pre'?'장전':'장후'}</span>` : ''}
    </div>`);const pointHtml=pointRows.map(r=>`<div class="sched-dash-row multiline">
      <div class="row-top">
        <span class="sched-dash-tk">${r.ticker}</span>
        <span class="sched-dash-co">${r.company}</span>
        ${r.sector ? `<span class="sched-dash-sector">${r.sector}</span>` : ''}
        <span class="sched-dash-eps">${r.eps}</span>
        ${r.timing ? `<span class="sched-dash-badge ${r.timing}">${r.timing==='pre'?'장전':'장후'}</span>` : ''}
      </div>
      ${r.impact ? `<div class="sched-dash-impact">${r.impact}</div>` : ''}
    </div>`);el.innerHTML=`<div class="sched-dash-grid">
    ${buildSection('📅 국내 일정', 'domestic', domRows)}
    ${buildSection(`🌏 미국 주요 이벤트(${todayStr})`, 'weekly-events', evtHtml)}
    ${buildSection(`📊 실적 캘린더(${todayStr})`, 'earn-calendar', earnHtml)}
    ${buildSection(`🎯 실적 포인트(${todayStr})`, 'earn-points', pointHtml)}
  </div>`;el.dataset.loaded='1';}
function extractTodayEvents(doc,todayStr){const results=[];let slide=null;for(const s of doc.querySelectorAll('.slide')){const tag=s.querySelector('.section-tag');if(tag&&tag.textContent.includes('주간 매크로 이벤트')){slide=s;break;}}
if(!slide)return results;slide.querySelectorAll('table tr').forEach(tr=>{const firstTd=tr.querySelector('td');if(!firstTd)return;const dateEl=firstTd.querySelector('.event-date');if(!dateEl||!dateEl.textContent.includes(todayStr))return;const divs=firstTd.querySelectorAll('div');const time=divs.length>1?divs[1].textContent.trim():'';const nameEl=tr.querySelector('.event-name');const impEl=tr.querySelector('.imp-badge');if(!nameEl)return;results.push({time,name:nameEl.textContent.trim(),imp:impEl?impEl.textContent.trim():''});});return results;}
function extractTodayEarnings(doc,todayStr){const results=[];let slide=null;for(const s of doc.querySelectorAll('.slide')){const tag=s.querySelector('.section-tag');if(tag&&tag.textContent.includes('실적 캘린더')){slide=s;break;}}
if(!slide)return results;for(const col of slide.querySelectorAll('.earn-col')){const hd=col.querySelector('.earn-col-hd');if(!hd||!hd.textContent.includes(todayStr))continue;col.querySelectorAll('.earn-item').forEach(item=>{const tk=item.querySelector('.earn-tk');const co=item.querySelector('.earn-co');const eps=item.querySelector('.earn-eps');const badge=item.querySelector('.earn-badge');results.push({ticker:tk?tk.textContent.trim():'',company:co?co.textContent.trim():'',eps:eps?eps.textContent.trim():'',timing:badge?(badge.classList.contains('pre')?'pre':'post'):''});});break;}
return results;}
function extractTodayEarnPoints(doc,todayStr){const results=[];let slide=null;for(const s of doc.querySelectorAll('.slide')){const tag=s.querySelector('.section-tag');if(tag&&tag.textContent.includes('실적 포인트')){slide=s;break;}}
if(!slide)return results;for(const col of slide.querySelectorAll('.earn-col')){const hd=col.querySelector('.earn-col-hd');if(!hd||!hd.textContent.includes(todayStr))continue;col.querySelectorAll('.earn-item').forEach(item=>{const tk=item.querySelector('.earn-tk');const co=item.querySelector('.earn-co');const sector=item.querySelector('.sector-tag');const eps=item.querySelector('.earn-eps');const impact=item.querySelector('.sector-impact');const badge=item.querySelector('.earn-badge');results.push({ticker:tk?tk.textContent.trim():'',company:co?co.textContent.trim():'',sector:sector?sector.textContent.trim():'',eps:eps?eps.textContent.trim():'',timing:badge?(badge.classList.contains('pre')?'pre':'post'):'',impact:impact?impact.textContent.trim():''});});break;}
return results;}
var eveningDoc=null;async function ensureEveningDoc(){if(eveningDoc)return eveningDoc;const list=BINDEX['us-evening'];if(!list||!list.length)return null;try{const res=await fetch(list[0].src);const html=await res.text();eveningDoc=new DOMParser().parseFromString(html,'text/html');return eveningDoc;}catch(e){return null;}}
async function loadEveningTab(sectionTagText,targetElId){const el=document.getElementById(targetElId);if(!el)return;if(el.dataset.loaded==='1')return;el.innerHTML='<div class="eve-loading">로딩중...</div>';const doc=await ensureEveningDoc();if(!doc){el.innerHTML='<div class="eve-loading">US프리마켓 데이터 없음</div>';return;}
const slides=doc.querySelectorAll('.slide');let targetSlide=null;for(const slide of slides){const tag=slide.querySelector('.section-tag');if(tag&&tag.textContent.trim().includes(sectionTagText)){targetSlide=slide;break;}}
if(!targetSlide){el.innerHTML='<div class="eve-loading">슬라이드를 찾을 수 없습니다</div>';return;}
const wrapper=document.createElement('div');wrapper.className='eve-content';wrapper.innerHTML=targetSlide.innerHTML;el.innerHTML='';el.appendChild(wrapper);if(sectionTagText.includes('실적 캘린더'))enhanceEarnCalendar(wrapper);el.dataset.loaded='1';}
function enhanceEarnCalendar(root){root.querySelectorAll('.earn-item').forEach(item=>{const tkEl=item.querySelector('.earn-tk');if(!tkEl)return;const sym=(tkEl.textContent||'').trim();if(!sym)return;const coEl=item.querySelector('.earn-co');const nm=coEl?coEl.textContent.trim():sym;const isKR=/^\d{6}$/.test(sym);const openFn=isKR?()=>openKrStock(sym,nm):()=>glPopup(sym);tkEl.removeAttribute('href');tkEl.removeAttribute('target');tkEl.addEventListener('click',e=>{e.preventDefault();openFn();});if(coEl)coEl.addEventListener('click',openFn);const top=item.querySelector('.earn-top')||item;const saUrl=isKR?'https://stockanalysis.com/quote/krx/'+sym+'/':'https://stockanalysis.com/stocks/'+sym.toLowerCase()+'/';const sf=document.createElement('span');sf.className='earn-sf';let html='<a class="earn-sf-chip sa" href="'+saUrl+'" target="_blank" rel="noopener" title="StockAnalysis" onclick="event.stopPropagation()">S</a>';if(!isKR)html+='<a class="earn-sf-chip fv" href="https://finviz.com/quote.ashx?t='+encodeURIComponent(sym)+'" target="_blank" rel="noopener" title="Finviz" onclick="event.stopPropagation()">F</a>';sf.innerHTML=html;top.appendChild(sf);_fixEarnEps(item);});}
function _parseEpsNum(s){if(s==null)return null;const m=String(s).replace(/,/g,'').match(/\(?\s*\$?\s*-?\d+(?:\.\d+)?\s*\)?/);if(!m)return null;let t=m[0];const neg=/\(/.test(t);t=t.replace(/[()$\s]/g,'');const v=parseFloat(t);if(isNaN(v))return null;return neg?-v:v;}
function _fixEarnEps(item){const RED='#f87171',GREEN='#10b981',GRAY='#94a3b8';const actEl=item.querySelector('.earn-actual');if(!actEl)return;const surpEl=actEl.querySelector('span');let label=surpEl?surpEl.textContent.trim():'';if(/전환/.test(label))return;let color=null,estimate=false;if(/상회/.test(label))color=RED;else if(/하회/.test(label))color=GREEN;else{const actNum=_parseEpsNum(actEl.firstChild?actEl.firstChild.nodeValue:actEl.textContent);let fcNum=null;item.querySelectorAll('.earn-eps').forEach(e=>{if(e!==actEl&&/예상/.test(e.textContent))fcNum=_parseEpsNum(e.textContent);});if(actNum==null)return;if(fcNum==null){label='예상 없음';color=GRAY;}else if(fcNum!==0){const pct=(actNum-fcNum)/Math.abs(fcNum)*100;if(actNum>fcNum){label='▲ ≈+'+pct.toFixed(1)+'% 상회';color=RED;estimate=true;}
else if(actNum<fcNum){label='▼ ≈'+pct.toFixed(1)+'% 하회';color=GREEN;estimate=true;}
else{label='— 부합';color=GRAY;}}else{if(actNum>0){label='▲ ≈상회';color=RED;estimate=true;}
else if(actNum<0){label='▼ ≈하회';color=GREEN;estimate=true;}
else{label='— 부합';color=GRAY;}}
if(surpEl)surpEl.textContent=label;else{const s=document.createElement('span');s.style.fontSize='11px';s.textContent='  '+label;actEl.appendChild(s);}}
if(color)actEl.style.color=color;if(estimate){const sp=actEl.querySelector('span');if(sp){sp.title='실제·예상 EPS 직접계산 추정값 — 공식 서프라이즈 집계 시 자동 대체 (회계기준 차이로 공식값과 다를 수 있음)';const tag=document.createElement('span');tag.textContent=' 추정';tag.style.cssText='color:#94a3b8;font-size:9.5px;font-weight:600;';sp.appendChild(tag);}}}
function fmtDoc(cmd){document.getElementById('idea-body').focus();document.execCommand(cmd,false,null);}
function fmtHead(tag){document.getElementById('idea-body').focus();document.execCommand('formatBlock',false,tag);}
function _esc(s){return(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function _snsCardHtml(p,flag,opts){opts=opts||{};const ko=_esc(p.korean).replace(/\n/g,'<br>')||'<span style="color:var(--muted)">(번역 없음)</span>';const en=_esc(p.original).replace(/\n/g,'<br>')||'<span style="color:var(--muted)">(원문 없음)</span>';const link=p.link?`<a class="trump-link" href="${_esc(p.link)}" target="_blank" rel="noopener">원문 링크 ↗</a>`:'';const media=(p.media||[]).filter(Boolean);let mediaHtml='';if(media.length){mediaHtml='<div class="trump-media">'+media.map(u=>{const url=_esc(u);if(/\.mp4($|\?)/i.test(u)){return`<video class="trump-media-item" src="${url}" controls preload="metadata"></video>`;}
return`<a href="${url}" target="_blank" rel="noopener"><img class="trump-media-item" src="${url}" alt="첨부 이미지" onerror="this.closest('a').style.display='none'"></a>`;}).join('')+'</div>';}
const who=opts.name?`<span class="sns-who">${opts.name}</span>`:'';return`<div class="trump-card ${opts.cls || ''}">
    <div class="trump-card-head">
      <span class="trump-flag">${flag}</span>
      ${who}
      <span class="trump-time">${_esc(p.kst)} (KST)</span>
      ${link}
    </div>
    <div class="trump-ko">${ko}</div>
    ${mediaHtml}
    <div class="trump-en"><span class="trump-en-label">ORIGINAL</span>${en}</div>
  </div>`;}
async function _fetchSns(url){try{const r=await fetch(url+'?t='+Date.now());const d=await r.json();return{posts:d.posts||[],updated_at:d.updated_at||''};}
catch(e){return null;}}
function _renderSnsColumn(listId,updId,data,flag){const list=document.getElementById(listId);if(!list)return;if(!data){list.innerHTML='<div style="padding:24px 0;color:#dc2626;">불러오기 실패</div>';return;}
const upd=document.getElementById(updId);if(upd)upd.textContent='업데이트 '+data.updated_at+' · 최근 '+data.posts.length+'건';list.innerHTML=data.posts.length?data.posts.map(p=>_snsCardHtml(p,flag)).join(''):'<div style="padding:24px 0;color:var(--muted);">표시할 글이 없습니다.</div>';}
function _renderSnsMerged(trump,elon){const box=document.getElementById('sns-merged');if(!box)return;const items=[];if(trump)trump.posts.forEach(p=>items.push({p,flag:'🇺🇸',name:'트럼프',cls:''}));if(elon)elon.posts.forEach(p=>items.push({p,flag:'𝕏',name:'머스크',cls:'sns-elon'}));items.sort((a,b)=>String(b.p.kst||'').localeCompare(String(a.p.kst||'')));box.innerHTML=items.length?items.map(t=>_snsCardHtml(t.p,t.flag,{name:t.name,cls:t.cls})).join(''):'<div style="padding:24px 0;color:var(--muted);">표시할 글이 없습니다.</div>';}
let _snsLoaded=false;async function loadTrumpPage(force){if(_snsLoaded&&!force)return;_snsLoaded=true;const[trump,elon]=await Promise.all([_fetchSns('/moneyweb/api/trump_truth.json'),_fetchSns('/moneyweb/api/elon_x.json'),]);_renderSnsColumn('trump-list','trump-updated',trump,'🇺🇸');_renderSnsColumn('elon-list','elon-updated',elon,'𝕏');_renderSnsMerged(trump,elon);}
let ideas=JSON.parse(localStorage.getItem('ml_ideas')||'[]');function renderIdeas(){const el=document.getElementById('idea-items');if(!el)return;if(ideas.length===0){el.innerHTML='<div style="color:var(--muted);font-size: 18px;padding:16px 0;">아직 저장된 아이디어가 없습니다</div>';return;}
el.innerHTML=ideas.slice().reverse().map((item,ri)=>{const idx=ideas.length-1-ri;return`<div class="idea-item" onclick="loadIdea(${idx})">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">
        ${item.tag ? `<span style="font-size: 15px;background:rgba(59,130,246,.2);color:var(--accent);padding:2px 7px;border-radius:5px;font-weight:700;">${item.tag}</span>` : ''}
        <span style="font-size: 19.5px;font-weight:700;">${item.title || '(제목 없음)'}</span>
      </div>
      <div style="font-size: 16.5px;color:var(--muted);">${item.date}</div>
    </div>`;}).join('');}
function saveIdea(){const title=document.getElementById('idea-title').value.trim();const body=document.getElementById('idea-body').innerHTML.trim();const tag=document.getElementById('tag-select').value;if(!title&&!body){alert('내용을 입력하세요.');return;}
const now=new Date();const date=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;ideas.push({title,body,tag,date});localStorage.setItem('ml_ideas',JSON.stringify(ideas));clearIdea();renderIdeas();}
function clearIdea(){document.getElementById('idea-title').value='';document.getElementById('idea-body').innerHTML='';document.getElementById('tag-select').value='';}
function loadIdea(idx){const item=ideas[idx];document.getElementById('idea-title').value=item.title||'';document.getElementById('idea-body').innerHTML=item.body||'';document.getElementById('tag-select').value=item.tag||'';document.getElementById('page-idea').scrollTop=0;}
let _krSelIdx=-1;function _krHighlight(items){items.forEach((el,i)=>el.classList.toggle('sd-active',i===_krSelIdx));if(_krSelIdx>=0&&items[_krSelIdx])items[_krSelIdx].scrollIntoView({block:'nearest'});}
function handleSearch(e){const dd=document.getElementById('search-dropdown');const items=(dd&&dd.classList.contains('open'))?Array.from(dd.querySelectorAll('.sd-item')):[];if(e.key==='Escape'){closeSearchDropdown();e.target.blur();return;}
if(e.key==='ArrowDown'){if(!items.length)return;e.preventDefault();_krSelIdx=(_krSelIdx+1)%items.length;_krHighlight(items);return;}
if(e.key==='ArrowUp'){if(!items.length)return;e.preventDefault();_krSelIdx=(_krSelIdx-1+items.length)%items.length;_krHighlight(items);return;}
if(e.key==='Enter'){if(_krSelIdx>=0&&items[_krSelIdx]){e.preventDefault();const it=items[_krSelIdx];closeSearchDropdown();document.getElementById('search-input').value='';openKrStock(it.dataset.cd,it.dataset.nm);return;}
const q=e.target.value.trim();if(q)updateSearchDropdown(q);}}
function handleSearchInput(){const inp=document.getElementById('search-input');const q=inp.value.trim();const cb=document.getElementById('search-clear');if(cb)cb.style.display=inp.value?'inline-flex':'none';clearTimeout(window._sdTimer);if(!q){closeSearchDropdown();return;}
window._sdTimer=setTimeout(()=>updateSearchDropdown(q),180);}
function clearKrSearch(){const inp=document.getElementById('search-input');inp.value='';closeSearchDropdown();const cb=document.getElementById('search-clear');if(cb)cb.style.display='none';inp.focus();}
async function updateSearchDropdown(q){if(!q){closeSearchDropdown();return;}
if(!TGTPRC_DATA&&BINDEX&&BINDEX['kr-tgtprc'])await ensureTgtprcData();if(!KR_STOCK_META)await ensureKrStockMeta();const dd=document.getElementById('search-dropdown');if(!dd)return;const results=[];const seen=new Set();const ql=q.toLowerCase();const add=(cd,nm,prc,tp)=>{if(seen.has(cd))return;seen.add(cd);results.push({cd,nm,prc,tp});};const krNm=cd=>(KR_STOCK_META&&KR_STOCK_META[cd]&&KR_STOCK_META[cd].nm)||null;if(TGTPRC_DATA){for(const[cd,s]of Object.entries(TGTPRC_DATA)){const nm=krNm(cd)||s.itm_nm||cd;if((nm&&nm.toLowerCase().includes(ql))||cd.includes(ql))
add(cd,nm,s.cur_prc,s.avg_tgt);if(results.length>=12)break;}}
if(KR_STOCK_META&&results.length<12){for(const[cd,d]of Object.entries(KR_STOCK_META)){if((d.nm&&d.nm.toLowerCase().includes(ql))||cd.includes(ql))
add(cd,d.nm||cd,null,null);if(results.length>=12)break;}}
if(!results.length){if(!TGTPRC_DATA&&!KR_STOCK_META){dd.innerHTML='<div class="sd-hd">종목 검색</div><div class="sd-empty">종목 데이터 로딩 중... 잠시 후 다시 검색해주세요</div>';}else{dd.innerHTML='<div class="sd-hd">검색 결과</div><div class="sd-empty">일치하는 종목이 없습니다</div>';}
dd.classList.add('open');return;}
_krSelIdx=-1;const nxtLabel=KR_MARKET_STATUS==='NXT_EVE'?'시간외':'NXT';dd.innerHTML=`<div class="sd-hd">종목 — ${results.length}건</div>`+
results.map(r=>{const nm=r.nm.replace(/</g,'&lt;');const live=KR_PRICES_LIVE&&KR_PRICES_LIVE[r.cd];const close=KR_CLOSE_PRICES&&KR_CLOSE_PRICES[r.cd];const isNxt=!!(live&&live.src&&live.src!=='KRX'&&live.curr_prc!=null);const reg=isNxt?(close||live):(live||close);const hasNxt=isNxt&&close;const dispPrc=reg?reg.curr_prc:r.prc;const dispUd=reg?reg.ud_rt:null;const udClr=dispUd!=null?(dispUd>0?'#ef4444':dispUd<0?'#3b82f6':'#94a3b8'):'';const nxtUd=hasNxt?((live.src==='NXT'&&live.ud_rt!=null)?live.ud_rt:(close.curr_prc?(live.curr_prc-close.curr_prc)/close.curr_prc*100:null)):null;const nxtClr=nxtUd!=null?(nxtUd>0?'#ef4444':nxtUd<0?'#3b82f6':'#94a3b8'):'';const nxtHtml=(hasNxt&&nxtUd!=null)?`<span class="sd-ext">(${nxtLabel} <span style="color:${nxtClr}">${nxtUd >= 0 ? '+' : ''}${nxtUd.toFixed(2)}%</span>)</span>`:'';return`<div class="sd-item" data-cd="${r.cd}" data-nm="${r.nm.replace(/"/g,'&quot;')}" onclick="(function(el){closeSearchDropdown();document.getElementById('search-input').value='';openKrStock(el.dataset.cd,el.dataset.nm);})(this)">
        <span class="sd-cd">${r.cd}</span>
        <span class="sd-nm">${nm}</span>
        ${dispPrc ? `<span class="sd-prc">${_fmt(dispPrc)}원</span>` : ''}
        <span class="sd-chgcol">
          ${dispUd != null ? `<span class="sd-tp"style="color:${udClr}">${dispUd>0?'▲':dispUd<0?'▼':''}${Math.abs(dispUd).toFixed(2)}%</span>` : (r.tp ? `<span class="sd-tp">▶${_fmt(r.tp)}원</span>` : '')}
          ${nxtHtml}
        </span>
      </div>`;}).join('');dd.classList.add('open');}
function closeSearchDropdown(){const dd=document.getElementById('search-dropdown');if(dd)dd.classList.remove('open');_krSelIdx=-1;}
var GL_PEER=null;var GL_LIVE={};var GL_NH=null;async function ensureGlNH(){if(GL_NH)return;GL_NH={};try{const r=await fetch('/moneyweb/api/world_newhigh.json?t='+Date.now());const j=await r.json();Object.values(j.items||{}).forEach(a=>a.forEach(x=>{const t=(x.type||[]).includes('ath')?'ath':'52w';GL_NH[x.code]=t;GL_NH[x.code.split('.')[0].toUpperCase()]=t;}));}catch(e){}}
function glNHb(tk){const t=GL_NH&&(GL_NH[tk]||GL_NH[(tk||'').toUpperCase()]);return t==='ath'?' <span style="color:#fbbf24;font-weight:700;">🏆역대신고가</span>':(t==='52w'?' <span style="color:#3fb950;font-weight:700;">📈52주신고가</span>':'');}
var GL_NEWS=null;var GL_NEWS_UPD='';var WORLD_NEWS=null;var WORLD_NEWS_UPD='';var _glLiveTimer=null;var _glNewsTimer=null;async function ensureGlPeer(){if(GL_PEER)return GL_PEER;GL_PEER={};try{const res=await fetch('/moneyweb/api/global_peer.json?t='+Date.now(),_NC);GL_PEER=await res.json();}catch(e){console.warn('global_peer 로드 실패',e);}
return GL_PEER;}
var GL_OV={};function _ovMarket(tk){if(!tk)return null;if(tk.indexOf('.')<0)return'US';const suf=tk.split('.').pop().toUpperCase();if(suf==='T')return'JP';if(suf==='HK')return'HK';if(suf==='SS'||suf==='SZ')return'CN';return null;}
async function ensureGlOverview(tk){const m=_ovMarket(tk);if(!m)return null;if(GL_OV[m])return GL_OV[m];try{const res=await fetch('/moneyweb/api/global_overview_'+m+'.json?t='+Date.now());GL_OV[m]=(await res.json()).ov||{};}catch(e){GL_OV[m]={};console.warn('global_overview '+m+' 로드 실패',e);}
return GL_OV[m];}
var GL_METRICS={};async function ensureGlMetrics(tk){const m=_ovMarket(tk);if(!m)return null;if(GL_METRICS[m])return GL_METRICS[m];try{const res=await fetch('/moneyweb/api/global_metrics_'+m+'.json?t='+Date.now());GL_METRICS[m]=(await res.json()).metrics||{};}catch(e){GL_METRICS[m]={};console.warn('global_metrics '+m+' 로드 실패',e);}
return GL_METRICS[m];}
var GL_MMLIVE=null;var GL_MM_BYTK=null;async function ensureMMLive(){if(GL_MMLIVE)return GL_MMLIVE;try{const res=await fetch('/moneyweb/api/world_marketmap_live.json?t='+Date.now());GL_MMLIVE=(await res.json()).prices||{};}catch(e){GL_MMLIVE={};}
GL_MM_BYTK={};for(const k in GL_MMLIVE){GL_MM_BYTK[k.split('.')[0].toUpperCase()]=GL_MMLIVE[k];}
return GL_MMLIVE;}
function _mmLive(rc,tk){if(rc&&GL_MMLIVE&&GL_MMLIVE[rc])return GL_MMLIVE[rc];const k=(tk||rc||'').split('.')[0].toUpperCase();return(GL_MM_BYTK&&GL_MM_BYTK[k])||null;}
function _glMcap(v,cur){if(v==null||isNaN(v))return'-';const a=Math.abs(v);cur=cur?(' '+cur):'';if(a>=1e12)return(v/1e12).toFixed(2)+'T'+cur;if(a>=1e9)return(v/1e9).toFixed(1)+'B'+cur;if(a>=1e6)return(v/1e6).toFixed(0)+'M'+cur;return Number(v).toLocaleString()+cur;}
var CORE_SET=null;async function ensureCoreSet(){if(CORE_SET)return CORE_SET;try{const r=await fetch('/moneyweb/api/core_tickers.json?t='+Date.now());CORE_SET=new Set((await r.json()).core||[]);}catch(e){CORE_SET=new Set();}
return CORE_SET;}
function _srcDot(tk){if(!CORE_SET)return'';let c,t;if(CORE_SET.has(tk)){c='#fbbf24';t='SA · 핵심';}
else if(tk.indexOf('.')<0){c='#9ca3af';t='Finviz · 미국 비핵심';}
else{c='#3fb950';t='네이버 · 비핵심';}
return' <span title="'+t+'" style="display:inline-block;width:8px;height:8px;border-radius:50%;'
+'background:'+c+';vertical-align:middle;box-shadow:0 0 0 1px rgba(0,0,0,.35);"></span>';}
var GL_FIN={};async function ensureGlFin(tk){const m=_ovMarket(tk);if(!m)return null;if(GL_FIN[m])return GL_FIN[m];try{const res=await fetch('/moneyweb/api/global_financials_'+m+'.json?t='+Date.now());GL_FIN[m]=(await res.json()).fin||{};}catch(e){GL_FIN[m]={};}
return GL_FIN[m];}
function _krwon(v){if(v==null||isNaN(v))return'-';const a=Math.abs(v);if(a>=10000)return(v/10000).toFixed(1)+'조';return Math.round(v).toLocaleString()+'억';}
async function _renderGlFin(tk){const el=document.getElementById('gl-fin');if(!el)return;el.innerHTML='';if(_ovMarket(tk)==null)return;const fin=await ensureGlFin(tk);const gm=document.getElementById('glmodal');if(!(gm.classList.contains('open')&&gm.dataset.tk===tk))return;const rows=fin&&fin[tk];if(!rows||!rows.length)return;const clr=v=>v==null?'#9fb2c8':(v>=0?'#ff6b6b':'#5b9dff');let t='<div class="rt-title" style="margin-bottom:6px;">📊 재무 <span style="font-size:11px;color:#6f8398;font-weight:500;">네이버 · 억원(원화환산)</span></div>'
+'<table style="width:100%;border-collapse:collapse;font-size:12px;">'
+'<tr style="color:#8aa0b8;"><td>연도</td><td style="text-align:right;">매출</td><td style="text-align:right;">영업익</td><td style="text-align:right;">순익</td></tr>';rows.forEach(r=>{t+='<tr style="border-top:1px solid #1b2c42;">'
+'<td style="color:#cfe0f2;padding:3px 0;">'+r.y+'</td>'
+'<td style="text-align:right;color:#dfe8f2;">'+_krwon(r.rev)+'</td>'
+'<td style="text-align:right;color:'+clr(r.op)+';">'+_krwon(r.op)+'</td>'
+'<td style="text-align:right;color:'+clr(r.net)+';">'+_krwon(r.net)+'</td></tr>';});el.innerHTML=t+'</table>';}
function tvSym(s){s=String(s||'').toUpperCase();if(s.endsWith('.T'))return'TSE:'+s.slice(0,-2);if(s.endsWith('.HK'))return'HKEX:'+s.slice(0,-3).replace(/^0+/,'');if(s.endsWith('.SS'))return'SSE:'+s.slice(0,-3);if(s.endsWith('.SZ'))return'SZSE:'+s.slice(0,-3);if(s.endsWith('.TW'))return'TWSE:'+s.slice(0,-3);return s;}
async function ensureGlLive(){try{const res=await fetch('/moneyweb/api/global_prices_live.json?t='+Date.now());const d=await res.json();GL_LIVE=d.prices||{};}catch(e){}
if(!_glLiveTimer)_glLiveTimer=setInterval(ensureGlLive,180000);return GL_LIVE;}
async function ensureFinvizNews(force){if(GL_NEWS&&!force)return GL_NEWS;try{const res=await fetch('/moneyweb/api/finviz_news.json?t='+Date.now());const d=await res.json();GL_NEWS=d.news||{};GL_NEWS_UPD=d.updated_at||'';}catch(e){if(!GL_NEWS)GL_NEWS={};}
if(!_glNewsTimer)_glNewsTimer=setInterval(()=>ensureFinvizNews(true),1800000);return GL_NEWS;}
async function ensureWorldNews(){if(WORLD_NEWS)return WORLD_NEWS;try{const res=await fetch('/moneyweb/api/world_news.json?t='+Date.now());const d=await res.json();WORLD_NEWS=d.news||{};WORLD_NEWS_UPD=d.updated_at||'';}catch(e){if(!WORLD_NEWS)WORLD_NEWS={};}
return WORLD_NEWS;}
function renderGlNews(tk){const box=document.getElementById('gl-news');const upd=document.getElementById('gl-news-upd');if(!box)return;const isUS=(tk||'').indexOf('.')<0;const list=isUS?((GL_NEWS&&GL_NEWS[tk])||null):((WORLD_NEWS&&WORLD_NEWS[tk])||null);const updSrc=isUS?GL_NEWS_UPD:WORLD_NEWS_UPD;const loading=isUS?(GL_NEWS===null):(WORLD_NEWS===null);upd.textContent=updSrc?('업데이트 '+updSrc.slice(5,16)):'';if(!list||!list.length){box.innerHTML='<div class="gnews-empty">'+
(loading?'뉴스 로딩 중...':'수집된 뉴스가 없습니다')+'</div>';return;}
box.innerHTML=list.slice(0,10).map(x=>{const t=(x.t||'').replace(/</g,'&lt;');const ko=(x.tk||'').replace(/</g,'&lt;');const src=(x.src||'').replace(/</g,'&lt;');const dt=(x.dt||'').replace(/</g,'&lt;');return'<a class="gnews-item" href="'+x.u+'" target="_blank" rel="noopener">'+'<div class="gnews-hd">'+t+'</div>'+
(ko?'<div class="gnews-hd-ko">'+ko+'</div>':'')+'<div class="gnews-meta"><span class="src">'+src+'</span><span>'+dt+'</span></div></a>';}).join('');}
let _glSelIdx=-1;let _glLastQuery='';function _glHighlight(items){items.forEach((el,i)=>el.classList.toggle('sd-active',i===_glSelIdx));if(_glSelIdx>=0&&items[_glSelIdx])items[_glSelIdx].scrollIntoView({block:'nearest'});}
function handleGlSearch(e){const dd=document.getElementById('gl-search-dropdown');const items=(dd&&dd.classList.contains('open'))?Array.from(dd.querySelectorAll('.sd-item')):[];if(e.key==='Escape'){closeGlSearchDropdown();e.target.blur();return;}
if(e.key==='ArrowDown'){if(!items.length)return;e.preventDefault();_glSelIdx=(_glSelIdx+1)%items.length;_glHighlight(items);return;}
if(e.key==='ArrowUp'){if(!items.length)return;e.preventDefault();_glSelIdx=(_glSelIdx-1+items.length)%items.length;_glHighlight(items);return;}
if(e.key==='Enter'){if(_glSelIdx>=0&&items[_glSelIdx]){e.preventDefault();const tk=items[_glSelIdx].dataset.tk;closeGlSearchDropdown();document.getElementById('gl-search-input').value='';glPopup(tk);return;}
const q=e.target.value.trim();if(q)updateGlSearchDropdown(q);}}
function handleGlSearchInput(){const inp=document.getElementById('gl-search-input');const q=inp.value.trim();const cb=document.getElementById('gl-search-clear');if(cb)cb.style.display=inp.value?'inline-flex':'none';clearTimeout(window._gsdTimer);if(!q){closeGlSearchDropdown();return;}
window._gsdTimer=setTimeout(()=>updateGlSearchDropdown(q),180);}
function clearGlSearch(){const inp=document.getElementById('gl-search-input');inp.value='';closeGlSearchDropdown();const cb=document.getElementById('gl-search-clear');if(cb)cb.style.display='none';inp.focus();}
async function updateGlSearchDropdown(q){if(!q){closeGlSearchDropdown();return;}
if(!GL_PEER)await ensureGlPeer();const dd=document.getElementById('gl-search-dropdown');if(!dd)return;_glLastQuery=q;_renderGlSearch(q,dd);Promise.all([ensureMMLive(),ensureGlLive()]).then(()=>{if(_glLastQuery===q&&dd.classList.contains('open'))_renderGlSearch(q,dd);});}
function _renderGlSearch(q,dd){const ql=q.toLowerCase();const scored=[];for(const[tk,d]of Object.entries(GL_PEER)){const tkl=tk.toLowerCase();const nm=(d.n||'').toLowerCase();let score=-1;if(tkl===ql)score=100;else if(tkl.startsWith(ql))score=80;else if(nm.startsWith(ql))score=70;else if(tkl.includes(ql))score=50;else if(nm.includes(ql))score=40;if(score>=0)scored.push({tk,d,score});}
scored.sort((a,b)=>b.score-a.score||(a.d.n||'').localeCompare(b.d.n||''));const results=scored.slice(0,12);if(!results.length){if(!GL_PEER||!Object.keys(GL_PEER).length){dd.innerHTML='<div class="sd-hd">해외 종목 검색</div><div class="sd-empty">종목 데이터 로딩 중... 잠시 후 다시 검색해주세요</div>';}else{dd.innerHTML='<div class="sd-hd">검색 결과</div><div class="sd-empty">일치하는 해외 종목이 없습니다</div>';}
dd.classList.add('open');return;}
const prevSel=_glSelIdx;dd.innerHTML=results.map(({tk,d})=>{const nm=(d.n||tk).replace(/</g,'&lt;');const mm=_mmLive(d.rc,tk);const live=GL_LIVE[tk];const chg=(mm&&mm.c!=null)?mm.c:((live&&live.c!=null)?live.c:(d.chg!=null?d.chg:null));const udClr=chg!=null?(chg>0?'#ef4444':chg<0?'#3b82f6':'#94a3b8'):'#94a3b8';const _ext=(mm&&mm.e!=null)?mm.e:((live&&live.e!=null)?live.e:null);const hasExt=_ext!=null;const extClr=hasExt?(_ext>=0?'#ef4444':'#3b82f6'):'';const extHtml=hasExt?`<span class="sd-ext">(시간외 <span style="color:${extClr}">${_ext >= 0 ? '+' : ''}${Number(_ext).toFixed(2)}%</span>)</span>`:'';const regHtml=chg!=null?`<span class="sd-tp" style="color:${udClr}">${chg > 0 ? '▲' : chg < 0 ? '▼' : ''}${Math.abs(chg).toFixed(2)}%</span>`:`<span class="sd-tp" style="color:#94a3b8">—</span>`;return`<div class="sd-item" data-tk="${tk.replace(/"/g,'&quot;')}" onclick="(function(el){closeGlSearchDropdown();document.getElementById('gl-search-input').value='';glPopup(el.dataset.tk);})(this)">
        <span class="sd-cd">${tk.replace(/</g,'&lt;')}</span>
        <span class="sd-nm">${nm}</span>
        ${d.cur ? `<span class="sd-cur">${d.cur}</span>` : ''}
        <span class="sd-chgcol">
          ${regHtml}
          ${extHtml}
        </span>
      </div>`;}).join('');dd.classList.add('open');const items=Array.from(dd.querySelectorAll('.sd-item'));_glSelIdx=(prevSel>=0&&prevSel<items.length)?prevSel:-1;if(_glSelIdx>=0)_glHighlight(items);}
function closeGlSearchDropdown(){const dd=document.getElementById('gl-search-dropdown');if(dd)dd.classList.remove('open');_glSelIdx=-1;}
function _glf(v,suf,dec){if(v===null||v===undefined)return'-';return(dec!==undefined?Number(v).toFixed(dec):v)+(suf||'');}
async function glPopup(tk,fb){if(!GL_PEER)await ensureGlPeer();ensureGlNH();await ensureCoreSet();await ensureMMLive();if(!Object.keys(GL_LIVE).length)await ensureGlLive();const d=GL_PEER[tk];if(!d){glPopupLiteFB(tk,fb);return;}
const mm=_mmLive(d.rc,tk)||{};const L=GL_LIVE[tk]||{};document.getElementById('gl-nm').textContent=d.n||tk;document.getElementById('gl-sub').innerHTML=(d.tk||tk)+_srcDot(tk)+(d.cur?'  ·  '+d.cur:'')+glNHb(tk);const pxv=(mm.p!=null)?mm.p:((L.p!=null)?L.p:d.px);const chgv=(mm.c!=null)?mm.c:((L.c!=null)?L.c:d.chg);const px=pxv!=null?Number(pxv).toLocaleString():'-';document.getElementById('gl-px').textContent=px+(d.cur?(' '+d.cur):'');const chgEl=document.getElementById('gl-chg');if(chgv!=null){chgEl.textContent=(chgv>=0?'▲ +':'▼ ')+Number(chgv).toFixed(2)+'% (전일종가 대비)';chgEl.className='gchg '+(chgv>=0?'up':'dn');}else chgEl.textContent='';const extEl=document.getElementById('gl-ext');const _mx=_mmLive(d.rc,tk);if(_mx&&_mx.e!=null){const ec=_mx.e>=0?'#ff6b6b':'#5b9dff';extEl.style.display='block';extEl.innerHTML='시간외 '+(_mx.ep!=null?'<b>'+Number(_mx.ep).toLocaleString()+(d.cur?(' '+d.cur):'')+'</b> ':'')+'<span style="color:'+ec+'">('+(_mx.e>=0?'+':'')+Number(_mx.e).toFixed(2)+'%)</span>';}else extEl.style.display='none';const mk=d.mk!=null?(d.mk/1e12).toFixed(1)+'조':'-';const mu=d.mu!=null?'$'+(d.mu/1e9).toFixed(1)+'B':'';const w52=(d.w52l!=null&&d.w52h!=null)?('   ·   52주 '+Number(d.w52l).toLocaleString()+'~'+Number(d.w52h).toLocaleString()):'';document.getElementById('gl-mk').textContent='시가총액  '+mk+(mu?('  ('+mu+')'):'')+w52;const cells=[['PER(Fwd)',_glf(d.perF,'x',1)],['PER(TTM)',_glf(d.perT,'x',1)],['PBR',_glf(d.pbr,'',2)],['PSR',_glf(d.psr,'',2)],['EV/EBITDA',_glf(d.ev,'',1)],['ROE',_glf(d.roe,'%',1)],['영업이익률',_glf(d.opm,'%',1)],['순이익률',_glf(d.npm,'%',1)],['배당수익률',_glf(d.dy,'%',2)],['매출성장',_glf(d.rg,'%',1)],['EPS성장',_glf(d.eg,'%',1)],['Beta',_glf(d.beta,'',2)]];document.getElementById('gl-metrics').innerHTML=cells.map(c=>'<div class="gcell"><span class="l">'+c[0]+'</span><span class="v">'+c[1]+'</span></div>').join('');const rt=document.getElementById('gl-ratings');if(d.rat&&d.rat.length){const head='<div class="rt-row rt-h"><span>Firm</span><span>Action</span><span>목표가</span><span>Upside</span><span>Date</span></div>';const body=d.rat.map(x=>{const upc=(x.up||'').indexOf('-')===0?'#5b9dff':'#ff6b6b';return'<div class="rt-row"><span class="rt-firm">'+(x.firm||'')+'</span>'+'<span>'+(x.ac||'')+'</span><span class="rt-pt">'+(x.pt||'')+'</span>'+'<span style="color:'+upc+'">'+(x.up||'')+'</span><span class="rt-dt">'+(x.dt||'')+'</span></div>';}).join('');rt.innerHTML='<div class="rt-title">📋 애널리스트 ratings (최근 '+d.rat.length+')</div>'+head+body;}else{rt.innerHTML='<div class="rt-title">📋 애널리스트 ratings</div><div class="empty">데이터 없음</div>';}
document.getElementById('gl-links').innerHTML=(d.sa?'<a href="'+d.sa+'" target="_blank">StockAnalysis ↗</a>':'')+
(d.fv?'<a href="'+d.fv+'" target="_blank">Finviz ↗</a>':'')+'<a href="https://finance.yahoo.com/quote/'+encodeURIComponent(d.tk||tk)+'" target="_blank">Yahoo ↗</a>'+'<a href="https://www.tradingview.com/chart/?symbol='+encodeURIComponent(tvSym(d.tk||tk))+'" target="_blank">TradingView ↗</a>'+'<a onclick="copyStockLink(\''+tk+'\',this)" style="cursor:pointer;">🔗 링크복사</a>';const gm=document.getElementById('glmodal');gm.dataset.tk=tk;gm.classList.add('open');setGlOverview(null);ensureGlOverview(tk).then(ov=>{if(gm.classList.contains('open')&&gm.dataset.tk===tk)
setGlOverview({overview:ov?(ov[tk]||ov[d.tk]):null});});_renderGlFin(tk);renderGlNews(tk);(tk.indexOf('.')<0?ensureFinvizNews():ensureWorldNews()).then(()=>{if(gm.classList.contains('open')&&gm.dataset.tk===tk)renderGlNews(tk);});}
function glClose(){document.getElementById('glmodal').classList.remove('open');}
async function glPopupLiteFB(tk,fb){fb=fb||{};ensureGlNH();await ensureCoreSet();const isUS=tk.indexOf('.')<0;const gm=document.getElementById('glmodal');gm.dataset.tk=tk;gm.classList.add('open');document.getElementById('gl-nm').textContent=fb.name||tk;document.getElementById('gl-sub').innerHTML=tk+_srcDot(tk)+glNHb(tk);document.getElementById('gl-px').textContent=(fb.price!=null)?Number(fb.price).toLocaleString():'';const chgEl=document.getElementById('gl-chg');if(fb.change!=null){chgEl.textContent=(fb.change>=0?'▲ +':'▼ ')+Number(fb.change).toFixed(2)+'%';chgEl.className='gchg '+(fb.change>=0?'up':'dn');}
else chgEl.textContent='';const _Lx=_mmLive(null,tk),_extX=document.getElementById('gl-ext');if(_Lx&&_Lx.e!=null){const _ecx=_Lx.e>=0?'#ff6b6b':'#5b9dff';_extX.style.display='block';_extX.innerHTML='시간외 '+(_Lx.ep!=null?'<b>'+Number(_Lx.ep).toLocaleString()+'</b> ':'')+'<span style="color:'+_ecx+'">('+(_Lx.e>=0?'+':'')+Number(_Lx.e).toFixed(2)+'%)</span>';}else _extX.style.display='none';document.getElementById('gl-mk').textContent='';document.getElementById('gl-metrics').innerHTML='';document.getElementById('gl-ratings').innerHTML='<div class="rt-title">📋 애널리스트</div><div class="empty" style="padding:6px 2px;">핵심종목만 제공(SA) — 아래 링크 참고</div>';document.getElementById('gl-links').innerHTML='<a href="https://finance.yahoo.com/quote/'+encodeURIComponent(tk)+'" target="_blank">Yahoo ↗</a>'
+(isUS?'<a href="https://stockanalysis.com/stocks/'+tk.toLowerCase()+'/" target="_blank">StockAnalysis ↗</a>':'')
+'<a href="https://www.tradingview.com/chart/?symbol='+encodeURIComponent(tvSym(tk))+'" target="_blank">TradingView ↗</a>'
+'<a onclick="copyStockLink(\''+tk+'\',this)" style="cursor:pointer;">🔗 링크복사</a>';setGlOverview(null);ensureGlOverview(tk).then(ov=>{if(gm.classList.contains('open')&&gm.dataset.tk===tk)setGlOverview({overview:ov?ov[tk]:null});});_renderGlFin(tk);Promise.all([ensureGlMetrics(tk),ensureMMLive()]).then(([mm])=>{if(!(gm.classList.contains('open')&&gm.dataset.tk===tk))return;const d=mm&&mm[tk];if(d)_fillGlBackbone(tk,d);});renderGlNews(tk);(isUS?ensureFinvizNews():ensureWorldNews()).then(()=>{if(gm.classList.contains('open')&&gm.dataset.tk===tk)renderGlNews(tk);});}
function _fillGlBackbone(tk,d){document.getElementById('gl-nm').textContent=d.nm||tk;document.getElementById('gl-sub').innerHTML=tk+_srcDot(tk)+(d.ind?'  ·  '+d.ind:'')+(d.cur?'  ·  '+d.cur:'')+glNHb(tk);if(d.px!=null)document.getElementById('gl-px').textContent=Number(d.px).toLocaleString()+(d.cur?(' '+d.cur):'');const live=GL_MMLIVE&&d.rc&&GL_MMLIVE[d.rc];const chg=(live&&live.c!=null)?live.c:(d.chg!=null?Number(d.chg):null);if(chg!=null){const chgEl=document.getElementById('gl-chg');chgEl.textContent=(chg>=0?'▲ +':'▼ ')+Math.abs(chg).toFixed(2)+'%'+(live?'':' (전일)');chgEl.className='gchg '+(chg>=0?'up':'dn');}
const w52=(d.w52l&&d.w52h)?('   ·   52주 '+Number(d.w52l).toLocaleString()+'~'+Number(d.w52h).toLocaleString()):'';document.getElementById('gl-mk').textContent='시가총액  '+_glMcap(d.mcap,d.cur)+w52;const cells=[['PER',d.per?d.per+'x':'-'],['PBR',d.pbr?d.pbr+'x':'-'],['EPS',d.eps||'-'],['BPS',d.bps||'-'],['배당수익률',d.divy||'-'],['거래량',d.vol?Number(d.vol).toLocaleString():'-']];document.getElementById('gl-metrics').innerHTML=cells.map(c=>'<div class="gcell"><span class="l">'+c[0]+'</span><span class="v">'+c[1]+'</span></div>').join('');}
var GH_DATA=null;var GH_CUR='USA';const GH_ORDER=['USA','JPN','CHN','HKG','TWN','EUR'];const GH_FCC={USA:'us',JPN:'jp',CHN:'cn',HKG:'hk',TWN:'tw',EUR:'eu'};const GH_KNM={USA:'미국',JPN:'일본',CHN:'중국',HKG:'홍콩',TWN:'대만',EUR:'유럽'};var _ghTimer=null;var _ghPicked=false;async function loadGlobalHigh(){if(GH_DATA){renderGhTabs();renderGlobalHigh();}
await refreshGlobalHigh();if(!_ghTimer)_ghTimer=setInterval(refreshGlobalHigh,180000);}
async function refreshGlobalHigh(){const box=document.getElementById('gh-list');try{const res=await fetch('/moneyweb/api/world_newhigh.json?t='+Date.now());GH_DATA=await res.json();}catch(e){if(box&&!box.innerHTML)box.innerHTML='데이터 로드 실패';return;}
const its=GH_DATA.items||{};if(!_ghPicked&&!(its[GH_CUR]&&its[GH_CUR].length)){const f=GH_ORDER.find(c=>its[c]&&its[c].length);if(f)GH_CUR=f;}
_ghPicked=true;try{await ensureGlPeer();}catch(e){}
try{await ensureMMLive();}catch(e){}
try{await ensureGlLive();}catch(e){}
renderGhTabs();renderGlobalHigh();}
const GH_ALWAYS=['USA','JPN','CHN','HKG','TWN'];function renderGhTabs(){const bar=document.getElementById('gh-tabs');if(!bar)return;const its=GH_DATA.items||{};bar.innerHTML=GH_ORDER.filter(c=>GH_ALWAYS.includes(c)||(its[c]&&its[c].length)).map(code=>{const n=(its[code]||[]).length;const act=(code===GH_CUR);return'<div onclick="switchGhCountry(\''+code+'\')" style="cursor:pointer;padding:7px 13px;border-radius:8px;font-weight:700;font-size:14px;white-space:nowrap;'
+(act?'background:#14b8a6;color:#fff;':'background:var(--card2);color:var(--muted);border:1px solid var(--border);')+'display:inline-flex;align-items:center;gap:6px;">'
+'<img class="flag-img" src="https://flagcdn.com/w40/'+GH_FCC[code]+'.png" alt="">'+GH_KNM[code]+' <span style="font-size:12px;opacity:.85;">'+n+'</span></div>';}).join('');}
function switchGhCountry(code){GH_CUR=code;GH_SHOWALL=false;renderGhTabs();renderGlobalHigh();const p=document.getElementById('page-global-high');if(p)p.scrollTop=0;}
function _ghRows(items,code){if(!items.length)return'<div style="color:var(--muted);font-size:13px;padding:6px 2px;">해당 없음</div>';return items.map((it,i)=>{const chgN=(typeof it.change==='number')?it.change:null;const chg=chgN!=null?((chgN>=0?'+':'')+chgN.toFixed(2)+'%'):'';const chgc=chgN!=null?(chgN>=0?'#ff6b6b':'#5b9dff'):'var(--muted)';const px=(it.close!=null)?Number(it.close).toLocaleString():'-';return'<div class="gh-row" onclick="ghClick(\''+code+'\',\''+String(it.ticker).replace(/\x27/g,"")+'\')" '
+'style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid var(--border);cursor:pointer;">'
+'<div style="flex:1;min-width:0;"><div style="font-weight:700;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+(it.name||it.ticker)+'</div>'
+'<div style="font-size:11.5px;color:var(--muted);">'+it.ticker+(it.sector?(' · '+it.sector):'')+'</div></div>'
+'<div style="text-align:right;white-space:nowrap;"><div style="font-weight:700;font-size:13.5px;">'+px+'</div>'
+'<div style="font-size:12px;color:'+chgc+';">'+chg+'</div></div></div>';}).join('');}
var GH_KIND='stock';function setGhKind(k){GH_KIND=k;renderGlobalHigh();}
var GH_SHOWALL=false;function toggleGhAll(){GH_SHOWALL=!GH_SHOWALL;renderGlobalHigh();}
function renderGlobalHigh(){const box=document.getElementById('gh-list');const upd=document.getElementById('gh-updated');const ts=GH_DATA.updatedAt||GH_DATA.updated_at;if(upd&&ts)upd.textContent='업데이트 '+ts.slice(5,16);const items=(GH_DATA.items||{})[GH_CUR]||[];if(!items.length){box.innerHTML='<div style="padding:20px;color:var(--muted);">신고가 종목이 없습니다</div>';return;}
const coreItems=items.filter(x=>x.core);const otherN=items.length-coreItems.length;let html='';if(coreItems.length){html+='<div style="font-size:13.5px;font-weight:800;color:#fbbf24;margin:2px 0 8px;display:flex;align-items:center;gap:6px;">'
+'<span title="핵심종목">★</span> 핵심 종목 신고가 <span style="color:var(--muted);font-weight:400;">'+coreItems.length+'개</span></div>';html+=_ghSectorView(coreItems,GH_CUR,'core');}else{html+='<div style="padding:10px 2px;color:var(--muted);font-size:13px;">핵심 종목 신고가 없음</div>';}
if(otherN>0){html+='<div style="border-top:1px dashed var(--border);margin:16px 0 0;"></div>';html+='<div onclick="toggleGhAll()" style="cursor:pointer;user-select:none;display:flex;align-items:center;gap:8px;'
+'font-size:13.5px;font-weight:800;color:var(--text);padding:12px 2px '+(GH_SHOWALL?'10px':'12px')+';">'
+'<span style="font-size:11px;color:var(--muted);width:10px;">'+(GH_SHOWALL?'▼':'▶')+'</span>'
+'전체 종목 신고가 <span style="color:var(--muted);font-weight:400;">총 '+items.length+'개 (핵심 '+coreItems.length+' + 그 외 '+otherN+')</span>'
+(GH_SHOWALL?'':'<span style="margin-left:auto;color:#14b8a6;font-weight:700;">더보기 ▾</span>')
+'</div>';if(GH_SHOWALL)html+=_ghSectorView(items,GH_CUR,'all');}
box.innerHTML=html;}
const _GH_CUR_SYM={USA:'$',JPN:'¥',CHN:'¥',HKG:'HK$',TWN:'NT$'};function _ghFmtVal(v,code){if(v==null||!v)return'';const s=_GH_CUR_SYM[code]||'';if(v>=1e12)return s+(v/1e12).toFixed(1)+'T';if(v>=1e9)return s+(v/1e9).toFixed(1)+'B';if(v>=1e6)return s+(v/1e6).toFixed(0)+'M';if(v>=1e3)return s+(v/1e3).toFixed(0)+'K';return s+Math.round(v);}
function _ghExtHtml(code,rc){if(code!=='USA')return'';const v=_mmLive(rc);const e=v&&v.e;if(e==null)return'';const col=e>=0?'#e0726b':'#7fb0e8';return'<div style="font-size:9.5px;font-weight:600;line-height:1.05;color:'+col+';">('
+(e>0?'+':'')+Number(e).toFixed(2)+'%)</div>';}
function _usSession(){const et=new Date(new Date().toLocaleString('en-US',{timeZone:'America/New_York'}));const dow=et.getDay(),hm=et.getHours()*60+et.getMinutes();const wd=dow>=1&&dow<=5;const open=wd&&hm>=570&&hm<960;const d=new Date(et);if(!(open||(wd&&hm>=960))){do{d.setDate(d.getDate()-1);}while(d.getDay()===0||d.getDay()===6);}
return{open,md:(d.getMonth()+1)+'/'+d.getDate()};}
function _ghSectorView(items,code,scope){scope=scope||'all';const isUS=(code==='USA');const isAth=x=>(x.type||[]).includes('ath');const athN=items.filter(isAth).length;const w52N=items.length-athN;const raw={};items.forEach(x=>{const s=x.sector||'기타';(raw[s]=raw[s]||[]).push(x);});const grp={};Object.keys(raw).forEach(s=>{const bucket=(s!=='기타'&&raw[s].length>=2)?s:'기타';(grp[bucket]=grp[bucket]||[]).push(...raw[s]);});Object.values(grp).forEach(a=>a.sort((p,q)=>(q.mcap||0)-(p.mcap||0)));const order=Object.keys(grp).filter(s=>s!=='기타').sort((a,b)=>grp[b].length-grp[a].length);if(grp['기타'])order.push('기타');const SECT_GREEN='#4ade80';const pill=s=>{const sj=s.replace(/\\/g,'\\\\').replace(/'/g,"\\'");return'<div onclick="openGhSector(\''+sj+'\',\''+scope+'\')" style="display:flex;align-items:center;justify-content:space-between;padding:3px 6px;margin-bottom:2px;border-radius:4px;background:var(--card2);gap:6px;cursor:pointer;"'
+' onmouseover="this.style.background=\'var(--border)\'" onmouseout="this.style.background=\'var(--card2)\'">'
+'<span style="font-size:12.5px;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">▣ '+s+'</span>'
+'<span style="font-size:12.5px;font-weight:700;color:#f59e0b;">'+grp[s].length+'</span></div>';};const row=x=>{const tk=isUS?x.code.split('.')[0]:x.code;const key=isUS?x.code.split('.')[0].toUpperCase():x.code;const _mm=_mmLive(x.code,key);const cr=(_mm&&_mm.c!=null)?_mm.c:((GL_LIVE[key]&&GL_LIVE[key].c!=null)?GL_LIVE[key].c:x.change);const c=(cr||0)>=0?'#f85149':'#58a6ff';const lead=(isAth(x)?'🏆':'')+(x.core?'<span title="핵심종목" style="color:#fbbf24;">★</span>':'');return'<tr onclick="glPopup(\''+key+'\')" style="cursor:pointer;"'
+' onmouseover="this.style.background=\'var(--card2)\'" onmouseout="this.style.background=\'\'">'
+'<td style="padding:3px 8px;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;vertical-align:top;">'+lead+(lead?' ':'')+(x.name||tk)+' <span style="color:var(--muted);font-size:10.5px;">'+tk+'</span></td>'
+'<td style="padding:3px 3px;text-align:right;white-space:nowrap;vertical-align:top;"><span style="font-size:12px;font-weight:800;color:'+c+';">'+(cr==null?'-':((cr>0?'+':'')+Number(cr).toFixed(2)+'%'))+'</span>'+_ghExtHtml(code,x.code)+'</td>'
+'<td style="padding:3px 3px;text-align:right;font-size:11.5px;color:var(--muted);white-space:nowrap;vertical-align:top;">'+_ghFmtVal(x.value,code)+'</td>'
+'<td style="padding:3px 8px 3px 3px;text-align:right;font-size:11.5px;color:#9aa7b3;white-space:nowrap;vertical-align:top;">'+_ghFmtVal(x.mcap,code)+'</td>'
+'</tr>';};const colgroup='<colgroup><col/><col style="width:50px"/><col style="width:50px"/><col style="width:52px"/></colgroup>';const headRow='<tr style="color:var(--muted);font-size:10px;background:var(--card);">'
+'<td style="padding:2px 8px;"></td>'
+'<td style="padding:2px 3px;text-align:right;">등락</td>'
+'<td style="padding:2px 3px;text-align:right;">거래대금</td>'
+'<td style="padding:2px 8px 2px 3px;text-align:right;">시총</td></tr>';const card=s=>'<div style="border:1px solid var(--border);border-radius:8px;overflow:hidden;break-inside:avoid;-webkit-column-break-inside:avoid;margin-bottom:8px;display:inline-block;width:100%;vertical-align:top;">'
+'<div onclick="openGhSector(\''+_ghEsc(s)+'\',\''+scope+'\')" title="섹터 전체 종목 보기" style="padding:4px 9px;background:'+SECT_GREEN+'1f;font-size:13px;font-weight:700;color:'+SECT_GREEN+';border-bottom:1px solid '+SECT_GREEN+'40;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;">▣ '+s
+' <span style="color:var(--muted);font-weight:400;">('+grp[s].length+')</span></div>'
+'<table style="width:100%;border-collapse:collapse;table-layout:fixed;">'+colgroup+'<tbody>'+headRow+grp[s].map(row).join('')+'</tbody></table></div>';window._ghGrp=grp;window._ghCode=code;window._ghOrder=order;(window._ghScopes=window._ghScopes||{})[scope]={grp:grp,code:code,order:order};let sessBadge='';if(code==='USA'){const us=_usSession();sessBadge=us.open?'<span style="font-size:12px;color:#22c55e;font-weight:700;">🟢 미국 '+us.md+' 장중 실시간</span>':'<span style="font-size:12px;color:var(--muted);font-weight:700;background:var(--card2);padding:2px 8px;border-radius:6px;">미국 '+us.md+' 종가 기준</span>';}
return'<div style="display:flex;align-items:center;gap:12px;margin:2px 0 10px;flex-wrap:wrap;">'
+'<span style="font-size:13px;color:#f59e0b;font-weight:700;">🏆 역사적 '+athN+'</span>'
+'<span style="font-size:13px;color:#22c55e;font-weight:700;">📈 52주 '+w52N+'</span>'
+'<span style="font-size:12px;color:var(--muted);">· 총 '+items.length+'개 · 섹터 내 시총순</span>'
+sessBadge+'</div>'
+'<div class="gh-sec-grid" style="display:grid;grid-template-columns:180px 1fr;gap:10px;align-items:start;">'
+'<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:9px;">'
+'<div style="font-size:14px;font-weight:800;margin-bottom:6px;">신고가 섹터</div>'
+order.map(pill).join('')
+'</div>'
+'<div class="gh-sec-cards" style="column-width:310px;column-gap:8px;">'+order.map(card).join('')+'</div>'
+'</div>';}
function _ghEsc(t){return String(t).replace(/\\/g,'\\\\').replace(/'/g,"\\'");}
function openGhSector(s,scope){scope=scope||'all';const sc=(window._ghScopes&&window._ghScopes[scope])||{grp:window._ghGrp,code:window._ghCode,order:window._ghOrder};const grp=sc.grp||{},code=sc.code,ord=sc.order||[];const rows=grp[s];if(!rows||!rows.length)return;const isUS=code==='USA';const isAth=x=>(x.type||[]).includes('ath');let m=document.getElementById('gh-sec-modal');if(!m){m=document.createElement('div');m.id='gh-sec-modal';m.style.cssText='display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:9980;align-items:flex-start;justify-content:center;overflow:auto;padding:48px 16px;';m.addEventListener('click',e=>{if(e.target===m)m.style.display='none';});document.body.appendChild(m);}
const trs=rows.map(x=>{const tk=isUS?x.code.split('.')[0]:x.code;const key=isUS?x.code.split('.')[0].toUpperCase():x.code;const cr=x.change,c=(cr||0)>=0?'#f85149':'#58a6ff';const lead=(isAth(x)?'🏆':'')+(x.core?'<span title="핵심종목" style="color:#fbbf24;">★</span>':'');return'<tr onclick="glPopup(\''+key+'\')" style="cursor:pointer;border-bottom:1px solid #1b2c42;"'
+' onmouseover="this.style.background=\'#16273c\'" onmouseout="this.style.background=\'\'">'
+'<td style="padding:5px 12px;font-size:13.5px;font-weight:600;color:#dbe6f2;vertical-align:top;">'+lead+(lead?' ':'')+(x.name||tk)+' <span style="color:#7f97b0;font-size:11px;">'+tk+'</span></td>'
+'<td style="padding:5px 8px;text-align:right;white-space:nowrap;vertical-align:top;"><span style="font-size:13px;font-weight:800;color:'+c+';">'+(cr==null?'-':((cr>0?'+':'')+Number(cr).toFixed(2)+'%'))+'</span>'+_ghExtHtml(code,x.code)+'</td>'
+'<td style="padding:5px 8px;text-align:right;font-size:12.5px;color:#9fb2c6;white-space:nowrap;vertical-align:top;">'+_ghFmtVal(x.value,code)+'</td>'
+'<td style="padding:5px 12px 5px 8px;text-align:right;font-size:12.5px;color:#9fb2c6;white-space:nowrap;vertical-align:top;">'+_ghFmtVal(x.mcap,code)+'</td>'
+'</tr>';}).join('');const idx=ord.indexOf(s);const prevS=idx>0?ord[idx-1]:null;const nextS=(idx>=0&&idx<ord.length-1)?ord[idx+1]:null;const navBtn=(label,target)=>target?'<span onclick="openGhSector(\''+_ghEsc(target)+'\',\''+scope+'\')" title="'+target+'" style="cursor:pointer;color:#9fb2c6;font-size:18px;padding:0 5px;user-select:none;border-radius:4px;" onmouseover="this.style.background=\'#1d3147\'" onmouseout="this.style.background=\'\'">'+label+'</span>':'<span style="color:#3a4a5e;font-size:18px;padding:0 5px;user-select:none;">'+label+'</span>';m.innerHTML='<div onclick="event.stopPropagation()" style="background:#13233a;border:1px solid #2d4b6b;border-radius:12px;max-width:580px;width:100%;max-height:84vh;overflow:auto;box-shadow:0 12px 40px rgba(0,0,0,.6);">'
+'<div style="position:sticky;top:0;background:#13233a;padding:10px 12px;border-bottom:1px solid #2d4b6b;display:flex;align-items:center;gap:6px;z-index:1;">'
+navBtn('‹',prevS)
+'<span style="font-size:15px;font-weight:800;color:#4ade80;">▣ '+s+'</span>'
+'<span style="font-size:12px;color:#7f97b0;">'+rows.length+'개 · 시총순</span>'
+navBtn('›',nextS)
+(ord.length?'<span style="font-size:11px;color:#6f8398;margin-left:4px;">'+(idx+1)+'/'+ord.length+'</span>':'')
+'<span onclick="document.getElementById(\'gh-sec-modal\').style.display=\'none\'" style="margin-left:auto;cursor:pointer;color:#7f97b0;font-size:22px;line-height:1;">&times;</span></div>'
+'<table style="width:100%;border-collapse:collapse;">'
+'<thead><tr style="color:#6f8398;font-size:11px;position:sticky;top:43px;background:#13233a;">'
+'<td style="padding:4px 12px;">종목</td><td style="padding:4px 8px;text-align:right;">등락</td>'
+'<td style="padding:4px 8px;text-align:right;">거래대금</td><td style="padding:4px 12px 4px 8px;text-align:right;">시총</td></tr></thead>'
+'<tbody>'+trs+'</tbody></table></div>';m.style.display='flex';m.scrollTop=0;}
function setGlOverview(it){const el=document.getElementById('gl-overview');if(!el)return;if(it&&it.overview){el.style.display='block';el.innerHTML='<div class="gov-title">🏢 기업 개요 <span style="font-size:11px;color:#6f8398;font-weight:500;">네이버</span></div>'
+'<div class="gov-body">'+String(it.overview).replace(/</g,'&lt;').replace(/\n/g,'<br>')+'</div>';}else{el.style.display='none';el.innerHTML='';}}
function ghClick(code,tk){const m=(GH_DATA.markets||{})[code];if(!m)return;const it=m.items.find(x=>String(x.ticker)===String(tk));if(!it)return;setGlOverview(it);const suf=code==='JP'?'.T':code==='HK'?'.HK':code==='TW'?'.TW':'';for(const k of[it.ticker,it.ticker+suf,(code==='HK'?it.ticker.padStart(4,'0')+'.HK':'')]){if(k&&GL_PEER&&GL_PEER[k]){glPopup(k);return;}}
ghPopupLite(it,code);}
function ghPopupLite(it,code){const yhMap={JP:'.T',TW:'.TW'};let yh=it.ticker;if(code==='JP')yh=it.ticker+'.T';else if(code==='TW')yh=it.ticker+'.TW';else if(code==='HK')yh=it.ticker.padStart(4,'0')+'.HK';else if(code==='CN')yh=it.ticker+(String(it.ticker)[0]==='6'?'.SS':'.SZ');const saExch={JP:'tyo',HK:'hkg',TW:'tpe',CN:(String(it.ticker)[0]==='6'?'sha':'she')}[code];const saUrl=code==='US'?'https://stockanalysis.com/stocks/'+it.ticker.toLowerCase()+'/':'https://stockanalysis.com/quote/'+saExch+'/'+it.ticker+'/';const tvUrl=it.exchange?('https://www.tradingview.com/symbols/'+it.exchange+'-'+it.ticker+'/'):'';document.getElementById('gl-nm').textContent=it.name||it.ticker;document.getElementById('gl-sub').textContent=it.ticker+(it.exchange?(' · '+it.exchange):'')+(it.sector?(' · '+it.sector):'');document.getElementById('gl-px').textContent=(it.close!=null)?Number(it.close).toLocaleString():'-';const chgEl=document.getElementById('gl-chg');if(typeof it.change==='number'){chgEl.textContent=(it.change>=0?'▲ +':'▼ ')+it.change.toFixed(2)+'%';chgEl.className='gchg '+(it.change>=0?'up':'dn');}
else chgEl.textContent='';document.getElementById('gl-ext').style.display='none';document.getElementById('gl-mk').textContent=(it.is_ath?'🏆 역사적 신고가(ATH)':'📈 52주 신고가');const cells=[['섹터',it.sector||'-'],['거래소',it.exchange||'-'],['52주고가',it.h52!=null?Number(it.h52).toLocaleString():'-'],['역대고가',it.hall!=null?Number(it.hall).toLocaleString():'-'],['현재가',it.close!=null?Number(it.close).toLocaleString():'-'],['시총',it.mcap?('$'+(it.mcap/1e9).toFixed(1)+'B'):'-']];document.getElementById('gl-metrics').innerHTML=cells.map(c=>'<div class="gcell"><span class="l">'+c[0]+'</span><span class="v">'+c[1]+'</span></div>').join('');document.getElementById('gl-ratings').innerHTML='<div class="rt-title">📋 상세</div><div class="empty" style="padding:8px;color:var(--muted);font-size:13px;">peer 미포함 종목 — 아래 링크에서 상세 확인</div>';document.getElementById('gl-links').innerHTML='<a href="https://finance.yahoo.com/quote/'+encodeURIComponent(yh)+'" target="_blank">Yahoo ↗</a>'
+'<a href="'+saUrl+'" target="_blank">StockAnalysis ↗</a>'
+(tvUrl?('<a href="'+tvUrl+'" target="_blank">TradingView ↗</a>'):'');document.getElementById('glmodal').classList.add('open');}
var TODAY_REPORTS=null;var KR_PRICES_LIVE=null;var KR_CLOSE_PRICES=null;var KR_MARKET_STATUS='';var _krPricesTimer=null;var TGTPRC_DATA=null;var TGTPRC_MONTHLY=null;var KR_ER_DATES=null;var KR_REPORTS_ER=null;var KR_REPORTS_1M=null;var KR_REPORTS_3M=null;var KR_REPORTS_6M=null;var KR_STOCK_META=null;var KR_REPORTS=null;async function ensureTodayReports(){if(TODAY_REPORTS)return TODAY_REPORTS;TODAY_REPORTS={};try{const rpList=BINDEX['report'];if(!rpList||!rpList.length)return TODAY_REPORTS;const res=await fetch(rpList[0].src);const html=await res.text();const doc=new DOMParser().parseFromString(html,'text/html');doc.querySelectorAll('tbody tr').forEach(tr=>{const tds=tr.querySelectorAll('td');if(tds.length<9)return;const link=tds[1].querySelector('a[href*="tradingview.com"]');if(!link)return;const m=link.href.match(/KRX(?::|%3A)(\d{6})/i);if(!m)return;const cd=m[1];if(!TODAY_REPORTS[cd])TODAY_REPORTS[cd]=[];TODAY_REPORTS[cd].push({date:tds[6]?tds[6].textContent.trim().replace(/-/g,''):'',firm:tds[4]?tds[4].textContent.trim():'',tp:tds[8]?parseInt(tds[8].textContent.replace(/[^0-9]/g,''))||null:null,title:tds[2]?tds[2].textContent.trim():'',smry:tds[3]?tds[3].textContent.trim():''});});}catch(e){console.warn('리포트 파싱 실패',e);}
return TODAY_REPORTS;}
async function fetchKrPricesLive(){try{const res=await fetch('/moneyweb/api/kr_prices_live.json?t='+Date.now());if(!res.ok)return;const data=await res.json();KR_PRICES_LIVE=data.prices||{};KR_MARKET_STATUS=data.market_status||'';const statusEl=document.getElementById('kpl-status');if(statusEl){const ms=data.market_status||'';const msLabel={KRX:'정규장',NXT_PRE:'NXT프리',NXT_EVE:'NXT야간',CLOSED:'장마감'}[ms]||ms;const dot=ms==='CLOSED'?'#64748b':'#22c55e';statusEl.innerHTML=`<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${dot};margin-right:4px;vertical-align:middle;"></span>${msLabel} ${data.updated_at ? data.updated_at.slice(11,16) : ''}`;}
const idMap={'KOSPI':'idx-KOSPI','KOSDAQ':'idx-KOSDAQ','K200F':'idx-K200F','KQ150F':'idx-KQ150F','EWY':'idx-EWY','DRAM':'idx-DRAM','K200F_NIGHT':'idx-K200F_NIGHT','KQ150F_NIGHT':'idx-KQ150F_NIGHT','USDKRW':'idx-USDKRW','NIKKEI':'idx-NIKKEI','SHCOMP':'idx-SHCOMP','TWII':'idx-TWII','DOW':'idx-DOW','NASDAQ':'idx-NASDAQ','S&P 500':'idx-SP500'};const indices=data.indices||{};for(const[nm,elId]of Object.entries(idMap)){const el=document.getElementById(elId);if(!el)continue;const idx=indices[nm];if(!idx)continue;const ud=idx.ud_rt;const clr=ud>0?'#ef4444':ud<0?'#3b82f6':'#94a3b8';const arrow=ud>0?'▲':ud<0?'▼':'';const valFmt=idx.val>=1000?idx.val.toLocaleString('ko-KR',{minimumFractionDigits:2,maximumFractionDigits:2}):idx.val.toFixed(2);el.querySelector('.value').textContent=valFmt;el.querySelector('.change').innerHTML=`<span style="color:${clr}">${arrow}${Math.abs(ud).toFixed(2)}%</span>`;}
const overlay=document.getElementById('sp-overlay');if(overlay&&overlay.style.display!=='none'){const cdEl=document.getElementById('sp-cd');if(cdEl&&cdEl.textContent)_spUpdateLivePrice(cdEl.textContent.trim());}}catch(e){}}
function _spUpdateLivePrice(cd){const lp=_getPrice(cd);if(!lp)return;const ud=lp.ud_rt;const clr=_clr(ud);const priceEl=document.getElementById('sp-price');const chgEl=document.getElementById('sp-chg');if(priceEl)priceEl.textContent=lp.curr_prc?_fmt(lp.curr_prc)+'원':'';if(chgEl)chgEl.innerHTML=ud!=null?`<span style="color:${clr}">${ud>0?'▲':ud<0?'▼':''}${Math.abs(ud).toFixed(2)}% (${ud>=0?'+':''}${_fmtWon(lp.ud_prc)})</span>`:'';const cards=document.getElementById('sp-price-cards');if(cards){const first=cards.querySelector('.sp-card');if(first){const valEl=first.querySelector('.val');if(valEl){valEl.textContent=_fmtWon(lp.curr_prc);valEl.style.color=clr;}}}}
async function fetchKrClosePrices(){try{const res=await fetch('/moneyweb/api/kr_close_prices.json?t='+Date.now());if(!res.ok)return;const data=await res.json();KR_CLOSE_PRICES=data.prices||{};}catch(e){}}
function _getPrice(cd){return(KR_PRICES_LIVE&&KR_PRICES_LIVE[cd])||(KR_CLOSE_PRICES&&KR_CLOSE_PRICES[cd])||null;}
function _startKrPricesPolling(){fetchKrClosePrices();fetchKrPricesLive();renderIndexSparklines();loadDrBinance();if(_krPricesTimer)clearInterval(_krPricesTimer);_krPricesTimer=setInterval(()=>{fetchKrPricesLive();renderIndexSparklines();loadDrBinance();},60*1000);}
const _SPARK_MAP={'idx-DOW':['kr','DOW'],'idx-NASDAQ':['kr','NASDAQ'],'idx-SP500':['kr','S&P 500'],'idx-RUSSELL':['us','RUT'],'ind-tny':['us','TNX'],'ind-dxy':['us','DXY'],'ind-vix':['us','VIX'],'ind-wti':['us','WTI'],'idx-SOX':['us','SOX'],'idx-EWY':['kr','EWY'],'idx-DRAM':['kr','DRAM'],'idx-K200F_NIGHT':['kr','K200F_NIGHT'],'idx-KQ150F_NIGHT':['kr','KQ150F_NIGHT'],'idx-USDKRW':['kr','USDKRW'],'idx-DOWF':['us','YM_F'],'idx-NASDAQF':['us','NQ_F'],'idx-SP500F':['us','ES_F'],'idx-KOSPI':['kr','KOSPI'],'idx-KOSDAQ':['kr','KOSDAQ'],'idx-K200F':['kr','K200F'],'idx-KQ150F':['kr','KQ150F'],'idx-NIKKEI':['kr','NIKKEI'],'idx-SHCOMP':['kr','SHCOMP'],'idx-TWII':['kr','TWII'],};function _prepSparkArr(arr,base){if(!arr||!arr.length)return arr;let s=0;while(s<arr.length-1&&arr[s]===arr[0])s++;let out=arr.slice(s);if(typeof base==='number'&&isFinite(base))out=[base,...out];return out;}
function _sparkSvg(arr,base,uid){if(!arr||arr.length<2)return'';const w=100,h=26,pad=2;const RED='#ef4444',BLUE='#3b82f6';const hasBase=(typeof base==='number'&&isFinite(base));let min=Math.min(...arr),max=Math.max(...arr);if(hasBase){min=Math.min(min,base);max=Math.max(max,base);}
const rng=(max-min)||1;const n=arr.length;const Y=v=>pad+(h-2*pad)*(1-(v-min)/rng);const X=i=>pad+(w-2*pad)*i/(n-1);const pts=arr.map((v,i)=>X(i).toFixed(1)+','+Y(v).toFixed(1)).join(' ');if(!hasBase){const c=arr[arr.length-1]>=arr[0]?RED:BLUE;return`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">`
+`<polyline fill="none" stroke="${c}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" points="${pts}"/>`
+`</svg>`;}
const bY=Y(base);const idU='su_'+uid,idD='sd_'+uid;return`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">`
+`<defs>`
+`<clipPath id="${idU}"><rect x="0" y="0" width="${w}" height="${bY.toFixed(2)}"/></clipPath>`
+`<clipPath id="${idD}"><rect x="0" y="${bY.toFixed(2)}" width="${w}" height="${(h - bY).toFixed(2)}"/></clipPath>`
+`</defs>`
+`<line x1="0" y1="${bY.toFixed(2)}" x2="${w}" y2="${bY.toFixed(2)}" stroke="#9aa4b2" stroke-width="0.6" stroke-dasharray="2 2" vector-effect="non-scaling-stroke"/>`
+`<polyline fill="none" stroke="${RED}"  stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" points="${pts}" clip-path="url(#${idU})"/>`
+`<polyline fill="none" stroke="${BLUE}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" points="${pts}" clip-path="url(#${idD})"/>`
+`</svg>`;}
async function renderIndexSparklines(){let kr={},us={},krB={},usB={},krLS={},usLS={};try{const j=await fetch('/moneyweb/api/kr_index_history.json?t='+Date.now()).then(r=>r.json());kr=j.points||{};krB=j.base||{};krLS=j.last_session||{};}catch(e){}
try{const j=await fetch('/moneyweb/api/us_index_history.json?t='+Date.now()).then(r=>r.json());us=j.points||{};usB=j.base||{};usLS=j.last_session||{};}catch(e){}
for(const[id,[src,key]]of Object.entries(_SPARK_MAP)){const card=document.getElementById(id);if(!card)continue;const holder=card.querySelector('.spark');if(!holder)continue;const pts=(src==='kr'?kr:us)[key];const ls=(src==='kr'?krLS:usLS)[key];let arr,base;if(pts&&new Set(pts).size>=2){arr=pts;base=(src==='kr'?krB:usB)[key];}else if(ls&&ls.curve&&ls.curve.length>=2){arr=ls.curve;base=ls.base;}else{arr=pts;base=(src==='kr'?krB:usB)[key];}
holder.innerHTML=_sparkSvg(_prepSparkArr(arr,base),base,id);}}
function _livePriceTag(cd){const lp=_getPrice(cd);if(!lp)return'';const ud=lp.ud_rt;const clr=ud>0?'#ef4444':ud<0?'#3b82f6':'#94a3b8';const sg=ud>0?'+':'';return`<span style="font-size:13px;color:${clr};white-space:nowrap;margin-left:4px;">${_fmt(lp.curr_prc)} (${sg}${ud.toFixed(2)}%)</span>`;}
async function ensureTgtprcData(){if(TGTPRC_DATA)return TGTPRC_DATA;TGTPRC_DATA={};TGTPRC_MONTHLY={};try{const list=BINDEX['kr-tgtprc'];if(!list||!list.length)return TGTPRC_DATA;const res=await fetch(list[0].src+(list[0].src.indexOf('?')<0?'?':'&')+'t='+Date.now());const html=await res.text();const lines=html.split('\n');const sLine=lines.find(l=>/^\s*(?:const|var|let)\s+STOCKS\s*=/.test(l));const mLine=lines.find(l=>/^\s*(?:const|var|let)\s+MONTHLY\s*=/.test(l));if(sLine){const stocks=new Function(sLine.trim()+'; return STOCKS;')();stocks.forEach(s=>{TGTPRC_DATA[s.itm_cd]=s;});}
if(mLine){TGTPRC_MONTHLY=new Function(mLine.trim()+'; return MONTHLY;')();}}catch(e){console.warn('tgtprc 로드 실패',e);}
return TGTPRC_DATA;}
const _NC={cache:'no-cache'};async function ensureKrStockMeta(){if(KR_STOCK_META)return KR_STOCK_META;KR_STOCK_META={};try{const res=await fetch('/moneyweb/api/kr_stock_meta.json?t='+Date.now(),_NC);KR_STOCK_META=await res.json();}catch(e){console.warn('kr_stock_meta 로드 실패',e);}
return KR_STOCK_META;}
async function ensureKrReports(){if(KR_REPORTS)return KR_REPORTS;KR_REPORTS={};try{const res=await fetch('/moneyweb/api/kr_reports.json?t='+Date.now(),_NC);KR_REPORTS=await res.json();}catch(e){console.warn('kr_reports 로드 실패',e);}
return KR_REPORTS;}
async function ensureErDates(){if(KR_ER_DATES)return KR_ER_DATES;KR_ER_DATES={};try{const res=await fetch('/moneyweb/api/kr_er_dates.json?t='+Date.now(),_NC);KR_ER_DATES=await res.json();}catch(e){console.warn('kr_er_dates 로드 실패',e);}
return KR_ER_DATES;}
async function ensureReportsEr(){if(KR_REPORTS_ER)return KR_REPORTS_ER;KR_REPORTS_ER={};try{const res=await fetch('/moneyweb/api/kr_reports_er.json?t='+Date.now(),_NC);KR_REPORTS_ER=await res.json();}catch(e){console.warn('kr_reports_er 로드 실패',e);}
return KR_REPORTS_ER;}
async function ensureReports1m(){if(KR_REPORTS_1M)return KR_REPORTS_1M;KR_REPORTS_1M={};try{const res=await fetch('/moneyweb/api/kr_reports_1m.json?t='+Date.now(),_NC);KR_REPORTS_1M=await res.json();}catch(e){console.warn('kr_reports_1m 로드 실패',e);}
return KR_REPORTS_1M;}
async function ensureReports3m(){if(KR_REPORTS_3M)return KR_REPORTS_3M;KR_REPORTS_3M={};try{const res=await fetch('/moneyweb/api/kr_reports_3m.json?t='+Date.now(),_NC);KR_REPORTS_3M=await res.json();}catch(e){console.warn('kr_reports_3m 로드 실패',e);}
return KR_REPORTS_3M;}
async function ensureReports6m(){if(KR_REPORTS_6M)return KR_REPORTS_6M;KR_REPORTS_6M={};try{const res=await fetch('/moneyweb/api/kr_reports_6m.json?t='+Date.now(),_NC);KR_REPORTS_6M=await res.json();}catch(e){console.warn('kr_reports_6m 로드 실패',e);}
return KR_REPORTS_6M;}
function _buildRptObj(cd){const raw=(KR_REPORTS&&KR_REPORTS[cd])||[];if(!raw.length)return null;const tps=raw.map(r=>r.tp).filter(Boolean);return{avg_tp:tps.length?Math.round(tps.reduce((a,b)=>a+b,0)/tps.length):null,max_tp:tps.length?Math.max(...tps):null,min_tp:tps.length?Math.min(...tps):null,cnt:raw.length,items:raw,};}
async function openKrStock(cd,nm=''){const _need=[ensureTgtprcData(),ensureKrStockMeta(),ensureKrReports()];if(!KR_PRICES_LIVE||!Object.keys(KR_PRICES_LIVE).length)_need.push(fetchKrPricesLive());if(!KR_CLOSE_PRICES||!Object.keys(KR_CLOSE_PRICES).length)_need.push(fetchKrClosePrices());await Promise.all(_need);_spRender(cd,_buildPopupData(cd,nm));document.getElementById('sp-overlay').style.display='block';document.body.style.overflow='hidden';}
async function openKrStockByName(name){await Promise.all([ensureTgtprcData(),ensureKrStockMeta()]);let cd=null;if(TGTPRC_DATA){for(const[k,v]of Object.entries(TGTPRC_DATA)){if(v.itm_nm===name){cd=k;break;}}}
if(!cd&&KR_STOCK_META){for(const[k,v]of Object.entries(KR_STOCK_META)){if(v.nm===name){cd=k;break;}}}
if(!cd){console.warn('종목 코드 없음:',name);return;}
openKrStock(cd,name);}
function openPopup(cd){openKrStock(cd);}
function closePopup(){document.getElementById('sp-overlay').style.display='none';document.body.style.overflow='';}
const _UK='ml_user';function openUserPanel(){document.getElementById('up-overlay').classList.add('open');_renderUserPanel();}
function closeUserPanel(){document.getElementById('up-overlay').classList.remove('open');}
function _getUser(){try{return JSON.parse(localStorage.getItem(_UK)||'null');}catch(e){return null;}}
function _saveUser(u){localStorage.setItem(_UK,JSON.stringify(u));}
function _renderUserPanel(){const user=_getUser();const body=document.getElementById('up-body');const avEl=document.getElementById('up-av-main');const nmEl=document.getElementById('up-hd-name');const sbEl=document.getElementById('up-hd-sub');if(!user){avEl.textContent='?';if(nmEl)nmEl.textContent='로그인';if(sbEl)sbEl.textContent='마켓레이더 회원이 되세요';const tiers=[{v:'free',l:'무료',d:'기본 열람'},{v:'starter',l:'스타터',d:'추가 기능 예정'},{v:'premium',l:'프리미엄',d:'전체 무제한'},];body.innerHTML=`
      <div class="up-form-group">
        <label class="up-label">이름 (닉네임)</label>
        <input class="up-input" id="up-uname" type="text" placeholder="홍길동"/>
      </div>
      <div class="up-form-group">
        <label class="up-label">이메일 (선택)</label>
        <input class="up-input" id="up-email" type="email" placeholder="example@email.com"/>
      </div>
      <div class="up-form-group">
        <label class="up-label">구독 플랜</label>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:6px;">
          ${tiers.map((t,i) => `<div class="tier-sel${i===0?' selected':''}"data-v="${t.v}"
onclick="document.querySelectorAll('.tier-sel').forEach(e=>e.classList.remove('selected'));this.classList.add('selected');"><div style="font-size: 16.5px;font-weight:700;color:#e2e8f0;">${t.l}</div><div style="font-size: 14.2px;color:#64748b;margin-top:3px;">${t.d}</div></div>`).join('')}
        </div>
      </div>
      <button class="btn-primary" style="width:100%;margin-top:8px;" onclick="_doLogin()">시작하기</button>
      <div style="font-size: 16.5px;color:#64748b;text-align:center;margin-top:10px;">로컬 저장 · 별도 서버 연동 예정</div>`;}else{const ini=(user.name||'?')[0];avEl.textContent=ini;document.getElementById('user-avatar').textContent=ini;if(nmEl)nmEl.textContent=user.name||'회원';if(sbEl)sbEl.textContent=user.email||'마켓레이더 회원';const tierMap={free:'무료',starter:'스타터',premium:'프리미엄'};const tierCls={free:'tier-free',starter:'tier-starter',premium:'tier-premium'};const tl=tierMap[user.tier]||'무료';const tc=tierCls[user.tier]||'tier-free';const ideaCnt=(JSON.parse(localStorage.getItem('ml_ideas')||'[]')).length;body.innerHTML=`
      <div class="up-profile-card">
        <div class="up-av-lg">${ini}</div>
        <div>
          <div style="font-size: 22.5px;font-weight:800;color:#e2e8f0;">${user.name}</div>
          <span class="up-tier ${tc}">${tl}</span>
          <div style="font-size: 16.5px;color:#64748b;margin-top:5px;">가입일: ${user.joinDate || '-'}</div>
        </div>
      </div>
      <div class="up-stat-row">
        <div class="up-stat-card">
          <div class="lbl">저장된 아이디어</div>
          <div class="val" style="color:#3b82f6;">${ideaCnt}</div>
        </div>
        <div class="up-stat-card">
          <div class="lbl">열람 가능 콘텐츠</div>
          <div class="val" style="color:#22d3a0;">전체</div>
        </div>
      </div>
      <div class="up-divider"></div>
      <div class="up-mi" onclick="closeUserPanel();switchTab('idea',document.querySelector('[data-tab=\\'idea\\']'))">
        <span class="ico">💡</span> 내 투자아이디어
        ${ideaCnt > 0 ? `<span style="margin-left:auto;font-size: 16.5px;background:#1e2d47;color:#94a3b8;padding:1px 8px;border-radius:8px;">${ideaCnt}</span>` : ''}
      </div>
      <div class="up-mi" onclick="alert('알림 설정 준비중')">
        <span class="ico">🔔</span> 알림 설정
      </div>
      <div class="up-mi" onclick="alert('구독 관리 준비중')">
        <span class="ico">💳</span> 구독 관리
        <span style="font-size: 14.2px;margin-left:auto;background:rgba(245,158,11,.15);color:#f59e0b;padding:1px 6px;border-radius:4px;font-weight:700;">${tl}</span>
      </div>
      <div class="up-divider"></div>
      <div class="up-mi" onclick="_doLogout()" style="color:#f87171;">
        <span class="ico">🚪</span> 로그아웃
      </div>`;}}
function _doLogin(){const name=(document.getElementById('up-uname')||{}).value?.trim()||'';const email=(document.getElementById('up-email')||{}).value?.trim()||'';const sel=document.querySelector('.tier-sel.selected');const tier=sel?sel.dataset.v:'free';if(!name){alert('이름을 입력하세요.');return;}
const now=new Date();const d=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;_saveUser({name,email,tier,joinDate:d});_renderUserPanel();_mlApplyProtect();}
function _doLogout(){if(!confirm('로그아웃 하시겠습니까?'))return;localStorage.removeItem(_UK);document.getElementById('user-avatar').textContent='김';_renderUserPanel();_mlApplyProtect();}
function spTab(btn,tab){document.querySelectorAll('.sp-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.sp-panel').forEach(p=>p.style.display='none');document.getElementById('sp-tab-'+tab).style.display='block';}
function _fmt(n){if(!n)return'-';return Number(n).toLocaleString('ko-KR');}
function _clr(v){const n=parseFloat(v);if(isNaN(n)||n===0)return'#94a3b8';return n>0?'#f87171':'#34d399';}
function _fmtWon(n){return n?_fmt(n)+'원':'-';}
function _buildPopupData(cd,nm){const tgt=TGTPRC_DATA&&TGTPRC_DATA[cd];const meta=KR_STOCK_META&&KR_STOCK_META[cd];const rpt=_buildRptObj(cd);const live=_getPrice(cd);return{price:{itm_cd:cd,itm_nm:nm||(tgt&&tgt.itm_nm)||(meta&&meta.nm)||cd,mkt_nm:(meta&&meta.mkt)||null,sctr_nm:(meta&&meta.sctr)||null,mktcap:(meta&&meta.mktcap)||null,lstd_stc_cnt:(meta&&meta.lstd_stc_cnt)||null,eprc:(live&&live.curr_prc)||(tgt&&tgt.cur_prc)||null,sprc:(live&&live.open_prc)||null,hprc:(live&&live.high_prc)||null,lprc:(live&&live.low_prc)||null,trd_vol:(live&&live.trd_vol)||null,ud_rt:(live&&live.ud_rt!=null)?live.ud_rt:null,ud_prc:(live&&live.ud_prc!=null)?live.ud_prc:null,w52_h:(meta&&meta.w52_h)||null,w52_l:(meta&&meta.w52_l)||null,},consensus:{avg_tp:(tgt&&tgt.avg_tgt)||null,min_tp:(tgt&&tgt.min_tgt)||null,max_tp:(tgt&&tgt.max_tgt)||null,brk_cnt:(tgt&&tgt.brk_cnt)||null,upside:(tgt&&tgt.upside)||null,fwd_per:(meta&&meta.fwd_per)||null,trail_per:(meta&&meta.trail_per)||null,rt_1w:(meta&&meta.rt_1w)||null,opr_cns:(meta&&meta.opr_cns)||null,yoy_rt:(meta&&meta.yoy_rt)||null,cns_chg:(meta&&meta.cns_chg)||null,},reports:rpt||{},investor:[],earnings:(meta&&meta.earnings)||[],estimates:(meta&&meta.estimates)||[],annual:(meta&&meta.annual)||[],mktcap:(meta&&meta.mktcap)||null,biz_smry:(meta&&meta.biz_smry)||'',};}
function _spRender(cd,d){const p=d.price;const ud=p.ud_rt;const clr=_clr(ud||0);document.getElementById('sp-nm').textContent=p.itm_nm||cd;document.getElementById('sp-cd').textContent=cd;document.getElementById('sp-mkt').textContent=p.mkt_nm||'';document.getElementById('sp-sctr').textContent=p.sctr_nm||'';document.getElementById('sp-price').textContent=p.eprc?_fmt(p.eprc)+'원':'';document.getElementById('sp-chg').innerHTML=ud!=null?`<span style="color:${clr}">${ud>0?'▲':ud<0?'▼':''}${Math.abs(ud).toFixed(2)}% (${ud>=0?'+':''}${_fmtWon(p.ud_prc)})</span>`:'';const cns=d.consensus||{};const mktcapTxt=p.mktcap?p.mktcap+(p.mktcap_rank?` (${p.mktcap_rank}위)`:''):'-';document.getElementById('sp-badges').innerHTML=[['시가총액',mktcapTxt],['상장주식수',p.lstd_stc_cnt?_fmt(p.lstd_stc_cnt)+'주':'-'],['52주 최고',_fmtWon(p.w52_h)],['52주 최저',_fmtWon(p.w52_l)],['FWD PER',cns.fwd_per||'-'],['PER',cns.trail_per||'-'],].map(([l,v])=>`<span style="color:#64748b">${l}: <b style="color:#cbd5e1">${v}</b></span>`).join(' · ');const _lnkS='display:inline-flex;align-items:center;gap:4px;background:#162033;border:1px solid #1e2d47;border-radius:6px;padding:3px 8px;color:#94a3b8;font-size:11px;font-weight:600;text-decoration:none;white-space:nowrap;transition:background .15s;';document.getElementById('sp-ext-links').innerHTML=`<a href="https://www.tradingview.com/chart/?symbol=KRX:${cd}" target="_blank" style="${_lnkS}">📈 TradingView</a>`+`<a href="https://finance.naver.com/item/main.naver?code=${cd}" target="_blank" style="${_lnkS}">📊 네이버</a>`+`<a href="https://comp.fnguide.com/SVO2/ASP/SVD_Main.asp?pGB=1&gicode=A${cd}" target="_blank" style="${_lnkS}">🔍 컨센서스</a>`+`<a onclick="copyStockLink('${cd}',this)" style="${_lnkS}cursor:pointer;">🔗 링크복사</a>`;document.getElementById('sp-chart-links').innerHTML=`<div style="display:flex;gap:4px;margin-bottom:8px;">
      ${[['day','일'],['week','주'],['month','월'],['month','년']].map(([per,lbl],i)=>
        `<button class="chart-period-btn${i===0?' active':''}"
onclick="document.getElementById('sp-nv-chart').src='https://ssl.pstatic.net/imgfinance/chart/item/candle/${per}/${cd}.png?t='+Date.now();this.closest('div').querySelectorAll('.chart-period-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');">${lbl}</button>`
      ).join('')}
    </div>
    <div style="border:1px solid #1e2d47;border-radius:8px;overflow:hidden;background:#0a1020;">
      <img id="sp-nv-chart"
           src="https://ssl.pstatic.net/imgfinance/chart/item/candle/day/${cd}.png"
           style="width:100%;display:block;min-height:120px;"
           onerror="this.parentElement.innerHTML='<div style=\'padding:20px;text-align:center;color:#64748b;font-size: 18px;\'>차트 이미지 로드 실패</div>'">
    </div>`;const w52El=document.getElementById('sp-52w-bar');if(w52El){if(p.w52_h&&p.w52_l&&p.eprc){const range=p.w52_h-p.w52_l;const pos=range>0?Math.min(100,Math.max(0,((p.eprc-p.w52_l)/range*100))).toFixed(1):50;w52El.style.display='block';w52El.innerHTML=`<div class="sp-range-wrap">
        <div style="display:flex;justify-content:space-between;font-size: 16.5px;color:#64748b;margin-bottom:4px;">
          <span>52주 저점 <b style="color:#34d399">${_fmt(p.w52_l)}원</b></span>
          <span style="color:#e2e8f0;font-weight:700;">현재가 위치 ${pos}%</span>
          <span>52주 고점 <b style="color:#f87171">${_fmt(p.w52_h)}원</b></span>
        </div>
        <div class="sp-range-track">
          <div class="sp-range-fill"></div>
          <div class="sp-range-marker" style="left:${pos}%;" title="${_fmt(p.eprc)}원"></div>
        </div>
      </div>`;}else{w52El.style.display='none';w52El.innerHTML='';}}
document.getElementById('sp-price-section-lbl').style.display='block';document.getElementById('sp-investor-section').style.display='block';const trdAmt=(p.eprc&&p.trd_vol)?Math.round(p.eprc*p.trd_vol/1e8):null;document.getElementById('sp-price-cards').innerHTML=[{l:'현재가',v:_fmtWon(p.eprc),c:ud!=null?_clr(ud):'#e2e8f0'},{l:'시가',v:_fmtWon(p.sprc),c:'#94a3b8'},{l:'고가',v:_fmtWon(p.hprc),c:'#f87171'},{l:'저가',v:_fmtWon(p.lprc),c:'#34d399'},{l:'거래량',v:_fmt(p.trd_vol),c:'#94a3b8'},{l:'거래대금',v:trdAmt!=null?_fmt(trdAmt)+'억':'-',c:'#94a3b8'},].map(o=>`<div class="sp-card"><div class="lbl">${o.l}</div><div class="val" style="color:${o.c}">${o.v}</div></div>`).join('');_renderInvestorTable(d.investor||[]);_renderRecentEarnings(d.earnings||[],d.estimates||[],d.annual||[],d.mktcap||null,d.consensus||{},cd);_renderDisclosureTab(cd);_renderOrderTab(cd);_renderReports(d.reports||{},p.eprc,d.consensus||{});_renderFinance(d,p);document.querySelectorAll('.sp-tab').forEach((b,i)=>b.classList.toggle('active',i===0));document.querySelectorAll('.sp-panel').forEach((p,i)=>p.style.display=i===0?'block':'none');}
function _renderInvestorTable(flows){const el=document.getElementById('sp-investor-chart');if(!flows||!flows.length){el.innerHTML='<div style="color:#64748b;font-size: 18px;padding:8px 0;">수급 데이터 없음</div>';return;}
const recent=flows.slice(-10).reverse();const cols=['외국인','기관합계','개인'];const colClr={'외국인':'#38bdf8','기관합계':'#a78bfa','개인':'#f59e0b'};const fmt=v=>{const n=Math.round(v/1e8);const clr=n>0?'#22d3a0':n<0?'#f87171':'#64748b';const txt=n>0?'+'+n.toLocaleString('ko-KR'):n.toLocaleString('ko-KR');return`<td style="padding:6px 8px;text-align:right;font-size: 18px;color:${clr};font-weight:600;font-variant-numeric:tabular-nums;">${txt}</td>`;};const ths=cols.map(c=>`<th style="padding:6px 8px;text-align:right;font-size: 16.5px;color:${colClr[c]};font-weight:700;">${c}</th>`).join('');const rows=recent.map(f=>{const dt=f.ymd?f.ymd.slice(4,6)+'/'+f.ymd.slice(6):'';return`<tr style="border-top:1px solid #1e2d47;">
      <td style="padding:6px 8px;font-size: 16.5px;color:#64748b;white-space:nowrap;">${dt}</td>
      ${cols.map(c => fmt(f[c] || 0)).join('')}
    </tr>`;}).join('');el.innerHTML=`<div style="overflow-x:auto;">
    <table style="width:100%;border-collapse:collapse;background:#162033;border-radius:8px;overflow:hidden;border:1px solid #1e2d47;">
      <thead><tr style="background:#0f1829;">
        <th style="padding:6px 8px;text-align:left;font-size: 16.5px;color:#64748b;font-weight:600;">날짜</th>${ths}
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;}
function _renderRecentEarnings(earnings,estimates,annual,mktcap,cns,cd){const el=document.getElementById('sp-recent-earnings');if(!earnings||!earnings.length){el.innerHTML='';return;}
const recent=earnings.slice(-5);const estQ=(estimates||[]).filter(e=>e.type==='Q');const estY=(estimates||[]).filter(e=>e.type==='Y');const ann=(annual||[]).slice(0,1)[0];const allCols=[...recent,...estQ];function _niVal(e,isEst){const raw=e['순이익'];if(raw==null)return null;return isEst?Math.round(raw):Math.round(raw/1e8);}
function _fVal(e,key,isEst){const raw=e[key];if(raw==null)return null;return isEst?Math.round(raw):Math.round(raw/1e8);}
function _per(ni_uk){if(!mktcap||!ni_uk||ni_uk<=0)return null;return(mktcap/ni_uk).toFixed(1);}
function _isNum(v){return v!=null&&!isNaN(v);}
const ths=allCols.map((e,i)=>{const isEst=i>=recent.length;const isFirst=isEst&&i===recent.length;const label=`${e.year}.${e.quarter}`;const clr=isEst?'#60a5fa':'#94a3b8';const bl=isFirst?'border-left:1px dashed #1e3a5f;':'';const sfx=isEst?'<span style="font-size:11px;opacity:.7;">(E)</span>':'';return`<th style="padding:7px 10px;font-size:16px;color:${clr};font-weight:600;text-align:right;${bl}">${label}${sfx}</th>`;}).join('');function makeRow(label,valFn){const tds=allCols.map((e,i)=>{const isEst=i>=recent.length;const isFirst=isEst&&i===recent.length;const v=valFn(e,isEst);const txt=v!=null?v.toLocaleString('ko-KR')+'<span style="font-size:11px;opacity:.7;">억</span>':'-';const clr=label!=='매출액'&&_isNum(v)?(v>=0?(isEst?'#93c5fd':'#f1f5f9'):'#f87171'):(isEst?'#93c5fd':'#f1f5f9');const bl=isFirst?'border-left:1px dashed #1e3a5f;':'';return`<td style="padding:7px 10px;font-size:18px;color:${clr};text-align:right;white-space:nowrap;${bl}">${txt}</td>`;}).join('');return`<tr style="border-top:1px solid #1e2d47;">
      <td style="padding:7px 10px;font-size:18px;color:#94a3b8;white-space:nowrap;">${label}</td>${tds}</tr>`;}
const rows=makeRow('매출액',(e,isEst)=>_fVal(e,'매출액',isEst))
+makeRow('영업이익',(e,isEst)=>_fVal(e,'영업이익',isEst))
+makeRow('순이익',(e,isEst)=>_niVal(e,isEst));let guidanceHtml='';const annualCols=annual||[];const guidanceCols=[...annualCols.map(a=>({...a,_type:'actual'})),...estY.map(e=>({...e,_type:'est'}))];if(guidanceCols.length){const gThs=guidanceCols.map(e=>{const isEst=e._type==='est';const clr=isEst?'#60a5fa':'#a78bfa';const sfx=isEst?'<span style="font-size:11px;opacity:.7;">(E)</span>':'';return`<th style="padding:7px 10px;font-size:16px;color:${clr};font-weight:600;text-align:right;">${e.year}${sfx}</th>`;}).join('');function gRow(label,key,isNI){const tds=guidanceCols.map(e=>{const isEst=e._type==='est';const v=isNI?(e['순이익']!=null?Math.round(e['순이익']):null):(e[key]!=null?Math.round(e[key]):null);const txt=v!=null?v.toLocaleString('ko-KR')+'<span style="font-size:11px;opacity:.7;">억</span>':'-';const clr=(isNI||key==='영업이익')&&_isNum(v)?(v>=0?(isEst?'#93c5fd':'#c4b5fd'):'#f87171'):(isEst?'#93c5fd':'#c4b5fd');return`<td style="padding:7px 10px;font-size:18px;color:${clr};text-align:right;white-space:nowrap;">${txt}</td>`;}).join('');return`<tr style="border-top:1px solid #1e2d47;">
        <td style="padding:7px 10px;font-size:18px;color:#94a3b8;white-space:nowrap;">${label}</td>${tds}</tr>`;}
const firstEstYear=estY.length?estY[0].year:null;function gPerRow(){const tds=guidanceCols.map((e,i)=>{const isEst=e._type==='est';let perVal=null;if(!isEst){perVal=e.per!=null?parseFloat(e.per).toFixed(1):null;}else if(e.year===firstEstYear&&cns.fwd_per){perVal=parseFloat(cns.fwd_per).toFixed(1);}else{const ni=e['순이익']!=null?Math.round(e['순이익']):null;perVal=_per(ni,false);}
const txt=perVal!=null?`${perVal}x`:'-';return`<td style="padding:7px 10px;font-size:18px;color:${perVal!=null?'#fbbf24':'#475569'};text-align:right;">${txt}</td>`;}).join('');return`<tr style="border-top:1px solid #1e2d47;">
        <td style="padding:7px 10px;font-size:18px;color:#94a3b8;white-space:nowrap;">PER</td>${tds}</tr>`;}
const gRows=gRow('매출액','매출액',false)+gRow('영업이익','영업이익',false)
+gRow('순이익','',true)+gPerRow();guidanceHtml=`<div style="font-size:18px;color:#64748b;font-weight:700;margin:16px 0 8px;letter-spacing:.04em;">연간 실적·가이던스 (억원) <span style="font-size:13px;font-weight:400;color:#a78bfa;">실적</span> <span style="font-size:13px;font-weight:400;color:#3b82f6;">(E) 컨센서스</span></div>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;background:#162033;border-radius:8px;overflow:hidden;border:1px solid #1e2d47;">
          <thead><tr style="background:#0f1829;">
            <th style="padding:7px 10px;font-size:16px;color:#64748b;text-align:left;font-weight:600;">항목</th>${gThs}
          </tr></thead>
          <tbody>${gRows}</tbody>
        </table>
      </div>`;}
const estLabel=estQ.length?` <span style="font-size:13px;font-weight:400;color:#3b82f6;">│ <span style="color:#60a5fa;">(E)</span> 컨센서스</span>`:'';el.innerHTML=`<div style="font-size:18px;color:#64748b;font-weight:700;margin-bottom:8px;letter-spacing:.04em;">분기 실적 (억원)${estLabel}</div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;background:#162033;border-radius:8px;overflow:hidden;border:1px solid #1e2d47;">
        <thead><tr style="background:#0f1829;">
          <th style="padding:7px 10px;font-size:16px;color:#64748b;text-align:left;font-weight:600;">항목</th>${ths}
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>${guidanceHtml}`;}
let _DART_DISCLOSURES=null;let _DART_LOADING=false;async function _ensureDartDisclosures(){if(_DART_DISCLOSURES)return;if(_DART_LOADING){await new Promise(r=>{const t=setInterval(()=>{if(_DART_DISCLOSURES){clearInterval(t);r();}},50);});return;}
_DART_LOADING=true;try{const res=await fetch('/moneyweb/api/dart_disclosures.json?t='+Date.now(),_NC);_DART_DISCLOSURES=await res.json();}catch(e){_DART_DISCLOSURES={};}
_DART_LOADING=false;}
let _ORDER_BACKLOG=null,_ORDER_LOADING=false;async function _ensureOrderBacklog(){if(_ORDER_BACKLOG)return;if(_ORDER_LOADING){await new Promise(r=>{const t=setInterval(()=>{if(_ORDER_BACKLOG){clearInterval(t);r();}},50);});return;}
_ORDER_LOADING=true;try{const res=await fetch('/moneyweb/api/order_backlog.json?t='+Date.now(),_NC);_ORDER_BACKLOG=await res.json();}catch(e){_ORDER_BACKLOG={};}
_ORDER_LOADING=false;}
function _won억(v){if(v==null)return'-';const e=v/1e8;if(Math.abs(e)>=10000)return(e/10000).toLocaleString('ko-KR',{maximumFractionDigits:2})+'조';return Math.round(e).toLocaleString('ko-KR')+'억';}
function _esc(s){return(s==null?'':String(s)).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
async function _renderOrderTab(cd){const btn=document.getElementById('sp-tab-btn-order');const kpi=document.getElementById('sp-order-kpi');if(btn)btn.style.display='none';if(kpi)kpi.innerHTML='';await _ensureOrderBacklog();const data=_ORDER_BACKLOG&&_ORDER_BACKLOG[cd];if(!data||!data.events||!data.events.length)return;if(btn)btn.style.display='';_renderOrderBacklog(cd,_ORDER_BACKLOG);if(kpi){const k=_obKpis(data);const conf=data.confirmed_latest||null;const label=conf?'확정 수주잔고':'추정 수주잔고';const val=conf||k.backlogNow;const btbTxt=k.btb!=null?` · B2B <b style="color:${k.btb>=1?'#22c55e':'#94a3b8'};">${k.btb.toFixed(2)}x</b>`:'';kpi.innerHTML=`<div onclick="_spGoOrder()" title="수주 상세 보기"
         style="cursor:pointer;background:linear-gradient(90deg,#1a2740,#162033);border:1px solid #2a3b57;border-radius:8px;padding:11px 14px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;gap:10px;">
        <div style="white-space:nowrap;"><span style="font-size:13px;color:#94a3b8;">${label}</span>
          <b style="font-size:20px;color:#f59e0b;margin-left:8px;">${_won억(val)}</b>
          <span style="font-size:13px;color:#64748b;margin-left:6px;">· 신규 ${data.cnt}건${btbTxt}</span></div>
        <div style="font-size:13px;color:#38bdf8;white-space:nowrap;">수주 상세 ›</div>
      </div>`;}}
function _spGoOrder(){const b=document.getElementById('sp-tab-btn-order');if(b)spTab(b,'order');}
let _OB_MODE={};function _obMode(cd,m){_OB_MODE[cd]=m;_renderOrderBacklog(cd,_ORDER_BACKLOG);}
const _obT=s=>s?new Date(s.indexOf('.')>0?s.replace(/\./g,'-'):s).getTime():null;function _obAgg(events,unit){const m=new Map();for(const e of events){if(e.kind!=='신규'||!e.amt)continue;const[y,mo]=e.dt.split('.');const key=unit==='q'?`${y}.${Math.floor((+mo-1)/3)+1}Q`:`${y}.${mo}`;m.set(key,(m.get(key)||0)+e.amt);}
return[...m.entries()].map(([label,amt])=>({label,amt})).sort((a,b)=>a.label<b.label?-1:1);}
function _obBacklog(events){const cs=events.filter(e=>e.kind==='신규'&&e.amt).map(e=>{const announce=_obT(e.dt);const st=_obT(e.start)||announce;let en=_obT(e.end);if(!en||en<=st)en=st+3*365*864e5;return{amt:e.amt,announce,st,en};}).filter(c=>c.announce);if(!cs.length)return[];const t0=Math.min(...cs.map(c=>c.announce)),t1=Date.now();const months=Math.max(2,Math.min(48,Math.round((t1-t0)/(30.4*864e5))+1));const pts=[];for(let i=0;i<=months;i++){const t=t0+(t1-t0)*i/months;let v=0;for(const c of cs){if(t<c.announce)continue;let d=t<=c.st?0:t>=c.en?1:(t-c.st)/(c.en-c.st);v+=c.amt*(1-d);}
pts.push({t,v});}
return pts;}
function _obKpis(data){const rev=data.revenue;const yrAgo=Date.now()-365*864e5;const ttm=data.events.filter(e=>e.kind==='신규'&&e.amt&&_obT(e.dt)>=yrAgo).reduce((s,e)=>s+e.amt,0);const bl=_obBacklog(data.events);const backlogNow=bl.length?bl[bl.length-1].v:0;return{rev,ttm,backlogNow,btb:rev?ttm/rev:null,coverage:rev?backlogNow/rev:null};}
function _obStat(l,v,c){return`<div style="flex:1;min-width:104px;background:#162033;border:1px solid #1e2d47;border-radius:8px;padding:7px 10px;">
    <div style="font-size:11.5px;color:#64748b;">${l}</div>
    <div style="font-size:17px;font-weight:700;color:${c||'#e2e8f0'};">${v}</div></div>`;}
function _periodMs(label){let m=label.match(/^(\d{4})\.(\d)Q$/);if(m)return new Date(+m[1],(+m[2]-1)*3+1,15).getTime();m=label.match(/^(\d{4})\.(\d{2})$/);if(m)return new Date(+m[1],+m[2]-1,15).getTime();return _obT(label);}
function _obTicks(F){let out='';const N=6;for(let i=0;i<=N;i++){const ms=F.t0+(F.t1-F.t0)*i/N;const d=new Date(ms);const lab=`${String(d.getFullYear()).slice(2)}.${String(d.getMonth()+1).padStart(2,'0')}`;out+=`<text x="${F.xd(ms).toFixed(1)}" y="${(F.base+14).toFixed(1)}" fill="#64748b" font-size="10" text-anchor="middle">${lab}</text>`;}
return out;}
function _obPeriodSvg(agg,F,unit){const a=agg.filter(o=>o.amt),n=a.length;if(!n)return`<svg viewBox="0 0 ${F.W} 60"><text x="20" y="34" fill="#64748b" font-size="13">집계할 신규 수주 없음</text></svg>`;const maxV=Math.max(...a.map(o=>o.amt),1);const yB=v=>F.PT+F.ih*(1-v/maxV);const bw=Math.max(3,Math.min(40,F.monthPx*(unit==='q'?3:1)*0.7));const showLbl=n<=16;const bars=a.map(o=>{const x=F.xd(_periodMs(o.label));const h=Math.max(0,F.base-yB(o.amt));const lbl=showLbl?`<text x="${x.toFixed(1)}" y="${(yB(o.amt)-4).toFixed(1)}" fill="#cbd5e1" font-size="10.5" font-weight="600" text-anchor="middle">${_won억(o.amt)}</text>`:'';return`<rect x="${(x-bw/2).toFixed(1)}" y="${yB(o.amt).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="#3b82f6" opacity="0.9"><title>${o.label} · ${_won억(o.amt)}</title></rect>${lbl}`;}).join('');return`<svg viewBox="0 0 ${F.W} ${F.H}" style="width:100%;height:auto;display:block;">
     <line x1="${F.PL}" y1="${F.base}" x2="${F.W-F.PR}" y2="${F.base}" stroke="#1e2d47"/>${bars}${_obTicks(F)}</svg>`;}
function _obBacklogSvg(bl,F){const n=bl.length;if(!n)return`<svg viewBox="0 0 ${F.W} 60"><text x="20" y="34" fill="#64748b" font-size="13">추정 불가(계약기간 정보 부족)</text></svg>`;const maxV=Math.max(...bl.map(p=>p.v),1);const y=v=>F.PT+F.ih*(1-v/maxV);const pts=bl.map(p=>`${F.xd(p.t).toFixed(1)},${y(p.v).toFixed(1)}`).join(' ');const area=`${F.xd(bl[0].t).toFixed(1)},${F.base} ${pts} ${F.xd(bl[n-1].t).toFixed(1)},${F.base}`;return`<svg viewBox="0 0 ${F.W} ${F.H}" style="width:100%;height:auto;display:block;">
     <line x1="${F.PL}" y1="${F.base}" x2="${F.W-F.PR}" y2="${F.base}" stroke="#1e2d47"/>
     <polygon points="${area}" fill="#f59e0b" opacity="0.13"/>
     <polyline points="${pts}" fill="none" stroke="#f59e0b" stroke-width="2"/>
     <text x="${F.W-F.PR}" y="${(F.PT-10).toFixed(1)}" fill="#f59e0b" font-size="11" text-anchor="end">현재 추정잔고 ${_won억(bl[n-1].v)}</text>
     ${_obTicks(F)}</svg>`;}
function _obConfirmedSvg(ser,F){const n=ser.length;if(!n)return'';const maxV=Math.max(...ser.map(o=>o.backlog),1);const yB=v=>F.PT+F.ih*(1-v/maxV);const bw=Math.max(6,Math.min(46,F.monthPx*3*0.7));const bars=ser.map(o=>{const x=F.xd(_periodMs(o.period));const h=Math.max(0,F.base-yB(o.backlog));const lbl=`<text x="${x.toFixed(1)}" y="${(yB(o.backlog)-5).toFixed(1)}" fill="#f8b74d" font-size="11" font-weight="700" text-anchor="middle">${_won억(o.backlog)}</text>`;return`<rect x="${(x-bw/2).toFixed(1)}" y="${yB(o.backlog).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="#f59e0b" opacity="0.88"><title>${o.period} · ${_won억(o.backlog)}</title></rect>${lbl}`;}).join('');return`<svg viewBox="0 0 ${F.W} ${F.H}" style="width:100%;height:auto;display:block;">
     <line x1="${F.PL}" y1="${F.base}" x2="${F.W-F.PR}" y2="${F.base}" stroke="#1e2d47"/>${bars}${_obTicks(F)}</svg>`;}
function _renderOrderBacklog(cd,ob){const box=document.getElementById('sp-order-backlog');if(!box)return;const data=ob&&ob[cd];if(!data||!data.events||!data.events.length){box.innerHTML='';return;}
const evAll=data.events;if(evAll.length===1){const e=evAll[0];box.innerHTML=`<div style="font-size:18px;color:#e2e8f0;font-weight:700;margin-bottom:8px;">수주(공급계약)</div>
       <div style="background:#162033;border:1px solid #1e2d47;border-radius:8px;padding:14px 16px;">
         <div style="font-size:16px;color:#e2e8f0;font-weight:600;margin-bottom:12px;line-height:1.4;">${_esc(e.content) || _esc(e.party) || '공급계약'}${e.kind!=='신규'?`<span style="font-size:12px;color:#94a3b8;">(${e.kind})</span>`:''}</div>
         <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:9px 20px;font-size:14px;">
           <div style="display:flex;justify-content:space-between;"><span style="color:#64748b;">수주금액</span><b style="color:#f59e0b;">${_won억(e.amt)}</b></div>
           <div style="display:flex;justify-content:space-between;"><span style="color:#64748b;">매출대비</span><b style="color:${e.ratio>=10?'#ef4444':'#cbd5e1'};">${e.ratio!=null?e.ratio.toFixed(2)+'%':'-'}</b></div>
           <div style="display:flex;justify-content:space-between;"><span style="color:#64748b;">상대방</span><b style="color:#cbd5e1;">${_esc(e.party)||'-'}</b></div>
           <div style="display:flex;justify-content:space-between;"><span style="color:#64748b;">공시일</span><b style="color:#cbd5e1;">${e.dt}</b></div>
           <div style="grid-column:1/3;display:flex;justify-content:space-between;"><span style="color:#64748b;">계약기간</span><b style="color:#cbd5e1;">${e.start||'-'} ~ ${e.end||'-'}</b></div>
         </div>
       </div>`;return;}
const mode=_OB_MODE[cd]||((data.confirmed&&data.confirmed.length)?'confirmed':'indiv');const k=_obKpis(data);const F={W:680,H:250,PL:10,PR:10,PT:26,PB:46};F.iw=F.W-F.PL-F.PR;F.ih=F.H-F.PT-F.PB;F.base=F.PT+F.ih;const amtEv=evAll.filter(e=>e.amt);let t0=Math.min(...amtEv.map(e=>_obT(e.dt)));if(data.confirmed)for(const c of data.confirmed)t0=Math.min(t0,_periodMs(c.period));F.t0=t0;F.t1=Date.now();F.padX=22;F.xd=ms=>F.PL+F.padX+(F.iw-2*F.padX)*(Math.max(F.t0,Math.min(F.t1,ms))-F.t0)/((F.t1-F.t0)||1);F.monthPx=(F.iw-2*F.padX)/Math.max(1,(F.t1-F.t0)/(30.4*864e5));let chart='',legend='';if(mode==='month'||mode==='quarter'){const u=mode==='quarter'?'q':'m';chart=_obPeriodSvg(_obAgg(evAll,u),F,u);legend=`<span><span style="color:#3b82f6;">▮</span> ${mode==='quarter'?'분기':'월'}별 신규수주 합계</span>`;}else if(mode==='backlog'){chart=_obBacklogSvg(_obBacklog(evAll),F);legend=`<span><span style="color:#f59e0b;">━</span> 추정 수주잔고(계약기간 균등인식 가정)</span>`;}else if(mode==='confirmed'){chart=_obConfirmedSvg(data.confirmed||[],F);legend=`<span><span style="color:#f59e0b;">▮</span> 확정 수주잔고(정기보고서 수주현황표)</span>`;}else{const ev=amtEv;const maxAmt=Math.max(...ev.map(e=>e.amt||0),1);const maxCum=Math.max(...evAll.map(e=>e.cum),1);const bw=Math.max(2.5,Math.min(16,F.monthPx*0.6));const yB=v=>F.PT+F.ih*(1-(v||0)/maxAmt);const yC=v=>F.PT+F.ih*(1-v/maxCum);const col=e=>e.kind==='해지'?'#7f1d1d':e.kind==='정정'?'#64748b':(e.ratio!=null&&e.ratio>=10)?'#ef4444':'#3b82f6';const showLbl=ev.length<=16;const bars=ev.map(e=>{const x=F.xd(_obT(e.dt));const h=Math.max(0,F.base-yB(e.amt));const lbl=(showLbl&&e.amt)?`<text x="${x.toFixed(1)}" y="${(yB(e.amt)-4).toFixed(1)}" fill="#cbd5e1" font-size="10.5" font-weight="600" text-anchor="middle">${_won억(e.amt)}</text>`:'';return`<rect x="${(x-bw/2).toFixed(1)}" y="${yB(e.amt).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${col(e)}" opacity="0.9"><title>${_esc(e.dt)} ${_esc(e.kind)} ${_won억(e.amt)}${e.content?(' · '+_esc(e.content)):''}${e.party?(' / '+_esc(e.party)):''}</title></rect>${lbl}`;}).join('');const linePts=evAll.map(e=>`${F.xd(_obT(e.dt)).toFixed(1)},${yC(e.cum).toFixed(1)}`).join(' ');chart=`<svg viewBox="0 0 ${F.W} ${F.H}" style="width:100%;height:auto;display:block;">
       <line x1="${F.PL}" y1="${F.base}" x2="${F.W-F.PR}" y2="${F.base}" stroke="#1e2d47"/>${bars}
       <polyline points="${linePts}" fill="none" stroke="#f59e0b" stroke-width="1.5" opacity="0.85"/>${_obTicks(F)}
       <text x="${F.W-F.PR}" y="${F.PT-10}" fill="#f59e0b" font-size="11" text-anchor="end">누적선 → ${_won억(maxCum)}</text></svg>`;legend=`<span><span style="color:#ef4444;">▮</span> 대형수주(매출대비 10%↑)</span>
       <span><span style="color:#3b82f6;">▮</span> 일반 신규</span>
       <span><span style="color:#64748b;">▮</span> 정정</span>
       <span><span style="color:#f59e0b;">━</span> 누적선</span>`;}
const modes=[['indiv','개별'],['month','월별'],['quarter','분기'],['backlog','추정잔고']];if(data.confirmed&&data.confirmed.length)modes.push(['confirmed','확정잔고']);const toggle=`<div style="display:flex;gap:5px;margin-bottom:10px;flex-wrap:wrap;">${modes.map(([m,l]) =>
    `<button onclick="_obMode('${cd}','${m}')"style="padding:5px 12px;border-radius:7px;font-size:13px;cursor:pointer;border:1px solid ${mode===m?'#38bdf8':'#1e2d47'};background:${mode===m?'#1a2740':'#0f1a2e'};color:${mode===m?'#e2e8f0':'#64748b'};font-weight:${mode===m?'700':'400'};">${l}</button>`).join('')}</div>`;const confBl=data.confirmed_latest||null;const covBase=confBl||k.backlogNow;const cov=k.rev?covBase/k.rev:null;const kpiStrip=`<div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
     ${confBl ? _obStat('확정 수주잔고', _won억(confBl), '#f59e0b') : ''}
     ${_obStat(confBl ? '추정 수주잔고' : '추정 수주잔고', _won억(k.backlogNow), confBl ? '#94a3b8' : '#f59e0b')}
     ${_obStat('Book-to-Bill', k.btb!=null ? k.btb.toFixed(2)+'x' : '-', k.btb>=1?'#22c55e':(k.btb!=null?'#94a3b8':'#475569'))}
     ${_obStat('잔고/연매출', cov!=null ? cov.toFixed(1)+'년' : '-')}
   </div>`;const rev=evAll.slice().reverse().slice(0,40);const kbadge=kk=>kk==='신규'?'':`<span style="font-size:11px;color:${kk==='해지'?'#ef4444':'#94a3b8'};border:1px solid ${kk==='해지'?'#7f1d1d':'#334155'};border-radius:4px;padding:0 4px;margin-left:4px;">${kk}</span>`;const trs=rev.map(e=>`<tr style="border-bottom:1px solid #1a2740;">
      <td style="padding:7px 8px;color:#64748b;white-space:nowrap;">${e.dt}</td>
      <td style="padding:7px 8px;color:#cbd5e1;min-width:150px;">${_esc(e.content) || '<span style="color:#475569;">-</span>'}${kbadge(e.kind)}</td>
      <td style="padding:7px 8px;color:#64748b;white-space:nowrap;font-size:13px;">${e.start||'-'}<br>~${e.end||'-'}</td>
      <td style="padding:7px 8px;text-align:right;color:${e.kind==='해지'?'#ef4444':'#e2e8f0'};font-weight:700;white-space:nowrap;">${_won억(e.amt)}</td>
      <td style="padding:7px 8px;text-align:right;color:${(e.ratio>=10)?'#ef4444':'#94a3b8'};white-space:nowrap;">${e.ratio!=null?e.ratio.toFixed(2)+'%':'-'}</td>
      <td style="padding:7px 8px;color:#94a3b8;">${_esc(e.party) || '-'}</td>
    </tr>`).join('');box.innerHTML=`<div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px;">
       <div style="font-size:18px;color:#e2e8f0;font-weight:700;letter-spacing:.04em;">수주(공급계약) 분석</div>
       <div style="font-size:14px;color:#94a3b8;">신규 ${data.cnt}건</div>
     </div>
     ${kpiStrip}${toggle}
     <div style="background:#162033;border:1px solid #1e2d47;border-radius:8px;padding:10px 8px 2px;">${chart}
       <div style="display:flex;gap:14px;padding:4px 6px 8px;font-size:12px;color:#64748b;flex-wrap:wrap;">${legend}</div>
     </div>
     <div style="font-size:11.5px;color:#475569;margin:6px 2px 0;">※ <b style="color:#f59e0b;">확정잔고</b>=정기보고서 수주현황표(회계상 실제). <b>추정잔고·Book-to-Bill</b>=공급계약 공시+계약기간 균등인식 가정 기반 추정치. 확정잔고는 조선·건설 등 공시업종만 제공.</div>
     <div style="margin-top:10px;max-height:280px;overflow-y:auto;border:1px solid #1e2d47;border-radius:8px;">
       <table style="width:100%;border-collapse:collapse;font-size:14px;">
         <thead><tr style="position:sticky;top:0;background:#0f1a2e;color:#64748b;font-size:12.5px;text-align:left;">
           <th style="padding:8px;font-weight:700;">공시일</th>
           <th style="padding:8px;font-weight:700;">수주내용</th>
           <th style="padding:8px;font-weight:700;">계약기간</th>
           <th style="padding:8px;font-weight:700;text-align:right;">수주금액</th>
           <th style="padding:8px;font-weight:700;text-align:right;">매출대비</th>
           <th style="padding:8px;font-weight:700;">상대방</th>
         </tr></thead>
         <tbody>${trs}</tbody>
       </table>
     </div>`;}
async function _renderDisclosureTab(cd){const el=document.getElementById('sp-disclosure-list');if(!el)return;el.innerHTML=`<div style="color:#475569;font-size: 18px;padding:8px 0;">로딩 중...</div>`;await _ensureDartDisclosures();const list=(_DART_DISCLOSURES&&_DART_DISCLOSURES[cd])||[];if(!list.length){el.innerHTML=`<div style="color:#475569;font-size: 18px;padding:24px 0;text-align:center;">공시 데이터 없음</div>`;return;}
const shown=list.slice(0,15);const rows=shown.map(d=>`<div style="display:flex;align-items:baseline;gap:12px;padding:10px 0;border-bottom:1px solid #1e2d47;">
      <span style="font-size: 16.5px;color:#64748b;white-space:nowrap;flex-shrink:0;min-width:58px;">${d.dt}</span>
      <a href="https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${d.rcept_no}" target="_blank"
         style="font-size: 19.5px;color:#cbd5e1;text-decoration:none;flex:1;line-height:1.55;word-break:keep-all;"
         onmouseover="this.style.color='#38bdf8'" onmouseout="this.style.color='#cbd5e1'">${d.title}</a>
    </div>`).join('');el.innerHTML=`<div style="font-size: 18px;color:#64748b;font-weight:700;margin-bottom:8px;letter-spacing:.04em;">최근 공시 ${shown.length}건${list.length > 15 ? ' (최신순)' : ''}</div>
    <div style="background:#162033;border:1px solid #1e2d47;border-radius:8px;padding:4px 16px;">${rows}</div>`;}
const BROKER_URL={'삼성증권':'https://www.samsungpop.com','하나증권':'https://www.hanaw.com','NH투자증권':'https://www.nhqv.com','KB증권':'https://www.kbsec.com','신한투자증권':'https://www.shinhansec.com','키움증권':'https://www.kiwoom.com','메리츠증권':'https://www.imeritz.com','한국투자증권':'https://securities.koreainvestment.com','유진투자증권':'https://www.eugenefn.com','대신증권':'https://www.daishin.com','LS증권':'https://www.ls-sec.co.kr','미래에셋증권':'https://securities.miraeasset.com','iM증권':'https://www.imfnsec.com','한화투자증권':'https://www.hanwhawm.com','현대차증권':'https://www.hmsec.com','SK증권':'https://www.sks.co.kr','다올투자증권':'https://www.daolsecurities.com','유안타증권':'https://www.myasset.com','IBK투자증권':'https://www.ibks.com','DB증권':'https://www.dbsec.co.kr','신영증권':'https://www.shinyoung.com','BNK투자증권':'https://www.bnkfn.co.kr','흥국증권':'https://www.heungkuksec.co.kr','상상인증권':'https://sangsanginib.com','교보증권':'https://www.iprovest.com','DS투자증권':'https://www.ds-sec.co.kr','부국증권':'https://www.bookook.co.kr','한양증권':'https://www.hygood.co.kr',};function brokerUrl(firm){return(firm&&BROKER_URL[firm.trim()])||null;}
function _renderReports(rpt,curPrice,cns){const sumEl=document.getElementById('sp-report-summary');const listEl=document.getElementById('sp-report-list');const hasItems=rpt&&rpt.items&&rpt.items.length;const avg=hasItems?rpt.avg_tp:(cns&&cns.avg_tp);const mx=hasItems?rpt.max_tp:(cns&&cns.max_tp);const mn=hasItems?rpt.min_tp:(cns&&cns.min_tp);const cnt=hasItems?rpt.cnt:(cns&&cns.brk_cnt);if(!avg&&!mn&&!mx){sumEl.innerHTML='<div style="color:#64748b;font-size: 18px;padding:8px 0;">리포트 없음</div>';listEl.innerHTML='';return;}
const upside=avg&&curPrice?((avg-curPrice)/curPrice*100).toFixed(1):null;const uClr=upside!==null?(parseFloat(upside)>=0?'#f87171':'#34d399'):'';let tpBarHtml='';if(mn&&mx&&avg){const padPct=0.05;const low=Math.min(mn,curPrice||mn)*(1-padPct);const high=Math.max(mx,curPrice||mx)*(1+padPct);const span=high-low;const pct=v=>((v-low)/span*100).toFixed(1);const curP=curPrice?pct(curPrice):null;tpBarHtml=`<div class="sp-tp-bar">
      <div style="font-size: 16.5px;color:#64748b;font-weight:700;margin-bottom:6px;letter-spacing:.04em;">목표가 범위${cnt ? `(${cnt}건)` : ''}</div>
      <div style="display:flex;justify-content:space-between;font-size: 16.5px;color:#64748b;">
        <span>최저 <b style="color:#34d399">${_fmt(mn)}원</b></span>
        <span>평균 <b style="color:#3b82f6">${_fmt(avg)}원</b>${upside !== null ? `<span style="color:${uClr}">(${parseFloat(upside)>0?'+':''}${upside}%)</span>` : ''}</span>
        <span>최고 <b style="color:#f87171">${_fmt(mx)}원</b></span>
      </div>
      <div class="sp-tp-track">
        <div class="sp-tp-rfill" style="left:${pct(mn)}%;width:${pct(mx)-pct(mn)}%;"></div>
        <div class="sp-tp-avg-ln" style="left:${pct(avg)}%;" title="평균 ${_fmt(avg)}원"></div>
        ${curP !== null ? `<div class="sp-tp-cur-ln"style="left:${curP}%;"title="현재가 ${_fmt(curPrice)}원"></div>` : ''}
      </div>
      <div style="display:flex;gap:14px;font-size: 15px;color:#64748b;margin-top:2px;">
        <span><span style="display:inline-block;width:10px;height:3px;background:#3b82f6;border-radius:1px;vertical-align:middle;margin-right:3px;"></span>평균</span>
        ${curP !== null ? `<span><span style="display:inline-block;width:10px;height:3px;background:#f59e0b;border-radius:1px;vertical-align:middle;margin-right:3px;"></span>현재가</span>` : ''}
        <span><span style="display:inline-block;width:10px;height:8px;background:rgba(59,130,246,.3);border-radius:2px;vertical-align:middle;margin-right:3px;"></span>범위</span>
      </div>
    </div>`;}
sumEl.innerHTML=tpBarHtml+`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px;">
      <div class="sp-card"><div class="lbl">평균 목표가</div><div class="val" style="color:#f59e0b;">${_fmt(avg)}원</div></div>
      <div class="sp-card"><div class="lbl">최고 목표가</div><div class="val" style="color:#f87171;">${_fmt(mx)}원</div></div>
      <div class="sp-card"><div class="lbl">최저 목표가</div><div class="val" style="color:#34d399;">${_fmt(mn)}원</div></div>
    </div>`;if(!hasItems){listEl.innerHTML='';return;}
const RCMD_CLR={'매수':'#22d3a0','BUY':'#22d3a0','비중확대':'#22d3a0','중립':'#94a3b8','HOLD':'#94a3b8','매도':'#f87171','SELL':'#f87171'};listEl.innerHTML=rpt.items.map(r=>{const rcmdClr=RCMD_CLR[r.rcmd]||'#94a3b8';const link=brokerUrl(r.firm);const titleHtml=link?`<a href="${link}" target="_blank" title="${r.firm} 홈페이지" style="color:#cbd5e1;text-decoration:none;" onmouseover="this.style.color='#3b82f6'" onmouseout="this.style.color='#cbd5e1'">${r.title || ''}</a>`:`<span style="color:#cbd5e1;">${r.title || ''}</span>`;return`<div class="sp-rprt">
      <div class="r-top">
        <span class="r-dt">${r.dt || ''}</span>
        <span class="r-firm">${r.firm || ''}</span>
        ${r.rcmd ? `<span class="r-rcmd"style="color:${rcmdClr};border-color:${rcmdClr};">${r.rcmd}</span>` : ''}
        ${r.tp   ? `<span class="r-tp">목표 ${_fmt(r.tp)}원</span>` : ''}
      </div>
      <div class="r-title">${titleHtml}</div>
      ${r.smry ? `<div class="r-smry">${r.smry}</div>` : ''}
    </div>`;}).join('');}
function _renderFinance(d,p){const cns=d.consensus||{},biz=d.biz_smry||'',ear=d.earnings||[];document.getElementById('sp-biz-smry').innerHTML=biz?`<div style="font-size: 18px;color:#64748b;margin-bottom:6px;">사업 요약</div>
      <div style="background:#162033;border:1px solid #1e2d47;border-radius:8px;padding:12px 14px;font-size: 19.5px;color:#cbd5e1;line-height:1.8;white-space:pre-line;">${biz}</div>`:'';document.getElementById('sp-consensus-cards').innerHTML=`<div style="font-size: 18px;color:#64748b;margin-bottom:8px;letter-spacing:.04em;font-weight:700;">컨센서스</div>`+`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;margin-bottom:16px;">`+
[['FWD PER',cns.fwd_per||'-'],['PER',cns.trail_per||'-'],['증권사 수',cns.brk_cnt?cns.brk_cnt+'개사':'-'],['평균 목표가',cns.avg_tp?_fmt(cns.avg_tp)+'원':'-'],['주간 수익률',cns.rt_1w?cns.rt_1w+'%':'-'],['영업이익 CNS',cns.opr_cns?cns.opr_cns+'억':'-'],['YoY',cns.yoy_rt?cns.yoy_rt+'%':'-'],['CNS 변화',cns.cns_chg?cns.cns_chg+'%':'-']].map(([l,v])=>`<div class="sp-card"><div class="lbl">${l}</div><div class="val">${v}</div></div>`).join('')+'</div>';const earEl=document.getElementById('sp-earnings-table');const _w=v=>v==null?'-':Math.round(v/1e8).toLocaleString('ko-KR')+'억';const _uk=v=>v==null?'-':(Math.abs(v)>=10000?(v/10000).toFixed(1)+'조':Math.round(v).toLocaleString('ko-KR')+'억');const _hcell=t=>`<th style="padding:8px 10px;font-size:18px;color:#94a3b8;font-weight:600;text-align:right;">${t}</th>`;const _rcell=(s,clr)=>`<td style="padding:8px 10px;font-size:19.5px;color:${clr||'#f1f5f9'};text-align:right;">${s}</td>`;const _rlabel=t=>`<td style="padding:8px 10px;font-size:18px;color:#94a3b8;white-space:nowrap;">${t}</td>`;const _T=(title,headers,body)=>`<div style="font-size:18px;color:#64748b;margin:14px 0 8px;">${title}</div>
    <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;background:#162033;border-radius:8px;overflow:hidden;border:1px solid #1e2d47;">
    <thead><tr><th style="padding:8px 10px;font-size:18px;color:#64748b;text-align:left;">항목</th>${headers}</tr></thead>
    <tbody>${body}</tbody></table></div>`;let out='';if(ear&&ear.length){const ths=ear.map(e=>_hcell(`${e.year}.Q${(e.quarter||'').replace('Q','')}`)).join('');const niLabel2=ear.map(e=>e['순이익_계정']).find(Boolean)||'순이익';const body=[['매출액','매출액'],['영업이익','영업이익'],[niLabel2,'순이익']].map(([lbl,k])=>{const tds=ear.map(e=>{const v=e[k];const clr=(k!=='매출액'&&v!=null&&v<0)?'#f87171':'#f1f5f9';return _rcell(_w(v),clr);}).join('');return`<tr>${_rlabel(lbl)}${tds}</tr>`;}).join('');out+=_T('분기 실적',ths,body);}
if(d.annual&&d.annual.length){const ths=d.annual.map(a=>_hcell(a.year)).join('');const body=['매출액','영업이익','순이익'].map(key=>{const tds=d.annual.map(a=>{const v=a[key];const clr=(key!=='매출액'&&v!=null&&v<0)?'#f87171':'#f1f5f9';return _rcell(_uk(v),clr);}).join('');return`<tr>${_rlabel(key)}${tds}</tr>`;}).join('')+`<tr>${_rlabel('PER')}${d.annual.map(a=>_rcell(a.per!=null?a.per+'배':'-','#cbd5e1')).join('')}</tr>`;out+=_T('연간 실적',ths,body);}
if(d.estimates&&d.estimates.length){const ths=d.estimates.map(e=>_hcell(e.type==='Y'?`${e.year}(E)`:`${e.year}.${e.quarter}(E)`)).join('');const body=['매출액','영업이익','순이익'].map(key=>{const tds=d.estimates.map(e=>{const v=e[key];const clr=(key!=='매출액'&&v!=null&&v<0)?'#f87171':'#f1f5f9';return _rcell(_uk(v),clr);}).join('');return`<tr>${_rlabel(key)}${tds}</tr>`;}).join('');out+=_T('컨센서스 추정 (E)',ths,body);}
earEl.innerHTML=out||'<div style="color:#64748b;font-size:18px;">실적 데이터 없음</div>';}
var tgtprc_sort='mktcap';var tgtprc_filter='rpt10';var tgtprc_stock=null;var tgtprc_view='chart';var tgtprc_chart=null;var tgtprc_loaded=false;var tgtprc_rpt_tab='recent';async function loadTgtprcPage(){if(tgtprc_loaded)return;await Promise.all([ensureTgtprcData(),ensureKrStockMeta(),ensureKrReports(),ensureErDates(),ensureReportsEr()]);tgtprc_loaded=true;tgtprc_filter='rpt10';document.querySelectorAll('.tp-filter-btn').forEach(b=>b.classList.remove('active'));const defBtn=document.getElementById('tp-filter-rpt10');if(defBtn)defBtn.classList.add('active');tgtprcRenderList();const stocks=Object.values(TGTPRC_DATA||{});if(stocks.length>0){const first=stocks.slice().sort((a,b)=>{const am=(KR_STOCK_META&&KR_STOCK_META[a.itm_cd]?.mktcap)??0;const bm=(KR_STOCK_META&&KR_STOCK_META[b.itm_cd]?.mktcap)??0;return bm-am;})[0];tgtprcSelectStock(first.itm_cd);}}
function tgtprcSort(key){tgtprc_sort=key;document.querySelectorAll('.tp-sort-btn').forEach(b=>b.classList.remove('active'));const map={mktcap:'tp-sort-mktcap',upside:'tp-sort-upside'};const btn=document.getElementById(map[key]);if(btn)btn.classList.add('active');tgtprcRenderList();}
async function tgtprcSetFilter(f){tgtprc_filter=f;document.querySelectorAll('.tp-filter-btn').forEach(b=>b.classList.remove('active'));const btn=document.getElementById('tp-filter-'+f);if(btn)btn.classList.add('active');if(f==='1m'&&!KR_REPORTS_1M){if(btn)btn.textContent='1개월 ···';await ensureReports1m();if(btn)btn.textContent='1개월';}else if(f==='3m'&&!KR_REPORTS_3M){if(btn)btn.textContent='3개월 ···';await ensureReports3m();if(btn)btn.textContent='3개월';}else if(f==='er'&&!KR_REPORTS_ER){if(btn)btn.textContent='실적발표이후 ···';await ensureReportsEr();if(btn)btn.textContent='실적발표이후';}
tgtprcRenderList();}
function tgtprcGetFilteredGap(itm_cd,cur_prc){let reports=null;if(tgtprc_filter==='rpt10')reports=(KR_REPORTS&&KR_REPORTS[itm_cd]||[]).slice(0,10);else if(tgtprc_filter==='1m')reports=KR_REPORTS_1M&&KR_REPORTS_1M[itm_cd];else if(tgtprc_filter==='3m')reports=KR_REPORTS_3M&&KR_REPORTS_3M[itm_cd];else if(tgtprc_filter==='er')reports=KR_REPORTS_ER&&KR_REPORTS_ER[itm_cd];else return null;if(!reports||!reports.length)return null;const tps=reports.filter(r=>r.tp).map(r=>r.tp);if(!tps.length)return null;const avgTp=Math.round(tps.reduce((a,b)=>a+b,0)/tps.length);const gap=cur_prc?((avgTp-cur_prc)/cur_prc*100):null;return{avgTp,gap};}
function tgtprcRenderList(){if(!TGTPRC_DATA)return;const q=(document.getElementById('tgtprc-search')?.value||'').trim().toLowerCase();let list=Object.values(TGTPRC_DATA).filter(s=>!q||s.itm_nm.toLowerCase().includes(q)||s.itm_cd.includes(q));const mktSort=(a,b)=>{const am=(KR_STOCK_META&&KR_STOCK_META[a.itm_cd]?.mktcap)??0;const bm=(KR_STOCK_META&&KR_STOCK_META[b.itm_cd]?.mktcap)??0;return bm-am;};const fgapMap={};if(tgtprc_filter!=='all'){list.forEach(s=>{fgapMap[s.itm_cd]=tgtprcGetFilteredGap(s.itm_cd,s.cur_prc);});}
if(tgtprc_sort==='mktcap'){list.sort(mktSort);}else if(tgtprc_sort==='upside'){if(tgtprc_filter!=='all'){list.sort((a,b)=>((fgapMap[b.itm_cd]?.gap)??-999)-((fgapMap[a.itm_cd]?.gap)??-999));}else{list.sort((a,b)=>(b.upside??-999)-(a.upside??-999));}}
const container=document.getElementById('tgtprc-list');if(!container)return;const FILTER_LABEL={rpt10:'최근10개','1m':'1개월','3m':'3개월',er:'실적후'};container.innerHTML=list.map(s=>{const fg=tgtprc_filter!=='all'?fgapMap[s.itm_cd]:null;const showGap=fg?fg.gap:s.upside;const showAvg=fg?fg.avgTp:s.avg_tgt;const up=showGap!=null?showGap.toFixed(1):'-';const upCl=showGap>0?'color:#ef4444':showGap<0?'color:#3b82f6':'color:#94a3b8';const erDt=(tgtprc_filter==='er'&&KR_ER_DATES&&KR_ER_DATES[s.itm_cd])?KR_ER_DATES[s.itm_cd].dt:null;const filterTag=tgtprc_filter!=='all'?`<span style="font-size: 9.5px;color:#3b82f6;background:rgba(59,130,246,.15);border-radius:3px;padding:1px 4px;margin-left:4px;">${FILTER_LABEL[tgtprc_filter]}${erDt ? ' ' + erDt : ''}</span>`:'';return`<div class="tp-stk-row${tgtprc_stock === s.itm_cd ? ' active' : ''}" data-cd="${s.itm_cd}" onclick="tgtprcSelectStock('${s.itm_cd}', true)">
      <div style="font-size: 13px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
        <span style="cursor:pointer;text-decoration:underline;text-decoration-color:transparent;transition:.1s;" onmouseover="this.style.color='#3b82f6'" onmouseout="this.style.color=''" onclick="event.stopPropagation();openKrStock('${s.itm_cd}','${(KR_STOCK_META&&KR_STOCK_META[s.itm_cd]&&KR_STOCK_META[s.itm_cd].nm)||s.itm_nm}')">${(KR_STOCK_META&&KR_STOCK_META[s.itm_cd]&&KR_STOCK_META[s.itm_cd].nm)||s.itm_nm}</span>
        <span style="font-size: 10.5px;color:var(--muted);font-weight:400">${s.itm_cd}</span>${filterTag}
      </div>
      <div style="font-size: 11px;color:var(--muted);margin-top:3px;display:flex;justify-content:space-between;align-items:baseline;">
        <span style="white-space:nowrap;">증권사 ${s.brk_cnt}개</span>
        <span style="white-space:nowrap;">현재가 <b style="color:#f59e0b;">${_getPrice(s.itm_cd) ? Number(_getPrice(s.itm_cd).curr_prc).toLocaleString('ko-KR') : (s.cur_prc ? Number(s.cur_prc).toLocaleString('ko-KR') : '-')}</b></span>
        <span style="white-space:nowrap;">목표 <b style="color:#f59e0b;">${showAvg ? Number(showAvg).toLocaleString('ko-KR') : '-'}</b></span>
        <span style="${upCl};font-size: 11.5px;font-weight:700;white-space:nowrap;">${up !== '-' ? (showGap > 0 ? '+' : '') + up + '%' : '-'}</span>
      </div>
    </div>`;}).join('');}
function tgtprcMobileBack(){const pg=document.getElementById('page-tgtprc');if(pg)pg.classList.remove('tp-detail');}
function tgtprcSelectStock(itm_cd,fromUser){tgtprc_stock=itm_cd;if(fromUser&&window.innerWidth<=768){const pg=document.getElementById('page-tgtprc');if(pg)pg.classList.add('tp-detail');}
document.querySelectorAll('.tp-stk-row').forEach(r=>r.classList.toggle('active',r.getAttribute('data-cd')===itm_cd));const s=TGTPRC_DATA&&TGTPRC_DATA[itm_cd];if(!s)return;const upCl=s.upside>0?'color:#ef4444':s.upside<0?'color:#3b82f6':'color:#94a3b8';const upStr=s.upside!=null?(s.upside>0?'+':'')+s.upside.toFixed(1)+'%':'-';document.getElementById('tgtprc-header').innerHTML=`
    <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;">
      <span style="font-size: 20px;font-weight:900;">${(KR_STOCK_META&&KR_STOCK_META[itm_cd]&&KR_STOCK_META[itm_cd].nm)||s.itm_nm}</span>
      <span style="font-size: 13px;color:var(--muted)">${s.itm_cd}</span>
      ${s.cur_prc ? `<span style="font-size: 15px;font-weight:700">${Number(s.cur_prc).toLocaleString('ko-KR')}원</span>` : ''}
    </div>`;const cards=document.getElementById('tgtprc-stat-cards');cards.style.cssText='display:flex;flex-direction:column;gap:8px;padding:14px 20px 0;flex-shrink:0;';const card=(l,v,st)=>`<div style="background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:8px 14px;display:flex;align-items:baseline;gap:8px;">
    <span style="font-size: 11px;color:var(--muted);white-space:nowrap;">${l}</span>
    <span style="font-size: 15px;font-weight:800;${st}">${v}</span>
  </div>`;const row1=`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
    ${card('목표주가 (평균)', s.avg_tgt ? Number(s.avg_tgt).toLocaleString('ko-KR')+'원' : '-', '')}
    ${card('목표주가 괴리율', upStr, upCl)}
    ${card('커버 증권사 수', s.brk_cnt+'개사', '')}
  </div>`;cards.innerHTML=row1+`<div id="tgtprc-period-cards" style="display:flex;align-items:center;flex-wrap:wrap;gap:4px;padding:8px 14px;background:var(--card2);border:1px solid var(--border);border-radius:8px;min-height:32px;"></div>`;const vtabs=document.getElementById('tgtprc-view-tabs');vtabs.style.cssText='display:flex;gap:6px;flex-shrink:0;margin-bottom:8px;';vtabs.innerHTML=`
    <div class="tp-view-tab${tgtprc_view==='chart'?' active':''}" onclick="tgtprcShowView('chart')">차트</div>
    <div class="tp-view-tab${tgtprc_view==='table'?' active':''}" onclick="tgtprcShowView('table')">월별목표주가</div>`;tgtprcShowView(tgtprc_view,itm_cd);tgtprcRenderReports(itm_cd,tgtprc_rpt_tab);tgtprcRenderRptSummary(itm_cd);tgtprcLoadSummaryAsync(itm_cd);}
function tgtprcShowView(view,itm_cd){tgtprc_view=view;const cd=itm_cd||tgtprc_stock;document.querySelectorAll('.tp-view-tab').forEach(t=>t.classList.toggle('active',t.textContent.trim()===(view==='chart'?'차트':'월별목표주가')));document.getElementById('tgtprc-chart-view').style.display=view==='chart'?'block':'none';document.getElementById('tgtprc-table-view').style.display=view==='table'?'flex':'none';if(view==='chart')requestAnimationFrame(()=>tgtprcRenderChart(cd));else tgtprcRenderTable(cd);}
function tgtprcRenderChart(itm_cd){const rows=((TGTPRC_MONTHLY&&TGTPRC_MONTHLY[itm_cd])||[]).slice().sort((a,b)=>a.ym.localeCompare(b.ym));if(tgtprc_chart){tgtprc_chart.destroy();tgtprc_chart=null;}
const ctx=document.getElementById('tgtprc-chart')?.getContext('2d');if(!ctx)return;if(!rows.length){ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);return;}
const last=rows[rows.length-1];const curP=(TGTPRC_DATA&&TGTPRC_DATA[itm_cd]?.cur_prc)||last?.price||0;const fmtK=v=>v?Number(v).toLocaleString('ko-KR'):'';const upside=(v,base)=>{if(!v||!base)return'';const p=((v-base)/base*100).toFixed(1);return' ('+(p>0?'+':'')+p+'%)';};const lbl=(name,v,base)=>name+'  '+fmtK(v)+upside(v,base);tgtprc_chart=new Chart(ctx,{plugins:[ML_WM],type:'line',data:{labels:rows.map(r=>r.ym.substring(2,4)+'.'+r.ym.substring(4,6)),datasets:[{label:lbl('목표주가(평균)',last?.avg_tgt,curP),data:rows.map(r=>r.avg_tgt),borderColor:'#10b981',backgroundColor:'transparent',borderWidth:2.5,pointRadius:3,tension:0.3},{label:lbl('목표주가(최저)',last?.min_tgt,curP),data:rows.map(r=>r.min_tgt),borderColor:'#3b82f6',backgroundColor:'transparent',borderWidth:1.5,borderDash:[5,3],pointRadius:2,tension:0.3},{label:lbl('목표주가(최고)',last?.max_tgt,curP),data:rows.map(r=>r.max_tgt),borderColor:'#f472b6',backgroundColor:'transparent',borderWidth:1.5,borderDash:[5,3],pointRadius:2,tension:0.3},{label:'주가  '+fmtK(curP),data:rows.map(r=>r.price||null),borderColor:'#94a3b8',backgroundColor:'transparent',borderWidth:2,pointRadius:3,tension:0.3},]},options:{responsive:true,maintainAspectRatio:false,layout:{padding:{left:2,right:6,top:4,bottom:2}},interaction:{mode:'index',intersect:false},plugins:{legend:{labels:{color:'#94a3b8',font:{size:22},boxWidth:22,padding:16}},tooltip:{backgroundColor:'#0f1829',borderColor:'#1e2d47',borderWidth:1,titleColor:'#e2e8f0',bodyColor:'#94a3b8',callbacks:{label:ctx=>{const raw=ctx.raw;if(!raw)return null;const pct=curP?((raw-curP)/curP*100).toFixed(1):null;const sign=pct>0?'+':'';const name=ctx.dataset.label.split('  ')[0];return` ${name}: ${Number(raw).toLocaleString('ko-KR')}원${pct !== null && name !== '주가' ? '  ' + sign + pct + '%' : ''}`;}}}},scales:{x:{ticks:{color:'#64748b',font:{size:10}},grid:{color:'#1e2d47'}},y:{ticks:{color:'#64748b',font:{size:10},callback:v=>v?.toLocaleString('ko-KR')},grid:{color:'#1e2d47'}}}}});}
var NXT_DATA=null;var nxt_loaded=false;var nxt_map_started=false;function nxtInit(){const fr=document.getElementById('nxt-map-frame');if(!nxt_map_started){fr.src='/moneyweb/nxt_marketmap.html?v='+Date.now();nxt_map_started=true;}else{try{fr.contentWindow&&fr.contentWindow.load&&fr.contentWindow.load();}catch(e){}}
loadNxtPage();}
async function loadNxtPage(){if(nxt_loaded&&NXT_DATA){renderNxtPage();return;}
document.getElementById('nxt-content').innerHTML='<div style="color:var(--muted);font-size: 13px;">로딩 중...</div>';try{const res=await fetch('/moneyweb/api/nxt_overtime.json?t='+Date.now(),_NC);NXT_DATA=await res.json();nxt_loaded=true;renderNxtPage();}catch(e){document.getElementById('nxt-content').innerHTML='<div style="color:#f87171;">데이터 로드 실패</div>';}}
function renderNxtPage(){if(!NXT_DATA)return;const el=document.getElementById('nxt-content');const fmt=n=>n?Number(n).toLocaleString('ko-KR'):'-';const fmtDate=d=>d?`${d.slice(0,4)}.${d.slice(4,6)}.${d.slice(6,8)}`:'-';const nxtUp=NXT_DATA.nxt.filter(r=>r.gap>0).sort((a,b)=>b.gap-a.gap).slice(0,20);const nxtDn=NXT_DATA.nxt.filter(r=>r.gap<0).sort((a,b)=>a.gap-b.gap).slice(0,20);const trStyle='border-bottom:1px solid var(--border);cursor:pointer;transition:background .1s;';const trHover=`onmouseover="this.style.background='var(--card2)'" onmouseout="this.style.background=''"`;const nxtRow=r=>{const cl=r.gap>0?'#ef4444':'#3b82f6';const sign=r.gap>0?'+':'';return`<tr style="${trStyle}" ${trHover} onclick="openKrStock('${r.cd}','${r.nm}')">
      <td style="padding:5px 8px;font-size:12px;font-weight:600;">${r.nm}</td>
      <td style="padding:5px 8px;text-align:right;font-size:11px;">${fmt(r.krx)}</td>
      <td style="padding:5px 8px;text-align:right;font-size:11px;font-weight:700;">${fmt(r.nxt)}</td>
      <td style="padding:5px 8px;text-align:right;font-size:12px;font-weight:800;color:${cl};">${sign}${r.gap}%</td>
    </tr>`;};const ovtmRow=r=>{const cl=r.flu>0?'#ef4444':'#3b82f6';const sign=r.flu>0?'+':'';return`<tr style="${trStyle}" ${trHover} onclick="openKrStock('${r.cd}','${r.nm}')">
      <td style="padding:5px 8px;font-size:12px;font-weight:600;">${r.nm}</td>
      <td style="padding:5px 8px;text-align:right;font-size:11px;">${fmt(r.clpr)}</td>
      <td style="padding:5px 8px;text-align:right;font-size:11px;font-weight:700;">${fmt(r.ovtm)}</td>
      <td style="padding:5px 8px;text-align:right;font-size:12px;font-weight:800;color:${cl};">${sign}${r.flu}%</td>
      <td style="padding:5px 8px;text-align:right;font-size:11px;color:var(--muted);">${fmt(r.vol)}</td>
    </tr>`;};const thead=(cols)=>`<thead><tr>${cols.map(c =>
    `<th style="padding:6px 8px;text-align:${c.r?'right':'left'};font-size:11px;color:var(--muted);border-bottom:2px solid var(--border);white-space:nowrap;">${c.n}</th>`
  ).join('')}</tr></thead>`;const nxtCols=[{n:'종목명'},{n:'KRX종가',r:1},{n:'NXT가격',r:1},{n:'괴리율',r:1}];const ovtmCols=[{n:'종목명'},{n:'종가',r:1},{n:'시간외',r:1},{n:'등락률',r:1},{n:'거래량',r:1}];const section=(title,color,rows,cols,rowFn)=>`
    <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden;">
      <div style="padding:12px 16px;border-bottom:1px solid var(--border);font-size: 13px;font-weight:700;color:${color};">${title} <span style="font-size: 11px;color:var(--muted);font-weight:400;">(${rows.length}개)</span></div>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;">
          ${thead(cols)}
          <tbody>${rows.map(rowFn).join('')}</tbody>
        </table>
      </div>
    </div>`;el.innerHTML=`
    <div style="display:flex;gap:6px;align-items:center;margin-bottom:16px;flex-wrap:wrap;">
      <span style="font-size: 14px;font-weight:700;">NXT&시간외</span>
      <span style="font-size: 12px;color:var(--muted);">NXT: ${fmtDate(NXT_DATA.nxt_date)}</span>
      <span style="font-size: 12px;color:var(--muted);">시간외: ${fmtDate(NXT_DATA.ovtm_date)}</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">
      ${section('NXT 괴리율 상위 (상승)', '#ef4444', nxtUp, nxtCols, nxtRow)}
      ${section('시간외 상승', '#ef4444', NXT_DATA.ovtm_up, ovtmCols, ovtmRow)}
      ${section('NXT 괴리율 하위 (하락)', '#3b82f6', nxtDn, nxtCols, nxtRow)}
      ${section('시간외 하락', '#3b82f6', NXT_DATA.ovtm_dn, ovtmCols, ovtmRow)}
    </div>`;}
function tgtprcCalcGap(reports,cur_prc){if(!reports||!reports.length)return null;const tps=reports.filter(r=>r.tp).map(r=>r.tp);if(!tps.length)return null;const avgTp=Math.round(tps.reduce((a,b)=>a+b,0)/tps.length);const gap=cur_prc?(avgTp-cur_prc)/cur_prc*100:null;return{avgTp,gap};}
function tgtprcRenderRptSummary(cd){const el=document.getElementById('tgtprc-period-cards');if(!el||!cd)return;const cur=(TGTPRC_DATA&&TGTPRC_DATA[cd]?.cur_prc)||0;const items=[{label:'최근 10개 괴리율',gap:tgtprcCalcGap((KR_REPORTS&&KR_REPORTS[cd]||[]).slice(0,10),cur)},{label:'1개월 평균 괴리율',gap:KR_REPORTS_1M?tgtprcCalcGap(KR_REPORTS_1M[cd],cur):undefined},{label:'3개월 평균 괴리율',gap:KR_REPORTS_3M?tgtprcCalcGap(KR_REPORTS_3M[cd],cur):undefined},{label:'6개월 평균 괴리율',gap:KR_REPORTS_6M?tgtprcCalcGap(KR_REPORTS_6M[cd],cur):undefined},{label:'실적발표후 괴리율',gap:KR_REPORTS_ER?tgtprcCalcGap(KR_REPORTS_ER[cd],cur):undefined},];el.innerHTML=items.map(({label,gap},i)=>{const loading=gap===undefined;const d=(!loading&&gap!==null)?gap:null;const cl=d===null?'#64748b':d.gap>0?'#ef4444':'#3b82f6';const pct=loading?'···':d===null?'—':`${d.gap > 0 ? '+' : ''}${d.gap.toFixed(1)}%`;const avg=d?Number(d.avgTp).toLocaleString('ko-KR')+'원':'';const sep=i>0?`<span style="color:var(--border);margin-right:10px;">|</span>`:'';return`${sep}<span style="display:inline-flex;align-items:baseline;gap:6px;flex-shrink:0;">
      <span style="font-size: 11px;color:var(--muted);">${label}</span>
      ${avg ? `<span style="font-size: 12px;font-weight:600;color:#e2e8f0;">${avg}</span>` : ''}
      <span style="font-size: 13px;font-weight:800;color:${cl};">${pct}</span>
    </span>`;}).join('');}
async function tgtprcLoadSummaryAsync(cd){if(!KR_REPORTS_1M){await ensureReports1m();tgtprcRenderRptSummary(cd);}
if(!KR_REPORTS_3M){await ensureReports3m();tgtprcRenderRptSummary(cd);}
if(!KR_REPORTS_6M){await ensureReports6m();tgtprcRenderRptSummary(cd);}
if(!KR_REPORTS_ER){await ensureReportsEr();tgtprcRenderRptSummary(cd);}
tgtprcRenderRptSummary(cd);}
function tgtprcRptTab(tab){tgtprc_rpt_tab=tab;['recent','1m','3m','6m','after_er'].forEach(t=>{const btn=document.getElementById('tp-rpt-tab-'+t);if(btn)btn.classList.toggle('active',t===tab);});tgtprcRenderReports(tgtprc_stock,tab);}
function tgtprcRenderReports(cd,tab){if(!cd)return;const avgEl=document.getElementById('tgtprc-rpt-avg');const listEl=document.getElementById('tgtprc-rpt-list');if(!avgEl||!listEl)return;const allRpts=(KR_REPORTS&&KR_REPORTS[cd])||[];const _stock=TGTPRC_DATA&&TGTPRC_DATA[cd];const cur_prc=(_stock&&_stock.cur_prc)?_stock.cur_prc:0;const fmt=n=>n?Number(n).toLocaleString('ko-KR'):'-';let reports=[];let erDate=null;let erRptNm=null;if(tab==='recent'){reports=allRpts.slice(0,10);}else if(tab==='1m'){if(!KR_REPORTS_1M){listEl.innerHTML=`<div style="padding:24px;text-align:center;color:var(--muted);font-size: 12px;">로딩 중…</div>`;avgEl.innerHTML='';ensureReports1m().then(()=>tgtprcRenderReports(cd,tab));return;}
reports=(KR_REPORTS_1M[cd])||[];}else if(tab==='3m'){if(!KR_REPORTS_3M){listEl.innerHTML=`<div style="padding:24px;text-align:center;color:var(--muted);font-size: 12px;">로딩 중…</div>`;avgEl.innerHTML='';ensureReports3m().then(()=>tgtprcRenderReports(cd,tab));return;}
reports=(KR_REPORTS_3M[cd])||[];}else if(tab==='6m'){if(!KR_REPORTS_6M){listEl.innerHTML=`<div style="padding:24px;text-align:center;color:var(--muted);font-size: 12px;">로딩 중…</div>`;avgEl.innerHTML='';ensureReports6m().then(()=>tgtprcRenderReports(cd,tab));return;}
reports=(KR_REPORTS_6M[cd])||[];}else{const er=KR_ER_DATES&&KR_ER_DATES[cd];if(er){erDate=er.dt;erRptNm=er.rpt;reports=(KR_REPORTS_ER&&KR_REPORTS_ER[cd])||[];}}
const tps=reports.filter(r=>r.tp).map(r=>r.tp);const avgTp=tps.length?Math.round(tps.reduce((a,b)=>a+b,0)/tps.length):null;if(tab==='recent'){const upside10=(avgTp&&cur_prc)?((avgTp-cur_prc)/cur_prc*100).toFixed(1):null;const upCl10=upside10?(parseFloat(upside10)>0?'color:#ef4444':'color:#3b82f6'):'';avgEl.innerHTML=`
      <div style="font-size: 10.5px;color:var(--muted);">최근 ${reports.length}개 평균 목표가</div>
      <div style="display:flex;align-items:baseline;gap:8px;margin-top:2px;">
        <div style="font-size: 17px;font-weight:800;">${avgTp ? Number(avgTp).toLocaleString('ko-KR')+'원' : '-'}</div>
        ${upside10 ? `<div style="font-size: 12px;font-weight:700;${upCl10}">${parseFloat(upside10)>0?'+':''}${upside10}%</div>` : ''}
      </div>`;}else if(tab==='1m'||tab==='3m'||tab==='6m'){const label=tab==='1m'?'최근 1개월':tab==='3m'?'최근 3개월':'최근 6개월';const upside=(avgTp&&cur_prc)?((avgTp-cur_prc)/cur_prc*100).toFixed(1):null;const upCl=upside?(parseFloat(upside)>0?'color:#ef4444':'color:#3b82f6'):'';avgEl.innerHTML=`
      <div style="font-size: 10.5px;color:var(--muted);">${label} ${reports.length}개 평균 목표가</div>
      <div style="display:flex;align-items:baseline;gap:8px;margin-top:2px;">
        <div style="font-size: 17px;font-weight:800;">${avgTp ? Number(avgTp).toLocaleString('ko-KR')+'원' : '-'}</div>
        ${upside ? `<div style="font-size: 12px;font-weight:700;${upCl}">${parseFloat(upside)>0?'+':''}${upside}%</div>` : ''}
      </div>`;}else{if(!erDate){avgEl.innerHTML=`<div style="font-size: 12px;color:var(--muted);padding:4px 0;">실적 공시 데이터 없음</div>`;}else{const upside=(avgTp&&cur_prc)?((avgTp-cur_prc)/cur_prc*100).toFixed(1):null;const upCl=upside?(upside>0?'color:#ef4444':'color:#3b82f6'):'';avgEl.innerHTML=`
        <div style="font-size: 10.5px;color:var(--muted);">실적발표일
          <span style="color:#94a3b8;font-weight:600;">${erDate}</span>
          <span style="margin-left:4px;font-size: 10px;color:#64748b;">${erRptNm}</span>
        </div>
        <div style="display:flex;align-items:baseline;gap:8px;margin-top:3px;">
          <div style="font-size: 17px;font-weight:800;">${avgTp ? Number(avgTp).toLocaleString('ko-KR')+'원' : '-'}</div>
          ${upside ? `<div style="font-size: 12px;font-weight:700;${upCl}">${upside>0?'+':''}${upside}%</div>` : ''}
          <div style="font-size: 11px;color:var(--muted);">이후 ${reports.length}개 평균</div>
        </div>`;}}
if(!reports.length){let emptyMsg='리포트 없음';if(tab==='after_er')emptyMsg=erDate?'실적발표 이후 리포트 없음':'실적발표 공시 없음';else if(tab==='1m')emptyMsg='최근 1개월 리포트 없음';else if(tab==='3m')emptyMsg='최근 3개월 리포트 없음';else if(tab==='6m')emptyMsg='최근 6개월 리포트 없음';listEl.innerHTML=`<div style="padding:24px;text-align:center;color:var(--muted);font-size: 12px;">${emptyMsg}</div>`;return;}
listEl.innerHTML=reports.map(r=>{const tpClr=r.tp?(r.tp>=cur_prc?'#22d3a0':'#f87171'):'#64748b';const link=brokerUrl(r.firm);const titleHtml=link?`<a href="${link}" target="_blank" title="${r.firm} 홈페이지" style="color:var(--text);text-decoration:none;font-size: 15px;font-weight:700;line-height:1.4;" onmouseover="this.style.color='#3b82f6'" onmouseout="this.style.color='var(--text)'">${r.title}</a>`:`<span style="font-size: 15px;font-weight:700;color:var(--text);line-height:1.4;">${r.title}</span>`;const smryHtml=r.smry?r.smry.replace(/\s*■/g,'\n■').trim():'';return`<div style="padding:11px 14px;border-bottom:1px solid var(--border);">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:5px;">
        <span style="font-size: 12px;color:var(--muted);">${r.dt}</span>
        <div style="display:flex;align-items:center;gap:7px;flex-shrink:0;">
          ${r.rcmd ? `<span style="font-size: 12px;color:#f59e0b;font-weight:700;">${r.rcmd}</span>` : ''}
          <span style="font-size: 14px;font-weight:800;color:${tpClr};">${fmt(r.tp)}원</span>
        </div>
      </div>
      <div style="margin-bottom:5px;">${titleHtml}</div>
      <div style="font-size: 13px;color:#64748b;font-weight:600;margin-bottom:${smryHtml ? '5px' : '0'};">
        ${r.firm}<span style="margin-left:10px;color:#f59e0b;font-weight:600;font-size: 13px;">${cur_prc > 0 ? Number(cur_prc).toLocaleString('ko-KR')+'원' : ''}</span>
      </div>
      ${smryHtml ? `<div style="font-size: 14px;color:#94a3b8;line-height:1.6;white-space:pre-wrap;">${smryHtml}</div>` : ''}
    </div>`;}).join('');}
function tgtprcRenderTable(itm_cd){const rows=((TGTPRC_MONTHLY&&TGTPRC_MONTHLY[itm_cd])||[]).slice().sort((a,b)=>b.ym.localeCompare(a.ym));const thead=document.getElementById('tgtprc-table-head');const tbody=document.getElementById('tgtprc-table-body');if(!thead||!tbody)return;thead.innerHTML=`<tr>
    <th class="tp-data-th" style="text-align:left;">날짜</th>
    <th class="tp-data-th">주가</th>
    <th class="tp-data-th">목표(평균)</th>
    <th class="tp-data-th">목표(최저)</th>
    <th class="tp-data-th">목표(최고)</th>
    <th class="tp-data-th">분석사수</th>
    <th class="tp-data-th">괴리율</th>
  </tr>`;tbody.innerHTML=rows.map(r=>{const upCl=r.upside>0?'color:#22d3a0':r.upside<0?'color:#f87171':'';const upStr=r.upside!=null?(r.upside>0?'+':'')+r.upside.toFixed(1)+'%':'-';const fmt=n=>n?Number(n).toLocaleString('ko-KR'):'-';return`<tr class="tp-data-tr">
      <td class="tp-data-td" style="text-align:left;color:var(--muted);">${r.ym.substring(0,4)}.${r.ym.substring(4,6)}월</td>
      <td class="tp-data-td">${fmt(r.price)}</td>
      <td class="tp-data-td">${fmt(r.avg_tgt)}</td>
      <td class="tp-data-td">${fmt(r.min_tgt)}</td>
      <td class="tp-data-td">${fmt(r.max_tgt)}</td>
      <td class="tp-data-td">${r.brk_cnt}</td>
      <td class="tp-data-td" style="${upCl}">${upStr}</td>
    </tr>`;}).join('');}
renderDateNav();renderIdeas();document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap')){closeSearchDropdown();closeGlSearchDropdown();}});ensureGlPeer();ensureGlLive();(function(){const u=(function(){try{return JSON.parse(localStorage.getItem(_UK)||'null');}catch(e){return null;}})();if(u&&u.name)document.getElementById('user-avatar').textContent=u.name[0];})();_startKrPricesPolling();(async function(){function fmtN(v,dec){return Number(v).toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec});}
function setCard(id,valHtml,chgHtml){const el=document.getElementById(id);if(!el)return;el.querySelector('.value').innerHTML=valHtml;el.querySelector('.change').innerHTML=chgHtml;}
function chgHtml(rt){if(rt==null)return'';const c=rt>0?'#ef4444':rt<0?'#3b82f6':'#94a3b8';const arr=rt>0?'▲':rt<0?'▼':'';return`<span style="color:${c}">${arr}${Math.abs(rt).toFixed(2)}%</span>`;}
try{const d=await fetch('/moneyweb/api/us_indicators_live.json?t='+Date.now()).then(r=>r.json());const ind=d.indicators||{};const MAP={'SOX':{id:'idx-SOX',fmt:v=>fmtN(v,2),prefix:''},'TNX':{id:'ind-tny',fmt:v=>v.toFixed(2)+'%',prefix:''},'DXY':{id:'ind-dxy',fmt:v=>fmtN(v,2),prefix:''},'VIX':{id:'ind-vix',fmt:v=>fmtN(v,2),prefix:''},'WTI':{id:'ind-wti',fmt:v=>fmtN(v,2),prefix:'$'},'RUT':{id:'idx-RUSSELL',fmt:v=>fmtN(v,2),prefix:''},'YM_F':{id:'idx-DOWF',fmt:v=>fmtN(v,2),prefix:''},'NQ_F':{id:'idx-NASDAQF',fmt:v=>fmtN(v,2),prefix:''},'ES_F':{id:'idx-SP500F',fmt:v=>fmtN(v,2),prefix:''},};for(const[key,cfg]of Object.entries(MAP)){const row=ind[key];if(!row)continue;setCard(cfg.id,cfg.prefix+cfg.fmt(row.val),chgHtml(row.chg_rt));}}catch(e){}})();(function(){const _d=new Date();_d.setHours(_d.getHours()+9);const today=_d.toISOString().slice(0,10);const lsKey='visitor_counted_'+today;const cacheKey='visitor_count_'+today;const ns='moneyland-reweb';const apiBase='https://api.counterapi.dev/v1/'+ns+'/'+today;function showCount(n){const el=document.getElementById('visitor-count');if(el&&n!=null)el.textContent=Number(n).toLocaleString()+'명';}
try{const c=localStorage.getItem(cacheKey);if(c)showCount(c);}catch(e){}
let counted=null;try{counted=localStorage.getItem(lsKey);}catch(e){}
fetch(apiBase+(counted?'/':'/up')).then(r=>r.ok?r.json():null).then(d=>{if(d&&d.count!=null){showCount(d.count);try{localStorage.setItem(cacheKey,d.count);if(!counted)localStorage.setItem(lsKey,'1');}catch(e){}}}).catch(()=>{});})();