import { MOCK_DEMANDES } from '@/data/mock/eeg-demandes.mock'
import { DemandeEEG } from '@/types/eeg/worklist'

// Récupère toutes les demandes avec filtres optionnels (données mock statiques)
export async function getDemandes(params?: {
  statut?: string
  priorite?: string
}): Promise<DemandeEEG[]> {
  let result = [...MOCK_DEMANDES]

  if (params?.statut) {
    result = result.filter((d) => d.statut === params.statut)
  }
  if (params?.priorite) {
    result = result.filter((d) => d.priorite === params.priorite)
  }

  return result
}

// Met à jour le statut d'une demande (simulation locale, sans persistance)
export async function updateStatutDemande(
  id: string,
  statut: string
): Promise<DemandeEEG> {
  const demande = MOCK_DEMANDES.find((d) => d.id === id)
  if (!demande) {
    throw new Error(`Demande introuvable : ${id}`)
  }
  // Simulation : retourne la demande avec le nouveau statut
  return { ...demande, statut: statut as DemandeEEG['statut'] }
}
