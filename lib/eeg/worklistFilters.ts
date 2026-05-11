import type { DemandeEEG } from '@/components/eeg/worklist/WorklistTable'

export type WorklistFilterStatut = 'TOUS' | DemandeEEG['statut']

export type WorklistFilterPriorite = 'TOUS' | DemandeEEG['priorite']

export type WorklistFilters = {
  search: string
  statut: WorklistFilterStatut
  priorite: WorklistFilterPriorite
}

export const defaultWorklistFilters: WorklistFilters = {
  search: '',
  statut: 'TOUS',
  priorite: 'TOUS',
}

export function applyWorklistFilters(
  demandes: DemandeEEG[],
  f: WorklistFilters
): DemandeEEG[] {
  const q = f.search.trim().toLowerCase()

  return demandes.filter((d) => {
    if (f.statut !== 'TOUS' && d.statut !== f.statut) {
      return false
    }
    if (f.priorite !== 'TOUS' && d.priorite !== f.priorite) {
      return false
    }
    if (!q) {
      return true
    }
    const haystack = `${d.nomPatient} ${d.idPatient} ${d.typeEEG} ${d.prescripteurNom}`.toLowerCase()
    return haystack.includes(q)
  })
}
