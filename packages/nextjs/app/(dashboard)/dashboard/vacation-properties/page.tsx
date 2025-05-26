"use client"

import { useState } from "react"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { Input } from "~~/components/tokasa/ui/input"
import { Button } from "~~/components/tokasa/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~~/components/tokasa/ui/tabs"
import { VacationPropertyCard } from "~~/components/tokasa/vacation-properties/vacation-property-card"
import { VacationPropertyFilters } from "~~/components/tokasa/vacation-properties/vacation-property-filters"
import { VacationPropertyDetailsDrawer } from "~~/components/tokasa/vacation-properties/vacation-property-details-drawer"
import { TokenPurchaseModal } from "~~/components/tokasa/vacation-properties/token-purchase-modal"
import { useVacationProperties } from "~~/hooks/tokasa/use-vacation-properties"

export default function VacationPropertiesPage() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const {
    properties,
    filteredProperties,
    searchQuery,
    setSearchQuery,
    selectedProperty,
    isDetailsOpen,
    isPurchaseModalOpen,
    openPropertyDetails,
    closePropertyDetails,
    investInProperty,
    closePurchaseModal,
    confirmPurchase,
  } = useVacationProperties()

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h1 className="text-2xl font-bold">Vacation Properties</h1>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search properties..."
              className="pl-10 bg-zinc-900 border-zinc-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="border-zinc-800 bg-zinc-800 text-white hover:bg-zinc-700"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {isFiltersOpen && <VacationPropertyFilters />}

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-zinc-900 border border-zinc-800">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="beach">Beach</TabsTrigger>
            <TabsTrigger value="mountain">Mountain</TabsTrigger>
            <TabsTrigger value="city">City</TabsTrigger>
            <TabsTrigger value="rural">Rural</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Sort by: </span>
            <select className="bg-zinc-900 border border-zinc-800 rounded-md px-2 py-1">
              <option value="apr-desc">Highest APR</option>
              <option value="apr-asc">Lowest APR</option>
              <option value="price-desc">Highest price</option>
              <option value="price-asc">Lowest price</option>
            </select>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <VacationPropertyCard
                key={property.id}
                property={property}
                onViewDetails={() => openPropertyDetails(property)}
                onInvest={() => investInProperty(property)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="beach" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties
              .filter((property) => property.type === "beach")
              .map((property) => (
                <VacationPropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={() => openPropertyDetails(property)}
                  onInvest={() => investInProperty(property)}
                />
              ))}
          </div>
        </TabsContent>

        {/* Contenido similar para otras pestañas */}
        <TabsContent value="mountain" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties
              .filter((property) => property.type === "mountain")
              .map((property) => (
                <VacationPropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={() => openPropertyDetails(property)}
                  onInvest={() => investInProperty(property)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="city" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties
              .filter((property) => property.type === "city")
              .map((property) => (
                <VacationPropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={() => openPropertyDetails(property)}
                  onInvest={() => investInProperty(property)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="rural" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties
              .filter((property) => property.type === "rural")
              .map((property) => (
                <VacationPropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={() => openPropertyDetails(property)}
                  onInvest={() => investInProperty(property)}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Drawer de detalles de la propiedad */}
      {selectedProperty && (
        <VacationPropertyDetailsDrawer
          property={selectedProperty}
          isOpen={isDetailsOpen}
          onClose={closePropertyDetails}
          onInvest={() => investInProperty(selectedProperty)}
        />
      )}

      {/* Modal de compra de tokens */}
      {selectedProperty && (
        <TokenPurchaseModal
          property={selectedProperty}
          isOpen={isPurchaseModalOpen}
          onClose={closePurchaseModal}
          onConfirm={confirmPurchase}
        />
      )}
    </div>
  )
}
