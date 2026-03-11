# Johnson Family Hub · Isla Claire Johnson
## Deployment Package — April 2026

---

### 📁 Files in this package

| File | Purpose |
|---|---|
| `index.html` | Main site structure — all sections, gallery, and forms |
| `johnsonfamilyhub.css` | All styles, layout, animations, and responsive breakpoints |
| `johnsonfamilyhub.js` | All JavaScript: countdown, navbar, contact form, privacy, confetti |
| `images/` | Your image folder (not included — copy from your existing repo) |

---

### 🚀 Deployment (GitHub Pages)

This is a static site — no build step required.

1. Drop all three files into the root of your GitHub repo
2. Copy your existing `images/` folder into the same root
3. Push to `main` — GitHub Pages will serve it automatically

Your file structure should look like:
```
/
├── index.html
├── johnsonfamilyhub.css
├── johnsonfamilyhub.js
└── images/
    ├── WeddingDay.png
    ├── Itsagirl.png
    ├── Ziggy Happy.jpg
    └── ... (all your image files)
```

---

### ⚙️ Configuration

#### Countdown Date
The due date is set in `index.html` on the countdown bar element:
```html
data-target="2026-04-09T00:00:00-04:00"
```
Update this ISO timestamp if the due date changes. The `-04:00` is Eastern Daylight Time (EDT).

#### Weeks Along (Hero stat)
Manually update the "Weeks Along" number in `index.html` in the hero stats block:
```html
<span class="hstat-num">36</span>
```

#### Contact Form (Google Apps Script)
The contact form posts to your existing Google Apps Script. The URL is in `johnsonfamilyhub.js`:
```javascript
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
```
If you redeploy your Apps Script, replace this URL with the new `/exec` endpoint.

#### Registry Link
Update the Babylist URL in `index.html` if your registry URL changes:
```html
<a href="https://my.babylist.com/melissa-blasingame" ...>
```

---

### 🖼️ Adding New Photos

To add a photo to the gallery, copy this block and paste it inside `<div class="gallery-grid">`:
```html
<div class="gallery-item fade-up">
  <div class="protected watermarked">
    <img src="images/YourNewPhoto.jpg" alt="Description of photo" draggable="false"/>
  </div>
  <div class="gallery-caption">Caption text here</div>
</div>
```
- Always include `draggable="false"` on the `<img>` tag
- Always wrap with `class="protected watermarked"` for privacy protection
- Place the image file in the `images/` folder

---

### 🔒 Privacy Features

The following protections are active on all gallery images:

| Protection | How |
|---|---|
| Right-click → Save blocked | JavaScript `contextmenu` event prevention |
| Drag-to-desktop blocked | `dragstart` prevention + `pointer-events: none` on `<img>` |
| Ctrl/Cmd+S / Ctrl+P blocked | `keydown` listener |
| PrintScreen → clipboard cleared | `keydown` listener + `navigator.clipboard.writeText('')` |
| iOS long-press Save blocked | `touchstart` prevention on `.protected` |
| Print-to-PDF blocked | CSS `@media print` hides all content |
| Watermark visible in screenshots | CSS `::before` pseudo-element on `.watermarked` |
| Transparent click absorber | CSS `::after` layer blocks interaction |

> **Note:** No purely client-side protection is 100% foolproof. For the highest level of protection, consider serving images through a backend with signed URLs or watermarking them server-side before delivery.

---

### 🎨 Color Palette

| Variable | Hex | Usage |
|---|---|---|
| `--cream` | `#FBF7F2` | Page background |
| `--cream-mid` | `#F5EDE2` | Alternate section background |
| `--rose` | `#E8A598` | Accents, countdown bar |
| `--rose-gold` | `#C9876A` | Eyebrow text, nav underlines |
| `--rose-deep` | `#A8604A` | Buttons hover, form accents |
| `--ink` | `#2B1A12` | Primary text, nav background |
| `--gold` | `#D4A96A` | Gradient accents |

---

### 🔤 Fonts

Loaded from Google Fonts (requires internet connection):
- **Pacifico** — Brand name, Isla Claire hero title, avatar initials
- **Fraunces** — Section headings, card titles, countdown numbers
- **Nunito** — Body text, nav links, form labels, buttons

---

*Johnson Family Hub · Built with love for Isla Claire · April 2026*
