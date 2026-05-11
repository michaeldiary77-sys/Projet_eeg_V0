'use client'

import type { EegActivite } from '@/services/eeg-activites.service'

interface DernieresActivitesProps {
  activites: EegActivite[]
}

function formatHorodatage(ts: string): string {
  const date = new Date(ts)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffH = Math.floor(diffMin / 60)

  if (diffMin < 1) return "À l'instant"
  if (diffMin < 60) return `Il y a ${diffMin} min`
  if (diffH < 24) return `Il y a ${diffH}h`
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

const typeColors = {
  Validation: 'bg-green-500',
  'Nouvel Examen': 'bg-blue-500',
  Système: 'bg-purple-500',
  Archive: 'bg-gray-500',
}

export default function DernieresActivites({ activites }: DernieresActivitesProps) {
  return (
    <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-bold text-gray-900">Dernières activités</h3>
      </div>

      <div className="px-6 py-4">
        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-gray-200"></div>

          <div className="space-y-6">
            {activites.map((activite) => (
              <div key={activite.id} className="relative flex items-start">
                <div
                  className={`relative z-10 mt-1 h-3 w-3 flex-shrink-0 rounded-full ${typeColors[activite.type]}`}
                ></div>

                <div className="ml-6 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">
                      {formatHorodatage(activite.ts)}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-600">
                      {activite.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900">{activite.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center border-t border-gray-200 px-6 py-4">
        <button className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          TOUT L&apos;HISTORIQUE
        </button>
      </div>
    </div>
  )
}
