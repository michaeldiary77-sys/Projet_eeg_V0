'use client'

import { Search, Bell, HelpCircle, Settings, User } from 'lucide-react'

// Données mockées de l'utilisateur connecté
const currentUser = {
  name: 'Dr. Jean Dupont',
  role: 'Technicien EEG',
}

export default function Topbar() {
  return (
    <div className="fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-40" style={{ width: 'calc(100% - 16rem)' }}>
      {/* Barre de recherche à gauche */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Icônes et profil utilisateur à droite */}
      <div className="flex items-center gap-6 ml-8">
        {/* Icônes */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Notifications">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Aide">
          <HelpCircle className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Profil">
          <User className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Paramètres">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>

        {/* Séparateur */}
        <div className="w-px h-6 bg-gray-200" />

        {/* Profil utilisateur */}
        <div className="flex items-center gap-2">
          <div>
            <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
            <p className="text-xs text-gray-500">{currentUser.role}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-blue-600">
              {currentUser.name.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
