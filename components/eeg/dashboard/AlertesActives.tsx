'use client'

interface Alerte {
  id: number
  type: 'Examen critique' | 'Maintenance'
  message: string
  timestamp: string
}

const alertes: Alerte[] = [
  {
    id: 1,
    type: 'Examen critique',
    message: 'Résultat STAT en attente de validation pour Dossier #4521',
    timestamp: 'il y a 12 minutes',
  },
  {
    id: 2,
    type: 'Maintenance',
    message: 'Électrode signalée défectueuse',
    timestamp: 'il y a 1 heure',
  },
]

const typeStyles = {
  'Examen critique': 'border-l-4 border-red-500 bg-red-50',
  'Maintenance': 'border-l-4 border-orange-500 bg-orange-50',
}

export default function AlertesActives() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* En-tête */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Alertes actives</h3>
      </div>

      {/* Liste des alertes */}
      <div className="divide-y divide-gray-100">
        {alertes.map((alerte) => (
          <div
            key={alerte.id}
            className={`px-6 py-4 ${typeStyles[alerte.type]}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                  {alerte.type}
                </p>
                <p className="text-sm text-gray-900 mb-2">{alerte.message}</p>
                <p className="text-xs text-gray-500">{alerte.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
