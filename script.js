//Tab switching
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`${btn.dataset.tab}-tab`).classList.add("active");
  });
});

// Typing Animation
const phrases = [
  { text: "Computer Engineering Student", color: "#31b7c2" },
  { text: "Full Stack Web Developer", color: "#6c63ff" },
  { text: "Tech Enthusiast", color: "#ed1c24" },
];
const typingSpeed = 100;
const pauseBetween = 1500;

// Desktop typing animation
const animatedTextDesktop = document.getElementById("animated-text");
let phraseIndexDesktop = 0;
let charIndexDesktop = 0;

function typePhraseDesktop() {
  const currentPhrase = phrases[phraseIndexDesktop];
  animatedTextDesktop.style.color = currentPhrase.color;
  if (charIndexDesktop < currentPhrase.text.length) {
    animatedTextDesktop.textContent +=
      currentPhrase.text.charAt(charIndexDesktop);
    charIndexDesktop++;
    setTimeout(typePhraseDesktop, typingSpeed);
  } else {
    setTimeout(erasePhraseDesktop, pauseBetween);
  }
}

function erasePhraseDesktop() {
  if (charIndexDesktop > 0) {
    animatedTextDesktop.textContent = animatedTextDesktop.textContent.slice(
      0,
      -1
    );
    charIndexDesktop--;
    setTimeout(erasePhraseDesktop, typingSpeed / 2);
  } else {
    phraseIndexDesktop = (phraseIndexDesktop + 1) % phrases.length;
    setTimeout(typePhraseDesktop, typingSpeed);
  }
}

// Mobile typing animation (hero section)
const animatedText = document.getElementById("animated-text-mobile");
let phraseIndexMobile = 0;
let charIndexMobile = 0;

function typePhraseMobile() {
  const currentPhrase = phrases[phraseIndexMobile];
  animatedText.style.color = currentPhrase.color;
  if (charIndexMobile < currentPhrase.text.length) {
    animatedText.textContent += currentPhrase.text.charAt(charIndexMobile);
    charIndexMobile++;
    setTimeout(typePhraseMobile, typingSpeed);
  } else {
    setTimeout(erasePhraseMobile, pauseBetween);
  }
}

function erasePhraseMobile() {
  if (charIndexMobile > 0) {
    animatedText.textContent = animatedText.textContent.slice(0, -1);
    charIndexMobile--;
    setTimeout(erasePhraseMobile, typingSpeed / 2);
  } else {
    phraseIndexMobile = (phraseIndexMobile + 1) % phrases.length;
    setTimeout(typePhraseMobile, typingSpeed);
  }
}

// Start animations
if (animatedTextDesktop) {
  typePhraseDesktop();
}
if (animatedText) {
  typePhraseMobile();
}

// Theme toggle (persisted in localStorage so it stays in sync with /projects pages)
const themeToggle = document.getElementById("themeToggle");
const themeToggle_desktop = document.getElementById("themeToggle_desktop");

function setThemeIcons(isDarkMode) {
  const iconHtml = isDarkMode
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';
  if (themeToggle) themeToggle.innerHTML = iconHtml;
  if (themeToggle_desktop) themeToggle_desktop.innerHTML = iconHtml;
}

function applyStoredTheme() {
  const isDarkMode = localStorage.getItem("theme") === "dark";
  document.body.classList.toggle("dark-mode", isDarkMode);
  setThemeIcons(isDarkMode);
}
applyStoredTheme();

function toggleTheme(sourceBtn) {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  setThemeIcons(isDarkMode);
  if (sourceBtn) {
    sourceBtn.style.transform = isDarkMode ? "rotate(360deg)" : "rotate(0deg)";
    setTimeout(() => (sourceBtn.style.transition = "transform 0.5s"), 0);
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => toggleTheme(themeToggle));
}

if (themeToggle_desktop) {
  themeToggle_desktop.addEventListener("click", () => toggleTheme(themeToggle_desktop));
}
// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navListMobile = document.querySelector(".nav-list-mobile");

if (hamburger && navListMobile) {
  hamburger.addEventListener("click", () => {
    navListMobile.classList.toggle("active");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navListMobile.contains(e.target)) {
      navListMobile.classList.remove("active");
    }
  });
}

// Enter Abishek toggle (Desktop and Mobile)
const enterBtn = document.getElementById("enterAbishekBtn");
const enterBtnMobile = document.getElementById("enterAbishekBtnMobile");
const secureForm = document.getElementById("secureForm");
const securePopup = document.getElementById("securePopup");
const securePopupForm = document.getElementById("securePopupForm");
const popupClose = document.getElementById("popupClose");
const defaultImage = document.getElementById("defaultImage");
const secureContent = document.getElementById("secureContent");

function showSecureForm() {
  if (window.innerWidth <= 1023) {
    securePopup.style.display = "block";
  } else {
    secureForm.style.display = "flex";
  }
}

if (enterBtn) {
  enterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showSecureForm();
  });
}

if (enterBtnMobile) {
  enterBtnMobile.addEventListener("click", (e) => {
    e.preventDefault();
    showSecureForm();
    if (navListMobile) {
      navListMobile.classList.remove("active");
    }
  });
}

if (popupClose) {
  popupClose.addEventListener("click", () => {
    securePopup.style.display = "none";
  });
}

if (securePopup) {
  securePopup.addEventListener("click", (e) => {
    if (e.target === securePopup) {
      securePopup.style.display = "none";
    }
  });
}

[secureForm, securePopupForm].forEach((form) => {
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const username =
        form.querySelector("#username")?.value ||
        form.querySelector("#popupUsername")?.value;
      const password =
        form.querySelector("#password")?.value ||
        form.querySelector("#popupPassword")?.value;
      const SALT = "£714!";
      const HASHED_PASSWORD =
        "c548c4f7949c4ccc47060d8f8b7cde915f2f96130af00e8de54df095e5cc9d8a";
      const inputHash = sha256(password + SALT);

      if (username === "Abishek" && inputHash === HASHED_PASSWORD) {
        if (window.innerWidth <= 1023) {
          securePopup.style.display = "none";
          alert("Access granted! (Mobile view - secure content not available)");
        } else {
          defaultImage.style.display = "none";
          secureForm.style.display = "none";
          secureContent.style.display = "block";
        }
      } else {
        alert("Invalid credentials");
      }
    });
  }
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn");
const middleSection = document.querySelector(".middle-section");

if (scrollTopBtn && middleSection) {
  middleSection.addEventListener("scroll", () => {
    if (middleSection.scrollTop > 100) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    middleSection.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }

    if (window.innerWidth <= 1023 && navListMobile) {
      navListMobile.classList.remove("active");
    }
  });
});

// // Contact form submission
// const contactForm = document.querySelector(".contact-form");
// if (contactForm) {
//   contactForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const message = document.getElementById("message").value;

//     alert(
//       `Thank you ${name}! Your message has been received. I'll get back to you at ${email} soon.`
//     );

//     contactForm.reset();
//   });
// }

// Window resize handler
window.addEventListener("resize", () => {
  if (window.innerWidth > 1023 && navListMobile) {
    navListMobile.classList.remove("active");
  }
  if (window.innerWidth > 1023 && securePopup) {
    securePopup.style.display = "none";
  }
});

// ---------- Homepage Projects Slider ----------
// Reads from projects/projects-data.js (PROJECTS array) so the homepage
// preview always stays in sync with the full showcase at /projects.
(function initProjectsSlider() {
  const slider = document.getElementById("projectsSlider");
  const dotsWrap = document.getElementById("projDots");
  const prevBtn = document.getElementById("projPrev");
  const nextBtn = document.getElementById("projNext");
  if (!slider || typeof PROJECTS === "undefined") return;

  slider.innerHTML = PROJECTS.map(
    (p) => `
    <a class="slide-card" href="./projects/project.html?p=${encodeURIComponent(p.id)}">
      <div class="slide-thumb"><img src="./projects/${p.thumbnail}" alt="${p.title}" loading="lazy" /></div>
      <div class="slide-info">
        <h3>${p.title}</h3>
        <p>${p.tagline}</p>
        <span class="slide-cta">View Project <i class="fas fa-arrow-right"></i></span>
      </div>
    </a>`
  ).join("");

  // Build dots
  if (dotsWrap) {
    dotsWrap.innerHTML = PROJECTS.map((_, i) => `<span data-index="${i}"></span>`).join("");
  }
  const dots = dotsWrap ? Array.from(dotsWrap.children) : [];
  const cards = Array.from(slider.children);

  function setActiveDot() {
    if (!dots.length) return;
    const scrollPos = slider.scrollLeft;
    let closest = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - scrollPos);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    dots.forEach((d, i) => d.classList.toggle("active", i === closest));
  }
  setActiveDot();
  slider.addEventListener("scroll", () => {
    window.requestAnimationFrame(setActiveDot);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const i = Number(dot.dataset.index);
      if (cards[i]) {
        slider.scrollTo({ left: cards[i].offsetLeft, behavior: "smooth" });
      }
    });
  });

  function scrollByCard(direction) {
    const card = cards[0];
    if (!card) return;
    const cardWidth = card.getBoundingClientRect().width + 20; // gap
    slider.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  }
  if (prevBtn) prevBtn.addEventListener("click", () => scrollByCard(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => scrollByCard(1));
})();
