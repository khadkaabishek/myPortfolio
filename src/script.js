// Theme toggle button
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    themeToggle.textContent = "☀️"; // Sun icon for light mode
  } else {
    themeToggle.textContent = "🌙"; // Moon icon for dark mode
  }
});

// YouTube IFrame API for muting video
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("smartfarmingVideo", {
    events: {
      onReady: (event) => {
        event.target.mute();
      },
    },
  });
}

// Video banner toggle
document.addEventListener("DOMContentLoaded", () => {
  const bannerImage = document.getElementById("bannerImage");
  const videoWrapper = document.getElementById("videoWrapper");
  const closeVideoBtn = document.getElementById("closeVideo");

  bannerImage.addEventListener("click", () => {
    bannerImage.hidden = true;
    videoWrapper.hidden = false;
    if (player && player.playVideo) {
      player.playVideo();
    }
  });

  bannerImage.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      bannerImage.hidden = true;
      videoWrapper.hidden = false;
      if (player && player.playVideo) {
        player.playVideo();
      }
    }
  });

  closeVideoBtn.addEventListener("click", () => {
    videoWrapper.hidden = true;
    bannerImage.hidden = false;
    if (player && player.stopVideo) {
      player.stopVideo();
    }
  });
});

const phrases = [
  { text: "Computer Engineering Student", color: "#31b7c2" },
  { text: "Web Developer", color: "#6c63ff" },
  { text: "Tech Enthusiast", color: "#ed1c24" },
];

const typingSpeed = 100; // ms per character
const pauseBetween = 1500; // ms pause after phrase typed

const animatedText = document.getElementById("animated-text");

let phraseIndex = 0;
let charIndex = 0;

function typePhrase() {
  const currentPhrase = phrases[phraseIndex];
  animatedText.style.color = currentPhrase.color;

  if (charIndex < currentPhrase.text.length) {
    animatedText.textContent += currentPhrase.text.charAt(charIndex);
    charIndex++;
    setTimeout(typePhrase, typingSpeed);
  } else {
    setTimeout(() => {
      erasePhrase();
    }, pauseBetween);
  }
}

function erasePhrase() {
  if (charIndex > 0) {
    animatedText.textContent = animatedText.textContent.slice(0, -1);
    charIndex--;
    setTimeout(erasePhrase, typingSpeed / 2);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length; // loop back to first phrase
    setTimeout(typePhrase, typingSpeed);
  }
}

// Start the animation
typePhrase();
