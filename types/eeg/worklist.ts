// Type central DemandeEEG partagé entre services et composants

export interface DemandeEEG {
  id: string
  priorite: 'STAT' | 'URGENTE' | 'NORMALE'
  nomPatient: string
  idPatient: string
  agePatient?: number
  sexePatient?: 'M' | 'F'
  typeEEG: string
  prescripteurNom: string
  serviceOrigine?: string
  statut: 'EN_ATTENTE' | 'EN_COURS' | 'REALISEE' | 'ANNULEE' | 'ACK_RECU'
  dateCreation?: string
  renseignementClinique?: string
}
