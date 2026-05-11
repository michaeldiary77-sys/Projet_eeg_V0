'use client'

export default function ResumeNotifications() {
  const compteurs = [
    { value: '04', label: 'Alertes STAT' },
    { value: '28', label: 'Événements' },
  ] as const

  return (
    <section className="rounded-[2rem] bg-primary p-6 text-white shadow-2xl">
      <h3 className="mb-6 text-xs font-black uppercase tracking-widest opacity-60">
        Résumé des dernières 24h
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {compteurs.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
          >
            <div className="mb-1 text-3xl font-black">{c.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-tighter opacity-80">
              {c.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-white/10 pt-6">
        <p className="text-sm font-medium leading-tight opacity-90">
          La charge de travail est actuellement de 15% supérieure à la moyenne
          hebdomadaire.
        </p>
      </div>
    </section>
  )
}

