import { OptimizationDataSimulator } from "@/components/admin/optimization-data-simulator"
import { AdaptiveOptimizationDashboard } from "@/components/admin/adaptive-optimization-dashboard"

export default function AdaptiveOptimizationPage() {
  return (
    <div className="space-y-6">
      <OptimizationDataSimulator />
      <AdaptiveOptimizationDashboard />
    </div>
  )
}
