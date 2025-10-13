# portfolio_personal

This is a simple static portfolio site.

How to preview

Open `index.html` in your browser. From the workspace root you can run a simple static server, for example:

```bash
# Python 3 built-in server (macOS)
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

Notes
- Put your profile image at `images/profile.jpg` and project screenshots at `images/project1.jpg`, `images/project2.jpg`, etc.

I adapted layout and imagery from https://www.mrwajahatalimir.com to match structure and sections. Replace copy and images with your own content.

Enhancements added

- Projects are now JSON-driven: `data/projects.json` (edit this file to add/remove projects).
- Small JS at `js/main.js` dynamically populates the projects grid and implements a mobile nav toggle.
- Contact form action is preset to a Formspree placeholder — replace `your-form-id` with your actual Formspree form id or another endpoint.
- Social SVG icons and a mobile-friendly nav toggle were added.

Replace placeholder images in `images/` with your real screenshots for best results.

Contact behavior

- The contact form currently opens your default email client and populates a message addressed to `alvaromerinopuerta@gmail.com` using a `mailto:` link. This is handled in `js/main.js`. If you want server-side form handling instead (Formspree/Netlify), tell me and I'll wire it.