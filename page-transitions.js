/* ==========================================================================
   Smooth page transitions (multi-page site)
   Fades the current page in on load, and fades it out before following an
   internal link, so navigating between pages feels like one continuous
   experience instead of an abrupt reload. Real browsers that support
   cross-document View Transitions get an actual crossfade for free via CSS;
   this script is the fallback that works everywhere else.
   ========================================================================== */

(function () {
  "use strict";

  document.documentElement.classList.add("has-page-transitions");

  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var EXIT_DURATION = 220; // keep in sync with .page-exiting transition in CSS

  function revealPage() {
    document.body.classList.add("page-loaded");
  }

  // Reveal as soon as the DOM is interactive; a safety timeout guarantees
  // the page never gets stuck invisible if something else on the page errors.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", revealPage);
  } else {
    revealPage();
  }
  window.setTimeout(revealPage, 800);

  // Pages restored from the back/forward cache (bfcache) don't re-run
  // DOMContentLoaded, so make sure they're visible too.
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) revealPage();
  });

  if (reducedMotion) return;

  function isModifiedClick(e) {
    return e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
  }

  document.addEventListener("click", function (e) {
    if (isModifiedClick(e)) return;

    var link = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!link) return;

    var href = link.getAttribute("href");
    if (!href || href.charAt(0) === "#") return;
    if (link.target && link.target !== "" && link.target !== "_self") return;
    if (link.hasAttribute("download")) return;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return;

    var url;
    try {
      url = new URL(href, window.location.href);
    } catch (err) {
      return;
    }
    if (url.origin !== window.location.origin) return;

    // Same-page anchor (e.g. index.html#contact from within index.html) —
    // let the browser handle smooth in-page scrolling untouched.
    if (url.pathname === window.location.pathname && url.hash) return;

    e.preventDefault();
    document.body.classList.remove("page-loaded");
    document.body.classList.add("page-exiting");
    window.setTimeout(function () {
      window.location.href = url.href;
    }, EXIT_DURATION);
  });
})();
