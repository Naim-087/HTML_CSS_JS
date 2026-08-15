# Naim — Portfolio Website

Vanilla HTML/CSS/JS portfolio. Files: `index.html`, `style.css`, `script.js`.

## Before you submit the assignment

1. **Replace the placeholder email.** Find and replace every instance of
   `your-email@example.com` in `index.html` with your real email address —
   it appears in:
   - the contact form's `action="https://formsubmit.co/your-email@example.com"`
   - the two `mailto:` links (hero socials + contact list)

2. **Fill in your real links.** Swap the placeholder `#` / `github.com/`
   / `linkedin.com/` links for your actual GitHub and LinkedIn profiles.

3. **Run it with Live Server** (VS Code → right-click `index.html` →
   "Open with Live Server").

4. **Activate FormSubmit.**
   - Submit the contact form once. FormSubmit will send an activation
     email to the address you put in step 1.
   - Open that email and click the activation link.
   - Go back to the site and submit the form again — from then on,
     messages get forwarded straight to your inbox.

## What's implemented (mapped to the assignment requirements)

- **HTML elements**: headings, paragraphs, sections, images/avatar,
  links, buttons, a full form with labeled inputs and a textarea.
- **CSS styling**: custom color palette, Google Fonts pairing
  (Space Grotesk / Inter / JetBrains Mono), gradients, borders, alignment.
- **Box model**: visible in card padding/margins/borders throughout
  `style.css` (`.fact-card`, `.project-card`, `.skill-category`, etc.).
- **Pseudo-classes**: `:hover` on buttons/cards/chips/nav links,
  `:focus-visible` on interactive elements, `:invalid` on the email field.
- **Contact form**: name, email, message — required fields, FormSubmit backend.
- **DOM manipulation on submit**: `script.js` intercepts the submit event,
  sends the data via `fetch`, and writes a success/error message into the
  page (`#formStatus`) without a page reload.
- **Event handling**: form `submit`, nav/theme toggle `click`,
  scroll-based reveal and progress bar via `scroll` and `IntersectionObserver`.

## Extra touches (the "dynamic / colorful / interactive" ask)

- Animated gradient background blobs
- Typing-effect hero tagline + a "profile.json" terminal panel that types itself out
- Scroll progress bar + scroll-triggered reveal animations
- Animated skill proficiency bars
- Light/dark theme toggle
- Fully responsive with a mobile nav menu

Everything here is easy to keep extending — swap in real project links,
add new cards as you finish new projects, and update the JSON panel and
skills as you grow.
