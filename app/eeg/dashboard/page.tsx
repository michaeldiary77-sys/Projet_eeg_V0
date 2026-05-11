'use client'

import KpiCard from '@/components/eeg/dashboard/KpiCard'
import PlanningDuJour from '@/components/eeg/dashboard/PlanningDuJour'
import AlertesActives from '@/components/eeg/dashboard/AlertesActives'
import DernieresActivites from '@/components/eeg/dashboard/DernieresActivites'
import { Clock, Zap, CheckCircle, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  // Données mockées des KPIs
  const kpis = [
    {
      label: 'En attente',
      value: 12,
      icon: <Clock className="w-6 h-6" />,
      secondaryInfo: '+2 depuis ce matin',
      variant: 'warning' as const,
    },
    {
      label: 'En cours',
      value: 4,
      icon: <Zap className="w-6 h-6" />,
      secondaryInfo: 'Acquisition en cours sur le plateau EEG',
      variant: 'secondary' as const,
    },
    {
      label: 'À valider',
      value: 8,
      icon: <AlertCircle className="w-6 h-6" />,
      secondaryInfo: '3 examens STAT',
      variant: 'primary' as const,
    },
    {
      label: 'Validés aujourd\'hui',
      value: 15,
      icon: <CheckCircle className="w-6 h-6" />,
      secondaryInfo: 'Aujourd\'hui',
      variant: 'success' as const,
    },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900">Tableau de bord EEG</h1>
      <p className="mt-2 text-gray-600">Bienvenue sur le module EEG du SIH</p>

      {/* Layout en deux colonnes */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne gauche (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Grille de KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
              <KpiCard
                key={index}
                label={kpi.label}
                value={kpi.value}
                icon={kpi.icon}
                secondaryInfo={kpi.secondaryInfo}
                variant={kpi.variant}
              />
            ))}
          </div>

          {/* Planning du jour */}
          <PlanningDuJour />
        </div>

        {/* Colonne droite (1/3) */}
        <div className="space-y-8">
          <AlertesActives />
          <DernieresActivites />
        </div>
      </div>
    </div>
  )
}
