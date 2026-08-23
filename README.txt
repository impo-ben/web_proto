PROTOLEAP INNOVATIONS WEBSITE — SETUP GUIDE
=============================================
Everything below is free. No credit card needed anywhere in this guide.


1. ADD YOUR LOGO (required)
----------------------------
Save your logo file as:
    assets/logo.png
(PNG with a transparent background works best.) Nav, loading screen and
footer all point to this exact path and will pick it up automatically —
nothing else to configure.


2. MAKE THE CONTACT FORM ACTUALLY SEND EMAILS (free — takes 2 minutes)
------------------------------------------------------------------------
Right now the form works, but without a key it just opens the visitor's
email app pre-filled with their message (a safe fallback) instead of
landing straight in your inbox. To fix that for free:

  1. Go to https://web3forms.com and click "Get Access Key" — enter
     protoleapinnovations@gmail.com. No account or payment required.
  2. Copy the access key they email you.
  3. Open index.html, find this line near the top of the contact form:
        <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
  4. Replace YOUR_WEB3FORMS_ACCESS_KEY with your real key.
  5. Save and re-upload. Submissions now arrive directly in your inbox,
     free, with no limit on Web3Forms' free tier.


3. FREE HOSTING — GitHub Pages (recommended, permanent, free forever)
------------------------------------------------------------------------
  1. Create a free account at https://github.com
  2. Click "New repository" — name it e.g. protoleap-website — set it
     to Public — click "Create repository".
  3. Click "uploading an existing file" and drag in index.html,
     style.css, script.js, and the whole assets/ folder.
  4. Go to the repo's Settings tab → Pages (left sidebar) → under
     "Build and deployment", set Source to "Deploy from a branch",
     Branch to "main" / "/ (root)" → Save.
  5. After 1–2 minutes your site is live at:
        https://YOUR-USERNAME.github.io/protoleap-website/
  6. (Optional) You can later point your own domain name at this for
     free too, from the same Pages settings screen.

ALTERNATIVE — Netlify Drop (fastest, drag-and-drop, also free)
  1. Go to https://app.netlify.com/drop
  2. Drag the whole website folder onto the page.
  3. You get a live URL immediately. Create a free account to keep the
     site permanently and add a custom domain later.

Both GitHub Pages and Netlify are genuinely free for a static site like
this one — no trial period, no card required.


4. THE CHATBOT — what it is and isn't
----------------------------------------
The chat widget (bottom-right) is a free, rule-based assistant that runs
entirely in the visitor's browser — it recognizes keywords (services,
products, quote, contact, robotics, IoT, PCB, 3D, training) and replies
with pre-written answers, then can jump the visitor straight to the
contact form. It does not call any paid AI API, so there's no
per-message cost, ever.

If you later want a true AI-powered assistant (one that can hold open-
ended conversations), that requires a paid API key from a provider like
Anthropic or OpenAI. The function to replace is getBotReply() near the
"CHATBOT" section of script.js — it's written as a single function
specifically so it's a drop-in swap later.


5. LOCAL VISUAL ASSETS
-----------------------
The website is now self-contained for its visual assets. The external
Unsplash image dependencies have been replaced with original SVG artwork
that matches the ProtoLeap dark/teal engineering visual language.

Branding:
    assets/branding/logo.svg
    assets/branding/hero-tech.svg

Service artwork:
    assets/services/

Product artwork:
    assets/products/

Gallery artwork:
    assets/gallery/

Technical illustrations:
    assets/illustrations/

The gallery and product images are intentionally vector-based so the site
stays fast, sharp on high-DPI screens and free of external image
dependencies. Replace any SVG later with your own real project photos
without changing the surrounding layout.

6. DESIGN UPDATE
----------------
The refreshed design gives PROTOLEAP INNOVATIONS stronger visual presence
through a brand lockup in the hero, a capability strip, dedicated product
artwork, consistent gallery visuals, and a stronger contact conversion
panel. The original dark graphite + teal engineering aesthetic is retained.

QUICK CHECKLIST
------------------
[ ] assets/logo.png added
[ ] Web3Forms access key pasted into index.html
[ ] Uploaded to GitHub Pages or Netlify
[ ] Tested the live contact form end-to-end
[ ] (Optional) Real gallery photos added
