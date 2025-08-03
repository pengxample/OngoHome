# ONGO E-commerce Website

## Overview

ONGO is a Swedish retail website built as a product showcase and store locator platform. The application serves as a digital storefront that inspires customers to visit physical stores rather than facilitating online purchases. It features product categories, campaigns, and a comprehensive store finder for locations from Göteborg to Sundsvall.

The application is built with modern web technologies including React, TypeScript, and Tailwind CSS for the frontend, Express.js for the backend API, and uses Drizzle ORM with PostgreSQL for data management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom CSS variables for brand colors (orange and green theme)
- **Animations**: Framer Motion for smooth page transitions and interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for categories, products, campaigns, and stores
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Development**: Hot reload with Vite integration in development mode

### Data Layer
- **ORM**: Drizzle ORM for type-safe database interactions
- **Database**: PostgreSQL with Neon serverless hosting
- **Schema**: Shared TypeScript schemas between frontend and backend
- **Validation**: Zod schemas for runtime type validation
- **Storage**: In-memory storage implementation for development with seeded data

### Key Features
- **Product Categories**: Garden, cleaning, kitchen, leisure, bathroom, and storage categories
- **Campaign System**: Special offers and promotions display
- **Store Locator**: Interactive store finder with city-based filtering
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **No E-commerce**: Intentionally excludes shopping cart and checkout functionality

### Project Structure
- `/client` - React frontend application with Vite build system
- `/server` - Express.js backend API
- `/shared` - Common TypeScript types and database schemas
- Component organization follows atomic design with `/components/ui` for reusable UI components

## External Dependencies

### Database & Backend Services
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **Drizzle Kit**: Database migration and schema management tools

### UI & Design System
- **Radix UI**: Headless UI primitives for accessibility and behavior
- **shadcn/ui**: Pre-built components following modern design patterns
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Consistent icon library for UI elements

### Development & Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind integration

### Additional Libraries
- **TanStack React Query**: Data fetching and caching layer
- **Wouter**: Lightweight routing solution
- **Framer Motion**: Animation library for enhanced user experience
- **React Hook Form**: Form management with validation
- **Date-fns**: Date manipulation utilities