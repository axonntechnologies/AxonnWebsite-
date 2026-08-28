# Axonn Technologies — Reference Recreation

A responsive React/Vite recreation of the supplied Axonn Technologies landing-page reference.

## Included

- Supplied cloud background used as the hero visual (`public/cloud-bg.png`)
- Responsive navigation with mobile menu
- Smooth scrolling with Lenis
- Motion-powered entrance/hover animations
- Hero dashboard recreated with HTML/CSS/SVG
- What We Do feature cards
- Floating laptop mockup
- Technology orbit
- Stats / analytics cards
- Responsive bento feature grid
- Working contact form with local success state
- Dotted world-map style illustration
- Working FAQ accordion
- Footer navigation and demo action
- Reduced-motion accessibility support

## Run

Requirements: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

Production build:

```bash
npm run build
npm run preview
```

## Contact form → Google Sheet + email

The "Start the Conversation" form submits to a Google Apps Script Web App bound
to a Google Sheet. Every submission is appended as a row **and** emailed to you.
No backend to host.

1. Create a new Google Sheet (your submissions log).
2. **Extensions → Apps Script**. Delete the sample, paste
   [`google-apps-script/Code.gs`](google-apps-script/Code.gs). Confirm
   `NOTIFY_EMAIL` is the address you want.
3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy, then authorise when prompted.
4. Copy the **Web app URL** (ends with `/exec`).
5. Paste it into [`src/lib/contact.ts`](src/lib/contact.ts) as `CONTACT_ENDPOINT`.

Restart `npm run dev` and submit the form — you'll get an email and a new row.
Editing the script later: **Deploy → Manage deployments → Edit → Version: New
version** keeps the same `/exec` URL.

## Notes

The design is intentionally recreated from the supplied reference using CSS, SVG, React and the supplied cloud background rather than relying on stock images.

The animation layer uses Motion + Lenis and follows the same premium ReactBits-style interaction language: reveal, spotlight, tilt, orbit, parallax-like movement, magnetic-feeling buttons, and soft atmospheric motion.
