import type React from "react"

export default function SystemColors({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="uppercase terminal bg-black text-white">{children}</div>
  )
}
