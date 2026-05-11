'use client'

import {
  Activity,
  CheckCircle2,
  CirclePlay,
  FileText,
  MoreVertical,
} from 'lucide-react'
import type { DemandeEEG } from '@/types/eeg/worklist'

export type { DemandeEEG }

export interface WorklistTableProps {
  demandes: DemandeEEG[]
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ''}${parts[parts.length - 1]![0] ?? ''}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

function PrioriteBadge({ priorite }: { priorite: DemandeEEG['priorite'] }) {
  if (priorite === 'STAT') {
    return (
      <span className="inline-block bg-error text-white rounded-full px-2 py-0.5 text-[10px] font-black uppercase animate-pulse shadow-sm">
        STAT
      </span>
    )
  }
  if (priorite === 'URGENTE') {
    return (
      <span className="inline-block bg-warning text-on-surface rounded-full px-2 py-0.5 text-[10px] font-black uppercase">
        URGENTE
      </span>
    )
  }
  return (
    <span className="inline-block bg-tertiary-fixed text-on-tertiary-fixed rounded-full px-2 py-0.5 text-[10px] font-black uppercase">
      NORMALE
    </span>
  )
}

function StatutBadge({ statut }: { statut: DemandeEEG['statut'] }) {
  if (statut === 'EN_ATTENTE') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-surface-container-low text-on-surface-variant text-xs font-medium">
        <span className="size-1.5 rounded-full bg-warning" aria-hidden />
        En attente
      </span>
    )
  }
  if (statut === 'EN_COURS') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-primary-container text-white text-xs font-medium">
        <span
          className="size-1.5 rounded-full bg-white animate-pulse"
          aria-hidden
        />
        En cours
      </span>
    )
  }
  if (statut === 'REALISEE') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-tertiary/10 text-tertiary text-xs font-medium">
        <CheckCircle2 className="size-3.5 shrink-0" aria-hidden />
        Réalisée
      </span>
    )
  }
  if (statut === 'ANNULEE') {
    return (
      <span className="inline-flex rounded-full px-2.5 py-1 bg-slate-100 text-slate-400 text-xs font-medium">
        Annulée
      </span>
    )
  }
  return (
    <span className="inline-flex rounded-full px-2.5 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-xs font-medium">
      Accusé reçu
    </span>
  )
}

const actionButtonClass =
  'p-2 hover:bg-primary-container/10 rounded-full text-primary transition-colors'

export default function WorklistTable({ demandes }: WorklistTableProps) {
  if (demandes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="material-symbols-outlined text-4xl text-slate-300 mb-3">
          assignment
        </span>
        <p className="text-sm font-bold text-on-surface-variant">
          Aucune demande trouvée
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Vérifiez la connexion avec le serveur
        </p>
      </div>
    )
  }

  return (
    <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-surface-container-high/30">
            <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Priorité
            </th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Patient &amp; ID
            </th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Type EEG
            </th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Prescripteur
            </th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Statut
            </th>
            <th className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande) => (
            <tr
              key={demande.id}
              className={`hover:bg-slate-50/50 transition-colors ${
                demande.statut === 'REALISEE' ? 'opacity-70' : ''
              }`}
            >
              <td className="px-6 py-5 align-middle">
                <PrioriteBadge priorite={demande.priorite} />
              </td>
              <td className="px-6 py-5 align-middle">
                <div className="text-sm font-bold text-on-surface">
                  {demande.nomPatient}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  #{demande.idPatient}
                </div>
              </td>
              <td className="px-6 py-5 align-middle text-sm text-on-surface">
                {demande.typeEEG}
              </td>
              <td className="px-6 py-5 align-middle">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-primary-container/20 flex items-center justify-center text-[10px] font-bold text-primary">
                    {getInitials(demande.prescripteurNom)}
                  </span>
                  <span className="text-sm text-slate-600">
                    {demande.prescripteurNom}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5 align-middle">
                <StatutBadge statut={demande.statut} />
              </td>
              <td className="px-6 py-5 align-middle text-right">
                <div className="inline-flex items-center justify-end gap-0.5">
                  {demande.statut === 'EN_ATTENTE' && (
                    <button
                      type="button"
                      className={actionButtonClass}
                      aria-label="Démarrer"
                    >
                      <CirclePlay className="size-5" />
                    </button>
                  )}
                  {demande.statut === 'EN_COURS' && (
                    <button
                      type="button"
                      className={actionButtonClass}
                      aria-label="Suivre"
                    >
                      <Activity className="size-5" />
                    </button>
                  )}
                  {demande.statut === 'REALISEE' && (
                    <button
                      type="button"
                      className={actionButtonClass}
                      aria-label="Voir compte rendu"
                    >
                      <FileText className="size-5" />
                    </button>
                  )}
                  <button
                    type="button"
                    className={actionButtonClass}
                    aria-label="Menu contextuel"
                  >
                    <MoreVertical className="size-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}
