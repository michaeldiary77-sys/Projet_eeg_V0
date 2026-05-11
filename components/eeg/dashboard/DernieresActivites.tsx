'use client'

interface Activite {
  id: number
  timestamp: string
  type: 'Validation' | 'Nouvel Examen' | 'Système' | 'Archive'
  description: string
}

const activites: Activite[] = [
  {
    id: 1,
    timestamp: '10h45',
    type: 'Validation',
    description: 'Dr. Raharimanana a validé le compte-rendu de RAKOTO Paul',
  },
  {
    id: 2,
    timestamp: '09h15',
    type: 'Nouvel Examen',
    description: 'Début d\'acquisition pour RABE Henriette',
  },
  {
    id: 3,
    timestamp: '08h00',
    type: 'Système',
    description: 'Mise à jour du logiciel d\'analyse EEG v2.4 effectuée',
  },
  {
    id: 4,
    timestamp: 'Hier',
    type: 'Archive',
    description: '14 dossiers archivés automatiquement',
  },
]

const typeColors = {
  'Validation': 'bg-green-500',
  'Nouvel Examen': 'bg-blue-500',
  'Système': 'bg-purple-500',
  'Archive': 'bg-gray-500',
}

export default function DernieresActivites() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* En-tête */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Dernières activités</h3>
      </div>

      {/* Timeline */}
      <div className="px-6 py-4">
        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {/* Activités */}
          <div className="space-y-6">
            {activites.map((activite, index) => (
              <div key={activite.id} className="relative flex items-start">
                {/* Point coloré */}
                <div
                  className={`relative z-10 w-3 h-3 rounded-full ${typeColors[activite.type]} flex-shrink-0 mt-1`}
                ></div>

                {/* Contenu */}
                <div className="ml-6 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">
                      {activite.timestamp}
                    </span>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
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

      {/* Bouton en bas */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-center">
        <button className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          TOUT L'HISTORIQUE
        </button>
      </div>
    </div>
  )
}
