# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a RaiseTalks blog built with Docusaurus v3, focused on content about AI-powered fundraising and startup growth. The blog is optimized for SEO and LLM discoverability, with automatic GitHub Pages deployment.

## Development Commands

### Core Commands

- **Start development server**: `yarn start` (runs on port 3005)
- **Build site**: `yarn build`
- **Type checking**: `yarn typecheck`
- **Serve production build**: `yarn serve`
- **Deploy to GitHub Pages**: `yarn deploy` (requires GitHub Pages configuration)

### Content Management

- **Create new blog post**: Add `.md` or `.mdx` file to `/blog/` directory
- **Clear cache**: `yarn clear`

## Architecture & Key Implementation Notes

### 1. Blog-Focused Structure (Documentation Hidden)

- Main content in `/blog/` directory
- Documentation sections removed from navigation
- Homepage redesigned as blog landing with RaiseTalks branding
- No `/docs/` routes exposed in production

### 2. SEO & LLM Optimization

- Structured data (JSON-LD) for blog posts
- OpenGraph and Twitter Card meta tags
- Semantic HTML with proper heading hierarchy
- XML sitemap generation enabled
- robots.txt configured for optimal crawling
- Content optimized with:
  - Clear, descriptive titles
  - Meta descriptions
  - Alt text for images
  - Proper URL structure

### 3. Design System (Based on landing/index.html)

- **Colors**:
  - Primary: #0174e1
  - Text: #000000 (primary), #ffffff (on dark backgrounds)
  - Gradients used for hero sections
- **Typography**: Poppins and Raleway fonts
- **Components**:
  - Fixed header with hover animations
  - Gradient backgrounds
  - Motion effects on scroll
  - Responsive design with mobile menu

### 4. GitHub Pages Deployment

- Automated via GitHub Actions workflow
- Deploys on push to main branch
- Build artifacts served from gh-pages branch
- Custom domain configuration supported

### 5. Blog Post Template

Located at `/blog/_template.md` with:

- Front matter for SEO
- Author attribution
- Tags and categories
- Reading time estimation
- Social sharing metadata

## Key Files & Directories

### Configuration

- `docusaurus.config.ts`: Main site configuration, blog settings, theme options
- `package.json`: Dependencies and scripts
- `.github/workflows/deploy.yml`: GitHub Pages deployment automation

### Content

- `/blog/`: All blog posts and assets
- `/blog/authors.yml`: Author profiles
- `/blog/tags.yml`: Tag definitions
- `/static/img/`: Blog images and assets

### Theme & Styling

- `/src/css/custom.css`: Custom styles matching RaiseTalks design
- `/src/components/`: Custom React components
- `/src/pages/index.tsx`: Custom homepage

## Content Manager Guide

### Creating a New Blog Post

1. Copy the template: `cp blog/_template.md blog/YYYY-MM-DD-your-post-title.md`
2. Fill in the front matter:
   ```yaml
   ---
   slug: your-post-url-slug
   title: Your Post Title
   authors: [author_id]
   tags: [fundraising, ai, startups]
   description: A brief description for SEO (150-160 chars)
   image: /img/your-post-image.jpg
   keywords: [keyword1, keyword2, keyword3]
   ---
   ```
3. Write content using Markdown
4. Add images to `/static/img/blog/`
5. Preview with `yarn start`
6. Commit and push to trigger deployment

### SEO Best Practices

- Use descriptive, keyword-rich titles (50-60 chars)
- Write compelling meta descriptions
- Include relevant keywords naturally
- Use proper heading hierarchy (H1 → H2 → H3)
- Add alt text to all images
- Internal linking to related posts

## Technical Considerations

### Performance

- Images optimized and lazy-loaded
- CSS and JS bundled and minified
- Static site generation for fast loading
- CDN-friendly asset structure

### Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement approach
- Fallbacks for older browsers
