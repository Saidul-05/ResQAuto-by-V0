import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ServiceRequestButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  detailed?: boolean
}

export function ServiceRequestButton({
  variant = "default",
  size = "default",
  className = "",
  detailed = false,
}: ServiceRequestButtonProps) {
  return (
    <Link href={detailed ? "/service-request-detailed" : "/service-request"}>
      <Button variant={variant} size={size} className={className}>
        {detailed ? "Request Detailed Service" : "Request Service"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  )
}
