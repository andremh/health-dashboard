# Health Dashboard

Personal Health Dashboard for André Moura Henriques - A comprehensive system that monitors health metrics, supplements, and wellness data.

## Features

- **Physical Tracking**: Visualize running and gym workouts with weekly volume dashboards
- **Supplement Tracking**: Track supplement intake (30g Protein, 3g Creatina) with visual indicators
- **Deep Work**: Monitor focus time vs recovery time with productivity scores
- **Mindset Logic**: Space for factual insights and emotional control monitoring
- **Health Metrics**: Real-time health indicators (HR, temperature, hydration, sleep)
- **Training Volume**: Weekly training load progression tracking

## Tech Stack

- **Frontend**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS with dark mode support
- **State Management**: TanStack Query for API caching and state management
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React

## Architecture

The application follows Clean Code principles and SOLID design patterns:

- Modular architecture allowing easy addition of new widgets/APIs
- Service layer abstraction for API communication
- Type-safe interfaces throughout the application
- Bento Grid layout for optimal information density
- Responsive design for all device sizes

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy environment variables: `cp .env.example .env.local`
4. Configure your API keys in `.env.local`
5. Run the development server: `npm run dev`

## Global Refresh

The dashboard includes a Global Refresh button that invalidates all cached queries and forces refetch of all API data, ensuring you always see the most up-to-date information.

## Environment Variables

The application requires several API keys for different services:

- Health APIs (Fitbit, Apple Health, etc.)
- Fitness APIs (Strava, MyFitnessPal, etc.)
- Productivity APIs (RescueTime, Notion, Todoist, etc.)
- Calendar APIs (Google Calendar, Outlook, etc.)

See `.env.example` for a complete list of required variables.

## Deployment

The application is configured for deployment on Vercel. Simply connect your repository to Vercel and it will automatically build and deploy the application.

## Customization

The modular architecture allows for easy customization:

- Add new widgets by creating components in `/components/widgets`
- Create new hooks in `/hooks` to fetch data
- Define new types in `/types` to ensure type safety
- Extend services in `/services` to integrate with new APIs