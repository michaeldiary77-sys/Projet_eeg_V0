'use client'

type SalleItem = {
  dotClass: string
  nom: string
  statut: string
}

export default function DisponibiliteSalles() {
  const salles: SalleItem[] = [
    {
      dotClass: 'bg-error',
      nom: 'Salle 04 (Occupée)',
      statut: 'Enregistrement...',
    },
    {
      dotClass: 'bg-tertiary-fixed-dim',
      nom: 'Salle 03 (Libre)',
      statut: 'Prête',
    },
    {
      dotClass: 'bg-tertiary-fixed-dim',
      nom: 'Salle 02 (Libre)',
      statut: 'Prête',
    },
  ]

  return (
    <section className="rounded-[2rem] bg-surface-container-low p-6">
      <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-on-surface-variant">
        Disponibilité Salles EEG
      </h3>

      <div className="space-y-4">
        {salles.map((s) => (
          <div key={s.nom} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${s.dotClass}`} />
              <span className="text-sm font-bold text-primary">{s.nom}</span>
            </div>
            <span className="text-[10px] font-medium text-on-surface-variant">
              {s.statut}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

