const chevronBtnClass =
  'w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-400'
const pageActiveClass =
  'w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold shadow-sm'
const pageInactiveClass =
  'w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-xs font-bold text-slate-600'

export default function WorklistPagination() {
  return (
    <div className="px-6 py-4 bg-slate-50/50 flex justify-between items-center border-t border-slate-100">
      <p className="text-xs font-medium text-slate-500">
        Affichage de 1-4 sur 28 demandes
      </p>
      <div className="flex items-center gap-1">
        <button type="button" className={chevronBtnClass} aria-label="Page précédente">
          <span className="material-symbols-outlined text-xl leading-none">
            chevron_left
          </span>
        </button>
        <button type="button" className={pageActiveClass} aria-current="page">
          1
        </button>
        <button type="button" className={pageInactiveClass}>
          2
        </button>
        <button type="button" className={pageInactiveClass}>
          3
        </button>
        <button type="button" className={chevronBtnClass} aria-label="Page suivante">
          <span className="material-symbols-outlined text-xl leading-none">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  )
}
