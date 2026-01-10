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
- [Production](https://priyanshusah.com) - Github Pages

## Credits

- Inspiration: [James Oliver Portfolio](https://james-oliver-portfolio.netlify.app/)
- Backgrounds: Video backgrounds sourced from the Steam Wallpaper Engine Workshop — credit to the original artists.
- Music: credits to the original artists.

## Roadmap

### Bugs
* [ ]  There is wierd boxing on choosing some of the options on ios probably due to interaction of on click and the actoive highlights , Nav bar one Line Stuck on IOS due to CSS switch to JS . [img](https://github.com/user-attachments/assets/fe425dcd-648b-47dc-a99b-94f57eafa22e")
* [ ]  Clean up Color Pallet to use Shades of white , black , grey only and withgradient blue + purple as Highlighter
* [x]  Hide Music player in Socials Tab
* [ ]  Blue Highlight collour , might need to use same as nav bar , grey on out of focus and white on focus , With Gradient svg bheind on Hover / selected [img](https://github.com/user-attachments/assets/23f880a2-8115-4342-bbfd-0216a215ea80)
* [x]  Enlarge and Strengthen Gradeient effect of hover Both in Product card and Journey Card [img](https://github.com/user-attachments/assets/62bcfdec-99b7-4362-b60e-36c7413fb6a5) , [img](https://github.com/user-attachments/assets/d0e6821c-5026-45e7-9e6d-5ea895f01426)
* [ ]  Option to Expand on click Image [img](https://github.com/user-attachments/assets/20f038cc-3e94-4188-b06e-7c26ccee9f43)
* [ ]  Tech stack has different black compared to normal card for Background [img](https://github.com/user-attachments/assets/13e88252-2680-4a04-b068-84566c2f2958) , The Text color is too dark use lighter shade of grey (eg Skill section bar)
* [ ]  The Loop isn't Seamless , towards the end we see empty cubes , [img](https://github.com/user-attachments/assets/e0443895-5ed6-44fe-a5c2-410025f2b44e)
* [ ]  In Portfolio card limit Hover rotation to diferent face to bottom left+right Corner , Use "back" button on Tech stack / Image face , "view Details" Need to be smaller button , Remove arrow from "view Details" / "Back"   ,,, **Experiment with keeping the Image Face as Main face and Merging Tech stack + Description into single Face , with option to click and view in more detail. [img](https://github.com/user-attachments/assets/c3d4d8c8-0675-4e2f-86f3-b21f6b14d12d)

### Feature
* [ ] **Add scrolling feed** for blog and LinkedIn posts; link posts directly to the website (not GitHub).
* [ ] **Add “Wallpaper Selector”** on left similar to Music Player , Use apropriate wallpper version based on dark / light mode
* [ ] **Implement Dark/Light mode** on left similar to Music Player for user preference based on system mode.
* [ ] **Improve fallback and redirect handling** for invalid routes or offline states(Optional / use server side Redirect).





