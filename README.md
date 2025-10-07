# Interactive Math Simulation Platform

An interactive web platform for exploring mathematics and science through real-time simulations with mathematical rendering capabilities. Built with Next.js and powered by PhET Interactive Simulations.

## Overview

The Interactive Math Simulation Platform provides an engaging way to learn and explore physics, mathematics, chemistry, and biology concepts through interactive visualizations. Users can add multiple simulations to their dashboard, create mathematical expressions using LaTeX syntax, and customize their learning experience.

## Features

- **Interactive Simulations**: Access a library of physics, math, chemistry, and biology simulations
- **Real-time Mathematical Rendering**: Create and edit mathematical expressions using LaTeX syntax with live preview
- **Simulation Dashboard**: Manage multiple simulations simultaneously with a customizable grid layout
- **Theme Support**: Light and dark mode with system preference detection
- **Accessibility**: Built with accessibility in mind, including skip-to-content navigation and ARIA labels
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **State Persistence**: Your simulations and expressions are saved locally

### Available Simulations

- **Physics**: Pendulum Lab, Projectile Motion, Wave Interference
- **Mathematics**: Graphing Lines, Area Builder, Fraction Matcher
- Additional simulations can be easily added through the simulation library

## Tech Stack

- **Framework**: [Next.js 15.2.4](https://nextjs.org/) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.9
- **State Management**: Redux Toolkit with React-Redux
- **Math Rendering**: KaTeX for LaTeX rendering
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Fonts**: Geist Sans and Geist Mono

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm (preferred) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/johaankjis/Interactive-Math-Simulation-Platform.git
cd Interactive-Math-Simulation-Platform
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
pnpm build
pnpm start
# or
npm run build
npm start
```

## Project Structure

```
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── simulation-library.tsx    # Simulation selection library
│   ├── simulation-dashboard.tsx  # Main dashboard view
│   ├── simulation-grid.tsx       # Grid layout for simulations
│   ├── simulation-card.tsx       # Individual simulation card
│   ├── math-editor.tsx           # LaTeX math editor
│   ├── math-renderer.tsx         # KaTeX renderer component
│   ├── header.tsx                # Application header
│   ├── providers/                # Context providers
│   └── ui/                       # Reusable UI components
├── lib/                     # Library code
│   ├── constants/           # Application constants
│   │   └── simulations.ts   # Simulation templates
│   ├── store/               # Redux store
│   │   ├── store.ts         # Store configuration
│   │   └── slices/          # Redux slices
│   ├── hooks/               # Custom React hooks
│   └── utils/               # Utility functions
├── public/                  # Static assets
└── styles/                  # Additional styles
```

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint

## Features in Detail

### Simulation Library

Browse and add simulations from categories including:
- Physics simulations (pendulum motion, projectile motion, waves)
- Math simulations (graphing, geometry, fractions)
- Chemistry and biology simulations (coming soon)

### Math Editor

- Create mathematical expressions using LaTeX syntax
- Real-time preview of rendered equations
- Quick examples for common mathematical expressions
- Support for complex mathematical notation (fractions, square roots, exponents, etc.)

### Dashboard Management

- Add multiple simulations to your workspace
- Rearrange simulations in a responsive grid
- Toggle sidebar and math editor panels
- Full-screen mode for individual simulations

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Accessibility

This platform is built with accessibility as a priority:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Skip-to-content link for screen readers
- Theme support for visual preferences

## License

This project is private and not currently licensed for public use.

## Acknowledgments

- PhET Interactive Simulations from the University of Colorado Boulder for simulation content
- Built with [v0](https://v0.dev) by Vercel
