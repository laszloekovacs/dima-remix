import type React from "react"
/*
export const Centered = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center p-6 min-h-screen overflow-hidden">
      {children}
    </div>
  )
}
*/
export default function HydrateFallback() {
  return (
    <div className="min-h-screen min-w-screen bg-amber-950 overflow-hidden">
      <div className="text-amber-500">
        <p>Обработка</p>
        <p>Bejövő Adatok Feldolgozása Folyamatban</p>
      </div>
    </div>
  )
}
