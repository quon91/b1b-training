# B-1B Lancer Virtual Training — KDYS

Complete instructor training guide for the **KwikFlight B-1B** add-on in **Microsoft Flight Simulator 2024**, operated from **Dyess AFB (KDYS)**.

## 🌐 Live Site

Once deployed to GitHub Pages, your site will be at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

---

## 📁 What's included

| File / Folder | Description |
|---|---|
| `index.html` | Home page with module overview and aircraft reference |
| `pages/ils.html` | ILS approach step-by-step guide |
| `pages/rnav.html` | RNAV/GPS approach guide |
| `pages/vor.html` | VOR approach guide |
| `pages/autopilot.html` | Autopilot mode reference |
| `pages/fms.html` | FMS setup guide |
| `pages/glossary.html` | **Searchable phrase & term glossary (80+ terms)** |
| `pages/qrc.html` | Interactive tap-to-check QRC checklist |
| `pages/training.html` | Phase 2 & 3 instructor syllabus |
| `assets/style.css` | Shared stylesheet |
| `assets/main.js` | Shared JS (nav, QRC, phase switching) |
| `B1B_Editable_Training_Guide.html` | **Standalone editable guide** (open in any browser) |

---

## 🚀 How to deploy to GitHub Pages

### Option 1 — Upload via GitHub website (easiest)

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **+** (top right) → **New repository**
3. Name it something like `b1b-training` — keep it **Public**
4. Click **Create repository**
5. Click **uploading an existing file** on the next screen
6. Drag the entire contents of this folder into the upload area
7. Click **Commit changes**
8. Go to **Settings** → **Pages** (left sidebar)
9. Under **Source**: select **Deploy from a branch** → branch: `main` → folder: `/ (root)`
10. Click **Save**
11. Wait 1–2 minutes, then your site is live at `https://USERNAME.github.io/b1b-training/`

### Option 2 — GitHub Desktop app

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Click **File** → **New Repository** → choose this folder
3. Publish repository to GitHub (make it Public)
4. Go to repo Settings → Pages → Deploy from main branch
5. Site goes live in 1–2 minutes

### Option 3 — Git command line

```bash
cd /path/to/b1b-site
git init
git add .
git commit -m "Initial B-1B training site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/b1b-training.git
git push -u origin main
```
Then enable Pages in repo Settings.

---

## ✏️ Customizing the site

### Change the squadron name
Edit the `.nav-logo .name` text in each HTML file, or find:
```html
<div class="name">Bone Squadron</div>
```
and replace with your unit name.

### Add a logo
In each page's `<nav>` section, replace the `.badge` div with an `<img>` tag:
```html
<img src="assets/logo.png" alt="Squadron logo" style="height:34px">
```
Place your logo file in the `assets/` folder.

### Change accent color
In `assets/style.css`, find:
```css
--gold: #c8a951;
--gold2: #f0cc72;
```
Replace with your preferred color hex values.

### Add or edit glossary terms
In `pages/glossary.html`, find the `const TERMS = [` array and add entries in this format:
```js
{
  abbr: 'YOUR TERM',
  full: 'Full name',
  cat: 'nav',          // nav | ap | comm | sys | proc
  def: 'Definition text explaining the term in context of B-1B training.'
},
```

---

## 📋 Checklist for going live

- [ ] Upload all files maintaining the same folder structure
- [ ] Enable GitHub Pages in repository Settings → Pages
- [ ] Test all navigation links work (use relative paths — they do already)
- [ ] Customize squadron name, logo, and colors as desired
- [ ] Share the GitHub Pages URL with your squadron

---

## ⚠️ Important notes

- **For simulation use only.** Not for real-world aviation use.
- Built for the **KwikFlight B-1B** add-on in MSFS 2024.
- All frequencies and procedures reference **KDYS (Dyess AFB, Abilene TX)**.
- The standalone `B1B_Editable_Training_Guide.html` file works offline in any browser with no server needed.

---

*Virtual Flying Squadron · Dyess AFB (KDYS) · Microsoft Flight Simulator 2024 · KwikFlight B-1B*
