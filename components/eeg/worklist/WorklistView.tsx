'use client'

import { useMemo, useState } from 'react'
import WorklistFiltres from '@/components/eeg/worklist/WorklistFiltres'
import WorklistHeader from '@/components/eeg/worklist/WorklistHeader'
import WorklistPagination from '@/components/eeg/worklist/WorklistPagination'
import WorklistTable, { type DemandeEEG } from '@/components/eeg/worklist/WorklistTable'
import {
  applyWorklistFilters,
  defaultWorklistFilters,
  type WorklistFilters,
} from '@/lib/eeg/worklistFilters'

type WorklistViewProps = {
  demandes: DemandeEEG[]
}

export default function WorklistView({ demandes }: WorklistViewProps) {
  const [filters, setFilters] = useState<WorklistFilters>(defaultWorklistFilters)

  const filtered = useMemo(
    () => applyWorklistFilters(demandes, filters),
    [demandes, filters]
  )

  return (
    <div className="max-w-7xl mx-auto">
      <WorklistHeader />
      <WorklistFiltres filters={filters} onChange={setFilters} />
      <div className="mt-6 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm">
        <WorklistTable demandes={filtered} />
        <WorklistPagination />
      </div>
    </div>
  )
}
