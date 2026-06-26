/* ═══════════════════════════════════════════════════
   B-1B VIRTUAL SQUADRON — SHARED JS
═══════════════════════════════════════════════════ */

// ── MOBILE NAV ─────────────────────────────────────
function toggleMobileNav() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// ── ACTIVE NAV LINK ─────────────────────────────────
(function(){
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === page) a.classList.add('active');
  });
})();

// ── PHASE TAB SWITCHING ─────────────────────────────
function switchPhase(namespace, id) {
  const prefix = namespace + '-';
  document.querySelectorAll('[id^="' + prefix + '"].phase-panel')
    .forEach(p => p.classList.remove('active'));
  const target = document.getElementById(prefix + id);
  if (target) target.classList.add('active');
  if (event && event.target) {
    event.target.closest('.phase-nav')
      ?.querySelectorAll('.phase-btn')
      .forEach(b => b.classList.toggle('active', b === event.target));
  }
}

// ── QRC CHECKLIST ───────────────────────────────────
const qrcState = {};

function buildQRC(data, containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = '';
  data.forEach((section, si) => {
    if (!qrcState[si]) qrcState[si] = {};
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-header" style="border-left:3px solid ${section.color}">
        <div class="card-title">${section.title}</div>
        <span style="margin-left:auto;font-size:11px;color:var(--text3)" id="qprog-${si}"></span>
      </div>
      <div class="card-body">
        <ul class="qrc-list" id="qsec-${si}"></ul>
        <button onclick="resetQSection(${si},'${containerId}')" style="margin-top:8px;padding:3px 10px;background:var(--card2);border:1px solid var(--border);border-radius:5px;font-size:11px;color:var(--text3);cursor:pointer;font-family:var(--sans)">Reset</button>
      </div>`;
    grid.appendChild(card);
    renderQSection(si, data);
  });
}

function renderQSection(si, data) {
  const ul   = document.getElementById('qsec-' + si);
  const prog = document.getElementById('qprog-' + si);
  if (!ul || !prog) return;
  ul.innerHTML = '';
  let done = 0;
  data[si].items.forEach((item, ii) => {
    const checked = qrcState[si][ii];
    if (checked) done++;
    const li = document.createElement('li');
    li.style.opacity = checked ? '.4' : '1';
    li.innerHTML = `
      <span class="qrc-item" style="text-decoration:${checked ? 'line-through' : 'none'}">${item[0]}</span>
      <span class="qrc-val" style="color:${checked ? 'var(--text3)' : 'var(--gold2)'}">${item[1]}</span>`;
    li.onclick = () => { qrcState[si][ii] = !qrcState[si][ii]; renderQSection(si, data); };
    ul.appendChild(li);
  });
  prog.textContent = `${done}/${data[si].items.length}`;
  prog.style.color = done === data[si].items.length ? 'var(--green2)' : 'var(--text3)';
}

function resetQSection(si, containerId) {
  qrcState[si] = {};
  const grid = document.getElementById(containerId);
  const sections = window._qrcData || [];
  renderQSection(si, sections);
}

function resetAllQRC(containerId) {
  const data = window._qrcData || [];
  data.forEach((_, si) => { qrcState[si] = {}; });
  buildQRC(data, containerId);
}

// ── QRC DATA ────────────────────────────────────────
window._qrcData = [
  { title: 'Preliminary cockpit preparation', color: 'var(--blue)', items: [['Fuel Panel Switches','ALL HORIZONTAL'],['Main Battery Switch','OFF'],['Throttle Lever','IDLE'],['Landing Gear Lever','DOWN'],['Parking Brake','ON'],['Engine Generator Switches','OFF / DOWN'],['Bleed Air Panel','ALL OFF'],['Cabin Packs','BOTH OFF']] },
  { title: 'Cockpit preparation', color: 'var(--blue)', items: [['Main Battery Switch','ON'],['External Power','ON (if available)'],['Internal Lights','AS REQUIRED'],['CDU – Flight Plan','CHECK'],['Fuel Quantity','CHECK'],['CDU – Performance Speeds','CHECK'],['Take-off Briefing','PERFORM']] },
  { title: 'Before start', color: 'var(--amber)', items: [['APU 1 and APU 2','BOTH ON'],['Crew Hatch','CLOSED'],['Beacon Lights','ON'],['External Power','OFF and disconnected'],['Fuel Panel Switches','ALL VERTICAL']] },
  { title: 'Engine start', color: 'var(--amber)', items: [['Engine 1 Switch','START'],['Engine 1 N1','CHECK above 18%'],['Engine 2 Switch','START'],['Engine 2 N1','CHECK above 18%'],['Engine 3 Switch','START'],['Engine 3 N1','CHECK above 18%'],['Engine 4 Switch','START'],['Engine 4 N1','CHECK above 18%']] },
  { title: 'After start', color: 'var(--amber)', items: [['Engine Generator Switches','ALL ON'],['APU 1 and APU 2','BOTH OFF'],['Pitch Trim','AS REQUIRED'],['Flaps','SET'],['Engines Bleed Air','ALL ON'],['Cabin Packs','BOTH ON'],['Warning System','CHECK NO WARNINGS']] },
  { title: 'Taxi', color: 'var(--gold)', items: [['Taxi Lights','ON'],['Nose Wheel Steering','ON'],['Parking Brake','OFF'],['MFD – FCH page','NO Xs'],['Barometer Setting','SET'],['Take-off Briefing','PERFORM'],['Exterior Lights','SET']] },
  { title: 'Take-off', color: 'var(--gold)', items: [['Nose Wheel Steering','ON'],['Cabin Packs','AS REQUIRED'],['Landing Lights','ON']] },
  { title: 'After take-off', color: 'var(--green)', items: [['Landing Gear','UP'],['Flaps','RETRACTED'],['Cabin Packs','AS REQUIRED'],['Landing Lights','OFF']] },
  { title: 'Cruise', color: 'var(--green)', items: [['MFD – STATS Page','CHECK NO WARNINGS'],['Fuel Quantity','CHECK']] },
  { title: 'Landing', color: 'var(--blue)', items: [['Nose Wheel Steering','ON'],['Landing Lights','ON'],['Landing Gear','DOWN'],['Flaps','EXTENDED'],['Spoilers','ARM']] },
  { title: 'After landing', color: 'var(--blue)', items: [['Nose Wheel Steering','ON'],['Landing Lights','OFF'],['Taxi Lights','ON'],['Spoilers','DISARM'],['Flaps','RETRACTED'],['APU 1 or APU 2','ON']] },
  { title: 'Parking / shutdown', color: 'var(--red)', items: [['Engines','ALL OFF'],['Exterior Lights','ALL OFF'],['Parking Brake','ON'],['APU 1 and APU 2','BOTH OFF'],['Fuel Panel Switches','ALL HORIZONTAL'],['Engine Generator Switches','ALL OFF'],['Internal Lights','ALL OFF'],['Main Battery Switch','OFF']] },
];
