import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </div>
  )
}
