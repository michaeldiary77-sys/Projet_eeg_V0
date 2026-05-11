'use client'

import { Bell, HelpCircle, Search, Settings } from 'lucide-react'

export interface PlanningTopbarProps {
  /** Réservé pour extensions futures (la barre est autonome). */
  className?: string
}

export default function PlanningTopbar({ className }: PlanningTopbarProps) {
  return (
    <header
      className={`flex h-16 flex-row items-center justify-between border-b border-slate-100 bg-white px-8 ${className ?? ''}`}
    >
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-xl font-black text-sky-900">Planning RDV EEG</h1>
        <div className="mx-2 h-6 w-px bg-slate-200" aria-hidden />
        <div className="flex items-center gap-3 rounded-full bg-slate-100 px-4 py-1.5">
          <Search className="h-4 w-4 shrink-0 text-sm text-slate-400" aria-hidden />
          <input
            type="search"
            placeholder="Rechercher un RDV..."
            className="w-64 border-none bg-transparent text-sm outline-none focus:ring-0"
          />
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <button
          type="button"
          className="rounded-full p-2 text-slate-500 transition-all hover:bg-slate-50"
          aria-label="Notifications"
          onClick={() => console.log('notifications')}
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="rounded-full p-2 text-slate-500 transition-all hover:bg-slate-50"
          aria-label="Aide"
          onClick={() => console.log('help')}
        >
          <HelpCircle className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="rounded-full p-2 text-slate-500 transition-all hover:bg-slate-50"
          aria-label="Paramètres"
          onClick={() => console.log('settings')}
        >
          <Settings className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="ml-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-primary/10 bg-primary-container/20"
          aria-label="Profil"
          onClick={() => console.log('avatar')}
        >
          <span className="text-xs font-bold text-primary">JD</span>
        </button>
      </div>
    </header>
  )
}
