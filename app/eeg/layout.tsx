import type { ReactNode } from 'react'
import Sidebar from '@/components/eeg/layout/Sidebar'
import EegContentArea from '@/components/eeg/layout/EegContentArea'

export default function EegLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <EegContentArea>{children}</EegContentArea>
    </div>
  )
}
