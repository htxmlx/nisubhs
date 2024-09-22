'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Home, Map, PlusSquare, User2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/profile', label: 'Profile', icon: User2Icon },
  { href: '/create', label: 'Create', icon: PlusSquare },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-background border-t border-border">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href
          const isCreateButton = item.label === 'Create'
          return (
            <Button
              key={index}
              asChild
              variant="ghost"
              className={cn(
                'flex-1 flex-col h-full rounded-none',
                isActive && 'bg-muted',
                isCreateButton &&
                  'relative flex items-center justify-center w-14 h-20 bg-gradient-to-br from-teal-400 to-pink-500 rounded-full  shadow-lg glow' // Gradient styling for Create button
              )}
            >
              <Link href={item.href}>
                <item.icon
                  className={cn(isCreateButton ? 'size-7' : 'size-5')}
                />

                {isCreateButton && ( // Hide label for Create button
                  <span className="sr-only">Create</span>
                )}
                {!isCreateButton && (
                  <span
                    className={cn(
                      'text-xs mt-1',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}

// CSS for the glow effect
;<style jsx>{`
  .glow {
    box-shadow: 0 0 5px rgba(20, 184, 166, 0.7),
      0 0 10px rgba(20, 184, 166, 0.5);
    transition: box-shadow 0.3s ease-in-out;
  }

  .glow:hover {
    box-shadow: 0 0 15px rgba(20, 184, 166, 0.9),
      0 0 20px rgba(20, 184, 166, 0.7);
  }
`}</style>
