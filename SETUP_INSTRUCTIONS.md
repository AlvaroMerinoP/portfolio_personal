# Portfolio Setup Instructions

## ✅ What's Already Done

All code has been automatically updated! Your portfolio is ready except for adding your images.

### Updated Projects:
1. **FINEX AI - Smart Finance Tracker** (Project 1)
   - AI-powered finance management with predictive analytics
   - Technologies: React Native, AI/ML, Node.js

2. **Sustainable Tech Wear** (Project 2)
   - Eco-friendly e-commerce platform
   - Technologies: Next.js, TypeScript, Stripe

3. **Component Forge AI** (Project 3)
   - AI-powered design system generator
   - Technologies: React, AI/ML, Storybook

## 🚀 What You Need to Do

### Step 1: Save Your Project Images

You need to save your 3 project screenshots with these **exact filenames** in the `images/` folder:

```
images/project1.jpg  → FINEX AI dashboard screenshot
images/project2.jpg  → Sustainable Tech Wear e-commerce screenshot
images/project3.jpg  → Component Forge AI design system screenshot
```

**Important:**
- File names must be exactly as shown above
- Format: `.jpg` (or `.png` if you prefer, but update the HTML accordingly)
- Recommended size: 1200x800px or similar aspect ratio
- Optimize images for web (compress to ~200-300KB each)

### Step 2: Add Your Personal Images (Optional but Recommended)

Add these images to the `images/` folder when you have them:
- `profile.jpg` - Your profile photo (400x400px recommended)
- `og-image.jpg` - Open Graph image for social sharing (1200x630px)
- `favicon-16x16.png` - Browser favicon 16x16
- `favicon-32x32.png` - Browser favicon 32x32

### Step 3: Test Locally

Open `index.html` in your browser to verify everything works:
```bash
# Option 1: Just open the file
open index.html

# Option 2: Use a local server (recommended)
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

### Step 4: Deploy to GitHub Pages

Once you've added your images and tested locally:

```bash
# Make sure you're in your portfolio folder
cd /Users/alvaromerinopuerta/Desktop/portfolio_personal

# Run the deploy script
chmod +x deploy.sh
./deploy.sh
```

The deploy script will:
1. Add all changes to git
2. Commit with timestamp
3. Push to GitHub
4. Your site will be live at: `https://alvaromerinop.github.io/portfolio_personal/`

## 📋 Features Included

✅ **Interactive Features:**
- Custom cursor animation
- Canvas particle effects (optimized for mobile)
- Interactive terminal with command history
- Typing animation effect
- Animated counters and skill bars
- Smooth scroll navigation
- Mobile-friendly navigation menu

✅ **Accessibility:**
- Font size controls (smaller/larger)
- High contrast mode
- Reduce motion option
- Skip to main content link
- ARIA labels throughout
- Keyboard navigation support

✅ **Multi-language Support:**
- English and Spanish translations
- Language switcher in navigation
- Persists user preference

✅ **Analytics & Forms:**
- Plausible Analytics (privacy-friendly)
- Contact form with Formspree integration
- Newsletter signup
- Email validation

✅ **GitHub Integration:**
- Live GitHub stats display
- Cached API calls (30min TTL)
- Automatic error handling

✅ **SEO Optimized:**
- Meta tags for search engines
- Open Graph tags for social sharing
- Twitter Card support
- JSON-LD structured data
- Sitemap.xml and robots.txt

## 🎨 Customization Tips

### Changing Colors
Edit `css/estilos.css` and modify the CSS variables at the top:
```css
:root {
  --primary-color: #00ff00;  /* Change this */
  --bg-color: #0a0a0a;       /* Change this */
  /* ... more variables ... */
}
```

### Adding More Projects
1. Duplicate `project3.html` → `project4.html`
2. Add project card in `index.html` work section
3. Update project details in the new file
4. Add image as `images/project4.jpg`

### Modifying Sections
All sections are clearly marked with comments in `index.html`:
- `<!-- Hero Section -->`
- `<!-- Work Section -->`
- `<!-- Skills Section -->`
- `<!-- About Section -->`
- `<!-- Contact Section -->`

## 🔧 Troubleshooting

### Images not showing?
- Check file names match exactly (case-sensitive)
- Verify images are in the `images/` folder
- Check file format (.jpg vs .png)
- Clear browser cache (Cmd+Shift+R on Mac)

### Forms not working?
- Verify the **contact** form Formspree ID: `https://formspree.io/f/mzzjnnra`
- The **newsletter** form uses a **separate** Formspree form to keep submissions distinct.
  Create a second form at https://formspree.io, copy its ID, and replace `YOUR_NEWSLETTER_FORM_ID`
  in the `<form action="…">` attribute inside `index.html` (search for `YOUR_NEWSLETTER_FORM_ID`).
- Both forms include an invisible honeypot field (`_gotcha`) that Formspree uses automatically to
  filter spam — do not remove it.
- Check browser console for errors
- Make sure JavaScript is enabled

### GitHub stats not loading?
- Wait 30 seconds (API has rate limits)
- Check browser console for errors
- Verify GitHub username is correct: `AlvaroMerinoP`

### Mobile navigation not working?
- Clear browser cache
- Test in different browser
- Check JavaScript console for errors

## 📞 Support

If you encounter issues:
1. Check browser console (F12) for error messages
2. Verify all files are in correct locations
3. Make sure images are properly named
4. Test in incognito/private mode to rule out cache issues

## 🎉 You're All Set!

Once you:
1. ✅ Save your 3 project images in the `images/` folder
2. ✅ Run `./deploy.sh`

Your portfolio will be **live at**: `https://alvaromerinop.github.io/portfolio_personal/`

**Share your portfolio at:**
- LinkedIn: Add to your profile featured section
- GitHub: Pin the repository
- Resume: Link as "Portfolio Website"

Good luck! 🚀
