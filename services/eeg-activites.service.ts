import { MOCK_ACTIVITES } from '@/data/mock/eeg-activites.mock'
import type { EegActivite } from '@/types/eeg/activite'

export type { EegActivite }

// Récupère les N activités les plus récentes (données mock statiques)
export async function getActivitesRecentes(
  limit: number = 4
): Promise<EegActivite[]> {
  return MOCK_ACTIVITES.slice(0, limit)
}
