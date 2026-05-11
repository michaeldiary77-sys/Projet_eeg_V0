'use client'

import type { Notification } from '@/types/eeg/notification'

export interface FilNotificationsProps {
  notifications: Notification[]
}

const symFill = { fontVariationSettings: "'FILL' 1" as const }

function todayLabelFr(): string {
  return new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function barreGaucheClass(niveau: Notification['niveau']): string | null {
  switch (niveau) {
    case 'STAT':
      return 'bg-error'
    case 'URGENTE':
      return 'bg-warning'
    default:
      return null
  }
}

function iconeZone(niveau: Notification['niveau']): {
  wrapper: string
  name: string
  className: string
  fill?: boolean
} {
  switch (niveau) {
    case 'STAT':
      return {
        wrapper: 'bg-error-container',
        name: 'error',
        className: 'text-error',
        fill: true,
      }
    case 'URGENTE':
      return {
        wrapper: 'bg-orange-100',
        name: 'priority_high',
        className: 'text-warning',
        fill: true,
      }
    case 'NORMALE':
      return {
        wrapper: 'bg-tertiary-fixed',
        name: 'description',
        className: 'text-on-tertiary-fixed-variant',
      }
    case 'EN_ATTENTE':
      return {
        wrapper: 'bg-surface-container-high',
        name: 'update',
        className: 'text-outline',
      }
  }
}

function badgeNiveauClass(niveau: Notification['niveau']): string {
  switch (niveau) {
    case 'STAT':
      return 'rounded-full bg-error px-3 py-1 text-[10px] font-black uppercase tracking-widest text-on-error'
    case 'URGENTE':
      return 'rounded-full bg-warning px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white'
    case 'NORMALE':
      return 'rounded-full bg-tertiary-fixed px-3 py-1 text-[10px] font-black uppercase tracking-widest text-on-tertiary-fixed'
    case 'EN_ATTENTE':
      return 'rounded-full border border-outline-variant/40 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-on-surface-variant'
  }
}

function MessageAvecPatientBold({ message }: { message: string }) {
  const patientDebut = message.match(
    /^(Patient\s*:\s*.+?\.)\s*([\s\S]*)$/
  )
  if (patientDebut) {
    return (
      <>
        <span className="font-bold text-on-surface">{patientDebut[1]}</span>
        {patientDebut[2] ? <> {patientDebut[2]}</> : null}
      </>
    )
  }

  const pourLePatient = message.match(
    /^([\s\S]*?pour le patient )([^.\n]+?)(\s+a été[\s\S]*)$/i
  )
  if (pourLePatient) {
    return (
      <>
        {pourLePatient[1]}
        <span className="font-bold text-on-surface">{pourLePatient[2]}</span>
        {pourLePatient[3]}
      </>
    )
  }

  return <>{message}</>
}

export default function FilNotifications({ notifications }: FilNotificationsProps) {
  const dateAujourdhui = todayLabelFr()

  return (
    <div className="space-y-4">
      {notifications.map((n, i) => {
        const prev = notifications[i - 1]
        const afficherSeparateur =
          prev?.niveau === 'URGENTE' && n.niveau === 'NORMALE'

        const barre = barreGaucheClass(n.niveau)
        const zone = iconeZone(n.niveau)
        const actions = n.actions ?? []

        return (
          <div key={n.id}>
            {afficherSeparateur && (
              <div className="py-4">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-outline">
                  Aujourd&apos;hui, {dateAujourdhui}
                </h4>
              </div>
            )}

            <article className="group relative flex items-start gap-5 overflow-hidden rounded-2xl bg-surface-container-lowest p-5 transition-all duration-300 hover:bg-surface-container-low">
              {barre && (
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 ${barre}`}
                  aria-hidden
                />
              )}

              <div
                className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${zone.wrapper}`}
              >
                <span
                  className={`material-symbols-outlined text-2xl ${zone.className}`}
                  style={zone.fill ? symFill : undefined}
                  aria-hidden
                >
                  {zone.name}
                </span>
              </div>

              <div className="min-w-0 flex-grow">
                <div className="mb-1 flex items-start justify-between gap-3">
                  <span className={badgeNiveauClass(n.niveau)}>{n.niveau}</span>
                  <span className="text-xs font-medium text-on-surface-variant">
                    {n.horodatage}
                  </span>
                </div>

                <h2 className="mb-1 text-lg font-bold text-primary">{n.titre}</h2>

                <p className="mb-3 text-sm leading-relaxed text-on-surface-variant">
                  <MessageAvecPatientBold message={n.message} />
                </p>

                {actions.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {actions.map((a, idx) => {
                      const seulSecondaire =
                        actions.length === 1 && a.style === 'secondary'

                      if (a.style === 'primary') {
                        return (
                          <button
                            key={`${n.id}-${idx}`}
                            type="button"
                            onClick={() =>
                              console.log('action', n.id, a.label)
                            }
                            className="rounded-lg bg-primary px-4 py-1.5 text-xs font-bold text-white hover:opacity-90"
                          >
                            {a.label}
                          </button>
                        )
                      }

                      return (
                        <button
                          key={`${n.id}-${idx}`}
                          type="button"
                          onClick={() =>
                            console.log('action', n.id, a.label)
                          }
                          className="flex items-center gap-1 rounded-lg border border-outline-variant/20 px-4 py-1.5 text-xs font-bold text-secondary"
                        >
                          {seulSecondaire && (
                            <span
                              className="material-symbols-outlined shrink-0 text-secondary"
                              style={{ fontSize: 16, lineHeight: 1 }}
                              aria-hidden
                            >
                              visibility
                            </span>
                          )}
                          {a.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </article>
          </div>
        )
      })}
    </div>
  )
}
