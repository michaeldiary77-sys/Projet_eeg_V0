import { ReactNode } from 'react'

interface KpiCardProps {
  label: string
  value: string | number
  icon: ReactNode
  secondaryInfo: string
  variant: 'warning' | 'secondary' | 'primary' | 'success'
}

const variantStyles = {
  warning: 'border-l-4 border-orange-500 bg-orange-50',
  secondary: 'border-l-4 border-blue-500 bg-blue-50',
  primary: 'border-l-4 border-purple-500 bg-purple-50',
  success: 'border-l-4 border-green-500 bg-green-50',
}

const iconColorStyles = {
  warning: 'text-orange-600',
  secondary: 'text-blue-600',
  primary: 'text-purple-600',
  success: 'text-green-600',
}

export default function KpiCard({
  label,
  value,
  icon,
  secondaryInfo,
  variant,
}: KpiCardProps) {
  return (
    <div
      className={`rounded-lg p-6 bg-white shadow-sm border border-gray-100 ${variantStyles[variant]}`}
    >
      {/* En-tête : icône et label */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
        </div>
        <div className={`${iconColorStyles[variant]}`}>
          {icon}
        </div>
      </div>

      {/* Valeur principale */}
      <div className="mb-3">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>

      {/* Information secondaire */}
      <p className="text-xs text-gray-500">{secondaryInfo}</p>
    </div>
  )
}
