import { getNotifications } from '@/services/eeg-notifications.service'
import NotificationsHeader from '@/components/eeg/notifications/NotificationsHeader'
import FilNotifications from '@/components/eeg/notifications/FilNotifications'
import ResumeNotifications from '@/components/eeg/notifications/ResumeNotifications'
import DisponibiliteSalles from '@/components/eeg/notifications/DisponibiliteSalles'

export default async function NotificationsPage() {
  // Données mock — aucune dépendance backend
  const notifications = await getNotifications()

  return (
    <div className="mx-auto max-w-7xl">
      <NotificationsHeader />
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <FilNotifications notifications={notifications} />
        </div>
        <div className="col-span-12 space-y-6 lg:col-span-4">
          <ResumeNotifications />
          <DisponibiliteSalles />
        </div>
      </div>
    </div>
  )
}
