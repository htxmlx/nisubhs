import BottomNav from '@/components/BottomNav'
import Topbar from '@/components/TopNav'
import React, { type PropsWithChildren } from 'react'

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <div className="max-w-md mx-auto relative">
      <Topbar />
      {children}
      <BottomNav />
    </div>
  )
}
