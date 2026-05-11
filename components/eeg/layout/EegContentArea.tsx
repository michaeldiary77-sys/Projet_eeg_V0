'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Topbar from '@/components/eeg/layout/Topbar'

export default function EegContentArea({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isPlanningRoute =
    pathname === '/eeg/planning' || pathname.startsWith('/eeg/planning/')

  return (
    <div className="flex flex-col flex-1 ml-64">
      {!isPlanningRoute ? <Topbar /> : null}
      <main
        className={
          isPlanningRoute
            ? 'flex-1 overflow-auto bg-gray-50 p-0'
            : 'flex-1 overflow-auto mt-16 p-8 bg-gray-50'
        }
      >
        {children}
      </main>
    </div>
  )
}
