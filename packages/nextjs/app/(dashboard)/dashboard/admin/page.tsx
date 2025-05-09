"use client"

import { UserCog, Plus, Building } from "lucide-react"
import { Button } from "~~/components/tokasa/ui/button"
import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Panel de Administración
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto">
          Gestiona tu perfil y tus propiedades vacacionales desde este panel de control.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Botón de Crear/Editar Perfil */}
        <div className="group relative">
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur group-hover:opacity-100 transition duration-300"></div>
          <Link href="/dashboard/admin/profile" className="block relative h-full">
            <div className="relative h-full rounded-xl bg-zinc-900 p-8 flex flex-col items-center justify-center text-center border border-zinc-800 group-hover:border-transparent transition-colors">
              <div className="mb-6 p-6 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-colors">
                <UserCog className="h-16 w-16 text-blue-400 group-hover:text-blue-300 transition-colors" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Crear/Editar Perfil</h2>
              <p className="text-white/70 mb-6">
                Actualiza tu información personal, datos de contacto y preferencias de inversión.
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <UserCog className="mr-2 h-5 w-5" /> Gestionar Perfil
              </Button>
            </div>
          </Link>
        </div>

        {/* Botón de Agregar Inmueble Vacacional */}
        <div className="group relative">
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur group-hover:opacity-100 transition duration-300"></div>
          <Link href="/dashboard/admin/property/new" className="block relative h-full">
            <div className="relative h-full rounded-xl bg-zinc-900 p-8 flex flex-col items-center justify-center text-center border border-zinc-800 group-hover:border-transparent transition-colors">
              <div className="mb-6 p-6 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-colors">
                <Building className="h-16 w-16 text-purple-400 group-hover:text-purple-300 transition-colors" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Agregar Inmueble Vacacional</h2>
              <p className="text-white/70 mb-6">
                Registra una nueva propiedad para tokenizar y ofrecer a los inversores.
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="mr-2 h-5 w-5" /> Añadir Propiedad
              </Button>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-white/60 mb-4">¿Necesitas ayuda para gestionar tus propiedades?</p>
        <Button variant="outline" className="border-purple-500 text-white hover:bg-purple-500/10">
          Contactar con Soporte
        </Button>
      </div>
    </div>
  )
}
