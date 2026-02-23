"use client"

import React, { useEffect } from "react"

export default function CartPopup({
  quantity = 1,
  size = "",
  name = "",
  oilType = "", // soyabean | mustard | groundnut etc
  onClose = () => {},
}: {
  quantity?: number
  size?: string
  name?: string
  oilType?: string
  onClose?: () => void
}) {
  useEffect(() => {
    const t = setTimeout(() => onClose(), 2200)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed right-6 bottom-24 z-50 pointer-events-none">
      <div className="relative bg-white/90 backdrop-blur-md border border-amber-200 rounded-xl px-5 py-4 shadow-xl w-[300px] animate-cart-container">

        {/* Oil Can */}
        <div className="absolute -top-8 left-4 text-3xl animate-can-tilt">
          🫙
        </div>

        {/* Oil Stream */}
        <div className="absolute top-4 left-[38px] w-2 h-20 rounded-full animate-oil-pour bg-gradient-to-b from-yellow-400 to-amber-600" />

        {/* Cart */}
        <div className="absolute bottom-2 right-4 text-3xl animate-cart-bounce">
          🛒
        </div>

        {/* Text */}
        <div className="pt-8 text-sm">
          <div className="font-semibold text-amber-900">
            {name} poured into your cart
          </div>
          <div className="text-amber-700 mt-1">
            {quantity} × {size}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes containerPop {
          0% { opacity: 0; transform: translateY(12px) scale(.96) }
          10% { opacity: 1; transform: translateY(0) scale(1) }
          85% { opacity: 1 }
          100% { opacity: 0; transform: translateY(-16px) scale(.98) }
        }

        @keyframes canTilt {
          0% { transform: rotate(0deg) }
          20% { transform: rotate(-25deg) }
          80% { transform: rotate(-25deg) }
          100% { transform: rotate(0deg) }
        }

        @keyframes oilPour {
          0% { height: 0; opacity: 0 }
          20% { height: 0; opacity: 1 }
          50% { height: 70px; opacity: 1 }
          80% { height: 70px; opacity: 0.8 }
          100% { height: 0; opacity: 0 }
        }

        @keyframes cartBounce {
          0%, 100% { transform: translateY(0) }
          50% { transform: translateY(-6px) }
        }

        .animate-cart-container {
          animation: containerPop 2.2s cubic-bezier(.2,.9,.3,1) forwards;
        }

        .animate-can-tilt {
          animation: canTilt 2s ease-in-out forwards;
        }

        .animate-oil-pour {
          animation: oilPour 2s ease-in-out forwards;
        }

        .animate-cart-bounce {
          animation: cartBounce .8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}