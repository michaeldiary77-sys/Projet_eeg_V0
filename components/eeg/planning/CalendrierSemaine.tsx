'use client'

import type { PrioriteRDV, RendezVousEEG } from '@/types/eeg/planning'

export interface CalendrierSemaineProps {
  rendezVous: RendezVousEEG[]
  rdvSelectionne: RendezVousEEG | null
  onRDVClick: (rdv: RendezVousEEG) => void
  lundiSemaine: Date
}

const HEURES = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
] as const

const LABELS_JOURS = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'] as const

function heureVersTopPx(heureDebut: string): number {
  const [h, m] = heureDebut.split(':').map(Number)
  const minutesDepuis8h = h * 60 + m - 8 * 60
  return (minutesDepuis8h / 60) * 100
}

function dureeVersHauteurPx(dureMinutes: number): number {
  return (dureMinutes / 60) * 100
}

function classesPriorite(priorite: PrioriteRDV): {
  bloc: string
  badge: string
  nom: string
  detail: string
} {
  switch (priorite) {
    case 'STAT':
      return {
        bloc:
          'bg-error-container/40 border-l-4 border-error rounded-lg p-3 cursor-pointer hover:shadow-md transition-all text-left w-full',
        badge:
          'inline-block px-2 py-0.5 rounded-full bg-error text-[10px] font-bold text-white mb-2',
        nom: 'text-xs font-black text-on-error-container leading-tight',
        detail: 'text-[10px] text-on-error-container/70',
      }
    case 'URGENTE':
      return {
        bloc:
          'bg-secondary-fixed/40 border-l-4 border-secondary rounded-lg p-3 cursor-pointer hover:shadow-md transition-all text-left w-full',
        badge:
          'inline-block px-2 py-0.5 rounded-full bg-secondary text-[10px] font-bold text-white mb-2',
        nom: 'text-xs font-black text-on-secondary-container leading-tight',
        detail: 'text-[10px] text-on-secondary-container/70',
      }
    case 'NORMALE':
      return {
        bloc:
          'bg-tertiary-fixed/40 border-l-4 border-tertiary rounded-lg p-3 cursor-pointer hover:shadow-md transition-all text-left w-full',
        badge:
          'inline-block px-2 py-0.5 rounded-full bg-tertiary text-[10px] font-bold text-white mb-2',
        nom: 'text-xs font-black text-on-tertiary-fixed-variant leading-tight',
        detail: 'text-[10px] text-on-tertiary-fixed-variant/70',
      }
  }
}

function EnteteJour({
  label,
  numero,
  idxColonne,
  actif,
}: {
  label: string
  numero: number
  idxColonne: number
  actif: boolean
}) {
  const weekend = idxColonne >= 5

  if (actif) {
    return (
      <div className="border-l border-outline-variant/10 bg-primary-container/5 p-4 text-center">
        <span className="block text-xs font-bold uppercase tracking-widest text-primary">
          {label}
        </span>
        <span className="text-xl font-black text-primary">{numero}</span>
      </div>
    )
  }

  if (weekend) {
    return (
      <div className="border-l border-outline-variant/10 bg-slate-100 p-4 text-center">
        <span className="block text-xs font-bold uppercase tracking-widest text-slate-400">
          {label}
        </span>
        <span className="text-xl font-black text-slate-400">{numero}</span>
      </div>
    )
  }

  return (
    <div className="border-l border-outline-variant/10 p-4 text-center">
      <span className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">
        {label}
      </span>
      <span className="text-xl font-black text-primary">{numero}</span>
    </div>
  )
}

export default function CalendrierSemaine({
  rendezVous,
  rdvSelectionne,
  onRDVClick,
  lundiSemaine,
}: CalendrierSemaineProps) {
  const jours = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(lundiSemaine)
    d.setDate(lundiSemaine.getDate() + i)
    return d
  })

  const aujourdhui = new Date()
  const estAujourdhui = (d: Date) =>
    d.getDate() === aujourdhui.getDate() &&
    d.getMonth() === aujourdhui.getMonth() &&
    d.getFullYear() === aujourdhui.getFullYear()

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
      <div className="calendar-grid shrink-0 border-b border-outline-variant/10 bg-slate-50">
        <div />
        {jours.map((d, idxSemaine) => (
          <EnteteJour
            key={idxSemaine}
            label={LABELS_JOURS[idxSemaine]}
            numero={d.getDate()}
            idxColonne={idxSemaine}
            actif={estAujourdhui(d)}
          />
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="relative min-h-[1000px]">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="calendar-grid h-full w-full">
              <div />
              <div className="col-span-7 flex h-[1000px] flex-col">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="time-row border-b border-outline-variant/5"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="calendar-grid relative z-[1] h-[1000px]">
            <div className="space-y-[84px] py-8 pr-4 text-right text-xs font-bold uppercase text-slate-400">
              {HEURES.map((h) => (
                <div key={h}>{h}</div>
              ))}
            </div>

            {[0, 1, 2, 3, 4, 5, 6].map((jourIdx) => {
              const weekendCol = jourIdx >= 5
              const rdvsDuJour = rendezVous.filter(
                (r) => r.jourSemaine === jourIdx
              )

              return (
                <div
                  key={jourIdx}
                  className={`relative h-[1000px] border-l border-outline-variant/10 ${
                    weekendCol ? 'bg-slate-50/50' : ''
                  }`}
                >
                  {rdvsDuJour.map((rdv) => {
                    const styles = classesPriorite(rdv.priorite)
                    const top = heureVersTopPx(rdv.heureDebut)
                    const height = dureeVersHauteurPx(rdv.dureMinutes)
                    const selected =
                      rdvSelectionne !== null && rdvSelectionne.id === rdv.id

                    return (
                      <button
                        key={rdv.id}
                        type="button"
                        className={`absolute left-1 right-1 z-10 ${styles.bloc} ${
                          selected ? 'ring-2 ring-primary' : ''
                        }`}
                        style={{ top: `${top}px`, height: `${height}px` }}
                        onClick={() => onRDVClick(rdv)}
                      >
                        <span className={styles.badge}>{rdv.priorite}</span>
                        <p className={styles.nom}>
                          {rdv.patient.nom} {rdv.patient.prenom}
                        </p>
                        <p className={styles.detail}>
                          {rdv.typeEEG} • {rdv.salle}
                        </p>
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
