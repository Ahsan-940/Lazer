# LaserCut.pk Design Guidelines

## Design Approach
**Reference-Based Approach:** Inspired by Signomatic.com's professional industrial aesthetic, adapted for a futuristic, premium Pakistani laser cutting business. The design should convey precision engineering with modern, tech-forward visual language.

## Design Principles
- **Futuristic & Glassy:** Premium glass morphism effects with subtle transparency, backdrop blurs, and reflective surfaces
- **Precision-Focused:** Clean, geometric layouts that mirror laser-cutting precision
- **Trust & Professionalism:** High-quality imagery, testimonials, and clear service communication
- **Localized Experience:** Pakistan-centric with WhatsApp integration, local payment methods, and bilingual support

## Color System
- **Primary:** Neon Blue (#00D9FF or similar electric blue)
- **Neutrals:** Black (#000000), White (#FFFFFF), Metallic Silver (#C0C0C0, #E8E8E8)
- **Backgrounds:** Dark gradients (black to dark gray), glass morphism overlays with 10-20% opacity
- **Accents:** Neon blue for CTAs, highlights, and interactive elements
- **Text:** White on dark backgrounds, dark gray (#1F1F1F) on light sections

## Typography
- **Font Family:** Inter, Poppins, or similar modern sans-serif via Google Fonts
- **Hierarchy:**
  - Hero Headlines: 3xl to 6xl, font-weight: 700-800, letter-spacing: tight
  - Section Titles: 2xl to 4xl, font-weight: 600-700
  - Body Text: base to lg, font-weight: 400-500, line-height: relaxed
  - UI Elements: sm to base, font-weight: 500-600

## Layout System
- **Spacing Units:** Tailwind spacing of 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm
- **Container:** max-w-7xl for standard content, full-width for hero and immersive sections
- **Grid Patterns:** 
  - Service tiles: 2-column on tablet, 4-column on desktop
  - Product gallery: 2-column mobile, 3-column tablet, 4-column desktop
  - Feature sections: Alternating 2-column layouts with image/text splits

## Component Library

### Navigation
- Sticky header with glass morphism (backdrop-blur, bg-black/80)
- Logo left, navigation center, CTA buttons right
- Mobile: Hamburger menu with slide-in drawer
- Include: Home, Products, Configurator, Gallery, About, Contact
- Highlight "Get Quote" and "Upload Design" CTAs in neon blue

### Hero Section
- Full-viewport height with background video of laser cutting (looping, muted, autoplay)
- Dark overlay (bg-black/40) for text readability
- Large headline: "Precision Crafted. Laser Perfected."
- Subheadline describing services
- Two prominent CTAs with blurred backgrounds: "Get Instant Quote" (primary blue), "Upload Your Design" (secondary white outline)
- Subtle scroll indicator at bottom

### Service Tiles
- Glass morphism cards with backdrop-blur
- Icon at top, service name, brief description
- Hover: Lift effect with neon blue border glow
- Grid: 4 tiles (Acrylic Cutting, 3D Signboards, Décor, Custom Gifts)

### Product Configurator
- Multi-step wizard with progress indicator (6 steps)
- Left panel: Configuration options with dropdowns, file upload, inputs
- Right panel: Live 3D-like preview with price calculation display
- Glass morphism panels, smooth transitions between steps
- "Add to Cart" and "Request Custom Quote" buttons at final step

### Product Gallery
- Masonry or grid layout with filter pills at top
- Product cards: Image, title, material tag, size, price range
- Hover: Scale up slightly, show "Order Now" overlay button
- Categories: Home Décor, 3D Signs, Corporate, Gifts

### Testimonials Slider
- Horizontal auto-scrolling carousel
- Cards with customer photo, quote, name, rating stars
- Glass morphism background, subtle shadow

### Forms (Upload & Quote, Contact)
- Clean, spacious inputs with neon blue focus states
- File upload: Drag-and-drop area with accepted formats (.SVG, .DXF, .PDF)
- Labels above inputs, helper text below
- Submit button: Large, neon blue, with loading state

### Footer
- 3-4 column layout: Quick Links, Services, Contact Info, Social
- Dark background (bg-black), white text
- Social icons in neon blue on hover
- SEO-rich text at bottom with legal links
- Copyright © 2025 LaserCut.pk

### Admin Dashboard
- Dark mode default with light mode toggle
- Sidebar navigation with icons
- Data tables for orders, products, inquiries
- Inline editing capability for page content
- Analytics charts with neon blue accent colors

## Images
- **Hero Background Video:** Laser cutting machine in action (looping, 15-30 seconds)
- **Service Tiles:** Icon-based, no photos needed
- **Product Gallery:** High-quality photos of finished products (signboards, nameplates, décor items, gifts)
- **About Us:** Workshop photos showing laser cutting machines and team
- **Testimonials:** Customer headshots (circular crops)
- **Contact Page:** Google Maps embed of Islamabad location

## Interactions & Animations
- **Minimal & Purposeful:** Avoid distracting animations
- **Scroll Animations:** Subtle fade-in on scroll for sections (use Intersection Observer)
- **Hover States:** Gentle lift (translateY), glow effects on cards
- **Loading States:** Skeleton loaders for product grid, spinner for form submissions
- **Page Transitions:** Smooth fade between routes
- **Configurator Preview:** Real-time updates with 300ms debounce

## Floating Elements
- **WhatsApp Button:** Fixed bottom-right, circular green button with chat icon, always visible
- **Scroll to Top:** Appears after scrolling 50vh, neon blue circular button

## Responsive Breakpoints
- **Mobile:** < 768px - Single column, stacked layouts, full-width CTAs
- **Tablet:** 768px - 1024px - 2-column grids, adjusted spacing
- **Desktop:** > 1024px - Multi-column layouts, expanded navigation, larger hero text

## Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states with neon blue outline
- Alt text for all images
- Form validation with clear error messages
- Color contrast ratios meeting WCAG AA standards

## Special Features
- **Multi-language Toggle:** EN/UR switcher in header
- **WhatsApp Integration:** Direct "Order via WhatsApp" buttons on products
- **Payment Methods Display:** JazzCash, EasyPaisa, Bank Transfer icons in footer
- **Live Preview:** 3D-like product visualization in configurator using CSS transforms or Three.js placeholder