'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  CircleHelp,
  Computer,
  Home,
  Map,
  PlusSquare,
  Search,
  User,
  User2Icon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/create', label: 'Create', icon: PlusSquare },
  { href: '/profile', label: 'Profile', icon: User2Icon },
  { href: '/admin', label: 'Admin', icon: CircleHelp },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-background border-t border-border">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Button
              key={index}
              asChild
              variant="ghost"
              className={cn(
                'flex-1 flex-col h-full rounded-none',
                isActive && 'bg-muted'
              )}
            >
              <Link href={item.href}>
                <item.icon
                  className={cn(
                    'h-5 w-5',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
                <span
                  className={cn(
                    'text-xs mt-1',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
