import WorklistView from '@/components/eeg/worklist/WorklistView'
import type { DemandeEEG } from '@/components/eeg/worklist/WorklistTable'

const mockDemandes: DemandeEEG[] = [
  {
    id: '1',
    priorite: 'STAT',
    nomPatient: 'Rakoto Hery',
    idPatient: 'P-2024-0892',
    typeEEG: 'EEG prolongé',
    prescripteurNom: 'Dr. Laurent Martin',
    statut: 'EN_ATTENTE',
  },
  {
    id: '2',
    priorite: 'URGENTE',
    nomPatient: 'Andria Solo',
    idPatient: 'P-2024-0901',
    typeEEG: 'EEG de routine',
    prescripteurNom: 'Dr. Sophie Bernard',
    statut: 'EN_COURS',
  },
  {
    id: '3',
    priorite: 'NORMALE',
    nomPatient: 'Razanadrakoto Tiana',
    idPatient: 'P-2024-0856',
    typeEEG: 'EEG ambulatoire',
    prescripteurNom: 'Dr. Pierre Moreau',
    statut: 'REALISEE',
  },
  {
    id: '4',
    priorite: 'NORMALE',
    nomPatient: 'Ravelo Jean',
    idPatient: 'P-2024-0712',
    typeEEG: 'EEG de sommeil',
    prescripteurNom: 'Dr. Claire Petit',
    statut: 'ANNULEE',
  },
  {
    id: '5',
    priorite: 'STAT',
    nomPatient: 'Rasolo Fara',
    idPatient: 'P-2024-0888',
    typeEEG: 'EEG de routine',
    prescripteurNom: 'Dr. Laurent Martin',
    statut: 'ACK_RECU',
  },
  {
    id: '6',
    priorite: 'NORMALE',
    nomPatient: 'Martin Paul',
    idPatient: 'P-2024-0400',
    typeEEG: 'EEG de routine',
    prescripteurNom: 'Dr. Sophie Bernard',
    statut: 'EN_ATTENTE',
  },
]

export default function WorklistPage() {
  return <WorklistView demandes={mockDemandes} />
}
