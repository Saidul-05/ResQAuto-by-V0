import type React from "react"
import { MechanicSidebar, MobileMechanicSidebar } from "@/components/mechanic/sidebar"

export default function MechanicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <MechanicSidebar />
      </div>
      <main className="md:pl-72">
        <div className="flex items-center p-4 border-b">
          <MobileMechanicSidebar />
          <div className="flex w-full justify-end">
            <div className="flex items-center gap-x-2">{/* User profile dropdown could go here */}</div>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
