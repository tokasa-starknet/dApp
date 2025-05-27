"use client"

import { useState, useEffect } from "react"
import { useToast } from "~~/hooks/use-toast"
import type { VacationProperty } from "~~/types/vacation-property"
import { vacationPropertiesData } from "~~/data/vacation-properties"
import { useKasaSale } from "./use-kasa-sale"

export function useVacationProperties() {
  const [properties, setProperties] = useState<VacationProperty[]>([])
  const [filteredProperties, setFilteredProperties] = useState<VacationProperty[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProperty, setSelectedProperty] = useState<VacationProperty | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const { toast } = useToast()
  const { executeBuy } = useKasaSale()

  // Cargar datos iniciales
  useEffect(() => {
    // Asignar porcentajes aleatorios a las propiedades
    const propertiesWithRandomFunding = vacationPropertiesData.map((property) => ({
      ...property,
      funded: property.funded, // Mantener los porcentajes ya asignados
    }))

    setProperties(propertiesWithRandomFunding)
    setFilteredProperties(propertiesWithRandomFunding)
  }, [])

  // Filtrar propiedades cuando cambia la búsqueda
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProperties(properties)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = properties.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query),
      )
      setFilteredProperties(filtered)
    }
  }, [searchQuery, properties])

  // Abrir detalles de la propiedad
  const openPropertyDetails = (property: VacationProperty) => {
    setSelectedProperty(property)
    setIsDetailsOpen(true)
  }

  // Cerrar detalles de la propiedad
  const closePropertyDetails = () => {
    setIsDetailsOpen(false)
    setTimeout(() => setSelectedProperty(null), 300) // Esperar a que se cierre la animación
  }

  // Abrir modal de compra de tokens
  const openPurchaseModal = (property: VacationProperty) => {
    setSelectedProperty(property)
    setIsPurchaseModalOpen(true)
  }

  // Cerrar modal de compra de tokens
  const closePurchaseModal = () => {
    setIsPurchaseModalOpen(false)
  }

  // Invertir en una propiedad (abrir modal de compra)
  const investInProperty = (property: VacationProperty) => {
    openPurchaseModal(property)
  }

  // Confirmar compra de tokens
  const confirmPurchase = async (tokens: number, amount: number) => {
    if (!selectedProperty) return

    try {
      // Llamar al contrato
      const success = await executeBuy(amount)

      if (success) {
        toast({
          title: "¡Compra exitosa!",
          description: `Has adquirido ${tokens} tokens de ${selectedProperty.title} por un total de $${amount.toFixed(2)}`,
        })

        // Cerrar el modal de compra
        closePurchaseModal()

        // Cerrar el drawer si está abierto
        if (isDetailsOpen) {
          closePropertyDetails()
        }
      } else {
        toast({
          title: "Error en la compra",
          description: "No se pudo completar la transacción",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error en la compra:", error)
      toast({
        title: "Error en la compra",
        description: "Ocurrió un error al procesar la transacción",
        variant: "destructive",
      })
    }
  }

  return {
    properties,
    filteredProperties,
    searchQuery,
    setSearchQuery,
    selectedProperty,
    isDetailsOpen,
    isPurchaseModalOpen,
    openPropertyDetails,
    closePropertyDetails,
    openPurchaseModal,
    closePurchaseModal,
    investInProperty,
    confirmPurchase,
  }
}
