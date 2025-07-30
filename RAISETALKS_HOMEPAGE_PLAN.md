# RaiseTalks.ai Homepage Implementation Plan

## Overview
This plan outlines how to implement the RaiseTalks.ai landing page design as the homepage for the Docusaurus blog, with blog posts moved to `/blog`.

## Key Design Elements from Landing Page Analysis

### 1. Header/Navigation
- Fixed header with white background
- Logo on the left (RaiseTalks-logo-long.svg)
- Navigation items with hover effects
- "Contact us" button on the right
- Mobile menu icon

### 2. Hero Section
- Gradient background: `linear-gradient(135deg, rgba(6, 147, 227, 1) 0%, rgb(155, 81, 224) 100%)`
- Main tagline: "STREAMLINING DUE DILIGENCE"
- Subtitle: "AI Assistant Providing Personalised Guidance on Data Rooms"
- "Join waiting list" button
- White text on gradient background

### 3. Statistics/Challenges Section
- Grid layout with statistics:
  - 80% of startups are undervalued
  - 30% of promising startups stop operating
  - 100+ pitch decks viewed by investors weekly
- Each stat has a large number and descriptive text
- Cards with subtle shadows

### 4. Quote Section
- Background color: #f8f9fa or similar light gray
- Image of Dasha (Dasha-quote-1-1024x1024.webp)
- Quote text with emphasis on "CONVERSATION"
- Attribution to Dariia Vasylieva

### 5. AI Journey Section
- Gradient background (same as hero)
- Chat interface mockup images
- Motion effects on scroll
- "Join closed beta" button

### 6. Roadmap Section
- Timeline layout for Q1-Q4 2025
- Cards with gradient headers
- Parallax scrolling effects
- Each quarter has specific milestones

### 7. Pricing Section
- Three pricing tiers: Starter ($1), Enhance ($499), Growth ($999)
- Cards with gradient headers matching brand colors
- Feature lists for each tier
- "Not Available" buttons for beta tiers

### 8. Footer
- Dark background (#1a1a1a)
- Multi-column layout
- Social links and contact info

## Implementation Steps

### Step 1: Update Docusaurus Configuration
```typescript
// Move blog to /blog route instead of root
blog: {
  routeBasePath: '/blog', // Change from '/' to '/blog'
  // ... other blog settings
}
```

### Step 2: Create Homepage Structure
```
src/
  pages/
    index.tsx (custom homepage)
  components/
    HomepageHero/
    HomepageStats/
    HomepageQuote/
    HomepageJourney/
    HomepageRoadmap/
    HomepagePricing/
  css/
    homepage.module.css
```

### Step 3: Copy Assets
Move all necessary assets from landing folder:
- Logos and SVGs
- Images (webp files)
- Icons

### Step 4: Component Implementation Priority
1. Hero Section (most impactful)
2. Statistics Section
3. Pricing Section
4. Roadmap Section
5. Quote Section
6. Journey Section

### Step 5: Styling Approach
- Use CSS modules for component-specific styles
- Implement gradient backgrounds using CSS variables
- Add motion effects with CSS transforms
- Ensure responsive design for all breakpoints

### Step 6: Navigation Updates
- Update navbar items to match landing page
- Add smooth scrolling for anchor links
- Implement mobile menu functionality

## CSS Variables to Add
```css
:root {
  --raisetalks-gradient: linear-gradient(135deg, rgba(6, 147, 227, 1) 0%, rgb(155, 81, 224) 100%);
  --raisetalks-dark-bg: #1a1a1a;
  --raisetalks-light-bg: #f8f9fa;
  --raisetalks-card-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  --raisetalks-hero-text: #ffffff;
}
```

## Motion Effects
- Parallax scrolling for roadmap cards
- Fade-in animations for sections
- Hover transforms for buttons and cards
- Smooth transitions throughout

## Responsive Breakpoints
- Desktop: > 996px
- Tablet: 768px - 996px
- Mobile: < 768px

## Testing Checklist
- [ ] Homepage loads at root URL
- [ ] Blog accessible at /blog
- [ ] All images load correctly
- [ ] Gradients display properly
- [ ] Motion effects work smoothly
- [ ] Mobile responsive design works
- [ ] Navigation links function
- [ ] Forms/buttons have proper actions