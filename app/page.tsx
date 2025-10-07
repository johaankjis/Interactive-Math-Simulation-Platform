import { SimulationDashboard } from "@/components/simulation-dashboard"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1" role="main">
        <SimulationDashboard />
      </main>
    </div>
  )
}
