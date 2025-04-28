"use client"

import type React from "react"
import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { CMSSidebar } from "@/components/cms-sidebar"
import { CMSHeader } from "@/components/cms-header"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen">
        <CMSSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "md:ml-64" : ""}`}>
          <CMSHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
