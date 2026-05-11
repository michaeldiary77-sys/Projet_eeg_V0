import KpiCard from '@/components/eeg/dashboard/KpiCard'
import PlanningDuJour from '@/components/eeg/dashboard/PlanningDuJour'
import AlertesActives from '@/components/eeg/dashboard/AlertesActives'
import DernieresActivites from '@/components/eeg/dashboard/DernieresActivites'
import { getActivitesRecentes } from '@/services/eeg-activites.service'
import { Clock, Zap, CheckCircle, AlertCircle } from 'lucide-react'

export default async function DashboardPage() {
  // Données mock — aucune dépendance backend
  const activites = await getActivitesRecentes(4)

  const kpis = [
    {
      label: 'En attente',
      value: 12,
      icon: <Clock className="h-6 w-6" />,
      secondaryInfo: '+2 depuis ce matin',
      variant: 'warning' as const,
    },
    {
      label: 'En cours',
      value: 4,
      icon: <Zap className="h-6 w-6" />,
      secondaryInfo: 'Acquisition en cours sur le plateau EEG',
      variant: 'secondary' as const,
    },
    {
      label: 'À valider',
      value: 8,
      icon: <AlertCircle className="h-6 w-6" />,
      secondaryInfo: '3 examens STAT',
      variant: 'primary' as const,
    },
    {
      label: "Validés aujourd'hui",
      value: 15,
      icon: <CheckCircle className="h-6 w-6" />,
      secondaryInfo: "Aujourd'hui",
      variant: 'success' as const,
    },
  ]

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h2 className="mb-1 text-2xl font-bold text-primary">
          Tableau de bord opérationnel
        </h2>
        <p className="text-on-surface-variant">
          Unité d&apos;Électroencéphalographie (EEG) - CHU Andrainjato
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <PlanningDuJour />
        </div>
        <div className="space-y-8">
          <AlertesActives />
          <DernieresActivites activites={activites} />
        </div>
      </div>
    </div>
  )
}
