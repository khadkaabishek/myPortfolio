// project.js — renders a single project's detail page from projects-data.js
// and wires up its mini "simulation" demo.

const params = new URLSearchParams(window.location.search);
const slug = params.get("p");
const project = PROJECTS.find((p) => p.id === slug) || PROJECTS[0];

document.title = `${project.title} | Abishek Khadka`;
document.getElementById("pageDesc").setAttribute("content", project.tagline);

const wrap = document.getElementById("detailWrap");

wrap.innerHTML = `
  <h1 class="detail-title">${project.title}</h1>
  <p class="detail-tagline">${project.tagline}</p>
  <div class="detail-tags">${project.tech.map((t) => `<span class="tag">${t}</span>`).join("")}</div>

  <div class="detail-links">
    <a class="btn btn-github" href="${project.github}" target="_blank" rel="noopener noreferrer">
      <i class="fab fa-github"></i> View on GitHub
    </a>
    ${project.liveUrl ? `<a class="btn btn-live" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Live Link</a>` : ""}
  </div>

  <div class="detail-section">
    <h2>Overview</h2>
    <p>${project.description}</p>
  </div>

  <div class="detail-section">
    <h2>How it works</h2>
    ${project.details.map((d) => `<p>${d}</p>`).join("")}
  </div>

  <div class="detail-section">
    <h2>Simulation / Demo</h2>
    <div class="sim-box" id="simBox"></div>
  </div>

  <!-- Ad slot #1 -->
  <div class="ad-slot">
    <ins class="adsbygoogle"
      style="display:block; width:100%;"
      data-ad-client="ca-pub-7467274697628656"
      data-ad-slot="0000000000"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  </div>

  <div class="detail-section">
    <h2>Samples</h2>
    <div class="samples-grid">
      ${project.samples
        .map(
          (s) => `
        <div class="sample-item">
          <div class="sample-img-wrap"><img src="${s.src}" alt="${s.caption}" loading="lazy" /></div>
          <div class="sample-caption">${s.caption}</div>
        </div>`
        )
        .join("")}
    </div>
  </div>

  <!-- Ad slot #2 -->
  <div class="ad-slot">
    <ins class="adsbygoogle"
      style="display:block; width:100%;"
      data-ad-client="ca-pub-7467274697628656"
      data-ad-slot="0000000001"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  </div>

  <div class="detail-footer-nav">
    <a href="./index.html"><i class="fas fa-arrow-left"></i> Back to all projects</a>
  </div>
`;

// Push ads (safe no-op if AdSense script hasn't finished loading yet)
try {
  (window.adsbygoogle = window.adsbygoogle || []).push({});
  (window.adsbygoogle = window.adsbygoogle || []).push({});
} catch (e) {
  /* AdSense not yet initialized — fine in local/dev preview */
}

// ---------- Theme toggle ----------
const toggle = document.getElementById("themeToggleProjects");
const icon = toggle.querySelector("i");
function applyTheme(dark) {
  document.body.classList.toggle("dark-mode", dark);
  icon.className = dark ? "fas fa-moon" : "fas fa-sun";
}
applyTheme(localStorage.getItem("theme") === "dark");
toggle.addEventListener("click", () => {
  const dark = !document.body.classList.contains("dark-mode");
  applyTheme(dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
});

// ---------- Simulations ----------
const simBox = document.getElementById("simBox");

const simulations = {
  // Existing projects
  smartfarming: () => {
    simBox.innerHTML = `
      <video src="${project.simSrc}" controls muted loop playsinline></video>
      <div class="sim-note">Recorded demo of the SmartFarming monitoring system.</div>`;
  },

  blogger: () => {
    simBox.innerHTML = `
      <div style="width:100%;max-width:360px;display:flex;flex-direction:column;gap:10px;">
        <div id="bloggerFeed" style="display:flex;flex-direction:column;gap:10px;"></div>
      </div>
      <div class="sim-note">Simulated feed: new posts publish live, just like the real app.</div>`;
    const feed = document.getElementById("bloggerFeed");
    const posts = ["Getting started with Node.js APIs", "Why I switched to MongoDB", "5 tips for cleaner React components"];
    let i = 0;
    function addPost() {
      const card = document.createElement("div");
      card.style.cssText = "background:#1c2128;border:1px solid #2a2f37;border-radius:8px;padding:10px 14px;color:#e6e9ee;font-size:0.85rem;opacity:0;transform:translateY(6px);transition:all .4s ease;";
      card.textContent = "📝 " + posts[i % posts.length];
      feed.prepend(card);
      requestAnimationFrame(() => { card.style.opacity = 1; card.style.transform = "translateY(0)"; });
      if (feed.children.length > 3) feed.removeChild(feed.lastChild);
      i++;
    }
    addPost();
    setInterval(addPost, 2200);
  },

  ecart: () => {
    simBox.innerHTML = `
      <div style="display:flex;align-items:center;gap:26px;">
        <div id="ecartItem" style="font-size:2.2rem;">🛒</div>
        <div style="text-align:left;color:#e6e9ee;font-size:0.85rem;">
          <div>Cart items: <span id="ecartCount">0</span></div>
          <div>Total: $<span id="ecartTotal">0.00</span></div>
        </div>
      </div>
      <div class="sim-note">Auto-simulating a shopper adding items to cart.</div>`;
    const countEl = document.getElementById("ecartCount");
    const totalEl = document.getElementById("ecartTotal");
    const itemEl = document.getElementById("ecartItem");
    let count = 0, total = 0;
    setInterval(() => {
      count++;
      total += (Math.random() * 20 + 5);
      countEl.textContent = count;
      totalEl.textContent = total.toFixed(2);
      itemEl.style.transform = "scale(1.3)";
      setTimeout(() => (itemEl.style.transform = "scale(1)"), 200);
      if (count >= 6) { count = 0; total = 0; }
    }, 1400);
  },

  manoratha: () => {
    simBox.innerHTML = `
      <img src="${project.thumbnail}" style="max-width:100%;border-radius:10px;" alt="Manoratha preview" />
      <div class="sim-note">OrbitHacks 2024 build — see the GitHub repo for the live write-up and demo video.</div>`;
  },

  // New projects
  traffic: () => {
    simBox.innerHTML = `
      <canvas id="trafficCanvas" width="360" height="180" style="width:100%;max-width:360px;border-radius:8px;background:#1b2430;"></canvas>
      <div class="sim-note">Illustrative animation — not the real model, just showing the detection concept.</div>`;
    const canvas = document.getElementById("trafficCanvas");
    const ctx = canvas.getContext("2d");
    let x = -60;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // road
      ctx.fillStyle = "#2b2f38";
      ctx.fillRect(0, 120, canvas.width, 60);
      ctx.strokeStyle = "#f4c542";
      ctx.setLineDash([14, 10]);
      ctx.beginPath(); ctx.moveTo(0, 150); ctx.lineTo(canvas.width, 150); ctx.stroke();

      // bike (simple shape)
      ctx.fillStyle = "#0f1115";
      ctx.beginPath(); ctx.arc(x + 15, 140, 12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 55, 140, 12, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#d64545"; ctx.lineWidth = 4; ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(x + 15, 140); ctx.lineTo(x + 35, 115); ctx.lineTo(x + 55, 140); ctx.stroke();

      // bounding box + label once bike enters mid-frame
      if (x > 60 && x < 260) {
        ctx.strokeStyle = "#39d98a"; ctx.lineWidth = 2;
        ctx.strokeRect(x - 5, 95, 75, 60);
        ctx.fillStyle = "#39d98a";
        ctx.fillRect(x - 5, 82, 90, 14);
        ctx.fillStyle = "#0f1115";
        ctx.font = "10px monospace";
        ctx.fillText("NO HELMET 0.9x", x - 2, 92);
      }

      x += 2;
      if (x > canvas.width + 60) x = -60;
      requestAnimationFrame(draw);
    }
    draw();
  },

  spyder: () => {
    simBox.innerHTML = `
      <svg id="spyderSvg" viewBox="0 0 300 180" style="width:100%;max-width:300px;">
        <g id="spyderLegs" stroke="#31b7c2" stroke-width="5" fill="none" stroke-linecap="round"></g>
        <ellipse cx="150" cy="90" rx="42" ry="28" fill="#22303c" stroke="#31b7c2" stroke-width="2"/>
        <circle cx="138" cy="84" r="6" fill="#f4a261"/>
        <circle cx="162" cy="84" r="6" fill="#f4a261"/>
      </svg>
      <div class="spyder-controls">
        <button id="btnWalk" class="active">Walk (Wi-Fi cmd)</button>
        <button id="btnStop">Stop</button>
      </div>
      <div class="sim-note">Simulated gait — mirrors how a command sent over Wi-Fi to the ESP32 drives the servos.</div>`;

    const legsGroup = document.getElementById("spyderLegs");
    const legAnchors = [
      { hip: [125, 80], foot: [65, 55] },
      { hip: [125, 95], foot: [55, 100] },
      { hip: [125, 110], foot: [65, 145] },
      { hip: [175, 80], foot: [235, 55] },
      { hip: [175, 95], foot: [245, 100] },
      { hip: [175, 110], foot: [235, 145] },
    ];
    let walking = true;
    let t = 0;
    function render() {
      legsGroup.innerHTML = legAnchors
        .map(({ hip, foot }, i) => {
          const phase = walking ? Math.sin(t + i * 1.1) * 12 : 0;
          const kx = (hip[0] + foot[0]) / 2 + (i < 3 ? -8 : 8);
          const ky = (hip[1] + foot[1]) / 2 + phase;
          return `<path d="M${hip[0]} ${hip[1]} L${kx} ${ky} L${foot[0]} ${foot[1] + (walking ? phase / 2 : 0)}"/>`;
        })
        .join("");
      if (walking) t += 0.18;
      requestAnimationFrame(render);
    }
    render();

    const btnWalk = document.getElementById("btnWalk");
    const btnStop = document.getElementById("btnStop");
    btnWalk.addEventListener("click", () => { walking = true; btnWalk.classList.add("active"); btnStop.classList.remove("active"); });
    btnStop.addEventListener("click", () => { walking = false; btnStop.classList.add("active"); btnWalk.classList.remove("active"); });
  },

  janata: () => {
    simBox.innerHTML = `
      <div class="janata-demo">
        <textarea id="janataInput" rows="2" placeholder="Describe a local issue... e.g. 'Streetlight broken near Ward 4 school'"></textarea>
        <button id="janataSubmit">Submit Complaint</button>
        <div class="janata-status">
          <div class="step" id="stepSubmitted">① Submitted</div>
          <div class="step" id="stepReview">② Under Review by Ward Office</div>
          <div class="step" id="stepResolved">③ Resolved</div>
        </div>
      </div>
      <div class="sim-note">Front-end demo only — no real complaint is sent anywhere.</div>`;
    const submitBtn = document.getElementById("janataSubmit");
    const steps = [document.getElementById("stepSubmitted"), document.getElementById("stepReview"), document.getElementById("stepResolved")];
    submitBtn.addEventListener("click", () => {
      const input = document.getElementById("janataInput");
      if (!input.value.trim()) { input.focus(); return; }
      submitBtn.disabled = true;
      steps.forEach((s) => s.classList.remove("active"));
      steps[0].classList.add("active");
      setTimeout(() => steps[1].classList.add("active"), 1200);
      setTimeout(() => { steps[2].classList.add("active"); submitBtn.disabled = false; input.value = ""; }, 2800);
    });
  },

  citc: () => {
    simBox.innerHTML = `
      <div class="citc-frame-wrap">
        <iframe src="${project.liveUrl}" loading="lazy" title="CITC website preview"
          onerror="this.style.display='none'; document.getElementById('citcFallback').style.display='block';"></iframe>
        <div id="citcFallback" style="display:none;color:#9aa4b2;font-size:0.85rem;">
          The site can't be embedded here — <a href="${project.liveUrl}" target="_blank" style="color:#31b7c2;">open it directly</a>.
        </div>
      </div>
      <div class="sim-note">Live preview of citc.ncit.edu.np. If it appears blank, the site blocks embedding — use the Live Link button above.</div>`;
  },
};

if (simulations[project.simulation]) {
  simulations[project.simulation]();
} else {
  simBox.innerHTML = `<p class="sim-note">No demo available yet.</p>`;
}
