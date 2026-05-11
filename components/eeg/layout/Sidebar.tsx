'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ListTodo,
  User,
  Calendar,
  Archive,
  Bell,
  Settings,
} from 'lucide-react'

const navigationItems = [
  {
    label: 'Tableau de bord',
    href: '/eeg/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'File de travail',
    href: '/eeg/worklist',
    icon: ListTodo,
  },
  {
    label: 'Fiche Patient',
    href: '/eeg/patients',
    icon: User,
  },
  {
    label: 'Planning',
    href: '/eeg/planning',
    icon: Calendar,
  },
  {
    label: 'Archives',
    href: '/eeg/archives',
    icon: Archive,
  },
  {
    label: 'Notifications',
    href: '/eeg/notifications',
    icon: Bell,
  },
  {
    label: 'Mon profil',
    href: '/eeg/profil',
    icon: Settings,
  },
]

// Données mockées de l'utilisateur connecté
const currentUser = {
  name: 'Dr. Jean Dupont',
  specialty: 'Technicien EEG',
}

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo / Titre */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-600">EEG</h2>
        <p className="text-xs text-gray-500 mt-1">Module Électroencéphalographie</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {/* Bordure gauche colorée pour l'élément actif */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-sm" />
                  )}
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Profil utilisateur en bas */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-bold text-blue-600">
              {currentUser.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {currentUser.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {currentUser.specialty}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
