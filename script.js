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

// Theme toggle
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    themeToggle.innerHTML = isDarkMode
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
    themeToggle.style.transform = isDarkMode
      ? "rotate(360deg)"
      : "rotate(0deg)";
    setTimeout(() => (themeToggle.style.transition = "transform 0.5s"), 0);
  });
}

const themeToggle_desktop = document.getElementById("themeToggle_desktop");

if (themeToggle_desktop) {
  themeToggle_desktop.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    themeToggle_desktop.innerHTML = isDarkMode
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
    themeToggle_desktop.style.transform = isDarkMode
      ? "rotate(360deg)"
      : "rotate(0deg)";
    setTimeout(
      () => (themeToggle_desktop.style.transition = "transform 0.5s"),
      0
    );
  });
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
      const SALT = "@73";
      const HASHED_PASSWORD =
        "f31cd515dc88d36857b9fcc13caf8cb8f7c4f3bddde4f00ccad72175fbad8477";
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
