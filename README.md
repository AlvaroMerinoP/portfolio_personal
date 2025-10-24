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

Design notes

-
## Deployment Setup

This repository is configured to deploy automatically via **GitHub Pages** whenever you push changes to the `main` branch. The published site will be available at your GitHub Pages URL:

- Default URL (no custom domain): `https://alvaromerinop.github.io/portfolio_personal/`

To deploy new changes locally:

- Run the provided `deploy.sh` script from the repository root. This script stages all changes, creates a commit, and pushes to the `main` branch to trigger the GitHub Pages workflow.
- Ensure you have write access via SSH (see "Setting up SSH keys" below).

## Setting up SSH keys

If you haven't already set up SSH authentication with GitHub, follow these steps:

- Generate a new SSH key:
  - On your machine, open a terminal and run:
    `ssh-keygen -t ed25519 -C "your_email@example.com"`
    This creates a new SSH key (default path is `~/.ssh/id_ed25519`).
- Add the public key to GitHub:
  - Copy the contents of your `id_ed25519.pub` file.
  - On GitHub, go to **Settings → SSH and GPG keys → New SSH key**. Paste the key and give it a descriptive title.
- Clone the repository using the SSH URL:
  - `git clone git@github.com:AlvaroMerinoP/portfolio_personal.git`
  - After cloning, you can edit files and use the `deploy.sh` script to push changes.

## Custom Domain (Optional)

If you'd like to use your own domain instead of the default GitHub Pages URL, you can map it as follows:

- Purchase a domain from any registrar (e.g., Namecheap, Google Domains).
- Create a DNS record pointing your domain to GitHub Pages:
  - For a **root domain** (e.g., `yourdomain.com`), create A records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
  - For a **subdomain** (e.g., `www.yourdomain.com`), create a CNAME record pointing to `alvaromerinop.github.io`.
- In your repository, create a file named `CNAME` in the root containing only your custom domain (e.g., `www.yourdomain.com`). Commit and push it.
- Visit the repository's **Settings → Pages** section and set the custom domain. GitHub will attempt to verify the DNS settings.

After DNS propagation, your portfolio will be accessible via your custom domain.
 The UI uses a grayscale palette for surfaces and text; headings use vivid accent colors for emphasis.
- The page has soft, blurred geometric shapes in the background (CSS-only) for subtle depth.
