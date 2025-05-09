"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Save, ArrowLeft, User, CheckCircle, XCircle } from "lucide-react"

import { Button } from "~~/components/tokasa/ui/button"
import { Input } from "~~/components/tokasa/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~~/components/tokasa/ui/select"
import { Calendar } from "~~/components/tokasa/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "~~/components/tokasa/ui/popover"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~~/components/tokasa/ui/form"
import { cn } from "~~/lib/utils"

// Esquema de validación con Zod
const profileFormSchema = z.object({
  full_name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  email: z.string().email({ message: "Introduce un email válido" }),
  phone_number: z.string().min(9, { message: "Introduce un número de teléfono válido" }),
  nationality: z.string().min(1, { message: "Selecciona una nacionalidad" }),
  date_of_birth: z.date({
    required_error: "Selecciona una fecha de nacimiento",
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// Lista de nacionalidades comunes
const nationalities = [
  { value: "ar", label: "Argentina" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
  { value: "ca", label: "Canada" },
  { value: "cl", label: "Chile" },
  { value: "co", label: "Colombia" },
  { value: "cr", label: "Costa Rica" },
  { value: "de", label: "Germany" },
  { value: "es", label: "Spain" },
  { value: "fr", label: "France" },
  { value: "gb", label: "United Kingdom" },
  { value: "it", label: "Italy" },
  { value: "mx", label: "Mexico" },
  { value: "pe", label: "Peru" },
  { value: "pt", label: "Portugal" },
  { value: "us", label: "United States" },
  { value: "other", label: "Other" },
]

export default function ProfilePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{
    show: boolean
    type: "success" | "error"
    message: string
  } | null>(null)

  // Estado para controlar la apertura del calendario
  const [calendarOpen, setCalendarOpen] = useState(false)

  // Valores por defecto (podrían venir de una API en un caso real)
  const defaultValues: Partial<ProfileFormValues> = {
    full_name: "",
    email: "",
    phone_number: "",
    nationality: "",
    date_of_birth: undefined,
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para enviar los datos a la API
      console.log("Datos del formulario:", data)

      // Simulamos una petición a la API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mostrar notificación de éxito
      setNotification({
        show: true,
        type: "success",
        message: "Tu información ha sido actualizada correctamente.",
      })

      // Ocultar la notificación después de 3 segundos
      setTimeout(() => {
        setNotification(null)
        // Redirigir al usuario después de guardar
        router.push("/dashboard/admin")
      }, 3000)
    } catch (error) {
      console.error("Error al guardar el perfil:", error)

      // Mostrar notificación de error
      setNotification({
        show: true,
        type: "error",
        message: "No se pudo guardar la información. Inténtalo de nuevo.",
      })

      // Ocultar la notificación después de 3 segundos
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20">
            <User className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Información del Propietario
            </h1>
            <p className="text-white/70">Completa tu información personal para gestionar tus propiedades</p>
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introduce tu nombre completo"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 focus:border-purple-500"
                    />
                  </FormControl>
                  <FormMessage className="bg-red-900/20 border border-red-600"/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 focus:border-purple-500"
                    />
                  </FormControl>
                  <FormMessage className="bg-red-900/20 border border-red-600"/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de teléfono</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+34 600 000 000"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 focus:border-purple-500"
                    />
                  </FormControl>
                  <FormMessage className="bg-red-900/20 border border-red-600"/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nacionalidad</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Selecciona tu nacionalidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {nationalities.map((nationality) => (
                        <SelectItem key={nationality.value} value={nationality.value}>
                          {nationality.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="bg-red-900/20 border border-red-600"/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal bg-zinc-800 border-zinc-700",
                            !field.value ? "text-muted-foreground" : "text-white",
                          )}
                          onClick={() => setCalendarOpen(true)}
                          type="button"
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy", { locale: es })
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-zinc-800 border-zinc-700" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date)
                          setCalendarOpen(false)
                        }}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                        className="bg-zinc-800"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="bg-red-900/20 border border-red-600"/>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4 pt-4">
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
                    Guardando...
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Guardar Perfil
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
