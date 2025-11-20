import { useCallback } from "react"
import { useFetcher, useNavigate } from "react-router"
import { formatStopwatch, useCountdown } from "~/hooks/useCountdown"
import { db } from "~/utils/kvstore.server"
import type { Route } from "./+types/lockdown"

// Loader to fetch lockdown duration from KV store
export const loader = async () => {
  const lockdownDuration = await db.get("lockdownDuration")
  return {
    minutes: lockdownDuration ? parseInt(lockdownDuration, 10) : 1,
  }
}

export default function LockdownPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate()
  const fetcher = useFetcher()

  const handleTimeout = useCallback(() => {
    fetcher.submit({}, { method: "post", action: "/api/pcspkr/lockdown" })
    navigate("/login")
  }, [navigate, fetcher])

  const remaining = useCountdown(loaderData, handleTimeout)

  return (
    <div className="min-h-screen min-w-screen grid place-content-center p-14 overflow-hidden">
      <div className="w-full grid gap-2 text-center">
        <h1 className="text-8xl text-amber-500">Внимание!</h1>

        <p>Rendszer Lezárva!</p>
        <p className="mb-4">Feloldásig hátralévő idő</p>

        <p className="text-8xl text-amber-500 blink-slow">
          {formatStopwatch(remaining).asString}
        </p>
      </div>
    </div>
  )
}
