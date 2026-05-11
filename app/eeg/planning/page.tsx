'use client'

import { useState } from 'react'
import PlanningTopbar from '@/components/eeg/planning/PlanningTopbar'
import CalendrierSemaine from '@/components/eeg/planning/CalendrierSemaine'
import PanneauDetailRDV from '@/components/eeg/planning/PanneauDetailRDV'
import PlanningToolbar from '@/components/eeg/planning/PlanningToolbar'
import type { RendezVousEEG } from '@/types/eeg/planning'

const mockRendezVous: RendezVousEEG[] = [
  {
    id: 'RDV-001',
    patient: {
      nom: 'RAKOTOMALALA',
      prenom: 'Jean',
      age: 58,
      sexe: 'M',
      idDossier: '24901-2023',
    },
    typeEEG: 'Vidéo-EEG (24h)',
    prescripteur: 'Dr. Tahina R.',
    salle: 'Salle 02',
    priorite: 'STAT',
    statut: 'EN_ATTENTE',
    dateRDV: '2026-05-12',
    heureDebut: '09:00',
    heureFin: '10:30',
    dureMinutes: 90,
    renseignementClinique:
      'Suspicion épilepsie temporale. Crises focales répétées.',
  },
  {
    id: 'RDV-002',
    patient: {
      nom: 'RANDRIANASY',
      prenom: 'Fara',
      age: 34,
      sexe: 'F',
      idDossier: '24902-2023',
    },
    typeEEG: 'EEG de Routine',
    prescripteur: 'Dr. Lala M.',
    salle: 'Salle 01',
    priorite: 'URGENTE',
    statut: 'EN_COURS',
    dateRDV: '2026-05-14',
    heureDebut: '14:00',
    heureFin: '15:00',
    dureMinutes: 60,
    renseignementClinique:
      'Patiente présentant des crises focales suspectées. Nécessite une stimulation lumineuse intermittente. Suivie par Dr. Rakoto.',
  },
  {
    id: 'RDV-003',
    patient: {
      nom: 'ANDRIAMIFIDY',
      prenom: 'Solofo',
      age: 42,
      sexe: 'M',
      idDossier: '24903-2023',
    },
    typeEEG: 'Contrôle',
    prescripteur: 'Dr. Alain H.',
    salle: 'Salle 03',
    priorite: 'NORMALE',
    statut: 'EN_ATTENTE',
    dateRDV: '2026-05-15',
    heureDebut: '10:30',
    heureFin: '11:30',
    dureMinutes: 60,
    renseignementClinique: 'Contrôle post-traitement antiépileptique.',
  },
]

function getLundiDeSemaine(offset: number): Date {
  const today = new Date()
  const jour = today.getDay()
  const diffLundi = jour === 0 ? -6 : 1 - jour
  const lundi = new Date(today)
  lundi.setDate(today.getDate() + diffLundi + offset * 7)
  lundi.setHours(0, 0, 0, 0)
  return lundi
}

function getLabelSemaine(lundi: Date): string {
  const dimanche = new Date(lundi)
  dimanche.setDate(lundi.getDate() + 6)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  const debutStr = lundi.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
  })
  const finStr = dimanche.toLocaleDateString('fr-FR', options)
  return `Semaine du ${debutStr} - ${finStr}`
}

export default function PlanningPage() {
  const [offsetSemaine, setOffsetSemaine] = useState(0)
  const [rdvSelectionne, setRdvSelectionne] =
    useState<RendezVousEEG | null>(null)

  const lundi = getLundiDeSemaine(offsetSemaine)
  const labelSemaine = getLabelSemaine(lundi)

  return (
    <div className="flex min-h-full flex-col">
      <PlanningTopbar />

      <div className="flex min-h-0 flex-1 flex-col px-8 pb-8 pt-6">
        <PlanningToolbar
          labelSemaine={labelSemaine}
          soustitre={"Unité d'Électroencéphalographie"}
          onSemainePrecedente={() => setOffsetSemaine((o) => o - 1)}
          onSemaineSuivante={() => setOffsetSemaine((o) => o + 1)}
          onNouveauRDV={() => console.log('Nouveau RDV')}
        />

        <div className="mx-auto mt-6 flex min-h-[70vh] w-full max-w-7xl flex-1 items-stretch gap-6">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <CalendrierSemaine
              rendezVous={mockRendezVous}
              rdvSelectionne={rdvSelectionne}
              onRDVClick={setRdvSelectionne}
              lundiSemaine={lundi}
            />
          </div>
          <PanneauDetailRDV
            rdv={rdvSelectionne}
            onClose={() => setRdvSelectionne(null)}
            onCommencer={(r) => console.log('Commencer', r.id)}
            onModifier={(r) => console.log('Modifier', r.id)}
            onAnnuler={(r) => console.log('Annuler', r.id)}
          />
        </div>
      </div>
    </div>
  )
}
