(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const T of s.addedNodes)T.tagName==="LINK"&&T.rel==="modulepreload"&&o(T)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}})();const h=[{t:0,a:"APPEND_HTML",s:"#app",v:'<h1 class="text-target"></h1>'},{t:0,a:"TYPE_TEXT",s:".text-target",v:"0.05:Title geos"},{t:.4,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.3,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.4,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.2,a:"TYPE_TEXT",s:".text-target",v:"0.05:oes here"},{t:.4,a:"APPEND_TEXT",s:".text-target",v:"."},{t:.3,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.3,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.3,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.025,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.025,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.025,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.025,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.025,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.025,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.025,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.025,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.025,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.025,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.025,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.025,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.025,a:"SLICE_TEXT",s:".text-target",v:"0..-1"},{t:.2,a:"TYPE_TEXT",s:".text-target",v:"0.05:Matthew Meeks"},{t:.8,a:"DISABLE_CLASS",s:".text-target",v:"text-target"},{t:0,a:"APPEND_HTML",s:"#app",v:'<div id="main"><p class="text-target"></p></div>'},{t:1,a:"TYPE_TEXT",s:".text-target",v:"0.025:I'm an experienced sof"},{t:0,a:"SPEED",s:"",v:"100"},{t:1,a:"TYPE_TEXT",s:".text-target",v:"0.1:tware engineer focused in FinTech helping companies achieve feature-driven impact for externally facing clients. By leveraging client interactions, component-appropriate design principles, requirement workshops, and test-driven development, I establish long-lasting solutions in all areas of the technology stack."},{t:.8,a:"DISABLE_CLASS",s:".text-target",v:"text-target"},{t:0,a:"APPEND_HTML",s:"#main",v:'<p class="text-target"></p>'},{t:1,a:"TYPE_TEXT",s:".text-target",v:"0.1:I believe production-ready code is written thoughtfully, purposefully, and with clear intent."},{t:.8,a:"DISABLE_CLASS",s:".text-target",v:"text-target"},{t:0,a:"APPEND_HTML",s:"#main",v:'<h2 class="text-target"></h2>'},{t:1,a:"TYPE_TEXT",s:".text-target",v:"0.1:Projects"},{t:.8,a:"DISABLE_CLASS",s:".text-target",v:"text-target"},{t:0,a:"APPEND_HTML",s:"#main",v:'<ul id="proj_list"><li><a href="/geoimg/" class="text-target"></a></li></ul>'},{t:1,a:"TYPE_TEXT",s:".text-target",v:"0.1:GeoImg - Photos I've taken placed on a globe based on the location metadata from the images."},{t:.8,a:"DISABLE_CLASS",s:".text-target",v:"text-target"},{t:0,a:"APPEND_HTML",s:"#proj_list",v:'<li><a href="/resume/" class="text-target"></a></li>'},{t:1,a:"TYPE_TEXT",s:".text-target",v:"0.1:Resume - Self explanatory."},{t:50,a:"SPEED",s:"",v:"1"},{t:.8,a:"DISABLE_CLASS",s:".text-target",v:"text-target"},{t:0,a:"APPEND_HTML",s:"#main",v:'<p class="text-target"></p>'},{t:1,a:"TYPE_TEXT",s:".text-target",v:"0.1:// TODO: "},{t:1,a:"TYPE_TEXT",s:".text-target",v:"0.1:add more"},{t:.8,a:"DISABLE_CLASS",s:".text-target",v:"text-target"},{t:0,a:"APPEND_HTML",s:"#main",v:`<p><a href="." onclick="localStorage.removeItem('visited');navigation.reload()" class="text-target"></a></p>`},{t:1,a:"TYPE_TEXT",s:".text-target",v:"0.1:(RESET)",skip:!0}],L={main:h};var y=(t=>(t[t.APPEND_TEXT=1]="APPEND_TEXT",t[t.APPEND_HTML=2]="APPEND_HTML",t[t.REPLACE_TEXT=3]="REPLACE_TEXT",t[t.REPLACE_HTML=4]="REPLACE_HTML",t[t.ENABLE_CLASS=5]="ENABLE_CLASS",t[t.DISABLE_CLASS=6]="DISABLE_CLASS",t[t.TOGGLE_CLASS=7]="TOGGLE_CLASS",t[t.STYLE_PROP=8]="STYLE_PROP",t[t.SLICE_TEXT=9]="SLICE_TEXT",t[t.SLICE_HTML=10]="SLICE_HTML",t[t.TYPE_TEXT=11]="TYPE_TEXT",t[t.SPEED=12]="SPEED",t))(y||{});const I=(()=>({...L,main:L.main.map(t=>({...t,a:y[t.a]}))}))();let n=0,v=0,i=1,l=i,c=0,d=c;const p=document.querySelector("#app"),b=document.querySelector("#displace"),C=document.querySelector("#displace2"),X=document.querySelector("#offset1"),D=document.querySelector("#offset2"),m=document.querySelector("#overlay"),u=document.querySelector("#ff-indicator"),x=document.querySelector("#tracking-indicator");async function k(t){i=t,i>1?(m.style.visibility="",u.style.visibility="",u.textContent=`FF ${t.toFixed(0)}x >>`,p.classList.add("glitch"),setInterval(S,1e3/30)):u.style.visibility="hidden",i===1&&(await M(),p.classList.remove("glitch"))}function S(){const t=l-1;l=l+(i-l)*.1,c+=(Math.random()*t-t/2)*.01,c%=document.body.clientHeight,b.scale.baseVal=t/100*3,C.scale.baseVal=t/100*20,document.body.style.setProperty("--speed",l.toString()),d=d+(c-d)*.5;const e=l/2,r=(d-e+document.body.clientHeight)%document.body.clientHeight;X.dy.baseVal=r-document.body.clientHeight,D.dy.baseVal=r}let f=0;async function M(){m.style.visibility="",x.style.visibility="";const t=++f;for(;Math.abs(c)>1||Math.abs(l-i)>.05;){if(t!=f)return;c*=.95,S(),await new Promise(e=>setTimeout(e,1e3/30))}c=0,d=c,l=i,S(),m.style.visibility="hidden",x.style.visibility="hidden"}let _=I.main;const E=!!localStorage.getItem("visited");localStorage.setItem("visited","1");const g=_.findIndex(t=>!!t.skip);function P(){if(n>=_.length)return;const t=_[n];setTimeout(async()=>{switch(v+=t.t,t.a){case 1:{document.querySelector(t.s).insertAdjacentText("beforeend",t.v);break}case 2:{const e=document.querySelector(t.s);e.innerHTML+=t.v;break}case 3:{const e=document.querySelector(t.s);e.textContent=t.v;break}case 4:{const e=document.querySelector(t.s);e.innerHTML=t.v;break}case 5:{document.querySelector(t.s).classList.add(t.v);break}case 6:{document.querySelector(t.s).classList.remove(t.v);break}case 7:{document.querySelector(t.s).classList.toggle(t.v);break}case 8:{const e=document.querySelector(t.s),[r,o]=t.v.split(":");e.style[r]=o;break}case 9:{const e=document.querySelector(t.s),[r,o]=t.v.split("..");e.textContent=e.textContent.slice(Number(r),Number(o));break}case 10:{const e=document.querySelector(t.s);e.innerHTML=t.v;break}case 11:{const e=t.v.indexOf(":");if(e<0)throw new Error("Separator not provided");const r=Number(t.v.substring(0,e))*1e3,o=t.v.substring(e+1),a=document.querySelector(t.s);for(let s=0;s<o.length;s++)a.insertAdjacentText("beforeend",o[s]),(n>=g||!E)&&await new Promise(T=>setTimeout(T,r/i));break}case 12:{(n>=g||!E)&&await k(Number(t.v));break}default:throw new Error(`Invalid event action ID: ${t.a}`)}n++,P()},n<g&&E||t.t+v<=JSON.parse(localStorage.getItem("skip")??"-1")?0:t.t*1e3/i)}P();
