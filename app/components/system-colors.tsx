import type React from "react"

export default function SystemColors({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-black text-green-500 text-5xl font-display">
      {children}
    </div>
  )
}
