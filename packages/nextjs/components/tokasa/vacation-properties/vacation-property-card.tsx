"use client"

import Image from "next/image"
import { MapPin, BedDouble, Bath, SquareIcon, Coins, BarChart3 } from "lucide-react"
import { Badge } from "~~/components/tokasa/ui/badge"
import { Button } from "~~/components/tokasa/ui/button"
import { Progress } from "~~/components/tokasa/ui/progress"
import { Card, CardContent, CardFooter } from "~~/components/tokasa/ui/card"
import type { VacationProperty } from "~~/types/vacation-property"

interface VacationPropertyCardProps {
  property: VacationProperty
  onViewDetails: () => void
  onInvest: () => void
}

export function VacationPropertyCard({ property, onViewDetails, onInvest }: VacationPropertyCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors">
      <div className="relative h-48 w-full cursor-pointer" onClick={onViewDetails}>
        <Image
          src={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(property.title)}`}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-purple-600">{property.category}</Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-xl font-bold text-white">{property.title}</h3>
          <div className="flex items-center text-white/80 text-sm">
            <MapPin className="h-3 w-3 mr-1" />
            {property.location}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-zinc-800 rounded-lg p-3 flex flex-col items-center justify-center">
            <div className="flex items-center text-sm text-white/60 mb-1">
              <BarChart3 className="h-4 w-4 mr-1 text-green-400" />
              <span>APR</span>
            </div>
            <p className="text-xl font-bold text-green-400">{property.apr}%</p>
          </div>

          <div className="bg-zinc-800 rounded-lg p-3 flex flex-col items-center justify-center">
            <div className="flex items-center text-sm text-white/60 mb-1">
              <Coins className="h-4 w-4 mr-1 text-blue-400" />
              <span>Valor Token</span>
            </div>
            <p className="text-xl font-bold text-white">${property.tokenPrice}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm mb-2 text-white">
          <div className="flex items-center">
            <BedDouble className="h-4 w-4 mr-1 text-white/60" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-white/60" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <SquareIcon className="h-4 w-4 mr-1 text-white/60" />
            <span>{property.area} m²</span>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white/80">Financiación: {property.funded}%</span>
            <span
              className={
                property.funded >= 75 ? "text-green-400" : property.funded >= 50 ? "text-blue-400" : "text-yellow-400"
              }
            >
              {property.funded >= 75 ? "Avanzado" : property.funded >= 50 ? "En progreso" : "Inicial"}
            </span>
          </div>
          <Progress value={property.funded} className="h-2 bg-zinc-800" />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={onInvest}
        >
          Invertir
        </Button>
        <Button
          variant="outline"
          className="w-full border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700"
          onClick={onViewDetails}
        >
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  )
}
