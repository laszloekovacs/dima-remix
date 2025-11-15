import type React from "react"

export const Centered = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center p-6 min-h-screen overflow-hidden">
      {children}
    </div>
  )
}

export default function HydrateFallback() {
  return (
    <Centered>
      <div className="border-2 border-amber-600 p-4">
        <p>Обработка</p>
      </div>

      <div className="border-2 border-amber-600 p-4">
        <p>Bejövő Adatok Feldolgozása Folyamatban</p>
      </div>
    </Centered>
  )
}
