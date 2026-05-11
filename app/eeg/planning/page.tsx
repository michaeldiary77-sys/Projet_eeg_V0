'use client'

import { useMemo, useState } from 'react'
import PlanningToolbar from '@/components/eeg/planning/PlanningToolbar'
import CalendrierSemaine from '@/components/eeg/planning/CalendrierSemaine'
import PanneauDetailRDV from '@/components/eeg/planning/PanneauDetailRDV'
import type { RendezVousEEG } from '@/types/eeg/planning'
import { MOCK_RENDEZ_VOUS } from '@/data/mock/eeg-rdv.mock'

// Helpers de date
function getLundiDeSemaine(offset: number): Date {
  const today = new Date()
  const jour = today.getDay()
  const diffLundi = jour === 0 ? -6 : 1 - jour
  const lundi = new Date(today)
  lundi.setDate(today.getDate() + diffLundi + offset * 7)
  lundi.setHours(0, 0, 0, 0)
  return lundi
}

function toYYYYMMDD(date: Date): string {
  return date.toISOString().split('T')[0]
}

function getLabelSemaine(lundi: Date): string {
  const dimanche = new Date(lundi)
  dimanche.setDate(lundi.getDate() + 6)
  const debutStr = lundi.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
  })
  const finStr = dimanche.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return `Semaine du ${debutStr} - ${finStr}`
}

export default function PlanningPage() {
  const [offsetSemaine, setOffsetSemaine] = useState(0)
  const [rdvSelectionne, setRdvSelectionne] = useState<RendezVousEEG | null>(null)

  const lundi = getLundiDeSemaine(offsetSemaine)
  const dimanche = new Date(lundi)
  dimanche.setDate(lundi.getDate() + 6)

  // Filtre les RDV de la semaine courante depuis les données mock
  const rendezVous = useMemo<RendezVousEEG[]>(() => {
    const debut = toYYYYMMDD(lundi)
    const fin = toYYYYMMDD(dimanche)
    return MOCK_RENDEZ_VOUS.filter(
      (rdv) => rdv.dateRDV >= debut && rdv.dateRDV <= fin
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsetSemaine])

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-6">
      <PlanningToolbar
        labelSemaine={getLabelSemaine(lundi)}
        soustitre="Unité d'Électroencéphalographie"
        onSemainePrecedente={() => setOffsetSemaine((o) => o - 1)}
        onSemaineSuivante={() => setOffsetSemaine((o) => o + 1)}
        onNouveauRDV={() => console.log('Nouveau RDV')}
      />

      <div className="flex flex-1 gap-6 overflow-hidden">
        <div className="flex-1 overflow-auto rounded-xl bg-surface-container-lowest shadow-sm">
          <CalendrierSemaine
            rendezVous={rendezVous}
            rdvSelectionne={rdvSelectionne}
            onRDVClick={setRdvSelectionne}
            lundiSemaine={lundi}
          />
        </div>
        {rdvSelectionne && (
          <PanneauDetailRDV
            rdv={rdvSelectionne}
            onClose={() => setRdvSelectionne(null)}
            onCommencer={(rdv) => console.log('Commencer', rdv.id)}
            onModifier={(rdv) => console.log('Modifier', rdv.id)}
            onAnnuler={(rdv) => console.log('Annuler', rdv.id)}
          />
        )}
      </div>
    </div>
  )
}
