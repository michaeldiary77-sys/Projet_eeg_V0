import { MOCK_NOTIFICATIONS } from '@/data/mock/eeg-notifications.mock'
import type { Notification } from '@/types/eeg/notification'

// Récupère toutes les notifications (données mock statiques)
export async function getNotifications(): Promise<Notification[]> {
  return [...MOCK_NOTIFICATIONS]
}

// Récupère uniquement les non lues (pour le badge topbar)
export async function getNotificationsNonLues(): Promise<Notification[]> {
  return MOCK_NOTIFICATIONS.filter((n) => !n.lu)
}

// Marque une notification comme lue (simulation locale, sans persistance)
export async function marquerLue(id: string): Promise<void> {
  const notif = MOCK_NOTIFICATIONS.find((n) => n.id === id)
  if (notif) {
    notif.lu = true
  }
}

// Marque toutes les notifications comme lues (simulation locale, sans persistance)
export async function marquerToutesLues(): Promise<void> {
  MOCK_NOTIFICATIONS.forEach((n) => {
    n.lu = true
  })
}
