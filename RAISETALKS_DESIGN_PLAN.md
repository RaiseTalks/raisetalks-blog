# RaiseTalks.ai Design Implementation Plan for Docusaurus

## SOURCE OF CODE

`landing/RaiseTalks.ai – Streamlining due dilligence.html` and depenencies `landing/RaiseTalks.ai – Streamlining due dilligence_files` from the RaiseTalks.ai website has been used as the primary source for the design implementation. The design will be adapted to fit the Docusaurus framework, focusing on a blog-centric layout.

## Design System Analysis

### Color Palette

- **Primary Blue**: `#0174e1` (main brand color)
- **Black**: `#000000` (primary text)
- **White**: `#ffffff` (background/contrast text)
- **Gradients**: Multiple gradients for sections (blue-purple, light-dark variations)

### Typography

- **Primary Font**: Poppins (headings, navigation)
- **Secondary Font**: Raleway (body text)
- **Font Weights**: 500 (medium), 600 (semibold), 700 (bold)
- **Font Sizes**:
  - Hero title: 50px
  - Section headers: 36px
  - Body text: 14-16px
  - Navigation: 14px

### Layout Components

1. **Fixed Header Navigation**

   - Logo on left
   - Navigation links with hover underline animation
   - "Contact us" CTA button
   - Mobile hamburger menu

2. **Hero Section**

   - Gradient background
   - Centered content
   - Tagline + main heading
   - CTA buttons with hover effects

3. **Statistics Grid**

   - 4-column layout (80%, 30%, 100+, etc.)
   - Title + description format
   - Responsive grid

4. **Feature Sections**

   - Alternating layouts
   - Motion effects on scroll
   - Image overlays with parallax

5. **Pricing Cards**
   - 3-tier structure
   - Gradient headers
   - Special pricing callouts
   - Feature lists

## Implementation Steps

### Phase 1: Core Structure Setup

1. Remove all documentation-related components
2. Update navigation to blog-only
3. Configure Docusaurus theme colors
4. Install required fonts (Poppins, Raleway)

### Phase 2: Custom Components

1. **Header Component**

   ```tsx
   - Fixed positioning
   - Logo + navigation links
   - Hover animations for links
   - Mobile responsive menu
   ```

2. **Hero Component**

   ```tsx
   - Gradient background
   - Typography hierarchy
   - CTA buttons with transform effects
   ```

3. **StatsGrid Component**

   ```tsx
   - Responsive grid layout
   - Number animations
   - Icon integration
   ```

4. **FeatureSection Component**
   ```tsx
   - Flexible layout (image left/right)
   - Motion effects
   - Content blocks
   ```

### Phase 3: Styling Implementation

1. **Global Styles**

   ```css
   - CSS variables for colors
   - Font imports
   - Base typography
   - Container widths
   ```

2. **Animation Effects**

   ```css
   - Hover underline for links
   - Button transform on hover
   - Scroll-based animations
   - Gradient transitions
   ```

3. **Responsive Design**
   ```css
   - Mobile-first approach
   - Breakpoints: 768px, 1024px, 1200px
   - Hidden elements per device
   ```

### Phase 4: Blog Integration

1. Customize blog post layout
2. Add author profiles with images
3. Implement tag system
4. Create blog listing page with cards

### Phase 5: SEO & Performance

1. Add structured data
2. Optimize images (WebP format)
3. Implement lazy loading
4. Configure meta tags

## Technical Requirements

### Dependencies to Add

```json
{
  "@fontsource/poppins": "^5.0.0",
  "@fontsource/raleway": "^5.0.0",
  "framer-motion": "^11.0.0",
  "react-intersection-observer": "^9.5.0"
}
```

### File Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── index.tsx
│   │   └── styles.module.css
│   ├── Hero/
│   │   ├── index.tsx
│   │   └── styles.module.css
│   ├── StatsGrid/
│   │   ├── index.tsx
│   │   └── styles.module.css
│   └── FeatureSection/
│       ├── index.tsx
│       └── styles.module.css
├── css/
│   ├── custom.css (global styles)
│   └── animations.css
└── pages/
    └── index.tsx (custom homepage)
```

### CSS Variables

```css
:root {
  --raise-primary: #0174e1;
  --raise-black: #000000;
  --raise-white: #ffffff;
  --raise-gradient-1: linear-gradient(135deg, #0174e1 0%, #9b51e0 100%);
  --raise-gradient-2: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
  --font-poppins: "Poppins", sans-serif;
  --font-raleway: "Raleway", sans-serif;
}
```

## Migration Checklist

- [ ] Backup current site
- [ ] Remove docs plugin configuration
- [ ] Update docusaurus.config.ts
- [ ] Install font packages
- [ ] Create custom components
- [ ] Implement global styles
- [ ] Build custom homepage
- [ ] Configure blog settings
- [ ] Add SEO optimizations
- [ ] Test responsive design
- [ ] Set up GitHub Actions
- [ ] Deploy to GitHub Pages

## Notes

- The design uses Elementor classes which need to be converted to React/CSS modules
- Motion effects should be implemented with Framer Motion for better performance
- Gradient backgrounds can be applied via CSS or inline styles
- The fixed header requires special handling in Docusaurus theme
