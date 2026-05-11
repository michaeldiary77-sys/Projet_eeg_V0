// Type EegActivite — historique des actions réalisées dans le module EEG

export interface EegActivite {
  id: string
  ts: string               // ISO timestamp
  type: 'Validation' | 'Nouvel Examen' | 'Système' | 'Archive'
  description: string
  userId?: string
  patientId?: string
}
