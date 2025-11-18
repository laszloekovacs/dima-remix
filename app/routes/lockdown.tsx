import { useCallback } from "react"
import { useFetcher, useNavigate } from "react-router"
import { formatStopwatch, useCountdown } from "~/hooks/useCountdown"

export default function LockdownPage() {
  const navigate = useNavigate()
  const fetcher = useFetcher()

  const handleTimeout = useCallback(() => {
    fetcher.submit({}, { method: "post", action: "/api/pcspkr/lockdown" })
    navigate("/login")
  }, [navigate, fetcher])

  const remaining = useCountdown({ seconds: 8 }, handleTimeout)

  return (
    <div className="min-h-screen min-w-screen grid place-content-center p-14 overflow-hidden">
      <div className="w-full grid gap-2 text-center">
        <h1 className="text-8xl text-red-500">Внимание!</h1>

        <p>Rendszer Lezárva!</p>
        <p>Feloldásig hátralévő idő</p>
        <p className="text-8xl text-red-500">
          {formatStopwatch(remaining).asString}
        </p>
      </div>
    </div>
  )
}
