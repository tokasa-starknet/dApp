"use client"

import type React from "react"

import Image from "next/image"
import { X, MapPin, BedDouble, Bath, SquareIcon, Calendar, Wifi, Utensils, Car, Tv, Snowflake } from "lucide-react"
import { Button } from "~~/components/tokasa/ui/button"
import { Progress } from "~~/components/tokasa/ui/progress"
import { Badge } from "~~/components/tokasa/ui/badge"
import type { VacationProperty } from "~~/types/vacation-property"

interface VacationPropertyDetailsDrawerProps {
  property: VacationProperty
  isOpen: boolean
  onClose: () => void
  onInvest: () => void
}

export function VacationPropertyDetailsDrawer({
  property,
  isOpen,
  onClose,
  onInvest,
}: VacationPropertyDetailsDrawerProps) {
  if (!isOpen) return null

  // Mapa de iconos para amenidades
  const amenityIcons: Record<string, React.ReactNode> = {
    Wifi: <Wifi className="h-4 w-4" />,
    "Cocina equipada": <Utensils className="h-4 w-4" />,
    Parking: <Car className="h-4 w-4" />,
    TV: <Tv className="h-4 w-4" />,
    "Aire acondicionado": <Snowflake className="h-4 w-4" />,
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-zinc-900 border-l border-zinc-800 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Detalles de la propiedad</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          <div className="relative h-60 w-full rounded-lg overflow-hidden mb-4">
            <Image
              src={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(property.title)}`}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>

          <h3 className="text-2xl font-bold mb-1 text-white">{property.title}</h3>
          <div className="flex items-center text-white/80 mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            {property.location}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-zinc-800 rounded-lg p-3">
              <p className="text-sm text-white/60">APR</p>
              <p className="text-xl font-bold text-green-400">{property.apr}%</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-3">
              <p className="text-sm text-white/60">Valor Token</p>
              <p className="text-xl font-bold text-white">${property.tokenPrice}</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-2 text-white">Descripción</h4>
            <p className="text-white/80">{property.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-zinc-800 rounded-lg p-3 text-center">
              <BedDouble className="h-5 w-5 mx-auto mb-1 text-white/60" />
              <p className="text-sm text-white/60">Habitaciones</p>
              <p className="font-medium text-white">{property.bedrooms}</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-3 text-center">
              <Bath className="h-5 w-5 mx-auto mb-1 text-white/60" />
              <p className="text-sm text-white/60">Baños</p>
              <p className="font-medium text-white">{property.bathrooms}</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-3 text-center">
              <SquareIcon className="h-5 w-5 mx-auto mb-1 text-white/60" />
              <p className="text-sm text-white/60">Área</p>
              <p className="font-medium text-white">{property.area} m²</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-2 text-white">Disponibilidad</h4>
            <div className="bg-zinc-800 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 mr-2 text-white/60" />
                <p className="text-white/80">Temporada alta: {property.highSeason}</p>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-white/60" />
                <p className="text-white/80">Temporada baja: {property.lowSeason}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-2 text-white">Amenidades</h4>
            <div className="grid grid-cols-2 gap-2">
              {property.amenities.map((amenity) => (
                <Badge
                  key={amenity}
                  variant="outline"
                  className="border-zinc-700 flex items-center gap-1 py-1.5 text-white"
                >
                  {amenityIcons[amenity] || null}
                  <span>{amenity}</span>
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-2 text-white">Financiación</h4>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white/80">Progreso: {property.funded}%</span>
              <span
                className={
                  property.funded >= 75 ? "text-green-400" : property.funded >= 50 ? "text-blue-400" : "text-yellow-400"
                }
              >
                {property.funded >= 75 ? "Avanzado" : property.funded >= 50 ? "En progreso" : "Inicial"}
              </span>
            </div>
            <Progress value={property.funded} className="h-2 mb-4 bg-zinc-800" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-white/60">Inversión mínima</p>
                <p className="font-medium text-white">${property.minInvestment}</p>
              </div>
              <div>
                <p className="text-sm text-white/60">Tokens disponibles</p>
                <p className="font-medium text-white">
                  {Math.floor(((100 - property.funded) / 100) * property.totalTokens)}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-2 text-white">Rendimiento histórico</h4>
            <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-white/80">Ocupación anual promedio</span>
                <span className="font-medium text-white">{property.occupancyRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Ingresos anuales estimados</span>
                <span className="font-medium text-white">${property.annualIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-zinc-700 pt-2">
                <span className="text-white">APR histórico</span>
                <span className="font-bold text-green-400">{property.apr}%</span>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 mb-6">
            <Button
              onClick={onInvest}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-6 text-lg"
            >
              Invertir Ahora
            </Button>
            <p className="text-xs text-white/60 text-center mt-2">
              Al invertir, aceptas los términos y condiciones de ToKasa y confirmas que has leído la documentación de la
              propiedad.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
