import { Slider } from "~~/components/tokasa/ui/slider"
import { Badge } from "~~/components/tokasa/ui/badge"
import { Button } from "~~/components/tokasa/ui/button"
import { cn } from "~~/lib/utils"

export function VacationPropertyFilters() {
  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <h3 className="text-sm font-medium mb-3">Rango de precio por token</h3>
        <div className="px-2">
          <Slider defaultValue={[50, 500]} min={10} max={1000} step={10} />
        </div>
        <div className="flex justify-between mt-2 text-sm text-white/70">
          <span>$50</span>
          <span>$500</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">APR (%)</h3>
        <div className="px-2">
          <Slider defaultValue={[5, 12]} min={0} max={20} step={0.5} />
        </div>
        <div className="flex justify-between mt-2 text-sm text-white/70">
          <span>5%</span>
          <span>12%</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Ubicación</h3>
        <div className="flex flex-wrap gap-2">
          {["España", "México", "Colombia", "Portugal", "Italia"].map((location) => (
            <Badge
              key={location}
              variant="outline"
              className={cn("cursor-pointer border-zinc-700 hover:border-zinc-600")}
            >
              {location}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Amenidades</h3>
        <div className="flex flex-wrap gap-2">
          {["Piscina", "Playa", "Wifi", "Terraza", "Jardín"].map((amenity) => (
            <Badge
              key={amenity}
              variant="outline"
              className={cn("cursor-pointer border-zinc-700 hover:border-zinc-600")}
            >
              {amenity}
            </Badge>
          ))}
        </div>
      </div>

      <div className="md:col-span-4 flex justify-end gap-2 pt-2 border-t border-zinc-800">
        <Button variant="outline" className="border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700">
          Limpiar filtros
        </Button>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Aplicar filtros
        </Button>
      </div>
    </div>
  )
}
