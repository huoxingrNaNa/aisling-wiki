(function(){
"use strict";
var $=function(s){return document.querySelector(s)};
var root=document.documentElement;
var tb=$('.topbar');
function barH(){return tb?tb.offsetHeight:46}
var tBtn=$('#themeBtn');
function applyT(t){
root.setAttribute('data-theme',t);
if(tBtn){tBtn.textContent=(t==='dark'?'\u2600\ufe0f':'\ud83c\udf19');tBtn.setAttribute('aria-label',t==='dark'?'\u5207\u6362\u5230\u6d45\u8272':'\u5207\u6362\u5230\u6df1\u8272')}
try{localStorage.setItem('aisling-theme',t)}catch(e){}
}
applyT(root.getAttribute('data-theme')||'light');
if(tBtn){tBtn.addEventListener('click',function(){applyT(root.getAttribute('data-theme')==='dark'?'light':'dark')})}
var mb=$('#menuBtn'),mask=$('#mask');
function closeNav(){document.body.classList.remove('nav-open');if(mb){mb.setAttribute('aria-expanded','false')}}
if(mb){mb.addEventListener('click',function(){var o=document.body.classList.toggle('nav-open');mb.setAttribute('aria-expanded',o?'true':'false')})}
if(mask){mask.addEventListener('click',closeNav)}
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeNav()}});
function fixH(){var h=barH();var sb=$('#sidebar');if(sb){sb.style.top=h+'px'}if(mask){mask.style.top=h+'px'}}
fixH();window.addEventListener('resize',fixH);window.addEventListener('orientationchange',function(){setTimeout(fixH,200)});
var cur=$('.sidebar a.active');
if(cur&&cur.scrollIntoView){try{cur.scrollIntoView({block:'center'})}catch(e){}}
var inp=$('#navFilter');
if(inp){var items=[].slice.call(document.querySelectorAll('.sidebar ul li'));var empty=$('.nav-empty');
inp.addEventListener('input',function(){
var q=inp.value.trim().toLowerCase(),n=0;
items.forEach(function(li){
if(li.classList.contains('nav-empty')){return}
var a=li.querySelector('a');if(!a){return}
var hay=(a.textContent+' '+(a.getAttribute('data-title')||'')).toLowerCase();
var ok=(q==='')||(hay.indexOf(q)>-1);
li.style.display=ok?'':'none';
if(ok){n++}
});
if(empty){empty.hidden=(n>0)}
});
inp.addEventListener('keydown',function(e){if(e.key==='Escape'){inp.value='';inp.dispatchEvent(new Event('input'))}});
}
var bar=$('#progress'),tt=$('#toTop');
function onScroll(){
var st=window.pageYOffset||root.scrollTop||0;
var dh=root.scrollHeight-window.innerHeight;
if(bar){bar.style.width=(dh>0?Math.min(100,st*100/dh):0)+'%'}
if(tt){tt.classList.toggle('show',st>380)}
}
window.addEventListener('scroll',onScroll,{passive:true});
window.addEventListener('resize',onScroll);
onScroll();
if(tt){tt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})})}
var doc=$('.doc');
if(doc){
[].slice.call(doc.querySelectorAll('a[href^="http"]')).forEach(function(a){a.setAttribute('target','_blank');a.setAttribute('rel','noopener noreferrer')});
var re=/(https?:\/\/[^\s\uff0c\u3002\uff1b\uff1a\u3001\uff01\uff1f\uff08\uff09()\[\]\u3010\u3011<>"'\u300c\u300d]+)|(\bb23\.tv\/[A-Za-z0-9]+)/g;
var w=document.createTreeWalker(doc,NodeFilter.SHOW_TEXT,null,false);
var nodes=[],n;
while((n=w.nextNode())){
var p=n.parentNode&&n.parentNode.nodeName?n.parentNode.nodeName.toUpperCase():'';
if(p==='A'||p==='CODE'||p==='PRE'||p==='SCRIPT'||p==='STYLE'){continue}
if(!n.nodeValue){continue}
re.lastIndex=0;
if(re.test(n.nodeValue)){nodes.push(n)}
}
nodes.forEach(function(node){
var txt=node.nodeValue,frag=document.createDocumentFragment(),last=0,m;
re.lastIndex=0;
while((m=re.exec(txt))){
if(m.index>last){frag.appendChild(document.createTextNode(txt.slice(last,m.index)))}
var url=m[1]?m[1]:('https://'+m[2]);
var a=document.createElement('a');
a.setAttribute('href',url);a.setAttribute('target','_blank');a.setAttribute('rel','noopener noreferrer');
a.textContent=m[0];
frag.appendChild(a);
last=m.index+m[0].length;
}
if(last<txt.length){frag.appendChild(document.createTextNode(txt.slice(last)))}
if(node.parentNode){node.parentNode.replaceChild(frag,node)}
});
[].slice.call(doc.querySelectorAll('img')).forEach(function(im){
im.addEventListener('error',function(){
im.setAttribute('data-offline','0');
im.setAttribute('alt',(im.getAttribute('alt')||'\u56fe\u7247')+'\uff08\u8be5\u56fe\u9700\u8054\u7f51\uff0c\u5f53\u524d\u65e0\u6cd5\u663e\u793a\uff09');
},{once:true});
});
}
})();
/* nav-group sync */
(function(){
"use strict";
var inp=document.getElementById('navFilter');
var sb=document.getElementById('sidebar');
if(!inp||!sb){return}
var grps=[].slice.call(sb.querySelectorAll('li.nav-grp'));
if(!grps.length){return}
function sync(){
grps.forEach(function(g){
var li=g.nextElementSibling,vis=false;
while(li&&!li.classList.contains('nav-grp')){
if(li.style.display!=='none'){vis=true;break}
li=li.nextElementSibling;
}
g.style.display=vis?'':'none';
});
}
inp.addEventListener('input',sync);
sync();
})();
