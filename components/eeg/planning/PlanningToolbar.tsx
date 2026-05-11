'use client'

export interface PlanningToolbarProps {
  labelSemaine: string
  soustitre: string
  onSemainePrecedente: () => void
  onSemaineSuivante: () => void
  onNouveauRDV: () => void
}

export default function PlanningToolbar({
  labelSemaine,
  soustitre,
  onSemainePrecedente,
  onSemaineSuivante,
  onNouveauRDV,
}: PlanningToolbarProps) {
  return (
    <div className="mb-6 flex flex-row items-end justify-between">
      <div>
        <h2 className="text-headline-md font-bold text-primary">{labelSemaine}</h2>
        <p className="text-sm text-on-surface-variant">{soustitre}</p>
      </div>

      <div className="flex flex-row items-center gap-3">
        <button
          type="button"
          onClick={onSemainePrecedente}
          className="rounded-lg border border-outline-variant/20 bg-white p-2 shadow-sm transition-all hover:bg-surface-container-low active:scale-95"
        >
          <span className="material-symbols-outlined text-primary">
            chevron_left
          </span>
        </button>

        <span className="min-w-[220px] rounded-lg border border-outline-variant/20 bg-white px-4 py-2 text-center text-sm font-bold text-primary shadow-sm">
          {labelSemaine}
        </span>

        <button
          type="button"
          onClick={onSemaineSuivante}
          className="rounded-lg border border-outline-variant/20 bg-white p-2 shadow-sm transition-all hover:bg-surface-container-low active:scale-95"
        >
          <span className="material-symbols-outlined text-primary">
            chevron_right
          </span>
        </button>

        <button
          type="button"
          onClick={onNouveauRDV}
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-white shadow-md transition-all hover:scale-[1.02] active:scale-95"
        >
          <span className="material-symbols-outlined text-xl leading-none">
            event
          </span>
          Nouveau RDV
        </button>
      </div>
    </div>
  )
}
