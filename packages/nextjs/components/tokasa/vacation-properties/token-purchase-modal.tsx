"use client"

import { useState, useEffect } from "react"
import { X, Coins, Calculator, CreditCard } from "lucide-react"
import { Button } from "~~/components/tokasa/ui/button"
import { Input } from "~~/components/tokasa/ui/input"
import { Slider } from "~~/components/tokasa/ui/slider"
import type { VacationProperty } from "~~/types/vacation-property"

interface TokenPurchaseModalProps {
  property: VacationProperty
  isOpen: boolean
  onClose: () => void
  onConfirm: (tokens: number, amount: number) => void
}

export function TokenPurchaseModal({ property, isOpen, onClose, onConfirm }: TokenPurchaseModalProps) {
  const [tokens, setTokens] = useState(1)
  const [amount, setAmount] = useState(property.tokenPrice)
  const maxTokens = Math.min(
    Math.floor(property.availableTokens),
    Math.floor(10000 / property.tokenPrice), // Límite arbitrario de $10,000
  )

  // Actualizar el monto cuando cambia la cantidad de tokens
  useEffect(() => {
    setAmount(tokens * property.tokenPrice)
  }, [tokens, property.tokenPrice])

  // Actualizar los tokens cuando cambia el monto
  const handleAmountChange = (value: number) => {
    const newAmount = Math.max(property.tokenPrice, Math.min(maxTokens * property.tokenPrice, value))
    setAmount(newAmount)
    setTokens(Math.floor(newAmount / property.tokenPrice))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/70" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Invertir en {property.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white/70 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80">Valor por token:</span>
              <span className="font-bold text-white">${property.tokenPrice}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Tokens disponibles:</span>
              <span className="font-bold text-white">{Math.floor(property.availableTokens)}</span>
            </div>
          </div>

          <div>
            <label htmlFor="tokens" className="block text-sm font-medium text-white/80 mb-2">
              Cantidad de tokens a comprar
            </label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="border-zinc-700 bg-zinc-800 text-white"
                onClick={() => setTokens(Math.max(1, tokens - 1))}
                disabled={tokens <= 1}
              >
                -
              </Button>
              <Input
                id="tokens"
                type="number"
                min={1}
                max={maxTokens}
                value={tokens}
                onChange={(e) => setTokens(Math.min(maxTokens, Math.max(1, Number.parseInt(e.target.value) || 1)))}
                className="bg-zinc-800 border-zinc-700 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                className="border-zinc-700 bg-zinc-800 text-white"
                onClick={() => setTokens(Math.min(maxTokens, tokens + 1))}
                disabled={tokens >= maxTokens}
              >
                +
              </Button>
            </div>
            <div className="mt-4">
              <Slider
                value={[tokens]}
                min={1}
                max={maxTokens}
                step={1}
                onValueChange={(value) => setTokens(value[0])}
              />
              <div className="flex justify-between text-xs text-white/60 mt-1">
                <span>1 token</span>
                <span>{maxTokens} tokens</span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-white/80 mb-2">
              Monto total a invertir
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">$</span>
              <Input
                id="amount"
                type="number"
                min={property.tokenPrice}
                max={maxTokens * property.tokenPrice}
                value={amount}
                onChange={(e) => handleAmountChange(Number.parseFloat(e.target.value) || property.tokenPrice)}
                className="bg-zinc-800 border-zinc-700 pl-8"
              />
            </div>
          </div>

          <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Coins className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-white/80">Tokens:</span>
              </div>
              <span className="font-bold text-white">{tokens}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calculator className="h-4 w-4 mr-2 text-green-400" />
                <span className="text-white/80">Retorno anual estimado:</span>
              </div>
              <span className="font-bold text-green-400">${((amount * property.apr) / 100).toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-zinc-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-purple-400" />
                  <span className="text-white">Total a pagar:</span>
                </div>
                <span className="font-bold text-white">${amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 border-zinc-700 bg-zinc-800 text-white" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => onConfirm(tokens, amount)}
            >
              Confirmar compra
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
