export type NiveauNotification = 'STAT' | 'URGENTE' | 'NORMALE' | 'EN_ATTENTE'

export type TypeNotification =
  | 'ALERTE_CRITIQUE'
  | 'ALERTE_URGENTE'
  | 'RAPPORT'
  | 'SYSTEME'

export interface Notification {
  id: string
  niveau: NiveauNotification
  type: TypeNotification
  titre: string
  message: string
  patient?: string
  horodatage: string
  lu: boolean
  actions?: {
    label: string
    style: 'primary' | 'secondary'
  }[]
}

