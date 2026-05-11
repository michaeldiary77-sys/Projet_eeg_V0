import { MOCK_RENDEZ_VOUS } from '@/data/mock/eeg-rdv.mock'
import type { RendezVousEEG } from '@/types/eeg/planning'

// Récupère les RDV d'une semaine donnée (données mock statiques)
// dateDebut et dateFin au format "YYYY-MM-DD"
export async function getRdvSemaine(
  dateDebut: string,
  dateFin: string
): Promise<RendezVousEEG[]> {
  // Filtre les RDV dans la plage de la semaine demandée
  return MOCK_RENDEZ_VOUS.filter((rdv) => {
    return rdv.dateRDV >= dateDebut && rdv.dateRDV <= dateFin
  })
}

// Met à jour le statut d'un RDV (simulation locale, sans persistance)
export async function updateStatutRdv(
  id: string,
  statut: string
): Promise<RendezVousEEG> {
  const rdv = MOCK_RENDEZ_VOUS.find((r) => r.id === id)
  if (!rdv) {
    throw new Error(`Rendez-vous introuvable : ${id}`)
  }
  // Simulation : retourne le RDV avec le nouveau statut
  return { ...rdv, statut: statut as RendezVousEEG['statut'] }
}
