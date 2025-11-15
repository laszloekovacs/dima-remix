import type React from "react"

export const Centered = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center p-6 min-h-screen overflow-hidden">
      {children}
    </div>
  )
}

export const ConstrainScreen = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="grid place-content-center bg-amber-950 min-h-screen">
      <div className="w-[640px] h-[480px] bg-amber-800 p-2 text-amber-400">
        {children}
      </div>
    </div>
  )
}

// fake loading screen

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
