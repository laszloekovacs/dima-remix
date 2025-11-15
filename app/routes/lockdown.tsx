import { useCallback } from "react"
import { useNavigate } from "react-router"
import { useCountdown } from "~/hooks/useCountdown"

export default function LockdownPage() {
  const navigate = useNavigate()

  const handleTimeout = useCallback(() => {
    navigate("/login")
  }, [navigate])

  const remaining = useCountdown({ seconds: 8 }, handleTimeout)

  return (
    <div className="min-h-screen min-w-screen grid place-content-center">
      <h1>Внимание!</h1>
      <h1>Rendszer Lezárva!</h1>

      <p>Feloldásig hátralévő idő</p>
      <p>{remaining.toLocaleString("HU")}</p>
    </div>
  )
}
