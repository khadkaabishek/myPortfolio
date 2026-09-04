/* ==========================================================================
   Custom animated cursor
   A small dot that tracks the pointer exactly, plus a larger ring that
   trails it with smooth easing. Grows and brightens over interactive
   elements. Skips entirely on touch devices and prefers-reduced-motion.
   ========================================================================== */

(function () {
  "use strict";

  var hasHover = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!hasHover || reducedMotion) return;

  document.documentElement.classList.add("has-custom-cursor");

  var dot = document.createElement("div");
  dot.className = "cursor-dot is-hidden";
  var ring = document.createElement("div");
  ring.className = "cursor-ring is-hidden";

  function mount() {
    document.body.appendChild(dot);
    document.body.appendChild(ring);
  }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);

  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;
  var ringX = mouseX;
  var ringY = mouseY;
  var hasMoved = false;

  var INTERACTIVE_SELECTOR =
    "a, button, input, textarea, select, label, [role='button'], .icon-item, " +
    ".slide-card, .lab-card, .tool-card, .showcase-card, .cs-card, .swatch, " +
    ".tab-btn, .sample-thumb, .sample-arrow, .slider-arrow";

  window.addEventListener(
    "mousemove",
    function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        ringX = mouseX;
        ringY = mouseY;
        dot.classList.remove("is-hidden");
        ring.classList.remove("is-hidden");
      }
      dot.style.transform = "translate(-50%, -50%) translate(" + mouseX + "px, " + mouseY + "px)";

      var target = e.target;
      if (target && target.closest && target.closest(INTERACTIVE_SELECTOR)) {
        ring.classList.add("is-hovering");
      } else {
        ring.classList.remove("is-hovering");
      }
    },
    { passive: true }
  );

  window.addEventListener("mousedown", function () {
    ring.classList.add("is-pressing");
    dot.classList.add("is-pressing");

    var ripple = document.createElement("div");
    ripple.className = "cursor-click-ripple";
    ripple.style.transform = "translate(-50%, -50%) translate(" + mouseX + "px, " + mouseY + "px)";
    document.body.appendChild(ripple);
    ripple.addEventListener("animationend", function () {
      ripple.remove();
    });
  });
  window.addEventListener("mouseup", function () {
    ring.classList.remove("is-pressing");
    dot.classList.remove("is-pressing");
  });

  document.addEventListener("mouseleave", function () {
    dot.classList.add("is-hidden");
    ring.classList.add("is-hidden");
  });
  document.addEventListener("mouseenter", function () {
    if (hasMoved) {
      dot.classList.remove("is-hidden");
      ring.classList.remove("is-hidden");
    }
  });

  function raf() {
    // Ease the ring toward the pointer for a smooth trailing feel.
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = "translate(-50%, -50%) translate(" + ringX + "px, " + ringY + "px)";
    window.requestAnimationFrame(raf);
  }
  window.requestAnimationFrame(raf);
})();
