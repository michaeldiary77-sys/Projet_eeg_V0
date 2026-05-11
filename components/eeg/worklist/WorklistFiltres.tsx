'use client'

import type {
  WorklistFilterPriorite,
  WorklistFilters,
  WorklistFilterStatut,
} from '@/lib/eeg/worklistFilters'

type WorklistFiltresProps = {
  filters: WorklistFilters
  onChange: (next: WorklistFilters) => void
}

const STATUT_OPTIONS: { value: WorklistFilterStatut; label: string }[] = [
  { value: 'TOUS', label: 'Tous les statuts' },
  { value: 'EN_ATTENTE', label: 'En attente' },
  { value: 'EN_COURS', label: 'En cours' },
  { value: 'REALISEE', label: 'Réalisée' },
  { value: 'ANNULEE', label: 'Annulée' },
  { value: 'ACK_RECU', label: 'Accusé reçu' },
]

const PRIORITE_OPTIONS: { value: WorklistFilterPriorite; label: string }[] = [
  { value: 'TOUS', label: 'Toutes priorités' },
  { value: 'STAT', label: 'STAT' },
  { value: 'URGENTE', label: 'Urgente' },
  { value: 'NORMALE', label: 'Normale' },
]

const controlClass =
  'rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

export default function WorklistFiltres({
  filters,
  onChange,
}: WorklistFiltresProps) {
  return (
    <div className="mt-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-end">
        <div className="min-w-0 flex-1 md:min-w-[200px]">
          <label
            htmlFor="worklist-search"
            className="mb-1 block text-xs font-medium text-slate-500"
          >
            Recherche
          </label>
          <input
            id="worklist-search"
            type="search"
            placeholder="Patient, n° dossier, type, prescripteur…"
            value={filters.search}
            onChange={(e) =>
              onChange({ ...filters, search: e.target.value })
            }
            className={`${controlClass} w-full`}
            autoComplete="off"
          />
        </div>
        <div className="w-full min-w-0 md:w-auto md:min-w-[11rem]">
          <label
            htmlFor="worklist-statut"
            className="mb-1 block text-xs font-medium text-slate-500"
          >
            Statut
          </label>
          <select
            id="worklist-statut"
            value={filters.statut}
            onChange={(e) =>
              onChange({
                ...filters,
                statut: e.target.value as WorklistFilterStatut,
              })
            }
            className={`${controlClass} w-full`}
          >
            {STATUT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full min-w-0 md:w-auto md:min-w-[11rem]">
          <label
            htmlFor="worklist-priorite"
            className="mb-1 block text-xs font-medium text-slate-500"
          >
            Priorité
          </label>
          <select
            id="worklist-priorite"
            value={filters.priorite}
            onChange={(e) =>
              onChange({
                ...filters,
                priorite: e.target.value as WorklistFilterPriorite,
              })
            }
            className={`${controlClass} w-full`}
          >
            {PRIORITE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
