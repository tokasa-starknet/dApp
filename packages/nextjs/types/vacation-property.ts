export interface VacationProperty {
  id: string
  title: string
  description: string
  location: string
  image: string
  imageUrl?: string // Nuevo campo para la imagen estándar
  category: string
  type: "beach" | "mountain" | "city" | "rural"
  bedrooms: number
  bathrooms: number
  area: number
  amenities: string[]
  apr: number
  tokenPrice: number
  funded: number
  minInvestment: number
  totalTokens: number
  availableTokens: number
  highSeason: string
  lowSeason: string
  occupancyRate: number
  annualIncome: number
}
