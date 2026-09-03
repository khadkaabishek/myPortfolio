/* ==========================================================================
   Abishek Khadka — Portfolio v2 interactions
   Hero canvas, scroll-reveal, nav indicator, tilt, ripple, scramble, lab previews
   All effects respect prefers-reduced-motion.
   ========================================================================== */

(function () {
  "use strict";

  const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const IS_TOUCH = window.matchMedia("(hover: none)").matches;

  /* ---------------------------------------------------------------------
     1. Hero background — animated circuitry/particle network
        Draws on every <canvas class="hero-bg-canvas"> found (mobile hero +
        desktop sidebar). Pauses when tab hidden or off-screen for perf.
  --------------------------------------------------------------------- */
  function initHeroCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    let width, height, points, raf;
    let running = true;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = Math.max(1, Math.floor(rect.width));
      height = canvas.height = Math.max(1, Math.floor(rect.height));
    }

    function makePoints() {
      const density = Math.max(18, Math.min(46, Math.floor((width * height) / 14000)));
      points = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function drawStatic() {
      // Reduced-motion fallback: a faint static node/line grid, no animation.
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(0, 229, 255, 0.12)";
      ctx.fillStyle = "rgba(124, 92, 255, 0.35)";
      points.forEach((p, i) => {
        points.slice(i + 1).forEach((q) => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.globalAlpha = 1 - d / 120;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        });
      });
      ctx.globalAlpha = 1;
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function step() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });
      ctx.strokeStyle = "rgba(0, 229, 255, 0.14)";
      ctx.fillStyle = "rgba(124, 92, 255, 0.5)";
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const p = points[i], q = points[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.globalAlpha = 1 - d / 120;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(step);
    }

    resize();
    makePoints();

    if (REDUCED_MOTION) {
      drawStatic();
    } else {
      step();
    }

    window.addEventListener("resize", () => {
      resize();
      makePoints();
      if (REDUCED_MOTION) drawStatic();
    });

    document.addEventListener("visibilitychange", () => {
      running = !document.hidden && !REDUCED_MOTION;
      if (running) step();
      else cancelAnimationFrame(raf);
    });

    // Pause when scrolled out of view
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (REDUCED_MOTION) return;
          running = entry.isIntersecting;
          if (running) step();
          else cancelAnimationFrame(raf);
        });
      }, { threshold: 0.05 });
      io.observe(canvas);
    }
  }

  document.querySelectorAll("canvas.hero-bg-canvas").forEach(initHeroCanvas);

  /* ---------------------------------------------------------------------
     2. Scroll-triggered reveal for each section
  --------------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(".info-section");
  if ("IntersectionObserver" in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("reveal-visible"));
  }

  /* ---------------------------------------------------------------------
     3. Active-section nav indicator
  --------------------------------------------------------------------- */
  (function navIndicator() {
    const sections = Array.from(document.querySelectorAll(".middle-section .info-section[id]"));
    const navLinks = Array.from(document.querySelectorAll(".nav-list a[href^='#']"));
    if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) return;

    const linkFor = (id) => navLinks.find((a) => a.getAttribute("href") === `#${id}`);

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = linkFor(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.classList.remove("active-link"));
            link.classList.add("active-link");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => navObserver.observe(s));
  })();

  /* ---------------------------------------------------------------------
     4. 3D tilt on cards (skips touch devices & reduced motion)
  --------------------------------------------------------------------- */
  if (!IS_TOUCH && !REDUCED_MOTION) {
    const tiltSelectors = ".icon-item, .slide-card, .lab-card";
    document.querySelectorAll(tiltSelectors).forEach((el) => {
      el.setAttribute("data-tilt", "");
      const maxTilt = el.classList.contains("icon-item") ? 8 : 6;

      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(700px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) translateY(-4px)`;
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------------------------------------------------------------------
     5. Ripple micro-interaction on buttons
  --------------------------------------------------------------------- */
  document.querySelectorAll(".action-btn, .submit-btn, .tab-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (REDUCED_MOTION) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------------------------------------------------------------------
     6. Text-scramble intro for the hero name
  --------------------------------------------------------------------- */
  const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

  function scrambleInto(el) {
    if (!el || el.dataset.scrambled === "true") return;
    el.dataset.scrambled = "true";
    const finalText = el.textContent.trim();
    if (REDUCED_MOTION) return; // keep plain text, no animation

    let frame = 0;
    const totalFrames = 24;
    const revealEvery = Math.max(1, Math.floor(totalFrames / finalText.length));

    function render() {
      let out = "";
      const revealedCount = Math.min(finalText.length, Math.floor(frame / revealEvery));
      for (let i = 0; i < finalText.length; i++) {
        if (i < revealedCount || finalText[i] === " ") {
          out += finalText[i];
        } else {
          out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      el.textContent = out;
      frame++;
      if (revealedCount < finalText.length) {
        requestAnimationFrame(render);
      } else {
        el.textContent = finalText;
      }
    }
    render();
  }

  document.querySelectorAll(".hero-name").forEach((el) => {
    setTimeout(() => scrambleInto(el), 150);
  });

  /* ---------------------------------------------------------------------
     7. Interactive Labs — animated live previews (canvas loops)
  --------------------------------------------------------------------- */
  function initGravityPreview(canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, raf, ball, trail;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      ball = { x: w * 0.15, y: h * 0.2, vx: w * 0.011, vy: 0 };
      trail = [];
    }
    resize();
    window.addEventListener("resize", resize);

    const gravity = 0.32;
    const restitution = 0.72;

    function drawStaticFrame() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(0, 229, 255, 0.15)";
      ctx.beginPath();
      for (let i = 0; i <= w; i += 24) { ctx.moveTo(i, 0); ctx.lineTo(i, h); }
      for (let j = 0; j <= h; j += 24) { ctx.moveTo(0, j); ctx.lineTo(w, j); }
      ctx.stroke();
      ctx.fillStyle = "#00E5FF";
      ctx.beginPath();
      ctx.arc(w * 0.35, h * 0.45, 7, 0, Math.PI * 2);
      ctx.fill();
    }

    function step() {
      ctx.clearRect(0, 0, w, h);

      // faint grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.beginPath();
      for (let i = 0; i <= w; i += 24) { ctx.moveTo(i, 0); ctx.lineTo(i, h); }
      for (let j = 0; j <= h; j += 24) { ctx.moveTo(0, j); ctx.lineTo(w, j); }
      ctx.stroke();

      ball.vy += gravity;
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.y + 7 > h) { ball.y = h - 7; ball.vy *= -restitution; }
      if (ball.x - 7 < 0 || ball.x + 7 > w) { ball.vx *= -1; ball.x = Math.max(7, Math.min(w - 7, ball.x)); }

      trail.push({ x: ball.x, y: ball.y });
      if (trail.length > 40) trail.shift();

      trail.forEach((p, i) => {
        ctx.globalAlpha = i / trail.length * 0.5;
        ctx.fillStyle = "#7C5CFF";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      const grad = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, 14);
      grad.addColorStop(0, "#00E5FF");
      grad.addColorStop(1, "rgba(0, 229, 255, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#e6edf3";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 6, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(step);
    }

    if (REDUCED_MOTION) {
      drawStaticFrame();
    } else {
      step();
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) { cancelAnimationFrame(raf); step(); }
            else cancelAnimationFrame(raf);
          });
        }, { threshold: 0.05 });
        io.observe(canvas);
      }
    }
  }

  function initArcadePreview(canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, invaders, tick = 0, raf, dir = 1;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      invaders = [];
      const cols = 6, rows = 3, spacing = Math.min(34, w / (cols + 2));
      const offsetX = (w - cols * spacing) / 2;
      const offsetY = h * 0.22;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          invaders.push({ x: offsetX + c * spacing, y: offsetY + r * spacing, alive: true });
        }
      }
    }
    resize();
    window.addEventListener("resize", resize);

    function drawInvader(x, y, colorA, colorB, wobble) {
      ctx.fillStyle = colorA;
      ctx.fillRect(x - 8, y - 6 + wobble, 16, 10);
      ctx.fillStyle = colorB;
      ctx.fillRect(x - 5, y - 9 + wobble, 10, 4);
    }

    function drawStaticFrame() {
      ctx.clearRect(0, 0, w, h);
      invaders.forEach((inv) => drawInvader(inv.x, inv.y, "#7C5CFF", "#00E5FF", 0));
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      tick += 0.05;

      const shift = Math.sin(tick) * (w * 0.12);
      invaders.forEach((inv, i) => {
        const wobble = Math.sin(tick * 2 + i) * 2;
        drawInvader(inv.x + shift, inv.y, "#7C5CFF", "#00E5FF", wobble);
      });

      // simple cannon at the bottom
      const cannonX = w / 2 + Math.sin(tick * 0.6) * (w * 0.28);
      ctx.fillStyle = "#2DD4BF";
      ctx.fillRect(cannonX - 10, h - 16, 20, 8);
      ctx.fillRect(cannonX - 3, h - 22, 6, 6);

      // occasional laser
      if (Math.floor(tick * 10) % 24 === 0) {
        ctx.strokeStyle = "rgba(45, 212, 191, 0.8)";
        ctx.beginPath();
        ctx.moveTo(cannonX, h - 22);
        ctx.lineTo(cannonX, h - 60);
        ctx.stroke();
      }

      raf = requestAnimationFrame(step);
    }

    if (REDUCED_MOTION) {
      drawStaticFrame();
    } else {
      step();
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) { cancelAnimationFrame(raf); step(); }
            else cancelAnimationFrame(raf);
          });
        }, { threshold: 0.05 });
        io.observe(canvas);
      }
    }
  }

  const gravityCanvas = document.getElementById("gravityPreviewCanvas");
  const arcadeCanvas = document.getElementById("arcadePreviewCanvas");
  if (gravityCanvas) initGravityPreview(gravityCanvas);
  if (arcadeCanvas) initArcadePreview(arcadeCanvas);
})();
