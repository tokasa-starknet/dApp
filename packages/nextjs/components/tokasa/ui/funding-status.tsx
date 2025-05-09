interface FundingStatusProps {
  funded: number
  className?: string
}

export function FundingStatus({ funded, className }: FundingStatusProps) {
  let statusColor = "text-yellow-500"
  let statusText = "En progreso"

  if (funded >= 100) {
    statusColor = "text-green-500"
    statusText = "Completado"
  } else if (funded >= 75) {
    statusColor = "text-blue-500"
    statusText = "Avanzado"
  } else if (funded <= 25) {
    statusColor = "text-red-500"
    statusText = "Inicial"
  }

  return <span className={`${statusColor} ${className}`}>{statusText}</span>
}
