import type { EegActivite } from '@/types/eeg/activite'

export const MOCK_ACTIVITES: EegActivite[] = [
  {
    id: 'act-001',
    ts: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // il y a 15 min
    type: 'Validation',
    description: 'Rapport EEG validé — RAKOTO Jean',
    userId: 'Dr. Rabe',
    patientId: 'PAT-00234',
  },
  {
    id: 'act-002',
    ts: new Date(Date.now() - 1000 * 60 * 42).toISOString(), // il y a 42 min
    type: 'Nouvel Examen',
    description: 'Nouvel examen EEG Sommeil programmé — RAZAFY Marie',
    userId: 'Dr. Andriamanantena',
    patientId: 'PAT-00521',
  },
  {
    id: 'act-003',
    ts: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // il y a 1h30
    type: 'Archive',
    description: 'Dossier archivé après validation — RAHARIJAONA Paul',
    userId: 'Tech. Solofo',
    patientId: 'PAT-00189',
  },
  {
    id: 'act-004',
    ts: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // il y a 3h
    type: 'Système',
    description: 'Synchronisation automatique des agendas effectuée',
  },
]
