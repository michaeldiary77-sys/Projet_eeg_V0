'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/eeg/layout/Sidebar'
import EegContentArea from '@/components/eeg/layout/EegContentArea'

export default function EegRouteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isPlanningRoute =
    pathname === '/eeg/planning' || pathname.startsWith('/eeg/planning/')

  if (isPlanningRoute) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <EegContentArea>{children}</EegContentArea>
    </div>
  )
}
