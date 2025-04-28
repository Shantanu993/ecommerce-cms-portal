"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Tags, Users, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: Tags,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
]

interface CMSSidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function CMSSidebar({ isOpen, setIsOpen }: CMSSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">E-commerce CMS</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="space-y-1 px-3">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
