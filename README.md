# Portfolio

A Vite-powered personal portfolio showcasing key projects, services, and testimonials on a single-page experience. The site blends Bootstrap 5 styling with custom animations, dynamic background media, and Swiper.js carousels to create an interactive presentation.

- Single-page layout with quick navigation between `home`, `about`, `quality`, `skills`, `services`, `portfolio`, `reviews`, and `contact` sections.
- Background stills load instantly from `public/assets/images/backgrounds/backgrounds.json`, and matching videos fade in once buffered, with optional parallax for desktop visitors.
- Swiper.js sliders highlight portfolio work and client reviews, adapting automatically to varying screen widths.
- Staged background loader shows the paired still immediately and fades in the video once buffered, keeping the first paint fast.
- Bootstrap bundle is imported locally so data attributes (e.g. tooltips, dropdowns) work without additional setup.

## About Priyanshu Sah

Hi, I'm Priyanshu Sah an AI/ML engineer and full-stack developer focused on shipping production-ready machine learning systems, cloud-native applications, and end-to-end product experiences. My work spans data science research, model deployment, React + Node.js development, and MLOps automation.

### Core Expertise

- Designing intelligent products with Python, TensorFlow, PyTorch, and scikit-learn.
- Building full-stack web apps with React, Node.js, Express, and TypeScript.
- Automating data pipelines, CI/CD, and containerized workloads across AWS, Azure, and GCP.
- Translating business goals into measurable ML metrics, dashboards, and user-facing experiences.

### What You'll Find Here

- Featured AI/ML case studies and engineering projects.
- Skills matrix covering machine learning, data engineering, and full-stack development.
- Services section outlining consulting, prototyping, and deployment capabilities.
- Contact routes for collaborations, speaking opportunities, and mentorship.

> SEO keywords intentionally woven throughout this README include: *AI engineer*, *machine learning engineer*, *data scientist*, *MLOps specialist*, *full-stack developer*, *cloud architect*, and *Priyanshu Sah portfolio*.



## Getting Started

### Prerequisites

- Node.js 18 or newer (required by Vite 5).
- npm (bundled with Node) or a compatible package manager.

### Installation

```bash
npm install
```

### Useful Scripts

```bash
npm run dev      # Start the local development server on http://localhost:5173
npm run build    # Generate a production build in the dist/ directory
npm run preview  # Preview the production build locally
```

If you need to test from another device on your network, run `npm run dev -- --host`.

## Project Structure

```
.
public/
  assets/                      # Media assets (images, videos, etc.)
  favicons/                    # Site favicons
  fonts/                       # Custom font assets
src/
  components/                  # Reusable UI components (LofiPlayer, Cube, etc.)
  pages/                       # Page-level components (Home, About, etc.)
  styles/                      # CSS modules and global styles
  App.jsx                      # Main application shell and layout
  main.jsx                     # React entry point
  router.jsx                   # React Router configuration
  AnimatedOutlet.jsx           # Page transition logic
index.html                     # HTML shell
vite.config.js                 # Vite configuration
tailwind.config.js             # Tailwind CSS configuration
```

## Background Media

- Update `public/assets/images/backgrounds/backgrounds.json` to control which media files are considered for rotation.
- Each entry can be either a simple string (image-only background) or an object with `image` and `video` keys pointing to files in `public/assets/images/backgrounds/` and `public/assets/videos/backgrounds/`, respectively.
- Videos fade in after their paired still image is shown, so initial page load stays responsive while motion assets buffer in the background.
- Assets are selected at random on page load, avoiding repeats between sessions when possible thanks to localStorage caching.

## Customization Tips

- Edit page content and layouts in `src/pages/`.
- Create or modify reusable UI elements in `src/components/`.
- Styling is handled via Tailwind CSS and CSS modules in `src/styles/`.
- Configure routes and navigation in `src/router.jsx`.

## SEO Assets

- `public/robots.txt` allows major crawlers to index every section and advertises the sitemap endpoint.
- `public/sitemap.xml` lists the canonical portfolio URL (`https://priyanshusah.com/`) to help search engines discover updates quickly.
- `index.html` head metadata includes canonical, Open Graph, Twitter, and Schema.org Person tags tailored to AI/ML and full-stack keywords.

## URL Shortener & Aggregator

- Friendly slugs such as `/linkedin`, `/github`, `/mail`, `/codolio`, `/resume-global`, `/twitch`, `/spotify`, `/steam`, and `/discord` route through the portfolio, so a single change updates both the site UI and external share links.
- Each slug maps to a static redirect in `public/<slug>/index.html`, making the portfolio double as a lightweight URL shortener without server-side code.
- `index.html` references those slugs for social icons, ensuring outbound links remain consistent even if destination URLs change later.

## Deployment

1. Run `npm run build`.
2. Deploy the generated `dist/` folder to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).
3. Ensure `public/assets/` is copied alongside the build output so media and manifest files resolve correctly.

Feel free to adapt the content, color palette, or assets to tailor the portfolio for your own brand.

### Links
- [Production](https://priyanshusah.com) - Vercel
- [Dev](https://dev.priyanshusah.com/) - Vercel
## Credits

- Inspiration: [James Oliver Portfolio](https://james-oliver-portfolio.netlify.app/)
- Backgrounds: Video backgrounds sourced from the Steam Wallpaper Engine Workshop — credit to the original artists.
- Music: credits to the original artists.

## Roadmap

### Issue
* [x]  **Cut off Content behind with some padded margin  navbar/social/muisc/theme controll** [img](https://github.com/user-attachments/assets/27d99522-c8b0-47eb-8adc-2c96abda861e)
* [x]  There is wierd boxing on choosing some of the options on ios probably due to interaction of on click and the active highlights , [New Img after fix](https://github.com/user-attachments/assets/fdaf1108-1af2-4aa7-91cf-a3b632f2264c) Proposed Fix : Hide (black/white cursor glow on Mobile)
* [x]  Even spacing Between Appearance and top/ bottom button's , Replace pallet button with dark/kight mode toggle button [img](https://github.com/user-attachments/assets/ca2f3c8d-801c-44b2-a1e6-1a38a3739be3)
* [x]  Name to "Theme Controlls" , Remove the menu icon [img](https://github.com/user-attachments/assets/a08c5711-a557-46cf-b357-c099605a04d5)
* [x]  Same rounded rectangle box and light animation as music player [img](https://github.com/user-attachments/assets/20545184-db4d-4ca2-933b-45d4151e620a)
* [x]  Music Player Animation is outside the border , noise filter strangely missing from edges , keep the animation on the border within box same as navbar [img](https://github.com/user-attachments/assets/76bae42f-6e2d-402b-bf57-0ac7e7f98476)
* [x]  Simple Hover Effect around Border for portfolio card [](https://github.com/user-attachments/assets/583fdb43-4f87-4a9b-877f-446683791978)
* [x]  Replace the White Highlight effect in dark mode for Music player Volume controll on Selected
* [x]  Redirect fallback page Ui & Vercel side integration logic [img](https://github.com/user-attachments/assets/6597592f-e008-499d-a60d-2e71ad3c1eb2)


### Feature
* [x] All Done (:
