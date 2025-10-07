export interface SimulationTemplate {
  id: string
  title: string
  description: string
  category: "physics" | "math" | "chemistry" | "biology"
  url: string
  thumbnail: string
  defaultParameters: Record<string, number | string>
}

export const SIMULATION_TEMPLATES: SimulationTemplate[] = [
  {
    id: "pendulum-lab",
    title: "Pendulum Lab",
    description: "Explore the motion of pendulums and discover the factors that affect their period.",
    category: "physics",
    url: "https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_en.html",
    thumbnail: "/pendulum-physics-simulation.jpg",
    defaultParameters: {
      length: 1.0,
      mass: 1.0,
      gravity: 9.8,
      friction: 0.0,
    },
  },
  {
    id: "projectile-motion",
    title: "Projectile Motion",
    description: "Blast a car out of a cannon and explore projectile motion concepts.",
    category: "physics",
    url: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html",
    thumbnail: "/projectile-motion-physics.jpg",
    defaultParameters: {
      angle: 45,
      initialSpeed: 20,
      mass: 5,
      diameter: 0.5,
    },
  },
  {
    id: "graphing-lines",
    title: "Graphing Lines",
    description: "Explore the relationship between slope and intercept in linear equations.",
    category: "math",
    url: "https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_en.html",
    thumbnail: "/graphing-linear-equations-math.jpg",
    defaultParameters: {
      slope: 1,
      intercept: 0,
    },
  },
  {
    id: "area-builder",
    title: "Area Builder",
    description: "Build shapes and explore the relationship between perimeter and area.",
    category: "math",
    url: "https://phet.colorado.edu/sims/html/area-builder/latest/area-builder_en.html",
    thumbnail: "/area-geometry-shapes-math.jpg",
    defaultParameters: {},
  },
  {
    id: "wave-interference",
    title: "Wave Interference",
    description: "Make waves with a dripping faucet, audio speaker, or laser.",
    category: "physics",
    url: "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_en.html",
    thumbnail: "/wave-interference-physics.jpg",
    defaultParameters: {
      frequency: 1.0,
      amplitude: 1.0,
    },
  },
  {
    id: "fraction-matcher",
    title: "Fraction Matcher",
    description: "Match shapes and numbers to earn stars in this fractions game.",
    category: "math",
    url: "https://phet.colorado.edu/sims/html/fraction-matcher/latest/fraction-matcher_en.html",
    thumbnail: "/fractions-math-game.jpg",
    defaultParameters: {},
  },
]
