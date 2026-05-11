import { getDemandes } from '@/services/eeg-demandes.service'
import WorklistView from '@/components/eeg/worklist/WorklistView'

export default async function WorklistPage() {
  const demandes = await getDemandes()
  return <WorklistView demandes={demandes} />
}
