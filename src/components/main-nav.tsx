"use client"

import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const path = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold text-xl">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-5">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  href={item.href}
                  key={index}
                  className={cn(
                    "flex items-center text-sm font-large text-gray-800 dark:text-gray-200",
                    { "dark:text-gray-700": path === item.href },
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  <Button
                    variant={path === item.href ? "currentPage" : "outline"}
                  >
                    {item.title}
                  </Button>
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
