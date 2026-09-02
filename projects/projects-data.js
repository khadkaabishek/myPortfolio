// projects-data.js
// Single source of truth for every project shown in /projects.
// Edit this file to add, remove, or update a project — both index.html
// and project.html read from this array.
//
// Fields:
//   id            - unique slug, used in the URL as project.html?p=<id>
//   title         - project name
//   thumbnail     - path to the card image (relative to /projects/)
//   tagline       - one-line summary shown on the showcase card
//   description   - short paragraph shown at the top of the detail page
//   details       - array of paragraphs for the "How it works" section
//   tech          - array of tech/tool tags
//   github        - link to the repo (⚠️ fill in the real ones marked TODO)
//   liveUrl       - optional link to a live/hosted version
//   sampleFolder  - subfolder under projects/samples/ containing this project's images
//   samples       - array of { file, caption } — file must match a filename inside
//                   projects/samples/<sampleFolder>/. Rendered as a carousel, in order.
//                   See projects/samples/README.md for how to add more images.
//   simulation    - id used by project.js to know which mini-demo to render
//   simType       - "video" | "custom" (custom = interactive JS demo below)

const PROJECTS = [
  // ---------- EXISTING PROJECTS ----------
  {
    id: "smartfarming",
    title: "SmartFarming",
    thumbnail: "../Project_Assets/smartfarmThumbnail.jpeg",
    tagline: "IoT-based smart farm monitoring & automation system.",
    description:
      "SmartFarming is an IoT-driven monitoring and automation system built to help farmers track soil and environmental conditions in real time and automate basic farm responses like irrigation.",
    details: [
      "Sensors collect live readings (soil moisture, temperature, humidity) from the field and push them to a central dashboard.",
      "The dashboard visualizes trends over time so a farmer can spot problems early instead of guessing.",
      "Threshold-based automation can trigger actions such as irrigation, reducing manual monitoring effort.",
    ],
    tech: ["IoT", "Sensors", "Dashboard", "Automation"],
    github: "https://github.com/khadkaabishek", // TODO: replace with the exact repo link
    liveUrl: "https://shorturl.at/Tz0Bv",
    sampleFolder: "smartfarming",
    samples: [
      { file: "1.jpeg", caption: "Field monitoring dashboard" },
    ],
    simulation: "smartfarming",
    simType: "video",
    simSrc: "../Project_Assets/smartfarm.mp4",
  },
  {
    id: "blogger",
    title: "Blogger",
    thumbnail: "../Project_Assets/blogger.png",
    tagline: "A full-stack blogging platform for writing and publishing posts.",
    description:
      "Blogger is a full-stack blogging platform where users can create an account, write posts, and publish them for others to read — a classic MVC-style app built to practice full-stack fundamentals end to end.",
    details: [
      "The backend follows a clear Express MVC structure — separate layers for routes, middleware, services, and MongoDB models — with server-rendered views for the blog pages.",
      "Users can sign up, log in, and manage their own posts (create, edit, delete), with a dedicated middleware layer handling auth and request validation.",
      "A services layer keeps business logic out of the route handlers, making the codebase easier to extend with new post features.",
    ],
    tech: ["Node.js", "Express", "MongoDB", "EJS/Views"],
    github: "https://github.com/khadkaabishek/Blogger_Project",
    liveUrl: "",
    sampleFolder: "blogger",
    samples: [{ file: "1.png", caption: "Blog feed UI" }],
    simulation: "blogger",
    simType: "custom",
  },
  {
    id: "ecart",
    title: "E_Cart",
    thumbnail: "../Project_Assets/E_cart.png",
    tagline: "A front-end e-commerce cart experience.",
    description:
      "E_Cart is an e-commerce storefront experience focused on product browsing and a smooth add-to-cart / checkout flow.",
    details: [
      "Product listing with categories, images, and pricing.",
      "Cart state (add, remove, update quantity) and a running total.",
      "Deployed as a live demo so it can be clicked through without any setup.",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/khadkaabishek", // TODO: replace with the exact repo link
    liveUrl: "https://6a1d78b35a4da325ce3902a5--thunderous-macaron-fd4a56.netlify.app/",
    sampleFolder: "ecart",
    samples: [{ file: "1.png", caption: "Storefront view" }],
    simulation: "ecart",
    simType: "custom",
  },
  {
    id: "manoratha",
    title: "Manoratha",
    thumbnail: "../Project_Assets/manoratha.png",
    tagline: "Hackathon project built at OrbitHacks 2024.",
    description:
      "Manoratha (मनोरथा) — \"Healing Together, Growing Stronger\" — is a mental-wellness platform built for Nepalese youth during OrbitHacks 2024 by team Iterators, aiming to make emotional support and stress-relief resources easier to reach.",
    details: [
      "A Professional Connect portal bridges counselors and people looking for support, with separate dashboards for clients and counselors.",
      "An in-browser AI emotion detector (face-api.js) reads facial expression, age, and gender to help users notice their own emotional state over time.",
      "Real-time community chat rooms (Socket.io + Node.js) and a set of stress-relief mini-games and breathing exercises round out the experience, alongside curated digital magazines on mindfulness and healthy living.",
    ],
    tech: ["PHP", "MySQL", "Node.js", "Socket.io", "face-api.js"],
    github: "https://github.com/khadkaabishek/OrbitHacks2024_Iterators",
    liveUrl: "",
    sampleFolder: "manoratha",
    samples: [
      { file: "1.png", caption: "Project screenshot" },
      { file: "2.jpeg", caption: "Team Iterators at OrbitHacks 2024" },
    ],
    simulation: "manoratha",
    simType: "custom",
  },

  // ---------- NEW PROJECTS ----------
  {
    id: "traffic-violation-detection",
    title: "Two-Wheeler Traffic Violation Detection",
    thumbnail: "assets/traffic-detection.svg",
    tagline: "A YOLOv8 pipeline that detects helmet, triple-riding and plate violations, then auto-generates an e-challan.",
    description:
      "A final-year minor project that goes beyond simple detection: it's a full Smart Rider Monitoring & Violation Detection System that watches live CCTV/RTSP feeds, flags two-wheeler violations, and turns confirmed cases into a digital e-challan (fine notice) — built by a 3-person team at NCIT.",
    details: [
      "A YOLOv8 pipeline detects two-wheelers and riders per frame, then checks for helmet non-compliance and triple riding (more passengers than allowed).",
      "When a violation is confirmed, the plate is localized with YOLOv8 and read with OCR (EasyOCR/PaddleOCR) — number-plate recognition only runs after a violation is detected, to keep the pipeline efficient.",
      "A violation-processing engine compiles evidence (image, timestamp, camera location, confidence score), stores it in a database, and a web dashboard lets a human reviewer verify the case before an e-challan with a payment link is sent out by email/SMS.",
      "Trained on six Roboflow/Kaggle datasets (helmet detection, motorcycle-rider, triple riding, license plates, OCR, and phone-usage-while-riding) with a 70/20/10 train/val/test split and standard augmentation.",
      "Designed with real deployment in mind: GPU-accelerated inference, an optional edge deployment path on devices like NVIDIA Jetson, and a target of sub-30ms inference latency per frame.",
    ],
    tech: ["YOLOv8", "OpenCV", "PyTorch", "OCR (ANPR)", "React", "Node.js/Express"],
    github: "https://github.com/khadkaabishek/Automated-Two-Wheeler-Violation-Detection-and-E-Challan-System",
    liveUrl: "",
    sampleFolder: "traffic-violation-detection",
    samples: [{ file: "1.svg", caption: "Illustrative detection overlay" }],
    simulation: "traffic",
    simType: "custom",
  },
  {
    id: "spyder-robot",
    title: "Spyder Robot",
    thumbnail: "assets/spyder-robot.svg",
    tagline: "A four-legged robot with a browser control panel served straight from the ESP32.",
    description:
      "Spyder is a spider-legged robot driven entirely by an ESP32, controlled and monitored through a lightweight web interface — no companion app needed, just connect over Wi-Fi and drive it from a browser.",
    details: [
      "Four servo motors handle leg movement, giving the robot its walking gait, while two ultrasonic sensors (front and rear) provide obstacle-distance sensing.",
      "A smoke sensor doubles the robot up as a basic air-quality monitor, reporting readings alongside the movement controls.",
      "The ESP32 hosts a small web server, so the control panel (index.html + script.js) loads directly in a browser on the same Wi-Fi network — real-time control and monitoring with zero extra hardware.",
      "Built by a 4-person team as a hands-on exploration of embedded control, sensor fusion, and wireless communication.",
    ],
    tech: ["ESP32", "Servo Motors", "Ultrasonic Sensors", "Wi-Fi", "Embedded C++"],
    github: "https://github.com/khadkaabishek/Spider-",
    liveUrl: "",
    sampleFolder: "spyder-robot",
    samples: [{ file: "1.svg", caption: "Concept render" }],
    simulation: "spyder",
    simType: "custom",
  },
  {
    id: "janata-voice",
    title: "Janata Voice",
    thumbnail: "assets/janata-voice.svg",
    tagline: "A bilingual civic-reporting platform with voting, ward discussions, and an admin resolution pipeline.",
    description:
      "Janata Voice gives residents of a locality a direct channel to report civic problems — potholes, garbage, water and electricity issues, sanitation, and more — and track them through to resolution with municipal staff, in both English and Nepali.",
    details: [
      "Citizens file an issue with a title, description, category, ward, location on an interactive Leaflet map, and up to 3 photos, then track it through pending → in-progress → resolved.",
      "Other residents can upvote issues that matter to them and join ward- or municipality-level discussion threads, turning individual reports into visible community priorities.",
      "An ID (KYC) verification flow lets citizens confirm their identity to add credibility to reports, while a full admin dashboard lets municipal staff manage issues, review KYC submissions, and prioritize urgent \"red alert\" cases.",
      "The frontend is a React + TypeScript app with JWT-based authentication; the backend is Node/Express with MongoDB. An experimental FastAPI service also prototypes Nepali speech-to-text, aimed at voice-based issue reporting.",
    ],
    tech: ["React", "TypeScript", "Node.js/Express", "MongoDB", "Leaflet"],
    github: "https://github.com/khadkaabishek/janata_voice",
    liveUrl: "",
    sampleFolder: "janata-voice",
    samples: [{ file: "1.svg", caption: "Concept illustration" }],
    simulation: "janata",
    simType: "custom",
  },
  {
    id: "citc-website",
    title: "CITC Club Website",
    thumbnail: "assets/citc-website.svg",
    tagline: "A Next.js site + admin dashboard for the Computer Engineering Innovation & Tech Club at NCIT.",
    description:
      "The official website for CITC — Computer Engineering Innovation & Tech Club at Nepal College of Information Technology — live at citc.ncit.edu.np under the tagline \"Innovate. Connect. Transform.\" It's a full-stack Next.js app, not just a static site: a public side for visitors and an admin dashboard for club organizers.",
    details: [
      "The public site covers club info, an events list with per-event detail pages and galleries, a team roster organized by academic year with individual member profile pages, and a membership join form.",
      "All content — events, members, teams — is loaded dynamically from PostgreSQL via Drizzle ORM, so organizers can update the site without touching code.",
      "A separate Supabase-authenticated admin dashboard lets organizers manage members, teams, and events, including photo uploads to Supabase Storage.",
      "Ships with a real production setup: a Docker multi-stage build, GitHub Actions CI publishing to GitHub Container Registry, Traefik-managed HTTPS, and dynamic sitemap/SEO generation for every event and member page.",
    ],
    tech: ["Next.js 16", "React 19", "PostgreSQL", "Drizzle ORM", "Supabase", "Tailwind CSS"],
    github: "https://github.com/CITC-Club/citc-website",
    liveUrl: "http://citc.ncit.edu.np",
    sampleFolder: "citc-website",
    samples: [{ file: "1.svg", caption: "Club branding" }],
    simulation: "citc",
    simType: "custom",
  },
];

if (typeof module !== "undefined") module.exports = PROJECTS;
