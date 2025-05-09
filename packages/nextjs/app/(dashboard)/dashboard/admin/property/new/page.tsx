"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  ArrowLeft,
  Building,
  Save,
  Plus,
  X,
  CheckCircle,
  XCircle,
  MapPin,
  DollarSign,
  Percent,
  Coins,
  BarChart3,
} from "lucide-react"

import { Button } from "~~/components/tokasa/ui/button"
import { Input } from "~~/components/tokasa/ui/input"
import { Textarea } from "~~/components/tokasa/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~~/components/tokasa/ui/form"
import { Badge } from "~~/components/tokasa/ui/badge"

// Esquema de validación con Zod
const propertyFormSchema = z.object({
  title: z.string().min(3, { message: "El título debe tener al menos 3 caracteres" }),
  description: z.string().min(20, { message: "La descripción debe tener al menos 20 caracteres" }),
  address: z.string().min(5, { message: "La dirección es obligatoria" }),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  area: z.string().optional(),
  amenities: z.array(z.string()).default([]),
  estimatedValue: z.string().min(1, { message: "El valor estimado es obligatorio" }),
  tokenizablePercentage: z.string().min(1, { message: "El porcentaje tokenizable es obligatorio" }),
  totalTokens: z.string().min(1, { message: "El total de tokens es obligatorio" }),
  tokenPrice: z.string().min(1, { message: "El precio por token es obligatorio" }),
  expectedReturn: z.string().optional(),
}).transform((data) => ({
  ...data,
  amenities: data.amenities || [],
}))

type PropertyFormValues = z.infer<typeof propertyFormSchema>

export default function NewPropertyPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newAmenity, setNewAmenity] = useState("")
  const [notification, setNotification] = useState<{
    show: boolean
    type: "success" | "error"
    message: string
  } | null>(null)

  // Valores por defecto
  const defaultValues: Partial<PropertyFormValues> = {
    title: "",
    description: "",
    address: "",
    latitude: "",
    longitude: "",
    area: "",
    amenities: [],
    estimatedValue: "",
    tokenizablePercentage: "100",
    totalTokens: "1000",
    tokenPrice: "",
    expectedReturn: "",
  }

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema) as any,
    defaultValues,
  })

  const { watch, setValue } = form
  const amenities = watch("amenities")

  const addAmenity = () => {
    if (newAmenity.trim() !== "" && !amenities.includes(newAmenity.trim())) {
      setValue("amenities", [...amenities, newAmenity.trim()])
      setNewAmenity("")
    }
  }

  const removeAmenity = (amenity: string) => {
    setValue(
      "amenities",
      amenities.filter((a) => a !== amenity),
    )
  }

  async function onSubmit(data: PropertyFormValues) {
    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para enviar los datos a la API
      console.log("Datos del formulario:", data)

      // Simulamos una petición a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mostrar notificación de éxito
      setNotification({
        show: true,
        type: "success",
        message: "La propiedad ha sido registrada correctamente.",
      })

      // Ocultar la notificación después de 3 segundos
      setTimeout(() => {
        setNotification(null)
        // Redirigir al usuario después de guardar
        router.push("/dashboard/admin")
      }, 3000)
    } catch (error) {
      console.error("Error al registrar la propiedad:", error)

      // Mostrar notificación de error
      setNotification({
        show: true,
        type: "error",
        message: "No se pudo registrar la propiedad. Inténtalo de nuevo.",
      })

      // Ocultar la notificación después de 3 segundos
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calcular automáticamente el precio por token cuando cambia el valor estimado o el porcentaje tokenizable
  const calculateTokenPrice = () => {
    const estimatedValue = Number.parseFloat(form.watch("estimatedValue") || "0")
    const tokenizablePercentage = Number.parseFloat(form.watch("tokenizablePercentage") || "0")
    const totalTokens = Number.parseInt(form.watch("totalTokens") || "0")

    if (estimatedValue > 0 && tokenizablePercentage > 0 && totalTokens > 0) {
      const tokenizableValue = (estimatedValue * tokenizablePercentage) / 100
      const tokenPrice = tokenizableValue / totalTokens
      form.setValue("tokenPrice", tokenPrice.toFixed(2))
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20">
            <Building className="h-8 w-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Registrar Nueva Propiedad
            </h1>
            <p className="text-white/70">Completa la información para tokenizar una nueva propiedad</p>
          </div>
        </div>
      </div>

      {/* Notificación */}
      {notification && notification.show && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center ${
            notification.type === "success"
              ? "bg-green-900/20 border border-green-600"
              : "bg-red-900/20 border border-red-600"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500 mr-2" />
          )}
          <p className={notification.type === "success" ? "text-green-100" : "text-red-100"}>{notification.message}</p>
        </div>
      )}

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6 md:col-span-2">
                <h2 className="text-xl font-semibold flex items-center">
                  <Building className="mr-2 h-5 w-5 text-purple-400" />
                  Información Básica
                </h2>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título de la propiedad</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: Villa Miramar"
                          {...field}
                          className="bg-zinc-800 border-zinc-700 focus:border-purple-500"
                        />
                      </FormControl>
                      <FormDescription>Nombre comercial o título de la propiedad</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe la propiedad con detalle..."
                          {...field}
                          className="bg-zinc-800 border-zinc-700 focus:border-purple-500 min-h-32 resize-y"
                        />
                      </FormControl>
                      <FormDescription>Incluye características, ubicación y atractivos</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6 md:col-span-2">
                <h2 className="text-xl font-semibold flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-purple-400" />
                  Ubicación y Características
                </h2>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección física</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Calle, número, ciudad, país..."
                          {...field}
                          className="bg-zinc-800 border-zinc-700 focus:border-purple-500"
                        />
                      </FormControl>
                      <FormDescription>Dirección completa de la propiedad</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitud (opcional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: 41.3851"
                            {...field}
                            className="bg-zinc-800 border-zinc-700 focus:border-purple-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitud (opcional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: 2.1734"
                            {...field}
                            className="bg-zinc-800 border-zinc-700 focus:border-purple-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Área en m² (opcional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ej: 120"
                          {...field}
                          className="bg-zinc-800 border-zinc-700 focus:border-purple-500"
                        />
                      </FormControl>
                      <FormDescription>Superficie total de la propiedad</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Amenidades</FormLabel>
                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      placeholder="Añadir amenidad (ej: Piscina)"
                      value={newAmenity}
                      onChange={(e) => setNewAmenity(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 focus:border-purple-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addAmenity()
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={addAmenity}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {amenities.map((amenity, index) => (
                      <Badge
                        key={index}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-1 pl-3"
                      >
                        {amenity}
                        <button
                          type="button"
                          onClick={() => removeAmenity(amenity)}
                          className="ml-1 rounded-full hover:bg-zinc-600 p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormDescription>Características y servicios de la propiedad</FormDescription>
                </div>
              </div>

              <div className="space-y-6 md:col-span-2">
                <h2 className="text-xl font-semibold flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-purple-400" />
                  Información Financiera
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="estimatedValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor estimado (USD)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ej: 500000"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              calculateTokenPrice()
                            }}
                            className="bg-zinc-800 border-zinc-700 focus:border-purple-500"
                          />
                        </FormControl>
                        <FormDescription>Valor de mercado de la propiedad</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tokenizablePercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Porcentaje tokenizable (%)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              min="1"
                              max="100"
                              placeholder="Ej: 100"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                calculateTokenPrice()
                              }}
                              className="bg-zinc-800 border-zinc-700 focus:border-purple-500 pr-8"
                            />
                            <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                          </div>
                        </FormControl>
                        <FormDescription>Porcentaje de la propiedad a tokenizar</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="totalTokens"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total de tokens</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              min="1"
                              placeholder="Ej: 1000"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                calculateTokenPrice()
                              }}
                              className="bg-zinc-800 border-zinc-700 focus:border-purple-500 pr-8"
                            />
                            <Coins className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                          </div>
                        </FormControl>
                        <FormDescription>Cantidad total de tokens a emitir</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tokenPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio por token (USD)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="Ej: 500"
                              {...field}
                              className="bg-zinc-800 border-zinc-700 focus:border-purple-500 pr-8"
                            />
                            <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                          </div>
                        </FormControl>
                        <FormDescription>Precio inicial por token</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="expectedReturn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rendimiento anual esperado (%) (opcional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="Ej: 7.5"
                            {...field}
                            className="bg-zinc-800 border-zinc-700 focus:border-purple-500 pr-8"
                          />
                          <BarChart3 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                        </div>
                      </FormControl>
                      <FormDescription>Proyección de rentabilidad anual</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-zinc-800">
              <Button type="button" variant="outline" onClick={() => router.back()} className="border-zinc-700">
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                    Registrando...
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Registrar Propiedad
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
