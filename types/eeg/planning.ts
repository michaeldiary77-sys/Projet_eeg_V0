export type PrioriteRDV = 'STAT' | 'URGENTE' | 'NORMALE'

export type StatutRDV = 'EN_ATTENTE' | 'EN_COURS' | 'TERMINE' | 'ANNULE'

export type TypeEEG =
  | 'EEG Standard'
  | 'EEG Sommeil'
  | 'Vidéo-EEG (24h)'
  | 'EEG Ambulatoire'
  | 'EEG de Routine'
  | 'Contrôle'

export interface RendezVousEEG {
  id: string
  patient: {
    nom: string
    prenom: string
    age: number
    sexe: 'M' | 'F'
    idDossier: string
  }
  typeEEG: TypeEEG
  prescripteur: string
  salle: string
  priorite: PrioriteRDV
  statut: StatutRDV
  dateRDV: string // "YYYY-MM-DD"
  heureDebut: string // "HH:MM"
  heureFin: string // "HH:MM"
  dureMinutes: number
  renseignementClinique?: string
}
