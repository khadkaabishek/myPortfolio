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
    // "page-exiting" (opacity: 0) can still be sitting on <body> from just
    // before the user navigated away. If that same document is later
    // restored — via bfcache, a browser/gesture back-forward navigation, or
    // a mid-transition reload — this class must be cleared or it silently
    // wins over "page-loaded" and the page stays invisible forever.
    document.body.classList.remove("page-exiting");
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

  // Pages restored from the back/forward cache (bfcache) — including the
  // browser's swipe/edge back-forward gesture — don't re-run
  // DOMContentLoaded, so make sure they're visible again on every pageshow,
  // not just the persisted (bfcache) case: some browsers fire a
  // non-persisted pageshow on gesture navigation too, and it's always safe
  // to re-assert the visible state.
  window.addEventListener("pageshow", revealPage);

  // Belt-and-suspenders: if a navigation gets interrupted (e.g. the user
  // starts a swipe-back mid-fade-out, or the destination request fails) the
  // page can be left sitting in the "page-exiting" state. Clear it as soon
  // as the page is hidden so that whenever it becomes visible again —
  // bfcache or not — it's never stuck at opacity: 0.
  window.addEventListener("pagehide", function () {
    document.body.classList.remove("page-exiting");
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
