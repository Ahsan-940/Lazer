# LaserCut.pk - Precision Laser Cutting Services

## Overview

LaserCut.pk is a full-stack web application for a Pakistan-based laser cutting business specializing in acrylic, MDF, wood, and metal cutting services. The platform features an interactive product configurator, quote system, and comprehensive product catalog for custom signboards, home décor, corporate gifts, and 3D LED displays.

The application serves customers in Islamabad and across Pakistan, offering a modern e-commerce experience with localized features including WhatsApp integration and streamlined quote requests.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing without React Router overhead
- Single-page application (SPA) architecture with static file serving in production

**UI Component System:**
- Shadcn/ui components built on Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Glass morphism design language with futuristic aesthetic (neon blue accents, dark theme)
- Responsive layouts supporting mobile-first design patterns

**State Management:**
- TanStack Query (React Query) for server state management, caching, and data synchronization
- Local component state with React hooks for UI interactions
- Form state handled by React Hook Form with Zod schema validation

**Design System:**
- Custom color palette: Neon blue primary (#00D9FF), black/white/metallic neutrals
- Typography: Modern sans-serif fonts (Inter, Poppins) via Google Fonts
- Spacing based on Tailwind's 4px unit system
- Theme provider supporting dark/light modes with localStorage persistence

**Key Features:**
- Interactive product configurator with real-time price calculation
- Multi-step forms with validation for orders and quote requests
- File upload support for custom designs (SVG, DXF, PDF formats)
- Responsive image galleries with category filtering
- Admin dashboard for managing products, materials, orders, and inquiries

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and RESTful API routing
- TypeScript for end-to-end type safety
- Custom middleware for JSON parsing, logging, and request tracking

**API Design:**
- RESTful endpoints organized by resource (products, materials, orders, inquiries, testimonials, contacts)
- CRUD operations for all primary entities
- Validation using Zod schemas shared between client and server
- JSON response format with consistent error handling

**Data Layer:**
- Storage abstraction interface (IStorage) defining all database operations
- In-memory implementation for development/prototyping
- Designed for future PostgreSQL integration via Drizzle ORM
- Schema-first approach with TypeScript types derived from Drizzle schema definitions

**Database Schema (Planned PostgreSQL):**
- **Products:** Catalog items with categories (home-decor, 3d-signs, corporate, gifts), base pricing, images
- **Materials:** Available cutting materials (Acrylic, MDF, Wood, Metal) with per-unit pricing and thickness options
- **Orders:** Customer orders with product configuration, material selection, dimensions, custom text, design files, status tracking
- **Inquiries:** Quote requests for custom projects
- **Testimonials:** Customer reviews with featured/non-featured flag
- **Contact Messages:** Customer support and inquiry messages
- **Users:** Admin authentication (planned)

**File Handling:**
- Design file uploads stored with URL references in database
- Support for vector formats: SVG, DXF, PDF

### Development & Build Pipeline

**Development Mode:**
- Vite dev server with HMR for instant client updates
- TSX execution for server-side TypeScript without compilation step
- Concurrent client/server development with single command
- Replit-specific plugins for runtime error overlay and development banners

**Production Build:**
- Vite builds optimized static assets to `dist/public`
- ESBuild bundles server code to `dist/index.js` as ESM
- Static file serving through Express in production
- Single deployment artifact containing both client and server

**Type Safety:**
- Shared schema definitions between client and server in `shared/` directory
- Path aliases (@, @shared, @assets) for clean imports
- Strict TypeScript configuration with no implicit any

### External Dependencies

**Core Libraries:**
- **@neondatabase/serverless:** PostgreSQL driver for Neon database (serverless-compatible)
- **drizzle-orm:** TypeScript ORM for database operations with type-safe queries
- **drizzle-kit:** Schema migrations and database push tooling
- **drizzle-zod:** Automatic Zod schema generation from Drizzle tables

**UI Framework:**
- **@radix-ui/*:** Accessible component primitives (20+ components: dialog, dropdown, select, tabs, toast, etc.)
- **@tanstack/react-query:** Server state management with caching and automatic refetching
- **react-hook-form:** Form state management with performance optimization
- **@hookform/resolvers:** Integration between React Hook Form and Zod validation

**Styling & Design:**
- **tailwindcss:** Utility-first CSS framework
- **class-variance-authority:** Type-safe variant styling for components
- **clsx & tailwind-merge:** Conditional className composition
- **lucide-react:** Icon library for consistent iconography
- **embla-carousel-react:** Touch-friendly carousel component

**Utilities:**
- **zod:** Runtime type validation and schema definitions
- **date-fns:** Date manipulation and formatting
- **wouter:** Lightweight routing alternative to React Router
- **nanoid:** Unique ID generation for client-side operations

**Development Tools:**
- **vite:** Frontend build tool and dev server
- **esbuild:** Fast JavaScript/TypeScript bundler for production server
- **tsx:** TypeScript execution for development
- **@replit/vite-plugin-*:** Replit-specific development enhancements

**Database & Sessions (Configured but not yet implemented):**
- **connect-pg-simple:** PostgreSQL session store for Express sessions
- PostgreSQL connection via DATABASE_URL environment variable
- Drizzle configuration pointing to `shared/schema.ts` with PostgreSQL dialect

**Third-Party Integrations:**
- **WhatsApp Business API:** Floating chat button linking to +92 321 7000586 with pre-filled message
- **Google Fonts:** Web font hosting for Inter, Poppins, and other typefaces
- **Neon Database:** Serverless PostgreSQL hosting (configured, to be provisioned)