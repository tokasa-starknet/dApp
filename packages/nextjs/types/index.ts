// Tipos para propiedades
export interface Property {
  id: string
  name: string
  location: string
  price: number
  minInvestment: number
  return: number
  funded: number
  image: string
  description: string
  bedrooms: number
  bathrooms: number
  area: number
  yearBuilt: number
  type: string
  rating: number
  amenities: string[]
  documents: { name: string; url: string }[]
  financials: {
    rentalIncome: number
    expenses: number
    netIncome: number
    appreciation: number
  }
}

// Tipos para el portafolio
export interface Investment {
  propertyId: string
  amount: number
  tokens: number
  purchaseDate: string
  currentValue: number
}

export interface Transaction {
  id: string
  type: "purchase" | "dividend" | "sale"
  propertyId: string
  amount: number
  tokens?: number
  date: string
}

export interface Portfolio {
  totalInvested: number
  totalProperties: number
  totalReturn: number
  annualYield: number
  investments: Investment[]
  transactions: Transaction[]
}

// Tipos para filtros
export interface PropertyFilters {
  searchQuery: string
  priceRange: [number, number]
  returnRange: [number, number]
  selectedLocations: string[]
  selectedTypes: string[]
}
