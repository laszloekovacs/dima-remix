import { useCallback } from "react"
import { useNavigate } from "react-router"
import { formatStopwatch, useCountdown } from "~/hooks/useCountdown"

export default function LockdownPage() {
  const navigate = useNavigate()

  const handleTimeout = useCallback(() => {
    navigate("/login")
  }, [navigate])

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
