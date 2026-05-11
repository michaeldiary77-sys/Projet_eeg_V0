'use client'

import { useEffect, useMemo, useState } from 'react'
import { MoreVertical } from 'lucide-react'

/** Seuil au-delà duquel la pagination est affichée et appliquée */
const ITEMS_PAR_PAGE = 4

type StatutRdv = 'STAT' | 'Urgente' | 'Terminé' | 'Réalisé' | 'Interprété'

interface Rdv {
  id: number
  heure: string
  infoHeure: string
  nomPatient: string
  description: string
  statut: StatutRdv
}

const STATUTS_EXCLUS: StatutRdv[] = ['Terminé', 'Réalisé', 'Interprété']

const rdvs: Rdv[] = [
  {
    id: 1,
    heure: '09h45',
    infoHeure: 'Urgent',
    nomPatient: 'RASOA Noëline',
    description: 'EEG d\'urgence, état de mal possible',
    statut: 'STAT',
  },
  {
    id: 2,
    heure: '11h00',
    infoHeure: 'Salle 04',
    nomPatient: 'ANDRIANASOLO Marc',
    description: 'EEG après privation de sommeil',
    statut: 'Urgente',
  },
]

const statusStyles = {
  STAT: 'bg-red-600 text-white animate-pulse',
  Urgente: 'bg-orange-100 text-orange-900',
} as const

const chevronBtnClass =
  'w-8 h-8 flex shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 transition-colors disabled:opacity-40 disabled:pointer-events-none'
const pageActiveClass =
  'min-w-[2rem] h-8 px-2 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold shadow-sm'
const pageInactiveClass =
  'min-h-8 px-2 flex items-center justify-center rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors'

function estExcluDuPlanning(statut: StatutRdv): boolean {
  return STATUTS_EXCLUS.includes(statut)
}

function classeBadgeStatut(statut: StatutRdv): string {
  if (statut === 'STAT' || statut === 'Urgente') {
    return statusStyles[statut]
  }
  return 'bg-gray-100 text-gray-800'
}

export default function PlanningDuJour() {
  const [page, setPage] = useState(1)

  const rdvsAffiches = useMemo(
    () => rdvs.filter((r) => !estExcluDuPlanning(r.statut)),
    []
  )

  const totalPages = Math.max(
    1,
    Math.ceil(rdvsAffiches.length / ITEMS_PAR_PAGE)
  )
  const paginationActive = rdvsAffiches.length > ITEMS_PAR_PAGE

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages))
  }, [totalPages])

  const pageSafe = Math.min(page, totalPages)
  const debutPlage =
    rdvsAffiches.length === 0 ? 0 : (pageSafe - 1) * ITEMS_PAR_PAGE + 1
  const finPlage = Math.min(
    pageSafe * ITEMS_PAR_PAGE,
    rdvsAffiches.length
  )

  const rdvsPage = paginationActive
    ? rdvsAffiches.slice(
        (pageSafe - 1) * ITEMS_PAR_PAGE,
        pageSafe * ITEMS_PAR_PAGE
      )
    : rdvsAffiches

  const goPrev = () => setPage((p) => Math.max(1, p - 1))
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1))

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Planning du jour</h2>
        <p className="mt-1 text-xs text-on-surface-variant">
          Examens en attente et en cours uniquement
        </p>
      </div>

      {rdvsAffiches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="material-symbols-outlined text-4xl text-tertiary mb-3">
            task_alt
          </span>
          <p className="text-sm font-bold text-tertiary">
            Tous les examens du jour sont réalisés
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            Aucun examen en attente pour aujourd&apos;hui
          </p>
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-100">
            {rdvsPage.map((rdv) => (
              <div
                key={rdv.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="min-w-fit">
                  <p className="text-sm font-medium text-gray-900">
                    {rdv.heure}
                  </p>
                  <p className="text-xs text-gray-500">{rdv.infoHeure}</p>
                </div>

                <div className="flex-1 px-6">
                  <p className="text-sm font-medium text-gray-900">
                    {rdv.nomPatient}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{rdv.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${classeBadgeStatut(rdv.statut)}`}
                  >
                    {rdv.statut}
                  </span>
                  <button
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="Menu"
                    type="button"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {paginationActive ? (
            <div className="px-6 py-3 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              <p className="text-xs font-medium text-slate-500">
                Affichage de {debutPlage}-{finPlage} sur {rdvsAffiches.length}{' '}
                examen{rdvsAffiches.length > 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className={chevronBtnClass}
                  aria-label="Page précédente"
                  disabled={pageSafe <= 1}
                  onClick={goPrev}
                >
                  <span className="material-symbols-outlined text-xl leading-none">
                    chevron_left
                  </span>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pN) => (
                    <button
                      key={pN}
                      type="button"
                      onClick={() => setPage(pN)}
                      aria-current={pN === pageSafe ? 'page' : undefined}
                      className={
                        pN === pageSafe ? pageActiveClass : pageInactiveClass
                      }
                    >
                      {pN}
                    </button>
                  )
                )}
                <button
                  type="button"
                  className={chevronBtnClass}
                  aria-label="Page suivante"
                  disabled={pageSafe >= totalPages}
                  onClick={goNext}
                >
                  <span className="material-symbols-outlined text-xl leading-none">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
