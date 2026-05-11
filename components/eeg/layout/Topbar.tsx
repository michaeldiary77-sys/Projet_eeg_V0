'use client'

import { useEffect, useState } from 'react'
import { Search, HelpCircle, Settings, User } from 'lucide-react'
import { getNotificationsNonLues } from '@/services/eeg-notifications.service'

const currentUser = {
  name: 'Dr. Jean Dupont',
  role: 'Technicien EEG',
}

export default function Topbar() {
  const [nbNonLues, setNbNonLues] = useState(0)

  useEffect(() => {
    getNotificationsNonLues()
      .then((data) => setNbNonLues(data.length))
      .catch(() => setNbNonLues(0))
  }, [])

  return (
    <div
      className="fixed top-0 right-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8"
      style={{ width: 'calc(100% - 16rem)' }}
    >
      <div className="max-w-md flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full rounded-lg border border-gray-200 bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="ml-8 flex items-center gap-6">
        <div className="relative">
          <button
            type="button"
            className="rounded-full p-2 transition-all duration-300 hover:bg-slate-50"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-slate-500">
              notifications
            </span>
          </button>
          {nbNonLues > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-error" />
          )}
        </div>
        <button
          className="rounded-lg p-2 transition-colors hover:bg-gray-100"
          title="Aide"
        >
          <HelpCircle className="h-5 w-5 text-gray-600" />
        </button>
        <button
          className="rounded-lg p-2 transition-colors hover:bg-gray-100"
          title="Profil"
        >
          <User className="h-5 w-5 text-gray-600" />
        </button>
        <button
          className="rounded-lg p-2 transition-colors hover:bg-gray-100"
          title="Paramètres"
        >
          <Settings className="h-5 w-5 text-gray-600" />
        </button>

        <div className="h-6 w-px bg-gray-200" />

        <div className="flex items-center gap-2">
          <div>
            <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
            <p className="text-xs text-gray-500">{currentUser.role}</p>
          </div>
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
            <span className="text-xs font-bold text-blue-600">
              {currentUser.name.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
