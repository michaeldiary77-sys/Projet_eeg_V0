'use client'

import type { RendezVousEEG } from '@/types/eeg/planning'

export interface PanneauDetailRDVProps {
  rdv: RendezVousEEG | null
  onClose: () => void
  onCommencer: (rdv: RendezVousEEG) => void
  onModifier: (rdv: RendezVousEEG) => void
  onAnnuler: (rdv: RendezVousEEG) => void
}

function initialesPatient(prenom: string, nom: string): string {
  const p = prenom.trim().charAt(0)
  const n = nom.trim().charAt(0)
  return `${p}${n}`.toUpperCase()
}

export default function PanneauDetailRDV({
  rdv,
  onClose,
  onCommencer,
  onModifier,
  onAnnuler,
}: PanneauDetailRDVProps) {
  if (rdv === null) {
    return (
      <aside
        className="flex h-full w-80 shrink-0 flex-col gap-6 self-stretch rounded-xl border border-outline-variant/10 bg-white p-6 shadow-lg"
        aria-label="Détail du rendez-vous"
      >
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined mb-3 text-4xl text-slate-300">
            event_note
          </span>
          <p className="text-sm font-medium text-on-surface-variant">
            Sélectionnez un rendez-vous pour voir les détails
          </p>
        </div>
      </aside>
    )
  }

  const initiales = initialesPatient(rdv.patient.prenom, rdv.patient.nom)
  const nomComplet = `${rdv.patient.nom} ${rdv.patient.prenom}`

  return (
    <aside
      className="flex h-full w-80 shrink-0 flex-col gap-6 self-stretch rounded-xl border border-outline-variant/10 bg-white p-6 shadow-lg"
      aria-label="Détail du rendez-vous"
    >
      <div className="flex flex-row items-start justify-between">
        <h2 className="text-lg font-black text-primary">Détails du RDV</h2>
        <button
          type="button"
          className="text-on-surface-variant transition-colors hover:text-primary"
          aria-label="Fermer"
          onClick={onClose}
        >
          <span className="material-symbols-outlined text-xl leading-none">
            close
          </span>
        </button>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-container/20 text-lg font-black text-primary">
          {initiales}
        </div>
        <div className="min-w-0">
          <p className="font-black text-on-surface">{nomComplet}</p>
          <p className="text-xs text-on-surface-variant">
            ID: {rdv.patient.idDossier}
          </p>
        </div>
      </div>

      <div className="space-y-3 rounded-lg bg-surface-container-low p-4">
        <div className="flex flex-row items-center gap-3">
          <span className="material-symbols-outlined shrink-0 text-lg text-secondary">
            schedule
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase text-on-surface-variant">
              HORAIRE
            </p>
            <p className="text-sm font-semibold">
              {rdv.heureDebut} - {rdv.heureFin} ({rdv.dureMinutes} min)
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <span className="material-symbols-outlined shrink-0 text-lg text-secondary">
            medical_services
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase text-on-surface-variant">
              TYPE D&apos;EXAMEN
            </p>
            <p className="text-sm font-semibold">{rdv.typeEEG}</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <span className="material-symbols-outlined shrink-0 text-lg text-secondary">
            meeting_room
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase text-on-surface-variant">
              EMPLACEMENT
            </p>
            <p className="text-sm font-semibold">{rdv.salle}</p>
          </div>
        </div>
      </div>

      {rdv.renseignementClinique ? (
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">
            Renseignement clinique
          </p>
          <p className="mt-1 text-xs italic leading-relaxed text-on-surface">
            {rdv.renseignementClinique}
          </p>
        </div>
      ) : null}

      <div className="mt-auto space-y-3 border-t border-outline-variant/10 pt-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded bg-primary py-2.5 text-sm font-bold text-white"
          onClick={() => onCommencer(rdv)}
        >
          <span className="material-symbols-outlined text-sm leading-none">
            play_circle
          </span>
          Commencer l&apos;examen
        </button>
        <button
          type="button"
          className="w-full rounded border border-outline-variant py-2.5 text-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-container-low"
          onClick={() => onModifier(rdv)}
        >
          Modifier le RDV
        </button>
        <button
          type="button"
          className="w-full rounded py-2.5 text-sm font-bold text-error transition-colors hover:bg-error-container/10"
          onClick={() => onAnnuler(rdv)}
        >
          Annuler le RDV
        </button>
      </div>
    </aside>
  )
}
