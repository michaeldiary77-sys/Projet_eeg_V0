'use client'

import { marquerToutesLues } from '@/services/eeg-notifications.service'
import { useRouter } from 'next/navigation'

export default function NotificationsHeader() {
  const router = useRouter()

  async function handleMarquerTout() {
    try {
      await marquerToutesLues()
      router.refresh()
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  return (
    <div className="mb-10 flex items-end justify-between">
      <div>
        <h2 className="mb-2 text-3xl font-black tracking-tight text-primary">
          Centre de Notifications
        </h2>
        <p className="font-medium text-on-surface-variant">
          Gestion des alertes neurologiques et mises à jour système
        </p>
      </div>
      <button
        type="button"
        onClick={handleMarquerTout}
        className="flex items-center gap-2 rounded-xl bg-surface-container-high px-6 py-2.5 text-sm font-bold text-on-surface transition-all hover:bg-slate-200 active:scale-95"
      >
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
          done_all
        </span>
        Tout marquer comme lu
      </button>
    </div>
  )
}
