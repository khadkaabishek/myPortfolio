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

