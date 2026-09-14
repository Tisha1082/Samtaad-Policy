# समतावाद (Samtawad) — Privacy Policy & Terms Website

This repository contains the official, production-ready, bilingual (**English & हिन्दी**) **Privacy Policy & Terms of Service** web page for the **Samtawad** mobile application (Android & iOS) and web platform.

---

## 🌟 Key Features & Compliance

- **Google Play Store & Apple App Store Ready:**
  - Mandatory **Account & Personal Data Deletion Policy** with direct in-app and email workflow instructions.
  - Transparent disclosures on **Firebase Authentication**, **Cloud Firestore**, and **Crashlytics**.
  - System permission justifications for **Foreground Audio Playback** (continuous Satsang & Simran audio) and **Storage / Offline Caching** (Granth reading).
  - Children's Privacy (**COPPA Compliance**).
- **Design & Aesthetics:**
  - Built with Samtawad's authentic spiritual palette: Saffron (`#E0670F`), Sacred Gold (`#C99A3B`), and warm neutral parchment tones.
  - **Light & Dark Theme Toggle** with persistent `localStorage` preference.
  - **Language Toggle (हिन्दी / English)** for seamless devotee access.
  - Live **Search Filter** and Sticky **Table of Contents** with scroll spy.
  - High-precision **Print / Save as PDF** stylesheet for submission or audits.

---

## 🚀 How to View Locally

Simply double-click `index.html` in any web browser (Chrome, Edge, Safari, Firefox).

Or run a local server in PowerShell/Terminal:
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```
Then open `http://localhost:8000`.

---

## 🌐 1-Minute Free Hosting (To get Live URL for Play Store / App Store)

Google Play Console and App Store Connect require a **live public URL** (e.g., `https://.../privacy-policy`). You can host this folder in under 2 minutes using any of these free methods:

### Option 1: GitHub Pages (Recommended - 100% Free & Permanent)
1. Push this folder to a GitHub repository (e.g., `samtawad-policy`).
2. Go to **Settings** → **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your live URL will be:  
   `https://<your-github-username>.github.io/samtawad-policy/`

### Option 2: Vercel or Netlify (Instant Drag-and-Drop)
1. Go to [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com).
2. Simply drag and drop this `Samtawad-Policy` folder.
3. You will instantly get a fast SSL HTTPS live URL:  
   `https://samtawad-policy.vercel.app`

### Option 3: Firebase Hosting (Existing Project)
Run inside this folder:
```bash
firebase init hosting
# Select existing project: samtawad-afde2
# Set public directory to: .
firebase deploy --only hosting
```

---

## 📋 URLs for Store Submissions

Once hosted, paste these into your store consoles:

| Store / Requirement | URL Value to Enter |
|---|---|
| **Google Play Console → Policy → Privacy Policy** | `https://your-domain.com/` |
| **Google Play Data Safety (Account Deletion URL)** | `https://your-domain.com/#data-deletion` |
| **Apple App Store Connect → Privacy Policy URL** | `https://your-domain.com/` |
| **Terms of Service URL** | `https://your-domain.com/#terms` |
