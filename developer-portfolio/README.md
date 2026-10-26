# Minimalist Developer Portfolio

A sleek, retro-modern, and highly performant personal portfolio inspired by [Sejal rawandhe portfolio](https://vercel.com/xyz-3026). Built with pure semantic **HTML5**, modern **CSS3**, and modular **Vanilla JavaScript** (no heavy frameworks or node dependencies required).

---

## ✨ Features

- **Space Grotesk Typography & Dot Grid**: Clean paper-feel aesthetic with warm cream tones in Light Mode and deep slate tones in Dark Mode.
- **Persistent Theme Switcher**: Toggle between light and dark modes with state saved in `localStorage` and fallback to system `prefers-color-scheme`.
- **Typewriter Role Cycle**: Character-by-character animated roles with blinking cursor.
- **Live Local Timezone Clock**: Accurately ticks every second using `Intl.DateTimeFormat` with your time zone (e.g. IST, PST, EST, UTC).
- **GitHub Contributions Heatmap**: Visualizes your last 371 days of activity using the public contributions proxy, with an automatic realistic mock fallback if offline.
- **Signature 2D Pixel Art Canvas**: Looping retro animated pixel runner with a raised sword, accompanied by a trailing hopping companion pet, gliding birds, and parallax drifting clouds. Automatically pauses off-screen for maximum battery & CPU efficiency!
- **Interactive 3D Project Cards**: Perspective tilt on hover, custom gradients, live preview links, and GitHub repository links.
- **Experience Timeline**: Vertical timeline with active status indicator.
- **Categorized Tech Stack**: Interactive pill badges with hover elevations and gradient borders.
- **Contact & Booking**: Click-to-copy email chip with toast notification and direct Cal.com booking buttons.

---

## 🚀 Quick Start

### 1. View Locally
Simply open `index.html` in your favorite web browser (Chrome, Edge, Firefox, Safari):

- On Windows: Double-click `index.html` or run:
  ```powershell
  Start-Process index.html
  ```
- Or run a lightweight local HTTP server:
  ```powershell
  npx serve .
  # or
  python -m http.server 3000
  ```

---

## 🛠️ Customization Guide

### 1. Personal Profile & Links (`script.js`)
At the top of `script.js`, edit the `CONFIG` object:

```javascript
const CONFIG = {
  name: 'Your Name',
  initials: 'YN',
  brandLogo: 'yourname.',
  roles: [
    'Full Stack Developer',
    'Open Source Contributor',
    'Cloud & DevOps Engineer'
  ],
  email: 'your.name@example.com',
  github: 'your-github-username',
  timeZone: 'Asia/Kolkata', // e.g., 'America/New_York', 'Europe/London'
  timeZoneLabel: 'IST',
  location: 'City, Country',
  pronouns: 'he/him',
  cal15: 'https://cal.com/your-username/15min',
  cal30: 'https://cal.com/your-username/30min'
};
```

### 2. Projects & Experience (`index.html`)
- **Projects**: Edit the `.pcard` cards in `<section id="projects">`. Update title, description, tags, GitHub link, and live demo link.
- **Experience**: Edit the `.xp` entries in `<section id="experience">`. Mark your current active role with class `now`.
- **Tech Stack**: Add or update pills inside `.stackrow` in `<section id="techstack">`.
- **Resume**: Place your resume PDF in the directory as `resume.pdf` or update `href` in `<a class="resume-btn" href="./resume.pdf">`.

---

## 🌐 Free 1-Minute Deployment

### Option A: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in this folder, or push this repository to GitHub and import it on [vercel.com](https://vercel.com).
3. Ready in seconds with zero build steps!

### Option B: GitHub Pages
1. Push this folder to a GitHub repository.
2. In your repo settings, go to **Pages** > Source: **Deploy from a branch** (`main` / root).
3. Save, and your portfolio will be live at `https://<your-username>.github.io/<repo-name>/`.
