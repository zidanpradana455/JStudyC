/* ═══════════════════════════════════════════
   JStudyC — Homepage WebGL scene (three.js)
   A point-cloud cell (membrane + nucleus) that
   reacts to the cursor, beats at ~72 bpm, ripples
   on click, and morphs into a DNA double helix
   as the "Cara kerja" section scrolls into view.
   ═══════════════════════════════════════════ */

const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js';

const body = document.body;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = () => innerWidth <= 760;
const coarse = matchMedia('(pointer: coarse)').matches;

/* ── Pointer + readouts (work even without WebGL) ── */
const pointer = { x: 0, y: 0, active: 0, lastMove: -1e9 };
const readout = document.getElementById('cursorReadout');
const bpmText = document.getElementById('bpmReadout');
const bpmDot = document.querySelector('.bpm-dot');
const fmt = v => (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(2);

addEventListener('pointermove', e => {
  pointer.x = (e.clientX / innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / innerHeight) * 2 + 1;
  pointer.lastMove = performance.now();
  if (readout) readout.textContent = `x ${fmt(pointer.x)} · y ${fmt(pointer.y)}`;
}, { passive: true });
document.addEventListener('pointerleave', () => { pointer.lastMove = -1e9; });

/* Feature rows "agitate" the cell on hover */
let agitateTarget = 0;
document.querySelectorAll('.feature-row').forEach(row => {
  row.addEventListener('pointerenter', () => { agitateTarget = 1; });
  row.addEventListener('pointerleave', () => { agitateTarget = 0; });
});

/* ── Scroll → scene states ── */
// xf = fraction of the visible half-width; y in world units.
const STATES = {
  hero:     { d: { xf: 0.44, y: -0.12, s: 0.92, morph: 0, op: 1.00 }, m: { xf: 0, y: 1.05, s: 0.55, morph: 0, op: 0.80 } },
  features: { d: { xf: 0.95, y: 0.00, s: 0.95, morph: 0, op: 0.20 }, m: { xf: 0, y: 0.20, s: 0.62, morph: 0, op: 0.16 } },
  how:      { d: { xf: 0.50, y: -0.05, s: 0.84, morph: 1, op: 1.00 }, m: { xf: 0, y: 0.00, s: 0.70, morph: 1, op: 0.26 } },
  stats:    { d: { xf: 0.00, y: 0.00, s: 2.10, morph: 0, op: 0.20 }, m: { xf: 0, y: 0.00, s: 1.20, morph: 0, op: 0.16 } },
  cta:      { d: { xf: 0.72, y: -0.55, s: 0.72, morph: 0, op: 0.45 }, m: { xf: 0, y: 0.40, s: 0.60, morph: 0, op: 0.30 } }
};
const sections = [...document.querySelectorAll('[data-scene]')];
let anchors = [];
function measure() {
  const vh = innerHeight;
  anchors = sections.map(el => {
    const top = el.getBoundingClientRect().top + scrollY;
    const start = top - vh * 0.35;
    const end = Math.max(start, top + el.offsetHeight - vh * 0.75);
    return { start, end, key: el.dataset.scene };
  });
}
const ease = t => t * t * (3 - 2 * t);
function targetState() {
  const y = scrollY;
  const pick = k => (small() ? STATES[k].m : STATES[k].d);
  if (!anchors.length) return pick('hero');
  if (y <= anchors[0].end) return pick(anchors[0].key);
  for (let i = 0; i < anchors.length; i++) {
    const a = anchors[i], b = anchors[i + 1];
    if (y <= a.end) return pick(a.key);
    if (!b) return pick(a.key);
    if (y < b.start) {
      const t = ease((y - a.end) / Math.max(1, b.start - a.end));
      const A = pick(a.key), B = pick(b.key), out = {};
      for (const k in A) out[k] = A[k] + (B[k] - A[k]) * t;
      return out;
    }
  }
  return pick(anchors[anchors.length - 1].key);
}

/* ── Heartbeat (drives the dot even without WebGL) ── */
let beatPhase = 0, lastLub = -1;
function heartbeat(dt, t) {
  const bpm = 72 + Math.sin(t * 0.21) * 3 + Math.sin(t * 0.07) * 2;
  beatPhase += dt * bpm / 60;
  const ph = beatPhase % 1;
  const lub = Math.floor(beatPhase);
  if (lub !== lastLub) {
    lastLub = lub;
    if (bpmText) bpmText.textContent = Math.round(bpm);
    if (bpmDot && !reduceMotion) {
      bpmDot.classList.remove('beat'); void bpmDot.offsetWidth; bpmDot.classList.add('beat');
    }
  }
  const g = (x, c, w) => Math.exp(-Math.pow((x - c) * w, 2));
  return g(ph, 0.04, 18) + 0.55 * g(ph, 0.22, 20);
}

/* ── GLSL ── */
const NOISE = /* glsl */`
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERT = /* glsl */`
uniform float uTime;
uniform float uMorph;
uniform float uSize;
uniform float uPixelRatio;
uniform float uBeat;
uniform float uAgitate;
uniform float uSpin;
uniform vec3  uMouse;
uniform float uMouseStrength;
uniform vec3  uPulseDir;
uniform float uPulseAge;
attribute vec3 aHelix;
attribute vec4 aRand;
attribute float aType;
varying float vAlpha;
varying float vMix;
${NOISE}
mat3 rotY(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s, 0.,1.,0., s,0.,c);}
mat3 rotZ(float a){float c=cos(a),s=sin(a);return mat3(c,s,0., -s,c,0., 0.,0.,1.);}
void main(){
  // ── Cell: membrane + nucleus, breathing with simplex noise
  vec3 base = position;
  vec3 nrm = normalize(base + 1e-5);
  float n = snoise(base * 0.85 + vec3(0.0, uTime * 0.16, uTime * 0.05));
  float amp = (0.16 + uAgitate * 0.28) * (1.0 - aType * 0.55);
  vec3 cell = base + nrm * n * amp;
  cell *= 1.0 + uBeat * (0.045 - aType * 0.015);

  // click ripple travelling across the membrane
  float dist = distance(nrm, uPulseDir);
  float front = uPulseAge * 1.7;
  float wave = exp(-pow((dist - front) * 4.5, 2.0)) * exp(-uPulseAge * 1.4);
  cell += nrm * wave * 0.42 * (1.0 - aType);

  // ── DNA double helix (spinning, tilted)
  vec3 hx = aHelix;
  hx += 0.035 * vec3(sin(uTime * 1.3 + aRand.x * 40.0), cos(uTime * 1.1 + aRand.y * 40.0), sin(uTime * 0.9 + aRand.z * 40.0));
  hx = rotZ(0.32) * (rotY(uSpin) * hx);

  // staggered morph with a brief scatter mid-flight
  float st = aRand.x * 0.45;
  float m = smoothstep(st, st + 0.55, uMorph);
  vec3 pos = mix(cell, hx, m);
  pos += (aRand.yzw - 0.5) * sin(m * 3.14159) * 1.1;

  // ── Cursor: soft repulsion field
  vec3 d = pos - uMouse;
  float dl = length(d);
  float f = smoothstep(1.15, 0.0, dl) * uMouseStrength;
  pos += (d / max(dl, 1e-4)) * f * 0.55;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = uSize * (0.55 + aRand.y * 0.9) * (1.0 + aType * 0.35) * (1.0 + f * 0.8 + wave * 0.6);
  gl_PointSize = size * uPixelRatio / -mv.z;

  vAlpha = mix(0.28, 1.0, smoothstep(-11.5, -6.5, mv.z));
  vMix = clamp(aType * 0.9 + f * 1.4 + wave * 0.8, 0.0, 1.0);
}`;

const FRAG = /* glsl */`
uniform vec3 uColor;
uniform vec3 uAccent;
uniform float uOpacity;
varying float vAlpha;
varying float vMix;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.1, d);
  vec3 col = mix(uColor, uAccent, vMix);
  gl_FragColor = vec4(col, a * vAlpha * uOpacity);
}`;

/* ── Geometry ── */
function buildGeometry(THREE, count) {
  const nucleusShare = 0.18;
  const K = Math.floor(count * nucleusShare); // nucleus → helix rungs
  const M = count - K;                         // membrane → helix strands
  const R = 1.75;
  const pos = new Float32Array(count * 3);
  const hel = new Float32Array(count * 3);
  const rnd = new Float32Array(count * 4);
  const typ = new Float32Array(count);

  const H = 5.4, HR = 0.9, TWIST = 2.0, RUNGS = 28;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const helixAt = (y, strand) => {
    const a = y * TWIST + strand * Math.PI;
    return [Math.cos(a) * HR, y, Math.sin(a) * HR];
  };

  for (let i = 0; i < M; i++) {
    // Fibonacci sphere: evenly spread membrane, ordered top→bottom
    const yy = 1 - (i / (M - 1)) * 2;
    const r = Math.sqrt(1 - yy * yy);
    const th = golden * i;
    const jitter = 1 + (Math.random() - 0.5) * 0.05;
    pos.set([Math.cos(th) * r * R * jitter, yy * R * jitter, Math.sin(th) * r * R * jitter], i * 3);
    // same top→bottom order on the helix keeps the morph coherent
    const hy = (0.5 - i / M) * H;
    const p = helixAt(hy, i % 2);
    const tk = 0.07;
    hel.set([p[0] + (Math.random() - 0.5) * tk, p[1] + (Math.random() - 0.5) * tk, p[2] + (Math.random() - 0.5) * tk], i * 3);
    typ[i] = 0;
  }
  for (let j = 0; j < K; j++) {
    const i = M + j;
    // nucleus: off-centre inner shell
    const u = Math.random() * 2 - 1, phi = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const rr = R * 0.48 * (0.72 + 0.28 * Math.random());
    pos.set([0.18 + Math.cos(phi) * s * rr, 0.12 + u * rr, Math.sin(phi) * s * rr], i * 3);
    // rung: base pair between both strands
    const rung = j % RUNGS;
    const hy = (0.5 - (rung + 0.5) / RUNGS) * H;
    const a = helixAt(hy, 0), b = helixAt(hy, 1);
    const t = Math.random();
    hel.set([
      a[0] + (b[0] - a[0]) * t + (Math.random() - 0.5) * 0.03,
      a[1] + (Math.random() - 0.5) * 0.03,
      a[2] + (b[2] - a[2]) * t + (Math.random() - 0.5) * 0.03
    ], i * 3);
    typ[i] = 1;
  }
  for (let i = 0; i < count; i++) rnd.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aHelix', new THREE.BufferAttribute(hel, 3));
  g.setAttribute('aRand', new THREE.BufferAttribute(rnd, 4));
  g.setAttribute('aType', new THREE.BufferAttribute(typ, 1));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 4);
  return g;
}

/* ── Boot ── */
function fail() {
  document.documentElement.classList.add('no-gl');
  // keep the heartbeat dot alive without WebGL
  let last = performance.now();
  (function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    heartbeat(dt, now / 1000);
    requestAnimationFrame(tick);
  })(last);
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) { return false; }
}

async function boot() {
  if (!hasWebGL()) return fail();
  let THREE;
  try { THREE = await import(THREE_URL); } catch (e) { return fail(); }

  const canvas = document.getElementById('gl');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { return fail(); }

  let maxDpr = small() ? 1.5 : 1.75;
  renderer.setPixelRatio(Math.min(devicePixelRatio, maxDpr));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  const count = small() || coarse ? 11000 : 26000;
  const geometry = buildGeometry(THREE, count);

  const uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uSize: { value: small() ? 26 : 30 },
    uPixelRatio: { value: renderer.getPixelRatio() },
    uBeat: { value: 0 },
    uAgitate: { value: 0 },
    uSpin: { value: 0 },
    uMouse: { value: new THREE.Vector3(99, 99, 99) },
    uMouseStrength: { value: 0 },
    uPulseDir: { value: new THREE.Vector3(0, 1, 0) },
    uPulseAge: { value: 99 },
    uColor: { value: new THREE.Color() },
    uAccent: { value: new THREE.Color() },
    uOpacity: { value: 1 }
  };

  const material = new THREE.ShaderMaterial({
    uniforms, vertexShader: VERT, fragmentShader: FRAG,
    transparent: true, depthWrite: false, depthTest: false
  });

  const group = new THREE.Group();
  const points = new THREE.Points(geometry, material);
  group.add(points);
  scene.add(group);

  function applyTheme() {
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    uniforms.uColor.value.set(light ? '#11110F' : '#EDEBE4');
    uniforms.uAccent.value.set(light ? '#5C7D00' : '#C9F24A');
    material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
    material.needsUpdate = true;
  }
  applyTheme();
  addEventListener('themeChanged', applyTheme);

  let halfW = 1, halfH = 1;
  function resize() {
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    halfW = halfH * camera.aspect;
    measure();
  }
  resize();
  let rT;
  addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(resize, 120); });
  addEventListener('load', measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

  // Click → membrane ripple from the nearest surface direction
  const ray = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hit = new THREE.Vector3();
  const ndc = new THREE.Vector2();
  const localMouse = new THREE.Vector3();
  function pointerLocal() {
    ndc.set(pointer.x, pointer.y);
    ray.setFromCamera(ndc, camera);
    plane.constant = -group.position.z;
    if (!ray.ray.intersectPlane(plane, hit)) return null;
    return group.worldToLocal(localMouse.copy(hit));
  }
  addEventListener('pointerdown', e => {
    if (e.target.closest && e.target.closest('.modal-overlay')) return;
    pointer.x = (e.clientX / innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / innerHeight) * 2 + 1;
    const p = pointerLocal();
    const dir = p && p.lengthSq() > 1e-4 ? p.clone().normalize() : new THREE.Vector3().randomDirection();
    // tilt toward the viewer so the ripple starts on the visible face
    dir.z += 0.6; dir.normalize();
    uniforms.uPulseDir.value.copy(dir);
    uniforms.uPulseAge.value = 0;
  });

  // State
  const cur = { ...targetState() };
  let tilt = { x: 0, y: 0 };
  let last = performance.now();
  let t = 0;
  let frames = 0, slowFrames = 0, degraded = false;
  const timeScale = reduceMotion ? 0 : 1;

  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) { last = now; return; }
    const dtRaw = (now - last) / 1000;
    const dt = Math.min(0.05, dtRaw);
    last = now;
    t += dt * timeScale;

    // adaptive quality: drop pixel ratio if the first ~2s are slow
    if (!degraded && frames < 120) {
      frames++;
      if (dtRaw > 0.03) slowFrames++;
      if (frames === 120 && slowFrames > 45) {
        degraded = true;
        renderer.setPixelRatio(1);
        uniforms.uPixelRatio.value = 1;
        resize();
      }
    }

    const target = targetState();
    const k = reduceMotion ? 1 : 1 - Math.exp(-dt * 3.2);
    for (const key in target) cur[key] += (target[key] - cur[key]) * k;

    group.position.set(cur.xf * halfW, cur.y, 0);
    group.scale.setScalar(cur.s);

    // gentle drift + cursor parallax
    const recent = now - pointer.lastMove < 2500 && !coarse;
    tilt.x += ((recent ? pointer.y * 0.25 : 0) - tilt.x) * 0.04;
    tilt.y += ((recent ? pointer.x * 0.35 : 0) - tilt.y) * 0.04;
    group.rotation.x = -tilt.x;
    group.rotation.y = t * 0.06 + tilt.y;

    const lm = pointerLocal();
    if (lm) uniforms.uMouse.value.copy(lm);
    const ms = recent ? 1 : 0;
    uniforms.uMouseStrength.value += (ms - uniforms.uMouseStrength.value) * 0.06;

    uniforms.uAgitate.value += (agitateTarget - uniforms.uAgitate.value) * 0.05;
    uniforms.uTime.value = t;
    uniforms.uMorph.value = cur.morph;
    uniforms.uOpacity.value = cur.op;
    uniforms.uSpin.value = t * 0.45;
    uniforms.uBeat.value = reduceMotion ? 0 : heartbeat(dt, now / 1000);
    uniforms.uPulseAge.value += dt;

    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
  requestAnimationFrame(() => document.documentElement.classList.add('gl-ready'));
}

boot();
