"use client"

import { useState, useCallback, useMemo } from "react"
import type { PropertyFilters } from "~~/types"
import { vacationPropertiesData } from "~~/data/vacation-properties"

export function usePropertyFilters() {
  const [filters, setFilters] = useState<PropertyFilters>({
    searchQuery: "",
    priceRange: [300000, 600000],
    returnRange: [6, 9],
    selectedLocations: [],
    selectedTypes: [],
  })

  const updateSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }))
  }, [])

  const updatePriceRange = useCallback((range: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: range }))
  }, [])

  const updateReturnRange = useCallback((range: [number, number]) => {
    setFilters((prev) => ({ ...prev, returnRange: range }))
  }, [])

  const toggleLocation = useCallback((location: string) => {
    setFilters((prev) => {
      if (prev.selectedLocations.includes(location)) {
        return {
          ...prev,
          selectedLocations: prev.selectedLocations.filter((l) => l !== location),
        }
      } else {
        return {
          ...prev,
          selectedLocations: [...prev.selectedLocations, location],
        }
      }
    })
  }, [])

  const toggleType = useCallback((type: string) => {
    setFilters((prev) => {
      if (prev.selectedTypes.includes(type)) {
        return {
          ...prev,
          selectedTypes: prev.selectedTypes.filter((t) => t !== type),
        }
      } else {
        return {
          ...prev,
          selectedTypes: [...prev.selectedTypes, type],
        }
      }
    })
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({
      searchQuery: "",
      priceRange: [300000, 600000],
      returnRange: [6, 9],
      selectedLocations: [],
      selectedTypes: [],
    })
  }, [])

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Filtro por búsqueda
      if (
        filters.searchQuery &&
        !property.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !property.location.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false
      }

      // Filtro por rango de precio
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false
      }

      // Filtro por rango de retorno
      if (property.return < filters.returnRange[0] || property.return > filters.returnRange[1]) {
        return false
      }

      // Filtro por ubicación
      if (
        filters.selectedLocations.length > 0 &&
        !filters.selectedLocations.some((loc) => property.location.includes(loc))
      ) {
        return false
      }

      // Filtro por tipo
      if (filters.selectedTypes.length > 0 && !filters.selectedTypes.includes(property.type)) {
        return false
      }

      return true
    })
  }, [filters])

  return {
    filters,
    filteredProperties,
    updateSearchQuery,
    updatePriceRange,
    updateReturnRange,
    toggleLocation,
    toggleType,
    resetFilters,
  }
}
