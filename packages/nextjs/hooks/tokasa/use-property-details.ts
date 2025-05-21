"use client"

import { useState, useCallback } from "react"
import type { Property } from "~~/types"

export function usePropertyDetails() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [investmentAmount, setInvestmentAmount] = useState(0)

  const openPropertyDetails = useCallback((property: Property) => {
    setSelectedProperty(property)
    setIsDrawerOpen(true)
    setInvestmentAmount(property.minInvestment)
  }, [])

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false)
    setSelectedProperty(null)
  }, [])

  const handleInvestmentAmountChange = useCallback((amount: number) => {
    setInvestmentAmount(amount)
  }, [])

  const handleInvest = useCallback(() => {
    if (!selectedProperty) return

    alert(`Inversión de €${investmentAmount.toLocaleString()} en ${selectedProperty.name} procesada con éxito!`)
    // Aquí iría la lógica para procesar la inversión con smart contracts
  }, [selectedProperty, investmentAmount])

  // Función para calcular tokens basados en la inversión
  const calculateTokens = useCallback((amount: number, property: Property) => {
    return Math.floor((amount / property.price) * 1000)
  }, [])

  // Función para calcular retorno anual estimado
  const calculateEstimatedReturn = useCallback((amount: number, property: Property) => {
    return (amount * property.return) / 100
  }, [])

  return {
    selectedProperty,
    isDrawerOpen,
    investmentAmount,
    openPropertyDetails,
    closeDrawer,
    handleInvestmentAmountChange,
    handleInvest,
    calculateTokens,
    calculateEstimatedReturn,
  }
}
