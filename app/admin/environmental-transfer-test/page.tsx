import { EnvironmentalTransferTester } from "@/components/emergency/environmental-transfer-tester"

export default function EnvironmentalTransferTestPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Environmental Transfer Testing</h1>
          <p className="text-muted-foreground">
            Test how weather and coverage conditions affect transfer learning efficiency in emergency scenarios
          </p>
        </div>

        <EnvironmentalTransferTester />
      </div>
    </div>
  )
}
