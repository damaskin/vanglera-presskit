import"./modulepreload-polyfill-P2Xu9kJm.js";import{i as e,n as t,r as n}from"./vendor-CIlkCAyF.js";import{_ as r,a as i,c as a,d as o,f as s,g as c,h as l,i as u,l as d,m as f,n as p,o as m,p as h,r as g,s as ee,t as _,v}from"./shared-D6kLlnoE.js";var y,b,x=function(){return y||typeof window<`u`&&(y=window.gsap)&&y.registerPlugin&&y},S=function(e,t){return!!(e===void 0?t:e&&!~(e+``).indexOf(`false`))},C=function(e){if(y=e||x(),y){b=y.registerEase;var t=y.parseEase(),n;for(n in t)t[n].config||t[n];for(n in b(`slow`,O),b(`expoScale`,k),b(`rough`,A),j)n!==`version`&&y.core.globals(n,j[n])}},w=function(e,t,n){e=Math.min(1,e||.7);var r=e<1?t||t===0?t:.7:0,i=(1-e)/2,a=i+e,o=S(n);return function(e){var t=e+(.5-e)*r;return e<i?o?1-(e=1-e/i)*e:t-(e=1-e/i)*e*e*e*t:e>a?o?e===1?0:1-(e=(e-a)/i)*e:t+(e-t)*(e=(e-a)/i)*e*e*e:o?1:t}},T=function(e,t,n){var r=Math.log(t/e),i=t-e;return n&&=y.parseEase(n),function(t){return(e*Math.exp(r*(n?n(t):t))-e)/i}},E=function(e,t,n){this.t=e,this.v=t,n&&(this.next=n,n.prev=this,this.c=n.v-t,this.gap=n.t-e)},D=function(e){typeof e!=`object`&&(e={points:+e||20});for(var t=e.taper||`none`,n=[],r=0,i=(+e.points||20)|0,a=i,o=S(e.randomize,!0),s=S(e.clamp),c=y?y.parseEase(e.template):0,l=(+e.strength||1)*.4,u,d,f,p,m,h,g;--a>-1;)u=o?Math.random():1/i*a,d=c?c(u):u,t===`none`?f=l:t===`out`?(p=1-u,f=p*p*l):t===`in`?f=u*u*l:u<.5?(p=u*2,f=p*p*.5*l):(p=(1-u)*2,f=p*p*.5*l),o?d+=Math.random()*f-f*.5:a%2?d+=f*.5:d-=f*.5,s&&(d>1?d=1:d<0&&(d=0)),n[r++]={x:u,y:d};for(n.sort(function(e,t){return e.x-t.x}),h=new E(1,1,null),a=i;a--;)m=n[a],h=new E(m.x,m.y,h);return g=new E(0,0,h.t?h:h.next),function(e){var t=g;if(e>t.t){for(;t.next&&e>=t.t;)t=t.next;t=t.prev}else for(;t.prev&&e<=t.t;)t=t.prev;return g=t,t.v+(e-t.t)/t.gap*t.c}},O=w(.7);O.ease=O,O.config=w;var k=T(1,2);k.config=T;var A=D();A.ease=A,A.config=D;var j={SlowMo:O,RoughEase:A,ExpoScaleEase:k};for(var M in j)j[M].register=C,j[M].version=`3.15.0`;x()&&y.registerPlugin(O);function N(){let t=document.querySelector(`[data-bio-toggle]`),i=document.querySelector(`[data-bio-more]`);if(!t||!i)return;let a=!1;i.inert=!0,t.addEventListener(`click`,()=>{a=!a,t.setAttribute(`aria-expanded`,String(a)),i.inert=!a;let o=()=>n.refresh();r?(e.set(i,{height:a?`auto`:0,opacity:+!!a}),o()):e.to(i,{height:a?`auto`:0,opacity:+!!a,duration:a?1.1:.8,ease:`expo.inOut`,onComplete:o})})}var P=`#version 300 es
// Три жанра — три процедурные «абстракции» в одном холсте:
//   0 Sexy Groove     — шёлковые складки (вложенный fbm)
//   1 Hypnotic Techno — закрученные кольца, муар
//   2 Dark Rave       — лазеры сквозь дым и строб
// Плитки — прямоугольники .genre__view, вне них холст прозрачный.
precision highp float;

uniform vec2 uRes;
uniform vec4 uRect[3]; // плитки в пикселях холста: x, y (снизу), ширина, высота
uniform vec3 uTimes;   // своё время у каждой плитки: наведение и музыка его ускоряют
uniform vec3 uHover;   // 0..1
uniform vec3 uReveal;  // 0..1 — проявление при прокрутке
uniform float uEnergy; // 0..1 — играет музыка
uniform float uFrame;  // счётчик кадров для зерна

out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = r * p * 2.02 + 7.3;
    a *= 0.5;
  }
  return v;
}

vec3 groove(vec2 p, float t) {
  vec2 q = p * 1.6;
  float a = fbm(q + vec2(t * 0.07, -t * 0.05));
  float b = fbm(q * 1.3 + a * 2.0 + vec2(-t * 0.05, t * 0.08));
  float c = fbm(q + b * 2.6 + t * 0.03);
  float folds = pow(0.5 + 0.5 * sin(c * 26.0 + b * 6.0 - t * 0.4), 3.0);
  float v = 0.1 + folds * (0.3 + 0.6 * smoothstep(0.35, 0.7, c));
  v *= 0.5 + 0.6 * smoothstep(0.3, 0.7, b);
  return vec3(v) * vec3(1.0, 0.95, 0.9);
}

vec3 hypno(vec2 p, float t) {
  float r = length(p);
  float a = atan(p.y, p.x);
  // Тонкие кольца уходят наружу, поверх — закрученные лучи: муар
  float rings = 1.0 - smoothstep(0.0, 0.2, abs(sin(r * 55.0 - t * 4.0)));
  float spiral = 1.0 - smoothstep(0.0, 0.24, abs(sin(a * 12.0 + log(r + 0.02) * 10.0 - t * 1.2)));
  float v = max(rings * 0.7, spiral * 0.45);
  v *= smoothstep(0.02, 0.18, r) * (1.0 - smoothstep(0.28, 0.75, r));
  v += exp(-r * 10.0) * (0.3 + 0.2 * sin(t * 3.0));
  return vec3(v * 0.8);
}

vec3 rave(vec2 p, float t) {
  vec2 d = p - vec2(sin(t * 0.6) * 0.12, 0.62);
  float ang = atan(d.x, -d.y);
  float beams = 0.0;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float aim = sin(t * (0.45 + fi * 0.11) + fi * 2.1) * 0.75;
    beams += exp(-abs(ang - aim) * 90.0) * (0.6 + 0.4 * sin(t * 7.0 + fi * 3.0));
  }
  float smoke = fbm(p * 2.6 + vec2(t * 0.05, t * 0.18));
  float fall = 1.0 - smoothstep(0.0, 1.5, length(d));
  float strobe = step(0.93, hash(vec2(floor(t * 9.0), 1.7)));
  vec3 col = vec3(0.95, 0.1, 0.14) * beams * (0.25 + smoke * 1.1) * fall * 1.4;
  col += vec3(smoke * smoke * 0.34) + vec3(strobe * 0.3 * smoke);
  return col;
}

void main() {
  vec2 f = gl_FragCoord.xy;
  int id = -1;
  vec4 R = vec4(0.0);
  for (int i = 0; i < 3; i++) {
    vec4 r = uRect[i];
    if (f.x >= r.x && f.x < r.x + r.z && f.y >= r.y && f.y < r.y + r.w) {
      id = i;
      R = r;
    }
  }
  if (id < 0) {
    outColor = vec4(0.0);
    return;
  }

  vec2 uv = (f - R.xy) / R.zw;
  vec2 p = (uv - 0.5) * vec2(R.z / R.w, 1.0);
  float t = id == 0 ? uTimes.x : id == 1 ? uTimes.y : uTimes.z;
  float hov = id == 0 ? uHover.x : id == 1 ? uHover.y : uHover.z;
  float rev = id == 0 ? uReveal.x : id == 1 ? uReveal.y : uReveal.z;

  vec3 col = id == 0 ? groove(p, t) : id == 1 ? hypno(p, t) : rave(p, t);
  col *= 0.78 + hov * 0.35 + uEnergy * 0.15;

  // Виньетка плитки
  vec2 e = uv * (1.0 - uv);
  col *= pow(clamp(e.x * e.y * 18.0, 0.0, 1.0), 0.35);

  // Проявление снизу, рваной кромкой
  float field = fbm(p * 3.0 + float(id) * 5.0) * 0.5 + (1.0 - uv.y) * 0.6;
  col *= 1.0 - smoothstep(rev * 1.2 - 0.1, rev * 1.2, field);

  // Зерно
  col += (hash(f + fract(uFrame * 0.0137) * 97.0) - 0.5) * 0.06;

  outColor = vec4(max(col, 0.0), 1.0);
}
`;function F(e,t){return e.getContext(`webgl2`,{alpha:t,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:`high-performance`})}function I(e,t,n){let r=e.createShader(t);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(r)??`shader compile failed`);return r}function L(e,t,n,r){let i=e.createProgram();if(e.attachShader(i,I(e,e.VERTEX_SHADER,t)),e.attachShader(i,I(e,e.FRAGMENT_SHADER,n)),e.linkProgram(i),!e.getProgramParameter(i,e.LINK_STATUS))throw Error(e.getProgramInfoLog(i)??`link failed`);e.useProgram(i),e.bindVertexArray(e.createVertexArray());let a={};for(let t of r)a[t]=e.getUniformLocation(i,t);return a}function R(e,t,n,r){let i=Math.min(window.devicePixelRatio||1,r),a=Math.max(1,Math.round(t.clientWidth*i*n)),o=Math.max(1,Math.round(t.clientHeight*i*n));return t.width===a&&t.height===o?!1:(t.width=a,t.height=o,e.viewport(0,0,a,o),!0)}var z=class{value;min;slow=0;constructor(e,t){this.value=e,this.min=t}update(e){return e>.028?this.slow++:this.slow=Math.max(0,this.slow-1),this.slow>40&&this.value>this.min&&(this.value=Math.max(this.min,this.value-.15),this.slow=0,!0)}},te=[`uRes`,`uRect`,`uTimes`,`uHover`,`uReveal`,`uEnergy`,`uFrame`],ne=class e{canvas;gl;views;state={hover:[0,0,0],reveal:[0,0,0],energyTarget:0};times=[0,7,13];hover=[0,0,0];energy=0;frame=0;quality;loc;rects=new Float32Array(12);static create(t,n){let r=F(t,!0);if(!r)return null;try{return new e(t,r,n)}catch(e){return console.warn(`[noir-genres-gl]`,e),null}}constructor(e,t,n){this.canvas=e,this.gl=t,this.views=n,this.loc=L(t,d,P,te),t.clearColor(0,0,0,0),this.quality=new z(matchMedia(`(pointer: coarse)`).matches?.6:.8,.45),this.resize()}resize(){R(this.gl,this.canvas,this.quality.value,1.5)}render(e){let{gl:t,loc:n,state:r}=this;e=Math.min(e,.1),this.frame++,this.energy+=(r.energyTarget-this.energy)*(1-Math.exp(-e*1.5));for(let t=0;t<3;t++)this.hover[t]+=(r.hover[t]-this.hover[t])*(1-Math.exp(-e*5)),this.times[t]+=e*(1+this.hover[t]*1.4+this.energy*.9);let i=this.canvas.getBoundingClientRect(),a=this.canvas.width/Math.max(i.width,1);this.views.forEach((e,t)=>{let n=e.getBoundingClientRect();this.rects.set([(n.left-i.left)*a,(i.bottom-n.bottom)*a,n.width*a,n.height*a],t*4)}),t.clear(t.COLOR_BUFFER_BIT),t.uniform2f(n.uRes,this.canvas.width,this.canvas.height),t.uniform4fv(n.uRect,this.rects),t.uniform3f(n.uTimes,this.times[0],this.times[1],this.times[2]),t.uniform3f(n.uHover,this.hover[0],this.hover[1],this.hover[2]),t.uniform3f(n.uReveal,r.reveal[0],r.reveal[1],r.reveal[2]),t.uniform1f(n.uEnergy,this.energy),t.uniform1f(n.uFrame,this.frame),t.drawArrays(t.TRIANGLES,0,3),this.quality.update(e)&&this.resize()}};function re(){let t=document.querySelector(`[data-genres]`);if(!t)return;let i=t.querySelector(`[data-genres-gl]`),a=Array.from(t.querySelectorAll(`[data-genre]`)),o=a.map(e=>e.querySelector(`.genre__view`)),s=ne.create(i,o);if(t.classList.add(s?`has-gl`:`is-fallback`),!s)return;i.addEventListener(`webglcontextlost`,()=>t.classList.replace(`has-gl`,`is-fallback`));let c=!1;new IntersectionObserver(([e])=>c=e.isIntersecting,{rootMargin:`200px 0px`}).observe(t),new ResizeObserver(()=>{s.resize(),r&&s.render(.016)}).observe(i),r?(s.state.reveal=[1,1,1],requestAnimationFrame(()=>s.render(.016)),n.addEventListener(`refresh`,()=>s.render(.016))):(a.forEach((t,n)=>{let r={v:0};e.to(r,{v:1,duration:2.2,delay:n*.18,ease:`power2.out`,onUpdate:()=>s.state.reveal[n]=r.v,scrollTrigger:{trigger:t,start:`top 85%`,once:!0}}),f&&(t.addEventListener(`pointerenter`,()=>s.state.hover[n]=1),t.addEventListener(`pointerleave`,()=>s.state.hover[n]=0))}),window.addEventListener(`audio:state`,e=>{s.state.energyTarget=+!!e.detail.playing}),e.ticker.add((e,t)=>{c&&!document.hidden&&s.render(t/1e3)}))}var ie=`#version 300 es
// Обложка noir: фото в темноте, освещённое «фонарём» за курсором.
// Слои: дым (fbm) с искажением, жидкая рябь вокруг света, сбой строк,
// красный свет снизу слева (дышит, под музыкой бьёт в такт), проявление
// от лица и сгорание снизу вверх при прокрутке.
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform sampler2D uImg;
uniform float uHasImg;   // 0, пока текстура не загружена
uniform vec4 uFrame;     // фото в пикселях холста: x, y (снизу), ширина, высота
uniform vec2 uFace;      // лицо, uv холста
uniform vec2 uLight;     // свет, uv холста
uniform float uLightVel; // 0..1 — скорость движения света
uniform float uScroll;   // 0..1 — сгорание
uniform float uEnergy;   // 0..1 — играет музыка
uniform float uIntro;    // 0..1 — проявление
uniform float uGlitch;   // 0..1 — сбой

out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = r * p * 2.03 + 11.7;
    a *= 0.5;
  }
  return v;
}

float lumAt(vec2 q) {
  vec3 c = texture(uImg, clamp(q, 0.0, 1.0)).rgb;
  return dot(c, vec3(0.299, 0.587, 0.114));
}

// 1 внутри [a, b], мягкие края шириной w
float band(float x, float a, float b, float w) {
  return smoothstep(a, a + w, x) * (1.0 - smoothstep(b - w, b, x));
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uRes;
  vec2 sq = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = (uv - 0.5) * sq;
  float t = uTime;

  // Дым
  vec2 drift = vec2(t * 0.035, -t * 0.022);
  float n1 = fbm(p * 1.7 + drift);
  float n2 = fbm(p * 2.3 - drift * 1.3 + n1 * 1.4);

  // Искажение: дым + рябь вокруг света (сильнее, когда свет движется)
  vec2 disp = (vec2(n1, n2) - 0.5) * (0.006 + uEnergy * 0.006);
  vec2 dl = (uv - uLight) * sq;
  float rl = length(dl);
  float ripple = sin(rl * 46.0 - t * 4.0) * exp(-rl * 6.0) * (0.0012 + uLightVel * 0.02);
  disp += dl / max(rl, 1e-4) * ripple / sq;

  // Сбой: горизонтальные полосы съезжают
  float row = floor(uv.y * 28.0);
  float gk = step(0.55, hash(vec2(row, floor(t * 24.0)))) * uGlitch;
  disp.x += (hash(vec2(row, floor(t * 13.0) + 3.0)) - 0.5) * 0.08 * gk;

  vec2 puv = ((uv + disp) * uRes - uFrame.xy) / uFrame.zw;

  // Хроматическая аберрация
  float ca = 0.0012 + uGlitch * 0.012 + uEnergy * 0.002 + length(p) * 0.0025;
  vec3 img = vec3(lumAt(puv + vec2(ca, 0.0)), lumAt(puv), lumAt(puv - vec2(ca, 0.0)));

  // Края фото растворяются в дыму
  float edge = n2 * 0.12;
  float mask = band(puv.x, 0.0, 1.0, 0.3 + edge) * band(puv.y, 0.0, 1.0, 0.12 + edge) * uHasImg;

  // Низкий ключ: тени глубже, светлая стена гаснет
  img = smoothstep(0.0, 1.0, pow(img, vec3(1.6))) * 0.8;

  // Свет: фонарь + слабое заполнение лица
  float spot = exp(-rl * rl * 5.5);
  vec2 df = (uv - uFace) * sq;
  float face = exp(-dot(df, df) * 2.5);
  float beat = exp(-fract(t * 2.0) * 5.0) * uEnergy;
  float light = 0.1 + spot * (1.05 + beat * 0.35) + face * 0.1;
  vec3 col = img * mask * light;

  // Дым, подсвеченный фонарём
  float smoke = smoothstep(0.35, 0.95, n2);
  col += vec3(0.75, 0.74, 0.72) * smoke * (0.02 + spot * 0.11);

  // Красный свет снизу слева
  float red = exp(-length((uv - vec2(-0.05, 0.12)) * sq) * 1.9);
  float breath = 0.55 + 0.45 * sin(t * 0.7);
  float redAmt = red * (0.1 + 0.06 * breath + beat * 0.45 + uEnergy * 0.08);
  col += vec3(0.62, 0.03, 0.05) * redAmt * (0.25 + img.g * mask * 1.6 + smoke * 0.6);

  // Виньетка
  col *= 1.0 - smoothstep(0.2, 1.35, length(p * vec2(0.85, 1.1)));

  // Проявление от лица наружу, с тлеющей кромкой
  float fi = n1 * 0.45 + length(df) * 0.85;
  float front = uIntro * 1.45;
  col *= smoothstep(fi - 0.08, fi + 0.08, front);
  col += vec3(0.7, 0.06, 0.08) * (1.0 - smoothstep(0.0, 0.06, abs(fi - front))) * (1.0 - uIntro) * 0.8;

  // Сгорание снизу вверх; после него остаются дым и угли
  float field = fbm(p * 3.2 + 4.0) * 0.55 + uv.y * 0.75;
  float burn = uScroll * 1.42 - 0.1;
  float alive = smoothstep(burn - 0.015, burn + 0.015, field);
  float rim = (1.0 - smoothstep(0.0, 0.05, abs(field - burn))) * step(0.002, uScroll);
  col = col * alive + vec3(0.03) * smoke * (1.0 - alive);
  col += vec3(0.72, 0.04, 0.06) * rim * (0.45 + 0.55 * noise(p * 40.0 + t));
  col += vec3(1.0, 0.32, 0.22) * pow(rim, 8.0) * 0.45;
  float ash = step(0.985, hash(floor(frag / 3.0) + floor(t * 3.0))) * (1.0 - alive) * (1.0 - smoothstep(0.0, 0.4, burn - field));
  col += vec3(0.85, 0.12, 0.1) * ash * 0.5;

  // Зерно и красный отсвет сбоя
  col += (hash(frag + fract(t * 7.13) * 91.0) - 0.5) * 0.055;
  col += vec3(0.4, 0.0, 0.02) * gk * 0.25;

  outColor = vec4(max(col, 0.0), 1.0);
}
`,B=[.64,.3],V=[`uRes`,`uTime`,`uImg`,`uHasImg`,`uFrame`,`uFace`,`uLight`,`uLightVel`,`uScroll`,`uEnergy`,`uIntro`,`uGlitch`],H=(e,t,n)=>Math.min(n,Math.max(t,e)),U=class e{canvas;gl;state={pointer:[.5,.5],pointerActive:!1,scroll:0,energyTarget:0,intro:0,glitch:0};light=[.5,.6];lightVel=0;energy=0;imgSize=null;quality;loc;static create(t){let n=F(t,!1);if(!n)return null;try{return new e(t,n)}catch(e){return console.warn(`[noir-hero-gl]`,e),null}}constructor(e,t){this.canvas=e,this.gl=t,this.loc=L(t,d,ie,V),t.uniform1i(this.loc.uImg,0),this.quality=new z(matchMedia(`(pointer: coarse)`).matches?.55:.75,.4),this.resize()}setImage(e){let{gl:t}=this,n=t.createTexture();t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,n),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),this.imgSize=[e.naturalWidth,e.naturalHeight]}resize(){R(this.gl,this.canvas,this.quality.value,2)}layout(e,t){let[n,r]=this.imgSize??[2,3],i=e/t<.9,a,o;if(i){let i=Math.max(e/n,t/r)*1.06;a=n*i,o=r*i}else o=t*1.12,a=o*n/r;let s=e*.5-B[0]*a,c=t*(i?.3:.36)-B[1]*o;return i&&(s=H(s,e-a,0),c=H(c,t-o,0)),{frame:[s,t-c-o,a,o],face:[(s+B[0]*a)/e,1-(c+B[1]*o)/t]}}render(e,t){let{gl:n,loc:r,state:i}=this;t=Math.min(t,.1);let a=this.canvas.width,o=this.canvas.height,{frame:s,face:c}=this.layout(a,o),l=i.pointerActive?i.pointer:[c[0]+Math.sin(e*.37)*.12,c[1]+.03+Math.cos(e*.29)*.07],u=1-Math.exp(-t*3),d=(l[0]-this.light[0])*u,f=(l[1]-this.light[1])*u;this.light[0]+=d,this.light[1]+=f;let p=Math.hypot(d,f)/Math.max(t,.001);this.lightVel+=(Math.min(p*.8,1)-this.lightVel)*(1-Math.exp(-t*4)),this.energy+=(i.energyTarget-this.energy)*(1-Math.exp(-t*1.5)),n.uniform2f(r.uRes,a,o),n.uniform1f(r.uTime,e),n.uniform1f(r.uHasImg,+!!this.imgSize),n.uniform4f(r.uFrame,s[0],s[1],s[2],s[3]),n.uniform2f(r.uFace,c[0],c[1]),n.uniform2f(r.uLight,this.light[0],this.light[1]),n.uniform1f(r.uLightVel,this.lightVel),n.uniform1f(r.uScroll,i.scroll),n.uniform1f(r.uEnergy,this.energy),n.uniform1f(r.uIntro,i.intro),n.uniform1f(r.uGlitch,i.glitch),n.drawArrays(n.TRIANGLES,0,3),this.quality.update(t)&&this.resize()}placeLight(){let{face:e}=this.layout(this.canvas.width,this.canvas.height);this.light=[e[0],e[1]+.03]}};function W(e){return e.innerHTML=[...e.textContent??``].map(e=>`<span class="hero__char"><span class="hero__glyph">${e}</span></span>`).join(``),Array.from(e.querySelectorAll(`.hero__char`))}var G=`rough({ template: power2.out, strength: 2.4, points: 26, taper: out, randomize: true, clamp: true })`;function K(){let t=document.querySelector(`[data-hero]`),i=t.querySelector(`[data-hero-gl]`),a=t.querySelector(`.hero__fallback img`),o=t.querySelector(`.hero__name`),s=t.querySelectorAll(`[data-hero-fade]`),c=W(o),l=o.querySelectorAll(`.hero__glyph`),u=a?(a.complete?Promise.resolve():new Promise(e=>a.addEventListener(`load`,()=>e(),{once:!0}))).then(()=>a.decode()).catch(()=>void 0):Promise.resolve(),d=U.create(i);if(t.classList.add(d?`has-gl`:`is-fallback`),i.addEventListener(`webglcontextlost`,()=>t.classList.replace(`has-gl`,`is-fallback`)),d){u.then(()=>{a?.naturalWidth&&d.setImage(a),d.placeLight(),r&&d.render(6,.016)});let n=!0;if(new IntersectionObserver(([e])=>n=e.isIntersecting).observe(t),new ResizeObserver(()=>{d.resize(),r&&d.render(6,.016)}).observe(i),r)d.state.intro=1;else{if(e.ticker.add((e,t)=>{n&&!document.hidden&&d.render(e,t/1e3)}),window.addEventListener(`audio:state`,e=>{d.state.energyTarget=+!!e.detail.playing}),f){let e=t.querySelector(`.hero__stage`);e.addEventListener(`pointermove`,e=>{let t=i.getBoundingClientRect();d.state.pointer=[(e.clientX-t.left)/t.width,1-(e.clientY-t.top)/t.height],d.state.pointerActive=!0}),e.addEventListener(`pointerleave`,()=>d.state.pointerActive=!1)}let r=()=>{let i=document.documentElement.classList.contains(`is-playing`);e.delayedCall(i?e.utils.random(1.6,3.6):e.utils.random(4,9),()=>{n&&d.state.scroll<.6&&(t.classList.add(`is-glitch`),e.timeline({onComplete:()=>t.classList.remove(`is-glitch`)}).to(d.state,{glitch:1,duration:.05}).to(d.state,{glitch:.35,duration:.08}).to(d.state,{glitch:1,duration:.04}).to(d.state,{glitch:0,duration:e.utils.random(.12,.3)})),r()})};r()}}r||e.timeline({scrollTrigger:{trigger:t,start:`top top`,end:`bottom bottom`,scrub:!0,onUpdate:e=>{d&&(d.state.scroll=e.progress)}}}).fromTo(c,{yPercent:0,rotate:0,opacity:1,filter:`blur(0px)`},{yPercent:()=>e.utils.random(-70,-20),rotate:()=>e.utils.random(-8,8),opacity:0,filter:`blur(14px)`,ease:`power1.in`,duration:.5,stagger:{each:.04,from:`random`}},.1).fromTo(t,{"--ui-fade":1},{"--ui-fade":0,ease:`none`,duration:.35},0).set({},{},1);let p=e.timeline({paused:!0});return r?d&&(d.state.intro=1):(p.fromTo(l,{opacity:0,yPercent:12,filter:`blur(10px)`},{opacity:1,yPercent:0,filter:`blur(0px)`,duration:1.6,ease:G,stagger:{each:.09,from:`random`},clearProps:`filter`},.5).fromTo(s,{opacity:0,y:22},{opacity:1,y:0,duration:1.1,ease:`power3.out`,stagger:.08},1.1).fromTo(`[data-header]`,{yPercent:-100,opacity:0},{yPercent:0,opacity:1,duration:1.1,ease:`power3.out`,clearProps:`transform,opacity`},1),d&&p.fromTo(d.state,{intro:0},{intro:1,duration:3.2,ease:`power2.out`},0)),n.addEventListener(`refresh`,()=>d?.resize()),{intro:p,imageReady:u}}var q=`vanglera-noir-seen`,J=`rough({ template: power1.out, strength: 3, points: 24, taper: out, randomize: true, clamp: true })`;function ae(){try{let e=sessionStorage.getItem(q)===`1`;return sessionStorage.setItem(q,`1`),e}catch{return!1}}function oe(){let t=document.querySelector(`[data-loader]`),n=t.querySelector(`[data-loader-word]`),r=t.querySelector(`[data-loader-count]`),i=t.querySelector(`[data-loader-line]`),a=t.querySelector(`.loader__meta`),o=ae();n.innerHTML=[...n.textContent??``].map(e=>`<span>${e}</span>`).join(``);let s=n.querySelectorAll(`span`),c=e.to(s,{opacity:1,duration:o?.5:1.3,ease:J,stagger:{each:o?.03:.1,from:`random`}}),l={v:0},u=()=>{r.textContent=String(Math.round(l.v)).padStart(3,`0`),i.style.transform=`scaleX(${l.v/100})`},d=e.to(l,{v:86,duration:o?.6:1.9,ease:`power2.out`,onUpdate:u});return{async finish(n,r){await Promise.all([n,c.then(),d.then()]),await new Promise(t=>{e.to(l,{v:100,duration:.35,ease:`power1.inOut`,onUpdate:u,onComplete:t})}),e.timeline({onComplete:()=>t.remove()}).fromTo(s,{filter:`blur(0px)`},{opacity:0,filter:`blur(12px)`,duration:.5,ease:J,stagger:{each:.03,from:`random`}},0).to(a,{opacity:0,duration:.3},0).to(t,{clipPath:`inset(49.6% 0% 49.6% 0%)`,duration:.45,ease:`power3.in`},.35).to(t,{clipPath:`inset(49.6% 50% 49.6% 50%)`,duration:.3,ease:`power2.in`},.8).call(r,[],.55)}}}var Y=180;function X(){let e=``;for(let t=0;t<Y;t++){let n=t/Y,r=.3+.32*Math.abs(Math.sin(n*17.3)*Math.sin(n*5.1+.8))+.28*Math.abs(Math.sin(n*83.1+1.3)),i=Math.max(.06,Math.min(1,r))*20;e+=`M${t*4+1} ${20-i}v${i*2}`}return`<svg viewBox="0 0 720 40" preserveAspectRatio="none" aria-hidden="true"><path d="${e}" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>`}function se(){let e=document.querySelector(`[data-player]`),t=document.querySelector(`[data-embed]`);if(!e||!t)return;let n=t.querySelector(`iframe`),r=e.querySelector(`[data-seek]`),i=e.querySelector(`[data-seek-fill]`),a=e.querySelector(`[data-time-cur]`),o=e.querySelector(`[data-time-dur]`),s=document.querySelectorAll(`[data-audio-toggle]`);e.querySelector(`.track__wave`).innerHTML=X(),i.innerHTML=X();let c=null,l=!1,u=0,d=e=>{l=e,document.documentElement.classList.toggle(`is-playing`,e),s.forEach(t=>t.setAttribute(`aria-pressed`,String(e))),window.dispatchEvent(new CustomEvent(`audio:state`,{detail:{playing:e}}))},f=(e,t)=>{let n=Math.min(100,Math.max(0,t*100));i.style.clipPath=`inset(0 ${100-n}% 0 0)`,r.setAttribute(`aria-valuenow`,String(Math.round(n))),r.setAttribute(`aria-valuetext`,p(e)),a.textContent=p(e)},m=()=>c||(c=_(n,{onState:d,onProgress:f,onDuration:e=>{u=e,o.textContent=p(e)}}).then(e=>(t.classList.add(`is-ready`),e)),c.catch(()=>{t.classList.add(`is-error`),c=null}),c);new IntersectionObserver((e,t)=>{e.some(e=>e.isIntersecting)&&(t.disconnect(),m().catch(()=>void 0))},{rootMargin:`900px 0px`}).observe(e),s.forEach(t=>t.addEventListener(`click`,()=>{m().then(e=>l?e.pause():e.play()).catch(()=>{let t=e.querySelector(`[data-set-link]`)?.href;t&&window.open(t,`_blank`,`noopener`)})}));let h=e=>{m().then(t=>{u&&(t.seekTo(e*u),f(e*u,e),l||t.play())})},g=e=>{let t=r.getBoundingClientRect();return Math.min(1,Math.max(0,(e.clientX-t.left)/t.width))};r.addEventListener(`pointerdown`,e=>{r.setPointerCapture(e.pointerId),h(g(e))}),r.addEventListener(`keydown`,e=>{if(!u)return;let t=Number(r.getAttribute(`aria-valuenow`))/100,n=e.shiftKey?.1:.02;if(e.key===`ArrowRight`)h(Math.min(1,t+n));else if(e.key===`ArrowLeft`)h(Math.max(0,t-n));else return;e.preventDefault()})}var Z=null,Q=(e,t=`top 86%`)=>({trigger:e,start:t,once:!0});function $(){Z?.revert(),!r&&(Z=e.context(()=>{document.querySelectorAll(`[data-lines]`).forEach(n=>{t.create(n,{type:`lines`,mask:`lines`,aria:`none`,autoSplit:!0,onSplit:t=>e.from(t.lines,{yPercent:105,duration:1.2,ease:`expo.out`,stagger:.08,scrollTrigger:Q(n)})})}),document.querySelectorAll(`[data-chars]`).forEach(n=>{t.create(n,{type:`chars`,mask:`chars`,autoSplit:!0,onSplit:t=>e.from(t.chars,{yPercent:110,duration:1.3,ease:`expo.out`,stagger:.045,scrollTrigger:Q(n,`top 90%`)})})});let n=document.querySelector(`[data-quote]`),r=document.querySelector(`[data-quote-text]`);n&&r&&t.create(r,{type:`words`,aria:`none`,autoSplit:!0,onSplit:t=>e.timeline({scrollTrigger:{trigger:n,start:`top top`,end:`+=130%`,scrub:!0}}).fromTo(t.words,{opacity:.06,filter:`blur(10px)`,yPercent:18},{opacity:1,filter:`blur(0px)`,yPercent:0,ease:`none`,stagger:.12})})}))}function ce(){Z?.revert(),Z=null}function le(){if(r)return;document.querySelectorAll(`[data-clip]`).forEach(t=>{let n=t.querySelector(`img`),r=e.timeline({scrollTrigger:Q(t,`top 85%`)});r.fromTo(t,{clipPath:`inset(100% 0% 0% 0%)`},{clipPath:`inset(0% 0% 0% 0%)`,duration:1.6,ease:`expo.inOut`}),n&&r.from(n,{scale:1.3,opacity:0,duration:2,ease:`expo.out`},.25)}),document.querySelectorAll(`[data-rule]`).forEach(t=>{e.fromTo(t,{scaleX:0},{scaleX:1,duration:1.8,ease:`expo.inOut`,scrollTrigger:Q(t,`top 92%`)})}),document.querySelectorAll(`.shead__no`).forEach(t=>{e.fromTo(t,{opacity:0,x:-30,filter:`blur(8px)`},{opacity:1,x:0,filter:`blur(0px)`,duration:1.4,ease:`expo.out`,clearProps:`filter`,scrollTrigger:Q(t,`top 90%`)})}),document.querySelectorAll(`[data-parallax]`).forEach(t=>{let n=Number(t.dataset.parallax)||10;e.fromTo(t,{yPercent:-n},{yPercent:n,ease:`none`,scrollTrigger:{trigger:t.parentElement,start:`top bottom`,end:`bottom top`,scrub:!0}})});let t=document.querySelector(`.bio__pic img`);t&&e.fromTo(t,{scale:1.12},{scale:1,ease:`none`,scrollTrigger:{trigger:`.bio__grid`,start:`top bottom`,end:`bottom top`,scrub:!0}});let i=document.querySelector(`[data-quote]`);i&&e.timeline({scrollTrigger:{trigger:i,start:`top top`,end:`+=130%`,scrub:!0,pin:!0,anticipatePin:1}}).fromTo(`[data-quote-bg]`,{scale:1.3,opacity:.35},{scale:1,opacity:1,ease:`none`},0);let a=(t,r={})=>{n.batch(t,{start:`top 90%`,once:!0,onEnter:t=>e.from(t,{y:40,opacity:0,duration:1.1,ease:`expo.out`,stagger:.08,...r})})};a(`.dna__item`,{x:-30,y:0}),a(`.facts__row`),a(`.press__item`),a(`.contacts__item`),a(`.genre__meta`,{y:24}),n.batch(`.vis__frame`,{start:`top 92%`,once:!0,onEnter:t=>e.fromTo(t,{clipPath:`inset(100% 0% 0% 0%)`},{clipPath:`inset(0% 0% 0% 0%)`,duration:1.5,ease:`expo.inOut`,stagger:.12})});let o=document.querySelector(`[data-star]`);o&&e.fromTo(o,{rotate:-45},{rotate:135,ease:`none`,scrollTrigger:{trigger:`.booking`,start:`top bottom`,end:`bottom top`,scrub:!0}});let s=document.querySelector(`[data-footer-word]`);s&&e.from(s,{yPercent:60,opacity:.2,ease:`none`,scrollTrigger:{trigger:`.footer`,start:`top bottom`,end:`bottom bottom`,scrub:!0}})}function ue(){let t=document.querySelector(`[data-torch-area]`);if(!t||(o(`../`),r))return;let n=()=>window.innerWidth<760?4:11;t.querySelectorAll(`.vis__item`).forEach(t=>{let r=Number(t.dataset.speed)||0,i={trigger:t,start:`top bottom`,end:`bottom top`,scrub:!0,invalidateOnRefresh:!0};e.fromTo(t,{y:()=>r*-n()},{y:()=>r*n(),ease:`none`,scrollTrigger:i});let a=t.querySelector(`img`);a&&e.fromTo(a,{yPercent:-6},{yPercent:6,ease:`none`,scrollTrigger:i})});let i=t.querySelector(`[data-torch]`);t.classList.add(`has-torch`);let a={x:window.innerWidth/2,y:window.innerHeight/2},s={...a};f&&window.addEventListener(`pointermove`,e=>{a.x=e.clientX,a.y=e.clientY},{passive:!0});let c=!1;new IntersectionObserver(([e])=>c=e.isIntersecting).observe(t),e.ticker.add((e,t)=>{if(!c)return;f||(a.x=window.innerWidth/2,a.y=window.innerHeight*.48);let n=1-Math.exp(-t/1e3*7);s.x+=(a.x-s.x)*n,s.y+=(a.y-s.y)*n;let r=i.getBoundingClientRect();i.style.setProperty(`--x`,`${(s.x-r.left).toFixed(1)}px`),i.style.setProperty(`--y`,`${(s.y-r.top).toFixed(1)}px`)})}e.registerPlugin(n,t,A);var de=e=>new Promise(t=>setTimeout(t,e));function fe(){return Promise.all([document.fonts.load(`100 1em "Antonio Variable"`,`VANGLERA`),document.fonts.load(`200 1em "Antonio Variable"`,`BIOGRAPHY`),document.fonts.load(`200 1em "Oswald Variable"`,`Музыка`),document.fonts.load(`300 1em "Jost Variable"`,`VANGLERA Био`),document.fonts.load(`500 1em "Jost Variable"`,`VANGLERA Био`)]).catch(()=>void 0)}function pe(t){return e.timeline({paused:!0,defaults:{ease:`expo.out`}}).set(t,{visibility:`visible`}).fromTo(t,{clipPath:`inset(0% 0% 100% 0%)`},{clipPath:`inset(0% 0% 0% 0%)`,duration:.9,ease:`expo.inOut`}).from(t.querySelectorAll(`.menu__nav a span`),{yPercent:110,duration:.9,stagger:.06},.35).from(t.querySelectorAll(`.menu__nav sup`),{opacity:0,duration:.6,stagger:.06},.5).from(t.querySelector(`.menu__foot`),{opacity:0,duration:.6},.6)}function me(){let e=document.querySelector(`[data-barcode]`);if(!e)return;let t=0,n=``;for(let e of`VANGLERA2026`){let r=e.charCodeAt(0);for(let e=0;e<4;e++){let i=1+(r>>e&1)+(r>>e+3&1);e%2==0&&(n+=`<rect x="${t}" width="${i}" height="34"/>`),t+=i+1}}e.innerHTML=`<svg viewBox="0 0 ${t} 34" preserveAspectRatio="none">${n}</svg>`}function he(){document.querySelectorAll(`[data-lang]`).forEach(t=>t.addEventListener(`click`,async()=>{let o=t.dataset.lang;if(o===m())return;a(o);let s=[`main`,`.footer`];r||await e.to(s,{opacity:0,duration:.25,ease:`power1.in`}).then(),ce(),i(o),$(),n.sort(),n.refresh(),r||e.to(s,{opacity:1,duration:.5,ease:`power1.out`,clearProps:`opacity`})}))}async function ge(){`scrollRestoration`in history&&(history.scrollRestoration=`manual`),window.scrollTo(0,0);let e=document.documentElement;e.classList.add(`is-loading`),r&&e.classList.add(`reduced`),i(ee()),me();let t=l();c(!0);let a=K(),o=r?null:oe(),d=Promise.race([Promise.all([fe(),a.imageReady]),de(5e3)]);s(),h(),u(t),se(),N(),he(),await d,re(),ue(),le(),$(),g(pe),n.sort(),n.refresh();let f=()=>{e.classList.remove(`is-loading`),c(!1),location.hash.length>1&&document.querySelector(location.hash)&&v(location.hash,!0)};o?await o.finish(Promise.resolve(),()=>{a.intro.play(0),f()}):(document.querySelector(`[data-loader]`)?.remove(),a.intro.progress(1),f())}ge();